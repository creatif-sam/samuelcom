// molecules/FaithJourney.tsx — spiritual journey section
"use client";
import React from "react";
import { FaithSectionLabel } from "../atoms/FaithSectionLabel";
import { faithTranslations as t } from "../translations";
import type { Lang } from "../translations";

export function FaithJourney({ lang }: { lang: Lang }) {
  const j = t.journey;
  return (
    <section id="journey" className="section">
      <FaithSectionLabel text={j.label[lang]} />
      <div className="journey-layout">
        <div className="journey-left">
          <h2 className="journey-headline">
            {j.headline[lang]}<br />
            <em>{j.headlineEm[lang]}</em>
          </h2>
          <p className="journey-desc">{j.desc[lang]}</p>
        </div>
        <div className="journey-right">
          {j.entries.map((entry) => (
            <div className="journey-entry" key={entry.title.en}>
              <div className="je-title">{entry.title[lang]}</div>
              <div className="je-body">{entry.body[lang]}</div>
              <div className="je-verse">{entry.verse[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
