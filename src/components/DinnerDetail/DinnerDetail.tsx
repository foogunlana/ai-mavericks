import { getDinnerBySlug } from '../../data/dinners';
import { getMemberBySlug } from '../../data/members';
import { MemberCard } from '../MemberCard/MemberCard';
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
      <div className={styles.hero}>
        {dinner.groupPhoto && (
          <img
            src={dinner.groupPhoto}
            alt={dinner.name}
            className={styles.heroImage}
          />
        )}
        <div className={styles.heroOverlay}>
          <button className={styles.backBtn} onClick={onBack}>
            ← All Dinners
          </button>
          <span className={styles.datevenue}>
            {formattedDate}{dinner.venue ? ` · ${dinner.venue}` : ''}
          </span>
          <h1 className={styles.title}>{dinner.name}</h1>
        </div>
      </div>

      <div className={styles.content}>
        {dinner.description && (
          <p className={styles.description}>{dinner.description}</p>
        )}

        {dinner.topics.length > 0 && (
          <div className={styles.topics}>
            <span className={styles.topicsLabel}>Topics Discussed</span>
            <div className={styles.topicsList}>
              {dinner.topics.map((topic, i) => (
                <div key={i} className={styles.topic}>
                  <span className={styles.topicText}>{topic.text}</span>
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
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.externalLinks}>
          {dinner.beehiivUrl && (
            <a href={dinner.beehiivUrl} target="_blank" rel="noopener noreferrer" className={styles.outlineBtn}>
              Full Recap
            </a>
          )}
          {dinner.discordUrl && (
            <a href={dinner.discordUrl} target="_blank" rel="noopener noreferrer" className={styles.ghostBtn}>
              Discord
            </a>
          )}
        </div>
      </div>

      <div className={styles.attendees}>
        <span className={styles.attendeesLabel}>
          {attendeeMembers.length} Attendees
        </span>
        <div className={styles.attendeesGrid}>
          {attendeeMembers.map((member) => (
            <MemberCard key={member!.slug} member={member!} />
          ))}
        </div>
      </div>
    </article>
  );
}
