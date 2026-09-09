import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/media/sully-with-lylah.jpg")],
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
