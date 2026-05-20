import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useReservation } from "./ReservationContext";
import { tracks } from "@/lib/tracks";

export function ReservationModal() {
  const { open, closeModal, preferredTrack } = useReservation();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", college: "", email: "", phone: "", track: "" });

  useEffect(() => {
    if (open) {
      setStep(0);
      setData((d) => ({ ...d, track: preferredTrack ?? "" }));
    }
  }, [open, preferredTrack]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const canNext0 = data.name.trim() && data.college.trim();
  const canNext1 = /\S+@\S+\.\S+/.test(data.email) && data.phone.trim().length >= 7;
  const canSubmit = canNext0 && canNext1 && data.track;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStep(3);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-yellow/20 bg-surface/95 p-8 shadow-glow backdrop-blur-xl"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-yellow"
            >
              <X className="h-5 w-5" />
            </button>

            {step < 3 && (
              <>
                <div className="eyebrow text-yellow">Reserve Your Seat</div>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
                  {step === 0 && "Tell us who you are"}
                  {step === 1 && "How can we reach you?"}
                  {step === 2 && "Pick your track"}
                </h3>

                {/* progress */}
                <div className="mt-5 flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= step ? "bg-yellow" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <form onSubmit={submit} className="mt-7 space-y-4">
                  {step === 0 && (
                    <>
                      <Field label="Full name">
                        <input
                          autoFocus
                          value={data.name}
                          onChange={(e) => setData({ ...data, name: e.target.value })}
                          className={inputCls}
                          placeholder="Arjun Sharma"
                        />
                      </Field>
                      <Field label="College / Institution">
                        <input
                          value={data.college}
                          onChange={(e) => setData({ ...data, college: e.target.value })}
                          className={inputCls}
                          placeholder="VIT Vellore"
                        />
                      </Field>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <Field label="Email">
                        <input
                          autoFocus
                          type="email"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          className={inputCls}
                          placeholder="you@college.edu"
                        />
                      </Field>
                      <Field label="WhatsApp number">
                        <input
                          value={data.phone}
                          onChange={(e) => setData({ ...data, phone: e.target.value })}
                          className={inputCls}
                          placeholder="+91 98765 43210"
                        />
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
                        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-yellow"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    ) : <span />}

                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={step === 0 ? !canNext0 : !canNext1}
                        className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-yellow-foreground transition-opacity disabled:opacity-40"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-yellow-foreground transition-opacity disabled:opacity-40"
                      >
                        Reserve Seat <Check className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-yellow bg-yellow/10">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-yellow">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      d="M5 12.5l4.5 4.5L19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold text-white">Seat Reserved!</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  You're one step closer to being Industry-Ready. Check your email for next steps.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-7 inline-flex items-center rounded-full bg-yellow px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-yellow-foreground"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-yellow";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</div>
      {children}
    </label>
  );
}
