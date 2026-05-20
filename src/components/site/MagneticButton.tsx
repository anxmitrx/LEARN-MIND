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
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const base =
    "relative inline-flex items-center justify-center gap-2 border-2 border-ink font-display font-extrabold uppercase tracking-wider transition-[box-shadow,transform] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";
  const sizes = size === "lg" ? "px-8 py-4 text-sm" : "px-6 py-3 text-xs";
  const variants =
    variant === "primary"
      ? "bg-yellow text-ink shadow-brutal hover:shadow-brutal-lg"
      : variant === "outline"
      ? "bg-background text-ink shadow-brutal-sm hover:shadow-brutal"
      : "bg-ink text-background shadow-brutal hover:shadow-brutal-lg";

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
