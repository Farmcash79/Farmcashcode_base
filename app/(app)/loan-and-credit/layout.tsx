import { getCurrentUserFromServer } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayoutWrapper } from "@/components/dashboard/dashboard-layout";

export default async function LoanAndCreditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUserFromServer();

  if (!user) redirect("/login");
  if (!user.onboardingCompleted) redirect("/onboarding");

  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
