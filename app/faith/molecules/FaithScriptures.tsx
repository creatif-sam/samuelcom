// molecules/FaithScriptures.tsx — scripture mosaic gallery
"use client";
import React from "react";
import { FaithSectionLabel } from "../atoms/FaithSectionLabel";
import { faithTranslations as t } from "../translations";
import type { Lang } from "../translations";

export function FaithScriptures({ lang }: { lang: Lang }) {
  const s = t.scriptures;
  return (
    <section id="scriptures" className="section">
      <FaithSectionLabel text={s.label[lang]} />
      <p className="scriptures-intro">{s.intro[lang]}</p>
      <div className="scripture-mosaic">
        {s.cards.map((card, i) => (
          <div
            key={i}
            className={`sm-card${card.wide ? " sm-wide" : ""}${card.tall ? " sm-tall" : ""}`}
          >
            <div className="sm-text">{card.text[lang]}</div>
            <div className="sm-ref">{card.ref}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
