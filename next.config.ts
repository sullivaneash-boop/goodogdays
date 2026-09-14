import type { NextConfig } from "next";
import { siteOrigin } from "./src/lib/site-origin";
import assets from "./src/data/assets.json";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    const legacyHost = "goodogdays.vercel.app";
    return [
      ...(new URL(siteOrigin).hostname !== legacyHost ? [{
        source: "/:path*",
        has: [{ type: "host" as const, value: legacyHost }],
        destination: `${siteOrigin}/:path*`,
        permanent: true,
      }] : []),
      ...["/opengraph-image", "/services/opengraph-image"].map((source) => ({
        source,
        destination: assets.websiteShareBanner.src,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
