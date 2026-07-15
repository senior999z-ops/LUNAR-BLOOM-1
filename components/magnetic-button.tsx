'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = 'primary',
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass = cn(
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider transition-all',
    variant === 'primary' &&
      'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-brown-dark hover:glow-gold',
    variant === 'outline' &&
      'border border-gold/40 text-brown hover:border-gold dark:text-cream',
    variant === 'ghost' && 'text-brown hover:text-gold dark:text-cream',
    className
  );

  const content = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={baseClass}
      onClick={onClick}
    >
      {/* Ripple + bloom on hover */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 transition-all duration-500 group-hover:h-[300%] group-hover:w-[300%]" />
      </span>
      {/* Sparkles */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{ opacity: 0 }}
            whileHover={{
              opacity: [0, 1, 0],
              x: Math.cos((i / 4) * Math.PI * 2) * 20,
              y: Math.sin((i / 4) * Math.PI * 2) * 20,
              transition: { duration: 0.6 },
            }}
          />
        ))}
      </span>
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}
