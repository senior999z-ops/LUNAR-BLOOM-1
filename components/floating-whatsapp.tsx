'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/0000000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-white shadow-lg transition-shadow hover:glow-gold"
      aria-label="WhatsApp"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.div>
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-gold"
        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.a>
  );
}
