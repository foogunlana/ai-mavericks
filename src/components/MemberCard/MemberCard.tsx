import { useState } from 'react';
import type { Member } from '../../types';
import { getTagLabel } from '../../data/tags';
import { getDinnerBySlug } from '../../data/dinners';
import { SocialIcons } from '../SocialIcons/SocialIcons';
import styles from './MemberCard.module.css';

interface Props {
  member: Member;
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
            onError={(e) => { (e.target as HTMLImageElement).src = `/images/members/${member.slug}.svg`; }}
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
              onError={(e) => { (e.target as HTMLImageElement).src = `/images/members/${member.slug}.svg`; }}
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
              <SocialIcons
                twitter={member.twitter || undefined}
                linkedin={member.linkedin || undefined}
                className={styles.socials}
              />
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
