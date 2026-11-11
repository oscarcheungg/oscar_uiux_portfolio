import { useEffect, useRef, useState } from 'react';

/* "Product Designer & Engineer", where each role shows a bit of itself when
   hovered (hover only: they aren't controls, so they stay out of the tab
   order):

   - Product Designer: a Figma-style selection lands on the words — a blue
     frame, its four handles popping in one after another, and a badge with
     the selection's size, as if the words had just been clicked on canvas.
   - Engineer: the letters run through code symbols and settle, left to
     right, as <Engineer /> in blue, the brackets sliding in around it.

   Screen readers get the plain line; the effects are decoration. */

export function RoleLine() {
  return (
    <p className="intro__role" aria-label="Product Designer & Engineer">
      <DesignerWord />
      <span aria-hidden="true"> &amp; </span>
      <EngineerWord />
    </p>
  );
}

function DesignerWord() {
  const ref = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState('');

  // The badge shows the selection's real size, measured when it appears.
  const measure = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setSize(`${Math.round(r.width)} × ${Math.round(r.height)}`);
  };

  return (
    <span ref={ref} className="role role--designer" aria-hidden="true" onMouseEnter={measure}>
      Product Designer
      <span className="role__frame">
        <i className="role__handle" style={{ '--n': 0 } as React.CSSProperties} />
        <i className="role__handle" style={{ '--n': 1 } as React.CSSProperties} />
        <i className="role__handle" style={{ '--n': 2 } as React.CSSProperties} />
        <i className="role__handle" style={{ '--n': 3 } as React.CSSProperties} />
        <span className="role__size">{size}</span>
      </span>
    </span>
  );
}

const WORD = 'Engineer';
const GLYPHS = '{}[]<>/=+*;:01';
const STEP_MS = 34;
const SETTLE_STEPS = 3; // frames each letter scrambles before it settles

function EngineerWord() {
  const [text, setText] = useState(WORD);
  const [on, setOn] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearInterval(timer.current), []);

  const start = () => {
    setOn(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.clearInterval(timer.current);
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / SETTLE_STEPS);
      setText(
        [...WORD]
          .map((c, i) => (i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      );
      if (settled >= WORD.length) {
        window.clearInterval(timer.current);
        setText(WORD);
      }
    }, STEP_MS);
  };

  const stop = () => {
    window.clearInterval(timer.current);
    setText(WORD);
    setOn(false);
  };

  return (
    <span
      className="role role--engineer"
      data-on={on}
      aria-hidden="true"
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      <span className="role__bracket role__bracket--open">&lt;</span>
      {/* The real word, invisible, holds the width steady while the
          scrambled symbols (narrower or wider than letters) run over it. */}
      <span className="role__code">
        <span className="role__code-size">{WORD}</span>
        <span className="role__code-text">{text}</span>
      </span>
      <span className="role__bracket role__bracket--close">&nbsp;/&gt;</span>
    </span>
  );
}
