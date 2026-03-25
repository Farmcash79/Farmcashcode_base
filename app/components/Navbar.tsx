"use client"; 
import { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* Changed <a> to <Link> for smoother navigation */}
          <li><Link href="/products">Product</Link></li>
          <li><Link href="/solutions">Solutions</Link></li>
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/about">About</Link></li>
          
        </ul>

        <div className={styles.actions  }>
          <Link href="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>

          <Link href="/register">
            <button className={styles.ctaBtn}>Get Started</button>
          </Link>
        </div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}