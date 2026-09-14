export type ServiceCategoryId = "everyday" | "away" | "bigger-days";

export type Service = {
  id: string;
  name: string;
  shortName: string;
  category: ServiceCategoryId;
  duration: string;
  price: string;
  pricePrefix?: string;
  weeklyPlans?: readonly { name: string; price: number; visits: number }[];
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
  brandLabel: string;
  number: string;
  startingPrice: string;
  description: string;
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    id: "everyday",
    name: "Walking + Enrichment",
    brandLabel: "Everyday",
    number: "01",
    startingPrice: "$30",
    description: "Everyday exercise, attention, and stimulation.",
  },
  {
    id: "away",
    name: "In-Home Pet Sitting",
    brandLabel: "While You’re Away",
    number: "02",
    startingPrice: "$95/day",
    description: "Their home. Their routine. Reliable care while you’re away.",
  },
  {
    id: "bigger-days",
    name: "Good Dog Adventures",
    brandLabel: "Bigger Days",
    number: "03",
    startingPrice: "$175",
    description: "Larger, intentionally planned off-site experiences. Choose 2–8 hours.",
  },
] as const;

export const services: readonly Service[] = [
  {
    id: "neighborhood-walk",
    name: "30-Minute Neighborhood Walk",
    shortName: "Neighborhood Walk",
    category: "everyday",
    duration: "30 minutes",
    price: "$30",
    weeklyPlans: [
      { name: "3-Day Weekly Plan", price: 85, visits: 3 },
      { name: "5-Day Weekly Plan", price: 135, visits: 5 },
    ],
    description: "Dependable everyday exercise close to home: walking, sniffing, potty time and movement, plus a fresh-water check, photo and recap. Starts and ends at your home; no transportation is included.",
    bestFor: "Movement, sniffing, a potty break and a familiar routine.",
    includes: [
      "30-minute neighborhood walk",
      "Sniff and potty time",
      "Fresh-water check",
      "One photo",
      "Written recap",
    ],
    addOns: [
      "Second dog from the same household: +$10/visit",
    ],
    requirements: [
      "No transportation or off-site outing—just a good walk close to home.",
    ],
    ctaText: "Get Started",
  },
  {
    id: "good-dog-session",
    name: "60-Minute Good Dog Session",
    shortName: "Good Dog Session",
    category: "everyday",
    duration: "60 minutes",
    price: "$65",
    weeklyPlans: [
      { name: "3-Day Weekly Plan", price: 180, visits: 3 },
      { name: "5-Day Weekly Plan", price: 290, visits: 5 },
    ],
    description: "More than a longer walk: a personalized hour of exercise and enrichment built around your dog. Walking, running, sniffing, fetch, tug, backyard play or exploration—we choose what fits. A short drive to a nearby park, trail, green space or other suitable location may be part of the session when appropriate.",
    bestFor: "A personalized hour built around your dog.",
    potentialActivities: [
      "Neighborhood walking",
      "Sniff-heavy decompression",
      "Running",
      "Fetch or tug",
      "Backyard play",
      "Something engaging to figure out",
      "A short trip to a nearby park or trail, when appropriate",
    ],
    includes: [
      "60-minute service window, from our arrival until your dog is returned home",
      "One photo",
      "Written recap",
      "Fresh-water check",
    ],
    addOns: [
      "Second dog from the same household: +$15/visit",
    ],
    requirements: [
      "The 60-minute window begins when we arrive and ends when your dog is returned home; any driving is part of that hour.",
      "Transportation is one tool we may use, not a guarantee or a separate standard add-on.",
      "Specific destinations or extended travel can be quoted separately if needed.",
      "For a larger, intentionally planned off-site experience, choose a Good Dog Adventure.",
    ],
    ctaText: "Get Started",
  },
  {
    id: "routine-care",
    name: "Pet Sitting Visits",
    shortName: "Pet Sitting Visits",
    category: "away",
    duration: "3 visits / day",
    price: "$95/day",
    description: "For dogs comfortable spending part of the day and overnight on their own, with meals, movement and company throughout the day.",
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
    ctaText: "Check Sitting Availability",
  },
  {
    id: "in-home-stay",
    name: "Overnight Pet Sitting",
    shortName: "Overnight Pet Sitting",
    category: "away",
    duration: "Overnight / 16+ hours",
    price: "$175/night",
    pricePrefix: "From",
    description: "An overnight stay with plenty of time at home for dogs who do best with more company while you’re away.",
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
      "Puppies or care routines that need more time: from +$25/day",
      "Extended stays or more involved routines: quoted individually",
    ],
    requirements: [
      "A meet-and-greet is required before the first stay.",
      "The handler may leave for normal errands, personal responsibilities and scheduled Good Dog Days appointments.",
    ],
    ctaText: "Check Sitting Availability",
  },
  {
    id: "two-hour-adventure",
    name: "2-Hour Adventure",
    shortName: "2-Hour Adventure",
    category: "bigger-days",
    duration: "2 hours",
    price: "$175",
    description: "A bigger outing shaped around your dog’s energy, comfort and favorite ways to explore.",
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
    requirements: [],
    featured: true,
    ctaText: "Request an Adventure",
  },
  {
    id: "half-day-adventure",
    name: "Half-Day Adventure",
    shortName: "Half-Day Adventure",
    category: "bigger-days",
    duration: "4 hours",
    price: "$295",
    description: "Four hours with room to move, explore, play and slow down along the way.",
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
    requirements: [],
    featured: true,
    ctaText: "Request an Adventure",
  },
  {
    id: "ultimate-good-dog-day",
    name: "Full-Day Adventure",
    shortName: "Full-Day Adventure",
    category: "bigger-days",
    duration: "Up to 8 hours",
    price: "$495",
    description: "A full day out, planned around your dog’s energy, comfort and favorite things.",
    bestFor: "The flagship Good Dog Days experience.",
    potentialActivities: ["Hiking", "Trails", "Swimming", "Running", "Exploration", "Sniffing", "Play", "Downtime", "Decompression stops"],
    includes: [
      "Pickup + drop-off",
      "Custom full-day plan",
      "Photos throughout",
      "Video clips",
      "Real-time updates",
      "Edited Good Dog Day highlight",
    ],
    addOns: ["Second dog from the same household: +$125"],
    requirements: [],
    featured: true,
    badge: "The big one",
    ctaText: "Request an Adventure",
  },
] as const;

