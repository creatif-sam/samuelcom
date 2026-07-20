import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";

export function VisionSection() {
  return (
    <section id="vision" className="portfolio-section vision-section">
      <div className="vision-bg-text" aria-hidden="true">TRANSFORM</div>
      <div className="section-inner">
        <SectionLabel dark>Vision &amp; Mission</SectionLabel>

        <ScrollReveal className="vision-inner">
          <p className="vision-statement">
            To build a world where people are<br />
            <strong>purposefully grounded,</strong><br />
            intellectually alive, and<br />
            <strong>transformed to lead</strong><br />
            with clarity and purpose.
          </p>

          <div className="mission-divider" aria-hidden="true" />

          <div className="mission-block">
            <span className="mission-label">Mission</span>
            <p className="mission-statement">
              I equip people through teaching, mentorship, and formation to
              grow grounded in truth, sharpen their thinking, and become
              leaders of clarity and purpose.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
