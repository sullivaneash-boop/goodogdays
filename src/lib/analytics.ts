export type AnalyticsEvent =
  | "adventure_story_click"
  | "email_click"
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
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  details: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;

  const payload = { event, ...details };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("gooddogdays:analytics", { detail: payload }));
}
