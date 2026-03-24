import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Empowering <span className={styles.green}>Farmers</span><br />
            with <span className={styles.gold}>Financial</span> Solutions
          </h1>
          <p className={styles.sub}>
            Fast, reliable loans, and easy payment solutions to help your farm grow.
          </p>
          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>Get Started</button>
            <button className={styles.outlineBtn}>Learn More</button>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.imageBg} />
          <div className={styles.farmerPlaceholder}>
            <div className={styles.farmerEmoji}><img src="/heroImage.png" alt="Farmer" /></div>
            {/* <div className={styles.farmerBox}>🥦🌽🍅</div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
