'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { AreaTheme, THEME_META } from '@/lib/theme/palettes';
import { useTheme } from '@/lib/theme/ThemeProvider';
import styles from './ThemeSwitcher.module.scss';

const THEMES: AreaTheme[] = ['public', 'seller', 'buyer', 'admin'];

export function ThemeSwitcher({ showAreaTabs = true }: { showAreaTabs?: boolean }) {
  const { theme, colorMode, setTheme, toggleColorMode } = useTheme();

  return (
    <div className={styles.switcher} role="group" aria-label="Theme controls">
      {showAreaTabs &&
        THEMES.map((item) => {
          const active = theme === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setTheme(item)}
              aria-pressed={active}
              className={`${styles.pill} ${active ? styles.pillActive : ''}`}
              title={`${THEME_META[item].label} theme — cursor: ${THEME_META[item].cursorHint}`}
            >
              {THEME_META[item].label}
            </button>
          );
        })}

      <button
        type="button"
        onClick={toggleColorMode}
        className={styles.modeBtn}
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      >
        {colorMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </div>
  );
}
