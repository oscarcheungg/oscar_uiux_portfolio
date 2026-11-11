import { RefObject, useEffect, useRef, useState, VideoHTMLAttributes } from 'react';

/* Video that only costs anything when it's on screen.

   Case studies are full of long screen recordings, and a page that starts
   downloading every one of them at once leaves its own images (and, after
   you leave, the next page's) waiting behind them. So:

   - useNearView: true once an element comes within a screen or so of the
     viewport, and whether it's in view right now.
   - LazyVideo: a <video> with no source until it nears the viewport; it
     plays while in view and pauses once scrolled away.
   - installVideoCleanup: when any video leaves the page (a route change, a
     closed section), its download is cancelled at once, so the next page
     gets the whole connection. Browsers otherwise keep fetching a removed
     video until it's garbage-collected. */

const MARGIN = '600px 0px';

export function useNearView<T extends Element>(ref: RefObject<T>) {
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      setVisible(true);
      return;
    }
    // Two observers: one generous (start loading), one exact (play/pause).
    const nearIO = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setNear(true);
        nearIO.disconnect();
      }
    }, { rootMargin: MARGIN });
    const viewIO = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    nearIO.observe(el);
    viewIO.observe(el);
    return () => {
      nearIO.disconnect();
      viewIO.disconnect();
    };
  }, [ref]);

  return { near, visible };
}

type LazyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'preload'> & { src: string };

export function LazyVideo({ src, autoPlay, ...rest }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const { near, visible } = useNearView(ref);

  useEffect(() => {
    const v = ref.current;
    if (!v || !near || !autoPlay) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [near, visible, autoPlay]);

  return <video ref={ref} src={near ? src : undefined} preload={near ? 'auto' : 'none'} {...rest} />;
}

/* Stop a video's download for good. */
export function unloadVideo(v: HTMLVideoElement) {
  v.pause();
  v.removeAttribute('src');
  v.querySelectorAll('source').forEach((s) => s.removeAttribute('src'));
  v.load();
}

export function installVideoCleanup() {
  const mo = new MutationObserver((records) => {
    for (const r of records) {
      r.removedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        const videos = node instanceof HTMLVideoElement ? [node] : Array.from(node.querySelectorAll('video'));
        // A node React merely moved is back in the page by now; leave it be.
        videos.forEach((v) => !v.isConnected && unloadVideo(v));
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
  return () => mo.disconnect();
}
