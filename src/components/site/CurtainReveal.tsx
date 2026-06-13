import { useEffect, useState } from "react";

export function CurtainReveal() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 200);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] bg-slate-50 animate-curtain"
      style={{ willChange: "transform" }}
    />
  );
}
