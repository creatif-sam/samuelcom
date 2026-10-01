"use client";

import { useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";
import { ConnectSection } from "@/components/organisms/ConnectSection";
import { TestimonialsClient } from "@/components/organisms/TestimonialsClient";

const css = `
/* ── DESIGN TOKENS (scoped) ── */
.idp {
  --ink:    #0a0a0a;
  --paper:  #f5f3ef;
  --paper2: #e8e4de;
  --mid:    #7a746a;
  --faint:  #d4cfc5;
  --red:    #546cfa;
  --line:   rgba(10,10,10,.1);
  min-height: 100vh;
  position: relative;
}

/* ── BODY OVERRIDES ── */
body.on-idp {
  background: #f5f3ef;
  color: #0a0a0a;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
}
body.on-idp .cursor {
  background: #0a0a0a;
  border-radius: 0;
  mix-blend-mode: difference;
  width: 12px;
  height: 12px;
}
body.on-idp .cursor-ring {
  border-color: #0a0a0a;
  border-radius: 0;
  mix-blend-mode: difference;
  width: 40px;
  height: 40px;
}

/* ── GRID OVERLAY ── */
.idp-grid-overlay {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none; z-index: 0; opacity: .35;
}

/* ── NAV ── */


/* ── HERO ── */
.idp #hero {
  min-height: 100vh; padding: 100px 56px 80px;
  display: grid; grid-template-rows: 1fr auto;
  position: relative; overflow: hidden;
  background: var(--ink);
}
.data-lines {
  position: absolute; inset: 0; pointer-events: none; overflow: hidden;
}
.dl {
  position: absolute; top: 0; width: 1px; height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(245,243,239,.06) 30%, rgba(245,243,239,.06) 70%, transparent);
  animation: idp-dl-move var(--dur,4s) var(--delay,0s) ease-in-out infinite alternate;
}
@keyframes idp-dl-move {
  from { transform: scaleY(.4) translateY(-20%); opacity: .3; }
  to   { transform: scaleY(1) translateY(0);     opacity: .7; }
}
.hero-ghost {
  position: absolute; bottom: -20px; right: -20px;
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 800;
  font-size: clamp(120px,18vw,220px);
  color: transparent; -webkit-text-stroke: 1px rgba(245,243,239,.06);
  line-height: 1; pointer-events: none; user-select: none; letter-spacing: -.01em;}
.idp .hero-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; justify-content: flex-end;
}
.idp .hero-tag {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .35em; text-transform: uppercase;
  color: var(--red); margin-bottom: 28px;
  opacity: 0; animation: idp-appear .7s .2s ease forwards;
  display: flex; align-items: center; gap: 14px;
}
.idp .hero-tag::before { content: ''; width: 32px; height: 1px; background: var(--red); }
.idp .hero-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 800;
  font-size: clamp(60px,10vw,140px);
  line-height: .88; color: var(--paper);
  opacity: 0; animation: idp-appear .7s .35s ease forwards; letter-spacing: -.01em;}
.idp .hero-title .accent { color: var(--red); }
.idp .hero-def {
  margin-top: 36px; display: grid; grid-template-columns: auto 1fr;
  gap: 24px; align-items: start;
  opacity: 0; animation: idp-appear .7s .55s ease forwards; max-width: 720px;
}
.idp .def-label {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .25em; color: var(--mid); text-transform: uppercase;
  padding-top: 4px; white-space: nowrap;
}
.idp .def-text {
  font-size: clamp(17px,1.8vw,22px); line-height: 1.6;
  color: rgba(245,243,239,.7); font-style: italic; font-weight: 300;
}
.idp .hero-metrics {
  margin-top: 60px; display: flex; gap: 0;
  border: 1px solid rgba(245,243,239,.08);
  opacity: 0; animation: idp-appear .7s .75s ease forwards;
}
.idp .hm-item {
  flex: 1; padding: 28px 32px;
  border-right: 1px solid rgba(245,243,239,.08);
}
.idp .hm-item:last-child { border-right: none; }
.idp .hm-val {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 800;
  font-size: 42px; color: var(--paper); line-height: 1; letter-spacing: -.01em;}
.idp .hm-val span { color: var(--red); font-size: .6em; }
.idp .hm-key {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .22em; text-transform: uppercase; color: var(--mid); margin-top: 6px;
}
@keyframes idp-appear {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

/* ── SECTION BASE ── */
.idp .section { padding: 100px 56px; position: relative; z-index: 1; }
.idp .s-header {
  display: grid; grid-template-columns: 1fr auto;
  align-items: end; margin-bottom: 64px;
  padding-bottom: 20px; border-bottom: 1px solid var(--line);
}
.idp .s-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 800;
  font-size: clamp(32px,4vw,56px); color: var(--ink); line-height: 1; letter-spacing: -.01em;}
.idp .s-title em { font-family: var(--font-poppins), 'Poppins', sans-serif; font-style: italic; font-weight: 300; }
.idp .s-num {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .2em; color: var(--mid); text-transform: uppercase;
}

/* ── DOMAINS OF THOUGHT ── */
.idp #domains { background: var(--paper); }
.idp .domains-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: var(--faint);
}
.idp .domain-card {
  background: var(--paper); padding: 48px 40px;
  position: relative; overflow: hidden;
  opacity: 0; transform: translateY(20px);
  transition: opacity .7s ease, transform .7s ease, background .3s; cursor: none;
}
.idp .domain-card.visible { opacity: 1; transform: none; }
.idp .domain-card:hover { background: var(--ink); }
.idp .domain-card:hover .dc-title,
.idp .domain-card:hover .dc-body,
.idp .domain-card:hover .dc-tags span { color: var(--paper); border-color: rgba(245,243,239,.2); }
.idp .domain-card:hover .dc-num { -webkit-text-stroke-color: rgba(245,243,239,.08); }
.idp .domain-card:hover .dc-bar { background: var(--red); }
.idp .dc-num {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 800;
  font-size: 80px; line-height: 1;
  color: transparent; -webkit-text-stroke: 1px var(--faint); margin-bottom: 8px;
  transition: -webkit-text-stroke-color .3s; letter-spacing: -.01em;}
.idp .dc-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 700;
  font-size: 22px; color: var(--ink); transition: color .3s; letter-spacing: -.01em;}
.idp .dc-body {
  font-size: 15px; line-height: 1.7; color: var(--mid);
  margin-top: 12px; font-weight: 300; font-style: italic; transition: color .3s;
}
.idp .dc-tags { margin-top: 20px; display: flex; flex-wrap: wrap; gap: 6px; }
.idp .dc-tags span {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .15em; text-transform: uppercase;
  color: var(--mid); border: 1px solid var(--faint);
  padding: 3px 10px; transition: color .3s, border-color .3s;
}
.idp .dc-bar {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 2px; background: var(--faint);
  transform: scaleX(0); transform-origin: left;
  transition: transform .5s ease, background .3s;
}
.idp .domain-card:hover .dc-bar { transform: scaleX(1); }

/* ── RESEARCH & WORK ── */
.idp #research { background: var(--paper2); }
.idp .research-list { display: flex; flex-direction: column; gap: 1px; }
.idp .res-row {
  display: grid; grid-template-columns: 160px 1fr auto;
  align-items: start; gap: 0;
  background: var(--paper); border: 1px solid var(--line); overflow: hidden;
  opacity: 0; transform: translateX(-16px);
  transition: opacity .7s ease, transform .7s ease, background .3s, border-color .3s; cursor: none;
}
.idp .res-row.visible { opacity: 1; transform: none; }
.idp .res-row:hover { background: var(--ink); border-color: var(--ink); }
.idp .res-row:hover .res-period, .idp .res-row:hover .res-title,
.idp .res-row:hover .res-org, .idp .res-row:hover .res-desc { color: var(--paper); }
.idp .res-row:hover .res-period { color: var(--red); }
.idp .res-row:hover .res-type { color: var(--red); border-color: rgba(245,243,239,.15); }
.idp .res-period {
  padding: 32px 28px; font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .15em; text-transform: uppercase; color: var(--mid);
  line-height: 1.6; border-right: 1px solid var(--line); transition: color .3s;
}
.idp .res-body { padding: 32px 40px; }
.idp .res-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 700;
  font-size: 20px; color: var(--ink); transition: color .3s; letter-spacing: -.01em;}
.idp .res-org { font-size: 14px; font-style: italic; color: var(--mid); margin-top: 4px; transition: color .3s; }
.idp .res-desc { font-size: 14px; line-height: 1.65; color: var(--mid); margin-top: 12px; font-weight: 300; transition: color .3s; }
.idp .res-bullets { margin-top: 10px; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.idp .res-bullets li {
  font-size: 13px; color: var(--mid); display: flex; gap: 10px;
  align-items: flex-start; line-height: 1.6; transition: color .3s;
}
.idp .res-bullets li::before { content: '→'; color: var(--red); flex-shrink: 0; }
.idp .res-row:hover .res-bullets li { color: rgba(245,243,239,.6); }
.idp .res-type {
  padding: 32px 28px; font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .15em; text-transform: uppercase; color: var(--mid);
  border-left: 1px solid var(--line); white-space: nowrap;
  writing-mode: vertical-rl; text-orientation: mixed; transition: color .3s, border-color .3s;
}

/* ── TECHNICAL ARSENAL ── */
.idp #arsenal { background: var(--paper); }
.idp .arsenal-layout {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--faint);
}
.idp .arsenal-group {
  background: var(--paper); padding: 48px 44px;
  opacity: 0; transform: translateY(20px); transition: opacity .7s ease, transform .7s ease;
}
.idp .arsenal-group.visible { opacity: 1; transform: none; }
.idp .ag-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .28em; text-transform: uppercase; color: var(--red);
  margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid var(--line);
}
.idp .skill-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 0; border-bottom: 1px solid var(--line);
}
.idp .skill-item:last-child { border-bottom: none; }
.idp .sk-name { font-size: 16px; color: var(--ink); font-weight: 400; }
.idp .sk-track { display: flex; gap: 4px; align-items: center; }
.idp .sk-dot { width: 8px; height: 8px; border-radius: 0; background: var(--faint); transition: background .3s; }
.idp .sk-dot.filled { background: var(--ink); }
.idp .sk-dot.accent  { background: var(--red); }

/* ── MANIFESTO ── */
.idp #manifesto { background: var(--ink); padding: 120px 56px; }
.idp .manifesto-inner { max-width: 900px; margin: 0 auto; }
.idp .manifesto-label {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .3em; text-transform: uppercase; color: var(--red);
  margin-bottom: 48px; display: flex; align-items: center; gap: 16px;
  opacity: 0; transform: translateY(16px); transition: opacity .7s, transform .7s;
}
.idp .manifesto-label.visible { opacity: 1; transform: none; }
.idp .manifesto-label::before { content: ''; width: 36px; height: 1px; background: var(--red); }
.idp .manifesto-lines { display: flex; flex-direction: column; gap: 2px; }
.idp .mf-line {
  display: grid; grid-template-columns: 60px 1fr;
  gap: 20px; align-items: baseline;
  opacity: 0; transform: translateX(-20px);
  transition: opacity .6s ease, transform .6s ease; cursor: none;
}
.idp .mf-line.visible { opacity: 1; transform: none; }
.idp .mf-n {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .15em; color: rgba(245,243,239,.2); text-align: right; padding-top: 6px;
}
.idp .mf-text {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(22px,3vw,38px); font-style: italic; font-weight: 300;
  color: rgba(245,243,239,.85); line-height: 1.25;
  padding: 18px 0; border-bottom: 1px solid rgba(245,243,239,.06); transition: color .3s;
}
.idp .mf-line:hover .mf-text { color: var(--paper); }
.idp .mf-text strong { font-style: normal; font-weight: 700; color: var(--paper); }
.idp .mf-text .r { color: var(--red); font-style: normal; }

/* ── CERTIFICATIONS ── */
.idp #certifications { background: var(--paper2); }
.idp .certs-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--faint);
}
.idp .cert-card {
  background: var(--paper); padding: 32px 36px;
  display: flex; justify-content: space-between; align-items: center; gap: 20px;
  opacity: 0; transform: translateY(12px);
  transition: opacity .6s ease, transform .6s ease, background .3s; cursor: none;
}
.idp .cert-card.visible { opacity: 1; transform: none; }
.idp .cert-card:hover { background: var(--paper2); }
.idp .cert-name {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 600;
  font-size: 16px; color: var(--ink); letter-spacing: -.01em;}
.idp .cert-issuer {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .2em; text-transform: uppercase; color: var(--red); margin-top: 5px;
}
.idp .cert-badge {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .12em; text-transform: uppercase;
  padding: 5px 12px; border: 1px solid; white-space: nowrap; flex-shrink: 0;
}
.idp .cert-badge.done { color: var(--ink); border-color: var(--ink); }
.idp .cert-badge.progress { color: var(--mid); border-color: var(--faint); }

/* ── INTERESTS ── */
.idp #interests { background: var(--paper); }
.idp .interests-layout {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1px; background: var(--faint);
}
.idp .int-card {
  background: var(--paper); padding: 40px 32px;
  position: relative; overflow: hidden;
  opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; cursor: none;
}
.idp .int-card.visible { opacity: 1; transform: none; }
.idp .int-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px; background: var(--red);
  transform: scaleX(0); transform-origin: left; transition: transform .4s ease;
}
.idp .int-card:hover::before { transform: scaleX(1); }
.idp .int-icon { font-size: 36px; margin-bottom: 16px; display: block; filter: grayscale(1); }
.idp .int-name {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 700;
  font-size: 17px; color: var(--ink); letter-spacing: -.01em;}
.idp .int-body { font-size: 14px; line-height: 1.65; color: var(--mid); margin-top: 10px; font-weight: 300; font-style: italic; }

/* ── QUOTE BREAK ── */
.idp #quote-break { background: var(--red); padding: 90px 56px; text-align: center; }
.idp .qb-inner { max-width: 800px; margin: 0 auto; }
.idp .qb-text {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(26px,3.5vw,46px); font-style: italic; font-weight: 300;
  color: var(--paper); line-height: 1.3;
}
.idp .qb-text strong { font-style: normal; font-weight: 700; }
.idp .qb-attr {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .3em; text-transform: uppercase;
  color: rgba(245,243,239,.6); margin-top: 28px;
}

/* ── CONNECT ── */


/* ── FOOTER ── */

.idp .f-name {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 700;
  font-size: 13px; color: var(--ink); letter-spacing: -.01em;}
.idp .f-copy {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .2em; color: var(--mid); text-transform: uppercase;
}
.idp .f-link {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 11px;
  letter-spacing: .2em; color: var(--red); text-decoration: none; text-transform: uppercase;
}

/* ── REVEAL ── */
.idp .reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
.idp .reveal.visible { opacity: 1; transform: none; }

/* ── BLOG STRIP ── */
.idp .blog-strip {
  background: var(--paper); padding: 80px 56px;
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
  position: relative; z-index: 1;
  border-top: 1px solid var(--line);
}
.idp .bs-eyebrow {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 9px;
  letter-spacing: .35em; text-transform: uppercase;
  color: var(--red); display: flex; align-items: center; gap: 16px;
}
.idp .bs-eyebrow::before, .idp .bs-eyebrow::after { content: ''; width: 36px; height: 1px; background: var(--red); }
.idp .bs-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(28px,4vw,52px); color: var(--ink); line-height: 1.1;
}
.idp .bs-title em { font-style: italic; color: var(--red); }
.idp .bs-sub {
  font-size: 17px; font-style: italic; font-weight: 300; color: var(--sub);
  max-width: 480px; line-height: 1.6;
}
.idp .bs-btns {
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 8px;
}
.idp .bs-btn {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 10px;
  letter-spacing: .18em; text-transform: uppercase;
  padding: 14px 32px; background: var(--red); color: #fff;
  text-decoration: none; transition: background .25s, color .25s;
}
.idp .bs-btn:hover { background: var(--ink); }
.idp .bs-btn.ghost {
  background: transparent; color: var(--red); border: 1px solid rgba(84,108,250,.4);
}
.idp .bs-btn.ghost:hover { background: var(--red); color: #fff; }

/* ── RESPONSIVE ── */
@media(max-width:900px) {
  .idp .section, .idp #hero, .idp #manifesto, .idp #quote-break { padding-left: 24px; padding-right: 24px; }
  .idp .domains-grid { grid-template-columns: 1fr; }
  .idp .res-row { grid-template-columns: 1fr; }
  .idp .res-type { writing-mode: horizontal-tb; border-left: none; border-top: 1px solid var(--line); padding: 16px 28px; }
  .idp .arsenal-layout { grid-template-columns: 1fr; }
  .idp .certs-grid { grid-template-columns: 1fr; }
  .idp .interests-layout { grid-template-columns: 1fr 1fr; }
  .idp .hero-metrics { flex-direction: column; }
  .idp .hm-item { border-right: none; border-bottom: 1px solid rgba(245,243,239,.08); }
  .idp .blog-strip { padding: 60px 24px; }
}
`;

export default function IntellectualityPageClient() {
  const datalinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("on-idp");

    // Generate animated data lines in hero
    if (datalinesRef.current) {
      for (let i = 0; i < 20; i++) {
        const d = document.createElement("div");
        d.className = "dl";
        d.style.cssText = `left:${i * 5.2}%;--dur:${3 + Math.random() * 5}s;--delay:${-Math.random() * 6}s;`;
        datalinesRef.current.appendChild(d);
      }
    }

    const all = document.querySelectorAll(
      ".idp .domain-card, .idp .res-row, .idp .arsenal-group, .idp .cert-card, .idp .int-card, .idp .mf-line, .idp .manifesto-label, .idp .reveal"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 55);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    all.forEach((el) => io.observe(el));

    function countUp(el: Element, target: number, suf = "") {
      let n = 0;
      const dur = 1600;
      const t = setInterval(() => {
        n++;
        const valEl = el.querySelector(".hm-val");
        if (valEl) valEl.innerHTML = n + (suf ? `<span>${suf}</span>` : "");
        if (n >= target) clearInterval(t);
      }, dur / target);
    }

    const hmObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll(".idp .hm-item").forEach((item) => {
              const valEl = item.querySelector(".hm-val");
              if (!valEl) return;
              const raw = valEl.textContent || "";
              const num = parseInt(raw);
              const suf = raw.includes("+") ? "+" : "";
              countUp(item, num, suf);
            });
            hmObs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    const firstMetric = document.querySelector(".idp .hero-metrics");
    if (firstMetric) hmObs.observe(firstMetric);

    return () => {
      document.body.classList.remove("on-idp");
      io.disconnect();
      hmObs.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Navbar />
      <div className="idp">
        <div className="idp-grid-overlay" />


        {/* HERO */}
        <section id="hero">
          <div className="data-lines" ref={datalinesRef} />
          <div className="hero-ghost">MIND</div>
          <div className="hero-content">
            <div className="hero-tag">Intellectual Profile · Research · Technology</div>
            <h1 className="hero-title">
              Intellec<span className="accent">-</span><br />tuality
            </h1>
            <div className="hero-def">
              <div className="def-label">def.</div>
              <div className="def-text">
                The relentless pursuit of understanding — where data meets curiosity, where technology serves humanity, and where rigorous thinking becomes the engine of meaningful change.
              </div>
            </div>
            <div className="hero-metrics">
              <div className="hm-item">
                <div className="hm-val">2<span>+</span></div>
                <div className="hm-key">Degrees</div>
              </div>
              <div className="hm-item">
                <div className="hm-val">7<span>+</span></div>
                <div className="hm-key">Certifications</div>
              </div>
              <div className="hm-item">
                <div className="hm-val">4<span>+</span></div>
                <div className="hm-key">Scholarships</div>
              </div>
              <div className="hm-item">
                <div className="hm-val">3<span>+</span></div>
                <div className="hm-key">Languages / Env.</div>
              </div>
            </div>
          </div>
        </section>

        {/* DOMAINS OF THOUGHT */}
        <section id="domains" className="section">
          <div className="s-header reveal">
            <div className="s-title">Domains of <em>Thought</em></div>
            <div className="s-num">01 / 06</div>
          </div>
          <div className="domains-grid">
            <div className="domain-card">
              <div className="dc-num">01</div>
              <div className="dc-title">Collective Intelligence</div>
              <div className="dc-body">Samuel&apos;s primary academic domain — the science of how groups make decisions, aggregate knowledge, and transcend individual limitations. He studies how technology can amplify humanity&apos;s capacity to think and solve problems together.</div>
              <div className="dc-tags"><span>UM6P MSc</span><span>Decision Systems</span><span>Social Cognition</span></div>
              <div className="dc-bar" />
            </div>
            <div className="domain-card">
              <div className="dc-num">02</div>
              <div className="dc-title">Data Science &amp; Analytics</div>
              <div className="dc-body">From SARIMAX time-series forecasting on Germany&apos;s irradiation datasets to Power BI dashboards, Samuel is fluent in the language of data — reading patterns, surfacing insights, and translating numbers into decisions.</div>
              <div className="dc-tags"><span>Python</span><span>R</span><span>Jupyter</span><span>Power BI</span><span>Tableau</span></div>
              <div className="dc-bar" />
            </div>
            <div className="domain-card">
              <div className="dc-num">03</div>
              <div className="dc-title">Computer Science</div>
              <div className="dc-body">Grounded by a Professional Bachelor in Computer Science, Samuel understands the architecture beneath the surface — how software is built, how interfaces are designed, and how systems serve the humans who depend on them.</div>
              <div className="dc-tags"><span>Full Stack Dev</span><span>Front-end</span><span>Systems Thinking</span></div>
              <div className="dc-bar" />
            </div>
            <div className="domain-card">
              <div className="dc-num">04</div>
              <div className="dc-title">Research Methodology</div>
              <div className="dc-body">Beyond knowing facts, Samuel knows how to find them. Trained in research design, experimental methodology, and statistical analysis, he approaches questions with academic rigour — building evidence before drawing conclusions.</div>
              <div className="dc-tags"><span>Experimental Design</span><span>ARIMAX</span><span>SARIMA</span></div>
              <div className="dc-bar" />
            </div>
            <div className="domain-card">
              <div className="dc-num">05</div>
              <div className="dc-title">Leadership &amp; Organisations</div>
              <div className="dc-body">Intellectual curiosity is applied directly to how organisations function, how leaders think, and how systems of power can be made more just and effective. Samuel pursues an Organisational Leadership Specialisation as a complement to his technical work.</div>
              <div className="dc-tags"><span>Org. Leadership</span><span>Agile</span><span>Design Thinking</span></div>
              <div className="dc-bar" />
            </div>
            <div className="domain-card">
              <div className="dc-num">06</div>
              <div className="dc-title">Technology for Social Impact</div>
              <div className="dc-body">At the intersection of all his domains sits a single question: how can technology serve people who have been left behind? Samuel&apos;s intellectual life is ultimately oriented not toward abstraction but toward the concrete flourishing of communities.</div>
              <div className="dc-tags"><span>Social Innovation</span><span>Empowerment</span><span>Africa</span></div>
              <div className="dc-bar" />
            </div>
          </div>
        </section>

        {/* RESEARCH & FIELD WORK */}
        <section id="research" className="section">
          <div className="s-header reveal">
            <div className="s-title">Research &amp; <em>Field Work</em></div>
            <div className="s-num">02 / 06</div>
          </div>
          <div className="research-list">
            <div className="res-row">
              <div className="res-period">Jul — Sep<br />2024</div>
              <div className="res-body">
                <div className="res-title">Data Science Internship</div>
                <div className="res-org">University Mohammed VI Polytechnic, College of Computing — Benguerrir, Morocco</div>
                <ul className="res-bullets">
                  <li>Processed and analyzed Germany&apos;s weather and solar irradiation dataset using Python and Jupyter Notebook.</li>
                  <li>Applied advanced time series forecasting models: SARIMAX, ARIMAX, and SARIMA to predict weather and irradiation levels.</li>
                  <li>Collaborated with a co-intern to interpret results, refine methodologies, and support ongoing climate research initiatives.</li>
                </ul>
              </div>
              <div className="res-type">Data Science</div>
            </div>
            <div className="res-row">
              <div className="res-period">Sep — Dec<br />2022</div>
              <div className="res-body">
                <div className="res-title">Web Full Stack Developer Intern</div>
                <div className="res-org">Octobot Consulting — Fez, Morocco</div>
                <div className="res-desc">Developed and iterated on web applications using front-end frameworks and modern development practices, building user-centred digital products.</div>
              </div>
              <div className="res-type">Engineering</div>
            </div>
            <div className="res-row">
              <div className="res-period">Oct 2023 —<br />Present</div>
              <div className="res-body">
                <div className="res-title">MSc Collective Intelligence</div>
                <div className="res-org">School of Collective Intelligence, UM6P — Rabat, Morocco</div>
                <div className="res-desc">Graduate-level research into the mechanics of collective decision-making, cognitive diversity, and technology-mediated group intelligence. Serving simultaneously as Student Representative and School Ambassador.</div>
              </div>
              <div className="res-type">Academia</div>
            </div>
            <div className="res-row">
              <div className="res-period">Sep 2020 —<br />Jul 2023</div>
              <div className="res-body">
                <div className="res-title">Professional Bachelor — Computer Science</div>
                <div className="res-org">ESCA Fez (Ecole Supérieure de Management de Commerce et d&apos;Informatique) — Fez, Morocco</div>
                <div className="res-desc">Three-year programme covering software engineering, systems architecture, web development, and applied computer science. Supported by the Government of Ghana Scholarship.</div>
              </div>
              <div className="res-type">Education</div>
            </div>
          </div>
        </section>

        {/* TECHNICAL ARSENAL */}
        <section id="arsenal" className="section">
          <div className="s-header reveal">
            <div className="s-title">Technical <em>Arsenal</em></div>
            <div className="s-num">03 / 06</div>
          </div>
          <div className="arsenal-layout">
            <div className="arsenal-group">
              <div className="ag-title">Programming &amp; Data</div>
              <div className="skill-item"><span className="sk-name">Python</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">R (Statistical Analysis)</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">SARIMAX / ARIMAX / SARIMA</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Jupyter Notebook</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Power BI</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Tableau</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
            </div>
            <div className="arsenal-group">
              <div className="ag-title">Development &amp; Design</div>
              <div className="skill-item"><span className="sk-name">Web Development (Full Stack)</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Front-end Frameworks</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Graphic Design (Canva / PS)</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Design Thinking</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Agile Project Management</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Research Experimental Design</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /></div></div>
            </div>
            <div className="arsenal-group">
              <div className="ag-title">Languages</div>
              <div className="skill-item"><span className="sk-name">English</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /></div></div>
              <div className="skill-item"><span className="sk-name">French</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /><div className="sk-dot" /></div></div>
            </div>
            <div className="arsenal-group">
              <div className="ag-title">Cognitive Strengths</div>
              <div className="skill-item"><span className="sk-name">Intellectual Curiosity</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /></div></div>
              <div className="skill-item"><span className="sk-name">Detail-Oriented Analysis</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Public Communication</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot" /></div></div>
              <div className="skill-item"><span className="sk-name">Resilience &amp; Adaptability</span><div className="sk-track"><div className="sk-dot filled accent" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /><div className="sk-dot filled" /></div></div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="manifesto">
          <div className="manifesto-inner">
            <div className="manifesto-label">An Intellectual&apos;s Manifesto</div>
            <div className="manifesto-lines">
              <div className="mf-line"><div className="mf-n">01</div><div className="mf-text">I believe the <strong>mind is a gift</strong> — and gifts demand to be used, sharpened, and shared.</div></div>
              <div className="mf-line"><div className="mf-n">02</div><div className="mf-text">I believe <span className="r">data without context</span> is noise. Wisdom is knowing the difference.</div></div>
              <div className="mf-line"><div className="mf-n">03</div><div className="mf-text">I believe the pursuit of knowledge is never purely personal — it is <strong>inherently communal</strong>.</div></div>
              <div className="mf-line"><div className="mf-n">04</div><div className="mf-text">I believe technology must serve the <strong>most vulnerable</strong>, not merely reward the most privileged.</div></div>
              <div className="mf-line"><div className="mf-n">05</div><div className="mf-text">I believe <span className="r">questions are more valuable</span> than certainties — they keep us honest and moving forward.</div></div>
              <div className="mf-line"><div className="mf-n">06</div><div className="mf-text">I believe that <strong>Africa&apos;s future</strong> will be built by Africans who dared to think at the highest level.</div></div>
              <div className="mf-line"><div className="mf-n">07</div><div className="mf-text">I believe <span className="r">faith and reason</span> are not enemies — they are the two wings on which truth flies.</div></div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="section">
          <div className="s-header reveal">
            <div className="s-title">Certifications &amp; <em>Learning</em></div>
            <div className="s-num">04 / 06</div>
          </div>
          <div className="certs-grid">
            <div className="cert-card"><div className="cert-left"><div className="cert-name">Python for Data Science, AI &amp; Development</div><div className="cert-issuer">IBM</div></div><div className="cert-badge done">Completed</div></div>
            <div className="cert-card"><div className="cert-left"><div className="cert-name">Data Science Methodology</div><div className="cert-issuer">IBM</div></div><div className="cert-badge done">Completed</div></div>
            <div className="cert-card"><div className="cert-left"><div className="cert-name">Data Analysis with R</div><div className="cert-issuer">IBM</div></div><div className="cert-badge done">Completed</div></div>
            <div className="cert-card"><div className="cert-left"><div className="cert-name">Agile Project Management</div><div className="cert-issuer">HP Life</div></div><div className="cert-badge done">Completed</div></div>
            <div className="cert-card"><div className="cert-left"><div className="cert-name">Design Thinking</div><div className="cert-issuer">HP Life</div></div><div className="cert-badge done">Completed</div></div>
            <div className="cert-card"><div className="cert-left"><div className="cert-name">Google Data Analytics Specialization</div><div className="cert-issuer">Google</div></div><div className="cert-badge progress">In Progress</div></div>
            <div className="cert-card"><div className="cert-left"><div className="cert-name">Organizational Leadership Specialization</div><div className="cert-issuer">Coursera</div></div><div className="cert-badge progress">In Progress</div></div>
          </div>
        </section>

        {/* INTELLECTUAL INTERESTS */}
        <section id="interests" className="section">
          <div className="s-header reveal">
            <div className="s-title">Intellectual <em>Interests</em></div>
            <div className="s-num">05 / 06</div>
          </div>
          <div className="interests-layout">
            <div className="int-card">
              <span className="int-icon">◈</span>
              <div className="int-name">Non-Fiction Reading</div>
              <div className="int-body">Samuel reads widely across leadership, history, philosophy, and technology — treating books as a primary laboratory for thought.</div>
            </div>
            <div className="int-card">
              <span className="int-icon">◉</span>
              <div className="int-name">Leadership &amp; Politics</div>
              <div className="int-body">How power is exercised, how decisions are made at scale, and how political systems can be improved are questions Samuel studies with active curiosity.</div>
            </div>
            <div className="int-card">
              <span className="int-icon">◫</span>
              <div className="int-name">Collective Systems</div>
              <div className="int-body">From ant colonies to parliaments, Samuel is fascinated by how intelligence emerges from the interaction of many — and what that means for how we design institutions.</div>
            </div>
            <div className="int-card">
              <span className="int-icon">◬</span>
              <div className="int-name">Technology &amp; Africa</div>
              <div className="int-body">The intersection of digital innovation and African development sits at the heart of Samuel&apos;s intellectual mission — a continent to be built by its own thinkers.</div>
            </div>
          </div>
        </section>

        {/* QUOTE BREAK */}
        <section id="quote-break">
          <div className="qb-inner reveal">
            <div className="qb-text">&ldquo;Love the Lord your God with all your heart, with all your soul, and with <strong>all your mind</strong>.&rdquo;</div>
            <div className="qb-attr">Matthew 22:37 · The intellectual&apos;s calling</div>
          </div>
        </section>

        {/* BLOG STRIP */}
        <div className="blog-strip">
          <div className="bs-eyebrow">The Intellectuality Journal</div>
          <h2 className="bs-title">Writings on<br /><em>Ideas & Intellect</em></h2>
          <p className="bs-sub">Essays on data, technology, research, and the ideas that shape how we understand the world.</p>
          <div className="bs-btns">
            <Link href="/intellectuality/blog" className="bs-btn">Read the Blog →</Link>
            <Link href="/blog" className="bs-btn ghost">All Writings →</Link>
          </div>
        </div>


        {/* FOOTER */}
        <TestimonialsClient />
      </div>
      <ConnectSection />
      <Suspense fallback={null}><SiteFooter /></Suspense>
    </>
  );
}
