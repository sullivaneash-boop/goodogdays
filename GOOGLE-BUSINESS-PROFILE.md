# Good Dog Days: website and Google Business Profile

Verified September 15, 2026 against the owner's confirmation and the public Google profile.

## Website implementation

- Shared business number: **765-621-8980** (`+17656218980`), in `src/data/site.ts`.
- SMS alternatives: homepage hero and intake/contact section, services hero, each service card, final services CTA, footer, and the two-action mobile bar.
- Intake remains the filled primary CTA. The mobile bar hides while the homepage intake is visible.
- Number is visible and selectable in contact/footer areas. Number links open SMS, not calls.
- Default and service-specific SMS bodies are percent-encoded. The click handler selects Apple Messages' `&body=` form on iOS/iPadOS; other devices use `?body=`.
- The existing Organization JSON-LD includes name, production URL, logo, service area, primary telephone, ContactPoint, and Google Maps, Instagram, and Facebook `sameAs` references. No street address or unsupported reviews/ratings are published.
- Analytics events: `sms_click` for all text CTAs; `phone_click` with `method: sms` additionally for displayed-number clicks; `google_profile_click`; `get_started_click` for intake-bound links. Existing `service_cta_click` is retained. Use labels to distinguish placements. Do not sum the overlapping events as separate leads.

## Update manually in Google Business Profile

Open the official profile: https://www.google.com/maps/place/Good+Dog+Days/data=!4m2!3m1!1s0x0:0x636515dd5223fc57

1. **Website:** set `https://www.goodogdays.com/`. The profile currently points to the working bare domain, `https://goodogdays.com/`; using the canonical www version avoids a redirect.
2. **Primary phone:** retain **765-621-8980**. This already matches the public profile.
3. **Text messages, if available:** Edit profile → Contact → Chat → Text message → enter **+17656218980** → Save. Google only offers this in eligible regions/profiles. This is separate from the primary phone field.
4. **Services link, if offered:** `https://www.goodogdays.com/services`.
5. **Appointment/booking link, if offered:** `https://www.goodogdays.com/?service=not-sure#inquiry`. This is a request for care, not an instant confirmed booking; label it accordingly where possible.
6. **Service area:** match Cumming and the actual covered areas of Central, West and North Forsyth County, Georgia. Keep the residential address hidden for this service-area business.
7. **Description:** the current Google description says “surrounding North Georgia communities,” which is broader than the site. Replace that phrase with “select areas of Central, West and North Forsyth County” unless broader coverage is actually intended. The business name and service types otherwise match.
8. **Social profiles:** under Edit profile → Contact → Social profiles, add the two owner-confirmed business accounts: Instagram `https://www.instagram.com/goodogdays` and Facebook `https://www.facebook.com/profile.php?id=61594220222097`. These are the only official social profiles and are included in the website's structured data. Sully's TikTok videos remain individual story links, not business identity references. Do not add TikTok or the unrelated `@gooddogdays.co` Instagram account to GBP.
9. **Hours:** Google displays an opening time of 5 AM. Confirm the full schedule in the owner dashboard; the site does not publish hours, so no schedule was inferred into structured data.

## Launch and verification

- Deploy these website changes through the normal deployment workflow; this task does not change the live deployment or GBP settings.
- Ensure production `NEXT_PUBLIC_SITE_URL=https://www.goodogdays.com` and a valid `NEXT_PUBLIC_GA_MEASUREMENT_ID` are configured. The fetched production HTML did not contain a GA tag; verify the production setting rather than assuming events currently reach Google. Use GA4 DebugView/Realtime to confirm receipt after deployment and optionally mark `sms_click` or completed intake as a key event.
- Live production check: homepage HTTP 200, robots allows `/`, metadata says `index, follow`, canonical and sitemap use the custom www domain.
- Local checks: 20 contact, services, and launch regression tests passed. JSON-LD is parsed and checked for identity, phone, logo, area, Maps URL and absence of an address. Lint and a Webpack production build pass. Turbopack could not bind its local worker port in this environment.
- Before launch, tap Text Sully on a physical iPhone and Android phone: check recipient and the complete default/service-specific body, then dismiss the draft without sending. Emulated mobile tests verify URI construction and click handling, not native messaging apps.
- After deployment, inspect the URL in Search Console and rerun Schema.org Validator against the public URL. Organization markup intentionally does not claim LocalBusiness rich-result eligibility requiring a public address.

Google documentation:
- Chat: https://support.google.com/business/answer/15013580
- Service/appointment links: https://support.google.com/business/answer/6218037
- Social profiles: https://support.google.com/business/answer/13580646
