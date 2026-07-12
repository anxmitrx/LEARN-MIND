import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01ABCXYZ█";

type Props = { text: string; className?: string; duration?: number };

export function ScrambleText({ text, className, duration = 800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const len = text.length;
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const revealed = Math.floor(p * len);
              let s = "";
              for (let i = 0; i < len; i++) {
                if (i < revealed || text[i] === " ") s += text[i];
                else s += CHARS[Math.floor(Math.random() * CHARS.length)];
              }
              setOut(s);
              if (p < 1) requestAnimationFrame(tick);
              else setOut(text);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [text, duration]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
