import { services } from "@/data/services";
import assets from "@/data/assets.json";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl(assets.organizationLogo.src),
  description:
    "Dog walking, activity sessions, in-home dog care and dog adventures in Cumming and Forsyth County, Georgia.",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Cumming and Forsyth County, Georgia",
  },
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((service) => ({
    "@type": "Service",
    "@id": `${siteConfig.url}/services#${service.id}`,
    name: service.name,
    description: service.description,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Cumming and select areas of Forsyth County, Georgia",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: service.price.replace(/[^0-9.]/g, ""),
      url: `${siteConfig.url}/services#${service.id}`,
    },
  })),
};
