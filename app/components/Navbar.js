"use client"; // 1. Tells Next.js this is an interactive component
import { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';


export default function Navbar(){

 const [menuOpen, setMenuOpen] = useState(false);
return(
<nav className={styles.nav}>
      <div className={styles.inner}>
      <Link href="/" className={styles.logo}>
      {/* <span className={styles.logoIcon}>🌱</span> */}
      <span className={styles.logoText}>
        <img 
          src="/farmcash logo.png" 
          alt="FarmCash Logo" 
          style={{ height: '30px', width: 'auto' }} // 3. Simple inline size fix
        />
      </span>
    </Link>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <li><a href="#">Product</a></li>
          <li><a href="#">Solutions</a></li>
          <li><a href="#">Marketplace</a></li>
          <li><a href="#">About</a></li>
        </ul>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.ctaBtn}>Get Started</button>
        </div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
)
}
 