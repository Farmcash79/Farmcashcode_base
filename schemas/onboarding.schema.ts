import { z } from "zod";

export const farmTypeEnum = z.enum([
  "CROP",
  "FISH_FARMING",
  "POULTRY",
  "LIVESTOCK",
]);

export const bvnStepSchema = z.object({
  bvn: z.string().regex(/^\d{11}$/, "BVN must be 11 digits"),
  phoneNumber: z.string().min(10, "Phone number is required").optional(),
  dateOfBirth: z.string().min(8, "Date of birth is required"),
});

export const farmDetailsSchema = z.object({
  farmName: z.string().min(2, "Farm name is required"),
  location: z.string().min(2, "Farm location is required"),
  farmType: farmTypeEnum,
  farmSize: z.coerce
    .number()
    .positive("Farm size must be greater than 0")
    .transform((val) => (Number.isNaN(val) ? undefined : val))
    .optional(),
});

export const onboardingCompleteSchema = bvnStepSchema.extend(
  farmDetailsSchema.shape,
);

export const onboardingDraftSchema = z.object({
  currentStep: z.coerce.number().int().min(1).max(3),
  data: z.record(z.string(), z.any()),
});

export type BVNStepInput = z.infer<typeof bvnStepSchema>;
export type FarmDetailsInput = z.infer<typeof farmDetailsSchema>;
export type OnboardingCompleteInput = z.infer<typeof onboardingCompleteSchema>;
export type FarmType = z.infer<typeof farmTypeEnum>;
