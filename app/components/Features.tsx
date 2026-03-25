import styles from './Features.module.css';

const features = [
  {
    image: <img src='/Everything1.png' />,
    title: 'Credit Access',
    desc: 'Get quick loans for seeds, equipment, and operation with flexible repayment terms.',
  },
  {
   image: <img src='/Everything2.png' />,
    title: 'Digital Wallet',
    desc: 'Secure digital wallet for all your farm finances. Send and receive money securely.',
  },
  {
  image: <img src='/Everything3.png' />,
    title: 'Smart Payment',
    desc: 'Pay suppliers, receive payments from buyers, and manage transactions effortlessly.',
  },
  {image: <img src='/Everything4.png' />,
    title: 'Crop Insurance',
    desc: 'Protect your harvest against weather risk and crop failure with affordable policies.',
  },
];

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Everything You Need to Know</h2>
        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{f.image}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
