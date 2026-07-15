'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/providers';
import { formatPKR } from '@/lib/products';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200]"
        >
          <div
            className="absolute inset-0 bg-brown-dark/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col glass-strong"
          >
            <div className="flex items-center justify-between border-b border-brown/10 p-6 dark:border-cream/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <h2 className="font-serif text-2xl text-brown dark:text-cream">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-brown/60 transition-colors hover:text-gold dark:text-cream/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-6xl opacity-20">🛍️</div>
                <p className="font-serif text-xl text-brown dark:text-cream">
                  Your cart is empty
                </p>
                <p className="text-sm text-brown/50 dark:text-cream/50">
                  Discover our collection and let elegance bloom.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 rounded-full bg-gradient-to-r from-gold-dark to-gold px-8 py-3 text-sm font-medium text-brown-dark transition-shadow hover:glow-gold"
                >
                  Explore Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex gap-4 rounded-2xl border border-brown/10 bg-cream-50/50 p-4 dark:border-cream/10 dark:bg-cream/5"
                      >
                        <div
                          className="h-20 w-20 flex-shrink-0 rounded-xl bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="flex flex-1 flex-col">
                          <h3 className="font-serif text-lg text-brown dark:text-cream">
                            {item.name}
                          </h3>
                          {item.size && (
                            <p className="text-xs text-brown/50 dark:text-cream/50">
                              {item.size}
                            </p>
                          )}
                          <p className="text-sm font-medium text-gold">
                            {formatPKR(item.price)}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-brown/20 text-brown dark:border-cream/20 dark:text-cream"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm text-brown dark:text-cream">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-brown/20 text-brown dark:border-cream/20 dark:text-cream"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-brown/40 transition-colors hover:text-red-500 dark:text-cream/40"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-brown/10 p-6 dark:border-cream/10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-serif text-lg text-brown dark:text-cream">
                      Total
                    </span>
                    <span className="font-serif text-2xl text-gradient-gold">
                      {formatPKR(total)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block w-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-center text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
