import { useState } from 'react';
import type { Dinner } from '../../types';
import styles from './DinnerCard.module.css';

interface Props {
  dinner: Dinner;
  onClick?: () => void;
}

export function DinnerCard({ dinner, onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  const formattedDate = new Date(dinner.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article
      className={styles.card}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className={styles.photoWrap}>
        <img
          src={dinner.groupPhoto}
          alt={dinner.name}
          className={styles.photo}
          style={{ transform: hovered ? 'scale(1)' : 'scale(1.15)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.date}>{formattedDate}</span>
          <span className={styles.count}>{dinner.attendees.length} attendees</span>
        </div>
        <h3 className={styles.title}>{dinner.name}</h3>
        <p className={styles.desc}>{dinner.description}</p>
        <div className={styles.tags}>
          <span className={styles.venueTag}>{dinner.venue}</span>
        </div>
      </div>
    </article>
  );
}
