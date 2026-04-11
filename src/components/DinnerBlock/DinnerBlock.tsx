import type { Dinner } from '../../types';
import { getMemberBySlug } from '../../data/members';
import { AttendeeCard } from '../AttendeeCard/AttendeeCard';
import styles from './DinnerBlock.module.css';

interface Props {
  dinner: Dinner;
}

export function DinnerBlock({ dinner }: Props) {
  const attendeeMembers = dinner.attendees
    .map(getMemberBySlug)
    .filter(Boolean);

  const formattedDate = new Date(dinner.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={styles.block} id={`dinner-${dinner.slug}`}>
      <div className={styles.hero}>
        {dinner.groupPhoto && (
          <img
            src={dinner.groupPhoto}
            alt={dinner.name}
            className={styles.heroImage}
            loading="lazy"
          />
        )}
        <div className={styles.heroOverlay}>
          <span className={styles.date}>{formattedDate}</span>
          <h2 className={styles.title}>{dinner.name}</h2>
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

      <div className={styles.links}>
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
