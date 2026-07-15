'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Reveal } from '@/components/reveal';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        router.push('/');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-32">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-brown/60 transition-colors hover:text-gold dark:text-cream/60"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back Home
        </Link>

        <Reveal>
          <div className="glass-strong rounded-3xl p-10">
            <div className="mb-8 text-center">
              <p className="font-script text-2xl text-gold">Lunar Bloom</p>
              <h1 className="mt-1 font-serif text-3xl font-light text-brown dark:text-cream">
                {mode === 'login' ? 'Welcome Back' : 'Join the Bloom'}
              </h1>
              <p className="mt-2 text-sm text-brown/50 dark:text-cream/50">
                {mode === 'login'
                  ? 'Sign in to continue your ritual'
                  : 'Create an account to begin your journey'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                  <input
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-2xl border border-brown/15 bg-cream-50/50 py-3 pl-12 pr-4 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-brown/15 bg-cream-50/50 py-3 pl-12 pr-4 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-2xl border border-brown/15 bg-cream-50/50 py-3 pl-12 pr-4 text-sm text-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 dark:border-cream/15 dark:bg-cream/5 dark:text-cream"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-950/30"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light py-4 text-sm font-medium uppercase tracking-wider text-brown-dark transition-shadow hover:glow-gold disabled:opacity-50"
              >
                {loading
                  ? 'Please wait...'
                  : mode === 'login'
                  ? 'Sign In'
                  : 'Create Account'}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-brown/50 dark:text-cream/50">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <Link
                href={mode === 'login' ? '/register' : '/login'}
                className="text-gold underline-offset-4 hover:underline"
              >
                {mode === 'login' ? 'Register' : 'Sign In'}
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
