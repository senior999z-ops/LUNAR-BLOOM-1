'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Eye } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/reveal';
import { products, type Product, formatPKR } from '@/lib/products';
import { QuickViewModal } from '@/components/quick-view-modal';

export function FeaturedCollection() {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 20 });

  // Duplicate for infinite feel
  const items = [...products, ...products];

  const handleDrag = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    const delta = e.movementX;
    x.set(x.get() + delta);
  };

  return (
    <section className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">Featured</p>
          </Reveal>
          <h2 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-6xl">
            <TextReveal text="The Carousel" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-sm text-brown/60 dark:text-cream/60">
              Drag to explore. Each product floats in its own orbit of light.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex cursor-grab gap-8 overflow-x-auto scrollbar-hide"
        style={{ touchAction: 'pan-y' }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }}
          className="flex gap-8 px-6 lg:px-10"
        >
          {items.map((product, i) => (
            <motion.div
              key={`${product.id}-${i}`}
              whileHover={{ y: -10, scale: 1.03, rotateY: 5, rotateX: -3 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="group relative flex-shrink-0"
            >
              <div className="relative h-[420px] w-[300px] overflow-hidden rounded-3xl border border-brown/10 dark:border-cream/10">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/60 via-transparent to-transparent" />

                {/* Floating animation */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                    {product.tagline}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-cream">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-serif text-xl text-gradient-gold">
                      {formatPKR(product.price)}
                    </p>
                    <button
                      onClick={() => setQuickView(product)}
                      className="flex h-10 w-10 items-center justify-center rounded-full glass-strong text-brown transition-colors hover:text-gold dark:text-cream"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
