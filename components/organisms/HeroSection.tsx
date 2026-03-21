"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="portfolio-hero">
      {/* Geometric background decorations */}
      <div className="ph-geo-bg" aria-hidden="true">
        <svg className="ph-geo-icon ph-geo-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
        <svg className="ph-geo-icon ph-geo-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" />
        </svg>
        <svg className="ph-geo-icon ph-geo-3" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="4" />
        </svg>
        <svg className="ph-geo-icon ph-geo-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polygon points="12,2 22,20 2,20" />
        </svg>
      </div>

      {/* Main content container */}
      <div className="ph-container">
        {/* Greeting bubble */}
        <div className="ph-greeting">
          <span>Hello!</span>
          <span className="ph-greeting-emoji">👋</span>
        </div>

        {/* Main heading */}
        <h1 className="ph-heading">
          I'm <span className="ph-name">Samuel</span>,<br />
          <span className="ph-role">Leader & Transformation</span><br />
          <span className="ph-role">Contributor</span>
        </h1>

        {/* Testimonial quote */}
        <div className="ph-testimonial">
          <div className="ph-quote-icon">&ldquo;</div>
          <p className="ph-quote-text">
            Grounded in Practice. Refined by Purpose. Rising to Transform with <span className="ph-highlight">Samuel!</span> A true professional Leader & Group Intelligence Facilitator with a great sense of vision and purpose.
          </p>
        </div>

        {/* Center: Professional photo with circular backgrounds */}
        <div className="ph-photo-container">
          {/* Large circular background - orange/red */}
          <div className="ph-circle ph-circle-1" />
          {/* Medium circular background - pink */}
          <div className="ph-circle ph-circle-2" />
          
          {/* Photo frame */}
          <div className="ph-photo-frame">
            <Image
              src="/photo-hero.png"
              alt="Samuel Kobina Gyasi"
              fill
              priority
              sizes="(max-width:768px) 280px, 420px"
              className="ph-photo-img"
            />
          </div>

          {/* Social buttons */}
          <div className="ph-social-bar">
            <button className="ph-follow-btn">Follow me</button>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ph-social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="ph-social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 4.5h5c2.5 0 4.5 1.5 4.5 3.5 0 1.5-.8 2.7-2 3.2 1.5.5 2.5 2 2.5 3.8 0 2.5-2 4.5-4.5 4.5h-5.5V4.5zm2 6h3c1 0 2-.5 2-1.5s-1-1.5-2-1.5h-3v3zm0 7h3.5c1.2 0 2.5-.8 2.5-2s-1.3-2-2.5-2H8.5v4zM15 7h5v1h-5V7z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ph-social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ph-social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Years of experience badge */}
        <div className="ph-experience-badge">
          <div className="ph-exp-label">Years Of Experience</div>
          <div className="ph-exp-number">15+</div>
        </div>
      </div>
    </section>
  );
}
