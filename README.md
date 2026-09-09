# Good Dog Days

Mobile-first marketing site for Good Dog Days, a personalized dog exercise, enrichment, in-home sitting and outdoor adventure service in Cumming and Forsyth County, Georgia.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editable content

Service and pricing details live in `src/data/services.ts`. Site links, service-area language, process steps and FAQs live in `src/data/site.ts`.

## Lead form and analytics setup

1. Create a form at Formspree.
2. Copy `.env.example` to `.env.local`.
3. Replace the placeholder with the Formspree endpoint in `FORMSPREE_ENDPOINT`.

The preferred endpoint configuration is server-side. The previous `NEXT_PUBLIC_FORMSPREE_ENDPOINT` variable remains supported during migration. The form validates required fields, includes a honeypot, records referrer/UTM attribution and redirects successful requests to `/thank-you`. Without an endpoint, it fails visibly and offers the direct contact email so production cannot silently lose inquiries.

To enable Google Analytics, add a GA4 measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Conversion events for service CTAs, inquiry starts/submissions, email clicks and Adventure story clicks are pushed through the shared analytics adapter.

## Deployment

The app is ready for a standard Vercel Next.js deployment. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin, `FORMSPREE_ENDPOINT` to the live Formspree form URL and optionally `NEXT_PUBLIC_GA_MEASUREMENT_ID` for analytics. The legacy `goodogdays.vercel.app` hostname permanently redirects to `https://gooddogdays.com`.
