'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center bg-brown-dark"
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Golden bloom burst */}
            <motion.div
              className="absolute"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 3, rotate: 180 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 300, height: 300,
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.4), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            {/* Petals expanding */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ scale: 1, x: Math.cos((i / 8) * Math.PI * 2) * 200, y: Math.sin((i / 8) * Math.PI * 2) * 200, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg width="30" height="60" viewBox="0 0 30 60" fill="none">
                  <ellipse cx="15" cy="30" rx="10" ry="25" fill="hsl(var(--gold) / 0.5)" />
                </svg>
              </motion.div>
            ))}
            {/* Center text */}
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1.2] }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="relative z-10 font-script text-5xl text-gold"
            >
              lunar bloom
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
