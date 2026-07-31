'use client';

import { Reveal, TextReveal } from '@/components/reveal';

const SECTIONS = [
  {
    title: 'Privacy Policy',
    body: 'We collect only the information needed to process your order — name, phone, email, and delivery address. We never sell or share your data with third parties.',
  },
  {
    title: 'Terms & Conditions',
    body: 'All products are handcrafted and may have slight variations from the photos shown. By placing an order, you agree to our Cash on Delivery terms and delivery timelines.',
  },
  {
    title: 'Refund & Exchange Policy',
    body: 'If your item arrives damaged or incorrect, contact us within 3 days of delivery for a replacement or refund. Unstitched items must be unused and unwashed to qualify.',
  },
  {
    title: 'Shipping Policy',
    body: 'We deliver across Pakistan. Orders are typically dispatched within 3-5 business days and delivered within 5-7 business days depending on your city.',
  },
];

export default function LegalPage() {
  return (
    <main className="relative z-10 min-h-screen pt-32">
      <div className="mx-auto max-w-3xl px-6 pb-24 lg:px-10">
        <div className="mb-16 text-center">
          <Reveal direction="blur">
            <p className="font-script text-2xl text-gold">The Fine Print</p>
          </Reveal>
          <h1 className="mt-2 font-serif text-5xl font-light text-brown dark:text-cream md:text-7xl">
            <TextReveal text="Policy & Terms" />
          </h1>
        </div>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title} className="border-b border-brown/10 pb-8 dark:border-cream/10">
              <h2 className="font-serif text-2xl text-brown dark:text-cream">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-brown/60 dark:text-cream/60">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
