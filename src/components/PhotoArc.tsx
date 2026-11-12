import { useEffect, useRef } from 'react';
import { usePrefs } from '../lib/prefs';
import { play } from '../home/sound';
import './photo-arc.css';

/* A straight row of photos drifting slowly sideways, looping forever.

   It's also a real carousel: drag (or swipe) it and let go to fling it, or
   scroll it sideways on a trackpad; it eases back into its drift afterwards.
   Pointing at it slows the drift right down (it never stops), so a photo is
   easy to look at. Photos are never cropped: they share one height and keep
   their own shape.

   With `dots` on (an easter egg on the About page), every photo is redrawn
   in tight round dots in its own colours, and the pointer drags a soft wake
   of characters in the homepage pond's blue through them, cooling quickly
   back to dots; a click sends a thin, soft ring out through every photo
   without stopping the row. Turning `dots` off brings the photos back.

   Visitors who prefer less motion get no drift or dots, just the row to
   drag or scroll. */

export interface ArcPhoto {
  src: string;
  w: number;
  h: number;
  alt?: string;
  caption?: string;
}

const GAP = 12; // px between photos
const DRIFT = 55; // px per second when left alone
const HOVER_DRIFT = 20; // px per second while the pointer is over it
// The ASCII wake.
const CELL = 3.5; // px per dot / character: very tight, so the photo reads clearly
const REACH = 30; // px around the pointer that wakes: a small, close circle
const TRAIL = 0.7; // seconds for a wake to cool back to dots
const RING_SPEED = 260; // px per second a press ring travels: unhurried
const RING_REACH = 1500; // px a ring travels (across the whole row) before it's gone
// From faint to dense; a hotter cell (and a darker spot) gets a denser glyph.
const GLYPHS = ".:-=+*";

/* Where the pointer is and any press rings, shared by every photo. */
interface Wake {
  x: number;
  y: number;
  inside: boolean;
  rings: { x: number; y: number; t: number }[];
}

