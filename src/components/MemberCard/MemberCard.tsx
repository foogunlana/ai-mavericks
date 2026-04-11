import { useState } from 'react';
import type { Member } from '../../types';
import { getTagLabel } from '../../data/tags';
import { getDinnerBySlug } from '../../data/dinners';
import styles from './MemberCard.module.css';

interface Props {
  member: Member;
}

export function MemberCard({ member }: Props) {
  const [flipped, setFlipped] = useState(false);

  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const photoSrc = member.photo.endsWith('.svg')
    ? member.photo
    : member.photo;

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped((f) => !f)}
      id={`member-${member.slug}`}
    >
      <div className={styles.inner}>
        {/* Front */}
        <div className={styles.front}>
          <img
            src={photoSrc}
            alt={member.name}
            className={styles.photo}
            loading="lazy"
          />
          <div className={styles.overlay}>
            <span className={styles.name}>{member.name}</span>
            <span className={styles.role}>{member.title}</span>
          </div>
          <div className={styles.hoverOverlay}>
            <span className={styles.name}>{member.name}</span>
            <p className={styles.hoverBio}>{member.bio}</p>
            <div className={styles.hoverTags}>
              {member.tags.map((t) => (
                <span key={t}>{getTagLabel(t)}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div className={styles.back}>
          <div className={styles.backContent}>
            <span className={styles.name}>{member.name}</span>
            <span className={styles.role}>{member.title}</span>
            {member.company && (
              <span className={styles.company}>{member.company}</span>
            )}
            <p className={styles.bio}>{member.bio}</p>
            <div className={styles.tags}>
              {member.tags.map((t, i) => (
                <span key={t}>
                  {getTagLabel(t)}
                  {i < member.tags.length - 1 && ' | '}
                </span>
              ))}
            </div>
            {member.linkedin && (
              <a
                href={member.linkedin}
                className={styles.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn
              </a>
            )}
            <div className={styles.dinnersList}>
              {member.dinners.map((slug) => {
                const dinner = getDinnerBySlug(slug);
                return dinner ? (
                  <a
                    key={slug}
                    href={`#dinner-${slug}`}
                    className={styles.dinnerLink}
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById(`dinner-${slug}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {dinner.name}
                  </a>
                ) : null;
              })}
            </div>
            <span className={styles.flipBack}>tap to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
