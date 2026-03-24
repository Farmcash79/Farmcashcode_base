"use client";

import { Button } from "@/components/ui/button";
import { OnboardingCompleteInput } from "@/schemas/onboarding.schema";

type Props = {
  values: Partial<OnboardingCompleteInput> & {
    bvnMasked?: string;
  };
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export function StepReview({
  values,
  onBack,
  onSubmit,
  isSubmitting,
}: Readonly<Props>) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <p>
          <span className="text-slate-400">BVN:</span> {values.bvnMasked}
        </p>
        <p>
          <span className="text-slate-400">Farm name:</span> {values.farmName}
        </p>
        <p>
          <span className="text-slate-400">Location:</span> {values.location}
        </p>
        <p>
          <span className="text-slate-400">Farm type:</span> {values.farmType}
        </p>
        <p>
          <span className="text-slate-400">Farm size:</span>{" "}
          {values.farmSize || "Not provided"}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="button"
          className="w-full"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit onboarding"}
        </Button>
      </div>
    </div>
  );
}
