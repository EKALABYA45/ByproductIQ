'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import styles from './HeroSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(
  () => import('@/components/three/HeroCanvas').then((m) => m.HeroCanvas),
  { ssr: false }
);

const MORPH_STAGES = [
  { from: 'Tyre', to: 'Painted Planter' },
  { from: 'Egg Tray', to: 'Coloured Wall Panel' },
  { from: 'Plastic Bags', to: 'Wall Art' },
];

const HEADLINE_WORDS = [
  'Every',
  'byproduct',
  'has',
  'a',
  'possibility.',
];

export function HeroSection() {
  const { reducedMotion } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const scrollProgressRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const lowPower =
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= 2;

    const frame = window.requestAnimationFrame(() => {
      setUse3D(!mobile && !lowPower && !reducedMotion);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  // Split-text GSAP reveal on headline + scroll-linked WASTE -> WOW morph
  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline || reducedMotion) return;

    const words = headline.querySelectorAll('[data-split-word]');
    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 115,
        opacity: 0,
        duration: 0.72,
        stagger: 0.075,
        ease: 'power3.out',
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          setScrollPct(Math.round(self.progress * 100));
          const idx = Math.min(
            MORPH_STAGES.length - 1,
            Math.floor(self.progress * MORPH_STAGES.length)
          );
          setActiveStage(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      {use3D ? (
        <div className={styles.canvasLayer}>
          <HeroCanvas scrollProgressRef={scrollProgressRef} />
        </div>
      ) : (
        <div className={styles.mobileFallback} aria-hidden="true">
          <div className={styles.fallbackShapeA} />
          <div className={styles.fallbackShapeB} />
          <div className={styles.fallbackShapeC} />
        </div>
      )}

      <div className={`container ${styles.heroInner}`}>
        <div className={styles.stickerBar}>
          <span className="sticker">RE-USE</span>
          <span className="sticker sticker--pink">UPCYCLE</span>
          <span className="sticker sticker--yellow">NO WASTE</span>
          <span className="eyebrow">Discover &bull; Create &bull; Evaluate</span>
        </div>

        <h1 ref={headlineRef} className={`display-xl ${styles.headline}`}>
          {HEADLINE_WORDS.map((word, idx) => (
            <React.Fragment key={word}>
              <span className={styles.wordWrap}>
                <span
                  data-split-word
                  className={`${styles.wordInner} ${
                    idx === HEADLINE_WORDS.length - 1 ? 'text-outline' : ''
                  }`}
                >
                  {word}
                </span>
              </span>{' '}
            </React.Fragment>
          ))}
        </h1>

        <p className={`body-lg ${styles.subcopy}`}>
          Not trash. Just early-stage product. List leftover materials to
          discover product ideas and matched registered buyers, or browse real
          batches and test unit economics before making.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/login/seller" className="btn btn--primary">
            I have waste to sell
            <ArrowRight size={18} />
          </Link>
          <Link href="/login/buyer" className="btn btn--strong">
            I want to make/buy
            <Sparkles size={18} />
          </Link>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.morphStrip} aria-label="Scroll-linked Waste to Wow preview">
          <span className={styles.morphTag}>WASTE &rarr; WOW</span>

          <div className={styles.morphStages}>
            {MORPH_STAGES.map((stage, idx) => (
              <button
                key={stage.from}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`${styles.stagePill} ${
                  activeStage === idx ? styles.stagePillActive : ''
                }`}
              >
                <span>{stage.from}</span>
                <span>&rarr;</span>
                <span>{stage.to}</span>
              </button>
            ))}
          </div>

          <div className={styles.morphProgressTrack} aria-hidden="true">
            <div
              className={styles.morphProgressFill}
              style={{ width: `${Math.max(12, scrollPct)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
