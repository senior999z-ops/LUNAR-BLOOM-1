'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(t);
  }, [dismissed]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-brown-dark/40 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-strong p-10 text-center"
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 rounded-full p-2 text-brown/50 transition-colors hover:text-gold dark:text-cream/50"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-white"
            >
              <Sparkles className="h-7 w-7" />
            </motion.div>

            <h2 className="font-serif text-3xl text-brown dark:text-cream">
              A Gift From the <span className="text-gradient-gold">Moon</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-brown/60 dark:text-cream/60">
              Join our inner circle and receive 15% off your first ritual.
              Exclusive access to new blooms and private collections.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const { error } = await supabase
                  .from('newsletter_subscribers')
                  .insert({ email: (e.target as HTMLFormElement).email.value });
                if (!error || error.code === '23505') {
                  close();
                }
              }}
              className="mx-auto mt-6 flex max-w-sm flex-col gap-3"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="rounded-full border border-brown/20 bg-cream-50/50 px-6 py-3 text-sm text-brown outline-none placeholder:text-brown/40 focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/20 dark:bg-cream/5 dark:text-cream dark:placeholder:text-cream/40"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-3 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
              >
                Claim My Gift
              </motion.button>
            </form>

            <button
              onClick={close}
              className="mt-4 text-xs text-brown/40 underline-offset-4 hover:underline dark:text-cream/40"
            >
              No thanks, I'll browse freely
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
