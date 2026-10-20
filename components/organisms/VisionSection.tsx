import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";

export function VisionSection() {
  return (
    <section id="vision" className="portfolio-section vision-section">
      <div className="vision-bg-text" aria-hidden="true">TRANSFORM</div>
      <div className="section-inner">
        <SectionLabel dark>Mission</SectionLabel>

        <ScrollReveal className="vision-inner">
          <p className="vision-statement">
            I equip people through teaching, mentorship, and formation to<br />
            <strong>grow grounded in reality and science,</strong><br />
            sharpen their thinking, and<br />
            <strong>become leaders</strong><br />
            of clarity and purpose.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
