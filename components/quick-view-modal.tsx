'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useCart, useWishlist } from '@/components/providers';
import type { Product } from '@/lib/products';
import { formatPKR } from '@/lib/products';
import { cn } from '@/lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-brown-dark/50 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl glass-strong md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 rounded-full p-2 text-brown/60 transition-colors hover:text-gold dark:text-cream/60"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="aspect-square bg-cover bg-center md:aspect-auto"
              style={{ backgroundImage: `url(${product.image})` }}
            />

            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                {product.tagline}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-brown dark:text-cream">
                {product.name}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-brown/70 dark:text-cream/70">
                {product.description}
              </p>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-brown/50 dark:text-cream/50">
                  Key Notes
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs text-brown dark:text-cream"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-5 font-serif text-3xl text-gradient-gold">
                {formatPKR(product.price)}
                <span className="ml-2 text-sm text-brown/50 dark:text-cream/50">
                  / {product.size}
                </span>
              </p>

              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: product.size,
                    });
                    onClose();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </motion.button>
                <button
                  onClick={() => toggle(product.id)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-brown transition-colors hover:border-gold dark:text-cream"
                >
                  <Heart
                    className={cn('h-5 w-5', has(product.id) && 'fill-gold text-gold')}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}