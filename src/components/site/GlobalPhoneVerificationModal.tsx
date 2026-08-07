import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Loader2, Phone } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { auth, db } from "@/lib/firebase";
import { RecaptchaVerifier, linkWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const inputCls =
  "w-full border border-white/50 bg-white/25 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-xl focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none";

export function GlobalPhoneVerificationModal() {
  const {
    user,
    userData,
    showPhoneVerificationModal,
    setShowPhoneVerificationModal,
    phoneVerificationCallback,
    clearPhoneVerificationCallback,
  } = useAuth();

  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phoneInput, setPhoneInput] = useState(userData?.phone || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (showPhoneVerificationModal) {
      setStep("phone");
      setOtp("");
      setError("");
      setIsLoading(false);
      setIsMockMode(false);
      // Only set initial phone if empty to prevent overwriting user input on re-renders
      setPhoneInput((prev: string) => prev || userData?.phone || "");

      // Initialize reCAPTCHA
      setTimeout(() => {
        if (!document.getElementById("recaptcha-container-phone")) return;
        if (!(window as any).phoneRecaptchaVerifier) {
          try {
            (window as any).phoneRecaptchaVerifier = new RecaptchaVerifier(
              auth,
              "recaptcha-container-phone",
              {
                size: "normal",
                callback: (response: any) => {
                  console.log("Phone Recaptcha solved");
                },
                "expired-callback": () => {
                  setError("reCAPTCHA expired. Please solve it again.");
                  if ((window as any).phoneRecaptchaVerifier) {
                    (window as any).phoneRecaptchaVerifier.clear();
                    (window as any).phoneRecaptchaVerifier = null;
                  }
                },
              },
            );
            (window as any).phoneRecaptchaVerifier.render();
          } catch (e) {
            console.error("Recaptcha init error:", e);
          }
        }
      }, 300);

      return () => {
        if ((window as any).phoneRecaptchaVerifier) {
          try {
            (window as any).phoneRecaptchaVerifier.clear();
          } catch (e) {}
          (window as any).phoneRecaptchaVerifier = null;
        }
      };
    }
  }, [showPhoneVerificationModal, auth]);

  const closeModal = () => {
    setShowPhoneVerificationModal(false);
    clearPhoneVerificationCallback();
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const appVerifier = (window as any).phoneRecaptchaVerifier;
    if (!phoneInput || !auth || !user || !appVerifier) return;

    setError("");
    setIsLoading(true);

    try {
      // Ensure phone format contains country code, primitive check
      const formattedPhone = phoneInput.startsWith("+")
        ? phoneInput
        : `+91${phoneInput.replace(/\D/g, "")}`;

      const confResult = await linkWithPhoneNumber(user, formattedPhone, appVerifier);
      setConfirmationResult(confResult);
      setStep("otp");
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      if (err.code === "auth/billing-not-enabled") {
        setError("Firebase Billing is not enabled. Falling back to Test Mode (use 123456).");
        setIsMockMode(true);
        setStep("otp");
      } else if (err.code === "auth/credential-already-in-use") {
        setError("This phone number is already verified on another account.");
      } else if (err.code === "auth/invalid-phone-number") {
        setError("Invalid phone number format. Please include country code (e.g. +91).");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later or use a different number.");
      } else {
        setError(err.message || "Failed to send verification code. Try again.");
      }

      // Reset ReCAPTCHA so the user can try again without reloading the page
      if ((window as any).phoneRecaptchaVerifier) {
        try {
          (window as any).phoneRecaptchaVerifier.clear();
        } catch (e) {}
        (window as any).phoneRecaptchaVerifier = null;

        setTimeout(() => {
          if (!document.getElementById("recaptcha-container-phone")) return;
          try {
            (window as any).phoneRecaptchaVerifier = new RecaptchaVerifier(
              auth,
              "recaptcha-container-phone",
              {
                size: "normal",
              },
            );
            (window as any).phoneRecaptchaVerifier.render();
          } catch (e) {}
        }, 100);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || (!confirmationResult && !isMockMode) || !user) return;

    setError("");
    setIsLoading(true);

    try {
      if (isMockMode) {
        if (otp !== "123456") {
          throw new Error("Invalid test code (use 123456).");
        }
      } else {
        await confirmationResult!.confirm(otp);
      }

      // Update Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        phone: phoneInput, // Save the verified phone number
        phoneVerified: true,
      });

      setStep("success");

      // Execute the pending action after a short delay
      setTimeout(() => {
        setShowPhoneVerificationModal(false);
        if (phoneVerificationCallback) {
          phoneVerificationCallback();
          clearPhoneVerificationCallback();
        }
      }, 1000);
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      setError(
        err.message === "Invalid test code (use 123456)."
          ? err.message
          : "Invalid verification code. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const paddedOtp = otp.padEnd(6, " ").split("");

    // Handle multi-character input (e.g. autofill or fast typing)
    if (value.length > 1) {
      const cleanValue = value.replace(/\D/g, "").slice(0, 6 - index);
      for (let i = 0; i < cleanValue.length; i++) {
        if (index + i < 6) paddedOtp[index + i] = cleanValue[i];
      }
      setOtp(paddedOtp.join("").trimEnd());
      const nextIndex = Math.min(index + cleanValue.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    paddedOtp[index] = value || " ";
    setOtp(paddedOtp.join("").trimEnd());

    // Move to next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      setOtp(pastedData);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  if (!showPhoneVerificationModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-md"
        onClick={closeModal}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md overflow-hidden bg-white/60 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-3xl"
        >
          <button
            onClick={closeModal}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-white/20 backdrop-blur-md text-indigo-600 border border-white/40 transition-all hover:scale-105 active:scale-95 hover:bg-white/40 hover:border-white rounded-full shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none z-10"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>

          {step === "phone" && (
            <>
              <div className="eyebrow text-indigo-600">Verification Required</div>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">Verify your phone</h3>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                To continue, please verify your phone number via SMS.
              </p>

              <form onSubmit={handleSendOtp} className="mt-6 space-y-5">
                <label className="block">
                  <div className="mb-1.5 flex items-baseline justify-between gap-2">
                    <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink">
                      Phone Number (with Country Code)
                    </span>
                  </div>
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
                  {error && <p className="mt-2 text-xs font-bold text-red-500">{error}</p>}
                </label>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!phoneInput || isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none cursor-pointer"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    Send Verification Code
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="eyebrow text-indigo-600">Verification</div>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">Enter your code</h3>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                We've sent a 6-digit verification code to{" "}
                <span className="font-bold text-slate-800">{phoneInput}</span>.
              </p>

              <form onSubmit={handleVerify} className="mt-6 space-y-5">
                <div className="block">
                  <div className="mb-2 flex items-baseline justify-center gap-2">
                    <span className="text-xs font-display font-extrabold uppercase tracking-wider text-indigo-600">
                      Verification Code
                    </span>
                  </div>
                  <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <motion.input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        autoFocus={index === 0}
                        value={otp[index] === " " ? "" : (otp[index] || "")}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        maxLength={6}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white/25 border border-white/50 rounded-xl outline-none text-slate-800 focus:bg-white/45 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 shadow-sm transition-colors"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: otp[index] ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    ))}
                  </div>
                  {error && <p className="mt-3 text-xs font-bold text-red-500 text-center">{error}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={otp.replace(/ /g, "").length !== 6 || isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Check className="h-5 w-5" />
                    )}
                    Verify & Continue
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="mt-3 w-full text-center text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    Back to Phone Entry
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-xl shadow-green-500/30">
                <Check className="h-10 w-10" strokeWidth={3} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink">Verified!</h3>
              <p className="mt-3 text-sm font-medium text-slate-600 leading-relaxed max-w-[280px]">
                Your phone number is now verified. Resuming your action...
              </p>
            </motion.div>
          )}

          {/* Invisible recaptcha container must be in the DOM */}
          <div id="recaptcha-container-phone" className="mt-4 flex justify-center"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
