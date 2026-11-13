"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { socialLinks } from "@/components/molecules/socialLinks";

const navLinks = [
  { href: "/",           label: "Home"      },
  { href: "/my-story",   label: "My Story"  },
  { href: "/blog",       label: "Blog"      },
  { href: "/#what-i-do", label: "What I Do" },
  { href: "/contact",    label: "Contact"   },
];

export function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Section links (/#...) are never "current"; blog posts keep Blog highlighted
  const isActive = (href: string) =>
    !href.includes("#") && (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`) || (href === "/blog" && pathname.includes("/blog")));

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

  // Move focus into the drawer when it opens, back to the burger when it closes; Esc closes it
  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      drawerCloseRef.current?.focus();
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onKey);
      wasOpen.current = true;
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) {
      burgerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav className={`portfolio-nav ${scrolled ? "nav-scrolled" : ""}`}>

        {/* Left: logo */}
        <Link href="/" className="nav-logo" onClick={close}>
          <Image
            src="/logo-mark.png"
            alt=""
            width={256}
            height={241}
            priority
            className="nav-logo-mark"
          />
          <span className="nav-logo-text">Samuel.</span>
        </Link>

        {/* Center: desktop links */}
        <ul className="nav-links nav-desktop">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Right: CTA button + hamburger */}
        <div className="nav-right">
          <span className="nav-desktop">
            <ThemeSwitcher />
          </span>
          <a
            href="https://wa.me/212684893821"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn nav-desktop"
          >
            Contact Me
          </a>
          <button
            ref={burgerRef}
            className={`nav-burger ${open ? "nav-burger--open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* inert while closed, so its links cannot be reached with Tab or by screen readers */}
      <div
        className={`nav-drawer ${open ? "nav-drawer--open" : ""}`}
        inert={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        {/* Close button inside drawer */}
        <button
          ref={drawerCloseRef}
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
                <Link href={l.href} onClick={close} aria-current={isActive(l.href) ? "page" : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nd-bottom">
            <span className="nd-name">Samuel Kobina Gyasi</span>
            <a href="mailto:impact@samuelgyasi.com" className="nd-email">impact@samuelgyasi.com</a>
            <ThemeSwitcher />
            <div className="nd-social-row">
              {socialLinks.filter((s) => s.label !== "WhatsApp").map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label} className="nd-social-link">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="nav-backdrop" onClick={close} aria-hidden />}
    </>
  );
}

