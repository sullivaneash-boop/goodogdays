export type AnalyticsEvent =
  | "adventure_story_click"
  | "email_click"
  | "phone_click"
  | "sms_click"
  | "google_profile_click"
  | "get_started_click"
  | "exit_intent_view"
  | "inquiry_start"
  | "inquiry_submit"
  | "page_view"
  | "priority_callback_submit"
  | "scroll_offer_click"
  | "scroll_offer_view"
  | "service_cta_click"
  | "service_view";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (command: string, event: string, details?: Record<string, unknown>) => void;
  }
}

const sentToGoogle = new WeakSet<object>();

export function trackEvent(
  event: AnalyticsEvent,
  details: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;

  const payload = { event, ...details };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  if (window.gtag) {
    window.gtag("event", event, details);
    sentToGoogle.add(payload);
  }
  window.dispatchEvent(new CustomEvent("gooddogdays:analytics", { detail: payload }));
}

/** Replay pre-initialization events once the Google tag has been configured. */
export function flushAnalyticsQueue() {
  if (!window.gtag) return;
  for (const payload of [...(window.dataLayer ?? [])]) {
    if (typeof payload.event !== "string" || sentToGoogle.has(payload)) continue;
    const { event, ...details } = payload;
    window.gtag("event", event, details);
    sentToGoogle.add(payload);
  }
}
