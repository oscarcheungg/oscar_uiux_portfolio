import { useEffect, useRef } from 'react';
import './cherry-tree.css';

/* The pixel cherry blossom tree (public/about/cherry-tree.png), brought to
   life.

   It stands still until it's clicked (or tapped). Then it shakes: drawn one
   row of pixels at a time, each row nudged sideways a little more the
   higher it sits, so the crown rocks while the foot of the trunk stays
   planted, settling over a second or so. A flurry of petals in the tree's
   own pinks falls and rests at its foot before fading, and `onShake` is
   told (the About page uses that as its easter egg).

   It only animates while shaking or while petals are falling. Visitors who
   prefer less motion get no rocking; a click still drops a few petals. */

const SRC = '/about/cherry-tree.png';
const PAD = 14; // art px of room around the tree for petals to drift into

type Petal = { x: number; y: number; vx: number; vy: number; p: number; c: string; landed: number; life: number };

export function CherryTree({ scale = 1, onShake }: { scale?: number; onShake?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shakeRef = useRef<() => void>(() => {});
  const onShakeRef = useRef(onShake);
  onShakeRef.current = onShake;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    let raf = 0;
    let disposed = false;

    img.onload = () => {
      if (disposed) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const CW = w + PAD * 2;
      const CH = h + 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(CW * scale * dpr);
      canvas.height = Math.round(CH * scale * dpr);
      canvas.style.width = `${CW * scale}px`;
      canvas.style.height = `${CH * scale}px`;
      ctx.imageSmoothingEnabled = false;
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);

      // Read the art once: where the blossom is (petals start there, in its
      // colours) and where the trunk meets the ground (nothing below sways).
      const probe = document.createElement('canvas');
      probe.width = w;
      probe.height = h;
      const pctx = probe.getContext('2d', { willReadFrequently: true })!;
      pctx.drawImage(img, 0, 0);
      const data = pctx.getImageData(0, 0, w, h).data;
      const blossom: { x: number; y: number; c: string }[] = [];
      let lowestBark = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const k = (y * w + x) * 4;
          if (data[k + 3] < 200) continue;
          const [r, g, b] = [data[k], data[k + 1], data[k + 2]];
          const pink = r > 170 && r > g + 12 && r >= b;
          const bark = r < 110 && g < 80 && b < 80;
          if (bark) lowestBark = Math.max(lowestBark, y);
          if (pink && y < h * 0.8) blossom.push({ x, y, c: `rgb(${r},${g},${b})` });
        }
      }
      const base = lowestBark || h - 6; // the foot of the trunk
      const swayAt = (y: number) => Math.pow(Math.max(0, (base - y) / base), 1.4);

      const petals: Petal[] = [];
      let shake = 0; // how hard it's rocking, eases back to 0
      let last = performance.now();
      const start = last;

      const drop = (n: number) => {
        for (let i = 0; i < n && petals.length < 90 && blossom.length; i++) {
          const from = blossom[(Math.random() * blossom.length) | 0];
          petals.push({
            x: from.x + PAD,
            y: from.y,
            vx: 8 + Math.random() * 14,
            vy: 32 + Math.random() * 26,
            p: Math.random() * Math.PI * 2,
            c: from.c,
            landed: 0,
            life: 0,
          });
        }
      };

      const draw = (now: number) => {
        const t = (now - start) / 1000;
        ctx.clearRect(0, 0, CW, CH);

        // A shake rocks the crown and settles, with a ripple up through it.
        const rock = shake * Math.sin(t * 14) * 6;
        for (let y = 0; y < h; y++) {
          const s = swayAt(y);
          const ripple = shake * Math.sin(t * 9 - y * 0.12) * 1.2 * s;
          const dx = Math.round(rock * s + ripple);
          ctx.drawImage(img, 0, y, w, 1, PAD + dx, y, w, 1);
        }

        for (const pt of petals) {
          ctx.globalAlpha = pt.landed ? Math.max(0, 1 - pt.landed / 3) : 1;
          ctx.fillStyle = pt.c;
          ctx.fillRect(Math.round(pt.x), Math.round(pt.y), 1, 1);
        }
        ctx.globalAlpha = 1;
      };

      shakeRef.current = () => {
        shake = still ? 0 : 1;
        drop(still ? 6 : 24);
        onShakeRef.current?.();
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(step);
        }
      };

      const step = (now: number) => {
        const dt = Math.min(now - last, 64) / 1000;
        last = now;
        shake = Math.max(0, shake - dt * 0.9);


        for (const pt of petals) {
          if (pt.landed) {
            pt.landed += dt;
            continue;
          }
          pt.life += dt;
          pt.x += (pt.vx + Math.sin(pt.life * 4 + pt.p) * 14) * dt;
          pt.y += pt.vy * dt;
          if (pt.y >= h) {
            pt.y = h - ((pt.p * 10) % 3 | 0);
            pt.landed = 0.001;
          }
        }
        for (let i = petals.length - 1; i >= 0; i--) {
          const pt = petals[i];
          if (pt.landed > 3 || pt.x > CW + 2) petals.splice(i, 1);
        }

        draw(now);
        // Rest once the tree has settled and the last petal has faded.
        raf = shake > 0 || petals.length ? requestAnimationFrame(step) : 0;
      };

      draw(performance.now());
    };
    img.src = SRC;

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, [scale]);

  return (
    <button
      type="button"
      className="cherry"
      // Its only sound is the leaf rustle the About page plays on a shake.
      data-sound="off"
      onClick={() => shakeRef.current()}
      aria-label="A pixel cherry blossom tree. Shake it."
      title="Shake me"
    >
      <canvas ref={canvasRef} className="cherry__canvas" />
    </button>
  );
}
