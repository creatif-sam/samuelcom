import { SectionLabel } from "@/components/atoms/SectionLabel";
import { PillarCard } from "@/components/molecules/PillarCard";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";

const pillars = [
  {
    icon: "▲",
    name: "Leadership",
    href: "/leadership",
    description:
      "Samuel leads as a servant first — inspiring, empowering, and calling forth greatness in others. Over fifteen years of practice, he has come to understand that true authority is born of character, not position, and that the highest form of leadership is one that multiplies leaders.",
  },
  {
    icon: "◆",
    name: "Intelligence",
    href: "/intellectuality",
    description:
      "Samuel pursues deep thinking, rigorous study, and intellectual honesty. He specialises in collective intelligence — the science of how groups think, decide, and innovate together — and brings that rigour into every programme, research project, and advisory conversation.",
  },
  {
    icon: "⬡",
    name: "Technology",
    href: "/intellectuality",
    description:
      "At the intersection of data science, AI, and human systems, Samuel builds tools and frameworks that help organisations make better decisions. Technology, for Samuel, is not an end — it is a lever for human flourishing and systemic change.",
  },
  {
    icon: "◎",
    name: "Transformation",
    href: "/transformation",
    description:
      "Change that lasts begins from within and works outward. Samuel is a catalyst — carrying a vision for individuals, communities, and nations to be renewed, elevated, and equipped to meet the challenges of a rapidly shifting world.",
  },
];

export function PillarsSection() {
  return (
    <section id="pillars" className="portfolio-section pillars-section">
      <div className="section-inner">
        <SectionLabel>Principal Interests</SectionLabel>

        <ScrollReveal className="pillars-header">
          <h2 className="pillars-title">Four Principal Interests</h2>
          <p className="pillars-sub">
            Each interest is a commitment — to excellence, to rigorous thinking, and to the
            flourishing of humanity.
          </p>
        </ScrollReveal>

        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <ScrollReveal key={pillar.name}>
              <PillarCard
                icon={pillar.icon}
                name={pillar.name}
                href={pillar.href}
                description={pillar.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
