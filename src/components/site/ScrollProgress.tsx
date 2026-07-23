import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h = document.documentElement;
          const total = h.scrollHeight - h.clientHeight;
          setScale(total > 0 ? h.scrollTop / total : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 origin-left will-change-transform"
        style={{ transform: `scaleX(${scale})` }}
      />
    </div>
  );
}
