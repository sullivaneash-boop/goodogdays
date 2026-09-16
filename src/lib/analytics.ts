export type AnalyticsEvent =
  | "adventure_story_click"
  | "email_click"
  | "phone_click"
  | "sms_click"
  | "text_sully_click"
  | "intake_start"
  | "intake_submit"
  | "service_interest"
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

const eventAliases: Partial<Record<AnalyticsEvent, AnalyticsEvent>> = {
  sms_click: "text_sully_click",
  inquiry_start: "intake_start",
  inquiry_submit: "intake_submit",
};

const serviceNames: Record<string, string> = {
  "neighborhood-walk": "Neighborhood Walk",
  "good-dog-session": "Good Dog Session",
  "routine-care": "Pet Sitting",
  "in-home-stay": "Pet Sitting",
  "care-while-away": "Pet Sitting",
  "two-hour-adventure": "Good Dog Adventure",
  "half-day-adventure": "Good Dog Adventure",
  "ultimate-good-dog-day": "Good Dog Adventure",
  "bigger-day": "Good Dog Adventure",
};

export function serviceNameForId(id: string) {
  return Object.hasOwn(serviceNames, id) ? serviceNames[id] : undefined;
}

const sentToGoogle = new WeakSet<object>();

export function trackEvent(
  event: AnalyticsEvent,
  details: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;

  const canonicalEvent = eventAliases[event] ?? event;
  const payload = { event: canonicalEvent, ...details };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  if (window.gtag) {
    window.gtag("event", canonicalEvent, details);
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
