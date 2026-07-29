'use client';

import { motion } from 'framer-motion';
import { Package, Scissors, Shirt } from 'lucide-react';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FloatingBackButton } from '@/components/floating-back-button';
import { Reveal, TextReveal } from '@/components/reveal';
import { products, formatPKR } from '@/lib/products';
import { cn } from '@/lib/utils';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'stitched' ? 'stitched' : 'unstitched';
  const [tab, setTab] = useState<'stitched' | 'unstitched'>(initialTab);

  const filtered = useMemo(() => products.filter((p) => p.type === tab), [tab]);

  return (
    <main className="relative z-10 min-h-screen pt-32">
      <FloatingBackButton />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">The Collection</p>
          </Reveal>
          <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            <TextReveal text="Shop All" />
          </h1>
        </div>

        <div className="mb-14 flex justify-center">
          <div className="relative flex rounded-full border border-brown/15 p-1 dark:border-cream/15">
            {(['stitched', 'unstitched'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'relative z-10 flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors',
                  tab === t ? 'text-brown-dark' : 'text-brown/60 hover:text-gold dark:text-cream/60'
                )}
              >
                {t === 'stitched' ? <Shirt className="h-4 w-4" /> : <Scissors className="h-4 w-4" />}
                {t}
              </button>
            ))}
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-y-1 left-1 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-lg"
              style={{ width: 'calc(50% - 4px)' }}
              animate={{ x: tab === 'stitched' ? 0 : 'calc(100% + 0px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-3xl border border-brown/10 dark:border-cream/10"
              >
                <div
                  className="aspect-[3/4] bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                    {product.tagline}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-brown dark:text-cream">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-brown/40 dark:text-cream/40">
                    Code: {product.code}
                  </p>
                  <p className="mt-3 text-sm text-brown/60 dark:text-cream/60">
                    {product.fabric}
                  </p>
                  <p className="mt-4 font-serif text-2xl text-gradient-gold">
                    {formatPKR(product.price)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Package className="mx-auto h-16 w-16 text-brown/20 dark:text-cream/20" />
            <p className="mt-4 font-serif text-2xl text-brown/50 dark:text-cream/50">
              More pieces coming soon in this section.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageContent />
    </Suspense>
  );
}
