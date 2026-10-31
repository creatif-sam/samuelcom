"use client";

import { useRef, useState } from "react";
import { Mail, Check } from "lucide-react";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { socialLinks } from "@/components/molecules/socialLinks";
import styles from "./contact.module.css";

const INQUIRIES = [
  "Facilitation",
  "Workshop",
  "Conference",
  "Team development programme",
  "Podcast / interview",
  "Question, comment or suggestion",
];

const LANGUAGES = ["English", "French", "Twi", "Fante", "Wassa"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    inquiry: INQUIRIES[0],
    language: "English",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt: startedAt.current }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        {/* -- HERO -- */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Contact</p>
            <h1 className={styles.heroTitle}>
              Let&apos;s Work <em>Together</em>
            </h1>
            <p className={styles.heroSub}>
              Facilitation · Workshops · Conferences · Team development · Podcasts &amp; interviews
            </p>
          </div>
        </section>

        <section className={styles.body}>
          <div className={styles.grid}>
            {/* -- INFO -- */}
            <div className={styles.info}>
              <p className={styles.lead}>
                If you&apos;re interested in inviting Samuel for a facilitation, workshop, team
                development programme, or podcast/interview, please complete the form, and
                someone from our team will be in touch soon.
              </p>
              <p>
                If you have other questions, comments, or suggestions, we welcome them as well.
                Every message is read with care and love, and Samuel is always open to new
                challenges.
              </p>
              <p>
                Thank you for your interest in Samuel&apos;s work. We look forward to connecting
                with you!
              </p>

              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Languages</h2>
                <p className={styles.cardText}>
                  Bilingual and fluent in <strong>English</strong> and <strong>French</strong>,
                  and also speaks the Ghanaian languages <strong>Twi</strong>,{" "}
                  <strong>Fante</strong>, and <strong>Wassa</strong>. Sessions can be delivered
                  in the language that suits your audience.
                </p>
                <ul className={styles.langs}>
                  {LANGUAGES.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>

              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Connect directly</h2>
                <a href="mailto:impact@samuelgyasi.com" className={styles.email}>
                  <Mail size={18} /> impact@samuelgyasi.com
                </a>
                <div className={styles.socials}>
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.social}
                      aria-label={s.label}
                      title={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* -- FORM -- */}
            <div className={styles.formCard}>
              {status === "sent" ? (
                <div className={styles.sent} role="status">
                  <span className={styles.sentIcon}><Check size={28} /></span>
                  <h2>Thank you, {form.name.split(" ")[0] || "friend"}!</h2>
                  <p>
                    Your message has been received. Someone from our team will be in touch
                    soon at <strong>{form.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 className={styles.formTitle}>Send a message</h2>

                  {/* Honeypot — hidden from people, tempting to bots */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={set("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className={styles.honeypot}
                  />

                  <div className={styles.row}>
                    <label className={styles.field}>
                      <span>Full name *</span>
                      <input required value={form.name} onChange={set("name")} autoComplete="name" />
                    </label>
                    <label className={styles.field}>
                      <span>Email *</span>
                      <input required type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span>Organisation (optional)</span>
                    <input value={form.organisation} onChange={set("organisation")} autoComplete="organization" />
                  </label>

                  <div className={styles.row}>
                    <label className={styles.field}>
                      <span>I&apos;m reaching out about</span>
                      <select value={form.inquiry} onChange={set("inquiry")}>
                        {INQUIRIES.map((q) => <option key={q}>{q}</option>)}
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>Preferred language</span>
                      <select value={form.language} onChange={set("language")}>
                        {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span>Message *</span>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your event, team, or question. Dates, audience size, and goals help."
                    />
                  </label>

                  {status === "error" && <p className={styles.error} role="alert">{error}</p>}

                  <button type="submit" className={styles.submit} disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
