import type { Dinner } from '../../types';
import { getMemberBySlug } from '../../data/members';
import styles from './DinnerHero.module.css';

interface Props {
  dinner: Dinner;
  onSelectDinner?: (slug: string) => void;
}

export function DinnerHero({ dinner, onSelectDinner }: Props) {
  const formattedDate = new Date(dinner.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const attendeeMembers = dinner.attendees.map(getMemberBySlug).filter(Boolean);

  return (
    <div
      className={styles.hero}
      onClick={onSelectDinner ? () => onSelectDinner(dinner.slug) : undefined}
      style={onSelectDinner ? { cursor: 'pointer' } : undefined}
    >
      {/* Left: photo */}
      {dinner.groupPhoto && (
        <div className={styles.photoCol}>
          <img
            src={dinner.groupPhoto}
            alt={dinner.name}
            className={styles.photo}
          />
        </div>
      )}

      {/* Right: details */}
      <div className={styles.details}>
        <div>
          <span className={styles.label}>Latest Dinner · {formattedDate}</span>
          <h2 className={styles.title}>{dinner.name}</h2>
        </div>

        <p className={styles.description}>{dinner.description}</p>

        {dinner.venue && (
          <div className={styles.venue}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.venueIcon}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className={styles.venueText}>{dinner.venue}</span>
          </div>
        )}

        {dinner.topics.length > 0 && (
          <div className={styles.topics}>
            <span className={styles.sectionLabel}>Topics Discussed</span>
            <div className={styles.topicList}>
              {dinner.topics.map((t, i) => (
                <div key={i} className={styles.topicRow}>
                  <div className={styles.bullet} />
                  <span className={styles.topicText}>
                    {t.text}
                    {t.attribution && <span className={styles.attribution}> — {t.attribution}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {attendeeMembers.length > 0 && (
          <div className={styles.attendees}>
            <span className={styles.sectionLabel}>{attendeeMembers.length} Attendees</span>
            <div className={styles.chips}>
              {attendeeMembers.map((m) => (
                <div key={m!.slug} className={styles.chip}>
                  <img
                    src={m!.photo}
                    alt={m!.name}
                    className={styles.chipAvatar}
                    onError={(e) => { (e.target as HTMLImageElement).src = `/images/members/${m!.slug}.svg`; }}
                  />
                  <span className={styles.chipName}>{m!.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
