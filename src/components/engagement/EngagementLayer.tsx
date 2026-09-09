"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { ExitIntentModal } from "@/components/engagement/ExitIntentModal";
import { ScrollOfferCard } from "@/components/engagement/ScrollOfferCard";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useScrollDepthTrigger } from "@/hooks/useScrollDepthTrigger";
import { trackEvent } from "@/lib/analytics";

const dismissKeys = {
  scroll: "gdd-scroll-offer-dismissed",
  exit: "gdd-exit-offer-dismissed",
} as const;

export function EngagementLayer() {
  const pathname = usePathname();
  const isEligiblePage = pathname === "/" || pathname === "/services";
  const [scrollDismissed, setScrollDismissed] = useState(false);
  const [exitDismissed, setExitDismissed] = useState(false);
  const [inquiryVisible, setInquiryVisible] = useState(false);
  const [formEngaged, setFormEngaged] = useState(false);
  const scrollViewTracked = useRef(false);
  const exitViewTracked = useRef(false);
  const scrollTriggered = useScrollDepthTrigger({
    threshold: 0.6,
    enabled: isEligiblePage && !scrollDismissed,
  });
  const exitTriggered = useExitIntent({
    enabled: isEligiblePage && !exitDismissed && !formEngaged,
    minimumDelay: 8000,
  });
  const showExit =
    isEligiblePage && exitTriggered && !exitDismissed && !formEngaged;
  const showScroll =
    isEligiblePage &&
    scrollTriggered &&
    !scrollDismissed &&
    !showExit &&
    !inquiryVisible &&
    !formEngaged;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setScrollDismissed(sessionStorage.getItem(dismissKeys.scroll) === "true");
      setExitDismissed(sessionStorage.getItem(dismissKeys.exit) === "true");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const inquiry = document.querySelector<HTMLElement>("#inquiry");
    if (!inquiry) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInquiryVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    function handleFocusIn(event: FocusEvent) {
      if (event.target instanceof Element && event.target.closest("#inquiry form")) {
        setFormEngaged(true);
      }
    }

    observer.observe(inquiry);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [pathname]);

  useEffect(() => {
    if (!showScroll || scrollViewTracked.current) return;
    scrollViewTracked.current = true;
    trackEvent("scroll_offer_view", { page_path: pathname });
  }, [pathname, showScroll]);

  useEffect(() => {
    if (!showExit || exitViewTracked.current) return;
    exitViewTracked.current = true;
    trackEvent("exit_intent_view", { page_path: pathname });
  }, [pathname, showExit]);

  const dismissScroll = useCallback(() => {
    sessionStorage.setItem(dismissKeys.scroll, "true");
    setScrollDismissed(true);
  }, []);

  const dismissExit = useCallback(() => {
    sessionStorage.setItem(dismissKeys.exit, "true");
    setExitDismissed(true);
  }, []);

  const offer = pathname === "/services"
    ? {
        title: "Not sure which kind of day fits?",
        body: "Tell us what you need and a little about your dog. We’ll help with the next step.",
        href: "/?service=not-sure#inquiry",
      }
    : {
        title: "Your dog has plans.",
        body: "Tell us what they love and what kind of help you need. We’ll take it from there.",
        href: "/#inquiry",
      };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {showScroll ? (
            <ScrollOfferCard
              key="scroll-offer"
              {...offer}
              onDismiss={dismissScroll}
              onAccept={() => {
                trackEvent("scroll_offer_click", { page_path: pathname });
                dismissScroll();
              }}
            />
          ) : null}
          {showExit ? (
            <ExitIntentModal key="exit-intent" onDismiss={dismissExit} />
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
