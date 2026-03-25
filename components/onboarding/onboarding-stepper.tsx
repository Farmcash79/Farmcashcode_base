"use client";

import { cn } from "@/lib/utils";

type Props = {
  step: 1 | 2 | 3;
};

const items = [
  { step: 1, label: "Profile" },
  { step: 2, label: "Farm" },
  { step: 3, label: "Review" },
] as const;

export function OnboardingStepper({ step }: Readonly<Props>) {
  return (
    <div className="flex items-center gap-4">
      {items.map((item, index) => {
        const active = step >= item.step;
        const done = step > item.step;

        return (
          <div key={item.step} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition",
                  active
                    ? "bg-[#148C08] text-white"
                    : "bg-[#e9e9e9] text-[#777]",
                )}
              >
                {done ? "✓" : item.step}
              </div>

              <span
                className={cn(
                  "text-sm",
                  active ? "text-[#1e1e1e] font-medium" : "text-[#909090]",
                )}
              >
                {item.label}
              </span>
            </div>

            {index < items.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1",
                  active ? "bg-[#148C08]/40" : "bg-[#e8e8e8]",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
