"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar_url: string | null;
  quote: string;
  rating: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="ts-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "ts-star ts-star--on" : "ts-star ts-star--off"}>★</span>
      ))}
    </div>
  );
}

export function TestimonialsClient() {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setItems(d ?? []))
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="ts-section">
      <div className="ts-inner">
        <div className="ts-header">
          <div className="ts-label">
            <span className="ts-label-line" />
            Testimonials
          </div>
          <h2 className="ts-headline">
            Words from <em>Those Who Know</em>
          </h2>
          <p className="ts-sub">
            Voices of those who have walked alongside, been mentored by, or collaborated with Samuel.
          </p>
        </div>

        <div className="ts-grid">
          {items.map((t, idx) => (
            <div key={t.id} className={`ts-card ${idx === 0 ? "ts-card--featured" : ""}`}>
              <StarRating rating={t.rating} />
              <blockquote className="ts-quote">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="ts-author">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.name} className="ts-avatar" loading="lazy" />
                ) : (
                  <div className="ts-avatar-initials">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div className="ts-author-info">
                  <div className="ts-author-name">{t.name}</div>
                  {(t.role || t.company) && (
                    <div className="ts-author-role">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
