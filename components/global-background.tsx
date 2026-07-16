'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star { id: number; top: number; left: number; size: number; delay: number; duration: number; }
interface Petal { id: number; left: number; delay: number; duration: number; size: number; }

export function GlobalBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }))
    );
    setPetals(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: Math.random() * 10 + 15,
        size: Math.random() * 8 + 6,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 dark:from-[hsl(15_32%_8%)] dark:via-[hsl(15_30%_10%)] dark:to-[hsl(15_28%_6%)]" />

      {/* Moonlight glow */}
      <motion.div
        className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--gold) / 0.15), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 -left-40 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brown) / 0.12), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-gold"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.5, 1.2, 0.5] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{ left: `${p.left}%` }}
        >
          <motion.div
            style={{ width: p.size, height: p.size }}
            animate={{ y: ['-10vh', '110vh'], rotate: [0, 360, 720] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          >
            <div
              className="h-full w-full rounded-full opacity-30"
              style={{
                background:
                  'radial-gradient(circle, hsl(var(--gold) / 0.4), transparent)',
                filter: 'blur(2px)',
              }}
            />
          </motion.div>
        </div>
      ))}

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
    </div>
  );
}