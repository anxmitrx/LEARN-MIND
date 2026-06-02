import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export function TopBanner() {
  const bannerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    const updateHeight = (el: HTMLElement) => {
      document.documentElement.style.setProperty(
        "--banner-height",
        `${el.offsetHeight}px`
      );
    };

    // Initial check
    updateHeight(bannerRef.current);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLElement) {
          updateHeight(entry.target);
        }
      }
    });

    resizeObserver.observe(bannerRef.current);

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty("--banner-height");
    };
  }, []);

  return (
    <Link
      ref={bannerRef}
      to="/class-12-consult"
      className="group sticky top-0 z-50 flex min-h-10 w-full items-center justify-center bg-[#FDFBF7]/70 backdrop-blur-md border-b border-white/40 px-4 py-2.5 text-center text-xs font-bold text-ink hover:underline md:text-sm"
    >
      <span className="flex items-center justify-center gap-1.5 leading-tight">
        <span>
          🎓 CLASS 12 STUDENTS: Confused about college? Book a 1-on-1 Roadmap Consultation at our lowest price ever.
        </span>
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
