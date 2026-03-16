// molecules/FaithBeliefs.tsx — core convictions section
"use client";
import React from "react";
import { FaithSectionLabel } from "../atoms/FaithSectionLabel";
import { faithTranslations as t } from "../translations";
import type { Lang } from "../translations";

export function FaithBeliefs({ lang }: { lang: Lang }) {
  const b = t.beliefs;
  return (
    <section id="beliefs" className="section">
      <FaithSectionLabel text={b.label[lang]} />
      <div className="beliefs-grid">
        {b.cards.map((card) => (
          <div className="belief-card" key={card.num}>
            <div className="bc-number">{card.num}</div>
            <div className="bc-title">{card.title[lang]}</div>
            <div className="bc-body">{card.body[lang]}</div>
            <div className="bc-verse">{card.verse[lang]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
