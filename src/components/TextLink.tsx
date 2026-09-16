"use client";

import type { ReactNode } from "react";
import { smsHref } from "@/lib/contact";

export function TextLink({ service, placement, phoneNumber = false, className = "text-contact-link", children = "Text Sully" }: {
  service?: string;
  placement: string;
  phoneNumber?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return <a
    href={smsHref(service)}
    className={className}
    data-track-event="sms_click"
    data-track-label={placement}
    data-service-id={placement.startsWith("service_") ? placement.slice("service_".length) : undefined}
    data-contact-number={phoneNumber || undefined}
    onClick={(event) => {
      const apple = /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      event.currentTarget.href = smsHref(service, apple);
    }}
  >{children}</a>;
}
