"use client";

import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Bird, Fish, Leaf, LocateFixed, BadgeCheck } from "lucide-react";
import { OnboardingCompleteInput, FarmType } from "@/schemas/onboarding.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OnboardingActions } from "./onboarding-actions";
import { Loading } from "../feedback/loading";

const farmTypes: Array<{
  value: FarmType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: "CROP", label: "Crop", icon: Leaf },
  { value: "FISH_FARMING", label: "Fish Farming", icon: Fish },
  { value: "POULTRY", label: "Poultry", icon: Bird },
  { value: "LIVESTOCK", label: "Livestock", icon: BadgeCheck },
];

type Props = {
  register: UseFormRegister<OnboardingCompleteInput>;
  errors: FieldErrors<OnboardingCompleteInput>;
  isSubmitting: boolean;
  onUseCurrentLocation: () => void;
  onBack: () => void;
  onNext: () => void;
  watchFarmType: FarmType;
  setValue: UseFormSetValue<OnboardingCompleteInput>;
};

export function StepFarmDetails({
  register,
  errors,
  isSubmitting,
  onUseCurrentLocation,
  onBack,
  onNext,
  watchFarmType,
  setValue,
}: Readonly<Props>) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#454545]">
          Farm Location <span className="text-[#d11]">*</span>
        </label>

        <Button
          type="button"
          variant="outline"
          onClick={onUseCurrentLocation}
          className="h-12 w-full rounded-xl border border-[#1C8B13] bg-white text-[#2a2a2a] hover:bg-[#f8fff7]"
        >
          <LocateFixed className="mr-2 h-4 w-4 text-[#1C8B13]" />
          Use Current Location
        </Button>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-[#ececec]" />
          <span className="text-sm text-[#4f4f4f]">or</span>
          <div className="h-px flex-1 bg-[#ececec]" />
        </div>

        <Input
          placeholder="Enter Farm Address Manually"
          className="h-12 rounded-xl border border-transparent bg-white px-4 shadow-sm ring-1 ring-[#f0f0f0] placeholder:text-[#b8b8b8] focus-visible:ring-2 focus-visible:ring-[#148C08]/20"
          {...register("farmLocation")}
        />

        {errors.farmLocation?.message ? (
          <p className="text-sm text-red-600">
            {String(errors.farmLocation.message)}
          </p>
        ) : (
          <p className="text-sm text-[#b0b0b0]">
            This helps us provide localized weather updates and market prices.
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#454545]">
          Farming Type <span className="text-[#d11]">*</span>
        </label>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {farmTypes.map((type) => {
            const Icon = type.icon;
            const selected = watchFarmType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  setValue("farmType", type.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={[
                  "flex min-h-[88px] flex-col items-center justify-center rounded-2xl border bg-white px-3 py-4 text-center shadow-sm transition",
                  selected
                    ? "border-[#1C8B13] ring-2 ring-[#1C8B13]/10"
                    : "border-transparent hover:border-[#e7e7e7]",
                ].join(" ")}
              >
                <Icon className="h-6 w-6 text-[#12920A]" />
                <span className="mt-3 text-sm font-medium text-[#2b2b2b]">
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>

        {errors.farmType?.message ? (
          <p className="text-sm text-red-600">
            {String(errors.farmType.message)}
          </p>
        ) : null}
      </div>

      <OnboardingActions
        showBack
        onBack={onBack}
        onNext={onNext}
        nextLabel={isSubmitting ? <Loading text="Saving..." /> : "Next"}
        busy={isSubmitting}
      />
    </div>
  );
}
