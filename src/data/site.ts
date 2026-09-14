import assets from "@/data/assets.json";

export const siteConfig = {
  name: "Good Dog Days",
  tagline: "Better days for good dogs.",
  location: "Cumming + Forsyth County, Georgia",
  serviceArea: "Cumming and select areas of Central, West and North Forsyth County",
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
    title: "Sully is your handler",
    body: "Owner-operated care. A familiar person who gets to know your dog.",
  },
  {
    title: "The dog sets the pace",
    body: "Some dogs run. Some sniff everything. Some just want company.",
  },
  {
    title: "Updates after care",
    body: "Photos and a recap after visits. Adventures add video and updates along the way.",
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
    title: "Comfort before Adventures",
    body: "We arrange a 45-minute introductory Good Dog Session before the first off-site Adventure. Request your Adventure now; we’ll handle setup.",
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
  { title: "Tell us about your dog.", body: "Choose what you’re interested in, share a few details about your dog, and tell us what kind of help you need." },
  { title: "We’ll make a plan.", body: "We’ll confirm availability, recommend the best service if you’re unsure, and arrange any meet-and-greet or introductory session needed." },
  { title: "They have a good day.", body: "Once setup is complete, you’re ready to book care and receive photos, updates, and recaps along the way." },
] as const;

export const faqItems = [
  { question: "Who comes to my home?", answer: "Sully, the owner of Good Dog Days, is your handler. We meet with you and your dog before solo care begins. Walks and sitting start at your home; Adventures include pickup and drop-off in the service area." },
  { question: "Not sure which service to choose?", answer: "That’s okay. Select Not Sure / Help Me Choose in Get Started. Share your dog’s needs and schedule, and we’ll recommend the right fit and confirm availability before arranging introductions." },
  { question: "What is a Good Dog Session?", answer: "It’s our 45-Minute Enrichment Visit ($50): time for running, sniffing, fetch, tug, backyard activity or enrichment. When it suits your dog and the logistics, it can include a short drive to a nearby park or trail. Not every visit includes transportation. For a longer off-site experience, choose a 2–8 hour Good Dog Adventure." },
  { question: "Does every dog do every activity?", answer: "No. Some dogs want to run. Some want to sniff every mailbox. We choose what fits your dog, their comfort and the day." },
  { question: "What types of dogs do you work with?", answer: "Dogs of different breeds, ages, energy levels and personalities are considered. The first conversation and owner-present introduction help determine whether the service is a good fit." },
  { question: "Can you care for nervous dogs?", answer: "Possibly. Tell me what situations make your dog nervous or uncomfortable. We’ll talk through fit and choose familiar, appropriate surroundings before care begins." },
  { question: "Do you take multiple dogs?", answer: "Sessions are intentionally kept personal—typically one dog, or two compatible dogs from the same household." },
  { question: "Can I request an Adventure as a new customer?", answer: "Yes. Request the Adventure you’re interested in now. Before their first off-site Adventure, your dog must successfully complete a 45-minute Good Dog Session ($50). We’ll arrange it during setup; you don’t need to book it separately." },
  { question: "Where do you currently operate?", answer: "Cumming and select areas of Central, West and North Forsyth County, Georgia. Share your neighborhood or ZIP code in the inquiry form and I’ll confirm availability." },
  { question: "Do you provide care at home?", answer: "Yes. Pet Sitting Visits include three visits per day for $95/day, for dogs comfortable alone overnight. Overnight Pet Sitting starts at $175/night with approximately 16+ hours at home per day. Both include up to two dogs. We arrange a meet-and-greet before the first stay." },
  { question: "How much notice is required?", answer: "New bookings require at least 24 hours’ notice. More notice is always helpful, especially for in-home stays and longer Adventures, and availability will vary." },
  { question: "What happens when the weather is bad?", answer: "The plan changes. Heat, storms or unsafe conditions may mean less time outside, a timing change, or more play and company at home." },
] as const;
