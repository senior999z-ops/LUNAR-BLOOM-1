'use client';

import { motion } from 'framer-motion';
import { Check, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/providers';
import { Reveal } from '@/components/reveal';
import { FloatingBackButton } from '@/components/floating-back-button';
import { formatPKR } from '@/lib/products';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'done'>('info');
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'Pakistan',
    card: '',
    expiry: '',
    cvc: '',
  });

  const tax = Math.round(total * 0.08);
  const grandTotal = total + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('done');
      setTimeout(() => {
        clearCart();
      }, 500);
    }
  };

  if (step === 'done') {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center pt-32">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-strong mx-6 max-w-lg rounded-3xl p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-white"
          >
            <Check className="h-10 w-10" />
          </motion.div>
          <h1 className="font-serif text-4xl text-brown dark:text-cream">
            Order Confirmed
          </h1>
          <p className="mt-4 text-sm text-brown/60 dark:text-cream/60">
            Shukriya for your purchase. Your LUNAR BLOOM piece is being crafted
            with care and will be delivered across Pakistan. A confirmation has
            been sent to your email.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-gold-dark to-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center pt-32">
        <div className="text-center">
          <p className="font-serif text-2xl text-brown/50 dark:text-cream/50">
            Your cart is empty.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-gradient-to-r from-gold-dark to-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-brown-dark"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen pt-32">
      <FloatingBackButton />
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <h1 className="font-serif text-5xl font-light text-brown dark:text-cream">
            Checkout
          </h1>
        </Reveal>

        {/* Steps */}
        <div className="mt-8 flex items-center gap-4">
          {['Information', 'Payment', 'Done'].map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                  (step === 'info' && i === 0) ||
                  (step === 'payment' && i <= 1) ||
                  ((step as string) === 'done' && i <= 2)
                    ? 'bg-gold text-brown-dark'
                    : 'border border-brown/20 text-brown/40 dark:border-cream/20 dark:text-cream/40'
                }`}
              >
                {i + 1}
              </div>
              <span className="text-sm text-brown/60 dark:text-cream/60">{s}</span>
              {i < 2 && <div className="h-px w-12 bg-brown/20 dark:bg-cream/20" />}
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            {step === 'info' && (
              <Reveal>
                <h2 className="font-serif text-2xl text-brown dark:text-cream">
                  Contact & Shipping
                </h2>
                <div className="mt-6 space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                    <input
                      required
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                  </div>
                  <input
                    required
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      required
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                    <input
                      required
                      placeholder="Postal Code"
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                    <input
                      required
                      placeholder="Country"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
                >
                  Continue to Payment
                </motion.button>
              </Reveal>
            )}

            {step === 'payment' && (
              <Reveal>
                <h2 className="font-serif text-2xl text-brown dark:text-cream">
                  Payment
                </h2>
                <div className="mt-4 flex items-center gap-2 text-xs text-brown/50 dark:text-cream/50">
                  <Lock className="h-3 w-3" />
                  Secure payment â€” Cash on Delivery also available across Pakistan.
                </div>
                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <CreditCard className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                    <input
                      required
                      placeholder="Card number"
                      value={form.card}
                      onChange={(e) => setForm({ ...form, card: e.target.value })}
                      className="w-full rounded-2xl border border-brown/15 bg-cream-50/50 py-3 pl-12 pr-5 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="MM / YY"
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                      className="rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                    <input
                      required
                      placeholder="CVC"
                      value={form.cvc}
                      onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                      className="rounded-2xl border border-brown/15 bg-cream-50/50 px-5 py-3 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('info')}
                    className="rounded-full border border-brown/15 px-8 py-4 text-sm uppercase tracking-wider text-brown dark:border-cream/15 dark:text-cream"
                  >
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
                  >
                    Place Order â€” {formatPKR(grandTotal)}
                  </motion.button>
                </div>
              </Reveal>
            )}
          </form>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass-strong sticky top-28 rounded-2xl p-6">
              <h2 className="font-serif text-xl text-brown dark:text-cream">
                Order Summary
              </h2>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className="h-14 w-14 flex-shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-brown dark:text-cream">
                        {item.name}
                      </p>
                      <p className="text-xs text-brown/50 dark:text-cream/50">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-gold">
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-brown/10 pt-4 text-sm dark:border-cream/10">
                <div className="flex justify-between text-brown/60 dark:text-cream/60">
                  <span>Subtotal</span>
                  <span>{formatPKR(total)}</span>
                </div>
                <div className="flex justify-between text-brown/60 dark:text-cream/60">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between border-t border-brown/10 pt-2 dark:border-cream/10">
                  <span className="font-serif text-lg text-brown dark:text-cream">
                    Total
                  </span>
                  <span className="font-serif text-xl text-gradient-gold">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

