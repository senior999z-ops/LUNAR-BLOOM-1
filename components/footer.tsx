'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const FOOTER_LINKS = {
  Shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/collections', label: 'Collections' },
    { href: '/shop?category=pret', label: 'Pret' },
    { href: '/shop?category=bridal', label: 'Bridal' },
  ],
  Brand: [
    { href: '/about', label: 'Our Story' },
    { href: '/blog', label: 'Journal' },
    { href: '/collections', label: 'Featured' },
    { href: '/contact', label: 'Contact' },
  ],
  Account: [
    { href: '/login', label: 'Sign In' },
    { href: '/register', label: 'Register' },
    { href: '/cart', label: 'Cart' },
    { href: '/checkout', label: 'Checkout' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [stars, setStars] = useState<Array<{ id: number; top: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <footer className="relative z-10 mt-32 overflow-hidden bg-brown-dark text-cream">
      {/* Animated moon */}
      <motion.div
        className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--gold) / 0.2), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-gold"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: 2, height: 2 }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* Newsletter */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl font-light tracking-wide md:text-5xl">
            Join the <span className="text-gradient-gold">Bloom</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream/60">
            Subscribe for exclusive offers, new arrivals, and Eid collections. Delivered across Pakistan.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (email) {
                await supabase.from('newsletter_subscribers').insert({ email });
                setSubscribed(true);
                setEmail('');
              }
            }}
            className="mx-auto mt-6 flex max-w-md items-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-6 py-3 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="rounded-full bg-gradient-to-r from-gold-dark to-gold px-8 py-3 text-sm font-medium text-brown-dark transition-shadow hover:glow-gold"
            >
              {subscribed ? 'Shukriya!' : 'Subscribe'}
            </motion.button>
          </form>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div>
            <div className="mb-2 font-script text-2xl text-gold">Lunar Bloom</div>
            <p className="font-serif text-2xl font-light tracking-[0.2em]">LUNAR BLOOM</p>
            <p className="mt-2 text-xs tracking-[0.2em] text-cream/40 uppercase">
              By Zaighum Mujahid
            </p>
            <p className="mt-4 max-w-xs text-sm text-cream/50">
              Luxury Pakistani women's couture. Handcrafted in Lahore with heritage embroidery and pure fabrics.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-sans text-xs tracking-[0.2em] text-gold uppercase">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      <span className="mr-0 h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 md:flex-row">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} LUNAR BLOOM. Crafted by Zaighum Mujahid. Made in Pakistan.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Youtube, href: '#' },
              { icon: Mail, href: '/contact' },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                whileHover={{ y: -4, scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors hover:border-gold hover:text-gold"
              >
                <s.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}