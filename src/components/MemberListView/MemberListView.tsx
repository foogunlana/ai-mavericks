import { useState, useRef } from 'react';
import type { Member } from '../../types';
import { getTagLabel } from '../../data/tags';
import styles from './MemberListView.module.css';

interface Props {
  members: Member[];
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

export function MemberListView({ members }: Props) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const membersByLetter = ALPHABET.reduce<Record<string, Member[]>>((acc, letter) => {
    const group = members.filter((m) => getInitial(m.name) === letter);
    if (group.length > 0) acc[letter] = group;
    return acc;
  }, {});

  const presentLetters = new Set(Object.keys(membersByLetter));

  function jumpTo(letter: string) {
    if (!presentLetters.has(letter)) return;
    setActiveLetter(letter);
    letterRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No members match your filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* A–Z quick-jump bar */}
      <div className={styles.alphaBar}>
        {ALPHABET.map((letter) => {
          const has = presentLetters.has(letter);
          const isActive = activeLetter === letter;
          return (
            <button
              key={letter}
              className={`${styles.alphaBadge} ${isActive ? styles.alphaActive : ''} ${!has ? styles.alphaEmpty : ''}`}
              onClick={() => jumpTo(letter)}
              disabled={!has}
              aria-label={`Jump to ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Grouped list */}
      <div className={styles.list}>
        {ALPHABET.filter((l) => presentLetters.has(l)).map((letter) => (
          <div
            key={letter}
            ref={(el) => { letterRefs.current[letter] = el; }}
          >
            <div className={styles.letterHeader}>{letter}</div>
            {membersByLetter[letter].map((member, i) => (
              <div
                key={member.slug}
                className={styles.row}
                style={{ borderTop: i === 0 ? 'none' : undefined }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className={styles.avatar}
                  loading="lazy"
                />
                <div className={styles.info}>
                  <div className={styles.nameRow}>
                    <span className={styles.name}>{member.name}</span>
                    <span className={styles.role}>{member.title}</span>
                  </div>
                  <p className={styles.bio}>{member.bio}</p>
                  {member.tags.length > 0 && (
                    <div className={styles.tags}>
                      {member.tags.map((t) => (
                        <span key={t} className={styles.tag}>{getTagLabel(t)}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
