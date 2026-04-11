import { useState, useMemo } from 'react';
import { dinners } from '../../data/dinners';
import { getMemberBySlug } from '../../data/members';
import styles from './DinnersList.module.css';

interface Props {
  onSelectDinner: (slug: string) => void;
}

export function DinnersList({ onSelectDinner }: Props) {
  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  const allTopics = useMemo(() => {
    const topicSet = new Set<string>();
    for (const dinner of dinners) {
      for (const topic of dinner.topics) {
        if (topic.text) topicSet.add(topic.text);
      }
    }
    return Array.from(topicSet).sort();
  }, []);

  const toggleTopic = (topic: string) => {
    setActiveTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const filteredDinners = useMemo(() => {
    if (activeTopics.length === 0) return dinners;
    return dinners.filter((dinner) =>
      activeTopics.some((topic) => dinner.topics.some((t) => t.text === topic))
    );
  }, [activeTopics]);

  return (
    <div className={styles.container}>
      {allTopics.length > 0 && (
        <div className={styles.filterBar}>
          {allTopics.map((topic) => (
            <button
              key={topic}
              className={`${styles.pill} ${activeTopics.includes(topic) ? styles.pillActive : ''}`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </button>
          ))}
          {activeTopics.length > 0 && (
            <button className={styles.clearBtn} onClick={() => setActiveTopics([])}>
              Clear
            </button>
          )}
        </div>
      )}

      <ul className={styles.list}>
        {filteredDinners.map((dinner) => {
          const formattedDate = new Date(dinner.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          const attendeeNames = dinner.attendees
            .map((slug) => getMemberBySlug(slug))
            .filter(Boolean)
            .map((m) => m!.name);

          return (
            <li key={dinner.slug} className={styles.item}>
              <button
                className={styles.dinnerRow}
                onClick={() => onSelectDinner(dinner.slug)}
              >
                {dinner.groupPhoto && (
                  <div className={styles.heroWrap}>
                    <img
                      src={dinner.groupPhoto}
                      alt={dinner.name}
                      className={styles.heroImg}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={styles.meta}>
                  <span className={styles.date}>{formattedDate}</span>
                  <h2 className={styles.name}>{dinner.name}</h2>
                  {dinner.venue && <span className={styles.venue}>{dinner.venue}</span>}
                  {attendeeNames.length > 0 && (
                    <p className={styles.attendees}>{attendeeNames.join(', ')}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
