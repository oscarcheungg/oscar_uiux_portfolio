import { useEffect, useRef, useState } from 'react';
import './cursor.css';

/* A small white dot in place of the pointer, drawn with mix-blend-mode:
   difference so it inverts whatever it passes over — dark on the white page,
   light in the dark theme and on images. It swells over anything clickable,
   pinches when pressed, and over an element with data-cursor="…" carries
   that label beside it as a small dark tag in mono capitals.

   Only for a mouse or trackpad: on touch screens nothing changes. */

const INTERACTIVE = 'a[href], button, [role="button"], label, summary, [data-cursor]';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ hover: boolean; down: boolean; label: string; shown: boolean }>({
    hover: false,
    down: false,
    label: '',
    shown: false,
  });

  // Only where the primary pointer can hover precisely.
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add('custom-cursor');

    let x = -100;
    let y = -100;
    let frame = 0;
    const draw = () => {
      frame = 0;
      const t = `translate3d(${x}px, ${y}px, 0)`;
      dot.current?.style.setProperty('transform', t);
      tag.current?.style.setProperty('transform', t);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(draw);

      const target = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      const disabled = target?.getAttribute('aria-disabled') === 'true';
      const label = target?.getAttribute('data-cursor') ?? '';
      setState((s) =>
        s.shown && s.hover === (!!target && !disabled) && s.label === label
          ? s
          : { ...s, shown: true, hover: !!target && !disabled, label },
      );
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));
    const leave = () => setState((s) => ({ ...s, shown: false }));

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      html.classList.remove('custom-cursor');
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Two layers on the same point: the dot blends with the page; the label
  // doesn't, so it stays readable over text.
  return (
    <>
      <div
        ref={dot}
        className="cursor"
        aria-hidden="true"
        data-shown={state.shown}
        data-hover={state.hover}
        data-down={state.down}
      >
        <span className="cursor__dot" />
      </div>
      <div ref={tag} className="cursor cursor--tag" aria-hidden="true" data-shown={state.shown} data-hover={state.hover}>
        <span className="cursor__label" data-on={!!state.label}>
          {state.label}
        </span>
      </div>
    </>
  );
}
