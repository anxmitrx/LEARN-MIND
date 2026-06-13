import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import confetti from "canvas-confetti";
import { useReservation } from "./ReservationContext";
import { useWorkshops } from "@/hooks/useWorkshops";
import { signInWithGoogle, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "@tanstack/react-router";

const inputCls =
  "w-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-full focus:bg-slate-50 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-display font-extrabold uppercase tracking-wider text-slate-900">{label}</span>
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
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", college: "", email: "", phone: "", track: "" });
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { workshops: tracks } = useWorkshops();

  useEffect(() => {
    if (open) {
      setStep(0);
      setTouched({ email: false, phone: false });
      setData((d) => ({ ...d, track: preferredTrack ?? "" }));
    }
  }, [open, preferredTrack]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const phoneOk = phoneIsValid(data.phone);
  const canNext0 = data.name.trim().length >= 2 && data.college.trim().length >= 2;
  const canNext1 = emailOk && phoneOk;
  const canSubmit = canNext0 && canNext1 && data.track;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

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
      setStep(3);
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
    setStep(3);
    setTimeout(fireConfetti, 120);
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      await signInWithGoogle();
      closeModal();
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl rounded-3xl"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-white text-slate-600 border border-slate-200 transition-all hover:scale-105 active:scale-95 hover:bg-slate-50 rounded-full shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            {step < 3 && (
              <>
                <div className="eyebrow text-indigo-600">Reserve Your Seat · {step + 1}/3</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                  {step === 0 && "Tell us who you are"}
                  {step === 1 && "How can we reach you?"}
                  {step === 2 && "Pick your track"}
                </h3>

                {/* progress */}
                <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${((step + 1) / 3) * 100}%` }}
                  />
                </div>

                <form onSubmit={submit} className="mt-7 space-y-4">
                  {step === 0 && (
                    <>
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
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <Field
                        label="Email"
                        error={touched.email && !emailOk ? "Enter a valid email" : undefined}
                      >
                        <input
                          autoFocus
                          type="email"
                          value={data.email}
                          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          maxLength={120}
                          className={inputCls}
                          placeholder="you@college.edu"
                        />
                      </Field>
                      <Field
                        label="WhatsApp number"
                        error={touched.phone && !phoneOk ? "Enter a 10-digit number" : undefined}
                      >
                        <div className="flex border border-slate-200 bg-white rounded-full overflow-hidden focus-within:bg-slate-50 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:outline-none transition-all">
                          <span className="grid place-items-center bg-slate-100 px-4 font-mono text-sm font-extrabold text-indigo-600 border-r border-slate-200">
                            +91
                          </span>
                          <input
                            inputMode="numeric"
                            value={data.phone}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            onChange={(e) => setData({ ...data, phone: formatPhone(e.target.value) })}
                            className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none"
                            placeholder="98765 43210"
                          />
                        </div>
                      </Field>
                    </>
                  )}
                  {step === 2 && (
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
                  )}

                  <div className="mt-7 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:underline rounded focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none cursor-pointer px-1"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    ) : <span />}

                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={step === 0 ? !canNext0 : !canNext1}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider rounded-3xl shadow-sm border border-transparent transition-transform duration-300 hover:scale-105 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider rounded-3xl shadow-sm border border-transparent transition-transform duration-300 hover:scale-105 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        Reserve Seat <Check className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                </form>
              </>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6 text-center"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center bg-indigo-500/20 text-indigo-700 border border-indigo-500/30 rounded-full shadow-md">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-indigo-600">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      d="M5 12.5l4.5 4.5L19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-slate-900">
                  Seat Reserved!
                </h3>
                <p className="mt-3 text-sm text-slate-600 font-semibold">
                  You're one step closer to being Industry-Ready. Check your email for next steps.
                </p>
                <button
                   onClick={() => {
                     closeModal();
                     navigate({ to: "/dashboard" });
                   }}
                  className="mt-7 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider rounded-3xl shadow-sm border border-transparent transition-transform duration-300 hover:scale-105 hover:bg-indigo-700 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
