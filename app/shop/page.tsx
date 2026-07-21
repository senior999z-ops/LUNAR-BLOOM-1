'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Package, Scissors, Search, Shirt, Sparkles } from 'lucide-react';
import { Suspense, useEffect, useMemo, useState } from 'react';
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
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] w-full rounded-2xl bg-brown/10 dark:bg-cream/10" />
              <div className="mt-4 h-4 w-2/3 rounded-full bg-brown/10 dark:bg-cream/10" />
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
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setPetals(
      Array.from({ length: mobile ? 4 : 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 12 + 14,
        size: Math.random() * 10 + 8,
      }))
    );
  }, []);

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
    <main className="relative z-10 min-h-screen overflow-hidden pt-32">
      {/* Falling golden petals across the whole page */}
      <div className="pointer-events-none absolute inset-0">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute -top-8"
            style={{ left: `${p.left}%` }}
            animate={{ y: ['0vh', '120vh'], x: [0, 30, -20, 15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          >
            <div
              style={{
                width: p.size,
                height: p.size * 1.3,
                background: 'linear-gradient(135deg, hsl(var(--gold) / 0.5), hsl(var(--gold-light) / 0.2))',
                borderRadius: '100% 0 100% 0',
                filter: 'blur(0.5px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header with sparkle accents */}
        <div className="relative mb-12 text-center">
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="h-5 w-5 text-gold/40" />
          </motion.div>

          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">The Collection</p>
          </Reveal>
          <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            <TextReveal text="Shop All" />
          </h1>

          {/* Animated underline that draws itself */}
          <motion.div
            className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 180, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-sm text-brown/60 dark:text-cream/60">
              Discover the full LUNAR BLOOM collection. Heritage embroidery, pure
              fabrics, handcrafted in Pakistan.
            </p>
          </Reveal>
        </div>

        {/* Stitched / Unstitched Tabs — with glow */}
        <div className="mb-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative flex rounded-full border border-gold/20 p-1 shadow-[0_0_30px_hsl(45_65%_47%/0.15)]"
          >
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
          </motion.div>
        </div>

        {/* Category + Search + Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-all',
                  category === cat
                    ? 'bg-gradient-to-r from-gold-dark to-gold text-brown-dark shadow-[0_4px_15px_hsl(45_65%_47%/0.4)]'
                    : 'border border-brown/15 text-brown/70 hover:border-gold hover:text-gold dark:border-cream/15 dark:text-cream/70'
                )}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="group flex items-center gap-2 rounded-full border border-brown/15 px-4 py-2 transition-colors focus-within:border-gold dark:border-cream/15">
              <Search className="h-4 w-4 text-gold transition-transform group-focus-within:scale-110" />
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
              className="rounded-full border border-brown/15 bg-cream-50 px-4 py-2 text-xs text-brown outline-none transition-colors hover:border-gold dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Products grid */}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center"
          >
            <Package className="mx-auto h-16 w-16 text-brown/20 dark:text-cream/20" />
            <p className="mt-4 font-serif text-2xl text-brown/50 dark:text-cream/50">
              No pieces found. Try a different search.
            </p>
          </motion.div>
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