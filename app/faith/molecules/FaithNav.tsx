// molecules/FaithNav.tsx — fixed navigation bar for the faith page
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LangToggle } from "../atoms/LangToggle";
import type { Lang } from "../translations";
import { faithTranslations as t } from "../translations";

interface FaithNavProps {
  lang: Lang;
  onToggleLang: () => void;
}

const NAV_LINKS = [
  { href: "/faith/blog",        label: "Blog"          },
  { href: "/faith/ebooks",      label: "Ebooks"        },
  { href: "/credo",             label: "Credo"         },
  { href: "/faith/discipleship",label: "Discipleship"  },
];

export function FaithNav({ lang, onToggleLang }: FaithNavProps) {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className="nav-back">{t.nav.back[lang]}</Link>
      <div className="nav-logo">{t.nav.logo[lang]}</div>
      <div className="nav-links">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link${pathname === href ? " nav-link--active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <LangToggle lang={lang} onToggle={onToggleLang} />
        <div className="nav-tag">{t.nav.tag[lang]}</div>
      </div>
    </nav>
  );
}
