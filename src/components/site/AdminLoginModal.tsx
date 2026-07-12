import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldAlert } from "lucide-react";
import { auth, signInWithGoogle } from "@/lib/firebase";
import { useNavigate } from "@tanstack/react-router";

const inputCls =
  "w-full border border-white/50 bg-white/25 pl-11 pr-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-full focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    if (!auth) {
      setError("Firebase Authentication is not available.");
      setLoading(false);
      return;
    }

    try {
      await signInWithGoogle();
      onClose();
      navigate({ to: "/admin" });
    } catch (err: any) {
      console.error("Google login failed:", err);
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden bg-white/60 backdrop-blur-xl border border-white/50 p-8 shadow-2xl rounded-3xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center bg-white/20 backdrop-blur-md text-indigo-600 border border-white/40 transition-all hover:scale-105 active:scale-95 hover:bg-white/40 hover:border-white rounded-full shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-indigo-500/10 text-indigo-600 border border-indigo-500/30 rounded-2xl flex items-center justify-center shadow-inner mb-4">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <span className="font-mono text-[10px] font-bold text-indigo-600/70 tracking-widest uppercase">
                // CONTROL ACCESS
              </span>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-slate-900 leading-tight">
                Admin Authentication
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 font-semibold max-w-xs leading-relaxed">
                Provide secure credentials to enter the Admin Command Center.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-2xl flex items-start gap-2 text-red-700 text-xs font-bold animate-shake">
                  <span className="mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3.5 font-display text-sm font-bold rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                {loading ? "Authenticating..." : "Continue with Google"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
