'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCT_EXAMPLES } from '@/lib/data/landingContent';
import { ProductExampleCard } from '@/components/cards/ProductExampleCard';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import styles from './TrashToTreasureSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_SLUGS = new Set([
  'tyre-wall-planter',
  'egg-tray-wall-panel',
  'plastic-bag-wall-art',
  'ewaste-circuit-art',
  'glass-bottle-lamp',
  'fabric-patchwork-bag',
  'wood-offcut-toys',
  'used-wire-copper',
]);

export function TrashToTreasureSection() {
  const { reducedMotion } = useSmoothScroll();
  const pinSectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const featured = PRODUCT_EXAMPLES.filter((item) =>
    FEATURED_SLUGS.has(item.slug)
  );

  useEffect(() => {
    const section = pinSectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 48);

      if (getDistance() <= 0) return;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.85,
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      id="examples"
      ref={pinSectionRef}
      className={styles.section}
      aria-label="Trash to Treasure horizontal gallery"
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerCopy}>
            <span className="sticker sticker--pink velocity-sticker">
              TRASH &rarr; TREASURE
            </span>
            <h2 className="display-lg">
              Before &amp; after circular product gallery
            </h2>
            <p style={{ color: 'var(--ink-muted)' }}>
              Scroll to slide horizontally through real material
              transformations.{' '}
              <strong>
                Verify safety, quality and legal requirements before making or
                selling.
              </strong>
            </p>
          </div>
          <span className="sticker sticker--yellow velocity-sticker">
            PINNED SCROLL
          </span>
        </div>
      </div>

      <div className={styles.trackOuter}>
        <div ref={trackRef} className={styles.track}>
          {featured.map((item) => (
            <div key={item.slug} className={styles.slideCard}>
              <div className={styles.beforeAfterBar}>
                <span>BEFORE: {item.sourceMaterial}</span>
                <span className={styles.arrow} aria-hidden="true">
                  &rarr;
                </span>
                <span>AFTER: {item.title}</span>
              </div>
              <ProductExampleCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
