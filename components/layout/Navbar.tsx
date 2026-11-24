'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Recycle,
  X,
} from 'lucide-react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Material Library', href: '/#material-library' },
  { label: 'Examples', href: '/#examples' },
  { label: 'FAQ', href: '/#faq' },
];

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLoginOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLoginOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      scrollTo(href.slice(1));
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="ByproductIQ Home">
          <span className={styles.logoMark}>
            <Recycle size={20} strokeWidth={2.4} />
          </span>
          <span>ByproductIQ</span>
          <span className={styles.brandBadge}>NO WASTE</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={(e) => handleAnchor(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeSwitcher showAreaTabs={false} />

          <div className={styles.loginWrap} ref={dropdownRef}>
            <button
              type="button"
              className="btn btn--primary"
              aria-expanded={loginOpen}
              aria-haspopup="menu"
              onClick={() => setLoginOpen((prev) => !prev)}
            >
              Login
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {loginOpen && (
                <motion.div
                  className={styles.dropdown}
                  role="menu"
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                >
                  <span className={styles.dropdownLabel}>Sign in as</span>
                  <Link
                    href="/login/seller"
                    role="menuitem"
                    className={styles.dropdownLink}
                    onClick={() => setLoginOpen(false)}
                  >
                    <span>Login as Seller</span>
                    <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href="/login/buyer"
                    role="menuitem"
                    className={styles.dropdownLink}
                    onClick={() => setLoginOpen(false)}
                  >
                    <span>Login as Buyer</span>
                    <ArrowUpRight size={16} />
                  </Link>

                  <div className={styles.divider} />
                  <span className={styles.dropdownLabel}>New here?</span>
                  <Link
                    href="/register?role=seller"
                    role="menuitem"
                    className={styles.dropdownLink}
                    onClick={() => setLoginOpen(false)}
                  >
                    <span>Register as Seller</span>
                    <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href="/register?role=buyer"
                    role="menuitem"
                    className={styles.dropdownLink}
                    onClick={() => setLoginOpen(false)}
                  >
                    <span>Register as Buyer</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: '-6%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-6%' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div>
              <div className={styles.mobileTop}>
                <span className={styles.brand}>
                  <span className={styles.logoMark}>
                    <Recycle size={20} strokeWidth={2.4} />
                  </span>
                  <span>ByproductIQ</span>
                </span>
                <button
                  type="button"
                  className={styles.menuBtn}
                  aria-label="Close navigation menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className={styles.mobileLinks}>
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileLink}
                    onClick={(e) => handleAnchor(e, item.href)}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.mobileAuth}>
              <Link
                href="/login/seller"
                className="btn btn--primary"
                onClick={() => setMobileOpen(false)}
              >
                Login as Seller
              </Link>
              <Link
                href="/login/buyer"
                className="btn btn--strong"
                onClick={() => setMobileOpen(false)}
              >
                Login as Buyer
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
