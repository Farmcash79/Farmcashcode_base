'use client';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
             <img 
          src="/farmcash logo.png" 
          alt="FarmCash Logo"
            style={{ height: '30px', width: 'auto' }}
        />
            
          </div>
          <p className={styles.tagline}>
            Empowering the next generation of African farmers with financial solutions.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Twitter"><img src="/twitter-icon.png" alt="Twitter" /></a>
            <a href="#" aria-label="Instagram"><img src="/linkedin-icon.png" alt="Instagram" /></a>
            <a href="#" aria-label="Facebook"><img src="/facebook-icon.png" alt="Facebook" /></a>
          </div>
          <button className={styles.backTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ Back to Top
          </button>
        </div>

        <div className={styles.col}>
          <h4>Product</h4>
          <ul>
            <li><a href="#">Digital Wallet</a></li>
            <li><a href="#">Input Loans</a></li>
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">Crop Insurance</a></li>
            <li><a href="#">USSD Service *434#</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Success Stories</a></li>
            <li><a href="#">Partner with Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Contact and Support</h4>
          <ul>
            <li>Lagos, Nigeria</li>
            <li><a href="mailto:support@farmcash.ag">support@farmcash.ag.ng</a></li>
            <li><a href="tel:+2349001234567">+234 900 FARMCASH</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Farmcash Technologies Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
