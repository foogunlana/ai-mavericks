import { dinners } from '../../data/dinners';
import { DinnerBlock } from '../DinnerBlock/DinnerBlock';
import styles from './DinnerSection.module.css';

export function DinnerSection() {
  return (
    <div className={styles.section}>
      {dinners.map((dinner) => (
        <DinnerBlock key={dinner.slug} dinner={dinner} />
      ))}
    </div>
  );
}
