import { z } from "zod";

export const onboardingSchema = z.object({
  farmName: z.string().min(2, "Farm name is required"),
  location: z.string().min(2, "Location is required"),
  farmSize: z.number().positive("Farm size must be greater than 0"),
  farmType: z.enum(["CROP", "FISH_FARMING", "POULTRY", "LIVESTOCK"]),
});

export type OnboardingType = z.infer<typeof onboardingSchema>;
