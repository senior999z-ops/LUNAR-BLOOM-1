'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Scissors, Shirt } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

export function StitchedUnstitchedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -3]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Minimal header — just two words */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            <span className="text-gradient-gold">two</span> ways
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Stitched */}
          <RevealCard
            href="/shop?tab=stitched"
            image="https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1200"
            y={y1}
            rotate={rotate1}
            icon={<Shirt className="h-6 w-6" />}
            title="Stitched"
            hint="ready to wear"
          />

          {/* Unstitched */}
          <RevealCard
            href="/shop?tab=unstitched"
            image="https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200"
            y={y2}
            rotate={rotate2}
            icon={<Scissors className="h-6 w-6" />}
            title="Unstitched"
            hint="tailor your own"
          />
        </div>
      </div>
    </section>
  );
}

function RevealCard({
  href,
  image,
  y,
  rotate,
  icon,
  title,
  hint,
}: {
  href: string;
  image: string;
  y: any;
  rotate: any;
  icon: React.ReactNode;
  title: string;
  hint: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{ y, rotate }}
      whileHover={{ scale: 1.02, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative h-[500px] overflow-hidden rounded-3xl"
    >
      {/* Image */}
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Veil that dissolves on hover */}
      <motion.div
        className="absolute inset-0 bg-brown-dark/70"
        animate={{ opacity: hovered ? 0 : 0.7 }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
        {/* Icon in circle — scales on hover */}
        <motion.div
          animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 360 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-16 w-16 items-center justify-center rounded-full glass-strong text-gold"
        >
          {icon}
        </motion.div>

        {/* Title */}
        <motion.h3
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0.8 }}
          className="font-serif text-5xl font-light text-cream"
        >
          {title}
        </motion.h3>

        {/* Hint */}
        <motion.p
          animate={{ opacity: hovered ? 1 : 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-gold"
        >
          {hint}
        </motion.p>

        {/* Arrow that draws in */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Link
            href={href}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark to-gold px-6 py-3 text-xs font-medium uppercase tracking-wider text-brown-dark"
          >
            explore
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>

      {/* Corner SVG that draws on hover */}
      <svg className="absolute right-0 top-0 h-20 w-20" viewBox="0 0 80 80" fill="none">
        <motion.path
          d="M80 0 L80 80 L0 80"
          stroke="hsl(var(--gold))"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}
