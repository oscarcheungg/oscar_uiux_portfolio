import { CSSProperties } from 'react';
import { SIGNATURE_SIZE, SIGNATURE_STROKES, SIGNATURE_THICKNESS } from '../home/signatureStrokes';

/* 張熙宇 — my name in my own hand, written out stroke by stroke (the
   homepage writes it beside my photo while the cursor is on it; About
   writes it under the story when it scrolls into view). Whoever uses it
   triggers the writing with CSS on its paths. The strokes are the artwork's own, traced and put in
   writing order (see signatureStrokes.ts); each one is drawn in turn as a
   thick line in a mask over the artwork, so the real ink appears along the
   stroke as a pen would lay it down. Each stroke takes time in proportion
   to its length, with a short lift of the pen between separate strokes. */
const WRITE_SECONDS = 0.85;
const LIFT_SECONDS = 0.02;

/* A traced stroke is sometimes several pieces; when a piece starts where the
   last one ended, the pen hasn't lifted, so there's no pause between them. */
const ends = (d: string) => {
  const nums = d.match(/-?[\d.]+/g)!.map(Number);
  return { start: [nums[0], nums[1]], end: [nums[nums.length - 2], nums[nums.length - 1]] };
};
const TOTAL_LENGTH = SIGNATURE_STROKES.reduce((sum, s) => sum + s.length, 0);
const STROKE_TIMING = SIGNATURE_STROKES.reduce<{ delay: number; duration: number }[]>((acc, s, i) => {
  const prev = acc[i - 1];
  let delay = 0.08;
  if (prev) {
    const a = ends(SIGNATURE_STROKES[i - 1].d).end;
    const b = ends(s.d).start;
    const continuous = Math.hypot(a[0] - b[0], a[1] - b[1]) < SIGNATURE_THICKNESS * 2;
    delay = prev.delay + prev.duration + (continuous ? 0 : LIFT_SECONDS);
  }
  acc.push({ delay, duration: (s.length / TOTAL_LENGTH) * WRITE_SECONDS });
  return acc;
}, []);

export function Signature({ className, maskId }: { className: string; maskId: string }) {
  const { width, height } = SIGNATURE_SIZE;
  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
        <g fill="none" stroke="#fff" strokeWidth={SIGNATURE_THICKNESS * 2.4} strokeLinecap="round" strokeLinejoin="round">
          {SIGNATURE_STROKES.map((stroke, i) => (
            <path
              key={i}
              d={stroke.d}
              pathLength={1}
              style={
                {
                  '--delay': `${STROKE_TIMING[i].delay.toFixed(3)}s`,
                  '--duration': `${STROKE_TIMING[i].duration.toFixed(3)}s`,
                } as CSSProperties
              }
            />
          ))}
        </g>
      </mask>
      <image href="/home/signature.png" width={width} height={height} mask={`url(#${maskId})`} />
    </svg>
  );
}
