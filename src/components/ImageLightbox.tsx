import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './lightbox.css';

/* Click a detailed case-study image to see it up close. The image lifts out
   of the page and grows to fill the screen from where it sat. A click
   anywhere, the close button or Esc puts it back where it came from.

   Opt-in: only images marked data-zoomable open here (CaseStudyFigure and
   CaseStudyPair set it through their `zoomable` prop). Keep it for images
   with detail worth reading, like personas, flows and before/afters. */

const ZOOMABLE = 'img[data-zoomable]';

const PAD = 48; // breathing room around the enlarged image
const CAPTION = 40; // room under it for the caption

type Box = { top: number; left: number; width: number; height: number };

interface Viewing {
  img: HTMLImageElement;
  src: string;
  alt: string;
  from: Box;
  to: Box;
  phase: 'open' | 'closing';
}

function boxOf(el: Element): Box {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

/* The largest box with the image's shape that fits the screen. Raster images
   stop at their own pixel width so they never go soft; SVGs grow freely. */
function fitToScreen(img: HTMLImageElement, from: Box): Box {
  const aspect = from.width / from.height || 1;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let width = Math.min(vw - PAD * 2, (vh - PAD * 2 - CAPTION) * aspect);
  const isSvg = /\.svg(\?|#|$)/i.test(img.currentSrc || img.src);
  if (!isSvg && img.naturalWidth) width = Math.min(width, Math.max(img.naturalWidth, from.width));
  const height = width / aspect;
  return { width, height, left: (vw - width) / 2, top: (vh - CAPTION - height) / 2 };
}

export function ImageLightbox({ root }: { root: RefObject<HTMLElement> }) {
  const [viewing, setViewing] = useState<Viewing | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const open = useCallback((img: HTMLImageElement) => {
    const from = boxOf(img);
    if (!from.width || !from.height) return;
    setViewing({
      img,
      src: img.currentSrc || img.src,
      alt: img.alt,
      from,
      to: fitToScreen(img, from),
      phase: 'open',
    });
  }, []);

  const close = useCallback(() => {
    // Fly back to wherever the image sits now.
    setViewing((v) => (v && v.phase === 'open' ? { ...v, from: boxOf(v.img), phase: 'closing' } : v));
  }, []);

  // Make every case-study image clickable, including ones that mount later
  // (the 84.51° page renders its sections after the password).
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const prepare = () => {
      el.querySelectorAll<HTMLImageElement>(ZOOMABLE).forEach((img) => {
        if (img.dataset.zoomReady) return;
        img.dataset.zoomReady = 'true';
        img.dataset.sound = 'open';
        img.setAttribute('role', 'button');
        img.setAttribute('aria-haspopup', 'dialog');
        img.tabIndex = 0;
        img.parentElement?.setAttribute('data-zoom-frame', '');
      });
    };
    prepare();
    const observer = new MutationObserver(prepare);
    observer.observe(el, { childList: true, subtree: true });

    const pick = (target: EventTarget | null) =>
      (target as Element | null)?.closest?.<HTMLImageElement>('img[data-zoom-ready]') ?? null;

    const onClick = (e: MouseEvent) => {
      const img = pick(e.target);
      if (img) open(img);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const img = pick(e.target);
      if (!img) return;
      e.preventDefault();
      open(img);
    };

    el.addEventListener('click', onClick);
    el.addEventListener('keydown', onKey);
    return () => {
      observer.disconnect();
      el.removeEventListener('click', onClick);
      el.removeEventListener('keydown', onKey);
    };
  }, [root, open]);

  // While open: the page holds still, the original image steps aside so the
  // copy appears to lift out of it.
  const img = viewing?.img;
  useEffect(() => {
    if (!img) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    img.style.visibility = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onResize = () =>
      setViewing((v) => (v && v.phase === 'open' ? { ...v, to: fitToScreen(v.img, boxOf(v.img)) } : v));
    window.addEventListener('resize', onResize);

    return () => {
      html.style.overflow = prevOverflow;
      img.style.visibility = '';
      img.focus({ preventScroll: true });
      window.removeEventListener('resize', onResize);
    };
  }, [img]);

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewing, close]);

  if (!viewing) return null;

  const isOpen = viewing.phase === 'open';
  const spring = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 340, damping: 34, mass: 0.9 };
  const fade = { duration: reduce ? 0 : 0.22 };

  return createPortal(
    <div className="lightbox" data-phase={viewing.phase} role="dialog" aria-modal="true" aria-label={viewing.alt || 'Image'}>
      <motion.div
        className="lightbox__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={fade}
        onClick={close}
      />

      <motion.div
        className="lightbox__frame"
        initial={viewing.from}
        animate={isOpen ? viewing.to : viewing.from}
        transition={spring}
        onAnimationComplete={() => {
          if (!isOpen) setViewing(null);
        }}
        onClick={close}
      >
        <img src={viewing.src} alt={viewing.alt} draggable={false} />
      </motion.div>

      <motion.div
        className="lightbox__caption"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 6 }}
        transition={{ ...fade, delay: isOpen && !reduce ? 0.12 : 0 }}
        style={{ top: viewing.to.top + viewing.to.height + 14 }}
      >
        {viewing.alt}
      </motion.div>

      <motion.button
        ref={closeRef}
        type="button"
        className="lightbox__close"
        aria-label="Close"
        data-sound="close"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={fade}
        onClick={close}
      >
        <img src="/home/icons/x.svg" alt="" />
      </motion.button>
    </div>,
    document.body,
  );
}
