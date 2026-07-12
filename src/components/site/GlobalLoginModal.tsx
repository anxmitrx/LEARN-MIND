import { AnimatePresence, motion } from "framer-motion";
import { X, LogIn, Loader2, Mail, ArrowLeft, Phone, Check } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { signInWithGoogle, auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { sendSignInLinkToEmail, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";

const inputCls =
  "w-full border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-full focus:bg-white focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600";

export function GlobalLoginModal() {
  const { showLoginModal, setShowLoginModal, user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [mode, setMode] = useState<"initial" | "email" | "phone">("initial");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Magic Link State
  const [email, setEmail] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [linkError, setLinkError] = useState("");

  // Phone Auth State
  const [phoneStep, setPhoneStep] = useState<"phone" | "otp">("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (showLoginModal && mode === "phone") {
      if (!recaptchaVerifierRef.current && auth) {
        try {
          recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'login-recaptcha-container', {
            size: 'invisible'
          });
        } catch (e) {
          console.error("Recaptcha init error:", e);
        }
      }
    }

    return () => {
      // We don't necessarily clear it here because component might just re-render, 
      // but it's good practice. We'll leave it attached to avoid re-init issues.
    };
  }, [showLoginModal, mode]);

  const resetState = () => {
    setMode("initial");
    setLoginError("");
    setLinkError("");
    setPhoneError("");
    setEmail("");
    setLinkSent(false);
    setPhoneStep("phone");
    setPhoneInput("");
    setOtp("");
    setConfirmationResult(null);
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setTimeout(resetState, 300); // reset after animation
  };

  // If they're already logged in, or checking state, don't render yet
  if (user || loading) return null;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendMagicLink = async () => {
    if (!emailOk || !auth) return;
    setIsSendingLink(true);
    setLinkError("");
    
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setLinkSent(true);
    } catch (err: any) {
      console.error("Error sending email link", err);
      setLinkError(err.message || "Failed to send link. Try again.");
    } finally {
      setIsSendingLink(false);
    }
  };

  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || !auth || !recaptchaVerifierRef.current) return;

    setPhoneError("");
    setIsSendingOtp(true);

    try {
      const formattedPhone = phoneInput.startsWith("+") ? phoneInput : `+91${phoneInput.replace(/\D/g, '')}`;
      const confResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current);
      setConfirmationResult(confResult);
      setPhoneStep("otp");
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      if (err.code === "auth/invalid-phone-number") {
        setPhoneError("Invalid phone number format. Please include country code (e.g. +91).");
      } else {
        setPhoneError(err.message || "Failed to send verification code. Try again.");
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !confirmationResult) return;

    setPhoneError("");
    setIsVerifyingOtp(true);

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
          xp: 0,
          level: "Level 1: Novice",
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
        });
      }
      
      handleClose();
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      setPhoneError("Invalid verification code. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      setLoginError("");
      const result = await signInWithGoogle();
      const authUser = result.user;
      
      const userRef = doc(db, "users", authUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: authUser.displayName || "User",
          email: authUser.email,
          photoURL: authUser.photoURL,
          xp: 0,
          level: "Level 1: Novice",
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
        });
      }
      
      handleClose();
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      console.error(error);
      setLoginError(error.message || "Failed to sign in with Google.");
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-3xl text-center"
          >
            {mode !== "initial" && (
              <button
                onClick={() => {
                  setMode("initial");
                  setLinkError("");
                  setPhoneError("");
                }}
                aria-label="Back"
                className="absolute left-4 top-4 grid h-9 w-9 place-items-center bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all rounded-full focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none z-10"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={3} />
              </button>
            )}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all rounded-full focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none z-10"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            <div className="mx-auto mt-2 grid h-16 w-16 place-items-center bg-indigo-500/20 text-indigo-700 border border-indigo-500/30 rounded-full shadow-inner mb-6">
              {mode === "phone" ? (
                <Phone className="h-7 w-7" strokeWidth={2.5} />
              ) : (
                <LogIn className="h-8 w-8" strokeWidth={2.5} />
              )}
            </div>

            <h3 className="font-display text-2xl font-bold text-ink">
              {mode === "phone" ? "Continue with Phone" : "Welcome to Learn & Shine"}
            </h3>
            <p className="mt-3 text-sm font-semibold text-slate-600">
              {mode === "initial" && "Please log in or create an account to reserve your seat."}
              {mode === "email" && !linkSent && "Enter your email to receive a magic link."}
              {mode === "phone" && phoneStep === "phone" && "Enter your phone number to sign in or create an account."}
              {mode === "phone" && phoneStep === "otp" && `We've sent a code to ${phoneInput}.`}
            </p>

            {mode === "initial" && (
              <div className="mt-8 flex flex-col gap-3">
                {loginError && (
                  <p className="text-xs font-bold text-red-600 mb-2 bg-red-50 p-2 rounded-lg border border-red-100">{loginError}</p>
                )}
                
                <button
                  onClick={() => { setMode("phone"); setLoginError(""); }}
                  disabled={isAuthenticating}
                  className="flex w-full items-center justify-center gap-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
                >
                  <Phone className="h-5 w-5" />
                  Continue with Phone
                </button>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={isAuthenticating}
                  className="flex w-full items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
                >
                  {isAuthenticating ? (
                    <div className="h-5 w-5 animate-spin border-2 border-slate-300 border-t-indigo-600 rounded-full" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  Continue with Google
                </button>
                
                <button
                  onClick={() => { setMode("email"); setLoginError(""); }}
                  disabled={isAuthenticating}
                  className="flex w-full items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
                >
                  <Mail className="h-5 w-5" />
                  Continue with Email
                </button>
              </div>
            )}

            {mode === "email" && linkSent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center"
              >
                <Mail className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-indigo-900 mb-1">Check your inbox</h4>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  We sent a magic link to <span className="font-semibold">{email}</span>. 
                  Click the link to securely verify your email and complete setup.
                </p>
                {linkError && (
                  <p className="text-xs font-bold text-red-600 mt-2">{linkError}</p>
                )}
              </motion.div>
            )}

            {mode === "email" && !linkSent && (
              <div className="mt-8 flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputCls} text-center`}
                  placeholder="you@example.com"
                />
                
                {linkError && <p className="text-xs font-bold text-red-500">{linkError}</p>}
                
                <button
                  onClick={handleSendMagicLink}
                  disabled={!emailOk || isSendingLink}
                  className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  {isSendingLink && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send Magic Link
                </button>
              </div>
            )}

            {mode === "phone" && phoneStep === "phone" && (
              <form onSubmit={handleSendPhoneOtp} className="mt-8 flex flex-col gap-3 text-left">
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    autoFocus
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+91 9876543210"
                    className={`${inputCls} pl-10`}
                  />
                </div>
                {phoneError && <p className="text-xs font-bold text-red-500">{phoneError}</p>}
                
                <button
                  type="submit"
                  disabled={!phoneInput || isSendingOtp}
                  className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  {isSendingOtp && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send Verification Code
                </button>
              </form>
            )}

            {mode === "phone" && phoneStep === "otp" && (
              <form onSubmit={handleVerifyPhoneOtp} className="mt-8 flex flex-col gap-3 text-left">
                <input
                  type="text"
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className={`${inputCls} text-center tracking-widest text-lg`}
                />
                {phoneError && <p className="text-xs font-bold text-red-500">{phoneError}</p>}
                
                <button
                  type="submit"
                  disabled={otp.length !== 6 || isVerifyingOtp}
                  className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  {isVerifyingOtp ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  Verify & Continue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneStep("phone");
                    setOtp("");
                    setPhoneError("");
                  }}
                  className="mt-2 w-full text-center text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Back to Phone Entry
                </button>
              </form>
            )}

            <div id="login-recaptcha-container"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

