"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";

/* -----------------------------------------
   DATA
----------------------------------------- */
const chapters = [
  {
    year: "1999",
    tag: "Origins",
    title: "A Life Begins in Mpohor",
    image: "/my-story/3.png",
    imageAlt: "Samuel with family in Mpohor",
    imageSide: "right" as const,
    body: [
      "On the 22nd of June 1999, Samuel Kobina Gyasi was born to Mr. Emmanuel Gyasi and Mrs. Regina Baidoo � a woman whose faith and warmth became the first architecture of his soul. He entered the world as the newest member of a family of three brothers raised in Mpohor, Ghana.",
      "His earliest memories are woven with the sound of a sewing machine and the smell of finished cloth. His father's shop was not merely a trade � it was a lesson in precision, patience, and the dignity of craftsmanship. His mother's prayers taught him that a life built on faith is unshakeable.",
    ],
    quote: null,
  },
  {
    year: "2009 � 2017",
    tag: "Leadership Awakens",
    title: "Prefect, Student, Builder",
    image: "/my-story/2.png",
    imageAlt: "Samuel in his school years",
    imageSide: "left" as const,
    body: [
      "At ten years old, Samuel was elected Class Prefect at Ghana-China Friendship School � a role he held for three years. It was his first encounter with what it means to lead: to be accountable not only for yourself but for the order and progress of those around you.",
      "At Saint John's School in Sekondi-Takoradi, he pursued a General Science curriculum and served as Dining Hall Prefect � managing the sustenance and order of the entire student body. Authority without relationship is hollow; the trust of peers is harder earned and more precious than any title.",
    ],
    quote: "A leader's worth is measured not by what they command, but by the dignity they preserve in every person they serve.",
  },
  {
    year: "2017",
    tag: "Entrepreneurship",
    title: "Managing Director at Seventeen",
    image: "/my-story/4.png",
    imageAlt: "Samuel working � the early entrepreneur",
    imageSide: "right" as const,
    body: [
      "Before his eighteenth birthday, Samuel worked as managing staff for a new car wash business in Mpohor. He encountered the full weight of entrepreneurial reality: profit and loss, staff decisions, customer relationships, and the daily discipline of showing up.",
      "The experience was an education no classroom could replicate. It built in him an understanding that leadership in institutions begins with leadership of self � and that instincts sharpened in small places prepare a person for large responsibility.",
    ],
    quote: null,
  },
  {
    year: "2020 � 2023",
    tag: "Scholar in Morocco",
    title: "Distinction Across Continents",
    image: "/my-story/5.png",
    imageAlt: "Samuel at SUP Management, F�s",
    imageSide: "left" as const,
    body: [
      "Samuel moved to Morocco to pursue Computer Science at the Ecole Sup�rieure de Management, de Commerce et d'Informatique (ESMCI) in F�s. Navigating a new culture, a new language, and a demanding curriculum, he developed the rare ability to hold complexity without losing clarity.",
      "He graduated with distinction and the Highest GPA in the entire school � a recognition not only of academic excellence but of the discipline and purpose that had been forged over years. The scholarship that followed was not a reward for past effort; it was a commission for future work.",
    ],
    quote: "A scholarship is a society's investment in an individual � with the expectation that the investment will return, multiplied, to the community.",
  },
  {
    year: "2023 � 2025",
    tag: "Mastery",
    title: "Master's in Collective Intelligence � UM6P",
    image: "/my-story/6.png",
    imageAlt: "Samuel at UM6P, Morocco",
    imageSide: "right" as const,
    body: [
      "At the School of Collective Intelligence (SCI) in Rabat, Samuel completed a rigorous Master's programme fusing data science, organizational theory, and facilitation. The central question driving every module: how do groups think, decide, and create together?",
      "While his coursework deepened his research vocabulary, it was the living laboratory of navigating cultures and communities that sharpened his understanding of transformation � as something that begins with the willingness to be made new.",
    ],
    quote: null,
  },
  {
    year: "2025 � Now",
    tag: "The Present Chapter",
    title: "Building, Serving, Rooting",
    image: "/my-story/7.png",
    imageAlt: "Samuel today � leader and mentor",
    imageSide: "left" as const,
    body: [
      "Today, Samuel inhabits several interconnected spheres of service. As Junior Program Officer at the School of Collective Intelligence, UM6P, he helps students develop their careers and facilitates programmes that unlock the collective intelligence of teams and organisations.",
      "In the Eglise �vang�lique Au Maroc, he serves as an elder � leading the intercession and library teams. Beyond institutions, he mentors individuals navigating the same questions of faith and purpose he once navigated alone.",
    ],
    quote: null,
  },
];

