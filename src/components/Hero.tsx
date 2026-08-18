import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import DynamicParticles from '../vendor/DynamicParticles.js';

export function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    /* The whole first screen is the graphic — nothing else competes with it. */
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        {/* Grouped, not flat — a flat prop is silently overwritten by the
            nested default. Each group passed has to be complete. */}
        <DynamicParticles
          appearance={{
            logoImage: '/frame1.png',
            /* Sample the icon's own magenta-to-violet gradient (#994780 →
               #5e1098) rather than substituting a palette. It only read as
               near-black before because the default shadow crushed it. */
            useOriginalColors: true,
            color1: '#FFFFFF',
            color2: '#8F8F8F',
            particleDensity: 16,
            particleSize: 1.1,
            volumeDepth: 2,
            bevel: 1,
            /* Divided by 10 internally — 20 filled most of the viewport. */
            logoScale: 9,
            cameraDistance: 6,
          }}
          interaction={{
            /* Off — this also disables the click-and-drag 360 rotation, so the
               orb can't be spun out of position. It still reacts to the
               pointer via mouseRadius/mouseForce. */
            enableRotation: false,
            rotationSpeed: 0,
            /* Scatter area in px, and scatter power as a percent. Pulled well
               back from the defaults so the pointer nudges the cloud rather
               than blowing a hole through it. */
            mouseRadius: 150,
            mouseForce: 5.5,
          }}
          /* The default shadow is near-black (#0D0D0D) and swamps the colours,
             so the whole cloud reads dark however you set color1/color2. */
          lighting={{ lightColor: '#FFFFFF', shadowColor: '#D6C7F5' }}
          behavior={{ animationSpeed: 4, noiseAmplitude: 5 }}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      {/* The only affordance on the screen. */}
      <motion.button
        type="button"
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-neutral-400 hover:text-neutral-900 transition-colors -m-2.5 p-2.5 touch-manipulation"
        aria-label="Scroll to my work"
        /* 44px hit area around a 24px glyph. */
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
