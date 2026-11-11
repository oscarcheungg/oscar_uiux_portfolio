import { useEffect, useRef, useState } from 'react';
import { AsciiOcean } from '../vendor/ascii-sharks/react';
import type { SharkSpec } from '../vendor/ascii-sharks';
import { PROFILE } from '../home/config';
import { usePrefs } from '../lib/prefs';
import { play } from '../home/sound';
import './footer.css';

/* The footer: the page fades briefly into a band of soft, even, pale-blue
   water with the homepage's ASCII koi pond in it (its light palette by day,
   its night palette with the lights off). A click in the water
   ripples it, with the pond's drop sound when sound is on. Along the bottom,
   the copyright and the ways to reach me. The pond pauses whenever it's
   scrolled out of view. */

const KOI: SharkSpec[] = [
  { kind: 'kohaku', size: 0.6 },
  { kind: 'sanke', size: 0.56 },
  { kind: 'showa', size: 0.58 },
  { kind: 'ogon', size: 0.53 },
  { kind: 'asagi', size: 0.56 },
  { kind: 'tancho', size: 0.51 },
  { kind: 'kigoi', size: 0.49 },
  { kind: 'kohaku', size: 0.46 },
];

// Phones get a calmer pond: fewer koi and fewer small fish.
const PHONE = '(max-width: 640px)';
const PHONE_KOI = KOI.slice(0, 4);

function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const on = () => setPhone(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
}

// Presses on the links aren't clicks in the water.
const INTERACTIVE = 'a, button';

const LINKS = [
  { label: 'Email', href: `mailto:${PROFILE.email}` },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'Instagram', href: PROFILE.instagram },
  { label: 'X', href: PROFILE.x },
];

export function Footer() {
  const { sound, lights } = usePrefs();
  const theme = lights ? 'light' : 'dark';
  const phone = usePhone();
  // The engine keeps its first options for life, so read sound through a ref.
  const soundOn = useRef(sound);
  soundOn.current = sound;

  return (
    <footer className="site-footer">
      <div className="site-footer__water" aria-hidden="true">
        {/* A new pond per theme and size: the engine keeps its first options. */}
        <AsciiOcean
          key={`${theme}-${phone}`}
          className="site-footer__pond"
          sharks={phone ? PHONE_KOI : KOI}
          options={{
            theme,
            transparent: true,
            cellWidth: 8,
            fishCount: phone ? 10 : 26,
            canSplash: (e) => !(e.target as Element | null)?.closest?.(INTERACTIVE),
            onSplash: () => {
              if (soundOn.current) play('drop');
            },
          }}
        />
      </div>

      <div className="site-footer__bar">
        <p className="site-footer__copy">© {new Date().getFullYear()} Oscar Cheung</p>
        <ul className="site-footer__links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
