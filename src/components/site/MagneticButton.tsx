import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 });
  const sy = useSpring(y, { stiffness: 220, damping: 14 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 font-display font-extrabold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 rounded-3xl cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none will-change-transform";
  const sizes = size === "lg" ? "px-8 py-4 text-sm" : "px-6 py-3 text-xs";
  const variants =
    variant === "primary"
      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 border border-white/20"
      : variant === "outline"
        ? "border border-white/50 bg-white/20 backdrop-blur-md text-indigo-700 shadow-sm hover:bg-white/30"
        : "bg-indigo-950 text-white shadow-md shadow-indigo-950/20 hover:bg-indigo-900";

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
