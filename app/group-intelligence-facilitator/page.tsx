"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/organisms/SiteFooter";

const css = `
  .gif-page {
    --bg: #0a0a0a;
    --bg2: #111109;
    --line: rgba(34,197,94,0.15);
    --gold: #22c55e;
    --gold2: #86efac;
    --white: #f5f3ef;
    --gray: rgba(245,243,239,0.55);
    --sub: rgba(245,243,239,0.4);
    background: var(--bg);
    color: var(--white);
    min-height: 100vh;
    font-family: 'Georgia', serif;
  }

  /* NAV */
  .gif-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 56px;
    border-bottom: 1px solid var(--line);
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(16px);
  }
  .gif-nav-back {
    font-family: 'Space Mono', monospace; font-size: 9px;
    letter-spacing: .25em; text-transform: uppercase;
    color: var(--gold); text-decoration: none;
    display: flex; align-items: center; gap: 10px;
    transition: opacity .2s;
  }
  .gif-nav-back:hover { opacity: .7; }
  .gif-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 14px; letter-spacing: .1em;
    color: var(--white); text-decoration: none;
  }

  /* HERO */
  .gif-hero {
    padding: 120px 56px 80px;
    max-width: 860px;
    border-bottom: 1px solid var(--line);
  }
  .gif-hero-eyebrow {
    font-family: 'Space Mono', monospace; font-size: 9px;
    letter-spacing: .35em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
    display: flex; align-items: center; gap: 14px;
  }
  .gif-hero-eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--line); max-width: 80px; }
  .gif-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 6vw, 72px);
    line-height: 1.05; font-weight: 700;
    color: var(--white); margin-bottom: 28px;
  }
  .gif-hero-title em { font-style: italic; color: var(--gold); }
  .gif-hero-lead {
    font-size: clamp(16px, 1.8vw, 20px);
    line-height: 1.8; color: var(--gray);
    max-width: 680px;
  }

  /* CONTENT */
  .gif-body { padding: 0 56px; max-width: 1200px; }

  /* DEFINITION CARD */
  .gif-def {
    padding: 64px 0 56px;
    border-bottom: 1px solid var(--line);
    display: grid; grid-template-columns: 1fr 2fr; gap: 60px;
    align-items: start;
  }
  .gif-def-label {
    font-family: 'Space Mono', monospace; font-size: 9px;
    letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold);
    padding-top: 8px;
  }
  .gif-def-body { }
  .gif-def-text {
    font-size: 18px; line-height: 1.85; color: var(--gray);
    margin-bottom: 20px;
  }
  .gif-def-text strong { color: var(--white); font-weight: 600; }
  .gif-pullquote {
    border-left: 2px solid var(--gold);
    padding: 20px 28px;
    margin: 32px 0;
    background: rgba(34,197,94,0.05);
  }
  .gif-pullquote-text {
    font-family: 'Playfair Display', serif;
    font-size: 20px; line-height: 1.6;
    font-style: italic; color: var(--white);
  }

  /* WHAT THEY DO */
  .gif-section {
    padding: 64px 0 56px;
    border-bottom: 1px solid var(--line);
  }
  .gif-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 2.5vw, 32px);
    color: var(--white); margin-bottom: 36px;
  }
  .gif-section-title span { color: var(--gold); }
  .gif-cards {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--line);
    border: 1px solid var(--line);
  }
  .gif-card {
    background: var(--bg2);
    padding: 32px 28px;
  }
  .gif-card-num {
    font-family: 'Space Mono', monospace; font-size: 9px;
    letter-spacing: .3em; color: var(--gold);
    margin-bottom: 16px;
  }
  .gif-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px; color: var(--white);
    margin-bottom: 12px;
  }
  .gif-card-text { font-size: 15px; line-height: 1.75; color: var(--gray); }

  /* TERMS LIST */
  .gif-terms-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: var(--line);
    border: 1px solid var(--line);
  }
  .gif-term {
    background: var(--bg2); padding: 28px 32px;
  }
  .gif-term-name {
    font-family: 'Playfair Display', serif;
    font-size: 17px; color: var(--gold);
    margin-bottom: 8px;
  }
  .gif-term-desc { font-size: 14px; line-height: 1.7; color: var(--gray); }

  /* SAMUEL'S CONTEXT */
  .gif-context {
    padding: 64px 0 56px;
    border-bottom: 1px solid var(--line);
    display: grid; grid-template-columns: 1fr 2fr; gap: 60px;
    align-items: start;
  }
  .gif-context-side {
    display: flex; flex-direction: column; gap: 24px;
  }
  .gif-stat {
    border-top: 1px solid var(--line); padding-top: 20px;
  }
  .gif-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 40px; color: var(--gold);
    line-height: 1;
  }
  .gif-stat-label {
    font-size: 13px; color: var(--sub); letter-spacing: .05em;
    margin-top: 4px;
  }

  /* CTA */
  .gif-cta {
    padding: 80px 0 100px;
    text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 24px;
  }
  .gif-cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 3vw, 40px);
    color: var(--white);
  }
  .gif-cta-title em { font-style: italic; color: var(--gold); }
  .gif-cta-sub { font-size: 16px; color: var(--sub); max-width: 480px; line-height: 1.7; }
  .gif-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .gif-cta-btn {
    font-family: 'Space Mono', monospace; font-size: 10px;
    letter-spacing: .2em; text-transform: uppercase;
    padding: 14px 32px; background: var(--gold); color: #0a0a0a;
    text-decoration: none; transition: background .25s;
  }
  .gif-cta-btn:hover { background: var(--gold2); }
  .gif-cta-btn.ghost {
    background: transparent; color: var(--gold);
    border: 1px solid rgba(34,197,94,.35);
  }
  .gif-cta-btn.ghost:hover { background: rgba(34,197,94,.08); }

  /* JUNIOR PROGRAMME OFFICER SECTION */
  .gif-role-section {
    padding: 64px 0 56px;
    border-bottom: 1px solid var(--line);
  }
  .gif-role-header { display: flex; flex-direction: column; gap: 8px; margin-bottom: 44px; }
  .gif-role-eyebrow {
    font-family: 'Space Mono', monospace; font-size: 9px;
    letter-spacing: .3em; text-transform: uppercase; color: var(--gold);
  }
  .gif-role-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 2.5vw, 32px); color: var(--white);
  }
  .gif-role-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
  }
  .gif-role-col-title {
    font-family: 'Space Mono', monospace; font-size: 10px;
    letter-spacing: .22em; text-transform: uppercase; color: var(--gold);
    margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--line);
  }
  .gif-role-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .gif-role-list li {
    font-size: 14px; line-height: 1.75; color: var(--gray);
    padding-left: 16px; position: relative;
  }
  .gif-role-list li::before { content: '–'; position: absolute; left: 0; color: var(--gold); opacity: .7; }
  .gif-logistics-note {
    margin-top: 36px; padding: 22px 28px;
    border-left: 2px solid var(--gold); background: rgba(34,197,94,0.04);
  }
  .gif-logistics-text {
    font-family: 'Playfair Display', serif; font-size: 17px;
    font-style: italic; color: var(--gray); line-height: 1.7;
  }
  .gif-logistics-text strong { color: var(--white); font-style: normal; font-weight: 600; }

  @media (max-width: 900px) {
    .gif-nav { padding: 20px 24px; }
    .gif-hero { padding: 80px 24px 60px; }
    .gif-body { padding: 0 24px; }
    .gif-def, .gif-context { grid-template-columns: 1fr; gap: 32px; }
    .gif-cards { grid-template-columns: 1fr; }
    .gif-terms-grid { grid-template-columns: 1fr; }
    .gif-cta { padding: 60px 0 80px; }
    .gif-role-grid { grid-template-columns: 1fr; gap: 28px; }
  }

  @media (max-width: 640px) {
    .gif-hero {
      background: url('/mystorybackground.jpg') center/cover no-repeat;
      position: relative;
      min-height: 55vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center;
      padding: 120px 28px 60px;
      max-width: 100%;
    }
    .gif-hero::before {
      content: '';
      position: absolute; inset: 0;
      background: rgba(10,10,10,0.65);
      pointer-events: none;
    }
    .gif-hero > * { position: relative; z-index: 1; }
    .gif-hero-eyebrow { justify-content: center; }
    .gif-hero-lead { text-align: center; margin: 0 auto; }
  }

  /* Gold gradient text */
  .gif-nav-back, .gif-hero-eyebrow, .gif-hero-title em,
  .gif-def-label, .gif-card-num, .gif-section-title span,
  .gif-term-name, .gif-stat-num, .gif-cta-title em,
  .gif-role-eyebrow, .gif-role-col-title {
    background: var(--gold-gradient) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    color: transparent !important;
  }
`;

