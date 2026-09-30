import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const quickLinks = [
  { href: "/my-story",        label: "My Story"        },
  { href: "/leadership",      label: "Leadership"      },
  { href: "/intellectuality", label: "Intellectuality" },
  { href: "/transformation",  label: "Transformation"  },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="nf-page">
        <div className="nf-container">
          <div className="nf-left">
            <div className="phx-tag">Error 404</div>
            <h1 className="nf-heading">
              This page has <em>lost its connection.</em>
            </h1>
            <p className="nf-desc">
              The link may be broken, or the page may have moved. Everything else is
              still connected, so let&apos;s get you back on track.
            </p>

            <div className="phx-btns">
              <Link href="/" className="phx-btn-primary">
                Back to Home <span className="phx-btn-icon">▶</span>
              </Link>
              <Link href="/blog" className="phx-btn-ghost">
                Read the Blog
              </Link>
            </div>

            <nav className="nf-links" aria-label="Popular pages">
              <span className="nf-links-label">Or explore</span>
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href} className="nf-link">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="nf-right" aria-hidden="true">
            <div className="nf-code">404</div>
            <svg className="nf-network" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet">
              <g className="nf-edges">
                <line x1="60"  y1="70"  x2="170" y2="40"  />
                <line x1="170" y1="40"  x2="190" y2="160" />
                <line x1="60"  y1="70"  x2="50"  y2="200" />
                <line x1="50"  y1="200" x2="190" y2="160" />
                <line x1="190" y1="160" x2="140" y2="280" />
                <line x1="50"  y1="200" x2="140" y2="280" />
                {/* The broken link: dashed edge towards the drifting node */}
                <line x1="190" y1="160" x2="290" y2="110" className="nf-edge-broken" />
              </g>
              <g className="nf-nodes">
                <circle cx="60"  cy="70"  r="6" />
                <circle cx="170" cy="40"  r="7" />
                <circle cx="190" cy="160" r="9" />
                <circle cx="50"  cy="200" r="6" />
                <circle cx="140" cy="280" r="7" />
              </g>
              <circle cx="330" cy="90" r="8" className="nf-node-lost" />
            </svg>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
