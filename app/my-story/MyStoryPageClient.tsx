"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import styles from "./my-story.module.css";
import { chapters, nowCards } from "./_my-story-data";

export default function MyStoryPageClient() {
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const age = useMemo(() => {
    const now = new Date();
    const hasBdayPassed =
      now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() >= 22);
    return now.getFullYear() - 1999 - (hasBdayPassed ? 0 : 1);
  }, []);

  // IntersectionObserver — uses data-attribute so CSS module hashing doesn't interfere
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.setAttribute("data-visible", "true");
        }),
      { threshold: 0.1 }
    );
    chapterRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Back-to-top visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.msp}>

        {/* -- HERO -- */}
        <section className={styles.mspHero}>
          <Image
            src="/my-story/6.png"
            alt="Samuel Kobina Gyasi"
            fill
            priority
            sizes="100vw"
            className={styles.mspHeroBg}
          />
          <div className={styles.mspHeroGradient} />
          <div className={styles.mspHeroContent}>
            <p className={styles.mspHeroEyebrow}>
              Samuel Kobina Gyasi | Born 22 June 1999 | Mpohor, Ghana
            </p>
            <h1 className={styles.mspHeroHeadline}>
              My<br />Story
            </h1>
            <div className={styles.mspHeroRule} />
            <p className={styles.mspHeroSub}>
              A thinker. The second of three brothers. A first taste of leadership at ten.
              An excellent scholar. A Program Officer. An elder. A mentor.
              A life shaped, chapter by chapter.
            </p>
            {/* Changed from <div> to <a> for correct semantics */}
            <a
              href="#chapters"
              className={styles.mspHeroScroll}
              aria-label="Scroll down to explore the story"
            >
              Scroll to explore
            </a>
          </div>
        </section>

        {/* -- INTRO STRIP -- */}
        <div className={styles.mspIntro}>
          <p className={styles.mspIntroQuote}>
            A life worth living is one<br />
            <em>shared in service to others.</em>
          </p>
          <div className={styles.mspIntroStats}>
            <div className={styles.mspIntroStat}>
              <div className={styles.mspIntroStatVal}>{age}</div>
              <div className={styles.mspIntroStatLabel}>Years of Life</div>
            </div>
            <div className={styles.mspIntroStat}>
              <div className={styles.mspIntroStatVal}>3</div>
              <div className={styles.mspIntroStatLabel}>Countries</div>
            </div>
            <div className={styles.mspIntroStat}>
              <div className={styles.mspIntroStatVal}>16+</div>
              <div className={styles.mspIntroStatLabel}>Years of Leadership</div>
            </div>
          </div>
        </div>

        {/* -- CHAPTERS -- */}
        <div id="chapters" className={styles.mspChapters}>
          {chapters.map((ch, i) => {
            const chapterClass = `${styles.mspChapter} ${
              ch.imageSide === "right"
                ? styles.mspChapterRight
                : styles.mspChapterLeft
            }`;

            const mediaCol = (
              <div className={styles.mspChMedia}>
                {/* aria-hidden on purely decorative corners */}
                <div
                  className={`${styles.mspChCorner} ${styles.mspChCornerTl}`}
                  aria-hidden="true"
                />
                <div
                  className={`${styles.mspChCorner} ${styles.mspChCornerBr}`}
                  aria-hidden="true"
                />
                <div className={styles.mspChImgWrap}>
                  <Image
                    src={ch.image}
                    alt={ch.imageAlt}
                    fill
                    sizes="(max-width:900px) 100vw, 48vw"
                  />
                </div>
              </div>
            );

            const textCol = (
              <div className={styles.mspChText}>
                <div className={styles.mspChTag}>{ch.tag}</div>
                <div className={styles.mspChYear}>{ch.year}</div>
                <h2 className={styles.mspChTitle}>{ch.title}</h2>
                <div className={styles.mspChBody}>
                  {ch.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
                {ch.quote && (
                  <blockquote className={styles.mspChQuote}>
                    &ldquo;{ch.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            );

            return (
              <div
                key={ch.year}
                ref={(el) => { chapterRefs.current[i] = el; }}
                className={chapterClass}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/*
                  DOM order matches visual order to fix screen-reader inconsistency:
                  "left" chapters render media first, "right" chapters render text first.
                */}
                {ch.imageSide === "left" ? (
                  <>{mediaCol}{textCol}</>
                ) : (
                  <>{textCol}{mediaCol}</>
                )}
              </div>
            );
          })}
        </div>

        {/* -- NOW SECTION -- */}
        <section className={styles.mspNow}>
          <div className={styles.mspNowInner}>
            <p className={styles.mspNowEyebrow}>The Present Chapter</p>
            <h2 className={styles.mspNowHeading}>What I Do Now</h2>
            <div className={styles.mspNowGrid}>
              {nowCards.map((card) => (
                <div key={card.num} className={styles.mspNowCard}>
                  <div className={styles.mspNowCardImg}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width:900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.mspNowCardBody}>
                    <div className={styles.mspNowCardNum}>{card.num}</div>
                    <div className={styles.mspNowCardTitle}>{card.title}</div>
                    <div className={styles.mspNowCardOrg}>{card.org}</div>
                    <p className={styles.mspNowCardText}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- CTA -- */}
        <section className={styles.mspCta}>
          <p className={styles.mspCtaLabel}>Let&apos;s Connect</p>
          <h2 className={styles.mspCtaHeading}>
            Ready to Build<br />
            <em>Something Together?</em>
          </h2>
          <p className={styles.mspCtaSub}>
            Whether you&apos;re seeking collaboration, mentorship, or meaningful
            conversation — Samuel is open to connection.
          </p>
          <div className={styles.mspCtaBtns}>
            <Link href="/#connect" className={styles.mspCtaBtnPrimary}>
              Get in Touch →
            </Link>
            <Link href="/blog" className={styles.mspCtaBtnGhost}>
              Read the Blog
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />

      {/* -- BACK TO TOP -- */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${styles.backToTop}${showBackToTop ? " " + styles.backToTopVisible : ""}`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
