'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream-100 dark:bg-[hsl(15_32%_8%)]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Moon glow */}
      <motion.div
        className="absolute h-64 w-64 rounded-full"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--gold) / 0.3), transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bloom particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{
            background: 'hsl(var(--gold) / 0.6)',
            boxShadow: '0 0 10px hsl(var(--gold))',
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 120,
            y: Math.sin((i / 8) * Math.PI * 2) * 120,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center"
      >
        <div className="mb-2 font-script text-2xl text-gold">Lunar Bloom</div>
        <h1 className="font-serif text-5xl font-light tracking-[0.3em] text-brown dark:text-cream md:text-7xl">
          LUNAR
        </h1>
        <h1 className="font-serif text-5xl font-light tracking-[0.3em] text-gradient-gold md:text-7xl">
          BLOOM
        </h1>
        <p className="mt-4 font-sans text-xs tracking-[0.4em] text-brown/60 dark:text-cream/60 uppercase">
          By Zaighum Mujahid
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="relative z-10 mt-12 h-px w-48 overflow-hidden bg-brown/10 dark:bg-cream/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
          style={{ width: `${progress}%` }}
        />
      </motion.div>
      <motion.p
        className="relative z-10 mt-3 font-sans text-[10px] tracking-[0.3em] text-brown/50 dark:text-cream/50 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {progress < 100 ? 'Blooming' : 'Welcome'}
      </motion.p>
    </motion.div>
  );
}
