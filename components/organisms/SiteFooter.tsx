"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/components/molecules/socialLinks";

const quickLinks = [
  { href: "/",                label: "Home"           },
  { href: "/my-story",        label: "My Story"       },
  { href: "/blog",            label: "Blog"           },
  { href: "/contact",         label: "Contact"        },
];

const legalLinks = [
  { href: "/privacy-policy",          label: "Privacy Policy"  },
  { href: "/privacy-policy#cookies",  label: "Cookie Policy"   },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedAtRef = useRef(Date.now());

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          company,
          startedAt: startedAtRef.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setStatus("success");
      setMessage(data.alreadySubscribed ? "You're already subscribed!" : "Successfully subscribed!");
      setEmail("");
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
            <h3 className="sf-nl-heading">Subscribe to my newsletter</h3>
            <p className="sf-nl-sub">Get my latest insights and thinking on leadership, intelligence, and transformation.</p>
            <form className="sf-nl-form" onSubmit={handleSubscribe} noValidate>
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
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
          </div>
        </div>

        {/* ── FEATURE CARD ── */}
        <div className="sf-feature-card">
          <div className="sf-feature-content">
            <h4 className="sf-feature-heading">Experience transformational growth</h4>
            <p className="sf-feature-text">Join young African leaders in unlocking collective intelligence with your teams.</p>
            <Link href="/contact" className="sf-feature-btn">Get in touch →</Link>
          </div>
          <div className="sf-feature-graphic">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="rgba(124,143,252,0.2)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="60" stroke="rgba(124,143,252,0.3)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="40" stroke="rgba(124,143,252,0.4)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="5" fill="rgba(124,143,252,0.8)"/>
              <circle cx="140" cy="80" r="3" fill="rgba(124,143,252,0.6)"/>
              <circle cx="60" cy="120" r="3" fill="rgba(124,143,252,0.6)"/>
              <circle cx="100" cy="40" r="3" fill="rgba(124,143,252,0.6)"/>
              <circle cx="100" cy="160" r="3" fill="rgba(124,143,252,0.6)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── FOOTER LINKS ── */}
      <div className="sf-main">
        <div className="sf-brand">
          <Image
            src="/logo-full.png"
            alt="Samuel Kobina Gyasi"
            width={468}
            height={480}
            className="sf-brand-logo-img"
          />
          <p className="sf-brand-tagline">Refined by Purpose. Working to Transform.</p>
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
              {socialLinks.filter((link) => link.label !== "WhatsApp").map((link) => (
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
          <p className="sf-address">Ghana · Morocco</p>
          <a href="mailto:impact@samuelgyasi.com" className="sf-email">impact@samuelgyasi.com</a>
        </div>
        <p className="sf-copyright" suppressHydrationWarning>
          © {new Date().getFullYear()} Samuel Kobina Gyasi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

