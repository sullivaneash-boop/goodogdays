import type { CareNeed, PetSize } from "@/lib/intake/schema";

export type ServiceRecommendation = {
  eyebrow: string;
  name: string;
  rationale: string;
  nextStep: string;
  accent: "gold" | "sky" | "green";
};

type MatcherInput = {
  size: PetSize;
  careNeeds: readonly CareNeed[];
  requestedService?: string | null;
};

const requestedServiceNames: Record<string, string> = {
  "neighborhood-walk": "Neighborhood Walk Plan",
  "good-dog-session": "Good Dog Session",
  "routine-care": "Routine Care Plan",
  "in-home-stay": "Good Dog In-Home Stay",
  "two-hour-adventure": "2-Hour Good Dog Adventure",
  "half-day-adventure": "Half-Day Good Dog Adventure",
  "ultimate-good-dog-day": "Ultimate Good Dog Day",
};

export function matchService({
  size,
  careNeeds,
  requestedService,
}: MatcherInput): ServiceRecommendation {
  const priorities = new Set(careNeeds);
  const requestedName = requestedService
    ? requestedServiceNames[requestedService]
    : undefined;

  if (priorities.has("double-coated") || priorities.has("coat-care")) {
    return {
      eyebrow: "Best-fit care direction",
      name: "Coat Care + Movement Plan",
      rationale:
        size === "large" || size === "extra-large"
          ? "A larger dog with coat-care needs benefits from a paced activity plan paired with dedicated brushing and de-shed attention."
          : "Coat maintenance and an appropriate movement routine can be coordinated around comfort, energy and shedding needs.",
      nextStep: "We’ll confirm coat condition, temperament and the right service cadence together.",
      accent: "green",
    };
  }

  if (
    priorities.has("leash-manners") ||
    priorities.has("confidence-building")
  ) {
    return {
      eyebrow: "Best-fit care direction",
      name: "Skills + Confidence Session",
      rationale:
        "A focused one-on-one session creates room for calm repetitions, environmental confidence and better everyday leash habits.",
      nextStep: "We’ll start with an owner-present introduction and define realistic first-session goals.",
      accent: "sky",
    };
  }

  if (priorities.has("care-while-away")) {
    return {
      eyebrow: "Best-fit service",
      name: requestedName ?? "Routine Care Plan",
      rationale:
        "Keeping care in familiar surroundings protects routine while adding the movement, meals and companionship your dog needs.",
      nextStep: "We’ll confirm dates, visit cadence and home-care details before scheduling.",
      accent: "sky",
    };
  }

  if (priorities.has("big-adventures")) {
    return {
      eyebrow: "Best-fit service path",
      name: requestedName ?? "Good Dog Session → Adventure",
      rationale:
        "A standard session first lets us learn handling, energy and comfort before planning a bigger off-site day.",
      nextStep: "The first session becomes the foundation for a safe, genuinely personalized Adventure.",
      accent: "gold",
    };
  }

  return {
    eyebrow: "Best-fit starting point",
    name: requestedName ?? "Personalized Walking Plan",
    rationale:
      priorities.has("senior-support")
        ? "A flexible one-on-one rhythm can prioritize comfort, sniffing, mobility and a familiar neighborhood routine."
        : "A consistent, one-on-one movement plan is the clearest place to start, with room to adapt as we learn what your dog enjoys.",
    nextStep: "We’ll use the introduction to confirm pace, frequency and the right first session.",
    accent: "gold",
  };
}
