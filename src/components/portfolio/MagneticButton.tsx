"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

type MagneticButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export default function MagneticButton({
  href,
  label,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.6 });

  const handleMove = useEffectEvent((event: PointerEvent) => {
    const element = ref.current;

    if (!element || shouldReduceMotion || window.innerWidth < 1024) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    x.set(offsetX * 0.18);
    y.set(offsetY * 0.18);
  });

  const resetPosition = useEffectEvent(() => {
    x.set(0);
    y.set(0);
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", resetPosition);

    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", resetPosition);
    };
  }, [shouldReduceMotion]);

  const className =
    variant === "primary"
      ? "border border-white/20 bg-white text-slate-950 shadow-[0_0_40px_rgba(255,255,255,0.18)]"
      : "border border-white/12 bg-white/6 text-white backdrop-blur-xl";

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-w-40 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-[0.2em] uppercase transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      {label}
      <FiArrowUpRight className="text-base" />
    </motion.a>
  );
}
