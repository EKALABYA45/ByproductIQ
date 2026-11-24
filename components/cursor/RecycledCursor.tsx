'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/lib/theme/ThemeProvider';
import { CursorSprite, THEME_SPRITE_SETS } from './cursorSprites';
import styles from './RecycledCursor.module.scss';

type CursorVariant = 'default' | 'button' | 'image' | 'text';

function detectCursorVariant(target: EventTarget | null): CursorVariant {
  if (!(target instanceof Element)) return 'default';

  const imageTarget = target.closest(
    '[data-cursor="view"], [data-cursor="image"]'
  );
  if (imageTarget) return 'image';

  const textTarget = target.closest(
    'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]'
  );
  if (textTarget) return 'text';

  const buttonTarget = target.closest(
    'button, a, [role="button"], [data-cursor="button"]'
  );
  if (buttonTarget) return 'button';

  return 'default';
}

export function RecycledCursor() {
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isPressed, setIsPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const variantRef = useRef<CursorVariant>('default');
  const visibleRef = useRef(false);

  const sprites = THEME_SPRITE_SETS[theme];

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateCapabilities = () => {
      const isFine = pointerQuery.matches;
      const isReduced = motionQuery.matches;
      setEnabled(isFine);
      setReducedMotion(isReduced);

      if (isFine) {
        document.documentElement.classList.add('has-custom-cursor');
      } else {
        document.documentElement.classList.remove('has-custom-cursor');
      }
    };

    updateCapabilities();
    pointerQuery.addEventListener('change', updateCapabilities);
    motionQuery.addEventListener('change', updateCapabilities);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      pointerQuery.removeEventListener('change', updateCapabilities);
      motionQuery.removeEventListener('change', updateCapabilities);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const mainEl = mainRef.current;
    if (!mainEl) return;

    if (reducedMotion) {
      const onMoveSimple = (e: PointerEvent) => {
        if (!visibleRef.current) {
          visibleRef.current = true;
          setVisible(true);
        }
        mainEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      };

      window.addEventListener('pointermove', onMoveSimple, { passive: true });
      return () => {
        window.removeEventListener('pointermove', onMoveSimple);
      };
    }

    const mainX = gsap.quickTo(mainEl, 'x', { duration: 0.08, ease: 'power3.out' });
    const mainY = gsap.quickTo(mainEl, 'y', { duration: 0.08, ease: 'power3.out' });

    const trailControllers = sprites.map((_, idx) => {
      const el = trailRefs.current[idx];
      if (!el) return null;
      return {
        x: gsap.quickTo(el, 'x', {
          duration: 0.22 + idx * 0.075,
          ease: 'power3.out',
        }),
        y: gsap.quickTo(el, 'y', {
          duration: 0.22 + idx * 0.075,
          ease: 'power3.out',
        }),
        rot: gsap.quickTo(el, 'rotation', {
          duration: 0.34 + idx * 0.06,
          ease: 'power2.out',
        }),
      };
    });

    let lastX = -100;
    let lastY = -100;

    const onPointerMove = (e: PointerEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const x = e.clientX;
      const y = e.clientY;
      const dx = lastX < 0 ? 0 : x - lastX;
      const dy = lastY < 0 ? 0 : y - lastY;
      lastX = x;
      lastY = y;

      mainX(x);
      mainY(y);

      const velocitySpin = Math.max(-42, Math.min(42, (dx - dy * 0.35) * 0.85));

      trailControllers.forEach((ctrl, idx) => {
        if (!ctrl) return;
        const spreadAngle = (idx - (sprites.length - 1) / 2) * 0.38;
        const offsetX = Math.cos(spreadAngle) * (idx + 1) * 4.5;
        const offsetY = Math.sin(spreadAngle) * (idx + 1) * 4.5 + (idx + 1) * 3.5;
        ctrl.x(x + offsetX);
        ctrl.y(y + offsetY);
        ctrl.rot((idx % 2 === 0 ? 10 : -10) + velocitySpin * (1 + idx * 0.1));
      });

      const nextVariant = detectCursorVariant(e.target);
      if (nextVariant !== variantRef.current) {
        variantRef.current = nextVariant;
        setVariant(nextVariant);
      }
    };

    const onPointerDown = () => setIsPressed(true);
    const onPointerUp = () => setIsPressed(false);
    const onMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [enabled, reducedMotion, sprites]);

  // Squish bottle-cap animation when hovering or pressing buttons
  useEffect(() => {
    if (!enabled || reducedMotion || variant !== 'button' || !capRef.current) {
      return;
    }

    gsap.to(capRef.current, {
      scaleX: isPressed ? 1.32 : 1.18,
      scaleY: isPressed ? 0.72 : 0.84,
      rotation: isPressed ? -12 : 8,
      duration: 0.24,
      ease: 'back.out(2.2)',
    });
  }, [enabled, reducedMotion, variant, isPressed]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={styles.cursorLayer}
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}
    >
      {!reducedMotion &&
        sprites.map((kind, idx) => (
          <div
            key={`${theme}-${kind}-${idx}`}
            ref={(el) => {
              trailRefs.current[idx] = el;
            }}
            className={styles.trailItem}
            style={{
              opacity:
                variant === 'text'
                  ? 0
                  : Math.max(0.28, 0.88 - idx * 0.11),
              transform: 'translate3d(-100px, -100px, 0)',
            }}
          >
            <CursorSprite kind={kind} size={Math.max(15, 22 - idx)} />
          </div>
        ))}

      <div ref={mainRef} className={styles.mainCursor}>
        {reducedMotion ? (
          <div className={styles.dotReduced} />
        ) : variant === 'button' ? (
          <div ref={capRef} className={styles.bottleCap}>
            <CursorSprite kind="bottle-cap-lime" size={28} />
          </div>
        ) : variant === 'image' ? (
          <div className={styles.viewBadge}>VIEW</div>
        ) : (
          <div
            className={styles.dot}
            style={{
              transform: variant === 'text' ? 'scale(0.45)' : 'scale(1)',
            }}
          />
        )}
      </div>
    </div>
  );
}
