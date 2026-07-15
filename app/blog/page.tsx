'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/reveal';
import { FloatingBackButton } from '@/components/floating-back-button';

const POSTS = [
  {
    id: 'eid-edit-2026',
    title: 'The Eid Edit 2026: What to Wear This Celebration',
    excerpt:
      'From pret lawn suits to formal chiffon, our complete guide to dressing for Eid — inspired by the colors of Pakistani festivities.',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Styling',
    date: 'Jul 1, 2026',
    readTime: '6 min',
  },
  {
    id: 'art-of-zardozi',
    title: 'The Art of Zardozi: A 400-Year-Old Craft Lives On',
    excerpt:
      'Inside our Lahore atelier, master karigars keep the tradition of zardozi embroidery alive — one stitch at a time.',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Craft',
    date: 'Jun 24, 2026',
    readTime: '5 min',
  },
  {
    id: 'bridal-guide',
    title: 'The Pakistani Bride: Choosing Your Heirloom Piece',
    excerpt:
      'A guide to selecting the perfect bridal ensemble — from fabric to embroidery to the dupatta that completes the look.',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Bridal',
    date: 'Jun 15, 2026',
    readTime: '8 min',
  },
  {
    id: 'lawn-love',
    title: 'Lawn Love: Why Cotton Is King in Pakistani Summers',
    excerpt:
      'The history and beauty of cotton lawn — the fabric that keeps Pakistan cool and elegant through the hottest months.',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Fabric',
    date: 'Jun 8, 2026',
    readTime: '4 min',
  },
  {
    id: 'chikankari-story',
    title: 'Chikankari: The Whisper of White Thread',
    excerpt:
      'From the courtyards of Lucknow to the streets of Lahore, the delicate art of chikankari threadwork continues to enchant.',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Craft',
    date: 'May 30, 2026',
    readTime: '5 min',
  },
  {
    id: 'walima-style',
    title: 'Walima Style: Elegant Looks for the Reception',
    excerpt:
      'Soft pastels, rich jewel tones, or classic gold — our guide to choosing the perfect walima outfit that complements your bridal look.',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Styling',
    date: 'May 22, 2026',
    readTime: '7 min',
  },
];

export default function BlogPage() {
  return (
    <main className="relative z-10 min-h-screen pt-32">
      <FloatingBackButton />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">The Journal</p>
          </Reveal>
          <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            <TextReveal text="Stories & Craft" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-sm text-brown/60 dark:text-cream/60">
              Insights, styling guides, and the stories behind the craft — from our Lahore atelier to you.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-brown/10 dark:border-cream/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-wider text-gold">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-brown/50 dark:text-cream/50">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-xl leading-snug text-brown dark:text-cream">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brown/60 dark:text-cream/60">
                  {post.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-gold">
                  Read More
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
