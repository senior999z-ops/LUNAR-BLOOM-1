'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [variant, setVariant] = useState<'default' | 'hover' | 'text'>('default');
  const [label, setLabel] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  const ringX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setVariant('hover');
        const link = target.closest('a, button');
        setLabel(link?.getAttribute('data-cursor-label') || '');
      } else if (target.closest('input, textarea, select')) {
        setVariant('text');
        setLabel('');
      } else {
        setVariant('default');
        setLabel('');
      }
    };
    const leave = () => setHidden(true);
    window.addEventListener('mousemove', move);
    document.body.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (isTouch) {
    return null;
  }

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: sx, y: sy }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: variant === 'hover' ? 0 : variant === 'text' ? 3 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: variant === 'hover' ? 2.5 : variant === 'text' ? 0.5 : 1,
          rotate: variant === 'hover' ? 45 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{
            borderColor: variant === 'hover' ? 'hsl(var(--gold))' : 'hsl(var(--gold) / 0.4)',
          }}
        >
          <div className="h-10 w-10 rounded-full border-2" />
        </motion.div>
      </motion.div>

      {/* Label that appears on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="ml-6 -translate-y-1/2 whitespace-nowrap rounded-full bg-brown-dark px-3 py-1 text-[9px] uppercase tracking-wider text-gold">
          {label}
        </span>
      </motion.div>
    </>
  );
}