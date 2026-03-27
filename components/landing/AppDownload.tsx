import styles from './AppDownload.module.css';

export default function AppDownload() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.title}>Farm from Anywhere</h2>
          <p className={styles.desc}>
            Download the Farmcash mobile app and manage your farm finances on the go. Available for iOS and Android.
          </p>
          <div className={styles.buttons}>
            <a href="#" className={styles.storeBtn}>
              <span className={styles.storeIcon}>🍎</span>
              <div>
                <div className={styles.storeSmall}>Download on the</div>
                <div className={styles.storeName}>App Store</div>
              </div>
            </a>
            <a href="#" className={styles.storeBtn}>
              <span className={styles.storeIcon}>▶</span>
              <div>
                <div className={styles.storeSmall}>GET IT ON</div>
                <div className={styles.storeName}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
        <div className={styles.imageWrap}>
           <img src="/AppdwnloadImg.png"/> 
           </div>

</div>    
    </section>
  );
}
