import { AnimatePresence, motion } from "framer-motion";
import { X, LogIn } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { signInWithGoogle } from "@/lib/firebase";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function GlobalLoginModal() {
  const { showLoginModal, setShowLoginModal, user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // If they're already logged in, or checking state, don't render yet
  if (user || loading) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      await signInWithGoogle();
      setShowLoginModal(false);
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error(error);
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
          onClick={() => setShowLoginModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-3xl text-center"
          >
            <button
              onClick={() => setShowLoginModal(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all rounded-full focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none z-10"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            <div className="mx-auto mt-2 grid h-16 w-16 place-items-center bg-indigo-500/20 text-indigo-700 border border-indigo-500/30 rounded-full shadow-inner mb-6">
              <LogIn className="h-8 w-8" strokeWidth={2.5} />
            </div>

            <h3 className="font-display text-2xl font-bold text-ink">
              Welcome to Learn & Shine
            </h3>
            <p className="mt-3 text-sm font-semibold text-slate-600">
              Please log in or create an account to access the website and reserve your seat in our tracks.
            </p>

            <div className="mt-8 flex flex-col gap-3">
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
                Login with Google
              </button>
              <button
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
                className="flex w-full items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
              >
                Create an Account
              </button>
            </div>
            <p className="mt-5 text-[11px] font-semibold text-slate-500">
              Both options securely authenticate via Google.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
