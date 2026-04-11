import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="https://discord.gg/xTxksjUvnE" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
        <a href="https://ai-mavericks-ldn.beehiiv.com" target="_blank" rel="noopener noreferrer">
          Newsletter
        </a>
        <a href="https://www.linkedin.com/in/eddie-forson/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://x.com/Ed_Forson" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
      <p className={styles.credit}>AI Mavericks London</p>
    </footer>
  );
}
