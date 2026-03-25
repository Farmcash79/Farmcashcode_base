// import { z } from "zod";

// export const farmTypeEnum = z.enum([
//   "CROP",
//   "FISH_FARMING",
//   "POULTRY",
//   "LIVESTOCK",
// ]);

// export const bvnStepSchema = z.object({
//   bvn: z.string().regex(/^\d{11}$/, "BVN must be 11 digits"),
//   phoneNumber: z.string().min(10, "Phone number is required").optional(),
//   dateOfBirth: z.string().min(8, "Date of birth is required"),
// });

// export const farmDetailsSchema = z.object({
//   farmName: z.string().min(2, "Farm name is required"),
//   location: z.string().min(2, "Farm location is required"),
//   farmType: farmTypeEnum,
//   farmSize: z.coerce
//     .number()
//     .positive("Farm size must be greater than 0")
//     .transform((val) => (Number.isNaN(val) ? undefined : val))
//     .optional(),
// });

// export const onboardingCompleteSchema = bvnStepSchema.extend(
//   farmDetailsSchema.shape,
// );

// export const onboardingDraftSchema = z.object({
//   currentStep: z.coerce.number().int().min(1).max(3),
//   data: z.record(z.string(), z.any()),
// });

// export type BVNStepInput = z.infer<typeof bvnStepSchema>;
// export type FarmDetailsInput = z.infer<typeof farmDetailsSchema>;
// export type OnboardingCompleteInput = z.infer<typeof onboardingCompleteSchema>;
// export type FarmType = z.infer<typeof farmTypeEnum>;

// schemas/onboarding.schema.ts
import { z } from "zod";

export const farmTypeEnum = z.enum([
  "CROP",
  "FISH_FARMING",
  "POULTRY",
  "LIVESTOCK",
]);

export const onboardingStep1Schema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  bvn: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "BVN must be 11 digits"),
});

export const onboardingStep2Schema = z.object({
  farmLocation: z.string().trim().min(2, "Farm location is required"),
  farmType: farmTypeEnum,
});

export const onboardingCompleteSchema = onboardingStep1Schema.merge(
  onboardingStep2Schema,
);

export const onboardingDraftSchema = z.object({
  currentStep: z.coerce.number().int().min(1).max(3),
  data: z.record(z.string(), z.any()),
});

export type OnboardingStep1Input = z.infer<typeof onboardingStep1Schema>;
export type OnboardingStep2Input = z.infer<typeof onboardingStep2Schema>;
export type OnboardingCompleteInput = z.infer<typeof onboardingCompleteSchema>;
export type FarmType = z.infer<typeof farmTypeEnum>;
