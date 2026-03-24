import { getSessionUserIdFromServer } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout() {
  const session = await getSessionUserIdFromServer();
  redirect(session ? "/dashboard" : "/login");
}
