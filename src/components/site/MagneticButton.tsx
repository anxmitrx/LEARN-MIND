import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
};

export function MagneticButton({ children, className, variant = "primary", size = "md", ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 });
  const sy = useSpring(y, { stiffness: 220, damping: 14 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Magnetic pull disabled for Structured Authority aesthetic
    // x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    // y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const base =
    "relative inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wider transition-colors duration-200 rounded-md cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none";
  const sizes = size === "lg" ? "px-8 py-4 text-sm" : "px-6 py-3 text-xs";
  const variants =
    variant === "primary"
      ? "bg-blue-900 text-white border border-blue-900 hover:bg-blue-800"
      : variant === "outline"
      ? "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
      : "bg-orange-800 text-white shadow-sm hover:bg-orange-700";

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(base, sizes, variants, className)}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
