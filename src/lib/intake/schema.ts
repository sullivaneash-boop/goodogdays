import { z } from "zod";

export const petSizes = ["small", "medium", "large", "extra-large"] as const;

export const careNeedIds = [
  "daily-movement",
  "leash-manners",
  "confidence-building",
  "care-while-away",
  "big-adventures",
  "coat-care",
  "double-coated",
  "senior-support",
] as const;

export const petProfileSchema = z.object({
  petName: z.string().trim().min(2, "Tell us your dog’s name.").max(40),
  breed: z.string().trim().min(2, "Add a breed or enter “Mixed / unsure”.").max(80),
  size: z.enum(petSizes, { error: "Choose the closest size." }),
  careNeeds: z
    .array(z.enum(careNeedIds))
    .min(1, "Choose at least one priority.")
    .max(4, "Choose up to four priorities so we can focus the plan."),
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
  company: z.string().max(0).optional(),
});

export type PetProfileFormValues = z.infer<typeof petProfileSchema>;
export type PetSize = PetProfileFormValues["size"];
export type CareNeed = PetProfileFormValues["careNeeds"][number];

export const stepFields = [
  ["petName", "breed", "size"],
  ["careNeeds"],
  ["ownerName", "email", "phone", "contactMethod"],
] as const satisfies readonly (readonly (keyof PetProfileFormValues)[])[];

export const petProfileDefaults: PetProfileFormValues = {
  petName: "",
  breed: "",
  size: "medium",
  careNeeds: [],
  ownerName: "",
  email: "",
  phone: "",
  contactMethod: "text",
  company: "",
};
