import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import styles from "./loan-and-credit.module.css";

const loanOffers = [
  {
    title: "Seed and Input Loan",
    range: "₦50,000 - ₦150,000",
    rate: "5% interest",
    term: "6 - 12 month terms",
    description: "Perfect for planting season. Finance seeds, fertilizer, and essential farm inputs.",
  },
  {
    title: "Equipment Lease",
    range: "₦50,000 - ₦500,000",
    rate: "Flexible repayment",
    term: "6 - 24 month terms",
    description: "Finance tractors, irrigation pumps, and essential farm equipment.",
  },
  {
    title: "Emergency Loan",
    range: "₦50,000 - ₦500,000",
    rate: "Instant access",
    term: "30-day payback",
    description: "Quick access to funds for urgent farm repairs and unexpected expenses.",
  },
  {
    title: "Harvest Loan",
    range: "₦500,000 - ₦1,000,000",
    rate: "up to 4% interest",
    term: "6 - 12 month terms",
    description: "Large-volume credit to finance harvest operations and market-ready yield.",
  },
];

const metrics = [
  { label: "Wallet balance", value: "₦125,000" },
  { label: "Total credit limit", value: "₦250,000" },
  { label: "Next payment", value: "₦10,000 (Apr 10, 2026)" },
  { label: "Active approval", value: "₦55,000 (due Sept 2025)" },
];

export default function LoanAndCreditPage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.subtitle}>Loan & Credit</p>
            <h1 className={styles.heroTitle}>Grow your farm with smart credit and low interest</h1>
            <p className={styles.heroText}>
              Apply for instant working capital, access milestone-based financing, and track repayment from a single dashboard. Start with ₦50,000 and scale to ₦5,000,000.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryBtn}>Apply for Loan</button>
              <button className={styles.secondaryBtn}>View Credit Offers</button>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/loanAndCreditImg/handwithBagImg.png"
              alt="Loan credit illustration"
              fill
              priority
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.metricsSection}>
        <div className={styles.metricsGrid}>
          {metrics.map((metric) => (
            <Card key={metric.label} className={styles.metricCard}>
              <CardContent>
                <p className={styles.metricLabel}>{metric.label}</p>
                <p className={styles.metricValue}>{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.offersSection}>
        <div className={styles.sectionHeader}>
          <h2>Available Loans and Offers</h2>
          <p>Choose a tailored financing option for your current farm project.</p>
        </div>

        <div className={styles.offersGrid}>
          {loanOffers.map((offer) => (
            <Card key={offer.title} className={styles.offerCard}>
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.term}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.offerCost}>
                  <div>
                    <p className={styles.offerLabel}>Loan size</p>
                    <p className={styles.offerValue}>{offer.range}</p>
                  </div>
                  <div>
                    <p className={styles.offerLabel}>Interest</p>
                    <p className={styles.offerValue}>{offer.rate}</p>
                  </div>
                </div>
                <p className={styles.offerDesc}>{offer.description}</p>
              </CardContent>
              <CardFooter>
                <button className={styles.offerBtn}>Apply Now</button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.bannerSection}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerText}>
            <h3>Need a Bigger Loan?</h3>
            <p>You are eligible for up to ₦500,000 based on your repayment history.</p>
          </div>
          <button className={styles.secondaryBtn}>Increase Loan Limit</button>
        </div>
      </section>

      <section className={styles.infoSection}>
        <Card className={styles.infoCard}>
          <CardContent>
            <h4>100% Secure and Transparent</h4>
            <p className={styles.infoParagraph}>
              No hidden fees. No collateral required. Flexible repayment plans matched to your harvest cycles and revenue.
            </p>
            <a className={styles.learnMore} href="#">Learn more</a>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
