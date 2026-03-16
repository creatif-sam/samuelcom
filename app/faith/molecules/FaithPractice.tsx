// molecules/FaithPractice.tsx — pillars of practice section
"use client";
import React from "react";
import { FaithSectionLabel } from "../atoms/FaithSectionLabel";
import { faithTranslations as t } from "../translations";
import type { Lang } from "../translations";

export function FaithPractice({ lang }: { lang: Lang }) {
  const p = t.practice;
  return (
    <section id="practice" className="section">
      <FaithSectionLabel text={p.label[lang]} />
      <div className="practice-row">
        {p.items.map((item) => (
          <div className="pr-item" key={item.num}>
            <div className="pr-num">{item.num}</div>
            <div className="pr-name">{item.name[lang]}</div>
            <div className="pr-desc">{item.desc[lang]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
