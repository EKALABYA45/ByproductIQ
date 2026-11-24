'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldAlert,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  AUDIENCE_BENTO,
  BUYER_STEPS,
  FAQ_ITEMS,
  MATERIAL_LIBRARY_PREVIEW,
  SELLER_STEPS,
} from '@/lib/data/landingContent';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { TrashToTreasureSection } from './TrashToTreasureSection';
import { ParallaxPhotoWall } from './ParallaxPhotoWall';
import styles from './LandingSections.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function LandingSections() {
  const { reducedMotion } = useSmoothScroll();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const stickers = Array.from(
      document.querySelectorAll<HTMLElement>('.velocity-sticker, .sticker')
    );
    if (stickers.length === 0) return;

    const rotSetters = stickers.map((el, idx) => ({
      el,
      base: idx % 2 === 0 ? -2 : 2,
      to: gsap.quickTo(el, 'rotation', { duration: 0.4, ease: 'power3.out' }),
    }));

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const vel = Math.max(-18, Math.min(18, self.getVelocity() / 160));
        rotSetters.forEach((item, idx) => {
          item.to(item.base + vel * (idx % 2 === 0 ? 1 : -0.8));
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef}>
      {/* 4. THE PROBLEM */}
      <section className={`container ${styles.section}`}>
        <div className={styles.problemGrid}>
          <div className={styles.cardTaped}>
            <span className="sticker sticker--pink">THE PROBLEM</span>
            <h2 className="display-lg">
              Good material piles up because nobody knows what fits it—or who
              wants it.
            </h2>
            <p className="body-lg" style={{ color: 'var(--ink-muted)' }}>
              Workshops, households, and factories sit on clean offcuts, cartons,
              tyres, shells, and jars. Meanwhile makers and small producers
              struggle to find consistent local feedstock and realistic ways to
              evaluate whether turning it into a product even makes sense.
            </p>
          </div>

          <div className={styles.card}>
            <span className="eyebrow">Your trash is someone&apos;s treasure</span>
            <h3 className="display-md">Two blind spots we remove</h3>
            <ul className={styles.checkList}>
              <li>
                <XCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Sellers guess in the dark:</strong> throwing clean
                  byproducts away because discovering viable reuse ideas and real
                  local buyers takes too much effort.
                </span>
              </li>
              <li>
                <XCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Buyers lack feasibility clarity:</strong> finding raw
                  material batches without knowing yield, tools, hazards, or
                  break-even units.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. WHAT BYPRODUCTIQ IS & WHY WE EXIST */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.headerCopy}>
              <span className="sticker">WHY WE EXIST</span>
              <h2 className="display-lg">
                What ByproductIQ is (and why we built it honestly)
              </h2>
            </div>
          </div>

          <div className={styles.whyStack}>
            <article className={styles.card}>
              <span className="eyebrow">01 / Two-sided utility</span>
              <h3 className="display-md">Connect supply with makers</h3>
              <p style={{ color: 'var(--ink-muted)' }}>
                ByproductIQ is a two-sided waste-to-product workspace. Sellers
                upload leftover or scrap materials with real quantities,
                condition notes, and asking prices. Buyers search those listings
                by city, volume, and category.
              </p>
            </article>

            <article className={styles.card}>
              <span className="eyebrow">02 / Practical AI, not hype</span>
              <h3 className="display-md">Possibilities with guardrails</h3>
              <p style={{ color: 'var(--ink-muted)' }}>
                Instead of generic chatbots, our server-side AI blends your
                material photo and notes with a curated material library to
                surface concrete product ideas, required tools, safety warnings,
                and gaps you still need to check.
              </p>
            </article>

            <article className={styles.card}>
              <span className="eyebrow">03 / Zero fabricated traction</span>
              <h3 className="display-md">No invented buyers or profits</h3>
              <p style={{ color: 'var(--ink-muted)' }}>
                We exist to make circular reuse practical and transparent.
                Matches come strictly from real database queries, financial math
                comes from deterministic code using your own assumptions, and
                hazardous items are routed to authorised recyclers.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. DISCOVER -> CREATE -> EVALUATE */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerCopy}>
            <span className="sticker sticker--yellow">CORE LOOP</span>
            <h2 className="display-lg">Discover. Create. Evaluate.</h2>
          </div>
        </div>

        <div className={styles.dceGrid}>
          <div className={styles.card}>
            <span className={styles.dceNum}>01 / DISCOVER</span>
            <h3 className="display-md">Spot hidden material value</h3>
            <p style={{ color: 'var(--ink-muted)' }}>
              Upload leftover material photos or filter available local batches
              by category, city, supply frequency, and condition.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.dceNum}>02 / CREATE</span>
            <h3 className="display-md">Explore upcycled product paths</h3>
            <p style={{ color: 'var(--ink-muted)' }}>
              Review structured AI product ideas showing difficulty, maker
              profiles, tools, quick steps, and non-negotiable safety cautions.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.dceNum}>03 / EVALUATE</span>
            <h3 className="display-md">Check real unit math first</h3>
            <p style={{ color: 'var(--ink-muted)' }}>
              Test usable fraction, yield, labour, packaging, and your selling
              price inside a deterministic break-even calculator before buying.
            </p>
          </div>
        </div>
      </section>

      {/* 7. TRASH -> TREASURE PINNED HORIZONTAL GALLERY */}
      <TrashToTreasureSection />

      {/* 8. PARALLAX UP/DOWN PHOTO WALL */}
      <ParallaxPhotoWall />

      {/* 9. HOW IT WORKS: SELLERS & BUYERS SIDE BY SIDE */}
      <section
        id="how-it-works"
        className={`${styles.section} ${styles.sectionAlt}`}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.headerCopy}>
              <span className="sticker">TWO SIDES, ONE FLOW</span>
              <h2 className="display-lg">How ByproductIQ works</h2>
            </div>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.card}>
              <span className="sticker">FOR SELLERS (5 STEPS)</span>
              <h3 className="display-md">List material &amp; meet real buyers</h3>
              <ol className={styles.stepList}>
                {SELLER_STEPS.map((s) => (
                  <li key={s.step} className={styles.stepRow}>
                    <span className={styles.stepNum}>{s.step}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p style={{ color: 'var(--ink-muted)', fontSize: '0.94rem' }}>
                        {s.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.card}>
              <span className="sticker sticker--blue">FOR BUYERS (5 STEPS)</span>
              <h3 className="display-md">Find feedstock &amp; test viability</h3>
              <ol className={styles.stepList}>
                {BUYER_STEPS.map((s) => (
                  <li key={s.step} className={styles.stepRow}>
                    <span className={styles.stepNum}>{s.step}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p style={{ color: 'var(--ink-muted)', fontSize: '0.94rem' }}>
                        {s.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHO IS IT FOR: BENTO GRID */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerCopy}>
            <span className="sticker sticker--craft">BUILT FOR MAKERS &amp; SUPPLIERS</span>
            <h2 className="display-lg">Who is ByproductIQ for?</h2>
          </div>
        </div>

        <div className={styles.bentoGrid}>
          {AUDIENCE_BENTO.map((entry) => (
            <article
              key={entry.title}
              className={`${styles.bentoItem} ${
                entry.span === 'wide' ? styles.bentoWide : ''
              }`}
            >
              <span className="sticker">{entry.badge}</span>
              <h3 className="display-md">{entry.title}</h3>
              <p style={{ color: 'var(--ink-muted)' }}>{entry.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 11. MATERIAL LIBRARY PREVIEW */}
      <section
        id="material-library"
        className={`${styles.section} ${styles.sectionAlt}`}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.headerCopy}>
              <span className="sticker sticker--yellow">MATERIAL LIBRARY</span>
              <h2 className="display-lg">
                Preview 8 curated byproduct profiles
              </h2>
              <p style={{ color: 'var(--ink-muted)' }}>
                Each record pairs common secondary materials with indicative
                product routes and hazard checks.
              </p>
            </div>
            <Link href="/materials" className="btn btn--primary">
              View all materials
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.libraryGrid}>
            {MATERIAL_LIBRARY_PREVIEW.map((mat) => (
              <article key={mat.slug} className={styles.libraryCard}>
                <span className="eyebrow">{mat.category}</span>
                <h3 className="display-md" style={{ fontSize: '1.25rem' }}>
                  {mat.name}
                </h3>
                <ul className={styles.ideaBullets}>
                  {mat.sampleIdeas.map((idea) => (
                    <li key={idea}>{idea}</li>
                  ))}
                </ul>
                <span className={styles.evidenceTag}>
                  Hazard: {mat.hazardLevel}
                </span>
                <span className={styles.evidenceTag}>{mat.evidenceLabel}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. AI EXPLAINED */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerCopy}>
            <span className="sticker sticker--pink">AI SUGGESTS, YOU CONFIRM</span>
            <h2 className="display-lg">What our AI does &mdash; and never does</h2>
          </div>
        </div>

        <div className={styles.aiPanel}>
          <div>
            <h3 className="display-md" style={{ marginBottom: '1rem' }}>
              What AI does
            </h3>
            <ul className={styles.checkList}>
              <li>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  Suggests 5&ndash;8 structured product concepts grounded in your
                  listing details and our Material Library.
                </span>
              </li>
              <li>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  Lists tools, preparation steps, limitations, and follow-up
                  questions you should verify.
                </span>
              </li>
              <li>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  Flags hazardous streams (e-waste, used wire, batteries, oils)
                  for authorised recycler handover instead of DIY steps.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="display-md" style={{ marginBottom: '1rem' }}>
              What AI NEVER does
            </h3>
            <ul className={styles.checkList}>
              <li>
                <XCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  Never invents registered buyers, phone numbers, companies, or
                  fake market statistics.
                </span>
              </li>
              <li>
                <XCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  Never sets material prices, computes unit profits, or claims
                  guaranteed returns.
                </span>
              </li>
              <li>
                <XCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  Never replaces physical material inspection, safety testing, or
                  legal compliance checks.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 13. TRUST & HONESTY PANEL */}
      <section className="container" style={{ paddingBottom: '4rem' }}>
        <div className={styles.trustPanel}>
          <div>
            <span className="sticker sticker--yellow" style={{ marginBottom: '1rem' }}>
              HONESTY RULES
            </span>
            <h2 className="display-lg" style={{ marginBottom: '0.75rem' }}>
              Transparent by design. Zero fake traction.
            </h2>
            <p className="body-lg">
              Verify safety, quality and legal requirements before making or
              selling. Demo entries always carry a Sample data badge, buyer
              matches come strictly from database rows, and all financial
              projections require your own explicit assumptions.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div
              style={{
                padding: '1rem 1.2rem',
                borderRadius: '16px',
                border: '2px solid currentColor',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <ShieldAlert size={24} style={{ flexShrink: 0 }} />
              <strong>Indicative, not a lab test or certification.</strong>
            </div>
            <div
              style={{
                padding: '1rem 1.2rem',
                borderRadius: '16px',
                border: '2px solid currentColor',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <Sparkles size={24} style={{ flexShrink: 0 }} />
              <strong>Deterministic buyer matching &amp; server math.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ ACCORDION */}
      <section id="faq" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.headerCopy}>
              <span className="sticker">FAQ</span>
              <h2 className="display-lg">Questions people actually ask</h2>
            </div>
          </div>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqButton}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className={styles.faqAnswer}>{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15. FINAL CTA BAND */}
      <section className={`container ${styles.section}`}>
        <div className={styles.finalCta}>
          <span className="sticker sticker--yellow">READY TO START?</span>
          <h2 className="display-lg">
            Turn accumulating byproducts into real circular conversations.
          </h2>
          <p className="body-lg" style={{ maxWidth: '54ch' }}>
            Choose your workspace role to list leftover materials or evaluate
            available streams with AI ideas and transparent break-even math.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/login/seller" className="btn btn--strong">
              I have waste to sell
              <ArrowRight size={18} />
            </Link>
            <Link href="/login/buyer" className="btn btn--ghost">
              I want to make/buy
              <Sparkles size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
