"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { skillIcons } from "../portfolio-icons";
import { portfolioData } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-shell relative">
      <AmbientLayer variant="cyan" grid />
      <div className="relative" style={{ zIndex: 1 }}>
      <SectionHeading
        eyebrow="Toolkit"
        title="Built across the software stack behind standout motion."
        description="A flexible production workflow spanning compositing, 3D, editing, interface storytelling, and modern web animation."
        align="center"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioData.skills.map((skill) => {
          const Icon = skillIcons[skill.icon];

          return (
            <motion.div
              key={skill.name}
              data-reveal
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="glass-panel aurora-border group rounded-[2rem] p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-2xl text-[var(--color-accent-2)] transition group-hover:shadow-[0_0_30px_rgba(89,231,255,0.25)]">
                <Icon />
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.04em] text-white">{skill.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{skill.description}</p>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
