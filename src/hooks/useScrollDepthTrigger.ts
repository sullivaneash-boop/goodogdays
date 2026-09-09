"use client";

import { RefObject, useEffect, useRef, useState } from "react";

type ScrollDepthOptions = {
  threshold?: number;
  enabled?: boolean;
  targetRef?: RefObject<HTMLElement | null>;
};

export function useScrollDepthTrigger({
  threshold = 0.6,
  enabled = true,
  targetRef,
}: ScrollDepthOptions = {}) {
  const [triggered, setTriggered] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || triggered) return;

    const safeThreshold = Math.min(1, Math.max(0, threshold));

    function measureDepth() {
      frame.current = null;
      const target = targetRef?.current;

      if (target) {
        const rect = target.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top;
        const targetHeight = Math.max(target.offsetHeight, 1);
        const viewportProgress = window.scrollY + window.innerHeight - targetTop;

        if (viewportProgress / targetHeight >= safeThreshold) {
          setTriggered(true);
        }
        return;
      }

      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );

      if (window.scrollY / scrollableHeight >= safeThreshold) {
        setTriggered(true);
      }
    }

    function requestMeasure() {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(measureDepth);
    }

    measureDepth();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [enabled, targetRef, threshold, triggered]);

  return triggered;
}
