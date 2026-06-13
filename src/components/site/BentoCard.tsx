import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: "white" | "yellow" | "ink";
};

export function BentoCard({ children, className, tone = "white", ...rest }: Props) {
  const tones =
    tone === "yellow"
      ? "bg-slate-50 border border-slate-200 text-slate-900"
      : tone === "ink"
      ? "bg-blue-900 border border-blue-900 text-white"
      : "bg-white border border-slate-200 text-slate-900";
  return (
    <div
      {...rest}
      className={cn(
        "bento-card relative overflow-hidden rounded-md p-6 transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md",
        tones,
        className,
      )}
    >
      {children}
    </div>
  );
}
