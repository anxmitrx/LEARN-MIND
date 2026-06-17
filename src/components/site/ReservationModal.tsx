import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X, Mail, Phone as PhoneIcon, KeyRound, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useReservation } from "./ReservationContext";
import { useWorkshops } from "@/hooks/useWorkshops";
import { signInWithGoogle, db, auth } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/AuthContext";

const inputCls =
  "w-full border border-white/50 bg-white/25 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-xl focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink">{label}</span>
        {error && <span className="text-[11px] font-bold text-red-600">{error}</span>}
      </div>
      {children}
    </label>
  );
}

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").replace(/^91/, "").slice(0, 10);
  if (!digits) return "";
  const a = digits.slice(0, 5);
  const b = digits.slice(5, 10);
  return b ? `${a} ${b}` : a;
};

const phoneIsValid = (raw: string) => raw.replace(/\D/g, "").length === 10;

export function ReservationModal() {
  const { open, closeModal, preferredTrack } = useReservation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Base State
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", college: "", email: "", phone: "", track: "" });
  const [touched, setTouched] = useState({ email: false, phone: false });
  const { workshops: tracks } = useWorkshops();

  // OTP States
  const [emailLinkSent, setEmailLinkSent] = useState(false);
  const [sendingLink, setSendingLink] = useState(false);
  const [emailLinkError, setEmailLinkError] = useState("");

  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [phoneOtpError, setPhoneOtpError] = useState("");

  // Sync auth state to advance automatically if verified
  useEffect(() => {
    // Only auto-advance if they are actively waiting for the link in this session
    if (user && step === 1 && user.email === data.email && emailLinkSent) {
      setStep(2);
    }
  }, [user, step, data.email, emailLinkSent]);

  useEffect(() => {
    if (open) {
      setStep(0);
      setTouched({ email: false, phone: false });
      setEmailLinkSent(false);
      setSendingLink(false);
      setEmailLinkError("");
      setPhoneOtpSent(false);
      setPhoneOtpVerified(false);
      setPhoneOtp("");
      setData((d) => ({ 
        ...d, 
        track: preferredTrack ?? "",
        name: user?.displayName || d.name,
        email: user?.email || d.email,
      }));
    }
  }, [open, preferredTrack, user]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);



  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const phoneOk = phoneIsValid(data.phone);
  
  // If user is logged in, their email is verified. Otherwise false.
  const emailVerified = !!user && user.email === data.email;

  const canNext0 = data.name.trim().length >= 2 && data.college.trim().length >= 2;
  const canNext1 = emailOk && emailVerified;
  const canNext2 = phoneOk && phoneOtpVerified;
  const canSubmit = canNext0 && canNext1 && canNext2 && data.track;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  // Magic Link Logic
  const handleSendMagicLink = async () => {
    if (!emailOk || !auth) return;
    setSendingLink(true);
    setEmailLinkError("");
    
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain must be whitelisted in Firebase Console.
      url: window.location.href,
      // This must be true.
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', data.email);
      setEmailLinkSent(true);
    } catch (err: any) {
      console.error("Error sending email link", err);
      setEmailLinkError(err.message || "Failed to send link. Try again.");
    } finally {
      setSendingLink(false);
    }
  };

  const handleSendPhoneOTP = () => {
    if (!phoneOk) return;
    setPhoneOtpSent(true);
    setPhoneOtpError("");
    console.log("Simulating Phone OTP Send...");
  };

  const handleVerifyPhoneOTP = () => {
    if (phoneOtp === "1234" || phoneOtp.length === 4) {
      setPhoneOtpVerified(true);
      setPhoneOtpError("");
    } else {
      setPhoneOtpError("Invalid OTP. Try 1234");
    }
  };

  const fireConfetti = () => {
    const end = Date.now() + 800;
    const colors = ["#FFCC00", "#050505", "#FFFFFF"];
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (!db) {
      console.error("Firestore database is not initialized.");
      setStep(4);
      setTimeout(fireConfetti, 120);
      return;
    }
    try {
      await addDoc(collection(db, "reservations"), {
        name: data.name,
        college: data.college,
        email: data.email,
        phone: data.phone,
        track: data.track,
        status: "pending",
        source: "website",
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.error("Error writing reservation to Firestore:", err);
    }
    setStep(4);
    setTimeout(fireConfetti, 120);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-md"
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

            {step < 4 && (
              <>
                <div className="eyebrow text-indigo-600">Reserve Your Seat · {step + 1}/4</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                  {step === 0 && "Tell us who you are"}
                  {step === 1 && "Verify your email"}
                  {step === 2 && "Verify your phone"}
                  {step === 3 && "Pick your track"}
                </h3>

                {/* progress */}
                <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/20 border border-white/40">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>

                <form onSubmit={submit} className="mt-7 space-y-5">
                  {/* STEP 0: NAME & COLLEGE */}
                  {step === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <Field label="Full name">
                        <input
                          autoFocus
                          value={data.name}
                          onChange={(e) => setData({ ...data, name: e.target.value })}
                          maxLength={80}
                          className={inputCls}
                          placeholder="Arjun Sharma"
                        />
                      </Field>
                      <Field label="College / Institution">
                        <input
                          value={data.college}
                          onChange={(e) => setData({ ...data, college: e.target.value })}
                          maxLength={120}
                          className={inputCls}
                          placeholder="VIT Vellore"
                        />
                      </Field>
                    </motion.div>
                  )}

                  {/* STEP 1: EMAIL & MAGIC LINK */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <Field
                        label="Email Address"
                        error={touched.email && !emailOk ? "Enter a valid email" : undefined}
                      >
                        <div className="relative">
                          <input
                            autoFocus
                            type="email"
                            value={data.email}
                            disabled={emailVerified || sendingLink}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            maxLength={120}
                            className={`${inputCls} ${emailVerified ? 'opacity-60' : ''}`}
                            placeholder="you@college.edu"
                          />
                          {emailOk && !emailVerified && (
                            <button
                              type="button"
                              onClick={handleSendMagicLink}
                              disabled={sendingLink}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                              {sendingLink && <Loader2 className="w-3 h-3 animate-spin" />}
                              {emailLinkSent ? "Resend" : "Send Link"}
                            </button>
                          )}
                          {emailVerified && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 bg-green-100 p-1 rounded-full">
                              <Check className="w-4 h-4" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        {emailVerified && (
                          <p className="mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg inline-block border border-emerald-100">
                            You are already signed in with this email. No verification needed!
                          </p>
                        )}
                      </Field>

                      <AnimatePresence>
                        {emailLinkSent && !emailVerified && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                              <Mail className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                              <h4 className="text-sm font-bold text-indigo-900 mb-1">Check your inbox</h4>
                              <p className="text-xs text-indigo-700 leading-relaxed">
                                We sent a magic link to <span className="font-semibold">{data.email}</span>. 
                                Click the link to securely verify your email and continue.
                              </p>
                              {emailLinkError && (
                                <p className="text-xs font-bold text-red-600 mt-2">{emailLinkError}</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* STEP 2: PHONE & OTP */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <Field
                        label="WhatsApp number"
                        error={touched.phone && !phoneOk ? "Enter a 10-digit number" : undefined}
                      >
                        <div className={`relative flex border border-white/50 bg-white/25 rounded-xl overflow-hidden focus-within:bg-white/45 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 transition-all ${phoneOtpVerified ? 'opacity-60' : ''}`}>
                          <span className="grid place-items-center bg-white/60 px-4 font-mono text-sm font-extrabold text-indigo-600 border-r border-white/40">
                            +91
                          </span>
                          <input
                            inputMode="numeric"
                            value={data.phone}
                            disabled={phoneOtpVerified}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            onChange={(e) => setData({ ...data, phone: formatPhone(e.target.value) })}
                            className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none"
                            placeholder="98765 43210"
                          />
                          {phoneOk && !phoneOtpVerified && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                              <button
                                type="button"
                                onClick={handleSendPhoneOTP}
                                className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-colors"
                              >
                                {phoneOtpSent ? "Resend" : "Send OTP"}
                              </button>
                            </div>
                          )}
                          {phoneOtpVerified && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 bg-green-100 p-1 rounded-full">
                              <Check className="w-4 h-4" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      </Field>

                      <AnimatePresence>
                        {phoneOtpSent && !phoneOtpVerified && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <Field label="Enter Phone OTP" error={phoneOtpError}>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={phoneOtp}
                                  onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                  className={`${inputCls} text-center tracking-[0.5em] font-mono text-lg`}
                                  placeholder="••••"
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyPhoneOTP}
                                  disabled={phoneOtp.length !== 4}
                                  className="shrink-0 bg-indigo-600 text-white px-5 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
                                >
                                  Verify
                                </button>
                              </div>
                            </Field>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* STEP 3: TRACK */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <Field label="Preferred track">
                        <select
                          autoFocus
                          value={data.track}
                          onChange={(e) => setData({ ...data, track: e.target.value })}
                          className={inputCls}
                        >
                          <option value="">Choose a track…</option>
                          {tracks.map((t) => (
                            <option key={t.slug} value={t.slug}>
                              {t.title}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </motion.div>
                  )}

                  <div className="mt-7 flex items-center justify-between gap-3 pt-4 border-t border-white/30">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={back}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded-xl"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        disabled={(step === 0 && !canNext0) || (step === 1 && !canNext1) || (step === 2 && !canNext2)}
                        onClick={next}
                        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
                      >
                        Submit Reservation
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-xl shadow-green-500/30">
                  <Check className="h-10 w-10" strokeWidth={3} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink">You're on the list!</h3>
                <p className="mt-3 text-sm font-medium text-slate-600 leading-relaxed max-w-[280px]">
                  We've successfully secured your reservation. Keep an eye on your inbox for the official invite.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-8 rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
