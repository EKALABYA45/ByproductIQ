'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCT_EXAMPLES } from '@/lib/data/landingContent';
import { ProductExampleCard } from '@/components/cards/ProductExampleCard';
import styles from './TrashToTreasureSection.module.scss';

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    isDown: boolean;
    startX: number;
    scrollLeft: number;
  }>({ isDown: false, startX: 0, scrollLeft: 0 });

  const featured = PRODUCT_EXAMPLES.filter((item) =>
    FEATURED_SLUGS.has(item.slug)
  );

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * 390,
      behavior: 'smooth',
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDown) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const handlePointerUpOrLeave = () => {
    dragState.current.isDown = false;
  };

  return (
    <section
      id="examples"
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
              Swipe, drag, or use the arrows to scroll left and right across
              material transformations while keeping vertical page scroll free.{' '}
              <strong>
                Verify safety, quality and legal requirements before making or
                selling.
              </strong>
            </p>
          </div>

          <div className={styles.controls} aria-label="Gallery navigation">
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll gallery left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => scrollByCard(1)}
              aria-label="Scroll gallery right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.trackWrap}>
        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrLeave}
          onPointerCancel={handlePointerUpOrLeave}
          onPointerLeave={handlePointerUpOrLeave}
        >
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
          <div className={styles.endSpacer} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
