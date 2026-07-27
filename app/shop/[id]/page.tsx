'use client';

import { motion } from 'framer-motion';
import { Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { useCart, useWishlist } from '@/components/providers';
import { ProductCard } from '@/components/product-card';
import { Reveal, TextReveal } from '@/components/reveal';
import { getProduct, products, formatPKR } from '@/lib/products';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProduct(id);

  // All hooks must run before any early return — React requires the same
  // hook order on every render.
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    // Extra top clearance on small screens — the announcement bar + navbar
    // stack is a little taller there than pt-32 alone accounted for, which
    // was letting the fixed header sit over the product image.
    <main className="relative z-10 min-h-screen pt-44 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image with zoom */}
          <Reveal direction="left">
            <div
              className="group relative aspect-square overflow-hidden rounded-3xl border border-brown/10 dark:border-cream/10"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${product.image})`,
                  transform: zoom ? 'scale(1.5)' : 'scale(1)',
                }}
              />
              <div className="absolute bottom-4 right-4 rounded-full glass px-3 py-1 text-xs text-brown/70 dark:text-cream/70">
                Hover to zoom
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal direction="right">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {product.tagline}
              </p>
              <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream">
                {product.name}
              </h1>

              <p className="mt-6 text-base leading-relaxed text-brown/70 dark:text-cream/70">
                {product.description}
              </p>

              {/* Craft Details */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-brown/50 dark:text-cream/50">
                  Craft Details
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-sm text-brown dark:text-cream"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-brown/50 dark:text-cream/50">
                  Fabric
                </p>
                <p className="mt-2 text-sm text-brown/60 dark:text-cream/60">
                  {product.fabric}
                </p>
              </div>

              <p className="mt-8 font-serif text-4xl text-gradient-gold">
                {formatPKR(product.price)}
                <span className="ml-2 text-base text-brown/50 dark:text-cream/50">
                  / {product.size}
                </span>
              </p>

              {/* Quantity + Add */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-full border border-brown/15 px-4 py-2 dark:border-cream/15">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-brown dark:text-cream"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-serif text-lg text-brown dark:text-cream">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-brown dark:text-cream"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
                >
                  {added ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" /> Added!
                    </motion.span>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
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

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-brown/10 pt-8 dark:border-cream/10">
                {['Handcrafted', 'Pure Fabric', 'Made in Pakistan'].map((feat) => (
                  <div key={feat} className="text-center">
                    <Check className="mx-auto h-5 w-5 text-gold" />
                    <p className="mt-2 text-xs text-brown/60 dark:text-cream/60">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-32">
            <div className="mb-12 text-center">
              <Reveal direction="blur">
                <p className="font-script text-2xl text-gold">You May Also Love</p>
              </Reveal>
              <h2 className="mt-2 font-serif text-4xl font-light text-brown dark:text-cream">
                <TextReveal text="Complete the Look" />
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}