import { getCurrentUserFromServer } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUserFromServer();

  if (!user) redirect("/login");
  if (!user.onboardingCompleted) redirect("/onboarding");

  return <>{children}</>;
}
