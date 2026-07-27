'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  const [clicked, setClicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Random starting position. Collection circles use angle-based placement
  // (they sit in the vertical-center band). Nav buttons instead snap to one
  // of 4 safe corners, far from that center band, so they can never drift
  // onto a collection image regardless of screen size. Right-side corners
  // are anchored from the right edge (not left), so a long label like
  // "FAVOURITES" grows inward instead of overflowing off-screen.
  const NAV_CORNERS = [
    { side: 'left' as const, offset: 18, y: 18 },
    { side: 'right' as const, offset: 14, y: 27 },
    { side: 'left' as const, offset: 18, y: 72 },
    { side: 'right' as const, offset: 14, y: 82 },
  ];

  let startY: number;
  let horizontalStyle: { left?: string; right?: string };

  if (variant === 'nav') {
    const corner = NAV_CORNERS[index % NAV_CORNERS.length];
    startY = corner.y;
    horizontalStyle = corner.side === 'left' ? { left: `${corner.offset}%` } : { right: `${corner.offset}%` };
  } else {
    const angle = (index / total) * Math.PI * 2 + angleOffset;
    const radius = 0.46;
    const rawX = 50 + Math.cos(angle) * radius * 50;
    const rawY = 50 + Math.sin(angle) * radius * 50;
    const startX = Math.min(88, Math.max(12, rawX));
    startY = Math.min(78, Math.max(22, rawY));
    horizontalStyle = { left: `${startX}%` };
  }

  // Floating motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 12 });
  const sy = useSpring(y, { stiffness: 40, damping: 12 });

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 100, damping: 20 });
  const py = useSpring(my, { stiffness: 100, damping: 20 });

  const rotate = useTransform([sx, sy], ([vx, vy]: number[]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(speed * 0.3, 8);
  });

  useEffect(() => {
    setMounted(true);

    // Gentle floating animation with unique phase per button. Only updates
    // every other frame — this was running full-speed on every single
    // button (6 of them) simultaneously, which was the main cause of the
    // "ruk ruk ke" stutter on mobile.
    let frame = 0;
    const phase = index * 1.3;
    const speedX = variant === 'collection' ? 0.0003 : 0.0004;
    const speedY = variant === 'collection' ? 0.0004 : 0.0003;
    const ampX = variant === 'collection' ? 22 : 25;
    const ampY = variant === 'collection' ? 18 : 20;

    const animate = () => {
      frame++;
      if (frame % 2 === 0) {
        x.set(Math.sin(frame * speedX + phase) * ampX);
        y.set(Math.cos(frame * speedY + phase * 1.7) * ampY);
      }
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);

    const handleMouse = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 20);
      my.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [index, variant, x, y, mx, my]);

  const handleClick = () => {
    setClicked(true);
    router.push(href);
  };

  if (variant === 'nav') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
        style={{
          ...horizontalStyle,
          top: `${startY}%`,
          x: sx,
          y: sy,
        }}
        className="absolute z-20"
      >
        <motion.div style={{ x: px, y: py, rotate }}>
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={clicked ? { scale: [1, 1.3, 0] } : { scale: hovered ? 1.15 : 1 }}
            transition={{ duration: clicked ? 0.6 : 0.3 }}
            data-cursor-label={label}
            className="flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-brown shadow-lg dark:text-cream"
          >
            {icon}
            {label}
          </motion.button>
        </motion.div>

        {/* Click ripple */}
        {clicked && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-gold"
          />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={mounted ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.5 + index * 0.15, type: 'spring', stiffness: 150 }}
      style={{
        ...horizontalStyle,
        top: `${startY}%`,
        x: sx,
        y: sy,
      }}
      className="absolute z-20"
    >
      <motion.div style={{ x: px, y: py, rotate }}>
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={clicked ? { scale: [1, 1.2, 0] } : { scale: hovered ? 1.1 : 1 }}
          transition={{ duration: clicked ? 0.6 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          data-cursor-label={label}
          className="group relative flex flex-col items-center gap-3"
        >
          {/* Image circle */}
          <div className="relative">
            {/* Glow ring on hover */}
            <motion.div
              className="absolute -inset-2 rounded-full"
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.3), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Rotating border ring */}
            <motion.div
              className="absolute -inset-1 rounded-full border border-dashed border-gold/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Image */}
            <div
              className={cn(
                'relative overflow-hidden rounded-full border-2 transition-colors',
                hovered ? 'border-gold' : 'border-gold/20',
              )}
              style={{
                width: variant === 'collection' ? 'clamp(110px, 32vw, 180px)' : 'clamp(80px, 22vw, 120px)',
                height: variant === 'collection' ? 'clamp(110px, 32vw, 180px)' : 'clamp(80px, 22vw, 120px)',
              }}
            >
              <motion.div
                animate={{ scale: hovered ? 1.2 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
              {/* Dark veil that fades on hover */}
              <motion.div
                className="absolute inset-0 bg-brown-dark/50"
                animate={{ opacity: hovered ? 0 : 0.4 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Click burst */}
            {clicked && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-1 w-12 origin-left rounded-full bg-gold"
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{
                      opacity: [1, 0],
                      scale: [0, 2],
                      rotate: (i / 8) * 360,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ rotate: (i / 8) * 360 }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Label */}
          <motion.span
            animate={{ scale: hovered ? 1.1 : 1 }}
            className={cn(
              'rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors',
              hovered
                ? 'bg-gradient-to-r from-gold-dark to-gold text-brown-dark'
                : 'glass-strong text-brown dark:text-cream',
            )}
          >
            {label}
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}