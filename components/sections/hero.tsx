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
      mx.set((e.clientX / window.innerWidth - 0.5) * 20);
      my.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mx, my]);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Jewel-tone palette used throughout — rose, gold, plum, teal
  const colors = ['hsl(340 70% 62%)', 'hsl(45 85% 55%)', 'hsl(280 45% 55%)', 'hsl(170 55% 42%)', 'hsl(15 75% 58%)'];

  const [dust, setDust] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number; duration: number; color: string }>>([]);
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; color: string; size: number }>>([]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setDust(
      Array.from({ length: mobile ? 20 : 45 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 2.5 + 1, delay: Math.random() * 6, duration: Math.random() * 5 + 4,
        color: colors[i % colors.length],
      }))
    );
    setPetals(
      Array.from({ length: mobile ? 6 : 14 }, (_, i) => ({
        id: i, left: Math.random() * 92 + 4,
        delay: i * 2.5 + Math.random() * 3, duration: Math.random() * 8 + 12,
        color: colors[i % colors.length],
        size: Math.random() * 6 + 10,
      }))
    );
  }, []);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Rich, colorful gradient wash */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 90% 70% at 20% 10%, hsl(280 45% 22% / 0.7), transparent 55%), radial-gradient(ellipse 80% 70% at 85% 15%, hsl(340 55% 25% / 0.6), transparent 55%), radial-gradient(ellipse 90% 80% at 50% 100%, hsl(45 60% 20% / 0.6), transparent 60%), hsl(var(--brown-dark))'
            : 'radial-gradient(ellipse 90% 70% at 15% 10%, hsl(340 75% 88%), transparent 55%), radial-gradient(ellipse 80% 70% at 85% 15%, hsl(45 85% 85%), transparent 55%), radial-gradient(ellipse 90% 80% at 50% 100%, hsl(170 45% 88%), transparent 60%), hsl(var(--cream-100))',
        }}
      />

      {/* Animated color wash breathing over time */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: isDark
            ? [
                'radial-gradient(circle at 30% 30%, hsl(340 55% 30% / 0.35), transparent 50%)',
                'radial-gradient(circle at 70% 60%, hsl(280 45% 30% / 0.35), transparent 50%)',
                'radial-gradient(circle at 40% 70%, hsl(45 65% 30% / 0.35), transparent 50%)',
                'radial-gradient(circle at 30% 30%, hsl(340 55% 30% / 0.35), transparent 50%)',
              ]
            : [
                'radial-gradient(circle at 30% 30%, hsl(340 80% 88% / 0.6), transparent 50%)',
                'radial-gradient(circle at 70% 60%, hsl(280 60% 90% / 0.6), transparent 50%)',
                'radial-gradient(circle at 40% 70%, hsl(45 85% 85% / 0.6), transparent 50%)',
                'radial-gradient(circle at 30% 30%, hsl(340 80% 88% / 0.6), transparent 50%)',
              ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Colorful sparkling dust */}
      <div className="pointer-events-none absolute inset-0">
        {dust.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size, backgroundColor: d.color }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Colorful falling petals — rose, gold, plum, teal */}
      <div className="pointer-events-none absolute inset-0">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute -top-10"
            style={{ left: `${p.left}%` }}
            animate={{ y: ['0vh', '110vh'], x: [0, 30, -20, 15, 0], rotate: [0, 220, 400] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          >
            <div
              style={{
                width: p.size,
                height: p.size * 1.3,
                background: `linear-gradient(135deg, ${p.color}, transparent)`,
                borderRadius: '100% 0 100% 0',
                opacity: 0.75,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Colorful ornamental corner frame */}
      <div className="pointer-events-none absolute inset-6 md:inset-10">
        {[
          { pos: 'top-0 left-0 border-t border-l', color: colors[0] },
          { pos: 'top-0 right-0 border-t border-r', color: colors[1] },
          { pos: 'bottom-0 left-0 border-b border-l', color: colors[2] },
          { pos: 'bottom-0 right-0 border-b border-r', color: colors[3] },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ delay: 1.8 + i * 0.1, duration: 1 }}
            className={`absolute h-12 w-12 md:h-16 md:w-16 ${c.pos}`}
            style={{ borderColor: c.color, borderWidth: 1.5, opacity: 0.6 }}
          />
        ))}
      </div>

      {/* Vibrant multi-color emblem, orbiting jewel dots */}
      <motion.div style={{ x: sx, y: sy }} className="absolute top-[12%] z-[1] md:right-[10%]">
        <motion.svg
          viewBox="0 0 200 200"
          className="h-44 w-44 md:h-60 md:w-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="33%" stopColor={colors[1]} />
              <stop offset="66%" stopColor={colors[2]} />
              <stop offset="100%" stopColor={colors[3]} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#ringGrad)" strokeWidth="2" opacity="0.55" />
          {colors.map((c, i) => {
            const angle = (i / colors.length) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={100 + Math.cos(angle) * 88}
                cy={100 + Math.sin(angle) * 88}
                r="4"
                fill={c}
              />
            );
          })}
        </motion.svg>

        <motion.div
          className="absolute inset-0 m-auto flex h-28 w-28 items-center justify-center rounded-full md:h-40 md:w-40"
          style={{
            background: `conic-gradient(from 0deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]}, ${colors[4]}, ${colors[0]})`,
            opacity: 0.25,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: `radial-gradient(circle, ${colors[0]}, transparent 70%)`, filter: 'blur(24px)' }}
        />
      </motion.div>

      {/* Light / Dark toggle */}
      {mounted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          data-cursor-label="theme"
          className="fixed right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
          style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, color: 'white' }}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.button>
      )}

      {/* Veil split open */}
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ background: isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-100))' }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(0% 0% 100% 0%)' } : {}}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ background: isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-100))' }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(100% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={revealed ? { opacity: 1, width: 80 } : {}}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-3 text-[11px] font-medium uppercase tracking-[0.5em]"
          style={{ color: colors[0] }}
        >
          Est. Lahore, Pakistan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-light leading-none tracking-[0.05em] md:text-[6.5rem] lg:text-[8rem]"
        >
          <motion.span
            style={{
              backgroundImage: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]}, ${colors[0]})`,
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
            animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            LUNAR BLOOM
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={revealed ? { opacity: 1, width: 80 } : {}}
          transition={{ delay: 2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${colors[2]}, ${colors[3]}, ${colors[4]})` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.3, duration: 0.8 }}
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
                  className="absolute inset-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`, opacity: 0.4 }}
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${colors[2]}, ${colors[3]}, ${colors[4]})`, opacity: 0.3 }}
                  animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
                />
              </>
            )}

            {clicked && (
              <>
                {colors.concat(colors).map((c, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-1 w-16 origin-left rounded-full"
                    style={{ backgroundColor: c, rotate: (i / 10) * 360 }}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ opacity: [1, 0], scale: [0, 2.2] }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}

            <motion.span
              animate={{
                scale: clicked ? [1, 1.15, 0.85] : hovering ? 1.08 : 1,
                opacity: clicked ? [1, 1, 0] : 1,
              }}
              transition={{ duration: clicked ? 0.65 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 rounded-full px-14 py-5 text-sm font-medium uppercase tracking-[0.3em] text-white shadow-2xl"
              style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` }}
            >
              Enter
            </motion.span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-10 text-[9px] uppercase tracking-[0.5em]"
          style={{ color: isDark ? 'hsl(var(--cream) / 0.5)' : 'hsl(var(--brown) / 0.5)' }}
        >
          Zaighum Mujahid
        </motion.p>
      </div>
    </section>
  );
}