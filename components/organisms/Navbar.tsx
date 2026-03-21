"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navLinks = [
  { href: "/my-story",  label: "My Story", external: false },
  { href: "/blog",      label: "Blog",     external: false },
  { href: "/#what-i-do",label: "What I Do",external: false },
  { href: "/#vision",   label: "Vision",   external: false },
  { href: "/#connect",  label: "Connect",  external: false },
  { href: "/credo",     label: "Credo",    external: false },
];

export function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav className={`portfolio-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a href="/" className="nav-logo" onClick={close}>SKG</a>

        {/* Desktop links */}
        <ul className="nav-links nav-desktop">
          {navLinks.map((l) => (
            <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
          ))}
        </ul>

        {/* Theme toggle (desktop) */}
        <ThemeSwitcher />

        {/* Hamburger */}
        <button
          className={`nav-burger ${open ? "nav-burger--open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`nav-drawer ${open ? "nav-drawer--open" : ""}`} aria-hidden={!open}>
        {/* Close button inside drawer */}
        <button
          className="nav-drawer-close"
          aria-label="Close menu"
          onClick={close}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="nav-drawer-inner">
          {/* Section links */}
          <ul className="nd-links">
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                <Link href={l.href} onClick={close}>{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nd-bottom">
            <span className="nd-name">Samuel Kobina Gyasi</span>
            <a href="mailto:impact@samuelgyasi.com" className="nd-email">impact@samuelgyasi.com</a>
            <ThemeSwitcher />
            <div className="nd-social-row">
              <a href="https://www.linkedin.com/in/samuel-k-gyasi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="nd-social-link">in</a>
              <a href="https://www.instagram.com/samuel_gsi?igsh=MWswMzRycjk1dXZ0cw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="nd-social-link">ig</a>
              <a href="https://web.facebook.com/samuel.kobinagyasi/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="nd-social-link">fb</a>
              <a href="https://www.tiktok.com/@samuel_gsi?_r=1&_t=ZS-94iqxzPNKqm" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="nd-social-link">tt</a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="nav-backdrop" onClick={close} aria-hidden />}
    </>
  );
}

