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
  { label: "What to Expect", href: "/#how-it-works" },
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
    title: "The dog sets the pace",
    body: "Some dogs run. Some sniff everything. Some just want company.",
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
      "Red traded a day inside the shelter for exploring, meeting new people, good treats and the kind of attention that lets a dog’s personality come through.",
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
  { title: "Tell me about your dog.", body: "Share what you need, where you’re located and a few things your dog enjoys." },
  { title: "We meet first.", body: "Before solo care begins, I’ll meet your dog with you and learn the routines that matter." },
  { title: "I plan their day.", body: "You don’t need to build an itinerary. I choose what makes sense for your dog, the weather and the day." },
  { title: "You get the recap.", body: "After standard sessions, you’ll receive a photo and written update. Adventures include additional photo and video coverage." },
] as const;

export const faqItems = [
  { question: "What is a Good Dog Session?", answer: "It’s more than a walk. The 45-minute session is built around what your dog enjoys—maybe walking, running, sniffing, fetch, tug, backyard play or a nearby outing." },
  { question: "Does every dog do every activity?", answer: "No. Some dogs want to run. Some want to sniff every mailbox. We choose what fits your dog, their comfort and the day." },
  { question: "What types of dogs do you work with?", answer: "Dogs of different breeds, ages, energy levels and personalities are considered. The first conversation and owner-present introduction help determine whether the service is a good fit." },
  { question: "Can you care for nervous dogs?", answer: "Possibly. Tell me what situations make your dog nervous or uncomfortable. We’ll talk through fit and choose familiar, appropriate surroundings before care begins." },
  { question: "Do you take multiple dogs?", answer: "Sessions are intentionally kept personal—typically one dog, or two compatible dogs from the same household." },
  { question: "Can I book an Adventure immediately?", answer: "Not quite. Every dog completes a Good Dog Session first. I’d rather know who’s on the other end of the leash before we’re halfway down a trail together." },
  { question: "Where do you currently operate?", answer: "Cumming and select areas of Central, West and North Forsyth County, Georgia. Share your neighborhood or ZIP code in the inquiry form and I’ll confirm availability." },
  { question: "Do you provide care at home?", answer: "Yes. Routine Care includes three visits a day. A Good Dog In-Home Stay includes overnight care and more time at home, depending on fit and availability." },
  { question: "How much notice is required?", answer: "New bookings require at least 24 hours’ notice. More notice is always helpful, especially for in-home stays and longer Adventures, and availability will vary." },
  { question: "What happens when the weather is bad?", answer: "The plan changes. Heat, storms or unsafe conditions may mean less time outside, a timing change, or more play and company at home." },
] as const;
