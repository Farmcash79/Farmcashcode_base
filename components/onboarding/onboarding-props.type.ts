import {
  OnboardingStep1Input,
  OnboardingCompleteInput,
} from "@/schemas/onboarding.schema";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

export type StepFarmDetailsProps = {
  register: UseFormRegister<OnboardingCompleteInput>;
  errors: FieldErrors<OnboardingCompleteInput>;
  setValue: UseFormSetValue<OnboardingCompleteInput>;
  getValues: UseFormGetValues<OnboardingCompleteInput>;
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
};

export type StepBVNProps = {
  register: UseFormRegister<OnboardingStep1Input>;
  errors: FieldErrors<OnboardingStep1Input>;
  isSubmitting: boolean;
  onNext: () => void;
};
