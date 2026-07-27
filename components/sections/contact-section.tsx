'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Minimal header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            <span className="text-gradient-gold">say</span> hello
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Info — minimal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, value: 'Lahore, Pakistan' },
              { icon: Mail, value: 'support.lunarbloom.pk@gmail.com' },
              { icon: Phone, value: '+92 327 9198527' },
              { icon: Instagram, value: '@lunarbloom.pk' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full glass text-gold">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="font-serif text-lg text-brown dark:text-cream">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

              setSending(true);
              await supabase.from('contact_messages').insert({ name, email, message });
              setSending(false);
              setSent(true);
              form.reset();
              setTimeout(() => setSent(false), 3000);
            }}
            className="space-y-4"
          >
            {[
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
            ].map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  required
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  className="peer w-full rounded-2xl border border-brown/15 bg-cream-50/50 px-5 pt-6 pb-2 text-sm text-brown outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                  placeholder=" "
                  id={field.name}
                />
                <label
                  htmlFor={field.name}
                  className={`pointer-events-none absolute left-5 transition-all duration-300 ${
                    focused === field.name
                      ? 'top-2 text-[10px] uppercase tracking-wider text-gold'
                      : 'top-4 text-sm text-brown/40 dark:text-cream/40'
                  } peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider`}
                >
                  {field.label}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                required
                name="message"
                rows={3}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className="peer w-full resize-none rounded-2xl border border-brown/15 bg-cream-50/50 px-5 pt-6 pb-2 text-sm text-brown outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                placeholder=" "
                id="message"
              />
              <label
                htmlFor="message"
                className={`pointer-events-none absolute left-5 transition-all duration-300 ${
                  focused === 'message'
                    ? 'top-2 text-[10px] uppercase tracking-wider text-gold'
                    : 'top-4 text-sm text-brown/40 dark:text-cream/40'
                } peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider`}
              >
                Message
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold"
            >
              {sent ? 'Shukriya!' : (
                <>
                  <Send className="h-4 w-4" />
                  Send
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}