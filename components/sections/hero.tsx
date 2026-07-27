'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
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
  const [moonFull, setMoonFull] = useState(false);
  const [earthPulse, setEarthPulse] = useState(0);
  const isDark = mounted ? theme === 'dark' : true;

  const handleEnter = () => {
    if (clicked) return;
    setClicked(true);
    router.push('/collections');
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 25);
      my.set((e.clientY / window.innerHeight - 0.5) * 25);
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
  const [brightStars, setBrightStars] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ id: number; top: number; left: number; delay: number }>>([]);
  const [starBursts, setStarBursts] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setFarStars(
      Array.from({ length: mobile ? 25 : 100 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 1.2 + 0.5, delay: Math.random() * 5, duration: Math.random() * 4 + 3,
      }))
    );
    setNearStars(
      Array.from({ length: mobile ? 12 : 45 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 2 + 1.2, delay: Math.random() * 5, duration: Math.random() * 3 + 2,
      }))
    );
    setBrightStars(
      Array.from({ length: mobile ? 3 : 8 }, (_, i) => ({
        id: i, top: Math.random() * 85 + 5, left: Math.random() * 85 + 5,
        size: Math.random() * 4 + 8, delay: Math.random() * 4,
      }))
    );
    setShootingStars(
      Array.from({ length: mobile ? 1 : 4 }, (_, i) => ({
        id: i, top: Math.random() * 40, left: Math.random() * 60,
        delay: i * 5 + Math.random() * 3,
      }))
    );
  }, []);

  const handleStarClick = (id: number) => {
    setStarBursts((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setStarBursts((prev) => ({ ...prev, [id]: false })), 700);
  };

  const bgColor = isDark ? 'hsl(var(--brown-dark))' : 'hsl(var(--cream-100))';
  const textColor = isDark ? 'hsl(var(--cream))' : 'hsl(var(--brown-dark))';

  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      {/* Galaxy nebula swirl (night) / soft golden sky (day) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 60% at 25% 20%, hsl(280 35% 25% / 0.4), transparent 60%), radial-gradient(ellipse 70% 55% at 80% 70%, hsl(45 60% 30% / 0.35), transparent 60%), radial-gradient(ellipse 60% 60% at 50% 100%, hsl(15 35% 18% / 0.5), transparent 70%)'
            : 'radial-gradient(ellipse 80% 60% at 30% 20%, hsl(45 70% 88%), transparent 65%), radial-gradient(ellipse 70% 60% at 70% 80%, hsl(35 55% 88%), transparent 65%)',
        }}
      />

      {/* Slowly rotating galaxy spiral arms (night only) */}
      {isDark && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[140vh] w-[140vh] -translate-x-1/2 -translate-y-1/2 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, hsl(var(--gold) / 0.15) 20deg, transparent 60deg, transparent 180deg, hsl(280 40% 40% / 0.15) 200deg, transparent 240deg)',
            borderRadius: '50%',
          }}
        />
      )}

      {/* Far stars */}
      <div className="pointer-events-none absolute inset-0">
        {farStars.map((s) => (
          <motion.div
            key={`far-${s.id}`}
            className="absolute rounded-full"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, backgroundColor: isDark ? 'hsl(var(--cream-50))' : 'hsl(var(--gold-dark))' }}
            animate={{ opacity: isDark ? [0.1, 0.6, 0.1] : [0.05, 0.3, 0.05] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Near twinkling stars */}
      <div className="pointer-events-none absolute inset-0">
        {nearStars.map((s) => (
          <motion.div
            key={`near-${s.id}`}
            className="absolute rounded-full bg-gold"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.15, 0.95, 0.15], scale: [0.6, 1.6, 0.6] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Bright four-point sparkle stars — clickable, burst on click */}
      <div className="absolute inset-0 hidden md:block">
        {brightStars.map((s) => (
          <div
            key={`bright-${s.id}`}
            className="absolute cursor-pointer"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size + 20, height: s.size + 20 }}
            onClick={() => handleStarClick(s.id)}
            data-cursor-label="star"
          >
            <motion.svg
              viewBox="0 0 24 24"
              style={{ width: s.size, height: s.size }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7], rotate: [0, 90] }}
              transition={{ duration: 4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            >
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))'} />
            </motion.svg>

            <AnimatePresence>
              {starBursts[s.id] && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-8 origin-left rounded-full"
                      style={{ backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))', rotate: (i / 8) * 360 }}
                      initial={{ width: 0, opacity: 1 }}
                      animate={{ width: 24, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Shooting stars (night only) */}
      {isDark && (
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {shootingStars.map((s) => (
            <motion.div
              key={`shoot-${s.id}`}
              className="absolute h-px w-28 bg-gradient-to-r from-transparent via-cream-50 to-transparent"
              style={{ top: `${s.top}%`, left: `${s.left}%`, rotate: '25deg' }}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: [0, 1, 0], x: [0, 300] }}
              transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 6, delay: s.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      {/* Earth — small planet, floating bottom-left, gently rotating */}
      <motion.div
        className="absolute bottom-[14%] left-[8%] z-[1] hidden cursor-pointer md:block"
        onClick={() => setEarthPulse((p) => p + 1)}
        data-cursor-label="earth"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0 }}
        transition={{ delay: 2, duration: 1, type: 'spring', stiffness: 100 }}
      >
        <motion.div
          className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:w-20"
          style={{
            background: 'radial-gradient(circle at 35% 35%, hsl(200 70% 55%), hsl(210 65% 35%) 60%, hsl(220 55% 22%))',
            boxShadow: '0 0 30px hsl(200 70% 50% / 0.4)',
          }}
          animate={{ rotate: 360, scale: earthPulse ? [1, 1.25, 1] : 1 }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.5, ease: 'easeOut' } }}
        >
          {/* Continents */}
          <div className="absolute left-[15%] top-[20%] h-3 w-4 rounded-full bg-[hsl(120,35%,40%)] opacity-80" />
          <div className="absolute left-[50%] top-[45%] h-4 w-5 rounded-full bg-[hsl(120,35%,40%)] opacity-80" />
          <div className="absolute left-[25%] top-[65%] h-2 w-3 rounded-full bg-[hsl(120,35%,40%)] opacity-70" />
          {/* Cloud swirls */}
          <div className="absolute left-[5%] top-[50%] h-2 w-6 rounded-full bg-white opacity-20" />
          <div className="absolute left-[45%] top-[15%] h-1.5 w-5 rounded-full bg-white opacity-20" />
        </motion.div>
        {/* Thin orbit ring */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-full border"
          style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.2)' : 'hsl(var(--gold-dark) / 0.25)' }}
        />
      </motion.div>

      {/* Half moon (crescent) — click to reveal full moon */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute top-[10%] z-[1] cursor-pointer md:right-[10%]"
        onClick={() => setMoonFull((v) => !v)}
        data-cursor-label={moonFull ? 'shrink' : 'reveal'}
      >
        {isDark ? (
          <div className="relative h-40 w-40 md:h-52 md:w-52">
            {/* Full glowing moon disc */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%, hsl(var(--cream-50)), hsl(var(--gold) / 0.6) 55%, hsl(var(--gold-dark) / 0.5))',
                boxShadow: '0 0 100px hsl(var(--gold) / 0.45), 0 0 50px hsl(var(--gold) / 0.3)',
              }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Craters appear once full */}
              <motion.div
                animate={{ opacity: moonFull ? 1 : 0 }}
                transition={{ duration: 0.6, delay: moonFull ? 0.3 : 0 }}
              >
                <div className="absolute left-[20%] top-[30%] h-6 w-6 rounded-full bg-brown/10" />
                <div className="absolute left-[55%] top-[50%] h-8 w-8 rounded-full bg-brown/10" />
                <div className="absolute left-[35%] top-[68%] h-4 w-4 rounded-full bg-brown/10" />
              </motion.div>
            </motion.div>
            {/* Shadow overlay carving it into a crescent — animates away to reveal full moon */}
            <motion.div
              className="absolute rounded-full"
              animate={{
                width: moonFull ? '0%' : '92%',
                height: moonFull ? '0%' : '92%',
                left: moonFull ? '50%' : '26%',
                top: moonFull ? '50%' : '-6%',
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: bgColor,
                boxShadow: `0 0 40px 20px ${bgColor}`,
              }}
            />
          </div>
        ) : (
          <motion.div
            className="h-36 w-36 rounded-full md:h-48 md:w-48"
            style={{
              background: 'radial-gradient(circle at 35% 35%, hsl(45 90% 92%), hsl(45 85% 68%) 55%, hsl(35 75% 58%))',
              boxShadow: '0 0 90px hsl(45 85% 65% / 0.55), 0 0 160px hsl(45 85% 65% / 0.25)',
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Soft outer halo */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, hsl(var(--gold) / 0.25), transparent 70%)'
              : 'radial-gradient(circle, hsl(45 85% 75% / 0.5), transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      {/* Ornamental corner frame */}
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
          className="relative mt-12"
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
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.35)' : 'hsl(var(--gold-dark) / 0.35)' }}
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: isDark ? 'hsl(var(--gold) / 0.25)' : 'hsl(var(--gold-dark) / 0.25)' }}
                  animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
                />
              </>
            )}

            <motion.span
              animate={{
                scale: clicked ? [1, 1.1, 0.9] : hovering ? 1.06 : 1,
                opacity: clicked ? [1, 1, 0] : 1,
              }}
              transition={{ duration: clicked ? 0.5 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-14 py-5 text-sm font-medium uppercase tracking-[0.3em] text-brown-dark shadow-xl"
            >
              Enter
            </motion.span>
          </button>

          {/* Beautiful burst effect on click — golden rays, sparks, and a shockwave ring */}
          <AnimatePresence>
            {clicked && (
              <>
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2"
                  style={{ borderColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))', x: '-50%', y: '-50%' }}
                  initial={{ width: 20, height: 20, opacity: 0.9 }}
                  animate={{ width: 500, height: 500, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                {[...Array(14)].map((_, i) => (
                  <motion.span
                    key={`ray-${i}`}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 origin-left rounded-full"
                    style={{
                      background: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))',
                      rotate: (i / 14) * 360,
                    }}
                    initial={{ width: 0, opacity: 1 }}
                    animate={{ width: 90, opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.01 }}
                  />
                ))}
                {[...Array(20)].map((_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const dist = Math.random() * 140 + 60;
                  return (
                    <motion.span
                      key={`spark-${i}`}
                      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
                      style={{
                        width: Math.random() * 3 + 2,
                        height: Math.random() * 3 + 2,
                        backgroundColor: isDark ? 'hsl(var(--gold))' : 'hsl(var(--gold-dark))',
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist,
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.01 }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>
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