const nowCards = [
  {
    num: "01",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence � UM6P, Morocco",
    body: "Samuel designs and facilitates learning programmes that unlock the collective intelligence of organisations, communities, and teams.",
    image: "/my-story/6.png",
  },
  {
    num: "02",
    title: "Elder & Community Leader",
    org: "Eglise �vang�lique Au Maroc",
    body: "Spiritual formation, community accountability, and pastoral care � leading both the intercession team and the library team.",
    image: "/my-story/3.png",
  },
  {
    num: "03",
    title: "Mentor",
    org: "Individuals � Faith � Purpose � Leadership",
    body: "Quietly and faithfully walking alongside individuals navigating questions of faith, purpose, leadership, and identity.",
    image: "/my-story/7.png",
  },
];

/* -----------------------------------------
   CSS
----------------------------------------- */
const css = `
/* -- ROOT -- */
.msp {
  background: #f5f3ef;
  color: #0a0a0a;
  min-height: 100vh;
}

/* -- HERO -- */
.msp-hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: #0a0a0a;
}
.msp-hero-bg {
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center top;
  opacity: 0.45;
}
.msp-hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10,10,10,0.2) 0%,
    rgba(10,10,10,0.15) 40%,
    rgba(10,10,10,0.85) 100%
  );
  z-index: 1;
}
.msp-hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 8% 80px;
  max-width: 1200px;
  margin: 0 auto;
}
.msp-hero-eyebrow {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #22c55e;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.msp-hero-eyebrow::before {
  content: '';
  display: block;
  width: 28px; height: 1.5px;
  background: #22c55e;
}
.msp-hero-headline {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(56px, 10vw, 130px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #f5f3ef;
  margin-bottom: 32px;
}
.msp-hero-rule {
  width: 56px; height: 2px;
  background: #22c55e;
  margin-bottom: 24px;
}
.msp-hero-sub {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(15px, 1.8vw, 20px);
  color: rgba(245,243,239,0.75);
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: 36px;
}
.msp-hero-scroll {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(245,243,239,0.45);
}
.msp-hero-scroll::after {
  content: '';
  display: block;
  width: 1px;
  height: 40px;
  background: rgba(245,243,239,0.3);
  animation: msp-scroll-line 2s ease-in-out infinite;
}
@keyframes msp-scroll-line {
  0%,100%{opacity:0.3;transform:scaleY(1);}
  50%{opacity:0.8;transform:scaleY(1.1);}
}

/* -- INTRO STRIP -- */
.msp-intro {
  background: #0a0a0a;
  padding: 56px 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}
.msp-intro-quote {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(20px, 2.5vw, 30px);
  font-weight: 700;
  color: #f5f3ef;
  line-height: 1.3;
  max-width: 700px;
  letter-spacing: -0.01em;
}
.msp-intro-quote em { color: #22c55e; font-style: normal; }
.msp-intro-stats {
  display: flex;
  gap: 40px;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.msp-intro-stat {
  text-align: center;
}
.msp-intro-stat-val {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 900;
  color: #22c55e;
  line-height: 1;
  margin-bottom: 4px;
}
.msp-intro-stat-label {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(245,243,239,0.45);
}

/* -- CHAPTERS -- */
.msp-chapters {
  padding: 0 8%;
}
.msp-chapter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 96px 0;
  border-bottom: 1px solid rgba(10,10,10,0.08);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.msp-chapter:last-child { border-bottom: none; }
.msp-chapter.msp-visible { opacity: 1; transform: none; }

/* image on the right */
.msp-chapter--right .msp-ch-text { order: 1; }
.msp-chapter--right .msp-ch-media { order: 2; }

/* image on the left */
.msp-chapter--left .msp-ch-text { order: 2; }
.msp-chapter--left .msp-ch-media { order: 1; }

/* Text column */
.msp-ch-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #22c55e;
  margin-bottom: 16px;
}
.msp-ch-tag::before {
  content: '';
  display: block;
  width: 20px; height: 1.5px;
  background: #22c55e;
}
.msp-ch-year {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: rgba(10,10,10,0.35);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.msp-ch-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #0a0a0a;
  margin-bottom: 24px;
}
.msp-ch-body {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(14px, 1.2vw, 16px);
  line-height: 1.85;
  color: rgba(10,10,10,0.62);
}
.msp-ch-body p + p { margin-top: 16px; }
.msp-ch-quote {
  margin-top: 28px;
  padding: 20px 24px;
  border-left: 3px solid #22c55e;
  background: rgba(34,197,94,0.06);
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 15px;
  font-style: italic;
  line-height: 1.7;
  color: rgba(10,10,10,0.7);
  border-radius: 0 8px 8px 0;
}

/* Media column */
.msp-ch-media {
  position: relative;
}
.msp-ch-img-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: #e5e0da;
}
.msp-ch-img-wrap img {
  object-fit: cover;
  transition: transform 0.6s ease;
}
.msp-chapter:hover .msp-ch-img-wrap img { transform: scale(1.04); }

/* decorative accent corners */
.msp-ch-corner {
  position: absolute;
  width: 60px; height: 60px;
  z-index: 2;
  pointer-events: none;
}
.msp-ch-corner--tl {
  top: -12px; left: -12px;
  border-top: 3px solid #22c55e;
  border-left: 3px solid #22c55e;
  border-radius: 4px 0 0 0;
}
.msp-ch-corner--br {
  bottom: -12px; right: -12px;
  border-bottom: 3px solid #22c55e;
  border-right: 3px solid #22c55e;
  border-radius: 0 0 4px 0;
}

/* -- NOW SECTION -- */
.msp-now {
  background: #0a0a0a;
  padding: 100px 8%;
}
.msp-now-inner { max-width: 1100px; margin: 0 auto; }
.msp-now-eyebrow {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #22c55e;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.msp-now-eyebrow::before {
  content: '';
  display: block;
  width: 24px; height: 1.5px;
  background: #22c55e;
}
.msp-now-heading {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(28px, 4.5vw, 56px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #f5f3ef;
  margin-bottom: 64px;
}
.msp-now-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.msp-now-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
}
.msp-now-card:hover {
  border-color: rgba(34,197,94,0.35);
  transform: translateY(-4px);
}
.msp-now-card-img {
  height: 220px;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
}
.msp-now-card-img img {
  object-fit: cover;
  transition: transform 0.5s ease;
}
.msp-now-card:hover .msp-now-card-img img { transform: scale(1.06); }
.msp-now-card-body {
  padding: 26px 26px 30px;
}
.msp-now-card-num {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #22c55e;
  margin-bottom: 12px;
}
.msp-now-card-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #f5f3ef;
  line-height: 1.3;
  margin-bottom: 6px;
}
.msp-now-card-org {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(245,243,239,0.35);
  margin-bottom: 14px;
}
.msp-now-card-text {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 1.75;
  color: rgba(245,243,239,0.55);
}

/* -- CTA SECTION -- */
.msp-cta {
  padding: 96px 8%;
  text-align: center;
  background: #f5f3ef;
}
.msp-cta-label {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #22c55e;
  margin-bottom: 18px;
}
.msp-cta-heading {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #0a0a0a;
  margin-bottom: 20px;
}
.msp-cta-heading em { color: #22c55e; font-style: normal; }
.msp-cta-sub {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 17px;
  color: rgba(10,10,10,0.55);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto 40px;
}
.msp-cta-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
.msp-cta-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #0a0a0a;
  color: #f5f3ef;
  padding: 15px 32px;
  border-radius: 50px;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.25s, color 0.25s, transform 0.2s;
}
.msp-cta-btn-primary:hover {
  background: #22c55e;
  color: #0a0a0a;
  transform: translateY(-2px);
}
.msp-cta-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: #0a0a0a;
  padding: 15px 32px;
  border: 1.5px solid rgba(10,10,10,0.2);
  border-radius: 50px;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.msp-cta-btn-ghost:hover {
  border-color: #22c55e;
  color: #22c55e;
  transform: translateY(-2px);
}

/* -- RESPONSIVE -- */
@media (max-width: 900px) {
  .msp-chapter {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 64px 0;
  }
  .msp-chapter--left .msp-ch-text,
  .msp-chapter--right .msp-ch-text { order: 2; }
  .msp-chapter--left .msp-ch-media,
  .msp-chapter--right .msp-ch-media { order: 1; }
  .msp-ch-img-wrap { aspect-ratio: 16 / 9; }
  .msp-now-grid { grid-template-columns: 1fr; gap: 20px; }
  .msp-now-card-img { height: 200px; }
}
@media (max-width: 640px) {
  .msp-hero-content { padding: 0 6% 64px; }
  .msp-chapters { padding: 0 6%; }
  .msp-intro { padding: 48px 6%; flex-direction: column; }
  .msp-now { padding: 72px 6%; }
  .msp-cta { padding: 72px 6%; }
  .msp-intro-stats { justify-content: center; }
}
`;

