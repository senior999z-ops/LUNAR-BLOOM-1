'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Home, Info, Mail } from 'lucide-react';
import { FloatingButton } from '@/components/floating-button';

const COLLECTIONS = [
  { label: 'Stitched', href: '/shop?tab=stitched', image: 'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Unstitched', href: '/shop?tab=unstitched', image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const NAV_BUTTONS = [
  { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
  { label: 'About', href: '/about', icon: <Info className="h-4 w-4" /> },
  { label: 'Contact', href: '/contact', icon: <Mail className="h-4 w-4" /> },
];

export default function CollectionsPage() {
  const [stars, setStars] = useState<Array<{ id: number; top: number; left: number; delay: number; duration: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    // This page sits on top of the site-wide GlobalBackground, so its own
    // star/orb count stays small on mobile to avoid stacking two heavy layers.
    setStars(
      Array.from({ length: isMobile ? 8 : 40 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, [isMobile]);

  const orbCount = isMobile ? 2 : 5;

  return (
    <main className="relative z-10 h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        {/* Floating golden orbs — static on mobile, animated on desktop */}
        {[...Array(orbCount)].map((_, i) =>
          isMobile ? (
            <div
              key={i}
              className="absolute rounded-full opacity-40"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                top: `${15 + i * 15}%`,
                left: `${10 + i * 18}%`,
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.08), transparent 70%)',
                filter: 'blur(24px)',
              }}
            />
          ) : (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                top: `${15 + i * 15}%`,
                left: `${10 + i * 18}%`,
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.08), transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          )
        )}

        {/* Twinkling stars */}
        {stars.map((s) => (
          <motion.div
            key={`star-${s.id}`}
            className="absolute rounded-full bg-gold"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: 2,
              height: 2,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Title — all capitals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="absolute left-1/2 top-8 z-10 -translate-x-1/2 text-center"
      >
        <p className="font-serif text-sm uppercase tracking-[0.45em] text-gold sm:text-base">
          DISCOVER
        </p>
        <h1 className="mt-1 font-serif text-4xl font-light uppercase tracking-[0.15em] text-brown dark:text-cream sm:text-5xl md:text-6xl">
          <span className="text-gradient-gold">COLLECTIONS</span>
        </h1>
      </motion.div>

      {/* Floating collection buttons */}
      {COLLECTIONS.map((col, i) => (
        <FloatingButton
          key={col.label}
          href={col.href}
          label={col.label}
          image={col.image}
          variant="collection"
          index={i}
          total={COLLECTIONS.length}
        />
      ))}

      {/* Floating nav buttons — pushed out to the far edges */}
      {NAV_BUTTONS.map((nav, i) => (
        <FloatingButton
          key={nav.label}
          href={nav.href}
          label={nav.label}
          image=""
          icon={nav.icon}
          variant="nav"
          index={i}
          total={NAV_BUTTONS.length}
          angleOffset={Math.PI / 2}
        />
      ))}

      {/* Hint at bottom */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-brown/30 dark:text-cream/30"
      >
        touch any to explore
      </motion.p>
    </main>
  );
}