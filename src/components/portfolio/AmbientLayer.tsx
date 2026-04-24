"use client";

/**
 * AmbientLayer — pure CSS + framer-motion ambient background elements.
 * Used in non-hero sections to add depth without a second WebGL context.
 * Drop inside any section as a sibling to content (pointer-events-none).
 */

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  /** Accent hue variant */
  variant?: "blue" | "pink" | "cyan";
  /** Whether to show the grid overlay */
  grid?: boolean;
}

const ORBS: Record<
  NonNullable<Props["variant"]>,
  { color: string; color2: string }
> = {
  blue: { color: "rgba(107,120,255,0.18)", color2: "rgba(89,231,255,0.10)" },
  pink: { color: "rgba(248,95,155,0.16)", color2: "rgba(124,167,255,0.10)" },
  cyan: { color: "rgba(89,231,255,0.16)", color2: "rgba(107,120,255,0.10)" },
};

export default function AmbientLayer({ variant = "blue", grid = false }: Props) {
  const reduced = useReducedMotion();
  const { color, color2 } = ORBS[variant];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Primary glow orb */}
      <motion.div
        animate={reduced ? {} : {
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-8%",
          width: "55%",
          height: "55%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Secondary glow orb */}
      <motion.div
        animate={reduced ? {} : {
          x: [0, -25, 18, 0],
          y: [0, 18, -12, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color2}, transparent 70%)`,
          filter: "blur(55px)",
        }}
      />

      {/* Floating geometric accent — top right */}
      <motion.div
        animate={reduced ? {} : {
          rotate: [0, 360],
          y: [0, -12, 0],
        }}
        transition={{
          rotate: { duration: 28, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute",
          top: "8%",
          right: "6%",
          width: 64,
          height: 64,
          border: "1px solid rgba(89,231,255,0.18)",
          borderRadius: "12px",
          transform: "rotate(15deg)",
        }}
      />

      {/* Floating geometric accent — bottom left */}
      <motion.div
        animate={reduced ? {} : {
          rotate: [0, -360],
          y: [0, 10, 0],
        }}
        transition={{
          rotate: { duration: 34, repeat: Infinity, ease: "linear" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "4%",
          width: 44,
          height: 44,
          border: "1px solid rgba(124,167,255,0.15)",
          borderRadius: "50%",
        }}
      />

      {/* Horizontal scan line */}
      <motion.div
        animate={reduced ? {} : { opacity: [0.03, 0.09, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(89,231,255,0.025) 0px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Optional grid */}
      {grid && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
      )}

      {/* Corner accent lines */}
      <motion.div
        animate={reduced ? {} : { opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 120,
          height: 1,
          background: "linear-gradient(to right, #59e7ff, transparent)",
        }}
      />
      <motion.div
        animate={reduced ? {} : { opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 120,
          height: 1,
          background: "linear-gradient(to left, #7ca7ff, transparent)",
        }}
      />
    </div>
  );
}
