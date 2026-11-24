import React from 'react';
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from '@/lib/data/landingContent';
import styles from './MaterialMarquee.module.scss';

export function MaterialMarquee() {
  const rowOneDup = [...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE];
  const rowTwoDup = [...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO];

  return (
    <section
      className={styles.marqueeSection}
      aria-label="Supported waste and byproduct materials"
    >
      <div className={`${styles.row} ${styles.rowLeft}`}>
        {rowOneDup.map((label, idx) => (
          <span key={`r1-${idx}-${label}`} className={styles.item}>
            <span className={styles.dot} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>

      <div className={`${styles.row} ${styles.rowRight}`} aria-hidden="true">
        {rowTwoDup.map((label, idx) => (
          <span key={`r2-${idx}-${label}`} className={styles.item}>
            <span className={styles.dot} />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