const responsibilities = [
  {
    num: "01",
    title: "Design Thinking Environments",
    text: "Creates conditions where diverse groups can think clearly together — structuring conversations, surfacing hidden assumptions, and guiding collective sense-making.",
  },
  {
    num: "02",
    title: "Unlock Collective Wisdom",
    text: "Draws out knowledge distributed across a group that no single individual holds alone — through dialogue, structured inquiry, and deliberate synthesis.",
  },
  {
    num: "03",
    title: "Navigate Complexity Together",
    text: "Leads groups through adaptive challenges that require coordinated action, helping teams move from fragmented perspectives to shared understanding.",
  },
  {
    num: "04",
    title: "Facilitate Strategic Alignment",
    text: "Bridges differences in value, priority, and perspective within leadership teams — aligning diverse stakeholders around common direction.",
  },
  {
    num: "05",
    title: "Cultivate Participatory Culture",
    text: "Builds systems and habits that sustain ongoing collective intelligence — beyond a single workshop or meeting — embedding collaboration into how an organisation functions.",
  },
  {
    num: "06",
    title: "Coach Groups as Systems",
    text: "Works not just with individuals but with the relational dynamics, patterns, and hidden structures that shape how a group thinks and decides.",
  },
];

const synonyms = [
  {
    name: "Collective Intelligence Practitioner",
    desc: "Focuses on harnessing the distributed knowledge within a group to produce insights and decisions superior to any individual contribution.",
  },
  {
    name: "Group Process Facilitator",
    desc: "Holds the process while the group holds the content — ensuring the conversation moves productively toward meaningful outcomes.",
  },
  {
    name: "Collaborative Systems Designer",
    desc: "Architects the structures, norms, and environments within which groups can operate at their cognitive best.",
  },
  {
    name: "Strategic Facilitator",
    desc: "Partners with executive and leadership teams on high-stakes decisions, helping align diverse voices into coherent strategy.",
  },
  {
    name: "Organisational Learning Facilitator",
    desc: "Embeds reflection, feedback loops, and co-learning into organisational life, turning everyday experience into institutional knowledge.",
  },
  {
    name: "Deliberative Process Designer",
    desc: "Structures deliberation so that groups engage honestly and rigorously with difficult questions — especially in governance and civic contexts.",
  },
];

export default function GroupIntelligenceFacilitatorPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="gif-page">

        {/* NAV */}
        <nav className="gif-nav">
          <Link href="/" className="gif-nav-back">← Back to Portfolio</Link>
          <Link href="/" className="gif-nav-logo">Samuel Kobina Gyasi</Link>
        </nav>

        {/* HERO */}
        <div className="gif-hero">
          <div className="gif-hero-eyebrow">Role & Practice</div>
          <h1 className="gif-hero-title">
            Group Intelligence<br /><em>Facilitator</em>
          </h1>
          <p className="gif-hero-lead">
            A Group Intelligence Facilitator is a practitioner who helps groups think, decide, and act together more effectively than they could alone — unlocking the collective intelligence that exists within any team, organisation, or community.
          </p>
        </div>

        <div className="gif-body">

          {/* DEFINITION */}
          <div className="gif-def">
            <div className="gif-def-label">What It Means</div>
            <div className="gif-def-body">
              <p className="gif-def-text">
                <strong>Group intelligence</strong> is the capacity of a collective — a team, a board, a community — to solve problems, generate ideas, and navigate complexity better than any of its members could individually. It is not the sum of individual intelligences; it is something that <em>emerges</em> from the quality of interaction between people.
              </p>
              <p className="gif-def-text">
                A <strong>Group Intelligence Facilitator</strong> is the practitioner who creates, holds, and cultivates the conditions for that emergence. They work at the intersection of cognitive science, systems thinking, dialogue design, and leadership development — bringing rigorous methodology to the fundamentally human challenge of thinking well together.
              </p>
              <div className="gif-pullquote">
                <p className="gif-pullquote-text">
                  &ldquo;The facilitator does not bring the answers. They bring the architecture within which a group discovers answers it could not have reached alone.&rdquo;
                </p>
              </div>
              <p className="gif-def-text">
                Unlike a consultant who provides expertise, or a coach who works with individuals, the Group Intelligence Facilitator&apos;s primary client is <strong>the group as a whole</strong> — its dynamics, its blindspots, its latent capacity for insight and aligned action.
              </p>
            </div>
          </div>

          {/* WHAT THEY DO */}
          <div className="gif-section">
            <h2 className="gif-section-title">What a Group Intelligence Facilitator <span>Does</span></h2>
            <div className="gif-cards">
              {responsibilities.map((r) => (
                <div key={r.num} className="gif-card">
                  <div className="gif-card-num">{r.num}</div>
                  <div className="gif-card-title">{r.title}</div>
                  <p className="gif-card-text">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SYNONYMS */}
          <div className="gif-section">
            <h2 className="gif-section-title">Other Terms for <span>This Practice</span></h2>
            <p style={{ color: 'var(--sub)', fontSize: '15px', marginBottom: '36px', lineHeight: '1.7' }}>
              The field is known by many names depending on context, tradition, and emphasis. Each term highlights a different facet of what is essentially the same practice.
            </p>
            <div className="gif-terms-grid">
              {synonyms.map((s) => (
                <div key={s.name} className="gif-term">
                  <div className="gif-term-name">{s.name}</div>
                  <p className="gif-term-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* JUNIOR PROGRAMME OFFICER */}
          <div className="gif-role-section">
            <div className="gif-role-header">
              <div className="gif-role-eyebrow">Current Role</div>
              <h2 className="gif-role-title">Junior Programme Officer — What I Do</h2>
            </div>
            <div className="gif-role-grid">
              <div className="gif-role-col">
                <div className="gif-role-col-title">Event Coordination</div>
                <ul className="gif-role-list">
                  <li>Collaborate with faculty to design agendas and coordinate with the operations officer for event logistics (SCI Talks, PhD mini-seminars, workshops, social gatherings, student activities, open days, etc.).</li>
                  <li>Build and maintain partnerships with other departments and student clubs to co-organise initiatives.</li>
                  <li>Support the communication partner in representing the school at job fairs and student-oriented events.</li>
                </ul>
              </div>
              <div className="gif-role-col">
                <div className="gif-role-col-title">Student Engagement &amp; Career Support</div>
                <ul className="gif-role-list">
                  <li>Welcome and guide new students during their first days on campus, in coordination with the student liaison team.</li>
                  <li>Assist students with internship and job application processes, including reviewing CVs and preparing for interviews.</li>
                  <li>Work closely with the Career Center to coordinate on-campus events and company visits.</li>
                </ul>
              </div>
              <div className="gif-role-col">
                <div className="gif-role-col-title">Communication &amp; Content</div>
                <ul className="gif-role-list">
                  <li>Implement internal and external communication strategies for the department.</li>
                  <li>Update content and maintain an active presence on Instagram, LinkedIn, and Spotify (for podcasts).</li>
                  <li>Produce and post multimedia content promoting student success stories, academic updates, and upcoming opportunities — in collaboration with the multimedia team.</li>
                </ul>
              </div>
            </div>
            <div className="gif-logistics-note">
              <p className="gif-logistics-text">
                I also manage the <strong>logistics of staff, guests, and students</strong> — ensuring people, spaces, and schedules align to create seamless experiences across all programme activities.
              </p>
            </div>
          </div>

          {/* SAMUEL'S CONTEXT */}
          <div className="gif-context">
            <div className="gif-context-side">
              <div className="gif-def-label" style={{ paddingTop: 0 }}>Samuel&apos;s Practice</div>
              <div className="gif-stat">
                <div className="gif-stat-num">15+</div>
                <div className="gif-stat-label">Years facilitating groups across sectors</div>
              </div>
              <div className="gif-stat">
                <div className="gif-stat-num">4</div>
                <div className="gif-stat-label">Continents of practice</div>
              </div>
              <div className="gif-stat">
                <div className="gif-stat-num">500+</div>
                <div className="gif-stat-label">Leaders and teams engaged</div>
              </div>
            </div>
            <div>
              <p className="gif-def-text">
                Samuel Kobina Gyasi has spent over fifteen years working at the intersection of leadership, organisational culture, and group dynamics. His work as a Group Intelligence Facilitator grows from a conviction that <strong>most organisations are dramatically underusing the collective intelligence already present in their people</strong>.
              </p>
              <p className="gif-def-text">
                Drawing on foundations in transformational leadership, data-informed decision-making, and values-driven practice, Samuel designs and holds spaces where leadership teams move from surface-level conversation to genuine strategic clarity — and from individual opinion to collective commitment.
              </p>
              <p className="gif-def-text">
                His practice spans executive team alignment, community deliberation, institutional strategy, and learning system design. He has worked with governments, universities, NGOs, and private sector organisations across Africa, Europe, and beyond.
              </p>
              <div className="gif-pullquote">
                <p className="gif-pullquote-text">
                  &ldquo;When a room full of people stops performing for each other and starts genuinely thinking together, something extraordinary becomes possible.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="gif-cta">
            <h2 className="gif-cta-title">Work with Samuel as your<br /><em>Group Intelligence Facilitator</em></h2>
            <p className="gif-cta-sub">Whether you are navigating a strategic pivot, building a new leadership team, or seeking to unlock what your organisation already knows — Samuel can help your group think better together.</p>
            <div className="gif-cta-btns">
              <Link href="/#connect" className="gif-cta-btn">Get in Touch →</Link>
              <Link href="/leadership" className="gif-cta-btn ghost">Leadership Profile →</Link>
            </div>
          </div>

        </div>
      </div>
      <SiteFooter />
    </>
  );
}
