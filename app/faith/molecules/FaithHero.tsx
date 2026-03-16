// molecules/FaithHero.tsx — hero section with bilingual content
"use client";
import React from "react";
import { FaithMandala } from "../atoms/FaithMandala";
import { faithTranslations as t } from "../translations";
import type { Lang } from "../translations";

export function FaithHero({ lang }: { lang: Lang }) {
  const h = t.hero;
  return (
    <section id="hero">
      <FaithMandala />
      <div className="hero-text">
        <div className="hero-eyebrow">{h.eyebrow[lang]}</div>
        <h1 className="hero-title">
          <em>{h.title[lang]}</em>
        </h1>
        <p className="hero-subtitle">{h.subtitle[lang]}</p>
        <blockquote className="hero-verse">
          <p>{h.verse[lang]}</p>
          <cite>{h.verseRef[lang]}</cite>
        </blockquote>
      </div>
      <div className="hero-scroll-hint">{h.scrollHint[lang]}</div>
    </section>
  );
}
