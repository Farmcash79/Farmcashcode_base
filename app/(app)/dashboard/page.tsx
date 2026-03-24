import { getCurrentUserFromServer } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await getCurrentUserFromServer();

  if (!user) redirect("/login");
  if (!user.onboardingCompleted) redirect("/onboarding");

  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Welcome, {user.name}</h1>
          <p className="mt-1 text-sm text-slate-300">
            Your wallet and farm activity live here.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-5">
              <p className="text-sm text-slate-300">Wallet balance</p>
              <p className="mt-2 text-2xl font-semibold">
                ₦{(user.walletBalance / 100).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-5">
              <p className="text-sm text-slate-300">Onboarding</p>
              <p className="mt-2 text-2xl font-semibold">Completed</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-5">
              <p className="text-sm text-slate-300">Farm profile</p>
              <p className="mt-2 text-2xl font-semibold">
                {user.farmerProfile?.farmType ?? "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold">Recent transactions</h2>
            <div className="mt-4 space-y-3">
              {transactions.length === 0 ? (
                <p className="text-sm text-slate-400">No transactions yet.</p>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {tx.description ?? tx.type}
                      </p>
                      <p className="text-xs text-slate-400">{tx.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        ₦{(tx.amount / 100).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">{tx.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
