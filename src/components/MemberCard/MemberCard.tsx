import { useState } from 'react';
import type { Member } from '../../types';
import { getTagLabel } from '../../data/tags';
import { getDinnerBySlug } from '../../data/dinners';
import styles from './MemberCard.module.css';

interface Props {
  member: Member;
}

function SocialIcon({ type }: { type: 'x' | 'linkedin' | 'discord' }) {
  const cls = styles.socialIcon;
  if (type === 'x') return (
    <svg viewBox="0 0 20 20" fill="none" className={cls}><path d="M11.27 8.9 16.54 3h-1.25L10.7 8.09 6.84 3H3l5.54 7.8L3 17h1.25l4.84-5.42L13.16 17H17L11.27 8.9Zm-1.71 1.92-.56-.78-4.46-6.17H6.2l3.6 4.99.56.78 4.68 6.47h-1.66l-3.82-5.29Z" fill="currentColor"/></svg>
  );
  if (type === 'linkedin') return (
    <svg viewBox="0 0 20 20" fill="none" className={cls}><path d="M5.37 7.33H3v9.34h2.37V7.33ZM4.19 6.3a1.37 1.37 0 1 0 0-2.74 1.37 1.37 0 0 0 0 2.74ZM17 11.37c0-2.24-1.09-3.28-2.85-3.28-1.31 0-1.9.72-2.22 1.22V7.33H9.57c.03.68 0 9.34 0 9.34h2.36v-5.21c0-.21.02-.42.08-.57.17-.42.56-.86 1.21-.86.86 0 1.2.65 1.2 1.61v5.03H17v-5.3Z" fill="currentColor"/></svg>
  );
  return (
    <svg viewBox="0 0 20 20" fill="none" className={cls}><path d="M15.37 4.6A14.22 14.22 0 0 0 11.87 3.5c-.16.29-.35.68-.48.99a13.17 13.17 0 0 0-3.78 0A10.5 10.5 0 0 0 7.13 3.5a14.27 14.27 0 0 0-3.5 1.1C1.32 7.54.76 10.4 1.04 13.22a14.4 14.4 0 0 0 4.3 2.1c.35-.46.66-.95.92-1.46a9.3 9.3 0 0 1-1.45-.68c.12-.09.24-.18.35-.28a10.27 10.27 0 0 0 8.68 0c.11.1.23.19.35.28-.46.27-.94.5-1.45.68.26.51.57 1 .92 1.46a14.34 14.34 0 0 0 4.3-2.1c.35-3.3-.57-6.16-2.09-8.62ZM7.2 11.47c-.81 0-1.48-.73-1.48-1.62 0-.9.65-1.63 1.48-1.63.82 0 1.49.73 1.48 1.63 0 .89-.66 1.62-1.48 1.62Zm5.6 0c-.82 0-1.48-.73-1.48-1.62 0-.9.65-1.63 1.48-1.63.82 0 1.49.73 1.47 1.63 0 .89-.65 1.62-1.47 1.62Z" fill="currentColor"/></svg>
  );
}

function formatDinner(slug: string): string {
  const dinner = getDinnerBySlug(slug);
  if (!dinner) return slug;
  const date = new Date(dinner.date);
  const mon = date.toLocaleString('en-GB', { month: 'short', year: 'numeric' });
  return `${mon} — ${dinner.venue}`;
}

export function MemberCard({ member }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  const maxDinners = 3;
  const shownDinners = member.dinners.slice(0, maxDinners);
  const extraCount = member.dinners.length - maxDinners;
  const lastDinner = member.dinners.length > 0 ? formatDinner(member.dinners[0]) : null;

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      id={`member-${member.slug}`}
    >
      <div className={styles.inner}>
        {/* Front */}
        <div
          className={styles.front}
          onClick={() => setFlipped(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={member.photo}
            alt={member.name}
            className={`${styles.photo} ${hovered ? styles.photoHovered : ''}`}
            loading="lazy"
          />
          {/* Default gradient overlay */}
          <div className={`${styles.gradientOverlay} ${hovered ? styles.hidden : ''}`}>
            <p className={styles.nameWhite}>{member.name}</p>
            <p className={styles.roleWhite}>{member.title}</p>
          </div>
          {/* Hover overlay */}
          <div className={`${styles.hoverOverlay} ${hovered ? styles.visible : ''}`}>
            <p className={styles.nameWhite}>{member.name}</p>
            <p className={styles.roleWhite}>{member.title}</p>
            <p className={styles.hoverBio}>{member.bio}</p>
            <div className={styles.hoverTags}>
              {member.tags.map((t) => (
                <span key={t} className={styles.hoverTag}>{getTagLabel(t)}</span>
              ))}
            </div>
            {lastDinner && (
              <p className={styles.lastDinner}>Last: {lastDinner}</p>
            )}
          </div>
        </div>

        {/* Back */}
        <div className={styles.back} onClick={() => setFlipped(false)}>
          {/* Header */}
          <div className={styles.backHeader}>
            <img
              src={member.photo}
              alt={member.name}
              className={styles.backAvatar}
            />
            <div>
              <p className={styles.backName}>{member.name}</p>
              <p className={styles.backCompany}>{member.company}</p>
            </div>
          </div>

          {/* Scrollable body */}
          <div className={styles.backBody}>
            {/* Socials + Tags row */}
            <div className={styles.socialsRow}>
              <div className={styles.socials}>
                {member.twitter && <SocialIcon type="x" />}
                {member.linkedin && <SocialIcon type="linkedin" />}
              </div>
              {(member.twitter || member.linkedin) && member.tags.length > 0 && (
                <span className={styles.pipe}>|</span>
              )}
              <div className={styles.backTags}>
                {member.tags.map((t) => (
                  <span key={t} className={styles.backTag}>{getTagLabel(t)}</span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className={styles.bioSection}>
              <p className={styles.bioText}>{member.bio}</p>
            </div>

            {/* Dinners */}
            <div className={styles.dinnersSection}>
              <p className={styles.dinnersLabel}>Dinners attended ({member.dinners.length})</p>
              <div className={styles.dinnersList}>
                {shownDinners.map((slug) => (
                  <div key={slug} className={styles.dinnerItem}>
                    <div className={styles.dinnerDot} />
                    <p className={styles.dinnerText}>{formatDinner(slug)}</p>
                  </div>
                ))}
                {extraCount > 0 && (
                  <p className={styles.dinnerMore}>+{extraCount} more</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
