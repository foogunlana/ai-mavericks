import { getDinnerBySlug } from '../../data/dinners';
import { getMemberBySlug } from '../../data/members';
import { AttendeeCard } from '../AttendeeCard/AttendeeCard';
import styles from './DinnerDetail.module.css';

interface Props {
  dinnerSlug: string;
  onBack: () => void;
}

export function DinnerDetail({ dinnerSlug, onBack }: Props) {
  const dinner = getDinnerBySlug(dinnerSlug);

  if (!dinner) {
    return (
      <div className={styles.notFound}>
        <p>Dinner not found.</p>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back to Dinners
        </button>
      </div>
    );
  }

  const attendeeMembers = dinner.attendees
    .map(getMemberBySlug)
    .filter(Boolean);

  const formattedDate = new Date(dinner.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={styles.detail}>
      <button className={styles.backBtn} onClick={onBack}>
        ← All Dinners
      </button>

      <div className={styles.hero}>
        {dinner.groupPhoto && (
          <img
            src={dinner.groupPhoto}
            alt={dinner.name}
            className={styles.heroImage}
          />
        )}
        <div className={styles.heroOverlay}>
          <span className={styles.date}>{formattedDate}</span>
          <h1 className={styles.title}>{dinner.name}</h1>
          {dinner.venue && <span className={styles.venue}>{dinner.venue}</span>}
        </div>
      </div>

      {dinner.topics.length > 0 && (
        <div className={styles.topics}>
          <ul>
            {dinner.topics.map((topic, i) => (
              <li key={i} className={styles.topic}>
                <span>{topic.text}</span>
                {topic.attribution && (
                  <span className={styles.attribution}> — {topic.attribution}</span>
                )}
                {topic.links.map((link, j) => (
                  <a
                    key={j}
                    href={link}
                    className={styles.topicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    link
                  </a>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.attendees}>
        <span className={styles.attendeesLabel}>
          {attendeeMembers.length} attendees
        </span>
        <div className={styles.attendeesGrid}>
          {attendeeMembers.map((member) => (
            <AttendeeCard key={member!.slug} member={member!} />
          ))}
        </div>
      </div>

      <div className={styles.externalLinks}>
        {dinner.beehiivUrl && (
          <a href={dinner.beehiivUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
            Full recap
          </a>
        )}
        {dinner.discordUrl && (
          <a href={dinner.discordUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
            Discord
          </a>
        )}
      </div>
    </article>
  );
}
