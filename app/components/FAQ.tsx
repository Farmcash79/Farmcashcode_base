'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  { q: 'Do I need a smartphone to use Farmcash?', a: 'No, you can also use Farmcash via USSD on any mobile phone. Simply dial *347# to access all services without needing a smartphone or internet connection.' },
  { q: 'Can I pay my farmers if they are offline?', a: 'Yes! Farmcash supports offline payments via USSD and SMS. Your farmers do not need an internet connection to receive payments.' },
  { q: 'How is the risk mitigated for these agricultural loans?', a: 'We use a combination of satellite data, transaction history, and local agent networks to assess creditworthiness and manage lending risk responsibly.' },
  { q: 'How long does it take to get my money?', a: 'Once approved, funds are disbursed instantly to your Farmcash wallet. The approval process typically takes less than 24 hours for first-time users.' },
  { q: "I don't have a bank statement. How can I get a loan?", a: 'We use alternative data — such as your mobile money history, farm activity records, and agent references — to evaluate your loan application. No bank statement is required.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <div className={styles.list}>
          {faqs.map((f, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.active : ''}`}>
              <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className={styles.chevron}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className={styles.answer}>
                  <p>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
