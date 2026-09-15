import { siteConfig } from "@/data/site";

export const defaultSmsMessage = "Hey Sully! I found Good Dog Days through your website and I'm interested in getting some help with my dog. Their name is ___ and I'm located in ___.";

export function smsMessage(service?: string) {
  return service
    ? `Hey Sully! I'm interested in ${service} for my dog. Their name is ___ and I'm located in ___.`
    : defaultSmsMessage;
}

export function smsHref(service?: string, apple = false) {
  // Apple Messages uses &body; other handlers use the RFC 5724 ?body form.
  const body = encodeURIComponent(smsMessage(service)).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  return `sms:${siteConfig.phone}${apple ? "&" : "?"}body=${body}`;
}
