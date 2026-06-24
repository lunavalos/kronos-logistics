"use client";
import styles from './GlowBorder.module.css';

export default function GlowBorder({ children, className = '' }) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {/* The rotating gradient border */}
      <div className={styles.borderLayer} aria-hidden="true" />
      {/* Content */}
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
