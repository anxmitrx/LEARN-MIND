import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useLocation } from "@tanstack/react-router";

const inputCls =
  "w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-xl focus:bg-white focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <div className="mb-1.5 text-xs font-display font-extrabold uppercase tracking-wider text-ink">
        {label}
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

export function GlobalOnboardingModal() {
  const { user, userData, loading } = useAuth();
  const location = useLocation();
  
  // Show if user is logged in, userData is loaded, onboardingComplete is not true, AND we are not on an admin page
  const show = !loading && user && userData && !userData.onboardingComplete && !location.pathname.startsWith("/admin");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("college"); // school, college, working
  const [institution, setInstitution] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData && show) {
      setName(userData.name || "");
    }
  }, [userData, show]);

  const phoneOk = whatsapp.replace(/\D/g, "").length === 10;
  const canSubmit = name.trim().length >= 2 && age && institution.trim().length >= 2 && phoneOk;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !user) return;
    
    setIsSubmitting(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        age: parseInt(age, 10),
        status,
        institution,
        phone: whatsapp,
        onboardingComplete: true
      });
      // The local AuthContext userData should automatically update via the onAuthStateChanged listener,
      // or at least a full page reload or state update will hide this modal.
    } catch (err) {
      console.error("Error saving onboarding data", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="relative w-full max-w-md overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-3xl text-center"
        >
          <h3 className="font-display text-2xl font-bold text-ink">
            Complete your profile
          </h3>
          <p className="mt-2 text-sm font-semibold text-slate-600 mb-6">
            We need a few more details to personalize your Learn & Shine experience.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full Name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
                placeholder="Arjun Sharma"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Age">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={inputCls}
                  placeholder="20"
                  min="13"
                  max="99"
                />
              </Field>
              <Field label="Current Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={inputCls}
                >
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="working">Working</option>
                </select>
              </Field>
            </div>

            <Field label={status === 'working' ? "Company Name" : "School / College Name"}>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className={inputCls}
                placeholder={status === 'working' ? "Google" : "VIT Vellore"}
              />
            </Field>

            <Field label="WhatsApp Number">
              <div className="flex border border-slate-200 bg-slate-50 rounded-xl overflow-hidden focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 transition-all">
                <span className="grid place-items-center bg-slate-100 px-4 font-mono text-sm font-extrabold text-indigo-600 border-r border-slate-200">
                  +91
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                  className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none"
                  placeholder="98765 43210"
                />
              </div>
            </Field>

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Complete Setup <Check className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
