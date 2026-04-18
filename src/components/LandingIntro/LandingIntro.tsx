import styles from './LandingIntro.module.css';

export function LandingIntro() {
  return (
    <section className={styles.intro}>
      <h2 className={styles.heading}>A community of AI builders</h2>
      <p className={styles.body}>
        We bring together engineers, researchers, and founders who are building with AI — over
        intimate dinners designed for real conversation. Explore the people and the gatherings
        that make up Mavericks.
      </p>
    </section>
  );
}
