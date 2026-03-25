import styles from './Marketplace.module.css';

export default function Marketplace() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imagePanel}>
          <div className={styles.imagePlaceholder}>
            {/* <div className={styles.phoneImg}><img src="/MarketplaceImg.png" alt="beauty-faces"/></div> */}
            <div className={styles.overlay}>
              {/* <span> <img src="/MarketplaceImg.png" alt="beauty-faces"/> </span> */}
               
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Buy &amp; Sell without Middleman</p>
          <h2 className={styles.title}>
            Buy and Sell Without <span className={styles.highlight}>Middlemen</span>
          </h2>
          <p className={styles.desc}>
            Connect with buyers and sellers across the country. No middlemen, better prices. List your produce, discover quality inputs, and trade with confidence.
          </p>
          <button className={styles.cta}>Explore Marketplace</button>
        </div>
      </div>
    </section>
  );
}
