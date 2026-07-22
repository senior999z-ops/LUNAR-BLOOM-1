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
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setDust(
      Array.from({ length: mobile ? 18 : 36 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5, delay: Math.random() * 6, duration: Math.random() * 5 + 5,
      }))
    );
    setPetals(
      Array.from({ length: mobile ? 3 : 6 }, (_, i) => ({
        id: i, left: Math.random() * 90 + 5,
        delay: i * 6 + Math.random() * 4, duration: Math.random() * 8 + 16,
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
        className="pointer-events-none absolute inset-0"
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

      {/* Faint monogram watermark in the background */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        style={{ opacity: isDark ? 0.03 : 0.04 }}
      >
        <span
          className="font-serif text-[28rem] leading-none"
          style={{ color: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))' }}
        >
          LB
        </span>
      </div>

      {/* Subtle grain texture for tactile richness */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />

      {/* Fine drifting dust / stardust — subtle, not cluttered */}
      <div className="pointer-events-none absolute inset-0">
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

      {/* Slow falling golden petals — a romantic, boutique touch */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute -top-10"
            style={{ left: `${p.left}%` }}
            animate={{ y: ['0vh', '110vh'], x: [0, 25, -15, 10, 0], rotate: [0, 200, 380] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          >
            <div
              style={{
                width: 10,
                height: 13,
                background: isDark
                  ? 'linear-gradient(135deg, hsl(var(--gold) / 0.5), transparent)'
                  : 'linear-gradient(135deg, hsl(var(--gold-dark) / 0.4), transparent)',
                borderRadius: '100% 0 100% 0',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Vertical ornament lines on left and right edges */}
      {['left-4 md:left-8', 'right-4 md:right-8'].map((pos, side) => (
        <motion.div
          key={side}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: revealed ? 1 : 0, height: revealed ? 120 : 0 }}
          transition={{ delay: 2.6 + side * 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 w-px ${pos}`}
          style={{ backgroundColor: isDark ? 'hsl(var(--gold) / 0.25)' : 'hsl(var(--gold-dark) / 0.25)' }}
        />
      ))}

      {/* Moon phases row — a quiet nod to "Lunar" in the name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        className="pointer-events-none absolute bottom-[18%] left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((phase, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7" fill="none" stroke={isDark ? 'hsl(var(--gold) / 0.4)' : 'hsl(var(--gold-dark) / 0.4)'} strokeWidth="0.6" />
            <path
              d={
                phase === 0 ? 'M8 1 A7 7 0 0 1 8 15 A3.5 7 0 0 1 8 1 Z' :
                phase === 0.25 ? 'M8 1 A7 7 0 0 1 8 15 Z' :
                phase === 0.5 ? 'M8 1 A7 7 0 0 1 8 15 A7 7 0 0 1 8 1 Z' :
                phase === 0.75 ? 'M8 1 A7 7 0 0 0 8 15 Z' :
                'M8 1 A7 7 0 0 0 8 15 A3.5 7 0 0 0 8 1 Z'
              }
              fill={isDark ? 'hsl(var(--gold) / 0.6)' : 'hsl(var(--gold-dark) / 0.6)'}
            />
          </svg>
        ))}
      </motion.div>

      {/* Constellation — a few stars quietly joined by thin lines */}
      <div className="pointer-events-none absolute left-[8%] top-[60%] hidden md:block">
        <motion.svg
          width="140" height="90" viewBox="0 0 140 90"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: 2, duration: 1.2 }}
        >
          <path
            d="M10 70 L45 20 L80 45 L120 10"
            fill="none"
            stroke={isDark ? 'hsl(var(--gold) / 0.25)' : 'hsl(var(--gold-dark) / 0.3)'}
            strokeWidth="0.5"
          />
          {[[10, 70], [45, 20], [80, 45], [120, 10]].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r="2"
              fill={isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))'}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            />
          ))}
        </motion.svg>
      </div>

      {/* Flowing silk ribbon line drifting slowly across the scene */}
      <motion.svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M -100 700 Q 200 600 400 720 T 900 650 T 1300 700"
          fill="none"
          stroke={isDark ? 'hsl(var(--gold) / 0.3)' : 'hsl(var(--gold-dark) / 0.25)'}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: revealed ? 1 : 0 }}
          transition={{ duration: 3, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M -100 250 Q 250 180 500 260 T 1100 220"
          fill="none"
          stroke={isDark ? 'hsl(var(--gold) / 0.2)' : 'hsl(var(--gold-dark) / 0.18)'}
          strokeWidth="0.75"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: revealed ? 1 : 0 }}
          transition={{ duration: 3, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {/* Compass / star motif — bottom left */}
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: revealed ? 0.6 : 0, rotate: 0 }}
        transition={{ delay: 2.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-[10%] left-[6%] hidden md:block"
      >
        <motion.svg
          width="46" height="46" viewBox="0 0 46 46"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <path
            d="M23 2 L27 19 L44 23 L27 27 L23 44 L19 27 L2 23 L19 19 Z"
            fill="none"
            stroke={isDark ? 'hsl(var(--gold) / 0.5)' : 'hsl(var(--gold-dark) / 0.5)'}
            strokeWidth="0.75"
          />
          <circle cx="23" cy="23" r="2" fill={isDark ? 'hsl(var(--gold) / 0.6)' : 'hsl(var(--gold-dark) / 0.6)'} />
        </motion.svg>
      </motion.div>

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

      {/* Minimal emblem — concentric rings, plain, no text */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute top-[14%] z-[1] md:right-[12%]"
      >
        {/* Outer ring — plain, elegant, no text */}
        <motion.svg
          viewBox="0 0 200 200"
          className="h-40 w-40 md:h-56 md:w-56"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="100" cy="100" r="85"
            fill="none"
            stroke={isDark ? 'hsl(var(--gold) / 0.25)' : 'hsl(var(--gold-dark) / 0.3)'}
            strokeWidth="0.75"
          />
          <circle
            cx="100" cy="15" r="2.5"
            fill={isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))'}
          />
          <circle
            cx="100" cy="185" r="1.5"
            fill={isDark ? 'hsl(var(--gold) / 0.6)' : 'hsl(var(--gold-dark) / 0.6)'}
          />
        </motion.svg>

        {/* Inner ring, rotating opposite direction */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full border md:h-36 md:w-36"
          style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.3)' : 'hsl(var(--gold-dark) / 0.35)' }}
        >
          <div
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ top: -1, backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))' }}
          />
        </motion.div>

        {/* Soft inner glow */}
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

        {/* Orbiting sparkle, like a tiny moon circling the emblem */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))', boxShadow: isDark ? '0 0 8px hsl(var(--gold))' : 'none' }}
          />
        </motion.div>
      </motion.div>

      {/* Elegant corner ribbon badge — top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -20 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="pointer-events-none absolute left-8 top-8 hidden items-center gap-2 md:flex md:left-14 md:top-14"
      >
        <div
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))' }}
        />
        <span
          className="text-[9px] uppercase tracking-[0.35em]"
          style={{ color: isDark ? 'hsl(var(--gold) / 0.6)' : 'hsl(var(--gold-dark) / 0.6)' }}
        >
          Pakistan
        </span>
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

      {/* Bottom ornamental border with center diamond mark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: 2.5, duration: 1.2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 md:bottom-10"
      >
        <div
          className="h-px w-16 md:w-24"
          style={{ backgroundColor: isDark ? 'hsl(var(--gold) / 0.3)' : 'hsl(var(--gold-dark) / 0.3)' }}
        />
        <div
          className="h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: isDark ? 'hsl(var(--gold) / 0.5)' : 'hsl(var(--gold-dark) / 0.5)' }}
        />
        <div
          className="h-px w-16 md:w-24"
          style={{ backgroundColor: isDark ? 'hsl(var(--gold) / 0.3)' : 'hsl(var(--gold-dark) / 0.3)' }}
        />
      </motion.div>

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
          className="relative font-serif text-5xl font-light leading-none tracking-[0.08em] md:text-[6.5rem] lg:text-[8rem]"
          style={{ color: textColor }}
        >
          <span className="text-gradient-gold">LUNAR BLOOM</span>
          {/* Shimmer sweep across the title */}
          <motion.span
            className="pointer-events-none absolute inset-0 -skew-x-12"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.35), transparent)',
              mixBlendMode: 'overlay',
            }}
            initial={{ x: '-120%' }}
            animate={{ x: '120%' }}
            transition={{ delay: 3.5, duration: 2, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
          />
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

        {/* Small flourish beneath the signature */}
        <motion.svg
          width="70" height="12" viewBox="0 0 70 12"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 3.1, duration: 1 }}
          className="mt-2"
        >
          <path
            d="M2 6 Q17 -2 35 6 T68 6"
            fill="none"
            stroke={isDark ? 'hsl(var(--gold) / 0.4)' : 'hsl(var(--gold-dark) / 0.4)'}
            strokeWidth="0.75"
          />
          <circle cx="35" cy="6" r="1.5" fill={isDark ? 'hsl(var(--gold) / 0.6)' : 'hsl(var(--gold-dark) / 0.6)'} />
        </motion.svg>
      </div>
    </section>
  );
}