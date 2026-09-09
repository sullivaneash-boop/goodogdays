"use client";

import { useEffect, useRef, useState } from "react";

type ExitIntentOptions = {
  enabled?: boolean;
  minimumDelay?: number;
  topBoundary?: number;
  upwardVelocity?: number;
};

export function useExitIntent({
  enabled = true,
  minimumDelay = 6000,
  topBoundary = 36,
  upwardVelocity = 1.15,
}: ExitIntentOptions = {}) {
  const [triggered, setTriggered] = useState(false);
  const lastPosition = useRef({ y: 0, time: 0 });

  useEffect(() => {
    if (!enabled || triggered) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const armedAt = performance.now() + minimumDelay;

    function trigger() {
      if (performance.now() < armedAt) return;
      setTriggered(true);
    }

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0 && !event.relatedTarget) trigger();
    }

    function handleMouseMove(event: MouseEvent) {
      const now = performance.now();
      const previous = lastPosition.current;
      const elapsed = now - previous.time;

      if (previous.time > 0 && elapsed > 0 && elapsed < 180) {
        const velocity = (event.clientY - previous.y) / elapsed;
        if (event.clientY <= topBoundary && velocity <= -upwardVelocity) {
          trigger();
        }
      }

      lastPosition.current = { y: event.clientY, time: now };
    }

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled, minimumDelay, topBoundary, triggered, upwardVelocity]);

  return triggered;
}
