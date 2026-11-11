import { flushSync } from 'react-dom';

/* Moving between pages, as one continuous motion.

   The browser snapshots the page, the route changes underneath, and the two
   are blended (see "page transition" in index.css): the old page fades out,
   the new one fades in rising slightly, and, when it's given one, a shared
   element (the hovered project's preview card) grows into the case study's
   cover, which carries the same view-transition-name.

   Going back (direction 'back') has its own, softer motion: the page eases
   away, shrinking a touch, while the home page settles in over it, the two
   overlapping so there's never a blank moment. A case study's cover leaves
   with the rest of the page instead of fading out on its own.

   Browsers without view transitions, and visitors who prefer reduced motion,
   just navigate. */

type ViewTransition = { finished: Promise<void> };
type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

export const SHARED_COVER = 'case-cover';

interface TransitionOptions {
  /* An element on the current page that should grow into the case study's
     cover. */
  shared?: HTMLElement | null;
  direction?: 'forward' | 'back';
}

export function navigateWithTransition(go: () => void, options: TransitionOptions = {}) {
  const { shared, direction = 'forward' } = options;
  const doc = document as ViewTransitionDoc;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduce) {
    go();
    return;
  }

  const html = document.documentElement;
  const classes = ['vt-page'];
  if (direction === 'back') classes.push('vt-back');
  html.classList.add(...classes);
  shared?.style.setProperty('view-transition-name', SHARED_COVER);

  const transition = doc.startViewTransition(() => flushSync(go));
  transition.finished.finally(() => {
    html.classList.remove(...classes);
    shared?.style.removeProperty('view-transition-name');
  });
}

/* A plain left click, the kind that should animate: modified clicks open new
   tabs and windows as usual. */
export function isPlainClick(e: React.MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}