export const inquiryServiceOptions = [
  { id: "regular-walk", name: "Walking + Enrichment", description: "A 30-minute Neighborhood Walk ($30) or 60-minute Good Dog Session ($65). Weekly plans available." },
  { id: "care-while-away", name: "In-Home Pet Sitting", description: "Daily visits or overnight care while you’re away. From $95/day." },
  { id: "bigger-day", name: "Good Dog Adventures", description: "A 2-hour, half-day or full-day outing. From $175." },
  { id: "not-sure", name: "Not Sure / Help Me Choose", description: "Tell us about your dog and we’ll help find the right fit." },
] as const;

export type InquiryServiceId = (typeof inquiryServiceOptions)[number]["id"];

export const serviceInquiryDefaults: Readonly<Record<string, InquiryServiceId>> = {
  "neighborhood-walk": "regular-walk",
  "good-dog-session": "regular-walk",
  "routine-care": "care-while-away",
  "in-home-stay": "care-while-away",
  "two-hour-adventure": "bigger-day",
  "half-day-adventure": "bigger-day",
  "ultimate-good-dog-day": "bigger-day",
  "not-sure": "not-sure",
};

export const bookingBasics = [
  "New bookings require at least 24 hours’ notice.",
  "Services are paid in advance.",
  "We’ll meet with you and your dog before solo care begins.",
  "Activity may be adjusted for weather, safety or the dog’s comfort.",
  "Holiday pricing may apply.",
  "Every dog is reviewed individually before service.",
] as const;

export function servicesForCategory(category: ServiceCategoryId) {
  return services.filter((service) => service.category === category);
}
