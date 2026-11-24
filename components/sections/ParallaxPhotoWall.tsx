'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCT_EXAMPLES } from '@/lib/data/landingContent';
import { ProductExampleCard } from '@/components/cards/ProductExampleCard';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import styles from './ParallaxPhotoWall.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function ParallaxPhotoWall() {
  const { reducedMotion } = useSmoothScroll();
  const wallRef = useRef<HTMLDivElement | null>(null);
  const colARef = useRef<HTMLDivElement | null>(null);
  const colBRef = useRef<HTMLDivElement | null>(null);
  const colCRef = useRef<HTMLDivElement | null>(null);

  const colA = PRODUCT_EXAMPLES.filter((_, idx) => idx % 3 === 0);
  const colB = PRODUCT_EXAMPLES.filter((_, idx) => idx % 3 === 1);
  const colC = PRODUCT_EXAMPLES.filter((_, idx) => idx % 3 === 2);

  useEffect(() => {
    const wall = wallRef.current;
    const a = colARef.current;
    const b = colBRef.current;
    const c = colCRef.current;
    if (!wall || !a || !b || !c || reducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        a,
        { y: 36 },
        {
          y: -52,
          ease: 'none',
          scrollTrigger: {
            trigger: wall,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.75,
          },
        }
      );

      gsap.fromTo(
        b,
        { y: -48 },
        {
          y: 48,
          ease: 'none',
          scrollTrigger: {
            trigger: wall,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.75,
          },
        }
      );

      gsap.fromTo(
        c,
        { y: 36 },
        {
          y: -52,
          ease: 'none',
          scrollTrigger: {
            trigger: wall,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.75,
          },
        }
      );
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <span className="sticker sticker--blue velocity-sticker">
            PARALLAX WALL
          </span>
          <h2 className="display-lg">All 17 circular product examples</h2>
          <p style={{ color: 'var(--ink-muted)' }}>
            Alternating up/down parallax columns with GLSL shader hover ripple.
            Hazardous items such as insulated wire are flagged for authorised
            recyclers only.
          </p>
        </div>
      </div>

      <div ref={wallRef} className={styles.wallGrid}>
        <div ref={colARef} className={styles.col}>
          {colA.map((item) => (
            <ProductExampleCard key={item.slug} item={item} />
          ))}
        </div>

        <div ref={colBRef} className={styles.col}>
          {colB.map((item) => (
            <ProductExampleCard key={item.slug} item={item} />
          ))}
        </div>

        <div ref={colCRef} className={styles.col}>
          {colC.map((item) => (
            <ProductExampleCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
