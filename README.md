# Good Dog Days

Mobile-first marketing site for Good Dog Days, a personalized dog exercise, enrichment, in-home sitting and outdoor adventure service in Cumming and Forsyth County, Georgia.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editable content

Service copy, pricing placeholders, links, service-area language, process steps, form options and FAQs live in `src/data/site.ts`.

## Formspree setup

1. Create a form at Formspree.
2. Copy `.env.example` to `.env.local`.
3. Replace the placeholder with the Formspree endpoint.

Without an endpoint, the form runs in preview mode and shows the intended success state without sending data.

## Deployment

The app is ready for a standard Vercel Next.js deployment. Set `NEXT_PUBLIC_SITE_URL` to the production origin and `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to the live Formspree form URL.
