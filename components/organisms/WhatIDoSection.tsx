import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";

interface RoleArea {
  heading: string;
  bullets: string[];
}

interface Role {
  num: string;
  title: string;
  org: string;
  description?: string;
  areas?: RoleArea[];
}

const roles: Role[] = [
  {
    num: "01",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence · UM6P, Morocco",
    areas: [
      {
        heading: "Event Coordination",
        bullets: [
          "Collaborate with faculty to design agendas and coordinate logistics for SCI Talks, PhD mini-seminars, workshops, social gatherings, open days, and student activities.",
          "Build and maintain partnerships with other departments and student clubs to co-organise cross-institutional initiatives.",
          "Support the school's representation at job fairs and student-oriented events.",
        ],
      },
      {
        heading: "Student Engagement & Career Support",
        bullets: [
          "Welcome and guide new students during orientation, in coordination with the student liaison team.",
          "Assist students with internship and job applications — CV reviews, cover-letter feedback, and interview preparation.",
          "Partner with the Career Center to coordinate on-campus events and company visits.",
        ],
      },
      {
        heading: "Communication & Content",
        bullets: [
          "Implement internal and external communication strategies for the department.",
          "Maintain active presence on Instagram, LinkedIn, and Spotify (podcasts).",
          "Produce multimedia content promoting student success stories, academic updates, and upcoming opportunities in collaboration with the multimedia team.",
        ],
      },
      {
        heading: "Logistics",
        bullets: [
          "Oversee end-to-end logistics for students, events, staff, and guests — ensuring every experience runs with precision and care.",
        ],
      },
    ],
  },
  {
    num: "02",
    title: "Mentor",
    org: "Personal Ministry",
    description:
      "Walking alongside individuals navigating questions of purpose, leadership, and identity. Mentorship, for Samuel, is the most personal form of investment — giving what was once given to him.",
  },
  {
    num: "03",
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
            Technology. Leadership. Transformation. Each role Samuel holds is an expression of the same
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
                {role.areas ? (
                  <div className="wid-card-areas">
                    {role.areas.map((area) => (
                      <div key={area.heading} className="wid-area">
                        <div className="wid-area-heading">{area.heading}</div>
                        <ul className="wid-area-list">
                          {area.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="wid-card-body">{role.description}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
