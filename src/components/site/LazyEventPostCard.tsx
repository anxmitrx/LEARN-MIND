import { useEffect, useRef, useState } from "react";
import { EventPostCard, EventPostCardProps } from "./EventPostCard";

/**
 * A lightweight wrapper around EventPostCard that defers rendering the heavy image
 * and DOM elements until the card is within 600px of the viewport.
 * This significantly reduces DOM bloat on long feeds and prevents FPS drops.
 */
export function LazyEventPostCard(props: EventPostCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, just render it immediately
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only need to observe once, then it stays rendered
        }
      },
      {
        rootMargin: "600px 0px", // Trigger 600px before it enters viewport
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fixed minimum height to prevent layout shifts before loading
  return (
    <div ref={containerRef} className="min-h-[400px] w-full">
      {isVisible ? (
        <EventPostCard {...props} />
      ) : (
        <div className="w-full h-[400px] bg-slate-50/50 animate-pulse rounded-2xl border border-slate-200 mb-6" />
      )}
    </div>
  );
}
