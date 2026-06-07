import styles from './FlashyBtn.module.css';

export function FlashyBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className={styles.flashyBtn}>
      {children}
    </button>
  );
}
