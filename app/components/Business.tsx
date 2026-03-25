import styles from './Business.module.css';

const tools = [
  { image: <img src='/Bulkpayment.png' />,
    title: 'Bulk Payment',
    desc: 'Pay thousands of farmers instantly with our bulk disbursement system.',
  },
  {
    image: <img src='/creditTool.png' />,
    title: 'Credit Tool',
    desc: 'Advanced credit scoring and risk assessment for agricultural lending.',
  },
  {
    image: <img src='/ApiIntergration.png' />,
    title: 'API Integration',
    desc: 'Integrate Farmcash into your platform with our comprehensive APIs.',
  },
];

export default function Business() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Built for Businesses &amp; Institutions</h2>
        <div className={styles.grid}>
          {tools.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{t.image}</div>
              <h3 className={styles.cardTitle}>{t.title}</h3>
              <p className={styles.cardDesc}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
