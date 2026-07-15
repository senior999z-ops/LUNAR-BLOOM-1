import { ContactSection } from '@/components/sections/contact-section';
import { Reveal, TextReveal } from '@/components/reveal';
import { FloatingBackButton } from '@/components/floating-back-button';

export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen pt-32">
      <FloatingBackButton />
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <Reveal direction="blur">
            <p className="font-script text-3xl text-gold">Connect</p>
          </Reveal>
          <h1 className="mt-2 font-serif text-6xl font-light text-brown dark:text-cream md:text-8xl">
            <TextReveal text="Contact" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base text-brown/60 dark:text-cream/60">
              We would love to hear from you. For consultations, bridal appointments,
              or simply to share your LUNAR BLOOM experience.
            </p>
          </Reveal>
        </div>
      </div>
      <ContactSection />
    </main>
  );
}
