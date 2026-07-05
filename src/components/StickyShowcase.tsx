import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './StickyShowcase.css';

export interface ShowcaseSection {
  title: string;
  description: string;
  video: string;
}

/**
 * Final-design showcase shared by case studies (same layout as the Spotify
 * solution section): on desktop a sticky phone-framed video sits beside
 * scrollable text sections, and the video swaps as each section activates.
 * On mobile the sections stack with their videos inline.
 */
export function StickyShowcase({ sections }: { sections: ShowcaseSection[] }) {
  const [activeSection, setActiveSection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentVideoIndexRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const swapTo = (index: number) => {
      if (currentVideoIndexRef.current === index) return;
      currentVideoIndexRef.current = index;
      const source = video.querySelector('source');
      if (source) {
        video.style.transition = 'opacity 0.25s ease';
        video.style.opacity = '0';
        setTimeout(() => {
          source.src = sections[index].video;
          video.load();
          video.play().catch(() => {});
          video.style.opacity = '1';
        }, 250);
      }
    };

    const update = () => {
      const marker = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      sectionRefs.current.forEach((section, i) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.height === 0) return; // hidden (mobile layout)
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - marker);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveSection(best);
      swapTo(best);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      setTimeout(() => {
        ticking = false;
        update();
      }, 50);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Desktop: sticky phone + scroll-driven sections */}
      <div className="hidden md:block mb-20">
        <div className="ss-container">
          <div className="ss-phone-display">
            <div className="ss-phone-frame">
              <video ref={videoRef} className="ss-phone-video" autoPlay loop muted playsInline preload="auto">
                <source src={sections[0].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="ss-scrollable">
            {sections.map((section, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                data-section={index}
                className={`ss-section ${activeSection === index ? 'active' : ''}`}
              >
                <h3 className="ss-title">{section.title}</h3>
                <p className="ss-description">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stacked videos */}
      <div className="md:hidden space-y-16">
        {sections.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="space-y-4"
          >
            <div className="aspect-[9/16] bg-neutral-100 dark:bg-neutral-800 overflow-hidden max-w-xs mx-auto rounded-3xl">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="auto">
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <h3 className="text-lg md:text-xl mb-2">{item.title}</h3>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
