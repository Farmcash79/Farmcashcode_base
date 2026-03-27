"use client";

import styles from "./dashboard-layout.module.css";
import { DashboardSidebar } from "./sidebar";

export function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <DashboardSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
