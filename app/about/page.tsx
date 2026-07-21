import { PhilosophySection } from '@/components/sections/philosophy-section';
import { Reveal, TextReveal } from '@/components/reveal';

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen pt-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-20 text-center">
          <Reveal direction="blur">
            <p className="font-script text-3xl text-gold">Our Story</p>
          </Reveal>
          <h1 className="mt-2 font-serif text-6xl font-light text-brown dark:text-cream md:text-8xl">
            <TextReveal text="About" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brown/70 dark:text-cream/70">
              LUNAR BLOOM is the vision of Zaighum Mujahid — a Pakistani women's
              clothing brand where heritage meets modern elegance. We craft each
              piece in Lahore, honoring centuries of textile tradition while
              designing for the woman of today. From pret lawn suits to formal
              wear, every garment is a celebration of Pakistani craft.
            </p>
          </Reveal>
        </div>
      </div>

      <PhilosophySection />
    </main>
  );
}