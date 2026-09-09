"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const measurementId = /^G-[A-Z0-9]+$/.test(configuredMeasurementId)
  ? configuredMeasurementId
  : undefined;

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", { page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-track-event]")
        : null;

      if (!target) return;

      trackEvent(target.dataset.trackEvent as AnalyticsEvent, {
        label: target.dataset.trackLabel ?? target.textContent?.trim() ?? "",
        destination: target.getAttribute("href") ?? "",
      });
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="good-dog-days-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:false});`}
      </Script>
    </>
  );
}
