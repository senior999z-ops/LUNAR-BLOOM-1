'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { collections } from '@/lib/products';

export function HideSeekCollections() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Minimal header */}
        <motion.div style={{ y: headerY }} className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-script text-3xl text-gold"
          >
            seek
          </motion.p>
        </motion.div>

        {/* Collection cards — hide and seek reveal */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {collections.map((col, i) => (
            <CollectionCard key={col.id} collection={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setClicked(false);
      }}
      onClick={() => setClicked((c) => !c)}
      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl"
      style={{ perspective: 1200 }}
    >
      {/* Image */}
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${collection.image})` }}
      />

      {/* Veil — splits open on hover */}
      <motion.div
        className="absolute inset-0 z-10 bg-brown-dark/90"
        animate={{
          clipPath: hovered
            ? 'inset(0% 0% 50% 0%)'
            : 'inset(0% 0% 0% 0%)',
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 z-10 bg-brown-dark/90"
        animate={{
          clipPath: hovered
            ? 'inset(50% 0% 0% 0%)'
            : 'inset(0% 0% 0% 0%)',
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hidden text that appears when veil opens */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 p-8 text-center"
      >
        <motion.h3
          initial={{ y: 30 }}
          animate={{ y: hovered ? 0 : 30 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-serif text-4xl font-light text-cream md:text-5xl"
        >
          {collection.name}
        </motion.h3>
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: hovered ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-xs text-sm text-cream/60"
        >
          {collection.description}
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: hovered ? 1 : 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <Link
            href={`/shop?tab=stitched`}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark to-gold px-6 py-3 text-xs font-medium uppercase tracking-wider text-brown-dark"
          >
            Reveal
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Default hint — just a number */}
      <div className="absolute left-6 top-6 z-20">
        <motion.span
          animate={{ opacity: hovered ? 0 : 1 }}
          className="font-serif text-6xl font-light text-cream/30"
        >
          0{index + 1}
        </motion.span>
      </div>

      {/* Hint text at bottom */}
      <div className="absolute bottom-6 left-6 z-20">
        <motion.p
          animate={{ opacity: hovered ? 0 : 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-cream/50"
        >
          touch to reveal
        </motion.p>
      </div>

      {/* Corner accent that draws in on hover */}
      <svg className="absolute right-4 top-4 z-20 h-12 w-12" viewBox="0 0 48 48" fill="none">
        <motion.path
          d="M48 0 L48 48 L0 48"
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
