"use client";

import { useEffect, Suspense } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";

const css = `
.cdp {
  background: var(--black);
  color: var(--white);
  min-height: 100vh;
}

/* â”€â”€ HERO â”€â”€ */
.cdp-hero {
  padding: 140px 8% 80px;
  border-bottom: 1px solid rgba(201,168,76,.18);
  max-width: 1100px;
  margin: 0 auto;
}
.cdp-hero-eyebrow {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 24px;
}
.cdp-hero-headline {
  font-family: var(--font-playfair), 'Playfair Display', serif;
  font-size: clamp(52px, 9vw, 110px);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: var(--white);
  text-transform: uppercase;
  margin-bottom: 0;
}
.cdp-hero-divider {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: end;
  padding: 48px 0;
  border-top: 1px solid rgba(201,168,76,.18);
  margin-top: 40px;
}
.cdp-hero-deck {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 18px;
  font-style: italic;
  line-height: 1.7;
  color: rgba(245,243,239,.65);
}
.cdp-hero-deck + .cdp-hero-deck { margin-top: 16px; }
.cdp-hero-motto {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 28px;
}

/* â”€â”€ ARTICLES â”€â”€ */
.cdp-articles {
  padding: 80px 8% 0;
  max-width: 1100px;
  margin: 0 auto;
}
.cdp-article {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 40px;
  padding-bottom: 72px;
  border-bottom: 1px solid rgba(201,168,76,.1);
  margin-bottom: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.cdp-article:last-child { border-bottom: none; }
.cdp-article.cdp-visible { opacity: 1; transform: none; }

.cdp-article-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
}
.cdp-article-num-label {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.cdp-article-line {
  flex: 1;
  width: 1px;
  background: rgba(201,168,76,.2);
  margin: 12px 0;
  min-height: 40px;
}

.cdp-article-right {}
.cdp-article-title {
  font-family: var(--font-playfair), 'Playfair Display', serif;
  font-size: clamp(22px, 2.8vw, 34px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--white);
  margin-bottom: 24px;
  letter-spacing: -0.015em;
}
.cdp-article-body {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 18px;
  line-height: 1.88;
  color: rgba(245,243,239,.72);
  max-width: 680px;
}
.cdp-article-body p + p { margin-top: 16px; }
.cdp-ref-marker {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 10px;
  color: var(--gold);
  vertical-align: super;
  margin-left: 1px;
  text-decoration: none;
}
.cdp-ref-marker:hover { text-decoration: underline; }

/* â”€â”€ DECLARATION â”€â”€ */
.cdp-declaration {
  background: rgba(201,168,76,.06);
  border-top: 1px solid rgba(201,168,76,.18);
  border-bottom: 1px solid rgba(201,168,76,.18);
  padding: 72px 8%;
  margin-top: 80px;
}
.cdp-decl-inner { max-width: 1100px; margin: 0 auto; }
.cdp-decl-label {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}
.cdp-decl-heading {
  font-family: var(--font-playfair), 'Playfair Display', serif;
  font-size: clamp(28px, 4.5vw, 56px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.025em;
  color: var(--white);
  margin-bottom: 52px;
}
.cdp-decl-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(201,168,76,.12);
}
.cdp-decl-item {
  padding: 28px 32px;
  background: var(--black);
  border-bottom: 1px solid rgba(201,168,76,.06);
}
.cdp-decl-item:hover { background: rgba(201,168,76,.04); }
.cdp-decl-num {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.28em;
  color: var(--gold);
  margin-bottom: 10px;
}
.cdp-decl-text {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 16px;
  line-height: 1.7;
  font-style: italic;
  color: rgba(245,243,239,.8);
}

/* â”€â”€ REFERENCES â”€â”€ */
.cdp-references {
  padding: 72px 8%;
  max-width: 1100px;
  margin: 0 auto;
}
.cdp-refs-label {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(201,168,76,.18);
}
.cdp-ref-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(245,243,239,.05);
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 15px;
  line-height: 1.65;
  color: rgba(245,243,239,.5);
}
.cdp-ref-num {
  font-family: var(--font-space-mono), 'Space Mono', monospace;
  font-size: 9px;
  color: var(--gold);
  flex-shrink: 0;
  padding-top: 3px;
  min-width: 20px;
}

/* â”€â”€ RESPONSIVE â”€â”€ */
@media (max-width: 1100px) {
  .cdp-hero-divider { grid-template-columns: 1fr; gap: 28px; }
  .cdp-decl-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .cdp-hero { padding: 130px 6% 60px; }
  .cdp-articles { padding: 60px 6% 0; }
  .cdp-article { grid-template-columns: 1fr; gap: 14px; }
  .cdp-article-left { flex-direction: row; align-items: center; }
  .cdp-article-num-label { writing-mode: horizontal-tb; transform: none; }
  .cdp-article-line { width: 40px; height: 1px; min-height: auto; margin: 0 8px; }
  .cdp-declaration { padding: 60px 6%; }
  .cdp-references { padding: 60px 6%; }
}

/* Gold gradient text */
.cdp-hero-eyebrow, .cdp-hero-motto, .cdp-article-num-label,
.cdp-ref-marker, .cdp-decl-label, .cdp-decl-num,
.cdp-refs-label, .cdp-ref-num {
  background: var(--gold-gradient) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  color: transparent !important;
}
`;

