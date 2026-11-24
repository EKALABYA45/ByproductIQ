'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.scss';

const SESSION_KEY = 'byproductiq-preloader-seen';

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const bottleRef = useRef<SVGSVGElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === '1';

    if (reducedMotion || alreadySeen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible || !overlayRef.current) return;

    const progress = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        window.sessionStorage.setItem(SESSION_KEY, '1');
        setVisible(false);
      },
    });
    tlRef.current = tl;

    tl.to(progress, {
      value: 100,
      duration: 1.25,
      ease: 'power2.inOut',
      onUpdate: () => {
        const rounded = Math.round(progress.value);
        setPercent(rounded);
        if (fillRef.current) {
          fillRef.current.style.width = `${rounded}%`;
        }
      },
    });

    if (bottleRef.current) {
      tl.to(
        bottleRef.current,
        {
          scaleY: 0.42,
          scaleX: 1.28,
          rotation: -8,
          duration: 1.15,
          ease: 'power2.in',
        },
        0
      );
    }

    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.55,
      ease: 'power3.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [visible]);

  const handleSkip = () => {
    tlRef.current?.kill();
    window.sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading ByproductIQ"
    >
      <div className={styles.topBar}>
        <span className={styles.brand}>ByproductIQ</span>
        <button type="button" onClick={handleSkip} className={styles.skipBtn}>
          Skip intro
        </button>
      </div>

      <div className={styles.center}>
        <div className={styles.bottleWrap}>
          <svg
            ref={bottleRef}
            width="84"
            height="84"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <rect
              x="25"
              y="4"
              width="14"
              height="7"
              rx="2"
              fill="#FF4F9A"
              stroke="#F7F7F4"
              strokeWidth="2.5"
            />
            <path
              d="M22 12H42L47 22V54C47 57.3 44.3 60 41 60H23C19.7 60 17 57.3 17 54V22L22 12Z"
              fill="#3D7BFF"
              stroke="#F7F7F4"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <rect
              x="17"
              y="28"
              width="30"
              height="14"
              fill="#B7E36B"
              stroke="#123D33"
              strokeWidth="2"
            />
          </svg>
        </div>
        <p className={styles.status}>Crushing the bottle&hellip;</p>
        <p className={styles.counter}>{percent}%</p>
      </div>

      <div className={styles.track} aria-hidden="true">
        <div ref={fillRef} className={styles.fill} />
      </div>
    </div>
  );
}
