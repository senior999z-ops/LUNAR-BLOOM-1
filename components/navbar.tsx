'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart, useWishlist } from '@/components/providers';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop?tab=stitched', label: 'Stitched' },
  { href: '/shop?tab=unstitched', label: 'Unstitched' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setIsOpen, count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push('/shop?search=' + encodeURIComponent(q));
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-8 left-0 z-[100] w-full transition-all duration-500',
          scrolled ? 'glass-strong py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'py-5'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="group flex flex-col items-start">
            <span className="font-script text-lg leading-none text-gold transition-transform group-hover:scale-110">
              Lunar Bloom
            </span>
            <span className="font-serif text-xl font-light tracking-[0.25em] text-brown dark:text-cream">
              LUNAR BLOOM
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'block rounded-full px-5 py-2.5 font-sans text-sm tracking-wide shadow-md transition-all duration-300',
                    pathname === link.href
                      ? 'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-brown-dark'
                      : 'glass-strong text-brown/80 hover:text-brown dark:text-cream/80 dark:hover:text-cream'
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-3 md:gap-4">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-full p-2 text-brown/70 transition-colors hover:text-gold dark:text-cream/70"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full p-2 text-brown/70 transition-colors hover:text-gold dark:text-cream/70"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <Link
              href="/wishlist"
              className="rounded-full p-2 text-brown/70 transition-colors hover:text-gold dark:text-cream/70"
              aria-label="Wishlist"
            >
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="relative rounded-full p-2 text-brown/70 transition-colors hover:text-gold dark:text-cream/70"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 text-brown/70 transition-colors hover:text-gold dark:text-cream/70 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 lg:px-10"
            >
              <div className="mx-auto max-w-2xl py-4">
                <form onSubmit={handleSearch} className="glass flex items-center gap-3 rounded-full px-6 py-3">
                  <Search className="h-5 w-5 text-gold" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or product code..."
                    className="w-full bg-transparent font-sans text-sm text-brown outline-none placeholder:text-brown/40 dark:text-cream dark:placeholder:text-cream/40"
                  />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-brown-dark/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] glass-strong p-8"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-script text-xl text-gold">Lunar Bloom</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full p-2 text-brown/70 dark:text-cream/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block border-b border-brown/10 py-4 font-serif text-2xl transition-colors dark:border-cream/10',
                        pathname === link.href
                          ? 'text-gold'
                          : 'text-brown dark:text-cream'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
