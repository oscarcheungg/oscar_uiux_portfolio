import { useEffect, useRef, useState } from 'react';
import { BackToWork } from '../components/CaseStudy';
import { ArcPhoto, PhotoArc } from '../components/PhotoArc';
import { CherryTree } from '../components/CherryTree';
import { Decode } from '../components/Decode';
import { Signature } from '../components/Signature';
import { usePrefs } from '../lib/prefs';
import { play } from '../home/sound';
import './about.css';

/* About: one centred column. The hello, then the photos drifting by in a
   straight row (see PhotoArc), then the story with a pixel cherry tree
   beside it. Shaking the tree is the easter egg: it turns every photo into
   dots (and back). */

/* The photos in the row (see PhotoArc), whole at one shared height, in the
   order and with the captions they have in the Figma file. Add or
   change a caption to label a photo; leave it out and the tile goes
   uncaptioned. */
const PHOTOS: ArcPhoto[] = [
  { src: '/about/strip/03-marathon.jpg', w: 600, h: 900, caption: 'My first marathon, 2:50:50 on debut!', alt: 'Oscar and a friend holding their marathon medals' },
  { src: '/about/strip/02-img9091.jpg', w: 600, h: 800, alt: 'A city skyline across the water at dusk' },
  { src: '/about/strip/01-img0569.jpg', w: 600, h: 800, caption: 'I love fish', alt: 'A plate of salmon and tuna sashimi' },
  { src: '/about/strip/05-img7260.jpg', w: 600, h: 800, alt: 'Oscar at a fair at golden hour' },
  { src: '/about/strip/04-img0992.jpg', w: 600, h: 800, caption: 'Ran it again: 2:49:18, qualified for Chicago 2028!', alt: 'Friends under the marathon finish arch' },
  { src: '/about/strip/06-img8646.jpg', w: 600, h: 800, alt: 'Friends taking photos of each other on a sidewalk' },
  { src: '/about/strip/07-img0324.jpg', w: 600, h: 800, alt: 'A selfie on a bike ride under a bridge' },
  { src: '/about/strip/08-img8626.jpg', w: 600, h: 900, caption: 'I am part of a Chinese fan dancing team at UNC', alt: 'A big group photo with bouquets of flowers' },
  { src: '/about/strip/10-img1456.jpg', w: 600, h: 800, caption: 'Slightest hint I like fish?', alt: 'A homemade sushi spread on a table' },
  { src: '/about/strip/11-cusa.jpg', w: 900, h: 600, caption: 'The CUSA exec board 🫶🏻', alt: 'Friends posing together in a living room' },
  { src: '/about/strip/13-newprofile.jpg', w: 600, h: 600, alt: 'Oscar on a sofa, glancing to the side' },
  { src: '/about/strip/12-img2347.jpg', w: 900, h: 600, alt: 'A group on stage in front of a new year banquet screen' },
  { src: '/about/strip/09-img9028.jpg', w: 600, h: 800, caption: 'Dream of being in Chicago post-grad', alt: 'A city lit up at night from above' },
  { src: '/about/strip/14-family.jpg', w: 801, h: 600, caption: 'My family back in Hong Kong', alt: 'Family around a round dinner table' },
  { src: '/about/strip/15-oakhouse.jpg', w: 898, h: 600, alt: 'Friends working on laptops at the Oak House café' },
  { src: '/about/strip/16-img1011.jpg', w: 600, h: 800, caption: 'Track workouts on top', alt: 'Sneakers stretched out under a sunset sky' },
];



export function About() {
  // The easter egg: shaking the cherry tree turns every photo into dots and
  // decodes the heading the homepage "Engineer" way, settling as
  // <Hey there, I'm Oscar /> in blue; shaking it again turns it all back.
  const [dots, setDots] = useState(false);
  const [run, setRun] = useState(0);
  const { sound } = usePrefs();
  const shaken = () => {
    if (sound) play('rustle');
    setDots((was) => !was);
    setRun((n) => n + 1);
  };

  // The handwritten name writes itself in the first time it comes into view.
  const sign = useRef<HTMLDivElement>(null);
  const [written, setWritten] = useState(false);
  useEffect(() => {
    const el = sign.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setWritten(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="cs-page about">
      <BackToWork className="about-back" />

      <main className="about-layout">
        <h1 className="about-heading about-title" data-code={dots || undefined}>
          <span className="about-bracket" aria-hidden="true">
            &lt;
          </span>
          <Decode text="Hey there, I’m Oscar 👋🏻" run={run} />
          <span className="about-bracket about-bracket--close" aria-hidden="true">
            &nbsp;/&gt;
          </span>
        </h1>

        <PhotoArc photos={PHOTOS} dots={dots} />

        {/* The story, with a little pixel cherry tree beside it. */}
        <div className="about-story">
          <div className="about-prose">
            <p>
              I didn’t know I wanted to be a designer. I came into college expecting to pursue software engineering or
              data science, but a web design class introduced me to the space where technical thinking meets creativity.
              Design became the way I could understand how technology works while shaping how people experience and
              enjoy it.
            </p>
            <p>
              I’ve been lucky enough to work on all sorts of problems at the intersection of design and technology,
              building intuitive experiences across web and mobile alongside some incredibly talented people. A hundred
              prototypes later, and I’d do it all over again.
            </p>
            <p>Here’s to the next hundred.</p>
          </div>
          <div className="about-tree">
            <CherryTree scale={0.93} onShake={shaken} />
          </div>

          {/* My name in my own hand, signing off the story. */}
          <div ref={sign} className="about-sign" data-written={written || undefined}>
            <Signature className="about-signature" maskId="about-signature-ink" />
          </div>
        </div>
      </main>
    </div>
  );
}
