"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    letter: "E",
    word: "Execution",
    number: "01",
    body:
      "Ideas without action are just dreams. I convert vision into measurable outcomes — moving with precision from conception to completion, leaving nothing half-done.",
    glyph: "◎",
  },
  {
    letter: "E",
    word: "Efficiency",
    number: "02",
    body:
      "Every resource — time, energy, attention — is sacred. I operate with intentional economy, eliminating waste and maximising impact across every domain I touch.",
    glyph: "◆",
  },
  {
    letter: "E",
    word: "Excellence",
    number: "03",
    body:
      "Mediocrity is never an option. Excellence is not a ceiling to reach but a standard to embody — in thought, in craft, in character, in service.",
    glyph: "◯",
  },
];

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vs-card--visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((card) => { if (card) obs.observe(card); });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="values" className="values-section">
      <div className="values-inner">
        <header className="values-header">
          <p className="values-eyebrow">Core Values</p>
          <h2 className="values-title">My Three <em>E&apos;s</em></h2>
          <p className="values-sub">Principles that guide every endeavour, every decision, every day.</p>
        </header>

        <div className="values-grid">
          {values.map((v, i) => (
            <div
              key={v.word}
              className="vs-card"
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <span className="vs-card-bg-letter">{v.letter}</span>
              <p className="vs-card-num">{v.number}</p>
              <span className="vs-card-glyph">{v.glyph}</span>
              <h3 className="vs-card-word">{v.word}</h3>
              <p className="vs-card-body">{v.body}</p>
            </div>
          ))}
        </div>

        {/* Animated trio footer */}
        <div className="values-trio-strip">
          {values.map((v) => (
            <div key={v.word} className="vts-item">
              <span className="vts-big">{v.letter}</span>
              <span className="vts-label">{v.word}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
