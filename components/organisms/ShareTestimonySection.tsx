"use client";

import { useEffect, useRef, useState } from "react";

const MAX_QUOTE = 800;
const RATING_WORDS = ["", "Good", "Very good", "Great", "Excellent", "Life-changing"];

type Status = "idle" | "sending" | "sent" | "error";

export function ShareTestimonySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLTextAreaElement>(null);
  const startedAt = useRef(Date.now());
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", website: "" });
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Reveal the banner when it scrolls into view
  useEffect(() => {
    const el = sectionRef.current?.querySelector(".st-banner");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add("st-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Pop-up: Esc to close, lock page scroll, move focus in and back out
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const opener = openerRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [open]);

  const openForm = () => {
    startedAt.current = Date.now();
    setOpen(true);
  };

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      setError("Please confirm that Samuel may publish your testimony.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating, consent, startedAt: startedAt.current }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const shown = hover || rating;

  return (
    <section id="share-testimony" ref={sectionRef} className="st-section" aria-labelledby="st-heading">
      <div className="st-banner">
        <div className="st-bubble" aria-hidden="true">
          <span>&ldquo;</span>
        </div>

        <div className="st-copy">
          <h2 id="st-heading" className="st-heading">
            Have you worked with Samuel, mentored him, <em>or heard him speak?</em>
          </h2>
          <p className="st-sub">Share a few words about your experience. Samuel reads every testimony before it goes live.</p>
        </div>

        <button ref={openerRef} type="button" className="st-cta" onClick={openForm}>
          Share your testimony
        </button>
      </div>

      {open && (
        <div className="st-overlay" onClick={() => setOpen(false)}>
          <div
            className="st-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="st-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="st-close" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>

            {status === "sent" ? (
              <div className="st-success" role="status">
                <svg className="st-check" viewBox="0 0 52 52" aria-hidden="true">
                  <circle className="st-check-circle" cx="26" cy="26" r="24" />
                  <path className="st-check-tick" d="M15 27 l7 7 l15 -16" />
                </svg>
                <h3 id="st-modal-title">Thank you, {form.name.split(" ")[0] || "friend"}!</h3>
                <p>We have your testimony. It will appear on the site after Samuel reviews it.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 id="st-modal-title" className="st-modal-title">Share your testimony</h3>

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={set("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="st-honeypot"
                />

                <fieldset className="st-rating">
                  <legend>How would you rate your experience?</legend>
                  <div className="st-stars" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`st-star${n <= shown ? " st-star--on" : ""}`}
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHover(n)}
                        onFocus={() => setHover(n)}
                        onBlur={() => setHover(0)}
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        aria-pressed={rating === n}
                      >
                        ★
                      </button>
                    ))}
                    <span className="st-rating-word" aria-live="polite">{RATING_WORDS[shown]}</span>
                  </div>
                </fieldset>

                <label className="st-field">
                  <span>Your testimony *</span>
                  <textarea
                    ref={firstFieldRef}
                    required
                    rows={4}
                    maxLength={MAX_QUOTE}
                    value={form.quote}
                    onChange={set("quote")}
                    placeholder="What was your experience with Samuel?"
                  />
                  <small className="st-count">{form.quote.length}/{MAX_QUOTE}</small>
                </label>

                <label className="st-field">
                  <span>Full name *</span>
                  <input required value={form.name} onChange={set("name")} autoComplete="name" />
                </label>

                <div className="st-row">
                  <label className="st-field">
                    <span>Role (optional)</span>
                    <input value={form.role} onChange={set("role")} placeholder="e.g. Mentor, Colleague" autoComplete="organization-title" />
                  </label>
                  <label className="st-field">
                    <span>Organisation (optional)</span>
                    <input value={form.company} onChange={set("company")} autoComplete="organization" />
                  </label>
                </div>

                <label className="st-consent">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span>I agree that Samuel may publish my testimony on this site with my name.</span>
                </label>

                {status === "error" && <p className="st-error" role="alert">{error}</p>}

                <button type="submit" className="st-submit" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Sending…" : "Share my testimony"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
