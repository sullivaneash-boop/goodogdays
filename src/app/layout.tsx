import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/oswald";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Good Dog Days | Better days for good dogs",
    template: "%s | Good Dog Days",
  },
  description: "Personalized dog exercise, enrichment, in-home sitting and premium outdoor adventures in Cumming and Forsyth County, Georgia.",
  keywords: ["dog walking Cumming GA", "dog care Forsyth County", "dog adventures", "in-home dog sitting", "dog enrichment"],
  openGraph: {
    title: "Good Dog Days | Better days for good dogs",
    description: "Personalized exercise, enrichment, sitting and adventures for dogs in Cumming and Forsyth County.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Good Dog Days | Better days for good dogs",
    description: "Personalized exercise, enrichment, sitting and adventures for dogs in Cumming and Forsyth County.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
