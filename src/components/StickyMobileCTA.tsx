"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();

  if (pathname === "/thank-you") return null;

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
