"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type Props = {
  onBack?: () => void;
  onNext: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  busy?: boolean;
  nextLabel: ReactNode;
  backLabel?: string;
  showBack?: boolean;
};

export function OnboardingActions({
  onBack,
  onNext,
  backDisabled,
  nextDisabled,
  busy,
  nextLabel,
  showBack = true,
}: Readonly<Props>) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-20 mt-14 flex items-center gap-5 max-w-[482px] w-full">
      {showBack ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-[#1C8B13] bg-white text-[#1C8B13] hover:bg-[#f5fff4]"
          onClick={onBack}
          disabled={backDisabled || busy}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : null}

      <Button
        type="button"
        className="h-12 flex-1 rounded-xl bg-[#148C08] text-white hover:bg-[#117807]"
        onClick={onNext}
        disabled={nextDisabled || busy}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
