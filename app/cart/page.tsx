'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/providers';
import { Reveal } from '@/components/reveal';
import { FloatingBackButton } from '@/components/floating-back-button';
import { formatPKR } from '@/lib/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const tax = Math.round(total * 0.08);
  const grandTotal = total + tax;

  return (
    <main className="relative z-10 min-h-screen pt-32">
      <FloatingBackButton />
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Link
          href="/shop"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-brown/60 transition-colors hover:text-gold dark:text-cream/60"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </Link>

        <Reveal>
          <h1 className="font-serif text-5xl font-light text-brown dark:text-cream">
            Your Cart
          </h1>
        </Reveal>

        {items.length === 0 ? (
          <div className="mt-20 flex flex-col items-center justify-center gap-6 text-center">
            <ShoppingBag className="h-16 w-16 text-brown/20 dark:text-cream/20" />
            <p className="font-serif text-2xl text-brown/50 dark:text-cream/50">
              Your cart is empty
            </p>
            <Link
              href="/shop"
              className="rounded-full bg-gradient-to-r from-gold-dark to-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2">
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
                      className="h-28 w-28 flex-shrink-0 rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex flex-1 flex-col">
                      <h3 className="font-serif text-xl text-brown dark:text-cream">
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
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-brown/20 text-brown dark:border-cream/20 dark:text-cream"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-brown dark:text-cream">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-brown/20 text-brown dark:border-cream/20 dark:text-cream"
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

              <button
                onClick={clearCart}
                className="mt-4 text-sm text-brown/40 underline-offset-4 hover:underline dark:text-cream/40"
              >
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="glass-strong sticky top-28 rounded-2xl p-6">
                <h2 className="font-serif text-2xl text-brown dark:text-cream">
                  Order Summary
                </h2>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm text-brown/60 dark:text-cream/60">
                    <span>Subtotal</span>
                    <span>{formatPKR(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-brown/60 dark:text-cream/60">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-brown/60 dark:text-cream/60">
                    <span>Tax</span>
                    <span>{formatPKR(tax)}</span>
                  </div>
                  <div className="mt-4 border-t border-brown/10 pt-4 dark:border-cream/10">
                    <div className="flex justify-between">
                      <span className="font-serif text-xl text-brown dark:text-cream">
                        Total
                      </span>
                      <span className="font-serif text-2xl text-gradient-gold">
                        {formatPKR(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 block w-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-center text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
