import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setW(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-[width] duration-75" style={{ width: `${w}%` }} />
    </div>
  );
}
