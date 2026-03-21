"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samuel-k-gyasi/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/samuel_gsi?igsh=MWswMzRycjk1dXZ0cw==",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/samuel.kobinagyasi/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@samuel_gsi?_r=1&_t=ZS-94iqxzPNKqm",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.17 8.17 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { href: "/",                label: "Home"           },
  { href: "/my-story",        label: "About Us"       },
  { href: "/blog",            label: "Resources"      },
  { href: "/#connect",        label: "Contact"        },
];

const legalLinks = [
  { href: "/privacy-policy",          label: "Privacy Policy"  },
  { href: "/privacy-policy#cookies",  label: "Cookie Policy"   },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase(), interests: [] });
      if (error && error.code === "23505") {
        setStatus("success");
        setMessage("You're already subscribed!");
      } else if (error) {
        throw error;
      } else {
        setStatus("success");
        setMessage("Successfully subscribed!");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <footer className="sf-footer">
      {/* ── NEWSLETTER SECTION ── */}
      <div className="sf-newsletter-container">
        <div className="sf-nl-wrapper">
          <div className="sf-nl-content">
            <h3 className="sf-nl-heading">Subscribe to our newsletter</h3>
            <p className="sf-nl-sub">Get the latest insights on leadership, intelligence, and transformation.</p>
            <form className="sf-nl-form" onSubmit={handleSubscribe} noValidate>
              <div className="sf-nl-input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="Enter your email"
                  className="sf-nl-input"
                  disabled={status === "loading" || status === "success"}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="sf-nl-btn"
                  disabled={status === "loading" || status === "success"}
                >
                  {status === "loading" ? "..." : status === "success" ? "✓ Done" : "Get started"}
                </button>
              </div>
              {message && (
                <p className={`sf-nl-msg ${status === "error" ? "sf-nl-msg--error" : ""}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
          <div className="sf-nl-avatars">
            <div className="sf-avatar"></div>
            <div className="sf-avatar"></div>
            <div className="sf-avatar"></div>
            <div className="sf-avatar-more">+12</div>
          </div>
        </div>

        {/* ── FEATURE CARD ── */}
        <div className="sf-feature-card">
          <div className="sf-feature-content">
            <h4 className="sf-feature-heading">Experience transformational growth</h4>
            <p className="sf-feature-text">Join leaders worldwide in unlocking collective intelligence.</p>
            <Link href="/#connect" className="sf-feature-btn">Get in touch →</Link>
          </div>
          <div className="sf-feature-graphic">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="rgba(74,222,128,0.2)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="60" stroke="rgba(74,222,128,0.3)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="40" stroke="rgba(74,222,128,0.4)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="5" fill="rgba(74,222,128,0.8)"/>
              <circle cx="140" cy="80" r="3" fill="rgba(74,222,128,0.6)"/>
              <circle cx="60" cy="120" r="3" fill="rgba(74,222,128,0.6)"/>
              <circle cx="100" cy="40" r="3" fill="rgba(74,222,128,0.6)"/>
              <circle cx="100" cy="160" r="3" fill="rgba(74,222,128,0.6)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── FOOTER LINKS ── */}
      <div className="sf-main">
        <div className="sf-brand">
          <div className="sf-brand-logo">Samuel Kobina Gyasi</div>
          <p className="sf-brand-tagline">Refined by Purpose. Rising to Transform.</p>
        </div>

        <div className="sf-links-grid">
          <div className="sf-links-col">
            <h5 className="sf-links-label">Quick links</h5>
            <ul className="sf-links-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="sf-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sf-links-col">
            <h5 className="sf-links-label">Social</h5>
            <ul className="sf-links-list">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="sf-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sf-links-col">
            <h5 className="sf-links-label">Legal</h5>
            <ul className="sf-links-list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="sf-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── FOOTER BOTTOM ── */}
      <div className="sf-bottom">
        <div className="sf-bottom-left">
          <p className="sf-address">Ghana · United States</p>
          <a href="mailto:impact@samuelgyasi.com" className="sf-email">impact@samuelgyasi.com</a>
        </div>
        <p className="sf-copyright" suppressHydrationWarning>
          © {new Date().getFullYear()} Samuel Kobina Gyasi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

