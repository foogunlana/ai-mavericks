import { dinners } from '../../data/dinners';
import { DinnerHero } from '../DinnerHero/DinnerHero';
import { DinnerCard } from '../DinnerCard/DinnerCard';
import { FlashyBtn } from '../FlashyBtn/FlashyBtn';
import styles from './DinnersPage.module.css';

interface Props {
  onSelectDinner: (slug: string) => void;
}

export function DinnersPage({ onSelectDinner }: Props) {
  const latestDinner = dinners[0];
  const remainingDinners = dinners.slice(1);

  return (
    <div className={styles.page}>
      {/* Hero — latest dinner */}
      {latestDinner && (
        <div className={styles.heroWrap}>
          <DinnerHero dinner={latestDinner} onSelectDinner={onSelectDinner} />
        </div>
      )}

      {/* Dinner List composite */}
      <div className={styles.listSection}>
        {/* Intro */}
        <div className={styles.intro}>
          <h2 className={styles.introHeading}>AI Mavericks Dinners</h2>
          <p className={styles.introBody}>
            Intimate gatherings where AI builders share ideas, debate the future, and connect over good food.
            No panels, no pitches — just real conversation.
          </p>
          <FlashyBtn>Join the Next Dinner</FlashyBtn>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <span className={styles.count}>{remainingDinners.length} Dinners</span>
        </div>

        {/* 3-column grid */}
        <div className={styles.grid}>
          {remainingDinners.map(dinner => (
            <DinnerCard
              key={dinner.slug}
              dinner={dinner}
              onClick={() => onSelectDinner(dinner.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
