import type { Metadata } from "next";
import assets from "@/data/assets.json";
import { siteConfig } from "@/data/site";

export const sharedPreviewImage = {
  url: assets.websiteShareBanner.src,
  width: 2033,
  height: 774,
  type: "image/png",
  alt: assets.websiteShareBanner.alt,
};

export const siteUrl = new URL(siteConfig.url);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createMetadata({
  title,
  description,
  path,
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
      images: [sharedPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [sharedPreviewImage],
    },
  };
}
