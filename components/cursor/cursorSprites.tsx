import React from 'react';
import { AreaTheme } from '@/lib/theme/palettes';

export type CursorSpriteKind =
  | 'bottle-cap-lime'
  | 'bottle-cap-pink'
  | 'soda-can'
  | 'crushed-can'
  | 'pet-bottle'
  | 'leaf'
  | 'tyre'
  | 'cardboard-box'
  | 'folded-carton'
  | 'mason-jar'
  | 'circuit-board'
  | 'admin-tag';

export const THEME_SPRITE_SETS: Record<AreaTheme, CursorSpriteKind[]> = {
  public: [
    'bottle-cap-lime',
    'pet-bottle',
    'soda-can',
    'leaf',
    'tyre',
    'circuit-board',
  ],
  seller: [
    'bottle-cap-lime',
    'pet-bottle',
    'crushed-can',
    'bottle-cap-pink',
    'soda-can',
    'pet-bottle',
  ],
  buyer: [
    'cardboard-box',
    'tyre',
    'mason-jar',
    'folded-carton',
    'tyre',
    'mason-jar',
  ],
  admin: [
    'admin-tag',
    'circuit-board',
    'admin-tag',
    'admin-tag',
    'circuit-board',
  ],
};

export function CursorSprite({
  kind,
  size = 20,
}: {
  kind: CursorSpriteKind;
  size?: number;
}) {
  switch (kind) {
    case 'bottle-cap-lime':
    case 'bottle-cap-pink': {
      const fill = kind === 'bottle-cap-pink' ? '#FF4F9A' : '#B7E36B';
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <path
            d="M14 2L16.5 4.2L19.8 3.4L20.9 6.6L24.2 7.4L23.7 10.7L26.2 12.9L24.2 15.6L25.4 18.8L22.3 20.2L21.9 23.6L18.5 23.5L16.7 26.3L14 24.5L11.3 26.3L9.5 23.5L6.1 23.6L5.7 20.2L2.6 18.8L3.8 15.6L1.8 12.9L4.3 10.7L3.8 7.4L7.1 6.6L8.2 3.4L11.5 4.2Z"
            fill={fill}
            stroke="#1B2A26"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle
            cx="14"
            cy="14"
            r="6.2"
            fill="none"
            stroke="#1B2A26"
            strokeWidth="1.6"
          />
        </svg>
      );
    }

    case 'soda-can':
    case 'crushed-can': {
      const accent = kind === 'crushed-can' ? '#FFD23F' : '#FF4F9A';
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <rect
            x="7"
            y="4"
            width="14"
            height="20"
            rx="3.5"
            fill={accent}
            stroke="#1B2A26"
            strokeWidth="1.8"
          />
          <line x1="7" y1="8.5" x2="21" y2="8.5" stroke="#1B2A26" strokeWidth="1.5" />
          <line x1="7" y1="19.5" x2="21" y2="19.5" stroke="#1B2A26" strokeWidth="1.5" />
          <path
            d="M11 14H17"
            stroke="#1B2A26"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    case 'pet-bottle':
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <rect
            x="11.5"
            y="2.5"
            width="5"
            height="3"
            rx="1"
            fill="#FF4F9A"
            stroke="#1B2A26"
            strokeWidth="1.5"
          />
          <path
            d="M10.5 6H17.5L19.5 10V23.5C19.5 24.6 18.6 25.5 17.5 25.5H10.5C9.4 25.5 8.5 24.6 8.5 23.5V10L10.5 6Z"
            fill="#3D7BFF"
            fillOpacity="0.85"
            stroke="#1B2A26"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <rect
            x="8.5"
            y="12.5"
            width="11"
            height="5.5"
            fill="#B7E36B"
            stroke="#1B2A26"
            strokeWidth="1.4"
          />
        </svg>
      );

    case 'leaf':
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <path
            d="M23 5C14 5 7 10.5 7 19.5C7 20.8 7.3 22 7.8 23C16.5 23 23 17 23 5Z"
            fill="#B7E36B"
            stroke="#1B2A26"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M5 25L18 11"
            stroke="#123D33"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'tyre':
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <circle
            cx="14"
            cy="14"
            r="10.5"
            fill="#1B2A26"
            stroke="#F7F7F4"
            strokeWidth="1.4"
          />
          <circle
            cx="14"
            cy="14"
            r="4.5"
            fill="#FFD23F"
            stroke="#1B2A26"
            strokeWidth="1.5"
          />
          <circle cx="14" cy="14" r="1.5" fill="#1B2A26" />
        </svg>
      );

    case 'cardboard-box':
    case 'folded-carton':
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <path
            d="M4 9L14 4L24 9V19L14 24L4 19V9Z"
            fill="#C8A26B"
            stroke="#1B2A26"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M4 9L14 14L24 9M14 14V24"
            stroke="#1B2A26"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'mason-jar':
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <rect
            x="9"
            y="3"
            width="10"
            height="3.5"
            rx="1"
            fill="#C8A26B"
            stroke="#1B2A26"
            strokeWidth="1.5"
          />
          <rect
            x="7"
            y="7"
            width="14"
            height="17.5"
            rx="3.5"
            fill="#E3F2FD"
            stroke="#1B2A26"
            strokeWidth="1.8"
          />
          <path
            d="M10.5 11.5V19.5"
            stroke="#3D7BFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'circuit-board':
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="20"
            height="20"
            rx="3"
            fill="#123D33"
            stroke="#B7E36B"
            strokeWidth="1.6"
          />
          <rect x="10" y="10" width="8" height="8" rx="1" fill="#FFD23F" />
          <path
            d="M8 4V9M20 4V9M8 19V24M20 19V24M4 14H9M19 14H24"
            stroke="#B7E36B"
            strokeWidth="1.4"
          />
        </svg>
      );

    case 'admin-tag':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
          <rect
            x="5"
            y="5"
            width="18"
            height="18"
            rx="5"
            fill="#242C2A"
            stroke="#B7E36B"
            strokeWidth="1.6"
          />
          <circle cx="14" cy="14" r="3" fill="#3D7BFF" />
        </svg>
      );
  }
}
