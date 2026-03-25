import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen px-4 w-full flex justify-center items-center bg-[#fafafa]">
      <div className="mx-auto w-full flex justify-center items-center">
        <OnboardingWizard />
      </div>
    </main>
  );
}