const credoArticles = [
  {
    title: "I Believe Every Life Has a Design",
    body: [
      "Before talent, before education, before opportunity â€” there is purpose. I believe that every human being enters the world carrying a design: a particular configuration of gifts, longings, questions, and capacities that, if honoured, points toward a specific contribution only they can make.",
      "This is not merely a theological claim. It is an empirical observation. The most transformative people I have known were not the most talented or the most resourced â€” they were the most aligned. They lived as if they had somewhere to be, and that conviction made them formidable.",
    ],
    refs: [1],
  },
  {
    title: "I Believe Faith and Reason Are Partners, Not Opponents",
    body: [
      "To love God with all your mind is not an instruction to suspend thought â€” it is a mandate to deploy it fully. I have never found that deep faith required intellectual dishonesty, and I have never found that rigorous thinking required the abandonment of transcendence.",
      "The command to test everything and hold fast to what is good is, in practice, a scientific disposition. The best science â€” humble, provisional, open to revision â€” rhymes deeply with a mature faith that expects to be surprised by the depth of what it doesn't yet know.",
    ],
    refs: [2, 3],
  },
  {
    title: "I Believe Leadership Is Always Servanthood",
    body: [
      "True authority is not claimed from above â€” it is granted from below. Every durable leadership story I have studied, and every experience of leadership I have lived, confirms this: the leaders who last are those who came to serve.",
      "This is not weakness. Servanthood is the most demanding posture a leader can adopt, because it requires the constant subordination of personal interest to collective good. It requires listening when speaking would be easier, and sacrifice when self-protection would be cheaper.",
    ],
    refs: [4],
  },
  {
    title: "I Believe Collective Intelligence Is Africa's Frontier",
    body: [
      "The challenges facing the African continent are not primarily resource challenges. They are knowledge challenges â€” challenges of how communities think together, make decisions together, and learn from experience together. Africa's greatest untapped resource is not underground. It is in the minds of its people.",
      "My work in Collective Intelligence is not academic detachment. It is a conviction lived out: that building the epistemic infrastructure for groups to think more wisely together is one of the most important things any one person can contribute to this generation.",
    ],
    refs: [5, 6],
  },
  {
    title: "I Believe Transformation Begins Within",
    body: [
      "Every external transformation I have witnessed was preceded by an interior one. Institutions change because people change. Communities are renewed because the people within them are renewed. Nations are transformed because enough individuals within them choose, one by one, to become something different.",
      "This is why I am sceptical of systemic solutions that ignore the person. Not because systems don't matter â€” they do, enormously â€” but because systems are made, maintained, and changed by people. The inner work is never optional. It is the prerequisite.",
    ],
    refs: [7],
  },
  {
    title: "I Believe Gratitude Is a Discipline, Not a Feeling",
    body: [
      "I was born in a small town to a tailor and a commencer. Four scholarships later, I am writing my credo from a university campus in Morocco. The distance between those two facts is not the product of my effort alone.",
      "Gratitude, for me, is not the emotion that arises when things go well. It is the daily practice of acknowledging that much of what I have was given â€” by God, by parents who sacrificed without fanfare, by teachers who believed when belief was not obvious, and by a society that invested in me before it knew what the return would be.",
    ],
    refs: [8],
  },
];

