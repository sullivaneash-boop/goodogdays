# Good Dog Days — prelaunch report

Reviewed September 14, 2026. Confirmed public domain: **https://www.goodogdays.com/**.

**Verdict: implementation is ready for deployment and final owner verification; do not start paid traffic yet.** The live site still serves the old Vercel canonicals. Real lead delivery and analytics reporting have not been confirmed. These are practical launch gates, not reasons to rebuild the site.

## 1. Conversion and copy

- The homepage now immediately identifies dog walking, enrichment, in-home pet sitting and Adventures with Sully in Cumming/Forsyth County. Starting prices are visible in the hero: $30, $95/day and $175.
- Clarified the difference between a neighborhood walk, personalized 60-minute Good Dog Session and longer Adventure. Transportation is an option for an appropriate enrichment visit, never a universal promise.
- Made owner involvement, individual attention, physical and mental activity, and real dog stories more explicit. Added a direct answer to “Who comes to my home?”
- Preserved “Get Started” and the existing three-step intake. Optional personality details now expand on demand. Success copy explains that an inquiry is followed by a conversation and is not a confirmed booking.

## 2. SEO and local SEO

- Centralized the confirmed origin with a validated `NEXT_PUBLIC_SITE_URL` override. Titles, canonical URLs, social metadata, sitemap and schema use it consistently.
- Improved home and services titles/descriptions with natural local service language. Fixed the thank-you page's own canonical while retaining noindex.
- Added a host-specific permanent redirect from `goodogdays.vercel.app`, preserving paths and queries. Preview deployments are noindex and disallowed in robots; the confirmed production domain remains indexable.
- Retained the approved shared banner and favicon assets. Added a branded page with a true HTTP 404 response and useful recovery links.
- Added WebSite schema and aligned Organization/Service data with visible services and prices. JSON-LD parses correctly; all seven services and four weekly-plan offers match current prices. This is code validation, not a claim of Google rich-result eligibility.
- Live checks confirmed apex → www, HTTP → HTTPS and trailing-slash normalization already work. The old Vercel hostname still returns 200 before this change is deployed.

