// atoms/LangToggle.tsx — EN / FR bilingual switcher
"use client";
import React from "react";
import type { Lang } from "../translations";

interface LangToggleProps {
  lang: Lang;
  onToggle: () => void;
}

export function LangToggle({ lang, onToggle }: LangToggleProps) {
  return (
    <button
      className="fdp-lang-toggle"
      onClick={onToggle}
      aria-label={lang === "en" ? "Passer en français" : "Switch to English"}
      title={lang === "en" ? "Français" : "English"}
    >
      <span className={lang === "en" ? "active" : ""}>EN</span>
      <span className="sep">|</span>
      <span className={lang === "fr" ? "active" : ""}>FR</span>
    </button>
  );
}
