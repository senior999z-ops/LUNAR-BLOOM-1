'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? theme === 'dark' : true;

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
    setMounted(true);
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

  const [farStars, setFarStars] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number; duration: number }>>([]);
  const [nearStars, setNearStars] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number; duration: number }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ id: number; top: number; left: number; delay: number }>>([]);
  const [clouds, setClouds] = useState<Array<{ id: number; top: number; left: number; scale: number; duration: number }>>([]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setFarStars(
      Array.from({ length: mobile ? 40 : 90 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 1.2 + 0.4, delay: Math.random() * 5, duration: Math.random() * 4 + 3,
      }))
    );
    setNearStars(
      Array.from({ length: mobile ? 20 : 45 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 2.5 + 1.2, delay: Math.random() * 5, duration: Math.random() * 3 + 2,
      }))
    );
    setShootingStars(
      Array.from({ length: mobile ? 2 : 4 }, (_, i) => ({
        id: i, top: Math.random() * 40, left: Math.random() * 60,
        delay: i * 4 + Math.random() * 3,
      }))
    );
    setClouds(
      Array.from({ length: mobile ? 3 : 5 }, (_, i) => ({
        id: i, top: 10 + Math.random() * 50, left: Math.random() * 100,
        scale: Math.random() * 0.6 + 0.7, duration: Math.random() * 40 + 60,
      }))
    );
  }, []);

  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-100))' }}
    >
      {/* NIGHT: galaxy nebula swirl */}
      {isDark && (
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 30% 20%, hsl(280 40% 30% / 0.35), transparent 60%), radial-gradient(ellipse 70% 50% at 75% 70%, hsl(45 65% 35% / 0.3), transparent 60%), radial-gradient(ellipse 60% 60% at 50% 100%, hsl(15 40% 20% / 0.5), transparent 70%)',
          }}
          animate={{ opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* DAY: soft sky gradient + drifting clouds + light sparkles */}
      {!isDark && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, hsl(45 75% 85%), hsl(35 65% 88%) 55%, hsl(30 47% 90%))',
            }}
          />
          {clouds.map((c) => (
            <motion.div
              key={c.id}
              className="absolute opacity-80"
              style={{
                top: `${c.top}%`,
                width: 200 * c.scale,
                height: 70 * c.scale,
              }}
              initial={{ left: `${c.left}%` }}
              animate={{ left: ['-25%', '125%'] }}
              transition={{ duration: c.duration, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute h-full w-full rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, hsl(0 0% 100% / 0.95), hsl(40 50% 92% / 0.5) 60%, transparent 80%)',
                  filter: 'blur(4px)',
                }}
              />
              <div
                className="absolute left-[15%] top-[10%] h-[70%] w-[55%] rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, hsl(0 0% 100% / 0.9), transparent 75%)',
                  filter: 'blur(3px)',
                }}
              />
            </motion.div>
          ))}

          {/* Golden light sparkles drifting up, like dust in sunlight */}
          {nearStars.slice(0, 24).map((s) => (
            <motion.div
              key={`sparkle-${s.id}`}
              className="absolute rounded-full bg-gold"
              style={{ top: `${s.top}%`, left: `${s.left}%`, width: Math.max(s.size, 1.5), height: Math.max(s.size, 1.5) }}
              animate={{ opacity: [0, 0.7, 0], y: [0, -30, -60] }}
              transition={{ duration: s.duration + 3, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}

      {/* NIGHT: star layers */}
      {isDark && (
        <>
          <div className="absolute inset-0">
            {farStars.map((s) => (
              <motion.div
                key={`far-${s.id}`}
                className="absolute rounded-full bg-cream-50"
                style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
                animate={{ opacity: [0.05, 0.5, 0.05] }}
                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div className="absolute inset-0">
            {nearStars.map((s) => (
              <motion.div
                key={`near-${s.id}`}
                className="absolute rounded-full bg-gold"
                style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
                animate={{ opacity: [0.15, 0.95, 0.15], scale: [0.6, 1.8, 0.6] }}
                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div className="absolute inset-0 hidden lg:block">
            {shootingStars.map((s) => (
              <motion.div
                key={`shoot-${s.id}`}
                className="absolute h-px w-24 bg-gradient-to-r from-transparent via-cream-50 to-transparent"
                style={{ top: `${s.top}%`, left: `${s.left}%`, rotate: '25deg' }}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: [0, 1, 0], x: [0, 260] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 6, delay: s.delay, ease: 'easeOut' }}
              />
            ))}
          </div>
        </>
      )}

      {/* Moon (night) / Sun (day) */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute top-[10%] right-[8%] z-[1]"
      >
        {isDark ? (
          <motion.div
            className="relative h-72 w-72 rounded-full md:h-96 md:w-96"
            style={{
              background: 'radial-gradient(circle at 35% 35%, hsl(var(--cream-50)), hsl(var(--gold) / 0.3) 50%, hsl(var(--brown) / 0.4))',
              boxShadow: '0 0 140px hsl(var(--gold) / 0.45), 0 0 60px hsl(var(--gold) / 0.3), inset -30px -30px 80px hsl(var(--brown) / 0.35)',
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute left-[20%] top-[30%] h-8 w-8 rounded-full bg-brown/10" />
            <div className="absolute left-[55%] top-[50%] h-12 w-12 rounded-full bg-brown/10" />
            <div className="absolute left-[35%] top-[65%] h-6 w-6 rounded-full bg-brown/10" />
            <motion.div
              className="absolute -inset-6 rounded-full border border-gold/10"
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        ) : (
          <>
            {/* Rotating rays behind the sun */}
            <motion.div
              className="absolute left-1/2 top-1/2 -z-[1] h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-40"
              style={{
                background:
                  'repeating-conic-gradient(hsl(45 85% 70% / 0.5) 0deg 4deg, transparent 4deg 18deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="h-56 w-56 rounded-full md:h-72 md:w-72"
              style={{
                background: 'radial-gradient(circle at 35% 35%, hsl(45 90% 90%), hsl(45 85% 65%) 55%, hsl(35 75% 55%))',
                boxShadow: '0 0 100px hsl(45 85% 65% / 0.6), 0 0 200px hsl(45 85% 65% / 0.3)',
              }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </motion.div>

      {/* Light / Dark toggle */}
      {mounted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          data-cursor-label="theme"
          className="fixed right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full glass-strong text-gold"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.button>
      )}

      {/* Veil split open */}
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ backgroundColor: isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-100))' }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(0% 0% 100% 0%)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ backgroundColor: isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-100))' }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(100% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ONLY: LUNAR BLOOM + TOUCH ME PLEASE button */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-light leading-none tracking-[0.05em] md:text-[7rem] lg:text-[9rem]"
          style={{ color: isDark ? 'hsl(var(--cream))' : 'hsl(var(--brown-dark))' }}
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
          className="mt-8 text-[10px] uppercase tracking-[0.4em]"
          style={{ color: isDark ? 'hsl(var(--cream) / 0.5)' : 'hsl(var(--brown) / 0.5)' }}
        >
          by zaighum mujahid
        </motion.p>
      </div>
    </section>
  );
}