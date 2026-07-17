import { AnimatePresence, motion } from "framer-motion";
import { X, LogIn, Loader2, Phone, Check, GraduationCap, Briefcase, ArrowLeft, Mail } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { signInWithGoogle, auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { ProfileAvatarUpload } from "./ProfileAvatarUpload";

const inputCls =
  "w-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-xl focus:bg-white focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600";

export function GlobalAuthModal() {
  const { showLoginModal, setShowLoginModal, user, loading, userData } = useAuth();
  const navigate = useNavigate();

  // Step 1: Role, Step 2: Auth, Step 3: Profile
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<"student" | "mentor" | null>(null);

  // Auth States
  const [authMethod, setAuthMethod] = useState<"initial" | "phone" | "email">("initial");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  
  // Phone Auth State
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneStep, setPhoneStep] = useState<"phone" | "otp">("phone");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // Email Auth State
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Profile Form States
  const [formData, setFormData] = useState({
    age: "",
    college: "",
    stream: "",
    phone: "",
    email: "",
    profession: "",
    specification: "",
    experience: "",
  });

  useEffect(() => {
    if (showLoginModal) {
      if (user && userData && !userData.onboardingComplete) {
        setRole(userData.role || "student");
        setStep(3);
      } else if (!user) {
        setStep(1);
      }
    }
  }, [showLoginModal, user, userData]);

  useEffect(() => {
    if (showLoginModal) {
      // Small delay to ensure the modal DOM is fully mounted
      setTimeout(() => {
        if (!document.getElementById("signup-recaptcha-container")) return;
        if (!(window as any).recaptchaVerifier) {
          try {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "signup-recaptcha-container", {
              size: "normal",
              callback: (response: any) => {
                console.log("Recaptcha solved");
              },
              "expired-callback": () => {
                setAuthError("reCAPTCHA expired. Please solve it again.");
                if ((window as any).recaptchaVerifier) {
                  (window as any).recaptchaVerifier.clear();
                  (window as any).recaptchaVerifier = null;
                }
              }
            });
            (window as any).recaptchaVerifier.render();
          } catch (e) {
            console.error("Recaptcha init error:", e);
          }
        }
      }, 300);
    } else {
      // Clean up when modal closes
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
        } catch (e) {}
        (window as any).recaptchaVerifier = null;
      }
    }
  }, [showLoginModal]);

  const resetState = () => {
    setStep(1);
    setRole(null);
    setAuthMethod("initial");
    setAuthError("");
    setPhoneInput("");
    setOtp("");
    setPhoneStep("phone");
    setConfirmationResult(null);
    setEmailInput("");
    setEmailSent(false);
    setFormData({
      age: "",
      college: "",
      stream: "",
      phone: "",
      email: "",
      profession: "",
      specification: "",
      experience: "",
    });
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setTimeout(resetState, 300);
  };

  // Skip rendering if checking state or if user is already logged in and onboarded
  if (loading) return null;
  if (user && userData?.onboardingComplete && showLoginModal) {
    setShowLoginModal(false);
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      setAuthError("");
      const result = await signInWithGoogle();
      const authUser = result.user;

      const userRef = doc(db, "users", authUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: authUser.displayName || "User",
          email: authUser.email,
          photoURL: authUser.photoURL,
          role: role || "student",
          xp: 0,
          level: "Level 1: Novice",
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
        });
        setStep(3);
      } else {
        const data = userSnap.data();
        if (!data.onboardingComplete) {
          if (!data.role && role) {
            await updateDoc(userRef, { role });
          }
          setRole(data.role || role || "student");
          setStep(3);
        } else {
          handleClose();
          navigate({ to: "/dashboard" });
        }
      }
    } catch (error: any) {
      console.error(error);
      setAuthError(error.message || "Failed to sign in with Google.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSendEmailLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !auth) return;
    setAuthError("");
    setIsAuthenticating(true);

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain must be in the authorized domains list.
      url: `${window.location.origin}/verify-email`,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, emailInput, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", emailInput);
      window.localStorage.setItem("roleForSignIn", role || "student");
      setEmailSent(true);
    } catch (err: any) {
      console.error("Error sending email link:", err);
      setAuthError(err.message || "Failed to send magic link. Check email format.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const appVerifier = (window as any).recaptchaVerifier;
    if (!phoneInput || !auth || !appVerifier) return;
    setAuthError("");
    setIsAuthenticating(true);

    try {
      const formattedPhone = phoneInput.startsWith("+")
        ? phoneInput
        : `+91${phoneInput.replace(/\D/g, "")}`;
      const confResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
      setConfirmationResult(confResult);
      setPhoneStep("otp");
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      if (err.code === "auth/too-many-requests") {
        setAuthError("Too many attempts. Please try again later or use a different number.");
      } else {
        setAuthError("Failed to send verification code. Check number format.");
      }
      
      // Reset ReCAPTCHA so the user can try again without reloading the page
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
        } catch (e) {}
        (window as any).recaptchaVerifier = null;
        
        setTimeout(() => {
          if (!document.getElementById("signup-recaptcha-container")) return;
          try {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "signup-recaptcha-container", {
              size: "normal"
            });
            (window as any).recaptchaVerifier.render();
          } catch (e) {}
        }, 100);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !confirmationResult) return;
    setAuthError("");
    setIsAuthenticating(true);

    try {
      const result = await confirmationResult.confirm(otp);
      const authUser = result.user;
      const userRef = doc(db, "users", authUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: "User",
          phone: phoneInput,
          phoneVerified: true,
          role: role || "student",
          xp: 0,
          level: "Level 1: Novice",
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
        });
        setStep(3);
      } else {
        const data = userSnap.data();
        if (!data.onboardingComplete) {
          if (!data.role && role) {
            await updateDoc(userRef, { role });
          }
          setRole(data.role || role || "student");
          setStep(3);
        } else {
          handleClose();
          navigate({ to: "/dashboard" });
        }
      }
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      setAuthError("Invalid verification code.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData) return;
    setIsAuthenticating(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const updatePayload: any = {
        onboardingComplete: true,
        age: formData.age,
      };

      if (!userData.email) updatePayload.email = formData.email;
      if (!userData.phone) updatePayload.phone = formData.phone;

      if (role === "student") {
        updatePayload.college = formData.college;
        updatePayload.stream = formData.stream;
      } else {
        updatePayload.profession = formData.profession;
        updatePayload.specification = formData.specification;
        updatePayload.experience = formData.experience;
      }

      await updateDoc(userRef, updatePayload);
      handleClose();
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Error saving profile", error);
      setAuthError("Failed to save profile. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AnimatePresence>
      {showLoginModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-2xl ${
              step === 3 ? "max-w-xl my-8" : "max-w-md"
            }`}
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all rounded-full focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none z-10"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === s
                      ? "w-8 bg-blue-600"
                      : step > s
                      ? "w-4 bg-blue-400"
                      : "w-4 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col text-center"
              >
                <h3 className="font-display text-2xl font-bold text-ink">Join Learn & Shine</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600 mb-6">
                  How would you like to use the platform?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setRole("student");
                      setStep(2);
                    }}
                    className="flex flex-col items-center p-6 bg-white border-2 border-slate-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-100 hover:-translate-y-1 transition-all rounded-2xl cursor-pointer text-center group shadow-sm focus-visible:outline-none"
                  >
                    <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <GraduationCap className="h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">Student</h4>
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                      Learn, attend workshops, and build your career.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setRole("mentor");
                      setStep(2);
                    }}
                    className="flex flex-col items-center p-6 bg-white border-2 border-slate-100 hover:border-purple-500 hover:ring-2 hover:ring-purple-100 hover:-translate-y-1 transition-all rounded-2xl cursor-pointer text-center group shadow-sm focus-visible:outline-none"
                  >
                    <div className="h-16 w-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">Mentor</h4>
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                      Host webinars, share knowledge, and guide students.
                    </p>
                  </button>
                </div>
                <div className="mt-6 text-sm text-slate-500 font-medium">
                  Already have an account? Select your role to continue logging in.
                </div>
              </motion.div>
            )}

            {/* STEP 2: AUTHENTICATION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col text-center relative"
              >
                <button
                  onClick={() => setStep(1)}
                  className="absolute left-0 top-0 text-slate-400 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <h3 className="font-display text-2xl font-bold text-ink">Sign In / Sign Up</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600 mb-6">
                  Continue as <span className="font-bold capitalize text-blue-600">{role}</span>
                </p>

                {authError && (
                  <p className="text-xs font-bold text-red-600 mb-4 bg-red-50 p-2 rounded-lg border border-red-100">
                    {authError}
                  </p>
                )}

                {authMethod === "initial" ? (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setAuthMethod("email")}
                      disabled={isAuthenticating}
                      className="flex w-full items-center justify-center gap-3 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      <Mail className="h-5 w-5" />
                      Continue with Email
                    </button>

                    <button
                      onClick={() => setAuthMethod("phone")}
                      disabled={isAuthenticating}
                      className="flex w-full items-center justify-center gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      <Phone className="h-5 w-5" />
                      Continue with Phone
                    </button>

                    <button
                      onClick={handleGoogleSignIn}
                      disabled={isAuthenticating}
                      className="flex w-full items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      {isAuthenticating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      )}
                      Continue with Google
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        setAuthMethod("initial");
                        setAuthError("");
                      }}
                      className="absolute left-0 top-0 text-slate-400 hover:text-slate-800 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    {authMethod === "phone" && (
                      <>
                        {phoneStep === "phone" ? (
                          <form onSubmit={handleSendPhoneOtp} className="flex flex-col gap-3 text-left mt-2">
                            <input
                              type="tel"
                              autoFocus
                              value={phoneInput}
                              onChange={(e) => setPhoneInput(e.target.value)}
                              placeholder="+91 9876543210"
                              className={inputCls}
                            />
                            <button
                              type="submit"
                              disabled={!phoneInput || isAuthenticating}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex justify-center"
                            >
                              {isAuthenticating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Code"}
                            </button>
                          </form>
                        ) : (
                          <form onSubmit={handleVerifyPhoneOtp} className="flex flex-col gap-3 text-left mt-2">
                            <input
                              type="text"
                              autoFocus
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="123456"
                              maxLength={6}
                              className={`${inputCls} text-center tracking-widest text-lg`}
                            />
                            <button
                              type="submit"
                              disabled={otp.length !== 6 || isAuthenticating}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex justify-center"
                            >
                              {isAuthenticating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Continue"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setPhoneStep("phone")}
                              className="mt-2 text-center text-xs font-bold text-slate-500 hover:text-blue-600"
                            >
                              Back to Phone Entry
                            </button>
                          </form>
                        )}
                      </>
                    )}

                    {authMethod === "email" && (
                      <>
                        {emailSent ? (
                          <div className="flex flex-col items-center py-6 text-center">
                            <div className="grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600 mb-4">
                              <Check className="h-8 w-8" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800">Check your email</h4>
                            <p className="mt-2 text-sm text-slate-600">
                              We sent a magic link to <span className="font-bold">{emailInput}</span>.<br/>
                              Click it to securely log in.
                            </p>
                          </div>
                        ) : (
                          <form onSubmit={handleSendEmailLink} className="flex flex-col gap-3 text-left mt-2">
                            <input
                              type="email"
                              autoFocus
                              required
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              placeholder="you@example.com"
                              className={inputCls}
                            />
                            <button
                              type="submit"
                              disabled={!emailInput || isAuthenticating}
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex justify-center"
                            >
                              {isAuthenticating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Magic Link"}
                            </button>
                          </form>
                        )}
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: PROFILE COMPLETION */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col text-center"
              >
                <h3 className="font-display text-2xl font-bold text-ink">Complete Your Profile</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600 mb-6">
                  Just a few more details to get you started as a {role}.
                </p>

                {authError && (
                  <p className="text-xs font-bold text-red-600 mb-4 bg-red-50 p-2 rounded-lg border border-red-100">
                    {authError}
                  </p>
                )}

                <div className="flex justify-center mb-6">
                  <ProfileAvatarUpload size="lg" />
                </div>

                <form onSubmit={handleProfileSubmit} className="text-left grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-600">Age *</label>
                    <input
                      type="number"
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className={inputCls}
                      placeholder="e.g. 21"
                    />
                  </div>

                  {!userData?.email && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-600">Email ID *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputCls}
                        placeholder="you@example.com"
                      />
                    </div>
                  )}

                  {!userData?.phone && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-600">Phone No. *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputCls}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  )}

                  {role === "student" ? (
                    <>
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-600">College / School *</label>
                        <input
                          type="text"
                          required
                          value={formData.college}
                          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                          className={inputCls}
                          placeholder="Name of your institution"
                        />
                      </div>
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-600">Stream / Course *</label>
                        <input
                          type="text"
                          required
                          value={formData.stream}
                          onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. B.Tech Computer Science"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-600">Profession *</label>
                        <input
                          type="text"
                          required
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. Senior Software Engineer"
                        />
                      </div>
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-600">Specification / Expertise *</label>
                        <input
                          type="text"
                          required
                          value={formData.specification}
                          onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. System Design, React"
                        />
                      </div>
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-600">Years of Experience *</label>
                        <input
                          type="text"
                          required
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. 5+ Years"
                        />
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2 mt-4">
                    <button
                      type="submit"
                      disabled={isAuthenticating}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/20 flex justify-center items-center gap-2"
                    >
                      {isAuthenticating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Always render recaptcha container so it doesn't unmount and break the verifier */}
            <div id="signup-recaptcha-container" className="mt-4 flex justify-center"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
