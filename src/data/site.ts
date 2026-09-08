export const siteConfig = {
  name: "Good Dog Days",
  tagline: "Better days for good dogs.",
  location: "Cumming + Forsyth County, Georgia",
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "",
  social: {
    instagram: "#",
    tiktok: "https://www.tiktok.com/@sullyeash",
    email: "mailto:hello@gooddogdays.com",
  },
} as const;

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Adventure Days", href: "#adventures" },
  { label: "Our Story", href: "#story" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

export const principles = [
  "Personalized activity",
  "One or two dogs at a time",
  "Photo + recap after sessions",
  "Built around temperament, energy + routine",
] as const;

export const services = [
  {
    number: "01",
    name: "Good Dog Sessions",
    kicker: "The everyday one",
    price: "Starting at $XX",
    description:
      "Personalized activity and enrichment shaped around what your dog actually needs that day—not a predefined lap around the neighborhood.",
    details:
      "Neighborhood walks, sniff-heavy walks, running, fetch, tug, enrichment games and appropriate local outings can all be part of a session.",
  },
  {
    number: "02",
    name: "Good Dog Stays",
    kicker: "The home-base one",
    price: "Custom care options",
    description:
      "Premium in-home care that keeps your dog close to the routine, surroundings and comforts they already know.",
    details:
      "Options will range from scheduled visits to more comprehensive in-home stays. We’ll keep the details simple here and build the right plan together.",
  },
  {
    number: "03",
    name: "Good Dog Adventures",
    kicker: "The big one",
    price: "2-hour, half-day + full-day",
    description:
      "Trails, longer walks, running, swimming, parks, exploration and new environments—chosen for the individual dog, never forced from a checklist.",
    details:
      "Photos, videos and updates are part of the experience. Every dog completes at least one standard Good Dog Session before their first Adventure so we can get to know each other first.",
  },
] as const;

export const proofStories = [
  {
    name: "Red",
    label: "Shelter Adventure Day / Cumming, GA",
    description:
      "Red traded a day inside the shelter for exploration, new people, good treats and the kind of focused enrichment that lets a dog’s personality come through.",
    image: "/media/red-trail-opt.jpg",
    alt: "Red exploring a sunny trail while wearing an Adopt Me harness",
    href: "https://www.tiktok.com/@sullyeash/video/7676155682902543629",
    cta: "Watch Red’s Adventure Day",
  },
  {
    name: "Savannah",
    label: "Shelter Adventure Day / Cumming, GA",
    description:
      "Savannah’s day mixed water, trail exploration, activity around town and plenty of attention from people—a full change of pace from shelter life.",
    image: "/media/savannah-trail-opt.jpg",
    alt: "Savannah standing on a red-clay trail in a pink adventure harness",
    href: "https://www.tiktok.com/@sullyeash/video/7681492434601200909",
    cta: "Watch Savannah’s Adventure Day",
  },
] as const;

export const processSteps = [
  { title: "Tell me about your dog.", body: "Send over a few basics and what you’re looking for." },
  { title: "We meet first.", body: "Before a dog is left in Good Dog Days’ care, we’ll do a short owner-present introduction." },
  { title: "We build their Good Dog Day.", body: "Activity is selected around your dog’s energy, temperament, environment and needs." },
  { title: "You get the recap.", body: "After normal sessions, you’ll receive a photo and a written update." },
] as const;

export const serviceInterests = [
  "Good Dog Session",
  "Good Dog Stay",
  "Good Dog Adventure",
  "Not sure yet",
] as const;

export const faqItems = [
  { question: "What is a Good Dog Session?", answer: "A one-on-one or two-dog session built around your dog’s needs that day. It can blend movement, sniffing, play, enrichment and an appropriate local outing." },
  { question: "Are sessions only walks?", answer: "No. A walk might be part of the plan, but so might running, fetch, tug, enrichment games, decompression time or getting into a new environment." },
  { question: "What types of dogs do you work with?", answer: "Dogs of different breeds, ages, energy levels and personalities are considered. The first conversation and owner-present introduction help determine whether the service is a good fit." },
  { question: "Can you work with reactive or nervous dogs?", answer: "Possibly. Every dog’s needs, triggers and history are reviewed individually before service. Good Dog Days doesn’t make behavioral or safety guarantees, and some situations may require a qualified trainer or behavior professional first." },
  { question: "Do you take multiple dogs?", answer: "Sessions are intentionally kept personal—typically one dog, or two compatible dogs from the same household." },
  { question: "Can I book an Adventure immediately?", answer: "Not quite. Every dog completes at least one standard Good Dog Session before their first Adventure so Sully can get to know their temperament, handling and routine." },
  { question: "Where do you currently operate?", answer: "Cumming and select areas of Central, West and North Forsyth County, Georgia. Share your neighborhood or ZIP code in the inquiry form and we’ll confirm availability." },
  { question: "Do you provide in-home sitting?", answer: "Yes. Good Dog Stays will range from scheduled home visits to more comprehensive in-home care, depending on fit and availability." },
  { question: "How much notice is required?", answer: "As much as you can give. Availability will vary, especially for stays and longer Adventures. Send an inquiry even if your timing is close and Sully will let you know what’s possible." },
  { question: "What happens when the weather is bad?", answer: "The plan adapts. Heat, storms and unsafe conditions may mean a shorter outdoor activity, a timing change or more indoor enrichment. Your dog’s comfort and sensible risk decisions come first." },
] as const;
