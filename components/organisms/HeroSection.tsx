"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="phx-hero">
      <div className="phx-meta-row">
        <p className="phx-meta phx-meta-left">
          An experienced<br />Group Intelligence<br />Facilitator
        </p>
        <p className="phx-meta phx-meta-right">
          Working with<br />leaders and teams<br />across Africa
        </p>
      </div>

      <div className="phx-frag-grid">
        <h1 className="phx-frag phx-frag-1">I am</h1>
        <h1 className="phx-frag phx-frag-2">Samuel.</h1>

        <div className="phx-frag-photo">
          <svg
            className="phx-network"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <g className="phx-network-edges">
              <line x1="60" y1="80" x2="180" y2="40" style={{ animationDelay: "0s" }} />
              <line x1="180" y1="40" x2="320" y2="90" style={{ animationDelay: "0.15s" }} />
              <line x1="60" y1="80" x2="40" y2="220" style={{ animationDelay: "0.3s" }} />
              <line x1="180" y1="40" x2="200" y2="180" style={{ animationDelay: "0.45s" }} />
              <line x1="320" y1="90" x2="200" y2="180" style={{ animationDelay: "0.6s" }} />
              <line x1="320" y1="90" x2="350" y2="230" style={{ animationDelay: "0.75s" }} />
              <line x1="40" y1="220" x2="200" y2="180" style={{ animationDelay: "0.9s" }} />
              <line x1="40" y1="220" x2="90" y2="340" style={{ animationDelay: "1.05s" }} />
              <line x1="200" y1="180" x2="350" y2="230" style={{ animationDelay: "1.2s" }} />
              <line x1="200" y1="180" x2="250" y2="320" style={{ animationDelay: "1.35s" }} />
              <line x1="350" y1="230" x2="250" y2="320" style={{ animationDelay: "1.5s" }} />
              <line x1="90" y1="340" x2="250" y2="320" style={{ animationDelay: "1.65s" }} />
              <line x1="90" y1="340" x2="180" y2="420" style={{ animationDelay: "1.8s" }} />
              <line x1="250" y1="320" x2="180" y2="420" style={{ animationDelay: "1.95s" }} />
              <line x1="250" y1="320" x2="340" y2="400" style={{ animationDelay: "2.1s" }} />
              <line x1="180" y1="420" x2="340" y2="400" style={{ animationDelay: "2.25s" }} />
            </g>
            <g className="phx-network-nodes">
              <circle cx="60" cy="80" r="5" style={{ animationDelay: "0s" }} />
              <circle cx="180" cy="40" r="6" style={{ animationDelay: "0.3s" }} />
              <circle cx="320" cy="90" r="4" style={{ animationDelay: "0.6s" }} />
              <circle cx="40" cy="220" r="5" style={{ animationDelay: "0.9s" }} />
              <circle cx="200" cy="180" r="7" style={{ animationDelay: "1.2s" }} />
              <circle cx="350" cy="230" r="5" style={{ animationDelay: "1.5s" }} />
              <circle cx="90" cy="340" r="4" style={{ animationDelay: "1.8s" }} />
              <circle cx="250" cy="320" r="6" style={{ animationDelay: "2.1s" }} />
              <circle cx="180" cy="420" r="5" style={{ animationDelay: "2.4s" }} />
              <circle cx="340" cy="400" r="4" style={{ animationDelay: "2.7s" }} />
            </g>
          </svg>
          <Image
            src="/photo-hero.png"
            alt="Samuel Kobina Gyasi"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
            className="phx-photo-img"
            style={{ objectFit: "contain", objectPosition: "center bottom" }}
          />
        </div>

        <h1 className="phx-frag phx-frag-3">I help you</h1>
        <h1 className="phx-frag phx-frag-4">facilitate your</h1>

        <h1 className="phx-frag phx-frag-5">group intelligence.</h1>
      </div>

      <div className="phx-hero-rule" aria-hidden="true" />

      <div className="phx-bottom-row">
        <p className="phx-desc">
          I&apos;m a dedicated leader with experience in technology, collective
          intelligence, and transformative change — collaborating with
          organisations and communities across Africa and beyond.
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
    </section>
  );
}
