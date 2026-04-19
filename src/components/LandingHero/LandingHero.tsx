import type { Dinner } from '../../types';
import type { View } from '../../App';
import styles from './LandingHero.module.css';
import { FlashyBtn } from '../FlashyBtn/FlashyBtn';

function formatDinnerMeta(dinner: Dinner): string {
  const date = new Date(dinner.date);
  const quarter = `Q${Math.ceil((date.getMonth() + 1) / 3)} ${date.getFullYear()}`;
  const venue = dinner.venue;
  return `${quarter} · ${venue}`;
}

interface LandingHeroProps {
  latestDinner: Dinner;
  onViewChange: (view: View) => void;
}

export function LandingHero({ latestDinner, onViewChange }: LandingHeroProps) {
  const count = latestDinner.attendees.length;

  return (
    <div className={styles.hero}>
      <div className={styles.meshBg} />
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <div className={`${styles.blob} ${styles.blob4}`} />

      <div className={styles.landingNav}>
        <button className={styles.landingNavLogo} onClick={() => onViewChange('home')}>
          <img src={`${import.meta.env.BASE_URL}images/logo.avif`} alt="AI Mavericks" className={styles.landingNavLogoMark} />
        </button>
        <a className={styles.landingNavNewsletter} href="https://ai-mavericks-ldn.beehiiv.com" target="_blank" rel="noopener noreferrer">Newsletter</a>
      </div>

      <div className={styles.content}>
        <span className={styles.dinnerMeta}>
          {formatDinnerMeta(latestDinner)}
        </span>
        <h1 className={styles.heading}>
          AI Mavericks
        </h1>
        <p className={styles.tagline}>
          Where AI builders meet. Intimate dinners for founders, engineers, and operators shaping the future.
        </p>
        <p className={styles.attendeeCount}>
          {count} builder{count !== 1 ? 's' : ''} · One table · Real talk
        </p>
        <FlashyBtn>Join the Next Dinner</FlashyBtn>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </div>
  );
}
