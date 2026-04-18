"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const cards = [
  {
    num: "01",
    img: "/JPO.png",
    alt: "Junior Program Officer",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence · UM6P, Morocco",
    body: "Designing and coordinating programs that unlock collective intelligence — guiding students through career development, seminars, and cross-institutional initiatives.",
  },
  {
    num: "02",
    img: "/PersonalMinistry.png",
    alt: "Personal Ministry",
    title: "Mentor",
    org: "Personal Ministry",
    body: "Walking alongside individuals navigating questions of purpose, leadership, and identity. A personal investment in others — giving back what was once given to me.",
  },
  {
    num: "03",
    img: "/Group Intelligence faci.png",
    alt: "Group Intelligence Facilitator",
    title: "Group Intelligence Facilitator",
    org: "Practitioner",
    body: "Applying the science of collective intelligence to help groups surface diverse perspectives, resolve complexity, and make decisions that reflect shared wisdom.",
  },
];

export function WhatIDoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(".widc-card");
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("widc-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="what-i-do" className="widc-section" ref={sectionRef}>
      <div className="widc-inner">

        {/* Header */}
        <div className="widc-header">
          <p className="widc-label">What I Do</p>
          <h2 className="widc-title">
            Serving Across<br />
            <em>Three Spheres</em>
          </h2>
          <p className="widc-sub">
            Technology. Leadership. Transformation. Each role is an expression of the same conviction:
            a life worth living is one shared in service to others.
          </p>
        </div>

        {/* Cards */}
        <div className="widc-grid">
          {cards.map((card, i) => (
            <article
              key={card.num}
              className="widc-card"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Photo */}
              <div className="widc-photo-wrap">
                <Image
                  src={card.img}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="widc-photo"
                />
                <div className="widc-photo-overlay" />
                <span className="widc-num">{card.num}</span>
              </div>

              {/* Content */}
              <div className="widc-content">
                <p className="widc-org">{card.org}</p>
                <h3 className="widc-card-title">{card.title}</h3>
                <p className="widc-card-body">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}