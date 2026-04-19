import type { Member } from '../../types';
import styles from './AttendeeCard.module.css';

interface Props {
  member: Member;
}

export function AttendeeCard({ member }: Props) {
  return (
    <button
      className={styles.card}
      onClick={() => {
        document.getElementById(`member-${member.slug}`)?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <img
        src={member.photo}
        alt={member.name}
        className={styles.photo}
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = `/images/members/${member.slug}.svg`; }}
      />
      <div className={styles.info}>
        <span className={styles.name}>{member.name}</span>
        <span className={styles.role}>{member.title}</span>
      </div>
    </button>
  );
}
