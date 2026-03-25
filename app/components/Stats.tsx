import styles from './Stats.module.css';

const stats = [
  { value: '50,000+', label: 'Happy Farmers' },
  { value: '100M+', label: 'In Loans Provided' },
  { value: '500k+', label: 'Transactions Processed' },
];

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.inner}>
        <p className={styles.heading}>Impact on Farmers</p>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.value}>{s.value}</div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
