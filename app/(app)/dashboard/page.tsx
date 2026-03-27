import { getCurrentUserFromServer } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const user = await getCurrentUserFromServer();

  if (!user) redirect("/login");
  if (!user.onboardingCompleted) redirect("/onboarding");

  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const farmerProfile = await prisma.farmerProfile.findUnique({
    where: { userId: user.id },
  });

  return (
    <main className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Good Morning, {user.name}</h1>
          <p>☀️ 25° Today is partly sunny!</p>
        </div>
        <button className={styles.accountBtn}>
          👤 My Account
        </button>
      </div>

      {/* Main Grid */}
      <div className={styles.gridContainer}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Wallet Balance Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Wallet Balance</h2>
            </div>
            <div className={styles.walletAmount}>
              <span className={styles.currency}>₦</span>
              <span className={styles.amount}>
                {(user.walletBalance / 100).toLocaleString()}
              </span>
              <span className={styles.eye}>👁</span>
            </div>
            <p className={styles.change}>📈 25% than last month</p>
            <div className={styles.buttons}>
              <button className={styles.btn}>➕ Fund Wallet</button>
              <button className={styles.btn}>✈️ Send Money</button>
            </div>
          </div>

          {/* Active Loan Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Active Loan</h2>
            </div>
            <div className={styles.loanAmount}>
              <span className={styles.amount}>₦55,000.00</span>
              <span className={styles.eye}>👁</span>
            </div>
            <p className={styles.loanDetail}>12 months repayment plan</p>
            <p className={styles.accountNum}>Account Number: 1234567890</p>
            <div className={styles.nextPayment}>
              <span>✓ Next repay day: 10th April, 2026</span>
            </div>
          </div>

          {/* Do More Section */}
          <div className={styles.doMoreSection}>
            <h3>Do more with Farmcash</h3>
            <p>Access cash loans and make payment for your bills instantly.</p>
            <div className={styles.doMoreButtons}>
              <Link href="/loan-and-credit">
                <button className={styles.doMoreBtn}>💳 Get Loan</button>
              </Link>
              <Link href="/dashboard/payments">
                <button className={styles.doMoreBtn}>💵 Pay Bills</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Farm Land Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Total Average Farm Land</h2>
            </div>
            <div className={styles.farmLand}>
              <p className={styles.acreage}>12 Acres</p>
              <p className={styles.farmType}>
                {farmerProfile?.farmType || "Mixed"} Farm
              </p>
            </div>

            {/* Price Trends */}
            <div className={styles.priceTrends}>
              <h4>Market Price Trend (Past 7 days)</h4>
              <div className={styles.trendItems}>
                <div className={styles.trendItem}>
                  <span>Maize</span>
                  <span className={styles.price}>₦260k/ton</span>
                  <span className={styles.trend}>↑</span>
                </div>
                <div className={styles.trendItem}>
                  <span>Cassava</span>
                  <span className={styles.price}>₦185k/ton</span>
                  <span className={styles.trend}>↓</span>
                </div>
                <div className={styles.trendItem}>
                  <span>Sorghum</span>
                  <span className={styles.price}>₦66k/ton</span>
                  <span className={styles.trend}>↓</span>
                </div>
                <div className={styles.trendItem}>
                  <span>Wheat</span>
                  <span className={styles.price}>₦213k/ton</span>
                  <span className={styles.trend}>↑</span>
                </div>
                <div className={styles.trendItem}>
                  <span>Cocoa</span>
                  <span className={styles.price}>₦1.5m/ton</span>
                  <span className={styles.trend}>↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Recent Transactions</h2>
          <div className={styles.cardTools}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
            <button className={styles.filterBtn}>⚙️ Filter</button>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.cell}>Transaction ID</div>
            <div className={styles.cell}>Activity</div>
            <div className={styles.cell}>Price</div>
            <div className={styles.cell}>Status</div>
            <div className={styles.cell}>Date</div>
          </div>

          {transactions.length === 0 ? (
            <div className={styles.noData}>
              <p>No transactions yet.</p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className={styles.tableRow}>
                <div className={styles.cell}>
                  <span className={styles.id}>ID {tx.reference}</span>
                </div>
                <div className={styles.cell}>
                  <span className={styles.activity}>
                    {tx.description || tx.type}
                  </span>
                </div>
                <div className={styles.cell}>
                  <span className={styles.price}>
                    ₦{(Math.abs(tx.amount) / 100).toLocaleString()}
                  </span>
                </div>
                <div className={styles.cell}>
                  <span
                    className={`${styles.status} ${styles[tx.status?.toLowerCase()]}`}
                  >
                    ● {tx.status || "PENDING"}
                  </span>
                </div>
                <div className={styles.cell}>
                  {new Date(tx.createdAt).toLocaleDateString("en-NG")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

