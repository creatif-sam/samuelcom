"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const cards = [
  {
    num: "01",
    img: "/jpo.webp",
    alt: "Junior Program Officer",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence · UM6P, Morocco",
    body: "I design and coordinate programs on collective intelligence, and I guide students through career development, seminars, and projects with other institutions.",
  },
  {
    num: "02",
    img: "/group-intelligence-facilitator.webp",
    alt: "Group Intelligence Facilitator",
    title: "Group Intelligence Facilitator",
    org: "Practitioner",
    body: "I use the science of collective intelligence to help groups hear every view, work through complex problems, and reach decisions they all stand behind.",
  },
  {
    num: "03",
    img: "/personal-ministry.webp",
    alt: "Personal Ministry",
    title: "Mentor",
    org: "Personal Ministry",
    body: "I walk alongside people working through questions of purpose, leadership, and identity. It is my way of giving back what others once gave me.",
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
            Serving Through<br />
            <em>Three Roles</em>
          </h2>
          <p className="widc-sub">
            I lead programs, facilitate groups, and mentor people. All three come from one belief, that
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