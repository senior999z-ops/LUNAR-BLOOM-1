'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart, Home, Info, Mail } from 'lucide-react';
import { FloatingButton } from '@/components/floating-button';

const COLLECTIONS = [
  { label: 'Stitched', href: '/shop?tab=stitched', image: 'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Unstitched', href: '/shop?tab=unstitched', image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const NAV_BUTTONS = [
  { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
  { label: 'About', href: '/about', icon: <Info className="h-4 w-4" /> },
  { label: 'Contact', href: '/contact', icon: <Mail className="h-4 w-4" /> },
  { label: 'Favourites', href: '/wishlist', icon: <Heart className="h-4 w-4" /> },
];

export default function CollectionsPage() {
  const [stars, setStars] = useState<Array<{ id: number; top: number; left: number; delay: number; duration: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setIsMobile(mobile);
    setStars(
      Array.from({ length: mobile ? 12 : 40 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  const orbCount = isMobile ? 2 : 5;

  return (
    <main className="relative z-10 h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        {/* Floating golden orbs — static (no blur animation) on mobile */}
        {[...Array(orbCount)].map((_, i) =>
          isMobile ? (
            <div
              key={i}
              className="absolute rounded-full opacity-30"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                top: `${15 + i * 15}%`,
                left: `${10 + i * 18}%`,
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.08), transparent 70%)',
                filter: 'blur(20px)',
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
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.5, 1.5, 0.5] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Minimal title */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute left-1/2 top-8 z-10 -translate-x-1/2 text-center"
      >
        <p className="font-serif text-sm uppercase tracking-[0.5em] text-gold sm:text-base">DISCOVER</p>
        <h1 className="mt-1 font-serif text-4xl font-light uppercase tracking-[0.12em] text-brown dark:text-cream sm:text-5xl md:text-6xl">
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

      {/* Floating nav buttons */}
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
          angleOffset={Math.PI / 4}
        />
      ))}

      {/* Hint at bottom */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-brown/30 dark:text-cream/30"
      >
        touch any to explore
      </motion.p>
    </main>
  );
}