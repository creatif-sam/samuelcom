import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Church, Globe, Mail, Mic, PenLine, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/components/molecules/socialLinks";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "Links",
  description:
    "All of Samuel Kobina Gyasi's links in one place: invite him to speak or facilitate, read his story and blog, and follow him on social media.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Samuel Kobina Gyasi | Links",
    description: "Invite Samuel to speak or facilitate, read his story and blog, and follow him on social media.",
    url: "/links",
  },
};

const social = (label: string) => socialLinks.find((s) => s.label === label);

const buttons = [
  { href: social("LinkedIn")?.href ?? "", label: "Connect on LinkedIn", icon: social("LinkedIn")?.icon, external: true },
  { href: social("WhatsApp")?.href ?? "", label: "Chat on WhatsApp", icon: social("WhatsApp")?.icon, external: true },
  { href: "/contact", label: "Invite me to speak or facilitate", icon: <Mic size={20} />, featured: true },
  { href: "/my-story", label: "Read my story", icon: <BookOpen size={20} /> },
  { href: "/blog", label: "Read the blog", icon: <PenLine size={20} /> },
  { href: "/", label: "Visit my website", icon: <Globe size={20} /> },
  { href: "mailto:impact@samuelgyasi.com", label: "Email me", icon: <Mail size={20} />, external: true },
  { href: "https://faith.samuelgyasi.com", label: "View my faith page", icon: <Church size={20} />, external: true },
];

export default function LinksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.profile}>
          <div className={styles.avatar}>
            <Image src="/favicon.png" alt="Samuel Kobina Gyasi" width={600} height={600} sizes="112px" priority />
          </div>
          <h1 className={styles.name}>Samuel Kobina Gyasi</h1>
          <p className={styles.tagline}>
            Leader · Group Intelligence Facilitator
            <br />
            Program Officer (JPO)
          </p>
          <p className={styles.meta}>Ghana · Morocco · English &amp; Français</p>
        </header>

        <nav className={styles.socials} aria-label="Social media">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className={styles.social}
            >
              {s.icon}
            </a>
          ))}
        </nav>

        <ul className={styles.buttons}>
          {buttons.map((b) => {
            const className = `${styles.button}${b.featured ? ` ${styles.featured}` : ""}`;
            const content = (
              <>
                <span className={styles.buttonIcon} aria-hidden="true">{b.icon}</span>
                <span className={styles.buttonLabel}>{b.label}</span>
                <ArrowUpRight size={18} className={styles.buttonArrow} aria-hidden="true" />
              </>
            );
            return (
              <li key={b.label}>
                {b.external ? (
                  <a href={b.href} target={b.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={className}>
                    {content}
                  </a>
                ) : (
                  <Link href={b.href} className={className}>{content}</Link>
                )}
              </li>
            );
          })}
        </ul>

        <footer className={styles.footer}>
          <Link href="/" className={styles.footerLink}>
            <Image src="/logo-mark.png" alt="" width={256} height={241} sizes="22px" />
            samuelgyasi.com
          </Link>
        </footer>
      </div>
    </main>
  );
}