const declaration = [
  "I will not confuse busyness with fruitfulness.",
  "I will ask harder questions before accepting easy answers.",
  "I will lead with the knowledge that I am always also being led.",
  "I will honour the people who built the world I inherited.",
  "I will not mistake the absence of certainty for the absence of truth.",
  "I will serve Africa not with pity but with expectation.",
  "I will pray as if everything depends on God, and act as if everything depends on me.",
  "I will finish what I start â€” or have the integrity to say why I could not.",
  "I will be a person worth mentoring and worth mentoring others.",
  "I will, to the last day of the last year I am given, keep becoming.",
];

const references = [
  "Ephesians 2:10 â€” \"For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.\"",
  "Matthew 22:37 â€” \"Love the Lord your God with all your heart and with all your soul and with all your mind.\"",
  "Albert Einstein â€” \"The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.\"",
  "Matthew 20:26 â€” \"Whoever wants to become great among you must be your servant.\"",
  "Proverbs 20:18 (NLT) â€” \"Plans succeed through good counsel; don't go to war without wise advice.\"",
  "Kenneth Blanchard â€” \"No one of us is as smart as all of us.\"",
  "Romans 12:2 â€” \"Be transformed by the renewing of your mind.\"",
  "1 Thessalonians 5:18 â€” \"Give thanks in all circumstances; for this is God's will for you in Christ Jesus.\"",
];

const romanNumerals = ["I", "II", "III", "IV", "V", "VI"];

export default function CredoPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("cdp-visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".cdp-article").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="cdp">
        <style>{css}</style>

        {/* â”€â”€ HERO â”€â”€ */}
        <div className="cdp-hero">
          <p className="cdp-hero-eyebrow">A Personal Statement of Conviction · Samuel Kobina Gyasi · 2026</p>
          <h1 className="cdp-hero-headline">I<br />Believe</h1>
          <div className="cdp-hero-divider">
            <div>
              <p className="cdp-hero-deck">
                A credo is more than a statement of beliefs. It is a map of the territory where one has decided to live â€” the convictions that survive scrutiny, the commitments that hold when convenience pulls the other way.
              </p>
              <p className="cdp-hero-deck">
                What follows is not a polished manifesto but an honest account of what has been found to be true, tested against experience and refined in the fire of real life.
              </p>
            </div>
            <div>
              <p className="cdp-hero-deck">
                Each article of conviction carries numbered references, gathered at the close of this document. The ideas are Samuel&rsquo;s own; the anchors they rest on belong to a tradition larger than any one person.
              </p>
              <p className="cdp-hero-motto">Soli Deo Gloria</p>
            </div>
          </div>
        </div>

        {/* â”€â”€ ARTICLES â”€â”€ */}
        <div className="cdp-articles">
          {credoArticles.map((article, i) => (
            <div
              key={i}
              className="cdp-article"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="cdp-article-left">
                <span className="cdp-article-num-label">{romanNumerals[i]}</span>
                <div className="cdp-article-line" />
              </div>
              <div className="cdp-article-right">
                <h2 className="cdp-article-title">{article.title}</h2>
                <div className="cdp-article-body">
                  {article.body.map((p, j) => (
                    <p key={j}>
                      {p}
                      {j === article.body.length - 1 && article.refs.map((r) => (
                        <a key={r} href={`#ref-${r}`} className="cdp-ref-marker">[{r}]</a>
                      ))}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* â”€â”€ DECLARATION â”€â”€ */}
        <section className="cdp-declaration">
          <div className="cdp-decl-inner">
            <p className="cdp-decl-label">Personal Declaration</p>
            <h2 className="cdp-decl-heading">Ten Commitments<br />I Return To</h2>
            <div className="cdp-decl-grid">
              {declaration.map((d, i) => (
                <div key={i} className="cdp-decl-item">
                  <div className="cdp-decl-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="cdp-decl-text">&ldquo;{d}&rdquo;</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* â”€â”€ REFERENCES â”€â”€ */}
        <div className="cdp-references">
          <p className="cdp-refs-label">References</p>
          {references.map((ref, i) => (
            <div key={i} id={`ref-${i + 1}`} className="cdp-ref-item">
              <span className="cdp-ref-num">[{i + 1}]</span>
              <span>{ref}</span>
            </div>
          ))}
        </div>
      </div>

      <Suspense fallback={null}><SiteFooter /></Suspense>
    </>
  );
}


