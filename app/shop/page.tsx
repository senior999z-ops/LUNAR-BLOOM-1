'use client';

import { motion } from 'framer-motion';
import { Package, Scissors, Search, Shirt } from 'lucide-react';
import Link from 'next/link';
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
  const [search, setSearch] = useState('');

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    if (isSearching) {
      const q = search.trim().toLowerCase();
      // While searching, look across both Stitched and Unstitched — not
      // just whichever tab happens to be selected.
      return products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
      );
    }
    return products.filter((p) => p.type === tab);
  }, [tab, search, isSearching]);

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
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-sm text-brown/60 dark:text-cream/60">
              Discover the full LUNAR BLOOM collection. Heritage embroidery, pure
              fabrics, handcrafted in Pakistan.
            </p>
          </Reveal>
        </div>

        {/* Search box */}
        <div className="mx-auto mb-8 max-w-md">
          <div className="flex items-center gap-2 rounded-full border border-brown/15 px-5 py-3 dark:border-cream/15">
            <Search className="h-4 w-4 text-gold" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or product code..."
              className="w-full bg-transparent text-sm text-brown outline-none placeholder:text-brown/40 dark:text-cream dark:placeholder:text-cream/40"
            />
          </div>
        </div>

        {/* Stitched / Unstitched Tabs — hidden while actively searching */}
        {!isSearching && (
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
        )}

        {isSearching && <div className="mb-8" />}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/shop/${product.id}`}
                  className="group block overflow-hidden rounded-3xl border border-brown/10 transition-colors hover:border-gold dark:border-cream/10"
                >
                  <div className="relative aspect-[3/4]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    {product.badge && (
                      <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-gold-dark to-gold px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-brown-dark shadow-lg">
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute right-4 top-4 rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-wider text-gold">
                      {product.type}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                      {product.tagline}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl text-brown transition-colors group-hover:text-gold dark:text-cream">
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
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Package className="mx-auto h-16 w-16 text-brown/20 dark:text-cream/20" />
            <p className="mt-4 font-serif text-2xl text-brown/50 dark:text-cream/50">
              No pieces found. Try a different search.
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
