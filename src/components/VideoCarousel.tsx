import { useCallback, useEffect, useRef, useState } from 'react';
import { preloadMedia } from '../hooks/usePreload';
import './VideoCarousel.css';

/* The site's one carousel, for screen recordings and still screens alike,
   built so it's obvious there's more than one slide and how to get to the
   next:

   - a row of labelled tabs underneath, one per slide, each with a thin
     progress line; clicking a tab jumps there
   - previous / next buttons either side
   - a video plays through, then the next slide starts (wrapping round); its
     line fills as it plays. A still image waits for the reader, its line
     simply full
   - swipe on touch screens, arrow keys when the carousel has focus

   Each item is either a `video` or an `image`. */

export interface VideoCarouselItem {
  video?: string;
  image?: string;
  title: string;
  id: number;
}

export interface VideoCarouselProps {
  items?: VideoCarouselItem[];
}

export default function VideoCarousel({ items = [] }: VideoCarouselProps): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const indexRef = useRef(0);
  indexRef.current = index;
  // The track is only read once it has come to rest, so a slide we started
  // ourselves is never mistaken for a swipe halfway through.
  const settle = useRef<number>();
  useEffect(() => () => window.clearTimeout(settle.current), []);
  const count = items.length;

  useEffect(() => {
    const videos = items.flatMap((item) => (item.video ? [item.video] : []));
    if (videos.length) preloadMedia(videos);
  }, [items, count]);

  const go = useCallback(
    (next: number) => {
      if (!count) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  // Show the active clip: slide the track to it, play it from the start and
  // pause the rest.
  useEffect(() => {
    const track = trackRef.current;
    if (track && Math.abs(track.scrollLeft - index * track.clientWidth) > 1) {
      track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    }
    // A still image has nothing to play: its line is simply full.
    setProgress(items[index]?.image ? 1 : 0);
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index, items]);

  // A swipe on touch screens moves the track itself; once it settles, follow it.
  const onScroll = () => {
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const nearest = Math.round(track.scrollLeft / track.clientWidth);
      if (nearest !== indexRef.current && nearest >= 0 && nearest < count) setIndex(nearest);
    }, 140);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  const multiple = count > 1;

  return (
    <div
      className="vc"
      role="region"
      aria-roledescription="carousel"
      aria-label="Screens"
      tabIndex={0}
      onKeyDown={onKey}
    >
      <div className="vc__stage">
        {multiple && (
          <button
            type="button"
            className="vc__arrow vc__arrow--prev"
            aria-label="Previous"
            onClick={() => go(index - 1)}
          >
            <img src="/home/icons/chevron-left.svg" alt="" width={18} height={18} />
          </button>
        )}

        <div ref={trackRef} className="vc__track" onScroll={onScroll}>
          {items.map((item, i) => (
            <div
              key={item.id}
              className="vc__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${item.title}`}
              aria-hidden={i !== index}
            >
              {item.image ? (
                <img className="vc__image" src={item.image} alt={item.title} decoding="async" />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  className="vc__video"
                  muted
                  playsInline
                  preload="auto"
                  autoPlay={i === 0}
                  loop={!multiple}
                  onTimeUpdate={(e) => {
                    if (i !== index) return;
                    const v = e.currentTarget;
                    if (v.duration) setProgress(v.currentTime / v.duration);
                  }}
                  onEnded={() => i === index && go(index + 1)}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>

        {multiple && (
          <button type="button" className="vc__arrow vc__arrow--next" aria-label="Next" onClick={() => go(index + 1)}>
            <img src="/home/icons/chevron-right.svg" alt="" width={18} height={18} />
          </button>
        )}
      </div>

      {multiple ? (
        <div
          className="vc__tabs"
          role="tablist"
          aria-label="Choose a slide"
          style={{ '--n': count } as React.CSSProperties}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className="vc__tab"
              onClick={() => go(i)}
            >
              <span className="vc__bar">
                <span
                  className="vc__fill"
                  style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }}
                />
              </span>
              <span className="vc__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="vc__title">{item.title}</span>
            </button>
          ))}
        </div>
      ) : (
        items[0] && <p className="vc__caption">{items[0].title}</p>
      )}
    </div>
  );
}
