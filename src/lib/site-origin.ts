/** One canonical origin for metadata, sitemaps and structured data. */
export function resolveSiteOrigin(configured?: string) {
  const value = configured?.trim() || "https://www.goodogdays.com";
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a full origin, such as https://your-domain.com.");
  }
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if ((!local && url.protocol !== "https:") || (local && !["http:", "https:"].includes(url.protocol)) || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, credentials, query, or fragment.");
  }
  return url.origin;
}

export const siteOrigin = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
export const siteIsIndexable = process.env.VERCEL_ENV !== "preview" && !new URL(siteOrigin).hostname.match(/^(localhost|127\.0\.0\.1)$/);
