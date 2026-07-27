'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FloatingBackButton } from '@/components/floating-back-button';
import { Reveal, TextReveal } from '@/components/reveal';

export default function ShopPage() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center pt-32">
      <FloatingBackButton />
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
        <Reveal direction="blur">
          <p className="font-script text-2xl text-gold">The Collection</p>
        </Reveal>

        <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
          <TextReveal text="Shop All" />
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 150 }}
          className="mx-auto mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-dark via-gold to-gold-light shadow-xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="h-8 w-8 text-brown-dark" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 font-serif text-4xl font-light text-brown dark:text-cream md:text-5xl"
        >
          <span className="text-gradient-gold">Coming Soon</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brown/60 dark:text-cream/60"
        >
          Our collection is being handcrafted with care in Lahore. Heritage
          embroidery, pure fabrics, and pieces worth the wait — arriving soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 64 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 h-px bg-gold/40"
        />
      </div>
    </main>
  );
}