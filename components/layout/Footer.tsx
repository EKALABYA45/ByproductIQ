import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h2 className="display-md">ByproductIQ</h2>
            <p className={styles.tagline}>
              Every byproduct has a possibility. Discover. Create. Evaluate.
            </p>
          </div>

          <div>
            <p className={styles.heading}>Explore</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/#how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/#material-library">Material Library</Link>
              </li>
              <li>
                <Link href="/#examples">Trash to Treasure</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.heading}>Access</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/login/seller">Login as Seller</Link>
              </li>
              <li>
                <Link href="/login/buyer">Login as Buyer</Link>
              </li>
              <li>
                <Link href="/register">Create account</Link>
              </li>
              <li>
                <a href="mailto:hello@byproductiq.local">
                  hello@byproductiq.local
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.disclaimer}>
          <span>
            AI ideas are suggestions, not guarantees. Verify safety, quality
            and legal requirements before making or selling.
          </span>
          <span>ByproductIQ &bull; Built for transparent circular reuse</span>
        </div>
      </div>
    </footer>
  );
}
