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
  brandLabel: string;
  number: string;
  startingPrice: string;
  description: string;
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    id: "everyday",
    name: "Walks + Good Dog Sessions",
    brandLabel: "Everyday",
    number: "01",
    startingPrice: "$30",
    description: "A familiar neighborhood walk or more activity built around what your dog enjoys.",
  },
  {
    id: "away",
    name: "Care at Home",
    brandLabel: "While You’re Away",
    number: "02",
    startingPrice: "$95/day",
    description: "Visits and overnight stays that keep your dog’s routine familiar while you’re away.",
  },
  {
    id: "bigger-days",
    name: "Good Dog Adventures",
    brandLabel: "Bigger Days",
    number: "03",
    startingPrice: "$175",
    description: "Two hours, half a day or a full day to explore, play and get outside.",
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
    description: "A simple walk that begins and ends at home. Your dog stays in their own neighborhood.",
    bestFor: "Movement, sniffing, a potty break and a familiar routine.",
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
      "No transportation or off-site outing—just a good walk close to home.",
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
    description: "Maybe it’s a run. Maybe it’s fetch. Maybe they spend half the session sniffing one trail. Different dog, different day.",
    bestFor: "More than a walk.",
    potentialActivities: [
      "Neighborhood walking",
      "Sniff-heavy decompression",
      "Running",
      "Fetch or tug",
      "Backyard play",
      "Something engaging to figure out",
      "A nearby outing that suits them",
    ],
    includes: [
      "Activity built around your dog",
      "One photo",
      "Written recap",
      "Fresh-water check",
    ],
    addOns: [
      "Second dog from the same household: +$15",
      "2+ recurring Good Dog Sessions per week: $45 each",
    ],
    requirements: [
      "We choose what fits the dog and the day; no single activity happens every time.",
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
    description: "Three visits for dogs who are comfortable spending part of the day alone but still need meals, movement and company.",
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
    ctaText: "Request Stay Availability",
  },
  {
    id: "two-hour-adventure",
    name: "2-Hour Good Dog Adventure",
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
    requirements: ["A successful Good Dog Session is required first."],
    featured: true,
    badge: "The big one",
    ctaText: "Start With a Good Dog Session",
  },
] as const;

export const inquiryServiceOptions = [
  {
    id: "regular-walk",
    name: "A regular walk",
    description: "A simple walk around their own neighborhood.",
  },
  {
    id: "more-activity",
    name: "More activity during the day",
    description: "Walking, sniffing, play or other activity in a Good Dog Session.",
  },
  {
    id: "care-while-away",
    name: "Care while I’m away",
    description: "Visits or an in-home stay while you’re gone.",
  },
  {
    id: "bigger-day",
    name: "A bigger day out",
    description: "Trails, water, exploring and Good Dog Adventures.",
  },
  {
    id: "not-sure",
    name: "I’m not sure yet",
    description: "Tell us about your dog and we’ll help figure it out.",
  },
] as const;

export type InquiryServiceId = (typeof inquiryServiceOptions)[number]["id"];

export const serviceInquiryDefaults: Readonly<Record<string, InquiryServiceId>> = {
  "neighborhood-walk": "regular-walk",
  "good-dog-session": "more-activity",
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
  "Adventure dogs must first complete a Good Dog Session.",
  "Activity may be adjusted for weather, safety or the dog’s comfort.",
  "Holiday pricing may apply.",
  "Every dog is reviewed individually before service.",
] as const;

export function servicesForCategory(category: ServiceCategoryId) {
  return services.filter((service) => service.category === category);
}
