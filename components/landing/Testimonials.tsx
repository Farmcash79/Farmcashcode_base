import styles from './Testimonials.module.css';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Musa Bello',
    location: 'Katsina, Nigeria',
  avatar: <img src='/farmersTestimon2.jpg' /> ,
    text: 'Farmcash helped me grow my farm by providing easy loans and quick payments.',
  },
  {
    name: 'Ngozi Okeke',
    location: 'Enugu, Nigeria',
  avatar: <img src='/farmersTestimon3.jpg' /> ,
    text: 'With Farmcash, I can easily find buyers for my produce at better prices.',
  },
  {
    name: 'Hassan Yusuf',
     location: 'Kaduna, Nigeria',
   avatar: <img src='/farmersTestimon4.jpg'/>,
     
   text: 'The insurance options from Farmcash gives me peace of mind during the planting season.',
  },
  {
    name: 'Musa Bello',
    location: 'Kaduna, Nigeria',
    avatar: <img src='/farmersTestimon2.jpg' />,
    text: 'Farmcash helped me grow my farm by providing easy loans and quick payments.',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Farmers Testimonials</h2>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <p className={styles.quote}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.location}> {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
