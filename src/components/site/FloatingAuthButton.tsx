import { useAuth } from "@/lib/AuthContext";
import { Link } from "@tanstack/react-router";
import { LogIn, LayoutDashboard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingAuthButton() {
  const { user, setShowLoginModal, loading } = useAuth();

  if (loading) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 hidden md:block"
      >
        {user ? (
          <Link
            to="/dashboard"
            className="group flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-xl border border-white/60 text-indigo-700 px-5 py-3.5 text-sm font-display font-extrabold uppercase tracking-wider rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
          >
            <LayoutDashboard className="h-4 w-4 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="group flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-xl border border-white/60 text-indigo-700 px-5 py-3.5 text-sm font-display font-extrabold uppercase tracking-wider rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
          >
            <LogIn className="h-4 w-4 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
            Login / Signup
          </button>
        )}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-2rem)]"
      >
        {user ? (
          <Link
            to="/dashboard"
            className="flex w-full justify-center items-center gap-2 bg-white/90 backdrop-blur-xl border border-white/60 text-indigo-700 px-5 py-3.5 text-sm font-display font-extrabold uppercase tracking-wider rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
          >
            <LayoutDashboard className="h-4 w-4 text-indigo-500" />
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex w-full justify-center items-center gap-2 bg-white/90 backdrop-blur-xl border border-white/60 text-indigo-700 px-5 py-3.5 text-sm font-display font-extrabold uppercase tracking-wider rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
          >
            <LogIn className="h-4 w-4 text-indigo-500" />
            Login / Signup
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
