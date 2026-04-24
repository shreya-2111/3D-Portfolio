"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function MotionTrails() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const springY = useSpring(mouseY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Create parallax transforms for multiple trail elements
  const trail1X = useTransform(springX, (x) => x * 0.15);
  const trail1Y = useTransform(springY, (y) => y * 0.15);

  const trail2X = useTransform(springX, (x) => x * 0.08);
  const trail2Y = useTransform(springY, (y) => y * 0.08);

  const trail3X = useTransform(springX, (x) => x * 0.05);
  const trail3Y = useTransform(springY, (y) => y * 0.05);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Trail 1 - Closest to cursor */}
      <motion.div
        style={{ x: trail1X, y: trail1Y }}
        className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-r from-[#59e7ff]/20 to-[#7ca7ff]/10 blur-3xl"
      />

      {/* Trail 2 - Mid parallax */}
      <motion.div
        style={{ x: trail2X, y: trail2Y }}
        className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-[#f85f9b]/15 via-transparent to-[#5a7bff]/10 blur-3xl"
      />

      {/* Trail 3 - Subtle background */}
      <motion.div
        style={{ x: trail3X, y: trail3Y }}
        className="absolute right-0 bottom-1/3 h-96 w-96 rounded-full bg-gradient-to-l from-[#89a2ff]/10 to-transparent blur-3xl"
      />

      {/* Animated geometric accents */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 right-1/4 h-1 w-1 rounded-full bg-[#59e7ff]/60"
      />

      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [360, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 left-1/4 h-1 w-1 rounded-full bg-[#f85f9b]/60"
      />

      <motion.div
        animate={{
          x: [0, 15, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/3 right-1/3 h-1 w-1 rounded-full bg-[#7ca7ff]/60"
      />

      {/* Pulsing accent rings */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/3 h-32 w-32 rounded-full border border-[#59e7ff]/40"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.05, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full border border-[#f85f9b]/30"
      />

      {/* Connecting lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ mixBlendMode: "screen" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#59e7ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7ca7ff" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <motion.line
          x1="20%"
          y1="30%"
          x2="80%"
          y2="70%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.line
          x1="80%"
          y1="30%"
          x2="20%"
          y2="70%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>
    </div>
  );
}
