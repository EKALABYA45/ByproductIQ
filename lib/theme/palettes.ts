export type AreaTheme = 'public' | 'seller' | 'buyer' | 'admin';
export type ColorMode = 'light' | 'dark';

export interface ThemePalette {
  '--bg': string;
  '--surface': string;
  '--surface-alt': string;
  '--ink': string;
  '--ink-muted': string;
  '--accent': string;
  '--accent-ink': string;
  '--accent-strong': string;
  '--accent-strong-ink': string;
  '--accent-pop': string;
  '--accent-warm': string;
  '--accent-craft': string;
  '--accent-blue': string;
  '--border': string;
}

export const THEME_PALETTES: Record<AreaTheme, Record<ColorMode, ThemePalette>> = {
  public: {
    light: {
      '--bg': '#F7F7F4',
      '--surface': '#FFFFFF',
      '--surface-alt': '#E9F1DA',
      '--ink': '#1B2A26',
      '--ink-muted': '#3E524B',
      '--accent': '#B7E36B',
      '--accent-ink': '#123D33',
      '--accent-strong': '#123D33',
      '--accent-strong-ink': '#F7F7F4',
      '--accent-pop': '#FF4F9A',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#1B2A26',
    },
    dark: {
      '--bg': '#0D211C',
      '--surface': '#123D33',
      '--surface-alt': '#194D40',
      '--ink': '#F7F7F4',
      '--ink-muted': '#C8D9D3',
      '--accent': '#B7E36B',
      '--accent-ink': '#123D33',
      '--accent-strong': '#B7E36B',
      '--accent-strong-ink': '#123D33',
      '--accent-pop': '#FF4F9A',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#B7E36B',
    },
  },
  seller: {
    light: {
      '--bg': '#EEF6DE',
      '--surface': '#FFFFFF',
      '--surface-alt': '#DFF0BE',
      '--ink': '#123D33',
      '--ink-muted': '#2D5247',
      '--accent': '#B7E36B',
      '--accent-ink': '#123D33',
      '--accent-strong': '#123D33',
      '--accent-strong-ink': '#F7F7F4',
      '--accent-pop': '#FF4F9A',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#123D33',
    },
    dark: {
      '--bg': '#0A261F',
      '--surface': '#123D33',
      '--surface-alt': '#1A4E41',
      '--ink': '#F7F7F4',
      '--ink-muted': '#CEE3B5',
      '--accent': '#B7E36B',
      '--accent-ink': '#123D33',
      '--accent-strong': '#B7E36B',
      '--accent-strong-ink': '#123D33',
      '--accent-pop': '#FF4F9A',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#B7E36B',
    },
  },
  buyer: {
    light: {
      '--bg': '#FAF4EA',
      '--surface': '#FFFFFF',
      '--surface-alt': '#EFE1CA',
      '--ink': '#1B2A26',
      '--ink-muted': '#4E4333',
      '--accent': '#C8A26B',
      '--accent-ink': '#1B2A26',
      '--accent-strong': '#3D7BFF',
      '--accent-strong-ink': '#0B1628',
      '--accent-pop': '#FFD23F',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#1B2A26',
    },
    dark: {
      '--bg': '#1E1913',
      '--surface': '#2A2219',
      '--surface-alt': '#382D21',
      '--ink': '#F7F7F4',
      '--ink-muted': '#DFCDB3',
      '--accent': '#C8A26B',
      '--accent-ink': '#1B2A26',
      '--accent-strong': '#3D7BFF',
      '--accent-strong-ink': '#0B1628',
      '--accent-pop': '#FFD23F',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#C8A26B',
    },
  },
  admin: {
    light: {
      '--bg': '#121615',
      '--surface': '#1B211F',
      '--surface-alt': '#242C2A',
      '--ink': '#F7F7F4',
      '--ink-muted': '#AABAB5',
      '--accent': '#B7E36B',
      '--accent-ink': '#123D33',
      '--accent-strong': '#3D7BFF',
      '--accent-strong-ink': '#0B1628',
      '--accent-pop': '#FF4F9A',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#4C5C57',
    },
    dark: {
      '--bg': '#121615',
      '--surface': '#1B211F',
      '--surface-alt': '#242C2A',
      '--ink': '#F7F7F4',
      '--ink-muted': '#AABAB5',
      '--accent': '#B7E36B',
      '--accent-ink': '#123D33',
      '--accent-strong': '#3D7BFF',
      '--accent-strong-ink': '#0B1628',
      '--accent-pop': '#FF4F9A',
      '--accent-warm': '#FFD23F',
      '--accent-craft': '#C8A26B',
      '--accent-blue': '#3D7BFF',
      '--border': '#4C5C57',
    },
  },
};

export const THEME_META: Record<
  AreaTheme,
  { label: string; badge: string; cursorHint: string }
> = {
  public: {
    label: 'Public',
    badge: 'RE-USE',
    cursorHint: 'Mixed recycled objects',
  },
  seller: {
    label: 'Seller',
    badge: 'UPCYCLE',
    cursorHint: 'Bottle caps, bottles & cans',
  },
  buyer: {
    label: 'Buyer',
    badge: 'MAKE IT',
    cursorHint: 'Boxes, tyres & jars',
  },
  admin: {
    label: 'Admin',
    badge: 'MODS',
    cursorHint: 'Neutral dark workspace',
  },
};
