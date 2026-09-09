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

The inquiry form is connected to Formspree form `xbgjqyyz` using `@formspree/react`. It preserves service-prefilled links, includes a honeypot, records referrer/UTM attribution and redirects successful requests to `/thank-you`.

To enable Google Analytics, add a GA4 measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Conversion events for service CTAs, inquiry starts/submissions, email clicks and Adventure story clicks are pushed through the shared analytics adapter.

## Deployment

The app is ready for a standard Vercel Next.js deployment. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin and optionally `NEXT_PUBLIC_GA_MEASUREMENT_ID` for analytics. The legacy `goodogdays.vercel.app` hostname permanently redirects to `https://gooddogdays.com`.
