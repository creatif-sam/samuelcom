import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";

export function AboutSection() {
  return (
    <section id="about" className="portfolio-section about-section">
      <div className="section-inner">
        <SectionLabel dark>About Samuel</SectionLabel>

        <div className="about-grid">
          <ScrollReveal>
            <h2 className="about-headline">
              A Man <em>Built</em> on the Word &amp; <em>Moved</em> by Purpose
            </h2>
            <blockquote className="about-quote">
              &ldquo;For I know the plans I have for you,&rdquo; declares the Lord, &ldquo;plans
              to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
              <cite>— Jeremiah 29:11</cite>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal className="about-body" delay="0.2s">
            <p>
              Samuel Gyasi is a thinker, leader, and servant of God whose life is anchored in
              the timeless truths of Scripture. Having completed his Master’s in Collective
              Intelligence at UM6P in 2025, he now serves as a Junior Program Officer at the
              School of Collective Intelligence, University Mohammed VI Polytechnic in Morocco.
            </p>
            <p>
              Guided by Biblical wisdom, Samuel approaches every sphere of life — intellectual
              discourse, organizational leadership, and personal growth — as sacred ground where
              faith meets action.
            </p>
            <p>
              He believes that genuine transformation begins within, shaped by the Spirit, and
              radiates outward to communities, institutions, and generations yet unborn.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
