'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { QuickViewModal } from '@/components/quick-view-modal';
import { motion } from 'framer-motion';
import { products, type Product } from '@/lib/products';

export function ProductShowcase() {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const featured = products.filter((p) => p.type === 'stitched').slice(0, 6);

  return (
    <section className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Minimal header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            the <span className="text-gradient-gold">edit</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setQuickView}
            />
          ))}
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
