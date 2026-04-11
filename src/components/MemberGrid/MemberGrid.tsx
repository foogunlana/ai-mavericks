import type { Member } from '../../types';
import { MemberCard } from '../MemberCard/MemberCard';
import styles from './MemberGrid.module.css';

interface Props {
  members: Member[];
}

export function MemberGrid({ members }: Props) {
  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No members match your filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <MemberCard key={member.slug} member={member} />
      ))}
    </div>
  );
}
