'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingButtonProps {
  href: string;
  label: string;
  image: string;
  icon?: ReactNode;
  variant?: 'collection' | 'nav';
  index: number;
  total: number;
  angleOffset?: number;
}

export function FloatingButton({
  href,
  label,
  image,
  icon,
  variant = 'collection',
  index,
  total,
  angleOffset = 0,
}: FloatingButtonProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Collections sit close to the centre, nav buttons ride much further out —
  // this is what keeps the two groups from crowding each other.
  const angle = (index / total) * Math.PI * 2 + angleOffset;
  const radiusX = variant === 'collection' ? 0.34 : 0.68;
  const radiusY = variant === 'collection' ? 0.3 : 0.6;

  const startX = 50 + Math.cos(angle) * radiusX * 50;
  const startY = 50 + Math.sin(angle) * radiusY * 50;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 12 });
  const sy = useSpring(y, { stiffness: 40, damping: 12 });

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);

    // No continuous float loop on phones — that rAF loop per button was a
    // major cause of the stutter.
    if (mq.matches) return;

    let raf = 0;
    let frame = 0;
    const phase = index * 1.3;
    const speedX = variant === 'collection' ? 0.0003 : 0.0004;
    const speedY = variant === 'collection' ? 0.0004 : 0.0003;
    const ampX = variant === 'collection' ? 26 : 18;
    const ampY = variant === 'collection' ? 22 : 16;

    const animate = () => {
      frame++;
      x.set(Math.sin(frame * speedX + phase) * ampX);
      y.set(Math.cos(frame * speedY + phase * 1.7) * ampY);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [index, variant, x, y]);

  // Instant navigation — no artificial delay before the page changes.
  const handleClick = () => router.push(href);

  if (variant === 'nav') {
    return (
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${startX}%`, top: `${startY}%` }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15 + index * 0.06, type: 'spring', stiffness: 200 }}
          style={{ x: isMobile ? 0 : sx, y: isMobile ? 0 : sy }}
        >
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.18 }}
            data-cursor-label={label}
            className="flex items-center gap-2 whitespace-nowrap rounded-full glass-strong px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-brown shadow-lg dark:text-cream"
          >
            {icon}
            {label}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${startX}%`, top: `${startY}%` }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 150 }}
        style={{ x: isMobile ? 0 : sx, y: isMobile ? 0 : sy }}
      >
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileTap={{ scale: 0.92 }}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          data-cursor-label={label}
          className="group relative flex flex-col items-center gap-3"
        >
          {/* Image circle */}
          <div className="relative">
            {/* Glow ring — desktop only (blur is expensive on phones) */}
            <motion.div
              className="absolute -inset-2 hidden rounded-full lg:block"
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.3), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Dashed ring — spins on desktop, static on mobile */}
            {isMobile ? (
              <div className="absolute -inset-1 rounded-full border border-dashed border-gold/30" />
            ) : (
              <motion.div
                className="absolute -inset-1 rounded-full border border-dashed border-gold/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Image */}
            <div
              className={cn(
                'relative overflow-hidden rounded-full border-2 transition-colors',
                hovered ? 'border-gold' : 'border-gold/20',
              )}
              style={{
                width: variant === 'collection' ? 'clamp(115px, 33vw, 180px)' : 'clamp(80px, 22vw, 120px)',
                height: variant === 'collection' ? 'clamp(115px, 33vw, 180px)' : 'clamp(80px, 22vw, 120px)',
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              />
              <motion.div
                className="absolute inset-0 bg-brown-dark/50"
                animate={{ opacity: hovered ? 0 : 0.4 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Label */}
          <motion.span
            animate={{ scale: hovered ? 1.08 : 1 }}
            className={cn(
              'whitespace-nowrap rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors',
              hovered
                ? 'bg-gradient-to-r from-gold-dark to-gold text-brown-dark'
                : 'glass-strong text-brown dark:text-cream',
            )}
          >
            {label}
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}