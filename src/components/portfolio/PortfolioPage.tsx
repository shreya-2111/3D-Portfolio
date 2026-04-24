"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorGlow from "./CursorGlow";
import LoadingScreen from "./LoadingScreen";
import PortfolioFooter from "./PortfolioFooter";
import PortfolioHeader from "./PortfolioHeader";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ExperienceSection from "./sections/ExperienceSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import ShowreelSection from "./sections/ShowreelSection";
import SkillsSection from "./sections/SkillsSection";
import TestimonialsSection from "./sections/TestimonialsSection";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1600);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || isLoading) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hero animations are handled by framer-motion in HeroSection

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [isLoading, shouldReduceMotion]);

  return (
    <>
      <AnimatePresence>{isLoading ? <LoadingScreen /> : null}</AnimatePresence>
      <CursorGlow />
      <PortfolioHeader />

      <motion.div
        ref={rootRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0.7 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative isolate overflow-hidden"
      >
        <div className="noise-overlay pointer-events-none fixed inset-0 -z-20" />
        <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(95,140,255,0.22),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(250,90,165,0.14),transparent_18%),linear-gradient(180deg,#04050d_0%,#070b1b_42%,#04050d_100%)]" />
        <div className="mesh-overlay pointer-events-none fixed inset-0 -z-10 opacity-40" />
        <div
          data-parallax
          className="pointer-events-none absolute left-[-12rem] top-40 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(107,120,255,0.2),transparent_72%)] blur-3xl"
        />
        <div
          data-parallax
          className="pointer-events-none absolute right-[-8rem] top-[52rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,77,151,0.16),transparent_70%)] blur-3xl"
        />
        <div
          data-parallax
          className="pointer-events-none absolute left-1/3 top-[120rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(89,231,255,0.16),transparent_72%)] blur-3xl"
        />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ShowreelSection />
          <ExperienceSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <PortfolioFooter />
      </motion.div>
    </>
  );
}
