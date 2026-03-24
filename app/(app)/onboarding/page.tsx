import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen px-4 py-10 w-full flex justify-center items-center">
      <div className="mx-auto w-full flex justify-center items-center">
        <OnboardingWizard />
      </div>
    </main>
  );
}
