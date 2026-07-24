'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/components/providers';
import { ProductCard } from '@/components/product-card';
import { Reveal, TextReveal } from '@/components/reveal';
import { products } from '@/lib/products';

export default function WishlistPage() {
  const { items } = useWishlist();
  const favorited = products.filter((p) => items.includes(p.id));

  return (
    <main className="relative z-10 min-h-screen pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">Your Favourites</p>
          </Reveal>
          <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            <TextReveal text="Wishlist" />
          </h1>
        </div>

        {favorited.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorited.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Heart className="mx-auto h-16 w-16 text-brown/20 dark:text-cream/20" />
            <p className="mt-4 font-serif text-2xl text-brown/50 dark:text-cream/50">
              Nothing here yet.
            </p>
            <p className="mt-2 text-sm text-brown/40 dark:text-cream/40">
              Tap the heart on any piece to save it here.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-gold-dark to-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-brown-dark"
            >
              Browse the Shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}