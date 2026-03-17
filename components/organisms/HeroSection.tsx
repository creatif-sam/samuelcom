"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const heroInterests = [
  { num: "01", label: "Leadership",        href: "/leadership"      },
  { num: "02", label: "Intelligence",      href: "/intellectuality" },
  { num: "03", label: "Technology",        href: "/intellectuality" },
  { num: "04", label: "Transformation",    href: "/transformation"  },
];

// Network node positions for the GI/Leadership animation
const NODES = [
  { id: 0, cx: 120, cy: 60,  r: 5,  delay: "0s",    label: "Vision" },
  { id: 1, cx: 200, cy: 130, r: 7,  delay: "0.3s",  label: "Lead" },
  { id: 2, cx: 80,  cy: 160, r: 4,  delay: "0.6s",  label: "Data" },
  { id: 3, cx: 160, cy: 220, r: 6,  delay: "0.9s",  label: "Group" },
  { id: 4, cx: 270, cy: 90,  r: 5,  delay: "1.2s",  label: "Intel" },
  { id: 5, cx: 250, cy: 200, r: 8,  delay: "0.15s", label: "Purpose" },
  { id: 6, cx: 60,  cy: 80,  r: 3,  delay: "0.45s", label: "Action" },
  { id: 7, cx: 310, cy: 160, r: 4,  delay: "0.75s", label: "Grow" },
  { id: 8, cx: 140, cy: 290, r: 5,  delay: "1.05s", label: "Impact" },
  { id: 9, cx: 220, cy: 310, r: 3,  delay: "1.35s", label: "Learn" },
];

const EDGES = [
  [0, 1], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6],
  [3, 5], [3, 8], [4, 5], [4, 7], [5, 7], [5, 9],
  [7, 9], [8, 9], [1, 4], [0, 6], [3, 9],
];

export function HeroSection() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const handleMove = (e: MouseEvent) => {
      raf = requestAnimationFrame(() => {
        if (!photoRef.current) return;
        const { innerWidth: w, innerHeight: h } = window;
        const dx = (e.clientX / w - 0.5) * 12;
        const dy = (e.clientY / h - 0.5) * 8;
        photoRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => { window.removeEventListener("mousemove", handleMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="hero" className="hero-section hero-v2">
      {/* ── background rings ── */}
      <svg className="hero-rings-bg" aria-hidden="true" viewBox="0 0 800 800">
        <circle cx="400" cy="400" r="340" />
        <circle cx="400" cy="400" r="260" />
        <circle cx="400" cy="400" r="180" />
        <polygon points="400,80 700,540 100,540" />
        <polygon points="400,720 100,260 700,260" />
      </svg>

      {/* ── left panel: text ── */}
      <div className="hero-left-v2">
        <p className="hero-eyebrow-v2">Leader · Group Intelligence Facilitator · Thinker · Transformation Contributor</p>
        <h1 className="hero-name-v2">
          <span className="hn-first">Samuel</span>
          <span className="hn-last">Gyasi</span>
        </h1>
        <div className="hero-divider-v2" />
        <p className="hero-tagline-v2">
          &ldquo;Grounded in Practice.<br />Refined by Purpose.<br />Rising to Transform.&rdquo;
        </p>
        <div className="hero-cta-row">
          <a href="#about" className="hero-btn-primary">Explore</a>
          <a href="#connect" className="hero-btn-ghost">Connect</a>
        </div>
      </div>

      {/* ── centre: photo ── */}
      <div className="hero-photo-wrap" ref={photoRef}>
        <div className="hero-photo-glow" />
        <div className="hero-photo-frame">
          <Image
            src="/photo-hero.png"
            alt="Samuel Kobina Gyasi"
            fill
            priority
            sizes="(max-width:768px) 260px, 380px"
            className="hero-photo-img"
          />
        </div>
        <Link href="/group-intelligence-facilitator" className="hero-photo-badge" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <span className="hpb-line">Group Intelligence Facilitator</span>
          <span className="hpb-sub"></span>
        </Link>
      </div>

      {/* ── right panel: interests + GI network animation ── */}
      <div className="hero-right-v2">
        <div className="hero-interests-label">Principal Interests</div>
        <ul className="pillar-list-v2">
          {heroInterests.map((p) => (
            <li key={p.num}>
              <Link href={p.href} className="pillar-link">
                <span className="pillar-num-v2">{p.num}</span>
                <span className="pillar-label">{p.label}</span>
                <span className="pillar-arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Group Intelligence / Leadership Network Animation ── */}
        <div className="hero-gi-network" aria-hidden="true">
          <svg
            viewBox="0 0 360 340"
            className="hero-gi-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Edges */}
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={NODES[a].cx} y1={NODES[a].cy}
                x2={NODES[b].cx} y2={NODES[b].cy}
                className="gi-edge"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
            {/* Pulse rings */}
            {NODES.filter((_, i) => i % 3 === 0).map((n) => (
              <circle
                key={`pulse-${n.id}`}
                cx={n.cx} cy={n.cy} r={n.r + 4}
                className="gi-pulse-ring"
                style={{ animationDelay: n.delay }}
              />
            ))}
            {/* Nodes */}
            {NODES.map((n) => (
              <circle
                key={n.id}
                cx={n.cx} cy={n.cy} r={n.r}
                className="gi-node"
                style={{ animationDelay: n.delay }}
              />
            ))}
            {/* Labels for larger nodes */}
            {NODES.filter((n) => n.r >= 6).map((n) => (
              <text
                key={`lbl-${n.id}`}
                x={n.cx} y={n.cy + n.r + 11}
                className="gi-label"
                style={{ animationDelay: n.delay }}
              >
                {n.label}
              </text>
            ))}
            {/* Travelling signal dots */}
            {[0, 1, 2].map((i) => (
              <circle key={`sig-${i}`} r="2.5" className={`gi-signal gi-signal-${i}`} />
            ))}
          </svg>
          <div className="hero-gi-caption">
            <span className="hero-gi-caption-dot" />
            Collective Intelligence Network
          </div>
        </div>

        <div className="hero-scroll-v2">
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
