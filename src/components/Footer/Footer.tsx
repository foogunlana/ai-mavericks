import { ExternalLink } from 'lucide-react';
import { SocialIcons } from '../SocialIcons/SocialIcons';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="https://ai-mavericks-ldn.beehiiv.com" target="_blank" rel="noopener noreferrer" className={styles.newsletter}>
          Newsletter
          <ExternalLink size={13} strokeWidth={2} />
        </a>
        <SocialIcons />
      </div>
      <p className={styles.credit}>AI Mavericks London</p>
    </footer>
  );
}
