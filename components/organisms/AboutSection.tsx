"use client";

import { useEffect, useRef } from "react";

const timelineEntries = [
  {
    year: "The Beginning",
    title: "Early Formation",
    body: "Born and raised in Mpohor, Ghana, Samuel's earliest formation came through a strong sense of community, the discipline of craftwork, and a conviction that every life carries purpose. These foundations — integrity, service, and curiosity — never left him.",
  },
  {
    year: "The Formation",
    title: "Education & Early Leadership",
    body: "Samuel pursued academic and leadership development with the same intentionality he brought to every endeavour. Early in his journey he began understanding that knowledge without service is incomplete — a lesson that would shape every season ahead.",
  },
  {
    year: "The Field",
    title: "Fifteen Years of Practice",
    body: "Over fifteen years, Samuel worked across sectors — education, governance, civil society, and the private sector — facilitating groups, building leadership culture, and contributing to institutional transformation across Africa and beyond.",
  },
  {
    year: "2023 – 2025",
    title: "Master's in Collective Intelligence",
    body: "At UM6P — University Mohammed VI Polytechnic in Morocco — Samuel completed a rigorous Master's programme in Collective Intelligence, fusing his leadership experience with data science, organisational theory, and systems thinking.",
  },
  {
    year: "Now",
    title: "School of Collective Intelligence",
    body: "Today Samuel serves as Junior Program Officer at the School of Collective Intelligence, UM6P — designing programmes, facilitating strategic learning, and working to unlock the potential already present in people, teams, and institutions.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const entries = sectionRef.current?.querySelectorAll<HTMLElement>(".tl-entry");
    if (!entries) return;

    const observer = new IntersectionObserver(
      (obs) => {
        obs.forEach((o) => {
          if (o.isIntersecting) {
            (o.target as HTMLElement).classList.add("tl-visible");
            observer.unobserve(o.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    entries.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="my-story" className="about-section about-timeline-section">
      <div className="tl-inner" ref={sectionRef}>

        <div className="tl-header">
          <span className="tl-eyebrow">My Story</span>
          <h2 className="tl-main-title">
            A Life <em>Built</em> on Purpose,{" "}
            <span>Excellence &amp; Collective Growth</span>
          </h2>
        </div>

        <div className="tl-track">
          <div className="tl-spine" aria-hidden="true" />

          {timelineEntries.map((entry, i) => (
            <div
              key={i}
              className="tl-entry"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="tl-dot" aria-hidden="true">
                <div className="tl-dot-inner" />
              </div>

              <div className="tl-content">
                <div className="tl-year">{entry.year}</div>
                <h3 className="tl-title">{entry.title}</h3>
                <p className="tl-body">{entry.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="tl-quote-wrap">
          <blockquote className="tl-quote">
            &ldquo;For I know the plans I have for you,&rdquo; declares the Lord,
            &ldquo;plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
            <cite>— Jeremiah 29:11</cite>
          </blockquote>
        </div>

      </div>
    </section>
  );
}
