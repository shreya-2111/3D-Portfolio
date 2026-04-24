"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { TbCube3dSphere, TbSparkles } from "react-icons/tb";
import MagneticButton from "../MagneticButton";
import { portfolioData } from "@/data/portfolio";

const HeroScene = dynamic(() => import("../HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#04050d]" />,
});

// Stagger variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Character-by-character headline
function SplitHeadline({ text }: { text: string }) {
  return (
    <span className="block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block will-change-transform ${char === " " ? "w-[0.32em]" : ""}`}
          initial={{ y: "110%", opacity: 0, rotateX: -60 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 + i * 0.022 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-clip bg-[#04050d]"
      style={{ isolation: "isolate", minHeight: "100vh", height: "100vh" }}
    >
      {/* Full-bleed 3D canvas — needs explicit height on parent to fill */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <HeroScene />
      </div>

      {/* Vignette so text stays readable */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(4,5,13,0.55) 100%), linear-gradient(to bottom, rgba(4,5,13,0.35) 0%, transparent 30%, transparent 70%, rgba(4,5,13,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-28 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-0"
        style={{ position: "relative", zIndex: 20, minHeight: "100vh" }}
      >        {/* Left — headline + CTA */}
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/72 backdrop-blur-xl"
          >
            <TbSparkles className="text-[var(--color-accent-2)]" />
            Motion. Story. Atmosphere.
          </motion.div>

          <h1 className="mt-8 text-5xl font-semibold leading-none tracking-[-0.08em] text-white sm:text-6xl lg:text-[6.75rem]">
            <SplitHeadline text={portfolioData.hero.name} />
          </h1>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="mt-6 max-w-2xl">
            <p className="text-lg font-medium uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
              {portfolioData.hero.title}
            </p>
            <p className="mt-5 text-2xl tracking-[-0.04em] text-white/95 md:text-3xl">
              {portfolioData.hero.tagline}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              {portfolioData.hero.intro}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#projects" label="View Work" />
            <MagneticButton href="#contact" label="Hire Me" variant="secondary" />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }} className="mt-14 flex flex-wrap gap-4">
            {portfolioData.hero.chips.map((item) => (
              <div
                key={item}
                className="glass-panel rounded-full px-5 py-3 text-xs uppercase tracking-[0.25em] text-white/75"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — snapshot card */}
        <motion.div
          className="lg:justify-self-end"
          variants={fadeIn}
          transition={{ duration: 0.9, ease: "easeOut" }}
          initial="hidden"
          animate="visible"
        >
          <div className="glass-panel aurora-border relative overflow-hidden rounded-[2rem] p-6 backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%,rgba(95,140,255,0.12))]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.4em] text-white/55">Creative Snapshot</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {portfolioData.hero.spotlight.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/45">{item.label}</p>
                    <p className="mt-3 text-xl font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                      {portfolioData.hero.availability.label}
                    </p>
                    <p className="mt-2 text-2xl font-medium text-white">
                      {portfolioData.hero.availability.value}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/8">
                    <TbCube3dSphere className="text-2xl text-[var(--color-accent-2)]" />
                  </div>
                </div>
                <div className="mt-6 h-px w-full bg-white/10" />
                <div className="mt-6 flex items-center justify-between text-sm text-[var(--color-muted)]">
                  {portfolioData.hero.availability.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.a
            href="#about"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            initial="hidden"
            animate="visible"
            className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-white/65 transition hover:text-white"
          >
            Scroll to discover
            <FiChevronDown className="animate-bounce text-[var(--color-accent-2)]" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
