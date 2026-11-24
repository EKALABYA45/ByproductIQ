'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AlertTriangle, Recycle } from 'lucide-react';
import { ProductExample } from '@/lib/data/landingContent';
import { ShaderImageHover } from '@/components/three/ShaderImageHover';
import styles from './ProductExampleCard.module.scss';

function buildBlurPlaceholder(c1: string, c2: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='24'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/></linearGradient></defs><rect width='32' height='24' fill='url(%23g)'/></svg>`;
  return `data:image/svg+xml;base64,${typeof window === 'undefined' ? Buffer.from(svg).toString('base64') : window.btoa(svg)}`;
}

export function ProductExampleCard({ item }: { item: ProductExample }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap} data-cursor="view">
        <ShaderImageHover colors={item.gradient}>
          {!imgError ? (
            <Image
              src={`/products/${item.slug}.jpg`}
              alt={`${item.title} made from ${item.sourceMaterial}`}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 30vw"
              placeholder="blur"
              blurDataURL={buildBlurPlaceholder(item.gradient[0], item.gradient[1])}
              className={styles.image}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={styles.fallback}
              style={{
                background: `linear-gradient(135deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`,
              }}
            >
              <span className={styles.fallbackSlug}>/products/{item.slug}</span>
              <div className={styles.fallbackIconWrap}>
                <Recycle size={28} />
              </div>
              <span className={styles.fallbackTitle}>{item.title}</span>
            </div>
          )}
        </ShaderImageHover>

        <div className={styles.badgeOverlay}>
          {item.isDemo && <span className={styles.demoBadge}>Sample data</span>}
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.source}>From: {item.sourceMaterial}</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.caption}>{item.caption}</p>

        {item.safetyNote && (
          <div className={styles.safetyBox} role="note">
            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{item.safetyNote}</span>
          </div>
        )}

        <span className={styles.ideaTag}>Idea, not a guarantee</span>
      </div>
    </article>
  );
}
