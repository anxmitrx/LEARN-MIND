import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: "white" | "yellow" | "ink";
};

export function BentoCard({ children, className, tone = "white", ...rest }: Props) {
  const tones =
    tone === "yellow"
      ? "bg-yellow text-ink"
      : tone === "ink"
      ? "bg-ink text-background"
      : "bg-background text-ink";
  return (
    <div
      {...rest}
      className={cn(
        "bento-card relative overflow-hidden rounded-3xl p-6 shadow-md shadow-[#3A3532]/5",
        tones,
        className,
      )}
    >
      {children}
    </div>
  );
}
