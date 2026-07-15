'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[300] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)))',
      }}
    />
  );
}
