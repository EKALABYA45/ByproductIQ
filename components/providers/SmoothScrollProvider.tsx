'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  reducedMotion: boolean;
  scrollTo: (target: string | number | HTMLElement) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  reducedMotion: false,
  scrollTo: () => {},
});

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenisInstance: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    const setup = (isReduced: boolean) => {
      setReducedMotion(isReduced);

      if (lenisInstance) {
        if (rafCallback) {
          gsap.ticker.remove(rafCallback);
          rafCallback = null;
        }
        lenisInstance.destroy();
        lenisInstance = null;
        setLenis(null);
      }

      if (isReduced) {
        ScrollTrigger.refresh();
        return;
      }

      lenisInstance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });

      lenisInstance.on('scroll', ScrollTrigger.update);

      rafCallback = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenisInstance);
    };

    setup(mediaQuery.matches);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setup(event.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
      }
      lenisInstance?.destroy();
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement) => {
      if (lenis && !reducedMotion) {
        lenis.scrollTo(target, { offset: -76 });
        return;
      }

      if (typeof target === 'number') {
        window.scrollTo({ top: target });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'auto' });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    },
    [lenis, reducedMotion]
  );

  const value = useMemo(
    () => ({ lenis, reducedMotion, scrollTo }),
    [lenis, reducedMotion, scrollTo]
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
