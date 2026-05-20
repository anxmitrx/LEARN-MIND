import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import confetti from "canvas-confetti";
import { useReservation } from "./ReservationContext";
import { tracks } from "@/lib/tracks";
import { signInWithGoogle } from "@/lib/firebase";
import { useNavigate } from "@tanstack/react-router";

const inputCls =
  "w-full border-2 border-ink bg-background px-4 py-3 text-sm font-medium text-ink placeholder:text-zinc-400 outline-none transition-shadow focus:shadow-brutal-sm";

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
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", college: "", email: "", phone: "", track: "" });
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden border-2 border-ink bg-background/95 p-8 shadow-brutal-lg backdrop-blur-xl"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center border-2 border-ink bg-background text-ink transition-colors hover:bg-yellow"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            {step < 3 && (
              <>
                <div className="eyebrow text-ink">Reserve Your Seat · {step + 1}/3</div>
                <h3 className="mt-2 font-display text-2xl font-black text-ink">
                  {step === 0 && "Tell us who you are"}
                  {step === 1 && "How can we reach you?"}
                  {step === 2 && "Pick your track"}
                </h3>

                {/* progress */}
                <div className="mt-5 flex h-2 overflow-hidden border-2 border-ink">
                  <div
                    className="bg-yellow transition-all duration-500"
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
                        <div className="flex">
                          <span className="grid place-items-center border-2 border-r-0 border-ink bg-yellow px-3 font-mono text-sm font-extrabold text-ink">
                            +91
                          </span>
                          <input
                            inputMode="numeric"
                            value={data.phone}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            onChange={(e) => setData({ ...data, phone: formatPhone(e.target.value) })}
                            className={inputCls}
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
                        className="inline-flex items-center gap-1 text-sm font-bold text-ink hover:underline"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    ) : <span />}

                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={step === 0 ? !canNext0 : !canNext1}
                        className="inline-flex items-center gap-2 border-2 border-ink bg-yellow px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-ink shadow-brutal-sm transition-[box-shadow,transform] hover:shadow-brutal disabled:opacity-40 disabled:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex items-center gap-2 border-2 border-ink bg-yellow px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-ink shadow-brutal-sm transition-[box-shadow,transform] hover:shadow-brutal disabled:opacity-40 disabled:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        Reserve Seat <Check className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  {step === 0 && (
                    <div className="mt-6 border-t-2 border-ink pt-6">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isAuthenticating}
                        className="flex w-full items-center justify-center gap-2 border-2 border-ink bg-background px-6 py-3 font-display text-sm font-extrabold text-ink shadow-brutal-sm transition-[box-shadow,transform] hover:bg-zinc-50 hover:shadow-brutal disabled:opacity-50 disabled:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        {isAuthenticating ? "Connecting..." : "Continue with Google"}
                      </button>
                    </div>
                  )}
                </form>
              </>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6 text-center"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center border-2 border-ink bg-yellow shadow-brutal-sm">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-ink">
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
                <h3 className="mt-6 font-display text-3xl font-black leading-tight text-ink">
                  Seat Reserved!
                </h3>
                <p className="mt-3 text-sm text-zinc-600">
                  You're one step closer to being Industry-Ready. Check your email for next steps.
                </p>
                <button
                  onClick={() => {
                    closeModal();
                    navigate({ to: "/dashboard" });
                  }}
                  className="mt-7 inline-flex items-center border-2 border-ink bg-ink px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-background shadow-brutal-sm hover:shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
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
