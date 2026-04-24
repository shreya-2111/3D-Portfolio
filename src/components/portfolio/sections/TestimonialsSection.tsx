"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { portfolioData } from "@/data/portfolio";

export default function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();
  const items = shouldReduceMotion
    ? portfolioData.testimonials
    : [...portfolioData.testimonials, ...portfolioData.testimonials];

  return (
    <section className="section-shell overflow-hidden">
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by teams that need ideas to land with energy and polish."
        description="Short words from collaborators who wanted visual work that feels elevated and delivers fast."
        align="center"
      />

      <div className="mt-14 overflow-hidden" data-reveal>
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={shouldReduceMotion ? undefined : { duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={`flex gap-6 ${shouldReduceMotion ? "flex-col md:flex-row" : "w-max"}`}
        >
          {items.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="glass-panel aurora-border w-[20rem] rounded-[2rem] p-6 md:w-[24rem]"
            >
              <p className="text-xl leading-9 tracking-[-0.03em] text-white">
                <span aria-hidden>&quot;</span>
                {testimonial.quote}
                <span aria-hidden>&quot;</span>
              </p>
              <div className="mt-8">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--color-accent-2)]">
                  {testimonial.name}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
