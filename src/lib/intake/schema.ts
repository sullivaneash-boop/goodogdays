import { z } from "zod";
import { inquiryServiceOptions } from "@/data/services";

export const petSizes = ["small", "medium", "large", "extra-large"] as const;

export const dogPersonalityIds = [
  "ready-to-move",
  "professional-sniffer",
  "loves-to-play",
  "likes-getting-out",
  "homebody",
  "water-dog",
  "takes-things-slower",
  "wants-company",
] as const;

const inquiryServiceIds = inquiryServiceOptions.map((option) => option.id) as [
  (typeof inquiryServiceOptions)[number]["id"],
  ...(typeof inquiryServiceOptions)[number]["id"][],
];

export const petProfileSchema = z.object({
  serviceNeed: z
    .union([z.enum(inquiryServiceIds), z.literal("")])
    .refine((value): boolean => value.length > 0, "Choose what you need help with."),
  petName: z.string().trim().min(2, "Tell us your dog’s name.").max(40),
  age: z.string().trim().min(1, "Add their age or your best guess.").max(30),
  size: z.enum(petSizes, { error: "Choose the closest size." }),
  personality: z
    .array(z.enum(dogPersonalityIds))
    .min(1, "Pick at least one that sounds like your dog."),
  dogContext: z.string().trim().max(600, "Keep this to 600 characters or fewer."),
  timing: z.string().trim().min(2, "Tell us when or how often you need help.").max(160),
  ownerName: z.string().trim().min(2, "Add your name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Enter a 10-digit phone number.",
    }),
  contactMethod: z.enum(["text", "call"], {
    error: "Choose text or call.",
  }),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(?:-\d{4})?$/, "Enter a valid ZIP code."),
  company: z.string().max(0).optional(),
});

export type PetProfileFormValues = z.infer<typeof petProfileSchema>;
export type PetSize = PetProfileFormValues["size"];
export type DogPersonality = PetProfileFormValues["personality"][number];

export const stepFields = [
  ["serviceNeed"],
  ["petName", "age", "size", "personality", "dogContext"],
  ["timing", "ownerName", "email", "phone", "contactMethod", "zipCode"],
] as const satisfies readonly (readonly (keyof PetProfileFormValues)[])[];

export const petProfileDefaults: PetProfileFormValues = {
  serviceNeed: "",
  petName: "",
  age: "",
  size: "medium",
  personality: [],
  dogContext: "",
  timing: "",
  ownerName: "",
  email: "",
  phone: "",
  contactMethod: "text",
  zipCode: "",
  company: "",
};
