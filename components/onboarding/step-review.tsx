"use client";

import { OnboardingCompleteInput, FarmType } from "@/schemas/onboarding.schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Loading } from "../feedback/loading";
import Image from "next/image";
import { icons } from "@/constants/icons";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";

type Props = {
  values: Partial<OnboardingCompleteInput> & {
    bvnMasked?: string;
  };
  onBack: () => void;
  onEdit: {
    onEditBvn: () => void;
    onFarmData: () => void;
  };
  onSubmit: () => void;
  isSubmitting: boolean;
};

const farmTypeLabel: Record<FarmType, string> = {
  CROP: "Crop",
  FISH_FARMING: "Fish Farming",
  POULTRY: "Poultry",
  LIVESTOCK: "Livestock",
};

export function StepReview({
  values,
  onEdit,
  onBack,
  onSubmit,
  isSubmitting,
}: Readonly<Props>) {
  const [agreeToTOC, setAgreeToTOC] = useState(false);

  return (
    <div className="space-y-4 max-w-[482px] mx-auto">
      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f0f0f0]">
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[#1E1E1E] font-normal text-base">
              Personal Information
            </h3>
            <Image
              src={icons.edit}
              alt="Edit label"
              onClick={onEdit.onEditBvn}
              className="cursor-pointer hover:scale-90"
              title="Edit BVN or your name"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-[#707070]">Full Name</span>
              <span className="font-medium text-[#1e1e1e] text-lg">
                {values.fullName || "-"}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[#707070]">
                Bank Verification Number (BVN)
              </span>
              <span className="font-medium text-[#1e1e1e] text-lg">
                {values.bvnMasked || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f0f0f0]">
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[#1E1E1E] font-normal text-base">
              Farm Details
            </h3>
            <Image
              src={icons.edit}
              alt="Edit label"
              onClick={onEdit.onFarmData}
              className="cursor-pointer hover:scale-90"
              title="Edit your farm data"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-[#707070]">Farm Location</span>
              <span className="font-medium text-[#1e1e1e] text-lg">
                {values.farmLocation || "-"}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[#707070]">Farm Type</span>
              <Badge className="py-4 px-5 font-medium text-base">
                {values.farmType ? farmTypeLabel[values.farmType] : "-"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          className="w-6 h-6 border-primary"
          checked={agreeToTOC}
          onCheckedChange={(checked) => setAgreeToTOC(checked === true)}
        />
        <Label className="font-medium text-base">
          I agree to Farmcash Terms and Services and Privacy policy
        </Label>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-20 mt-14 flex items-center gap-5 max-w-[482px] w-full">
        <Button
          type="button"
          variant="outline"
          className="h-12 w-12 rounded-full border-[#1C8B13] bg-white text-[#1C8B13] hover:bg-[#f5fff4]"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          className="h-12 flex-1 rounded-xl bg-[#148C08] text-white hover:bg-[#117807]"
          onClick={onSubmit}
          disabled={isSubmitting || !agreeToTOC}
        >
          {isSubmitting ? <Loading text="Submitting..." /> : "Submit"}
        </Button>
      </div>
    </div>
  );
}
