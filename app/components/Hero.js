import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Empowering <span className={styles.green}>Farmers</span><br />
            with <span className={styles.blue}>Financial</span> Solutions
          </h1>
          <p className={styles.sub}>
            Fast, reliable loans, and easy payment solutions to help your farm grow.
          </p>
          <div className={styles.buttons}>
            <Link href="/register">
              <button className={styles.primaryBtn}>Get Started</button>
            </Link>
            <Link href="/about">
              <button className={styles.outlineBtn}>Learn More</button>
            </Link>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.imageBg} />
          <div className={styles.farmerPlaceholder}>
            <div className={styles.farmerEmoji}>
              {/* Using your specific hero image */}
              <img src="/heroImage.png" alt="Farmer working with FarmCash" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}