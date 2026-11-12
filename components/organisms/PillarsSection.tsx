import { SectionLabel } from "@/components/atoms/SectionLabel";
import { PillarCard } from "@/components/molecules/PillarCard";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";

const pillars = [
  {
    name: "Leadership",
    href: "/leadership",
    description:
      "I lead as a servant first, and my aim is to help others become leaders themselves. Since my first leadership role at ten, I have learned that people follow character more than position.",
  },
  {
    name: "Intellectuality",
    description:
      "I study how data science, AI, and groups of people can work together, and I value evidence and honest reasoning. I use technology as a tool to help people and institutions make better decisions.",
  },
  {
    name: "Transformation",
    description:
      "Lasting change starts with the person and spreads to the community. I help individuals and communities build the skills and habits they need in a fast-changing world.",
  },
];

export function PillarsSection() {
  return (
    <section id="pillars" className="portfolio-section pillars-section">
      <div className="section-inner">
        <SectionLabel>Principal Interests</SectionLabel>

        <ScrollReveal className="pillars-header">
          <h2 className="pillars-title">Three Principal Interests</h2>
          <p className="pillars-sub">
            These are the areas I study, teach, and work in.
          </p>
        </ScrollReveal>

        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <ScrollReveal key={pillar.name}>
              <PillarCard
                name={pillar.name}
                description={pillar.description}
                href={"href" in pillar ? pillar.href : undefined}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
