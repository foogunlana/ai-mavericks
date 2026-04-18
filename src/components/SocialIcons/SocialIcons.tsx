import styles from './SocialIcons.module.css';

// Outlined circle social icons with brand SVGs inside

function XIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M11.27 8.9 16.54 3h-1.25L10.7 8.09 6.84 3H3l5.54 7.8L3 17h1.25l4.84-5.42L13.16 17H17L11.27 8.9Zm-1.71 1.92-.56-.78-4.46-6.17H6.2l3.6 4.99.56.78 4.68 6.47h-1.66l-3.82-5.29Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5.37 7.33H3v9.34h2.37V7.33ZM4.19 6.3a1.37 1.37 0 1 0 0-2.74 1.37 1.37 0 0 0 0 2.74ZM17 11.37c0-2.24-1.09-3.28-2.85-3.28-1.31 0-1.9.72-2.22 1.22V7.33H9.57c.03.68 0 9.34 0 9.34h2.36v-5.21c0-.21.02-.42.08-.57.17-.42.56-.86 1.21-.86.86 0 1.2.65 1.2 1.61v5.03H17v-5.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M15.37 4.6A14.22 14.22 0 0 0 11.87 3.5c-.16.29-.35.68-.48.99a13.17 13.17 0 0 0-3.78 0A10.5 10.5 0 0 0 7.13 3.5a14.27 14.27 0 0 0-3.5 1.1C1.32 7.54.76 10.4 1.04 13.22a14.4 14.4 0 0 0 4.3 2.1c.35-.46.66-.95.92-1.46a9.3 9.3 0 0 1-1.45-.68c.12-.09.24-.18.35-.28a10.27 10.27 0 0 0 8.68 0c.11.1.23.19.35.28-.46.27-.94.5-1.45.68.26.51.57 1 .92 1.46a14.34 14.34 0 0 0 4.3-2.1c.35-3.3-.57-6.16-2.09-8.62ZM7.2 11.47c-.81 0-1.48-.73-1.48-1.62 0-.9.65-1.63 1.48-1.63.82 0 1.49.73 1.48 1.63 0 .89-.66 1.62-1.48 1.62Zm5.6 0c-.82 0-1.48-.73-1.48-1.62 0-.9.65-1.63 1.48-1.63.82 0 1.49.73 1.47 1.63 0 .89-.65 1.62-1.47 1.62Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://x.com/Ed_Forson',
    label: 'X (Twitter)',
    icon: <XIcon />,
  },
  {
    href: 'https://www.linkedin.com/in/eddie-forson/',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: 'https://discord.gg/xTxksjUvnE',
    label: 'Discord',
    icon: <DiscordIcon />,
  },
];

interface Props {
  className?: string;
}

export function SocialIcons({ className }: Props) {
  return (
    <div className={`${styles.social} ${className ?? ''}`}>
      {SOCIAL_LINKS.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
          aria-label={label}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
