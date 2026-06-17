import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Building, Phone as PhoneIcon, Mail, User as UserIcon, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useReservation } from "./ReservationContext";
import { useWorkshops } from "@/hooks/useWorkshops";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";

const inputCls =
  "w-full border border-white/50 bg-white/25 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-xl focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none";

export function ReservationModal() {
  const { open, closeModal, preferredTrack } = useReservation();
  const { userData } = useAuth();
  const { workshops: tracks } = useWorkshops();
  
  const [track, setTrack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setSuccess(false);
      setIsSubmitting(false);
      setTrack(preferredTrack ?? "");
    }
  }, [open, preferredTrack]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

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
    if (!track || !userData || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reservations"), {
        name: userData.name,
        college: userData.institution || "Unknown",
        email: userData.email,
        phone: userData.phone || "Unknown",
        track: track,
        status: "pending",
        source: "website",
        timestamp: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(fireConfetti, 120);
    } catch (err) {
      console.error("Error writing reservation to Firestore:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
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

          {!success ? (
            <>
              <div className="eyebrow text-indigo-600">Reserve Your Seat</div>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                Confirm your details
              </h3>
              
              {userData && (
                <div className="mt-6 space-y-3 bg-white/30 border border-white/40 p-4 rounded-2xl">
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <UserIcon className="w-4 h-4 text-indigo-500" />
                    {userData.name}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <Mail className="w-4 h-4 text-indigo-500" />
                    {userData.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <PhoneIcon className="w-4 h-4 text-indigo-500" />
                    {userData.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <Building className="w-4 h-4 text-indigo-500" />
                    {userData.institution}
                  </div>
                </div>
              )}

              <form onSubmit={submit} className="mt-6 space-y-5">
                <label className="block">
                  <div className="mb-1.5 flex items-baseline justify-between gap-2">
                    <span className="text-xs font-display font-extrabold uppercase tracking-wider text-ink">Preferred Track</span>
                  </div>
                  <select
                    autoFocus
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Choose a track…</option>
                    {tracks.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!track || isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="h-5 w-5" />}
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </>
          ) : (
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
    </AnimatePresence>
  );
}
