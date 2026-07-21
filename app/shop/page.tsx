'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Package, Scissors, Search, Shirt } from 'lucide-react';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { QuickViewModal } from '@/components/quick-view-modal';
import { Reveal, TextReveal } from '@/components/reveal';
import { products, type Product } from '@/lib/products';
import { cn } from '@/lib/utils';

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const CATEGORIES = ['all', 'pret', 'formal', 'accessories'] as const;

function ShopSkeleton() {
  return (
    <main className="relative z-10 min-h-screen pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="font-script text-2xl text-gold">The Collection</p>
          <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            Shop All
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-brown/60 dark:text-cream/60">
            Discover the full LUNAR BLOOM collection. Heritage embroidery, pure
            fabrics, handcrafted in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] w-full rounded-2xl bg-brown/10 dark:bg-cream/10" />
              <div className="mt-4 h-4 w-2/3 rounded-full bg-brown/10 dark:bg-cream/10" />
              <div className="mt-2 h-3 w-1/3 rounded-full bg-brown/10 dark:bg-cream/10" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'unstitched' ? 'unstitched' : 'stitched';

  const [tab, setTab] = useState<'stitched' | 'unstitched'>(initialTab);
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.type === tab);
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.notes.some((n) => n.toLowerCase().includes(q))
      );
    }
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    return result;
  }, [tab, category, sort, search]);

  return (
    <main className="relative z-10 min-h-screen pt-32">
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

        <div className="mb-10 flex justify-center">
          <div className="relative flex rounded-full border border-brown/15 p-1 dark:border-cream/15">
            {(['stitched', 'unstitched'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'relative z-10 flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors',
                  tab === t
                    ? 'text-brown-dark'
                    : 'text-brown/60 hover:text-gold dark:text-cream/60'
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

        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-all',
                  category === cat
                    ? 'bg-gradient-to-r from-gold-dark to-gold text-brown-dark'
                    : 'border border-brown/15 text-brown/70 hover:border-gold hover:text-gold dark:border-cream/15 dark:text-cream/70'
                )}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-brown/15 px-4 py-2 dark:border-cream/15">
              <Search className="h-4 w-4 text-gold" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-32 bg-transparent text-sm text-brown outline-none placeholder:text-brown/40 dark:text-cream dark:placeholder:text-cream/40"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-brown/15 bg-cream-50 px-4 py-2 text-xs text-brown outline-none dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab + category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onQuickView={setQuickView}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Package className="mx-auto h-16 w-16 text-brown/20 dark:text-cream/20" />
            <p className="mt-4 font-serif text-2xl text-brown/50 dark:text-cream/50">
              No pieces found. Try a different search.
            </p>
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopPageContent />
    </Suspense>
  );
}