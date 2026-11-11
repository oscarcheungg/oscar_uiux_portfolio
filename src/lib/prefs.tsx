import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { installInteractionSounds } from '../home/sound';

/* The visitor's two switches, sound and lights, shared by every page and
   remembered between visits. Lights off sets data-theme="dark" on <html>, so
   any page can style its night version from that one attribute. Sound on
   gives every press a soft click, site-wide. */

interface Prefs {
  sound: boolean;
  lights: boolean;
  toggleSound: () => void;
  /* Flip the lights, the new theme spreading out from `origin` (the bulb). */
  toggleLights: (origin?: HTMLElement | null) => void;
}

const PrefsContext = createContext<Prefs | null>(null);

/* A remembered on/off switch. Storage can be unavailable (private windows,
   blocked site data), so every read and write is allowed to fail quietly. */
function useRemembered(key: string, initial: boolean) {
  const [on, setOn] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initial : saved === 'on';
    } catch {
      return initial;
    }
  });
  const toggle = () =>
    setOn((v) => {
      try {
        localStorage.setItem(key, v ? 'off' : 'on');
      } catch {
        /* not remembered, still toggled */
      }
      return !v;
    });
  return [on, toggle] as const;
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

/* Switch the lights so the new theme spreads out from the bulb: the browser
   snapshots the page, the theme changes underneath, and the new page is
   revealed through a circle that grows from the bulb to the far corner.
   Browsers without view transitions, and visitors who prefer reduced motion,
   get the switch straight away. */
function spreadFrom(origin: HTMLElement | null | undefined, update: () => void) {
  const doc = document as ViewTransitionDoc;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!origin || !doc.startViewTransition || reduce) {
    update();
    return;
  }

  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  // Marks this transition as the lights switch, so its styles (no cross-fade,
  // new page on top) don't apply to page-to-page transitions.
  const html = document.documentElement;
  html.classList.add('vt-lights');
  const transition = doc.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => html.classList.remove('vt-lights'));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 800,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)',
        } as KeyframeAnimationOptions,
      );
    })
    .catch(() => {});
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [sound, toggleSound] = useRemembered('home:sound', true);
  const [lights, flipLights] = useRemembered('home:lights', true);

  // The theme lives on <html>, so every page (and the page transitions) see it.
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = lights ? 'light' : 'dark';
    html.style.colorScheme = lights ? 'light' : 'dark';
  }, [lights]);

  // A click on every press while sound is on.
  useEffect(() => (sound ? installInteractionSounds({ hover: false }) : undefined), [sound]);

  const value: Prefs = {
    sound,
    lights,
    toggleSound,
    toggleLights: (origin) => spreadFrom(origin, flipLights),
  };
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const prefs = useContext(PrefsContext);
  if (!prefs) throw new Error('usePrefs needs a PrefsProvider');
  return prefs;
}
