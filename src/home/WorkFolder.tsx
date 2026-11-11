import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectCover } from '../components/ProjectCover';
import { WORK } from './config';

/* The Work section as a folder. Closed, it rests at the bottom of the play
   area with the case studies tucked inside; hover and the front flap tips
   forward so their tops peek out. Open it and the flap swings down and the
   case studies spring up out of the folder, one after another, to land in a
   loose grid of prints above it. Click a print to read it; click the folder,
   empty space, or press Esc to tuck them back in. */

interface Layout {
  w: number;
  h: number;
  folder: { x: number; y: number; w: number; h: number };
  card: { w: number; h: number };
  open: { x: number; y: number; rotate: number }[];
  tucked: { x: number; y: number; rotate: number; scale: number }[];
}

const CAPTION = 56; // px under each cover: name, then type and year
const GAP = 18;
const TILT = [-2.2, 1.4, -1, 2, -1.6, 1.1];

function measure(w: number, h: number): Layout {
  // The folder sits low and centred.
  const fw = Math.max(200, Math.min(300, w * 0.32));
  const fh = fw * 0.72;
  const folder = { x: (w - fw) / 2, y: h - fh - 36, w: fw, h: fh };

  // The prints land in a grid in the space above it.
  const cols = w >= 640 ? 3 : 2;
  const rows = Math.ceil(WORK.length / cols);
  const pad = 28;
  const top = 76;
  const room = folder.y - 28 - top;
  let cw = Math.min(250, (w - pad * 2 - GAP * (cols - 1)) / cols);
  cw = Math.min(cw, ((room - GAP * (rows - 1)) / rows - CAPTION) / 0.8);
  cw = Math.max(110, cw);
  const ch = cw * 0.8 + CAPTION;
  const gridW = cols * cw + (cols - 1) * GAP;
  const gridH = rows * ch + (rows - 1) * GAP;
  const gx = (w - gridW) / 2;
  const gy = top + Math.max(0, (room - gridH) / 2);

  // Tucked prints shrink to fit inside the folder both ways.
  const scale = Math.min((fw * 0.84) / cw, (fh * 0.8) / ch);
  return {
    w,
    h,
    folder,
    card: { w: cw, h: ch },
    open: WORK.map((_, i) => ({
      x: gx + (i % cols) * (cw + GAP),
      y: gy + Math.floor(i / cols) * (ch + GAP),
      rotate: TILT[i % TILT.length],
    })),
    // Tucked: stacked inside the folder, scaled down, their tops just inside
    // the back panel's lip. (Scaling is about the centre, so offset for it.)
    tucked: WORK.map((_, i) => ({
      x: folder.x + fw / 2 - cw / 2 + (i - 2.5) * 2,
      y: folder.y + fh * 0.14 - (ch * (1 - scale)) / 2 + i * 1.5,
      rotate: (i % 2 ? 1 : -1) * (1 + i * 0.3),
      scale,
    })),
  };
}

export function WorkFolder({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const area = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = area.current!;
    // Measure straight away, then keep up with resizes.
    const r = el.getBoundingClientRect();
    setLayout(measure(r.width, r.height));
    const ro = new ResizeObserver(([e]) => setLayout(measure(e.contentRect.width, e.contentRect.height)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false);
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open, onOpenChange]);

  // A click on empty space puts everything away.
  const closeOnEmpty = (e: MouseEvent) => {
    if (open && e.target === e.currentTarget) onOpenChange(false);
  };

  const L = layout;
  const f = L?.folder;

  return (
    <div ref={area} className="folder-area" data-open={open} onClick={closeOnEmpty}>
      {L && f && (
        <>
          {/* Back panel, with its tab — the folder's inside. */}
          <div
            className="folder__back"
            style={{ left: f.x, top: f.y, width: f.w, height: f.h }}
            onClick={() => onOpenChange(!open)}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            aria-hidden="true"
          >
            <span className="folder__tab" />
          </div>

          <ul className="folder-cards" id="work-folder-cards" aria-label="Case studies">
            {WORK.map((item, i) => {
              const target = open
                ? { ...L.open[i], scale: 1 }
                : hover
                  ? { ...L.tucked[i], y: L.tucked[i].y - 14 - i * 3 }
                  : L.tucked[i];
              return (
                <motion.li
                  key={item.slug}
                  className="folder-card"
                  style={{ width: L.card.w, zIndex: 2 + i }}
                  initial={false}
                  animate={target}
                  transition={
                    open
                      ? { type: 'spring', stiffness: 230, damping: 21, mass: 0.9, delay: 0.08 + i * 0.055 }
                      : { type: 'spring', stiffness: 340, damping: 32, delay: (WORK.length - 1 - i) * 0.03 }
                  }
                  data-live={open || undefined}
                >
                  <Link to={item.link} className="folder-card__print" tabIndex={open ? 0 : -1} aria-hidden={!open}>
                    <div className="folder-card__cover">
                      <ProjectCover cover={item.cover} alt={`${item.cover.client} — ${item.title}`} lift={false} neutral />
                    </div>
                    <div className="folder-card__caption">
                      <span className="folder-card__client">{item.cover.client}</span>
                      <span className="folder-card__meta">
                        {item.kind} / {item.year}
                      </span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Front flap: hinged at the bottom, it tips forward on hover and
              swings down when the folder opens. */}
          <motion.button
            type="button"
            className="folder__front"
            style={{ left: f.x, top: f.y + f.h * 0.2, width: f.w, height: f.h * 0.8 }}
            initial={false}
            animate={{ rotateX: open ? 52 : hover ? 16 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={() => onOpenChange(!open)}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            aria-expanded={open}
            aria-controls="work-folder-cards"
            aria-label={open ? 'Put the case studies away' : 'Open the Work folder'}
          >
            <span className="folder__label">Work</span>
            <span className="folder__count">{String(WORK.length).padStart(2, '0')}</span>
          </motion.button>
        </>
      )}
    </div>
  );
}
