import type { MetadataRoute } from "next";
import assets from "@/data/assets.json";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(assets.homeHeroPhoto.src)],
    },
    {
      url: absoluteUrl("/services"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/privacy"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
