import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Good Dog Days",
    short_name: "Good Dog Days",
    description: "Dog walking, activity sessions and in-home dog care in Cumming, Georgia.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f1e6",
    theme_color: "#0f2942",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
