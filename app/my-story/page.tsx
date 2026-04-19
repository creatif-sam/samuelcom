"use client";

import { useEffect, Suspense } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";

const css = `
.msp {
  background: #f5f3ef;
  color: #0a0a0a;
  min-height: 100vh;
  position: relative;
}



/*  HERO  */
.msp-hero {
  padding: 140px 8% 80px;
  border-bottom: 1px solid rgba(34,197,94,.18);
  margin: 0 auto;
}
.msp-hero-eyebrow {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 10px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 24px;
}
.msp-hero-headline {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(42px, 7vw, 90px);
  font-weight: 900;
  line-height: 0.93;
  letter-spacing: -0.03em;
  color: inherit;
  text-transform: uppercase;
  margin-bottom: 30px;
}
.msp-hero-rule {
  width: 56px; height: 2px;
  background: var(--gold);
  margin: 28px 0;
}
.msp-hero-sub {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(17px, 2vw, 22px);
  font-style: italic;
  color: rgba(10,10,10,0.65);
  max-width: 560px;
  line-height: 1.65;
}



/*  TIMELINE SECTION  */
.msp-section {
  padding: 80px 8% 100px;
  max-width: 1100px;
  margin: 0 auto;
}
.msp-timeline {
  position: relative;
  padding-left: 0;
}

/* Vertical spine */
.msp-timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 16px;
  bottom: 16px;
  width: 1px;
  background: rgba(34,197,94,.25);
}

/*  TIMELINE ITEM  */
.msp-item {
  display: flex;
  gap: 0;
  margin-bottom: 64px;
  position: relative;
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.msp-item.msp-visible {
  opacity: 1;
  transform: none;
}

/* Circle dot column */
.msp-dot-col {
  position: relative;
  flex-shrink: 0;
  width: 44px;
  padding-top: 4px;
}
.msp-dot {
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--white);
  border: 2px solid rgba(34,197,94,.55);
  position: relative; z-index: 2;
  transition: background 0.3s, border-color 0.3s;
}


.msp-item:hover .msp-dot {
  background: var(--gold);
  border-color: var(--gold);
}

/* Text column */
.msp-text {
  padding-left: 24px;
  flex: 1;
}
.msp-item-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 14px;
}
.msp-year {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--gold);
  text-transform: uppercase;
  flex-shrink: 0;
}
.msp-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(18px, 2.2vw, 24px);
  font-weight: 700;
  color: inherit;
  line-height: 1.2;
}
.msp-body {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 17px;
  line-height: 1.88;
  color: rgba(10,10,10,0.62);
}


.msp-body p + p { margin-top: 14px; }

.msp-pullquote {
  margin: 22px 0 4px;
  padding: 18px 24px;
  border-left: 3px solid var(--gold);
  background: rgba(34,197,94,.05);
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-style: italic;
  font-size: 17px;
  line-height: 1.7;
  color: inherit;
}

/*  NOW SECTION  */
.msp-now {
  background: rgba(34,197,94,.06);
  border-top: 1px solid rgba(34,197,94,.18);
  border-bottom: 1px solid rgba(34,197,94,.18);
  padding: 72px 8%;
}
.msp-now-inner { max-width: 1100px; margin: 0 auto; }
.msp-now-label {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}
.msp-now-heading {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  color: inherit;
  margin-bottom: 48px;
}
.msp-now-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;
}
.msp-now-card {
  border-top: 2px solid var(--gold);
  padding-top: 22px;
}
.msp-now-num {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 9px;
  letter-spacing: 0.28em;
  color: var(--gold);
  margin-bottom: 12px;
}
.msp-now-card-title {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: inherit;
  margin-bottom: 12px;
  line-height: 1.3;
}
.msp-now-card-body {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 15px;
  font-style: italic;
  line-height: 1.8;
  color: rgba(10,10,10,0.62);
}



/*  RESPONSIVE  */
@media (max-width: 768px) {
  .msp-hero { padding: 130px 6% 60px; }
  .msp-section { padding: 60px 6% 80px; }
  .msp-now { padding: 60px 6%; }
  .msp-now-grid { grid-template-columns: 1fr; gap: 32px; }
}

/* Gold gradient text */
.msp-hero-eyebrow, .msp-year, .msp-now-label, .msp-now-num {
  background: var(--gold-gradient) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  color: transparent !important;
}
`;