Google recommends consistent canonical signals and people-first crawlable content. See [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) and [Search Essentials](https://developers.google.com/search/docs/essentials).

## 3. AI search / GEO

Business identity, geography, service differences, prices, process and proof are readable page text. No thin city pages, generic blog expansion or artificial AI files were added. This follows [Google's AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

The best next content investment is one permission-cleared, firsthand Adventure recap or an illustrated “what happens during a 60-minute visit” story, using actual outings and outcomes.

## 4. Technical fixes

- Fixed the missing tablet navigation between mobile and desktop breakpoints.
- Prevented the Continue button from moving as validation clears and from becoming a Submit button during a click transition.
- Corrected accessible form labels so status/error text does not become part of the field name. Single-character dog names now work.
- Prevented a stale service query from mislabeling a request after the visitor changes service family.
- Added a 20-second submission timeout with a retryable error; preserved the existing Formspree endpoint and payload structure.
- Fixed footer top anchors on secondary pages and sticky CTA visibility across routes.
- Connected existing analytics events to GA's event API, including replay of events queued before initialization without duplicate forwarding. Kept the existing dataLayer and browser event hooks.

## 5. Mobile and accessibility

Reduced oversized mobile section headings, service-row spacing, decorative hero content and form controls. Improved orange-on-cream copy, footer text, field hints, placeholders and borders. Kept the brand's navy, cream and yellow palette.

Production pages were checked at 320, 390, 768 and 1440px: no horizontal overflow, broken visible images or browser page errors. The sticky CTA hides while the inquiry is visible. All three settled intake steps passed the automated accessibility check. Other pages passed the tested WCAG A/AA rules; the homepage has one reviewed contrast flag on the intentionally faded, aria-hidden county watermark. This decorative text carries no unique information. Automated checks do not constitute a full accessibility certification.

## 6. Performance

The hero now autoplays a roughly 2 MB silent, fast-start MP4 on desktop and mobile, replacing the 15.6 MB source in the live placement. The photo stays visible until the first video frame plays. Playback pauses offscreen or in a hidden tab and resumes when visible unless the visitor manually paused it. Reduced-motion preferences keep the static photo. Responsive hero image sizes match the layout; no new runtime dependencies were added.

## 7. Intentionally unchanged

Preserved the visual identity, three service families, all seven prices, Adventure introduction prerequisite, real photography, approved banner, working popup design, and Formspree lead infrastructure. No CRM, scheduling system or speculative service pages were built.

Retained Organization rather than inventing a public street address for LocalBusiness rich results. [Google's LocalBusiness documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) requires an address for that result type; customer privacy and factual accuracy take precedence.

## 8. Unverified trust signals

No insurance, bonding, background checks, certifications, customer counts, years of professional experience, guarantees, reviews or partnerships were invented. Confirm documentation and permission before adding any of those. Genuine customer reviews and verified professional credentials would materially strengthen trust. Existing rescue-story context does not imply an affiliation.

## 9. Owner/deployment tasks

Before paid traffic:

1. Deploy this pass. Set Vercel Production `NEXT_PUBLIC_SITE_URL=https://www.goodogdays.com` (or remove a stale override so the confirmed default applies), then rebuild. Check the live home/services canonicals, sitemap, banner and legacy-host redirect. Do not assume a code change overrides an existing environment variable.
2. Send a clearly labeled test inquiry on the deployed site. Confirm the record in Formspree **and receipt in the intended inbox**, including service, dog, owner and timing fields. Check spam filtering and recipient configuration. Browser tests mocked submission; the real endpoint's CORS preflight accepted the www origin, but that does not prove storage or email delivery. No real message was sent during this audit.
3. Set a real `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…`, rebuild and verify events in GA4 Realtime/DebugView: `page_view`, `service_cta_click`, `service_view`, `inquiry_start`, `inquiry_submit`. Mark `inquiry_submit` as a key event. No GA script was found on the live site during inspection. The adapter is tested, but actual GA receipt needs account access. See [Google tag configuration](https://developers.google.com/tag-platform/gtagjs/configure).
4. Run one complete inquiry on a physical iPhone/Safari and Android device, checking the keyboard, step transitions, errors and success state. Chromium coverage is complete; WebKit was unavailable locally.

Local discovery and reporting setup:

- Verify the domain property in Google Search Console, submit `https://www.goodogdays.com/sitemap.xml`, and inspect the home/services URLs after deployment.
- Verify or update Google Business Profile with Good Dog Days, the www website, accurate services, actual contact details/hours and the legitimate service area. Hide a residential address when customers are not served there. Profile configuration was not accessible for verification. Follow [Google's service-area business guidelines](https://support.google.com/business/answer/3038177?hl=en).
- Use consistent UTM tags for GBP, Instagram, Facebook and paid campaigns. No Meta pixel/account was configured or invented.
- Refresh social preview caches where necessary; social platforms may retain old cards after deployment.

## 10. Readiness and evidence

**Ready for final launch verification, not yet cleared for paid traffic.** The busy professional, vacation customer, high-energy-dog owner, Adventure viewer, local referral and unfamiliar visitor now share a clear path: recognizable service → price → relevant proof → what happens next → short inquiry. The remaining uncertainty is whether the deployed business receives and measures that inquiry.

Checks completed:

- Asset registry: all 31 assets passed.
- ESLint: passed.
- Production Webpack build and TypeScript checks: passed. Default Turbopack build was blocked by the local sandbox's process/port restriction; deployment must verify the normal build in its own environment.
- Playwright: **22 passed against the production server**, covering service selection, intake success/error/retry, popups, mobile flow, tablet navigation, metadata, internal links, schema prices, real 404, legacy redirect, analytics forwarding and hero playback.
- Four-width production visual/image/runtime audit and settled axe contrast checks completed.

No Lighthouse score, physical Safari result, real Formspree delivery, Google indexing or analytics-account receipt is claimed. Changes remain local until committed and deployed.

Hero autoplay follow-up: three focused production browser checks passed for desktop/mobile autoplay, offscreen pause/resume, manual pause and reduced motion. A cold-cache mobile test at 1.5 Mbps and 80 ms latency began playback in 2.95 seconds, with the hero photo visible during startup. Local measurements are not a guarantee for every device or connection.
