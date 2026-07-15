'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  intensity = 15,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn('relative', className)}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]: string[]) =>
                `radial-gradient(circle at ${gx} ${gy}, hsl(var(--gold) / 0.15), transparent 50%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
