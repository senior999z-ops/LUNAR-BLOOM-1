'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FloatingBackButton() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, x: -30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => router.back()}
      data-cursor-label="back"
      className="fixed left-4 top-24 z-[120] flex items-center gap-2 rounded-full glass-strong px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-brown shadow-lg dark:text-cream lg:left-6 lg:top-6"
    >
      <ArrowLeft className="h-4 w-4" />
    </motion.button>
  );
}