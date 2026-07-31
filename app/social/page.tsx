'use client';

import { motion } from 'framer-motion';
import { Instagram, Music2 } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/reveal';

const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@lunarbloom.pk',
    href: 'https://instagram.com/lunarbloom.pk',
    icon: Instagram,
  },
  {
    name: 'TikTok',
    handle: '@lunarbloom.pk',
    href: 'https://tiktok.com/@lunarbloom.pk',
    icon: Music2,
  },
];

export default function SocialPage() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center pt-32">
      <div className="mx-auto max-w-xl px-6 text-center lg:px-10">
        <Reveal direction="blur">
          <p className="font-script text-2xl text-gold">Follow Along</p>
        </Reveal>
        <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
          <TextReveal text="Official Pages" />
        </h1>

        <div className="mt-14 space-y-5">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center gap-4 rounded-2xl border border-brown/10 bg-cream-50/40 px-6 py-5 transition-colors hover:border-gold dark:border-cream/10 dark:bg-cream/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-dark to-gold text-brown-dark">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-serif text-xl text-brown dark:text-cream">{s.name}</p>
                <p className="text-xs uppercase tracking-wider text-brown/50 dark:text-cream/50">
                  {s.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
