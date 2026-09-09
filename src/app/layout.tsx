import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/dm-sans";
import { Analytics } from "@/components/Analytics";
import { EngagementLayer } from "@/components/engagement/EngagementLayer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import assets from "@/data/assets.json";
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
  icons: {
    icon: [
      { url: assets.browserFavicon.src, sizes: "any" },
      { url: assets.appIcon.src, type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: assets.appleTouchIcon.src, type: "image/png", sizes: "180x180" }],
  },
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
        <EngagementLayer />
        <Analytics />
      </body>
    </html>
  );
}
