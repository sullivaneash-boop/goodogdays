import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/dm-sans";
import { siteIsIndexable } from "@/lib/site-origin";
import { Analytics } from "@/components/Analytics";
import { EngagementLayer } from "@/components/engagement/EngagementLayer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import assets from "@/data/assets.json";
import { siteConfig } from "@/data/site";
import { sharedPreviewImage, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  robots: siteIsIndexable ? { index: true, follow: true } : { index: false, follow: false },
  title: {
    default: "Dog Walking & Pet Sitting in Cumming, GA | Good Dog Days",
    template: "%s | Good Dog Days",
  },
  description: "Dog walking from $30, in-home pet sitting from $95/day, and Adventures in Cumming and Forsyth County, GA. Personal care with Sully. Tell us about your dog.",
  applicationName: siteConfig.name,
  category: "pet care",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: `${assets.browserFavicon.src}?v=2`, type: "image/x-icon", sizes: "16x16 32x32 48x48 64x64 128x128 256x256" },
      { url: `${assets.browserFaviconSvg.src}?v=2`, type: "image/svg+xml", sizes: "any" },
      { url: `${assets.appIcon.src}?v=2`, type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: `${assets.appleTouchIcon.src}?v=2`, type: "image/png", sizes: "180x180" }],
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dog Walking & Pet Sitting in Cumming, GA | Good Dog Days",
    description: "Dog walking, enrichment, in-home pet sitting and Adventures in Cumming and Forsyth County. Individual care, clear pricing, and updates from Sully.",
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [sharedPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Walking & Pet Sitting in Cumming, GA | Good Dog Days",
    description: "Dog walking, enrichment, in-home pet sitting and Adventures in Cumming and Forsyth County. Individual care, clear pricing, and updates from Sully.",
    images: [sharedPreviewImage],
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
