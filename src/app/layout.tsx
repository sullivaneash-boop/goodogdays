import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/dm-sans";
import { Analytics } from "@/components/Analytics";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { siteConfig } from "@/data/site";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Dog Walking & In-Home Dog Care in Cumming, GA | Good Dog Days",
    template: "%s | Good Dog Days",
  },
  description: "Personalized dog walking, enrichment sessions, in-home care and premium dog adventures in Cumming and Forsyth County, Georgia.",
  applicationName: siteConfig.name,
  category: "pet care",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dog Walking & In-Home Dog Care in Cumming, GA | Good Dog Days",
    description: "Personalized dog walking, enrichment and in-home care in Cumming and Forsyth County.",
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Walking & In-Home Dog Care in Cumming, GA | Good Dog Days",
    description: "Personalized dog walking, enrichment and in-home care in Cumming and Forsyth County.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0f2942",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <StickyMobileCTA />
        <Analytics />
      </body>
    </html>
  );
}
