'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'Ayesha — Lahore',
    content: 'Wore the Chandni Rose to a dawat. Every eye in the room.',
  },
  {
    name: 'Fatima — Karachi',
    content: 'My bridal lehenga was a dream. The zardozi work was exquisite.',
  },
  {
    name: 'Zainab — Islamabad',
    content: 'The Mahool Formal is my go-to for winter weddings. Pure luxury.',
  },
  {
    name: 'Hira — Faisalabad',
    content: 'The Sufi block print suit arrived and I was blown away.',
  },
  {
    name: 'Maryam — Multan',
    content: 'The Kashmir shawl is pure luxury. It became an heirloom.',
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-10 text-center md:p-16"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5"
              >
                <Quote className="h-6 w-6 text-gold" />
              </motion.div>

              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <Star className="h-3 w-3 fill-gold text-gold" />
                  </motion.div>
                ))}
              </div>

              <p className="font-serif text-xl font-light leading-relaxed text-brown dark:text-cream md:text-2xl">
                {TESTIMONIALS[index].content}
              </p>

              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
                {TESTIMONIALS[index].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-gold' : 'w-2 bg-brown/20 dark:bg-cream/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
