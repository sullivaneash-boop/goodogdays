"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { trackEvent, flushAnalyticsQueue, serviceNameForId, type AnalyticsEvent } from "@/lib/analytics";

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-2FFYPC1K8G";
const measurementId = /^G-[A-Z0-9]+$/.test(configuredMeasurementId) && configuredMeasurementId !== "G-XXXXXXXXXX"
  ? configuredMeasurementId
  : undefined;

export function Analytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);
  const gaReady = useRef(false);

  useEffect(() => {
    if (lastPage.current === pathname) return;
    lastPage.current = pathname;
    trackEvent("page_view", { page_path: pathname, page_location: window.location.origin + pathname, page_title: document.title });
  }, [pathname]);

  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-track-event], a[href]")
        : null;
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      const inferredEvent = href.includes("#inquiry") ? "service_cta_click"
        : href.startsWith("sms:") ? "sms_click"
        : href.startsWith("tel:") ? "phone_click"
        : href.startsWith("mailto:") ? "email_click" : null;
      const name = target.dataset.trackEvent as AnalyticsEvent | undefined ?? inferredEvent;
      if (!name) return;
      if (name === "sms_click" && target.dataset.contactNumber === "true") {
        trackEvent("phone_click", { label: target.dataset.trackLabel ?? "", method: "sms" });
      }
      if (href.includes("#inquiry")) {
        trackEvent("get_started_click", { label: target.dataset.trackLabel ?? target.textContent?.trim() ?? "", destination: href });
      }
      const serviceId = target.dataset.serviceId ?? new URL(href || "/", window.location.origin).searchParams.get("service") ?? "";
      const serviceName = serviceNameForId(serviceId);
      if (serviceName) trackEvent("service_interest", { service_name: serviceName, service_id: serviceId, label: target.dataset.trackLabel ?? "" });
      trackEvent(name, {
        label: target.dataset.trackLabel ?? target.textContent?.trim() ?? "",
        destination: href,
      });
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const family = (entry.target as HTMLElement).dataset.serviceFamily;
        if (!entry.isIntersecting || !family || seen.has(family)) continue;
        seen.add(family);
        trackEvent("service_view", { service_family: family });
      }
    }, { threshold: 0.25 });
    document.querySelectorAll("[data-service-family]").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="good-dog-days-analytics" strategy="afterInteractive" onReady={() => {
        if (gaReady.current) return;
        gaReady.current = true;
        flushAnalyticsQueue();
      }}>
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:false});`}
      </Script>
    </>
  );
}
