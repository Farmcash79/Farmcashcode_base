"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css";

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Wallet", href: "/dashboard/wallet", icon: "💰" },
  { name: "My Loan & Credit", href: "/loan-and-credit", icon: "📈" },
  { name: "Marketplace", href: "/marketplace", icon: "🛒" },
  { name: "Help and Support", href: "/dashboard/help", icon: "❓" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/dashboard">
          <img 
            src="/farmcash logo.png" 
            alt="FarmCash Logo" 
            style={{ height: "30px", width: "auto" }} 
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        {sidebarItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link key={item.href} href={item.href}>
              <div className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.text}>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </aside>
  );
}

