"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated grid background */}
      <motion.div
        animate={{
          y: [0, -100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(89,231,255,0.05)_1px,transparent_1px),linear-gradient(rgba(89,231,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
      />

      {/* Horizontal scan lines effect */}
      <motion.div
        animate={{
          opacity: [0.02, 0.08, 0.02],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(89,231,255,0.03)_0px,transparent_1px,transparent_2px)]"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(5,8,22,0.4)]" />

      {/* Corner accents */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-[#59e7ff] to-transparent"
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
        className="absolute top-0 right-0 h-px w-32 bg-gradient-to-l from-[#7ca7ff] to-transparent"
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="absolute bottom-0 left-0 h-px w-32 bg-gradient-to-r from-[#f85f9b] to-transparent"
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
        className="absolute bottom-0 right-0 h-px w-32 bg-gradient-to-l from-[#89a2ff] to-transparent"
      />

      {/* Vertical accent lines */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-[#59e7ff]/20 via-transparent to-transparent"
      />

      <motion.div
        animate={{
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#7ca7ff]/15 to-transparent"
      />
    </div>
  );
}
