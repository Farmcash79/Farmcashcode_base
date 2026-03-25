"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BadgeCheck, Loader2 } from "lucide-react";
import { OnboardingCompleteInput } from "@/schemas/onboarding.schema";
import { Input } from "@/components/ui/input";
import { OnboardingActions } from "./onboarding-actions";
import { Loading } from "../feedback/loading";

type Props = {
  register: UseFormRegister<OnboardingCompleteInput>;
  errors: FieldErrors<OnboardingCompleteInput>;
  bvnState: "idle" | "verifying" | "verified" | "error";
  bvnMasked: string;
  isSubmitting: boolean;
  onNext: () => void;
};

export function StepBvn({
  register,
  errors,
  bvnState,
  bvnMasked,
  isSubmitting,
  onNext,
}: Readonly<Props>) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#454545]">
          Full Name <span className="text-[#d11]">*</span>
        </label>
        <Input
          placeholder="Enter Full name"
          className="h-12 rounded-xl border border-transparent bg-white px-4 shadow-sm ring-1 ring-[#f0f0f0] placeholder:text-[#b8b8b8] focus-visible:ring-2 focus-visible:ring-[#148C08]/20"
          {...register("fullName")}
        />
        {errors.fullName?.message ? (
          <p className="text-sm text-red-600">
            {String(errors.fullName.message)}
          </p>
        ) : (
          <p className="text-sm text-[#9a9a9a]">
            As it appears on your official document
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#454545]">
          Enter BVN Number (optional)
        </label>
        <Input
          inputMode="numeric"
          maxLength={11}
          placeholder="Enter 11-digit BVN"
          className="h-12 rounded-xl border border-transparent bg-white px-4 shadow-sm ring-1 ring-[#f0f0f0] placeholder:text-[#b8b8b8] focus-visible:ring-2 focus-visible:ring-[#148C08]/20"
          {...register("bvn")}
        />

        <div className="min-h-5">
          {errors.bvn?.message ? (
            <p className="text-sm text-red-600">{String(errors.bvn.message)}</p>
          ) : bvnState === "verifying" ? (
            <p className="flex items-center gap-2 text-sm text-[#707070]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying BVN...
            </p>
          ) : bvnState === "verified" ? (
            <p className="flex items-center gap-2 text-sm text-[#148C08]">
              <BadgeCheck className="h-4 w-4" />
              BVN verified successfully{bvnMasked ? ` (${bvnMasked})` : ""}.
            </p>
          ) : (
            <p className="text-sm text-[#9a9a9a]">
              Your BVN is required by the CBN for financial services. <br />
              Dial *565*0# to retrieve your BVN.
            </p>
          )}
        </div>
      </div>

      <OnboardingActions
        showBack
        onBack={() => window.history.back()}
        onNext={onNext}
        nextLabel={isSubmitting ? <Loading text="Verifying..." /> : "Next"}
        busy={isSubmitting}
      />
    </div>
  );
}
