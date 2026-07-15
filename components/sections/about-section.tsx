'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, TextReveal } from '@/components/reveal';

const TIMELINE = [
  {
    year: '2019',
    title: 'The Seed',
    description:
      'A vision born in the lanes of old Lahore — to create clothing that honors the craft of Pakistani artisans and the women who wear it.',
  },
  {
    year: '2020',
    title: 'First Bloom',
    description:
      'Our debut pret collection, stitched in a small atelier in Gulberg. Each piece carried the fragrance of motia and the patience of handwork.',
  },
  {
    year: '2022',
    title: 'Across Pakistan',
    description:
      'From Karachi to Islamabad, from Peshawar to Quetta — LUNAR BLOOM reached women across the country, each piece a celebration of regional craft.',
  },
  {
    year: '2024',
    title: 'Bridal Atelier',
    description:
      'Our bridal atelier opened in Lahore, offering made-to-measure heirloom pieces with zardozi, gota, and dabka work by master karigars.',
  },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const moonY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32">
      {/* Moon background with scroll parallax */}
      <motion.div
        style={{ y: moonY }}
        className="absolute right-0 top-1/4 h-96 w-96 rounded-full opacity-20"
        >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, hsl(var(--gold) / 0.3), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-20 text-center">
          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">Our Story</p>
          </Reveal>
          <h2 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-6xl">
            <TextReveal text="Born From Heritage" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brown/70 dark:text-cream/70">
              LUNAR BLOOM began as a quiet conviction in the lanes of old Lahore —
              that clothing, like the moon, reveals itself in phases. We craft each
              piece to honor the centuries of textile tradition that flow through
              Pakistan, from the chikankari of the plains to the zardozi of the royal
              courts. By Zaighum Mujahid.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-gold ring-4 ring-cream-100 dark:ring-brown-dark md:left-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="h-4 w-4 rounded-full bg-gold/40"
                  />
                </div>

                {/* Content */}
                <div className="ml-12 w-full md:ml-0 md:w-1/2 md:px-12">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="glass rounded-2xl p-6 hover:glow-gold-sm"
                  >
                    <p className="font-serif text-4xl text-gradient-gold">{item.year}</p>
                    <h3 className="mt-2 font-serif text-2xl text-brown dark:text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brown/60 dark:text-cream/60">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
