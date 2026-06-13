import type { ComponentPropsWithoutRef } from 'react';
import styles from './FlashyBtn.module.css';

export function FlashyBtn({ children, className, ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={`${styles.flashyBtn}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </button>
  );
}
