export type ServiceCategoryId = "everyday" | "away" | "bigger-days";

export type Service = {
  id: string;
  name: string;
  shortName: string;
  category: ServiceCategoryId;
  duration: string;
  price: string;
  pricePrefix?: string;
  description: string;
  bestFor: string;
  includes: readonly string[];
  potentialActivities?: readonly string[];
  addOns: readonly string[];
  requirements: readonly string[];
  featured?: boolean;
  badge?: string;
  ctaText: string;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  name: string;
  number: string;
  startingPrice: string;
  description: string;
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    id: "everyday",
    name: "Everyday",
    number: "01",
    startingPrice: "$30",
    description: "Reliable movement close to home or a personalized session built around the dog in front of us.",
  },
  {
    id: "away",
    name: "While You’re Away",
    number: "02",
    startingPrice: "$95/day",
    description: "In-home visits and stays that keep dogs close to their normal surroundings and routine.",
  },
  {
    id: "bigger-days",
    name: "Bigger Days",
    number: "03",
    startingPrice: "$175",
    description: "Two hours, half a day or the full flagship experience—planned around the individual dog.",
  },
] as const;

export const services: readonly Service[] = [
  {
    id: "neighborhood-walk",
    name: "Neighborhood Walk",
    shortName: "Neighborhood Walk",
    category: "everyday",
    duration: "30 minutes",
    price: "$30",
    description: "A simple, reliable walk beginning and ending at your home. No vehicle transportation required.",
    bestFor: "For dogs who are happiest staying close to home.",
    includes: [
      "30-minute neighborhood walk",
      "Sniff time",
      "Fresh-water check",
      "One photo",
      "Written recap",
    ],
    addOns: [
      "Second dog from the same household: +$10",
      "3+ recurring walks per week: $28 each",
    ],
    requirements: [
      "This option stays close to home, without pickup, loading, transportation or a custom off-site outing.",
    ],
    ctaText: "Request a Walk",
  },
  {
    id: "good-dog-session",
    name: "Good Dog Session",
    shortName: "Good Dog Session",
    category: "everyday",
    duration: "45 minutes",
    price: "$50",
    description: "A personalized activity session built around what the individual dog actually needs that day.",
    bestFor: "More than a walk.",
    potentialActivities: [
      "Neighborhood walking",
      "Sniff-heavy decompression",
      "Running",
      "Fetch or tug",
      "Backyard play",
      "Enrichment",
      "Appropriate local outings",
      "Controlled exposure to new environments",
    ],
    includes: [
      "Personalized activity",
      "One photo",
      "Written recap",
      "Fresh-water check",
    ],
    addOns: [
      "Second dog from the same household: +$15",
      "2+ recurring Good Dog Sessions per week: $45 each",
    ],
    requirements: [
      "The plan is tailored each time; no single activity is promised in every session.",
    ],
    ctaText: "Request a Session",
  },
  {
    id: "routine-care",
    name: "Routine Care",
    shortName: "Routine Care",
    category: "away",
    duration: "3 visits / day",
    price: "$95/day",
    pricePrefix: "From",
    description: "Designed for dogs who are comfortable spending portions of the day alone but need consistent visits, activity, feeding and companionship while their owner is away.",
    bestFor: "Dependable care without moving your dog out of their home.",
    includes: [
      "3 daily visits: 2 shorter check-ins + 1 extended visit",
      "Approximately 30 minutes of walking or activity",
      "Feeding and fresh water",
      "Potty breaks",
      "Play and companionship",
      "Daily photo updates",
      "Up to two dogs from the same household",
    ],
    addOns: ["Additional visit: +$25"],
    requirements: [],
    ctaText: "Ask About Routine Care",
  },
  {
    id: "in-home-stay",
    name: "Good Dog In-Home Stay",
    shortName: "In-Home Stay",
    category: "away",
    duration: "Overnight / 16+ hours",
    price: "$175/night",
    pricePrefix: "From",
    description: "Premium in-home care for dogs who benefit from a higher level of presence while their owners are away.",
    bestFor: "Their home. Their routine. Someone genuinely there.",
    includes: [
      "Overnight stay",
      "Approximately 16+ hours per day spent in the home",
      "Feeding and normal routine",
      "Walks, activity and potty breaks",
      "Companionship",
      "Photos and updates",
      "Reasonable basic home peace-of-mind tasks",
      "Up to two dogs from the same household",
    ],
    addOns: [
      "Puppies or unusually intensive care routines: from +$25/day",
      "Extended stays and highly specialized care: quoted individually",
    ],
    requirements: [
      "A meet-and-greet is required before the first stay.",
      "The handler may leave for normal errands, personal responsibilities and scheduled Good Dog Days appointments.",
    ],
    ctaText: "Request Stay Availability",
  },
  {
    id: "two-hour-adventure",
    name: "2-Hour Good Dog Adventure",
    shortName: "2-Hour Adventure",
    category: "bigger-days",
    duration: "2 hours",
    price: "$175",
    description: "A custom outing based on your dog’s personality, activity level, comfort and interests.",
    bestFor: "A bigger outing without taking over the whole day.",
    potentialActivities: ["Trails", "Hiking", "Parks", "Running", "Swimming", "Sniffing", "Exploration", "Appropriate new environments"],
    includes: [
      "Pickup + drop-off inside the core service area",
      "Custom planned activity",
      "Photos and video",
      "Update during the Adventure",
      "Adventure recap",
    ],
    addOns: ["Second dog from the same household: +$50"],
    requirements: ["Every dog must successfully complete at least one standard Good Dog Session before booking an Adventure."],
    featured: true,
    ctaText: "Start With a Good Dog Session",
  },
  {
    id: "half-day-adventure",
    name: "Half-Day Good Dog Adventure",
    shortName: "Half-Day Adventure",
    category: "bigger-days",
    duration: "4 hours",
    price: "$295",
    description: "A four-hour custom outing with time for multiple activities when they suit the dog and the day.",
    bestFor: "More room to move, explore and slow down along the way.",
    includes: [
      "Pickup + drop-off",
      "Custom planned outing",
      "Multiple activities when appropriate",
      "Photos and video",
      "Updates",
      "Edited Adventure highlight",
    ],
    addOns: ["Second dog from the same household: +$75"],
    requirements: ["A successful Good Dog Session is required first."],
    featured: true,
    ctaText: "Start With a Good Dog Session",
  },
  {
    id: "ultimate-good-dog-day",
    name: "Ultimate Good Dog Day",
    shortName: "Ultimate Good Dog Day",
    category: "bigger-days",
    duration: "Up to 8 hours",
    price: "$495",
    description: "A fully planned day built around your dog’s personality, energy and comfort level.",
    bestFor: "The flagship Good Dog Days experience.",
    potentialActivities: ["Hiking", "Trails", "Swimming", "Running", "Exploration", "Sniffing", "Play", "Downtime", "Decompression stops"],
    includes: [
      "Pickup + drop-off",
      "Custom full-day plan",
      "Photos throughout",
      "Video clips",
      "Real-time updates",
      "Professionally edited Good Dog Day highlight",
    ],
    addOns: ["Second dog from the same household: +$125"],
    requirements: ["A successful Good Dog Session is required first."],
    featured: true,
    badge: "The big one",
    ctaText: "Start With a Good Dog Session",
  },
] as const;

export const serviceInterestOptions = [
  ...services.map((service) => ({ id: service.id, name: service.name })),
  { id: "not-sure", name: "Not sure yet" },
] as const;

export const bookingBasics = [
  "New bookings require at least 24 hours’ notice.",
  "Services are paid in advance.",
  "A short introduction is required before a dog is left in our care.",
  "Sitting clients require a meet-and-greet.",
  "Adventure dogs must first complete a Good Dog Session.",
  "Activity may be adjusted for weather, safety or the dog’s comfort.",
  "Holiday pricing may apply.",
  "Every dog is reviewed individually before service.",
] as const;

export function servicesForCategory(category: ServiceCategoryId) {
  return services.filter((service) => service.category === category);
}
