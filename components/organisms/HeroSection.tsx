"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="phx-hero">
      <div className="phx-container">

        {/* ── Left: text content ── */}
        <div className="phx-left">
          <div className="phx-tag">Hello There!</div>

          <h1 className="phx-heading">
            I&apos;m <em>Samuel Gyasi,</em><br />
            Leader &amp; Group<br />
            Intelligence Facilitator<br />
            Based in Africa.
          </h1>

          <p className="phx-desc">
            I&apos;m a dedicated leader with experience in technology, collective
            intelligence, and transformative change — collaborating with organisations
            and communities across Africa and beyond.
          </p>

          <div className="phx-btns">
            <Link href="/my-story" className="phx-btn-primary">
              My Story <span className="phx-btn-icon">▶</span>
            </Link>
            <Link href="/#connect" className="phx-btn-ghost">
              Let&apos;s Connect
            </Link>
          </div>
        </div>

        {/* ── Right: photo ── */}
        <div className="phx-right">
          <div className="phx-photo-wrap">
            <div className="phx-blob" aria-hidden="true" />
            <Image
              src="/photo-hero.png"
              alt="Samuel Kobina Gyasi"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 48vw"
              className="phx-photo-img"
              style={{ objectFit: "contain", objectPosition: "center bottom" }}
            />
            <span className="phx-badge phx-badge--1">Group Intelligence Faci.</span>
            <span className="phx-badge phx-badge--2">Junior Program Officer</span>
          </div>
        </div>

      </div>
    </section>
  );
}