const timelineEntries = [
  {
    year: "1999",
    title: "A Life Begins in Mpohor",
    body: [
      "On the 22nd of June 1999, Samuel Kobina Gyasi was born to Mr. Emmanuel Gyasi, and Mrs. Regina Baidoo, a woman whose faith and warmth became the first architecture of his soul. He entered the world as the newest member of a family of three brothers raised in Mpohor, Ghana.",
      "His earliest memories are woven with the sound of a sewing machine and the smell of finished cloth. His father's shop was not merely a trade — it was a lesson in precision, patience, and the dignity of craftsmanship. His mother’s prayers taught him that a life built on faith is unshakeable.",
    ],
    quote: null,
  },
  {
    year: "2009 — 2012",
    title: "Class Prefect — Ghana-China Friendship School, Mpohor",
    body: [
      "At the age of ten, Samuel was elected Class Prefect—a role he would hold for three years. It was his first encounter with what it means to lead: to be accountable not only for yourself but for the order, coordination, and progress of those around you.",
      "He learned that authority without relationship is hollow, and that the trust of peers is harder earned — and more precious — than any title. This period sharpened a commitment to servant leadership that has never faded.",
    ],
    quote: null,
  },
  {
    year: "2014 — 2017",
    title: "Dining Hall Prefect — Saint John’s School, Sekondi-Takoradi",
    body: [
      "Samuel attended Saint John’s School, pursuing a General Science curriculum. This period solidified his analytical thinking and scientific rigor, providing a foundation for his future technical studies.",
      "He served as Dining Hall Prefect, a role of significant logistical and disciplinary weight. Managing the sustenance and order of the entire student body refined his ability to coordinate complex systems and serve a large community with integrity.",
    ],
    quote: null,
  },
  {
    year: "2017",
    title: "Manager — Cash Washing Bay, Mpohor",
    body: [
      "Before his eighteenth birthday, Samuel worked as a managing staff for a new car wash business in Mpohor. He encountered the full weight of entrepreneurial reality: profit and loss, staff decisions, and customer relationships.",
      "The experience was an education no classroom could replicate. It built in him an understanding that leadership in institutions begins with leadership of self — and that the instincts of a servant are more valuable than any title.",
    ],
    quote: null,
  },
  {
    year: "2020 — 2023",
    title: "SUP Management Fès, Morocco — Computer Science",
    body: [
      "Samuel moved to Morocco to pursue his undergraduate studies at the Ecole Supérieure de Management, de Commerce et d'Informatique (ESMCI) in Fès. His academic years were marked by intellectual curiosity and student leadership.",
      "He graduated with distinction and the Highest GPA in the entire school, developing a reputation as a thinker who could hold complexity without losing clarity — a skill that would serve him well in every season that followed.",
    ],
    quote: null,
  },
  {
    year: "2023",
    title: "Excellence Scholarship — UM6P, Morocco",
    body: [
      "The arrival of an Excellence Scholarship was a recognition of his academic merits. For Samuel, this was not a reward for past effort, but a commission for future service.",
      "He understood that a scholarship is a society's investment in an individual with the expectation that the investment will return, multiplied, to the community. This conviction carried him to the Mohammed VI Polytechnic University.",
    ],
    quote: "A scholarship is a commission: a society's investment in an individual with the expectation that the investment will return, multiplied, to the community.",
  },
  {
    year: "2023 — 2025",
    title: "Master's in Collective Intelligence — UM6P, Morocco",
    body: [
      "At the School of Collective Intelligence (SCI) in Rabat, Samuel completed a rigorous Master's programme fusing data science, organizational theory, and facilitation. The central question: how do groups think, decide, and create together?",
      "While his coursework deepened his research vocabulary, it was the living laboratory of navigating a new culture that sharpened his understanding of transformation as something that begins with the willingness to be made new.",
    ],
    quote: null,
  },
  {
    year: "2025 — Now",
    title: "Building, Serving, Rooting",
    body: [
      "Today, Samuel inhabits several interconnected spheres of service. As Junior Program Officer at SCI, UM6P, he helps students develop their careers and facilitates programs that unlock collective intelligence.",
      "In the Eglise Évangélique Au Maroc, he serves as an elder — mentoring the intercession and library teams. Beyond institutions, he mentors individuals navigating the same questions of faith and purpose he once navigated alone.",
    ],
    quote: null,
  },
];

const nowCards = [
  {
    num: "01",
    title: "Junior Program Officer · SCI, UM6P",
    body: "At the School of Collective Intelligence, University Mohammed VI Polytechnic (UM6P) in Morocco, Samuel designs and facilitates learning programmes that unlock the collective intelligence of organisations, communities, and teams.",
  },
  {
    num: "02",
    title: "Elder · Eglise Évangélique Au Maroc",
    body: "Samuel serves as a church elder in the Eglise Évangélique Au Maroc, responsible for spiritual formation, community accountability, and pastoral care — leading both the intercession team and the library team.",
  },
  {
    num: "03",
    title: "Mentor",
    body: "Quietly and faithfully, Samuel walks alongside individuals navigating questions of faith, purpose, leadership, and identity — offering the kind of mentorship he once needed himself.",
  },
];

export default function MyStoryPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("msp-visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".msp-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="msp">
        <style>{css}</style>

        {/*  HERO  */}
        <div className="msp-hero">
          <p className="msp-hero-eyebrow">Samuel Kobina Gyasi · Born 22 June 1999 · Mpohor, Ghana</p>
          <h1 className="msp-hero-headline">My<br />Story</h1>
          <div className="msp-hero-rule" />
          <p className="msp-hero-sub">
            Son of a tailor. Third of three brothers. Class Prefect at ten.
            Scholar across continents. Program Officer. Elder. Mentor.
            This is the story of a life built chapter by chapter.
          </p>
        </div>

        {/*  TIMELINE  */}
        <div className="msp-section">
          <div className="msp-timeline">
            {timelineEntries.map((entry, i) => (
              <div
                key={i}
                className="msp-item"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <div className="msp-dot-col">
                  <div className="msp-dot" />
                </div>
                <div className="msp-text">
                  <div className="msp-item-head">
                    <span className="msp-year">{entry.year}</span>
                    <span className="msp-title">{entry.title}</span>
                  </div>
                  <div className="msp-body">
                    {entry.body.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                  {entry.quote && (
                    <div className="msp-pullquote">&ldquo;{entry.quote}&rdquo;</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  WHAT I DO NOW */}
        <section className="msp-now">
          <div className="msp-now-inner">
            <p className="msp-now-label">The Present Chapter</p>
            <h2 className="msp-now-heading">What I Do Now</h2>
            <div className="msp-now-grid">
              {nowCards.map((card, i) => (
                <div key={i} className="msp-now-card">
                  <div className="msp-now-num">{card.num}</div>
                  <div className="msp-now-card-title">{card.title}</div>
                  <div className="msp-now-card-body">{card.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Suspense fallback={null}><SiteFooter /></Suspense>
    </>
  );
}


