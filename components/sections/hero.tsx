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

  const [dust, setDust] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setDust(
      Array.from({ length: mobile ? 18 : 36 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5, delay: Math.random() * 6, duration: Math.random() * 5 + 5,
      }))
    );
  }, []);

  const textColor = isDark ? 'hsl(var(--cream))' : 'hsl(var(--brown-dark))';
  const bgColor = isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-100))';

  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      {/* Ambient gradient wash — refined, not cartoonish */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 70% 60% at 50% 30%, hsl(var(--brown) / 0.4), transparent 70%)'
            : 'radial-gradient(ellipse 70% 60% at 50% 30%, hsl(45 60% 88%), transparent 70%)',
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 40%, hsl(var(--brown-dark) / 0.7) 100%)'
            : 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 40%, hsl(35 40% 75% / 0.35) 100%)',
        }}
      />

      {/* Fine drifting dust / stardust — subtle, not cluttered */}
      <div className="absolute inset-0">
        {dust.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{
              top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size,
              backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))',
            }}
            animate={{ opacity: [0, 0.5, 0], y: [0, -20, -40] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Ornamental corner frame — the signature "boutique" touch */}
      <div className="pointer-events-none absolute inset-6 md:inset-10">
        {[
          'top-0 left-0 border-t border-l',
          'top-0 right-0 border-t border-r',
          'bottom-0 left-0 border-b border-l',
          'bottom-0 right-0 border-b border-r',
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ delay: 1.8 + i * 0.1, duration: 1 }}
            className={`absolute h-10 w-10 md:h-14 md:w-14 ${pos}`}
            style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.4)' : 'hsl(var(--gold-dark) / 0.5)' }}
          />
        ))}
      </div>

      {/* Minimal emblem — thin ring with soft inner glow, replaces literal sun/moon */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute top-[14%] z-[1] md:right-[12%]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="relative flex h-40 w-40 items-center justify-center rounded-full border md:h-56 md:w-56"
          style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.25)' : 'hsl(var(--gold-dark) / 0.3)' }}
        >
          <div
            className="absolute h-2 w-2 rounded-full"
            style={{ top: -1, backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))' }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, hsl(var(--gold) / 0.25), transparent 70%)'
              : 'radial-gradient(circle, hsl(45 80% 75% / 0.5), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* Light / Dark toggle */}
      {mounted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          data-cursor-label="theme"
          className="fixed right-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
          style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.3)' : 'hsl(var(--gold-dark) / 0.3)', color: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))' }}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.button>
      )}

      {/* Veil split open */}
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ backgroundColor: bgColor }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(0% 0% 100% 0%)' } : {}}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ backgroundColor: bgColor }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(100% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Thin ornamental divider above title */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={revealed ? { opacity: 1, width: 64 } : {}}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 h-px"
          style={{ backgroundColor: isDark ? 'hsl(var(--gold) / 0.5)' : 'hsl(var(--gold-dark) / 0.5)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-3 text-[11px] uppercase tracking-[0.6em]"
          style={{ color: isDark ? 'hsl(var(--gold) / 0.8)' : 'hsl(var(--gold-dark))' }}
        >
          Est. Lahore
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-light leading-none tracking-[0.08em] md:text-[6.5rem] lg:text-[8rem]"
          style={{ color: textColor }}
        >
          <span className="text-gradient-gold">LUNAR BLOOM</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={revealed ? { opacity: 1, width: 64 } : {}}
          transition={{ delay: 2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px"
          style={{ backgroundColor: isDark ? 'hsl(var(--gold) / 0.5)' : 'hsl(var(--gold-dark) / 0.5)' }}
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
              <motion.span
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.3)' : 'hsl(var(--gold-dark) / 0.3)' }}
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            {clicked && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-px w-14 origin-left rounded-full"
                    style={{
                      backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))',
                      rotate: (i / 8) * 360,
                    }}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ opacity: [1, 0], scale: [0, 2] }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}

            <motion.span
              animate={{
                scale: clicked ? [1, 1.06, 0.9] : hovering ? 1.04 : 1,
                opacity: clicked ? [1, 1, 0] : 1,
                backgroundColor: hovering
                  ? (isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))')
                  : 'transparent',
              }}
              transition={{ duration: clicked ? 0.6 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 rounded-full border px-14 py-4 text-xs font-medium uppercase tracking-[0.4em] transition-colors"
              style={{
                borderColor: isDark ? 'hsl(var(--gold) / 0.6)' : 'hsl(var(--gold-dark) / 0.6)',
                color: hovering ? (isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-50))') : (isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))'),
              }}
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
          style={{ color: isDark ? 'hsl(var(--cream) / 0.4)' : 'hsl(var(--brown) / 0.4)' }}
        >
          Zaighum Mujahid
        </motion.p>
      </div>
    </section>
  );
}