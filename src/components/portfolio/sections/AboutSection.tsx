import AnimatedCounter from "../AnimatedCounter";
import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { portfolioData } from "@/data/portfolio";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell relative">
      <AmbientLayer variant="blue" grid />
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="About"
            title="Motion direction with strategy, atmosphere, and emotional precision."
            description={portfolioData.about.bio}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {portfolioData.about.stats.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
        <div className="mt-8 max-w-3xl text-base leading-8 text-[var(--color-muted)]" data-reveal>
          {portfolioData.about.description}
        </div>
      </div>
    </section>
  );
}
