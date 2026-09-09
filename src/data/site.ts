import assets from "@/data/assets.json";

export const siteConfig = {
  name: "Good Dog Days",
  tagline: "Better days for good dogs.",
  location: "Cumming + Forsyth County, Georgia",
  serviceArea: "Cumming and select areas of Central, West and North Forsyth County",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://goodogdays.vercel.app",
} as const;

export const navigation = [
  { label: "Services & Pricing", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Service Area", href: "/#service-area" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const trustFacts = [
  {
    title: "One or two dogs at a time",
    body: "Personal attention—not a giant group walk.",
  },
  {
    title: "Built around your dog",
    body: "Movement, sniffing, play, enrichment or company.",
  },
  {
    title: "Updates after care",
    body: "A photo and written recap after standard sessions.",
  },
  {
    title: "Meet first",
    body: "An owner-present introduction before solo care.",
  },
  {
    title: "Local service area",
    body: "Cumming and select Forsyth County neighborhoods.",
  },
] as const;

export const safetyFacts = [
  {
    title: "Fit comes first",
    body: "Every dog is considered individually, with an owner-present introduction before care begins.",
  },
  {
    title: "Small by design",
    body: "Sessions are typically one dog, or two compatible dogs from the same household.",
  },
  {
    title: "The plan can change",
    body: "Heat, storms, unsafe conditions and your dog’s comfort can change the activity or timing.",
  },
  {
    title: "Adventures are earned",
    body: "Every dog completes a standard Good Dog Session before transportation to a bigger outing.",
  },
] as const;

export const proofStories = [
  {
    name: "Red",
    label: "Shelter Adventure Day / Cumming, GA",
    description:
      "Red traded a day inside the shelter for exploration, new people, good treats and the kind of focused enrichment that lets a dog’s personality come through.",
    cover: assets.redStoryCover.src,
    alt: assets.redStoryCover.alt,
    videoId: "7676155682902543629",
    href: "https://www.tiktok.com/@sullyeash/video/7676155682902543629",
    cta: "Watch Red’s Adventure Day",
  },
  {
    name: "Savannah",
    label: "Shelter Adventure Day / Cumming, GA",
    description:
      "Savannah’s day mixed water, trail exploration, activity around town and plenty of attention from people—a full change of pace from shelter life.",
    cover: assets.savannahStoryCover.src,
    alt: assets.savannahStoryCover.alt,
    videoId: "7681492434601200909",
    href: "https://www.tiktok.com/@sullyeash/video/7681492434601200909",
    cta: "Watch Savannah’s Adventure Day",
  },
] as const;

export const processSteps = [
  { title: "Tell me about your dog.", body: "Send a few basics about your dog, where you’re located and what kind of help you need." },
  { title: "Meet your dog first.", body: "Before your dog is left in my care, I’ll complete a short owner-present introduction. Sitting clients require a meet-and-greet." },
  { title: "I plan their day.", body: "Activity is based on your dog’s energy, temperament, environment, routine and what they actually enjoy." },
  { title: "You get the recap.", body: "After standard sessions, you’ll receive a photo and written update. Adventures include additional photo and video coverage." },
] as const;

export const faqItems = [
  { question: "What is a Good Dog Session?", answer: "A one-on-one or two-dog session built around your dog’s needs that day. It can blend movement, sniffing, play, enrichment and an appropriate local outing." },
  { question: "Are sessions only walks?", answer: "No. A walk might be part of the plan, but so might running, fetch, tug, enrichment games, decompression time or getting into a new environment." },
  { question: "What types of dogs do you work with?", answer: "Dogs of different breeds, ages, energy levels and personalities are considered. The first conversation and owner-present introduction help determine whether the service is a good fit." },
  { question: "Can you work with reactive or nervous dogs?", answer: "Possibly. Every dog’s needs, triggers and history are reviewed individually before service. Good Dog Days doesn’t make behavioral or safety guarantees, and some situations may require a qualified trainer or behavior professional first." },
  { question: "Do you take multiple dogs?", answer: "Sessions are intentionally kept personal—typically one dog, or two compatible dogs from the same household." },
  { question: "Can I book an Adventure immediately?", answer: "Not quite. Every dog completes at least one standard Good Dog Session before their first Adventure so Sully can get to know their temperament, handling and routine." },
  { question: "Where do you currently operate?", answer: "Cumming and select areas of Central, West and North Forsyth County, Georgia. Share your neighborhood or ZIP code in the inquiry form and I’ll confirm availability." },
  { question: "Do you provide in-home sitting?", answer: "Yes. Routine Care provides scheduled home visits, while a Good Dog In-Home Stay offers more comprehensive overnight care, depending on fit and availability." },
  { question: "How much notice is required?", answer: "New bookings require at least 24 hours’ notice. More notice is always helpful, especially for in-home stays and longer Adventures, and availability will vary." },
  { question: "What happens when the weather is bad?", answer: "The plan adapts. Heat, storms and unsafe conditions may mean a shorter outdoor activity, a timing change or more indoor enrichment. Your dog’s comfort and sensible risk decisions come first." },
] as const;
