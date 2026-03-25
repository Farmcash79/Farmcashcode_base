import styles from './HowItWorks.module.css';

const steps = [
  {
    num: 1,
    title: 'Create Account',
    desc: 'Sign up in less than a minute. All you need is your phone number and you can complete registration required.',
  },
  {
    num: 2,
    title: 'Fund Account',
    desc: 'Fund your Farmcash wallet via bank transfer, mobile money, or at any of our local agent locations.',
  },
  {
    num: 3,
    title: 'Access Funds',
    desc: 'Apply for instant inputs loans or use your balance to buy supplies needed based on your farm activities.',
  },
  {
    num: 4,
    title: 'Grow Your Farm',
    desc: 'Invest in high-quality inputs, pay your workers on time, and track your farm. Watch your productivity and profits soar every season.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.title}>Learn How it Works</h2>
          <p className={styles.sub}>
            Farmcash bridges the gap between traditional agriculture and modern finance.
          </p>
          <div className={styles.decorLine} />
        </div>
        <div className={styles.right}>
          {steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.numWrap}>
                <div className={styles.num}>{step.num}</div>
                {step.num < steps.length && <div className={styles.connector} />}
              </div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
