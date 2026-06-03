import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: "white" | "yellow" | "ink";
};

export function BentoCard({ children, className, tone = "white", ...rest }: Props) {
  const tones =
    tone === "yellow"
      ? "bg-[#F8EDEB]/50 backdrop-blur-xl border border-white/60 text-slate-800 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-[#F8EDEB]/60 hover:border-white/80"
      : tone === "ink"
      ? "bg-indigo-950/50 backdrop-blur-xl border border-white/30 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-indigo-950/65 hover:border-indigo-500/80"
      : "bg-white/50 backdrop-blur-xl border border-white/60 text-slate-800 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/60 hover:border-white/80";
  return (
    <div
      {...rest}
      className={cn(
        "bento-card relative overflow-hidden rounded-3xl p-4 md:p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] will-change-transform",
        tones,
        className,
      )}
    >
      {children}
    </div>
  );
}