export function PhotoArc({
  photos,
  height = 240,
  dots = false,
}: {
  photos: ArcPhoto[];
  height?: number;
  /* Redraw every photo in ink dots with an ASCII wake (see startWake). */
  dots?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const dotsOn = useRef(dots);
  dotsOn.current = dots;
  const syncDots = useRef<() => void>(() => {});
  // Read through a ref so the effect below keeps running when sound flips.
  const { sound } = usePrefs();
  const soundOn = useRef(sound);
  soundOn.current = sound;
  const wake = useRef<Wake>({ x: 0, y: 0, inside: false, rings: [] });

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('[data-arc-tile]'));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Each tile's start along the loop.
    let starts: number[] = [];
    let loop = 0;
    const measure = () => {
      let x = 0;
      starts = tiles.map((t) => {
        const s = x;
        x += t.offsetWidth + GAP;
        return s;
      });
      loop = x;
    };
    measure();
    const ro = new ResizeObserver(measure);
    tiles.forEach((t) => ro.observe(t));

    let offset = 0;
    let velocity = still ? 0 : DRIFT;
    let hovering = false;
    let dragging = false;
    let last = performance.now();
    let raf = 0;

    const place = () => {
      const W = root.clientWidth;
      tiles.forEach((t, i) => {
        // Wrap each tile on its own, so the loop needs no copies.
        let x = (((starts[i] - offset) % loop) + loop) % loop;
        if (x > W + 40) x -= loop;
        t.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!dragging) {
        // Ease toward the drift: full speed, or slowed while hovered.
        const target = still ? 0 : hovering ? HOVER_DRIFT : DRIFT;
        velocity += (target - velocity) * (1 - Math.exp(-dt * 2.2));
        offset += velocity * dt;
      }
      place();
      raf = requestAnimationFrame(tick);
    };
    place();
    raf = requestAnimationFrame(tick);

    // Drag and fling.
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    // A press alone doesn't take hold of the row (a click keeps it drifting);
    // only once the pointer has moved a few pixels does it become a drag.
    let pressed = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pressed = true;
      startX = lastX = e.clientX;
      lastT = performance.now();
      root.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      // The wake follows the pointer whether or not it's dragging.
      wake.current.x = e.clientX;
      wake.current.y = e.clientY;
      wake.current.inside = true;
      if (!pressed) return;
      const now = performance.now();
      if (!dragging) {
        if (Math.abs(e.clientX - startX) <= 4) return;
        // The drag starts here, from wherever the row has drifted to.
        dragging = true;
        root.dataset.dragging = 'true';
        startX = lastX = e.clientX;
        lastT = now;
        startOffset = offset;
        velocity = 0;
        return;
      }
      offset = startOffset - (e.clientX - startX);
      const dt = Math.max(now - lastT, 1) / 1000;
      velocity = -(e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = now;
    };
    const up = (e: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
      if (!dragging) {
        // A press without a drag sends a ring through the wake; the row
        // never stopped.
        wake.current.rings.push({ x: e.clientX, y: e.clientY, t: performance.now() });
        // The pond's drop, as on the homepage, when the ripple is showing.
        if (dotsOn.current && soundOn.current) play('drop');
        return;
      }
      dragging = false;
      delete root.dataset.dragging;
      // A fling keeps going and eases back into the drift; cap it so a hard
      // flick doesn't spin the whole row.
      velocity = Math.max(-2400, Math.min(2400, velocity));
    };

    // Sideways trackpad scroll (and shift + wheel) moves it too; plain
    // up-and-down scrolling still scrolls the page.
    const wheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      offset += dx;
      velocity = 0;
    };

    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        velocity = (e.key === 'ArrowRight' ? 1 : -1) * 900;
      }
    };

    const enter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovering = true;
    };
    const leave = () => {
      hovering = false;
      wake.current.inside = false;
    };

    // ── the dots ──
    const fields = new Map<HTMLElement, () => void>();
    function clearDots() {
      fields.forEach((stop) => stop());
      fields.clear();
    }
    // All the photos turn to dots at once, or all turn back.
    syncDots.current = () => {
      if (dotsOn.current && !still) {
        tiles.forEach((t) => {
          if (!fields.has(t)) fields.set(t, startWake(t, root, wake.current));
        });
      } else clearDots();
    };
    syncDots.current();

    root.addEventListener('pointerdown', down);
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerup', up);
    root.addEventListener('pointercancel', up);
    root.addEventListener('wheel', wheel, { passive: false });
    root.addEventListener('keydown', key);
    root.addEventListener('pointerenter', enter);
    root.addEventListener('pointerleave', leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      clearDots();
      root.removeEventListener('pointerdown', down);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerup', up);
      root.removeEventListener('pointercancel', up);
      root.removeEventListener('wheel', wheel);
      root.removeEventListener('keydown', key);
      root.removeEventListener('pointerenter', enter);
      root.removeEventListener('pointerleave', leave);
    };
  }, [photos, height]);

  // Turning the dots on or off doesn't rebuild the row, just the photos.
  useEffect(() => syncDots.current(), [dots]);

  return (
    <div
      ref={stage}
      className="arc"
      style={{ ['--arc-h' as string]: `${height}px`, height: height + 64 }}
      tabIndex={0}
      role="region"
      aria-label="Photos: drag or use the arrow keys to scroll"
    >
      {photos.map((p) => (
        <figure key={p.src} className="arc__tile" data-arc-tile>
          {/* An explicit width from the shared height, not aspect-ratio:
              Safari can size an absolutely placed tile to nothing when its
              width only comes from a ratio. */}
          <div className="arc__frame" style={{ width: `calc(var(--arc-h) * ${(p.w / p.h).toFixed(4)})` }}>
            <img src={p.src} width={p.w} height={p.h} alt={p.alt ?? ''} draggable={false} />
          </div>
          <figcaption className="arc__caption">{p.caption ?? ''}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* Redraw a tile's photo in tight round dots in its own colours (pale ones
   held back from vanishing into the page). The pointer drags a soft wake
   through them: dots under the hand turn into characters in the homepage
   pond's blue, which cool quickly back to dots behind it; a press (a click
   without dragging) sends a gentle ring of them out. Returns a function
   that fades back to the photo and cleans up. */
function startWake(tile: HTMLElement, stage: HTMLElement, wake: Wake) {
  const frame = tile.querySelector<HTMLElement>('.arc__frame')!;
  const img = frame.querySelector('img')!;
  const w = frame.offsetWidth;
  const h = frame.offsetHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const dark = document.documentElement.dataset.theme === 'dark';
  // The pond's ripple blue (see drawRipples in the koi renderer).
  const BLUE = dark ? [190, 225, 255] : [70, 120, 170];

  const canvas = document.createElement('canvas');
  canvas.className = 'arc__dots';
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  frame.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);

  // Sample the photo at a given cell size: colour (richer, and never so
  // pale it vanishes on the page) and ink (0 … 1, how dense the spot is).
  const sampleAt = (cell: number) => {
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    const c = document.createElement('canvas');
    c.width = cols;
    c.height = rows;
    const cx = c.getContext('2d', { willReadFrequently: true })!;
    cx.drawImage(img, 0, 0, cols, rows);
    const data = cx.getImageData(0, 0, cols, rows).data;
    const n = cols * rows;
    const ink = new Float32Array(n);
    const rgb = new Uint8ClampedArray(n * 3);
    for (let i = 0; i < n; i++) {
      let r = data[i * 4];
      let g = data[i * 4 + 1];
      let b = data[i * 4 + 2];
      const avg = (r + g + b) / 3;
      r = avg + (r - avg) * 1.25;
      g = avg + (g - avg) * 1.25;
      b = avg + (b - avg) * 1.25;
      let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // Keep every dot visible: pale ones are pulled toward a mid grey on
      // the light page, very dark ones lifted on the night page.
      if (!dark && lum > 0.7) {
        const f = Math.min(0.55, ((lum - 0.7) / 0.3) * 0.55);
        r += (128 - r) * f;
        g += (128 - g) * f;
        b += (128 - b) * f;
      } else if (dark && lum < 0.22) {
        const f = Math.min(0.5, ((0.22 - lum) / 0.22) * 0.5);
        r += (150 - r) * f;
        g += (150 - g) * f;
        b += (150 - b) * f;
      }
      lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      ink[i] = dark ? lum : 1 - lum;
      rgb[i * 3] = r;
      rgb[i * 3 + 1] = g;
      rgb[i * 3 + 2] = b;
    }
    return { cols, rows, n, ink, rgb };
  };

  let dots: ReturnType<typeof sampleAt>;
  try {
    dots = sampleAt(CELL);
  } catch {
    canvas.remove();
    return () => {};
  }

  const page = getComputedStyle(frame.closest('.cs-page') ?? document.body).backgroundColor || '#fff';

  // The photo in round dots, drawn once; each frame lays this down and only
  // redraws the cells the wake has reached.
  const base = document.createElement('canvas');
  base.width = canvas.width;
  base.height = canvas.height;
  const bctx = base.getContext('2d')!;
  bctx.scale(dpr, dpr);
  bctx.fillStyle = page;
  bctx.fillRect(0, 0, w, h);
  for (let r = 0; r < dots.rows; r++) {
    for (let c = 0; c < dots.cols; c++) {
      const i = r * dots.cols + c;
      const radius = (CELL * (0.7 + dots.ink[i] * 0.3)) / 2;
      bctx.fillStyle = `rgb(${dots.rgb[i * 3]},${dots.rgb[i * 3 + 1]},${dots.rgb[i * 3 + 2]})`;
      bctx.beginPath();
      bctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, radius, 0, Math.PI * 2);
      bctx.fill();
    }
  }

  const { cols, rows, n, ink } = dots;
  const heat = new Float32Array(n);

  // The site's own typeface, the same as every other word on the page; the
  // characters in the pond's blue.
  ctx.font = `600 ${Math.round(CELL * 2)}px 'Inter', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const glyphBlue = `rgb(${BLUE[0]},${BLUE[1]},${BLUE[2]})`;

  let gather = false;
  let fade = 0; // 0 → 1 as the photo gives way to dots
  let raf = 0;
  let last = performance.now();

  const step = (now: number) => {
    const dt = Math.min(now - last, 64) / 1000;
    last = now;
    fade = Math.max(0, Math.min(1, fade + (gather ? -1 : 1) * dt * 3.5));
    img.style.opacity = String(1 - fade);
    canvas.style.opacity = String(fade);

    const tr = tile.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    const onScreen = tr.right >= sr.left && tr.left <= sr.right;

    // Cool everything a little, then heat what the pointer and rings reach.
    const cool = dt / TRAIL;
    for (let i = 0; i < n; i++) heat[i] = Math.max(0, heat[i] - cool);
    if (onScreen && !gather) {
      // The tile may be scaled; map client coords into its own pixels.
      const sx = w / tr.width;
      const sy = h / tr.height;
      const warm = (cx: number, cy: number, reach: number, amount: (d: number) => number) => {
        const c0 = Math.max(0, Math.floor((cx - reach) / CELL));
        const c1 = Math.min(cols - 1, Math.floor((cx + reach) / CELL));
        const r0 = Math.max(0, Math.floor((cy - reach) / CELL));
        const r1 = Math.min(rows - 1, Math.floor((cy + reach) / CELL));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const dx = c * CELL + CELL / 2 - cx;
            const dy = r * CELL + CELL / 2 - cy;
            const v = amount(Math.sqrt(dx * dx + dy * dy));
            const i = r * cols + c;
            if (v > heat[i]) heat[i] = v;
          }
        }
      };
      if (wake.inside) {
        const px = (wake.x - tr.left) * sx;
        const py = (wake.y - tr.top) * sy;
        warm(px, py, REACH, (d) => (d < REACH ? 0.75 * Math.pow(1 - d / REACH, 1.6) : 0));
      }
      for (const ring of wake.rings) {
        const radius = ((now - ring.t) / 1000) * RING_SPEED;
        const px = (ring.x - tr.left) * sx;
        const py = (ring.y - tr.top) * sy;
        // A thin, soft ring that carries on through every photo, fading
        // gently as it spreads.
        const strength = 0.3 * Math.pow(Math.max(0, 1 - radius / RING_REACH), 0.6);
        if (strength > 0) {
          warm(px, py, radius + 6, (d) => (Math.abs(d - radius) < 4.5 ? strength * (1 - Math.abs(d - radius) / 4.5) : 0));
        }
      }
    }
    // Rings fade out once they've crossed the whole row.
    for (let k = wake.rings.length - 1; k >= 0; k--) {
      if (((now - wake.rings[k].t) / 1000) * RING_SPEED > RING_REACH) wake.rings.splice(k, 1);
    }

    if (onScreen || gather) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(base, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = 0; i < n; i++) {
        if (heat[i] <= 0.06) continue;
        const c = i % cols;
        const r = (i / cols) | 0;
        // Clear the dot, then the character in blue: hotter and inkier spots
        // get denser ones.
        ctx.fillStyle = page;
        ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
        const level = Math.min(GLYPHS.length - 1, Math.floor((heat[i] * 0.7 + ink[i] * 0.45) * GLYPHS.length));
        ctx.fillStyle = glyphBlue;
        ctx.fillText(GLYPHS[level], c * CELL + CELL / 2, r * CELL + CELL / 2);
      }
    }

    if (gather && fade === 0) {
      cleanup();
      return;
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);

  function cleanup() {
    cancelAnimationFrame(raf);
    canvas.remove();
    img.style.opacity = '';
  }

  return () => {
    gather = true;
  };
}