/* -----------------------------------------
   COMPONENT
----------------------------------------- */
export default function MyStoryPage() {
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("msp-visible"); }),
      { threshold: 0.1 }
    );
    chapterRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="msp">
        <style>{css}</style>

        {/* -- HERO -- */}
        <section className="msp-hero">
          <Image
            src="/my-story/6.png"
            alt="Samuel Kobina Gyasi"
            fill
            priority
            sizes="100vw"
            className="msp-hero-bg"
          />
          <div className="msp-hero-gradient" />
          <div className="msp-hero-content">
            <p className="msp-hero-eyebrow">Samuel Kobina Gyasi � Born 22 June 1999 � Mpohor, Ghana</p>
            <h1 className="msp-hero-headline">My<br />Story</h1>
            <div className="msp-hero-rule" />
            <p className="msp-hero-sub">
              Son of a tailor. Third of three brothers. Class Prefect at ten.
              Scholar across continents. Program Officer. Elder. Mentor.
              This is the story of a life built chapter by chapter.
            </p>
            <div className="msp-hero-scroll">Scroll to explore</div>
          </div>
        </section>

        {/* -- INTRO STRIP -- */}
        <div className="msp-intro">
          <p className="msp-intro-quote">
            A life worth living is one<br />
            <em>shared in service to others.</em>
          </p>
          <div className="msp-intro-stats">
            <div className="msp-intro-stat">
              <div className="msp-intro-stat-val">26</div>
              <div className="msp-intro-stat-label">Years of Life</div>
            </div>
            <div className="msp-intro-stat">
              <div className="msp-intro-stat-val">3</div>
              <div className="msp-intro-stat-label">Countries</div>
            </div>
            <div className="msp-intro-stat">
              <div className="msp-intro-stat-val">10+</div>
              <div className="msp-intro-stat-label">Years Leading</div>
            </div>
          </div>
        </div>

        {/* -- CHAPTERS -- */}
        <div className="msp-chapters">
          {chapters.map((ch, i) => (
            <div
              key={i}
              ref={(el) => { chapterRefs.current[i] = el; }}
              className={`msp-chapter msp-chapter--${ch.imageSide}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {/* Text */}
              <div className="msp-ch-text">
                <div className="msp-ch-tag">{ch.tag}</div>
                <div className="msp-ch-year">{ch.year}</div>
                <h2 className="msp-ch-title">{ch.title}</h2>
                <div className="msp-ch-body">
                  {ch.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
                {ch.quote && (
                  <blockquote className="msp-ch-quote">&ldquo;{ch.quote}&rdquo;</blockquote>
                )}
              </div>

              {/* Image */}
              <div className="msp-ch-media">
                <div className="msp-ch-corner msp-ch-corner--tl" />
                <div className="msp-ch-corner msp-ch-corner--br" />
                <div className="msp-ch-img-wrap">
                  <Image
                    src={ch.image}
                    alt={ch.imageAlt}
                    fill
                    sizes="(max-width:900px) 100vw, 48vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* -- NOW SECTION -- */}
        <section className="msp-now">
          <div className="msp-now-inner">
            <p className="msp-now-eyebrow">The Present Chapter</p>
            <h2 className="msp-now-heading">What I Do Now</h2>
            <div className="msp-now-grid">
              {nowCards.map((card, i) => (
                <div key={i} className="msp-now-card">
                  <div className="msp-now-card-img">
                    <Image src={card.image} alt={card.title} fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="msp-now-card-body">
                    <div className="msp-now-card-num">{card.num}</div>
                    <div className="msp-now-card-title">{card.title}</div>
                    <div className="msp-now-card-org">{card.org}</div>
                    <p className="msp-now-card-text">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- CTA -- */}
        <section className="msp-cta">
          <p className="msp-cta-label">Let&apos;s Connect</p>
          <h2 className="msp-cta-heading">
            Ready to Build<br />
            <em>Something Together?</em>
          </h2>
          <p className="msp-cta-sub">
            Whether you&apos;re seeking collaboration, mentorship, or meaningful conversation � Samuel is open to connection.
          </p>
          <div className="msp-cta-btns">
            <Link href="/#connect" className="msp-cta-btn-primary">Get in Touch ?</Link>
            <Link href="/blog" className="msp-cta-btn-ghost">Read the Blog</Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
