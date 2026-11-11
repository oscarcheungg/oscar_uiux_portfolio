import { ElementType, useEffect, useRef, useState } from 'react';

/* Text that decodes, the homepage "Engineer" way: when `run` changes, a
   narrow band of code symbols sweeps through the text left to right, each
   letter flickering through symbols as the band passes and settling back as
   it goes, so only a sliver is ever scrambled and the rest stays readable.
   The real text holds the layout steady underneath; the scramble sits on
   top. Visitors who prefer less motion just see the text. */

const SYMBOLS = '{}[]<>/=+*;:01';
const STEP_MS = 34; // the Engineer effect's pace
const BAND = 14; // characters scrambling at once
const FRAMES = 22; // how many steps the sweep takes, however long the text

export function Decode({
  text,
  run,
  as: Tag = 'span',
  className = '',
}: {
  text: string;
  /* Change this to play the sweep (0 on first render plays nothing). */
  run: number;
  as?: ElementType;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const timer = useRef<number>();

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const chars = Array.from(text);
    const speed = Math.max(1, chars.length / FRAMES);
    let frame = 0;
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      frame += 1;
      const front = frame * speed;
      setShown(
        chars
          .map((c, i) =>
            // Only letters and digits flicker; spaces, punctuation and emoji
            // stay put so the words keep their shape.
            i >= front - BAND && i < front && /[\p{L}\p{N}]/u.test(c)
              ? SYMBOLS[(Math.random() * SYMBOLS.length) | 0]
              : c,
          )
          .join(''),
      );
      if (front - BAND > chars.length) {
        window.clearInterval(timer.current);
        setShown(text);
      }
    }, STEP_MS);
    return () => window.clearInterval(timer.current);
  }, [run, text]);

  return (
    <Tag className={`decode ${className}`}>
      <span className="decode__size" aria-hidden="true">
        {text}
      </span>
      <span className="decode__text">{shown}</span>
    </Tag>
  );
}
