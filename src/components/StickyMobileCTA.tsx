"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [inquiryVisible, setInquiryVisible] = useState(false);

  useEffect(() => {
    const inquiry = document.querySelector<HTMLElement>("#inquiry");
    if (!inquiry) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInquiryVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(inquiry);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/thank-you" || inquiryVisible) return null;

  return (
    <aside className="mobile-cta" aria-label="Quick action">
      <Link
        href="/?service=not-sure#inquiry"
        data-track-event="service_cta_click"
        data-track-label="sticky_mobile_request"
      >
        Request availability
      </Link>
    </aside>
  );
}
