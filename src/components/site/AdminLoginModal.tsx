import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock, Mail, ShieldAlert } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "@tanstack/react-router";

const inputCls =
  "w-full border border-white/50 bg-white/25 pl-11 pr-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none transition-all rounded-full focus:bg-white/45 focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Attempt Firebase Login
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      // Redirect to admin command center
      navigate({ to: "/admin" });
    } catch (err: any) {
      console.error("Login failed:", err);
      // Firebase auth error handling
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid admin credentials.");
      } else {
        setError(err.message || "An authentication error occurred.");
      }
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
              <span className="font-mono text-[10px] font-bold text-indigo-600/70 tracking-widest uppercase">// CONTROL ACCESS</span>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-slate-900 leading-tight">
                Admin Authentication
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 font-semibold max-w-xs leading-relaxed">
                Provide secure credentials to enter the Admin Command Center.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-7 space-y-4">
              {/* Email Field */}
              <div>
                <label className="block mb-1.5">
                  <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-slate-700">Email Address</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                    placeholder="admin@learnandshine.in"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-1.5">
                  <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-slate-700">Security Password</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls}
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-2xl flex items-start gap-2 text-red-700 text-xs font-bold animate-shake">
                  <span className="mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/20 border border-white/20 transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Authenticating..." : "Login Admin"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
