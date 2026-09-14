import type { MetadataRoute } from "next";
import { siteIsIndexable } from "@/lib/site-origin";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {

  return {
    rules: !siteIsIndexable
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: siteIsIndexable ? absoluteUrl("/sitemap.xml") : undefined,
    host: absoluteUrl("/"),
  };
}
