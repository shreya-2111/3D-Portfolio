"use client";

import { useEffect, useEffectEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-240);
  const y = useMotionValue(-240);
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });

  const handlePointerMove = useEffectEvent((event: PointerEvent) => {
    x.set(event.clientX - 160);
    y.set(event.clientY - 160);
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-20 hidden h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(95,140,255,0.24)_0%,rgba(95,140,255,0.12)_24%,rgba(95,140,255,0.03)_48%,rgba(95,140,255,0)_72%)] blur-3xl lg:block"
    />
  );
}
