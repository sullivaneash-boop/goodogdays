import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const siteUrl = new URL(siteConfig.url);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
