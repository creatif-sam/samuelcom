"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    letter: "E",
    word: "Execution",
    number: "01",
    body:
      "An idea only matters once it is carried out. I turn plans into measurable results and finish what I start.",
  },
  {
    letter: "E",
    word: "Efficiency",
    number: "02",
    body:
      "I treat time, energy, and attention as limited. I plan carefully, cut waste, and put effort where it has the most effect.",
  },
  {
    letter: "E",
    word: "Excellence",
    number: "03",
    body:
      "Mediocrity is never an option for me. Excellence is not a ceiling to reach but a standard I believe we should embody: in thought, in craft, in character, and in service.",
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
          <p className="values-sub">The principles behind how I work.</p>
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
