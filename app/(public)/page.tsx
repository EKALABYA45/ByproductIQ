'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { THEME_META } from '@/lib/theme/palettes';
import { useTheme } from '@/lib/theme/ThemeProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import styles from './page.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { theme } = useTheme();
  const { reducedMotion } = useSmoothScroll();
  const spinBadgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = spinBadgeRef.current;
    if (!el || reducedMotion) return;

    const tween = gsap.to(el, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <>
      <section className={`container ${styles.hero}`}>
        <div className={styles.stickerRow}>
          <span className="sticker">RE-USE</span>
          <span className="sticker sticker--pink">UPCYCLE</span>
          <span className="sticker sticker--yellow">NO WASTE</span>
        </div>

        <h1 className={`display-xl ${styles.title}`}>
          Every byproduct has a{' '}
          <span className="text-outline">possibility.</span>
        </h1>

        <p className={`body-lg ${styles.lead}`}>
          Not trash. Just early-stage product. Discover. Create. Evaluate.
          Steps 1 &amp; 2 foundation is live: SCSS design tokens, 4-area GSAP
          theme transitions, Lenis + ScrollTrigger sync, and the recycled
          custom cursor.
        </p>

        <div className={styles.ctaRow}>
          <button type="button" className="btn btn--primary">
            I have waste to sell
            <ArrowRight size={18} />
          </button>
          <button type="button" className="btn btn--strong">
            I want to make/buy
            <Sparkles size={18} />
          </button>
        </div>

        <div className={styles.labGrid} id="how-it-works">
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <h2 className="display-md">Area Theme Switcher</h2>
              <span className="sticker sticker--blue">
                {THEME_META[theme].badge}
              </span>
            </div>
            <p className={styles.metaText}>
              Active area: <strong>{THEME_META[theme].label}</strong> &mdash;
              Cursor trail: <strong>{THEME_META[theme].cursorHint}</strong>.
              Switching animates palette variables with a 600ms GSAP color
              tween.
            </p>
            <ThemeSwitcher showAreaTabs />
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <h2 className="display-md">Cursor Morph Lab</h2>
              <span className="sticker sticker--craft">DESKTOP FINE</span>
            </div>
            <p className={styles.metaText}>
              Hover the buttons above for a squishing bottle cap, hover the
              swatch below for a <code>VIEW</code> label, or focus the input to
              shrink to a dot.
            </p>
            <div className={styles.viewProbe} data-cursor="view">
              Hover here for &ldquo;VIEW&rdquo; cursor morph
              <br />
              (Product image target)
            </div>
            <label htmlFor="cursor-input-test" className="sr-only">
              Test text input cursor state
            </label>
            <input
              id="cursor-input-test"
              type="text"
              className={styles.inputProbe}
              placeholder="Hover or type here — cursor shrinks to a precision dot"
            />
          </div>
        </div>
      </section>

      <section className={`container ${styles.scrollSection}`} id="examples">
        <div className={styles.scrollBanner}>
          <div>
            <p className="eyebrow">Lenis + ScrollTrigger Sync</p>
            <h2 className="display-md">
              Smooth scroll drives the sticker rotation
            </h2>
            <p className={styles.metaText}>
              Respects <code>prefers-reduced-motion</code> automatically.
            </p>
          </div>
          <div ref={spinBadgeRef} className={styles.spinBadge}>
            SCROLL
            <br />
            SYNC
          </div>
        </div>
      </section>
    </>
  );
}
