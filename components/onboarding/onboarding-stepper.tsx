import { Progress } from "@/components/ui/progress";

export function OnboardingStepper({ step }: Readonly<{ step: number }>) {
  const value = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="space-y-3">
      <Progress value={value} />
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>BVN verification</span>
        <span>Farm details</span>
        <span>Review</span>
      </div>
    </div>
  );
}
