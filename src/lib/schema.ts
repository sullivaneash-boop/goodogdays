import { services } from "@/data/services";
import assets from "@/data/assets.json";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: siteConfig.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl(assets.organizationLogo.src),
  description:
    "Dog walking, enrichment visits, in-home pet sitting and dog adventures in Cumming and Forsyth County, Georgia.",
  areaServed: {
    "@type": "AdministrativeArea",
    name: siteConfig.serviceArea,
  },
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((service) => ({
    "@type": "Service",
    "@id": absoluteUrl(`/services#${service.id}`),
    name: service.name,
    description: service.description,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Cumming and select areas of Forsyth County, Georgia",
    offers: [
      {
        "@type": "Offer",
        name: service.weeklyPlans ? `${service.shortName} — Single visit` : service.name,
        priceCurrency: "USD",
        price: service.price.replace(/[^0-9.]/g, ""),
        url: absoluteUrl(`/services#${service.id}`),
      },
      ...(service.weeklyPlans ?? []).map((plan) => ({
        "@type": "Offer",
        name: `${service.shortName} — ${plan.name}`,
        description: `${plan.visits} visits per week for $${plan.price}/week.`,
        priceCurrency: "USD",
        price: String(plan.price),
        url: absoluteUrl(`/services#${service.id}`),
      })),
    ],
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: siteConfig.name,
  url: absoluteUrl("/"),
  publisher: { "@id": absoluteUrl("/#organization") },
  inLanguage: "en-US",
};
