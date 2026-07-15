'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

export function ConditionalChrome({ navbar, footer, children }: { navbar: ReactNode; footer: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <AnimatePresence>{!isHome && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{navbar}</motion.div>}</AnimatePresence>
      {children}
      <AnimatePresence>{!isHome && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{footer}</motion.div>}</AnimatePresence>
    </>
  );
}
