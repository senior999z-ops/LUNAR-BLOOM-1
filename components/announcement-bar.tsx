'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  'Free Delivery Across Pakistan',
  'New Bridal Collection 2026',
  'Eid Edit Now Live',
  'Handcrafted in Lahore',
  'Made to Measure Available',
  'Cash on Delivery',
];

export function AnnouncementBar() {
  return (
    <div className="relative z-[110] overflow-hidden bg-brown-dark py-2 text-cream">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex shrink-0 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="mx-8 flex items-center gap-8 text-xs tracking-wider uppercase">
              {item}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
