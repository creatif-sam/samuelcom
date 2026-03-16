import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";

const roles = [
  {
    num: "01",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence · UM6P, Morocco",
    description:
      "Designing and facilitating learning programmes that unlock the collective intelligence already present in organisations, communities, and teams. Samuel bridges data science, facilitation practice, and organisational theory to help groups think, decide, and grow together.",
  },
  {
    num: "02",
    title: "Elder & Church Leader",
    org: "Eglise Évangélique Au Maroc",
    description:
      "Serving as a church elder with responsibility for spiritual formation, pastoral care, and community accountability. Samuel leads the intercession team and the library team — two pillars that hold together a congregation's life of prayer and love of learning.",
  },
  {
    num: "03",
    title: "Mentor",
    org: "Personal Ministry",
    description:
      "Quietly and faithfully walking alongside individuals navigating questions of faith, purpose, leadership, and identity. Mentorship, for Samuel, is the most personal form of investment — giving what was once given to him.",
  },
  {
    num: "04",
    title: "Group Intelligence Facilitator",
    org: "Researcher & Practitioner",
    description:
      "Applying the science of collective intelligence in real-world contexts — helping groups surface diverse perspectives, resolve complexity, and make decisions that reflect more than any single mind could produce alone.",
  },
];

export function WhatIDoSection() {
  return (
    <section id="what-i-do" className="portfolio-section what-i-do-section">
      <div className="section-inner">
        <SectionLabel>What I Do</SectionLabel>

        <ScrollReveal className="wid-header">
          <h2 className="wid-title">Serving Across<br /><em>Three Spheres</em></h2>
          <p className="wid-sub">
            Faith. Knowledge. Transformation. Each role Samuel holds is an expression of the same
            conviction: that a life worth living is one poured out in service to others.
          </p>
        </ScrollReveal>

        <div className="wid-grid">
          {roles.map((role, i) => (
            <ScrollReveal key={role.num} delay={`${i * 0.1}s`}>
              <div className="wid-card">
                <div className="wid-card-num">{role.num}</div>
                <h3 className="wid-card-title">{role.title}</h3>
                <div className="wid-card-org">{role.org}</div>
                <p className="wid-card-body">{role.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
