# Google Analytics 4

## Installation

The existing `Analytics` component is already mounted once in `src/app/layout.tsx`. It uses Next.js `Script` with `afterInteractive`; no page-level tags, GTM container, or extra analytics dependency is installed. The default measurement ID is **G-2FFYPC1K8G**. An optional `NEXT_PUBLIC_GA_MEASUREMENT_ID` build-time override remains supported; leave it unset or set it to this ID. Remove any stale override before deployment.

The helper queues early events and forwards them once when the tag initializes. Existing legacy calls for `sms_click`, `inquiry_start`, and `inquiry_submit` resolve to the new names below without also sending legacy copies. Other existing events remain supported.

## Events

| Event | Trigger |
| --- | --- |
| `get_started_click` | A link leading to the shared intake |
| `text_sully_click` | An SMS CTA, including visible-number links |
| `phone_click` | A visible phone-number SMS link (`method: sms`) or a `tel:` link if introduced |
| `intake_start` | First focus within an intake instance, once per instance |
| `intake_submit` | Formspree returns an HTTP success after a valid submission; never on the submit click or failed request |
| `google_profile_click` | Google Profile footer link |
| `service_interest` | Service-specific intake/SMS CTA or an intake service-selection change |

`service_interest` includes `service_name` when known: Neighborhood Walk, Good Dog Session, Pet Sitting, or Good Dog Adventure. The combined Walking + Enrichment intake choice uses `service_category` instead of guessing which service is intended. `label` identifies CTA placement, and service-specific links include `service_id`. Successful intake includes `form_name: good_dog_days_intake`, `service_name` (specific service, or the selected category as a fallback), `selected_service` (the category ID), and `pet_size` (a fixed size choice). A synchronous in-flight/completed guard prevents repeat submissions and duplicate success events; failed requests remain retryable. No submitted personal details or free-text answers are sent by the helper.

Click events are queued synchronously before default navigation without delaying or preventing the SMS handoff. Delivery remains subject to connectivity, browser settings and blockers. Phone-number clicks produce both phone and text events intentionally; do not add these together as distinct leads.

## Manual GA4 settings

1. Admin → Data streams → select this web stream. Confirm its Measurement ID is `G-2FFYPC1K8G` and URL is `https://www.goodogdays.com`.
2. Enhanced measurement → settings → Page views → Show advanced settings: **turn off page changes based on browser history events**. The site explicitly sends one `page_view` per pathname navigation, with `send_page_view: false` in its config. That config flag alone does not disable GA4's separate history listener. Leave other desired enhanced measurement features enabled.
3. Mark **`intake_submit`** as a key event. Optionally mark `text_sully_click` as another key event; a text click is an intent signal, not proof a message was sent. Do not use automatic `form_submit` as a successful lead because it may include failed attempts.
4. Admin → Custom definitions: register event-scoped dimensions for `service_name` and, if useful, `service_category`, `service_id`, and `label`. These help break down standard reports; allow 24–48 hours for processed reporting.
5. No GA4 “Create event” rules are needed to recreate these events. Remove any rules that would duplicate the same event names from the legacy ones.

## Verify after deployment

- Open the live site with blockers disabled; in GA4 Reports → Realtime, confirm your visit and click events.
- For an isolated debug session, connect the site through Google Tag Assistant and open GA4 Admin → DebugView. Navigate between the homepage and Services; check one `page_view` per route and a single Google tag/config.
- Click a service's Get Started, Text Sully (dismiss the draft without sending), and Google Profile. Inspect `service_interest` → `service_name`.
- A real completed intake is needed to verify a production `intake_submit`; only submit a test inquiry if you intend it to reach the business inbox. Validation errors and failed responses must not count as success.
- In browser Network, filter `gtag/js` (one script) and `collect` (GA4 event batches). Requests should use `tid=G-2FFYPC1K8G`.

## Local validation

Production build: `npm run build -- --webpack`, then `npm run start -- --port 3100`.

`PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e -- tests/analytics.spec.ts`

The integration test loads the real Google script and intercepts collection requests before delivery to keep automated activity out of business reports. It verifies outbound payloads for all seven events, single tag/config across client navigation, failed submission followed by success, absence of submitted personal data, and no unexpected console/hydration errors. The deliberate failed HTTP request is excluded from the console-error assertion. This validates the tag and outgoing payloads, not receipt inside the GA4 account.

References:
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://support.google.com/analytics/answer/7201382
- https://support.google.com/analytics/answer/14240153
