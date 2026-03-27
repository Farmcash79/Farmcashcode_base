"use client"; 
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>
            <img 
              src="/farmcash logo.png" 
              alt="FarmCash Logo" 
              style={{ height: '30px', width: 'auto' }} 
            />
          </span>
        </Link>

        
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <li><Link href="/products">Product</Link></li>
          <li><Link href="/solutions">Solutions</Link></li>
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/loan-and-credit">Loan & Credit</Link></li>
          
       
          {isAuthenticated && (
            <li className={styles.mobileOnly}>
              <Link href="/dashboard">
                <button className={styles.dashboardBtn}>Dashboard</button>
              </Link>
            </li>
          )}

          {!isAuthenticated && (
            <li className={styles.mobileOnly}>
              <Link href="/login">
                <button className={styles.loginBtn}>Login</button>
              </Link>
            </li>
          )}
        </ul>
 
        <div className={styles.actions}>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <button className={styles.dashboardBtn}>Dashboard</button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className={styles.loginBtn}>Login</button>
              </Link>

              <Link href="/register">
                <button className={styles.ctaBtn}>Get Started</button>
              </Link>
            </>
          )}
        </div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}