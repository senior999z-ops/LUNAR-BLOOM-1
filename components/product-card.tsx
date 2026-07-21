'use client';

import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart, useWishlist } from '@/components/providers';
import type { Product } from '@/lib/products';
import { formatPKR } from '@/lib/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-brown/10 bg-cream-50/30 dark:border-cream/10 dark:bg-cream/5"
      >
        {/* Image container with veil reveal */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          />

          {/* Gradient veil that fades on hover */}
          <motion.div
            className="absolute inset-0 bg-brown-dark/60"
            animate={{ opacity: hovered ? 0 : 0.4 }}
            transition={{ duration: 0.5 }}
          />

          {/* Top gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-gold-dark to-gold px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-brown-dark shadow-lg">
              {product.badge}
            </div>
          )}

          {/* Type badge */}
          <div className="absolute right-4 top-4 z-10 rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-wider text-gold">
            {product.type}
          </div>

          {/* Hidden price that reveals on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2"
          >
            <span className="font-serif text-2xl text-gradient-gold">
              {formatPKR(product.price)}
            </span>
          </motion.div>

          {/* Action buttons that surprise-appear */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggle(product.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/90 dark:bg-brown-dark/90 text-brown dark:text-cream"
            >
              <Heart className={cn('h-4 w-4', has(product.id) && 'fill-gold text-gold')} />
            </motion.button>

            {onQuickView && (
              <motion.button
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onQuickView(product)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/90 dark:bg-brown-dark/90 text-brown dark:text-cream"
              >
                <Eye className="h-4 w-4" />
              </motion.button>
            )}

            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size: product.size,
                })
              }
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-dark to-gold text-brown-dark shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Corner SVG that draws in */}
          <svg className="absolute right-0 top-0 z-10 h-16 w-16" viewBox="0 0 64 64" fill="none">
            <motion.path
              d="M64 0 L64 64 L0 64"
              stroke="hsl(var(--gold))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        {/* Info — minimal, just name */}
        <div className="p-5">
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-serif text-xl text-brown transition-colors hover:text-gold dark:text-cream">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-brown/40 dark:text-cream/40">
            {product.tagline}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}