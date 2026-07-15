'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleEnter = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(() => router.push('/collections'), 650);
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 30);
      my.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mx, my]);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i, top: Math.random() * 100, left: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5, delay: Math.random() * 5, duration: Math.random() * 4 + 2,
  }));

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-gold"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.5, 1.8, 0.5] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute top-[10%] right-[8%] z-[1]"
      >
        <motion.div
          className="h-72 w-72 rounded-full md:h-96 md:w-96"
          style={{
            background: 'radial-gradient(circle at 35% 35%, hsl(var(--cream-50)), hsl(var(--gold) / 0.3) 50%, hsl(var(--brown) / 0.4))',
            boxShadow: '0 0 120px hsl(var(--gold) / 0.4), inset -30px -30px 80px hsl(var(--brown) / 0.35)',
          }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute left-[20%] top-[30%] h-8 w-8 rounded-full bg-brown/10" />
          <div className="absolute left-[55%] top-[50%] h-12 w-12 rounded-full bg-brown/10" />
          <div className="absolute left-[35%] top-[65%] h-6 w-6 rounded-full bg-brown/10" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[15] bg-brown-dark"
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(0% 0% 50% 0%)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 z-[15] bg-brown-dark"
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(50% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-light leading-none tracking-[0.05em] text-brown dark:text-cream md:text-[7rem] lg:text-[9rem]"
        >
          <span className="text-gradient-gold">LUNAR BLOOM</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-12"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <button
            onClick={handleEnter}
            data-cursor-label="enter"
            disabled={clicked}
            className="group relative inline-flex items-center justify-center"
          >
            {!clicked && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border border-gold/30"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-gold/20"
                  animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-gold/10"
                  animate={{ scale: [1, 2.1], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1, ease: 'easeOut' }}
                />
              </>
            )}

            {clicked && (
              <>
                {[...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-1 w-16 origin-left rounded-full bg-gold"
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ opacity: [1, 0], scale: [0, 2.2] }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    style={{ rotate: (i / 10) * 360 }}
                  />
                ))}
                <motion.span
                  className="absolute inset-0 rounded-full bg-gold/40"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />
              </>
            )}

            <motion.span
              animate={{
                scale: clicked ? [1, 1.15, 0.85] : hovering ? 1.08 : 1,
                opacity: clicked ? [1, 1, 0] : 1,
              }}
              transition={{ duration: clicked ? 0.65 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-12 py-5 text-sm font-medium uppercase tracking-[0.3em] text-brown-dark shadow-xl"
            >
              touch me please
            </motion.span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-8 text-[10px] uppercase tracking-[0.4em] text-brown/40 dark:text-cream/40"
        >
          by zaighum mujahid
        </motion.p>
      </div>
    </section>
  );
}