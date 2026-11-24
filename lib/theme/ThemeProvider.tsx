'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import {
  AreaTheme,
  ColorMode,
  THEME_PALETTES,
  ThemePalette,
} from './palettes';

interface ThemeContextValue {
  theme: AreaTheme;
  colorMode: ColorMode;
  setTheme: (nextTheme: AreaTheme) => void;
  setColorMode: (nextMode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COLOR_MODE_STORAGE_KEY = 'byproductiq-color-mode';
const COLOR_MODE_EVENT = 'byproductiq:colormode';

function resolveThemeFromPath(pathname: string | null): AreaTheme | null {
  if (!pathname) return null;
  if (pathname.startsWith('/seller')) return 'seller';
  if (pathname.startsWith('/buyer')) return 'buyer';
  if (pathname.startsWith('/admin')) return 'admin';
  return null;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getColorModeSnapshot(): ColorMode {
  const saved = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getServerColorModeSnapshot(): ColorMode {
  return 'light';
}

function subscribeColorMode(callback: () => void): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  window.addEventListener('storage', callback);
  window.addEventListener(COLOR_MODE_EVENT, callback);
  media.addEventListener('change', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(COLOR_MODE_EVENT, callback);
    media.removeEventListener('change', callback);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [manualOverride, setManualOverride] = useState<{
    pathname: string | null;
    theme: AreaTheme;
  } | null>(null);

  const colorMode = useSyncExternalStore(
    subscribeColorMode,
    getColorModeSnapshot,
    getServerColorModeSnapshot
  );

  const routeTheme = resolveThemeFromPath(pathname);
  const theme: AreaTheme =
    manualOverride && manualOverride.pathname === pathname
      ? manualOverride.theme
      : (routeTheme ?? 'public');

  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const hasMountedRef = useRef(false);

  const animatePaletteTransition = useCallback(
    (nextTheme: AreaTheme, nextMode: ColorMode, animate: boolean) => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      const targetPalette: ThemePalette = THEME_PALETTES[nextTheme][nextMode];
      const keys = Object.keys(targetPalette) as (keyof ThemePalette)[];

      const fromVars: Record<string, string> = {};
      for (const key of keys) {
        const val = computed.getPropertyValue(key).trim();
        fromVars[key] = val || targetPalette[key];
      }

      root.setAttribute('data-theme', nextTheme);
      root.setAttribute('data-color-mode', nextMode);

      if (!animate || prefersReducedMotion()) {
        tweenRef.current?.kill();
        for (const key of keys) {
          root.style.removeProperty(key);
        }
        return;
      }

      tweenRef.current?.kill();
      tweenRef.current = gsap.fromTo(root, fromVars, {
        ...targetPalette,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          for (const key of keys) {
            root.style.removeProperty(key);
          }
          tweenRef.current = null;
        },
      });
    },
    []
  );

  useEffect(() => {
    animatePaletteTransition(theme, colorMode, hasMountedRef.current);
    hasMountedRef.current = true;
  }, [theme, colorMode, animatePaletteTransition]);

  const setTheme = useCallback(
    (nextTheme: AreaTheme) => {
      setManualOverride({ pathname, theme: nextTheme });
    },
    [pathname]
  );

  const setColorMode = useCallback((nextMode: ColorMode) => {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextMode);
    window.dispatchEvent(new Event(COLOR_MODE_EVENT));
  }, []);

  const toggleColorMode = useCallback(() => {
    const next: ColorMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(next);
  }, [colorMode, setColorMode]);

  const value = useMemo(
    () => ({
      theme,
      colorMode,
      setTheme,
      setColorMode,
      toggleColorMode,
    }),
    [theme, colorMode, setTheme, setColorMode, toggleColorMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
