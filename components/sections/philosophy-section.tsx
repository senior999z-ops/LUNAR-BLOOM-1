'use client';

import { motion } from 'framer-motion';
import { Hand, Leaf, Scissors, Sparkles } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/reveal';

const VALUES = [
  {
    icon: Hand,
    title: 'Handcrafted',
    description:
      'Every piece is hand-stitched by skilled karigars, preserving centuries of Pakistani textile craft.',
  },
  {
    icon: Leaf,
    title: 'Pure Fabrics',
    description:
      'We source the finest lawn, chiffon, silk, and velvet — breathable, luxurious, and made for our climate.',
  },
  {
    icon: Scissors,
    title: 'Made to Measure',
    description:
      'Bridal and formal pieces are made to your exact measurements for a perfect, personal fit.',
  },
  {
    icon: Sparkles,
    title: 'Heritage Embroidery',
    description:
      'Zardozi, gota, dabka, chikankari, and aari — traditional techniques, reimagined for today.',
  },
];

export function PhilosophySection() {
  return (
    <section className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">Our Promise</p>
          </Reveal>
          <h2 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-6xl">
            <TextReveal text="The Lunar Promise" />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group glass rounded-3xl p-8 text-center transition-shadow hover:glow-gold-sm"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-gold"
              >
                <value.icon className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl text-brown dark:text-cream">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brown/60 dark:text-cream/60">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
