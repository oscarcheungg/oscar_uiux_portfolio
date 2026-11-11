import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isPlainClick, navigateWithTransition } from '../lib/pageTransition';
import { usePrefs } from '../lib/prefs';
import { play } from '../home/sound';
import { LazyVideo } from '../lib/media';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ProjectCover, ProjectCoverArt } from './ProjectCover';
import { ImageLightbox } from './ImageLightbox';

import './case-study.css';

/* Case-study template, in the homepage's own voice: Inter at 14px, quiet
   grey labels over near-black text, the same 24px page margin, and pale
   blue bubbles for anything boxed.

   The page opens on the project's cover — its original painted ground and
   screens, 16:10 with rounded corners — at the top of the content column;
   each section opens with a small blue <LABEL> tag — the same blue as the
   "Engineer" hover — above its title.
   The nav sits at the left edge at the page margin, like the homepage's
   column — the way back, then the sections as a vertical scale whose ticks
   bump out around the cursor (see SectionScale), sticky as you scroll — and
   the content is centred in the space to its right. Pages' own typography
   is mapped onto this scale in case-study.css. */

function slug(num: string, label: string) {
  return `${num}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

/* "← Back" to the work, written once for the nav and small screens. */
export function BackToWork({ className = '' }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <Link
      to="/"
      className={`cs-back ${className}`}
      onClick={(e) => {
        if (!isPlainClick(e)) return;
        e.preventDefault();
        navigateWithTransition(() => navigate('/'), { direction: 'back' });
      }}
    >
      <img className="cs-back__arrow" src="/home/icons/arrow-left.svg" alt="" width={24} height={24} />
      Back
    </Link>
  );
}

// ---- Section nav: a scale with bumps ----

/* The sections as a vertical ruler: a long tick with the section's name for
   each section, and a few short ticks between them. Moving the cursor down
   the scale makes the ticks nearest it bump out — a smooth swell that falls
   off with distance, like a magnifier sliding along the ruler. The section
   you're reading keeps a long, dark tick. */
const MINOR_TICKS = 5; // short ticks between two sections
const BUMP_REACH = 26; // px; how far the swell spreads from the cursor

function SectionScale({
  toc,
  activeId,
  filled,
  onPick,
}: {
  toc: { id: string; label: string }[];
  activeId: string;
  /* How many of the current section's short ticks the reader has scrolled
     past (0 to MINOR_TICKS). */
  filled: number;
  onPick: (id: string) => void;
}) {
  const scale = useRef<HTMLDivElement>(null);

  const swell = (clientY: number | null) => {
    const root = scale.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('[data-tick]').forEach((tick) => {
      if (clientY === null) {
        tick.style.setProperty('--bump', '0');
        return;
      }
      const r = tick.getBoundingClientRect();
      const d = clientY - (r.top + r.height / 2);
      const bump = Math.exp(-(d * d) / (2 * BUMP_REACH * BUMP_REACH));
      tick.style.setProperty('--bump', bump.toFixed(3));
    });
  };

  return (
    <div
      ref={scale}
      className="cs-scale"
      onMouseMove={(e) => swell(e.clientY)}
      onMouseLeave={() => swell(null)}
    >
      {toc.map((item, i) => (
        <div key={item.id} className="cs-scale__group">
          <button
            type="button"
            onClick={() => onPick(item.id)}
            className="cs-scale__major"
            aria-current={activeId === item.id ? 'true' : undefined}
          >
            <span className="cs-scale__tick cs-scale__tick--major" data-tick aria-hidden="true" />
            <span className="cs-scale__label">{item.label}</span>
          </button>
          {i < toc.length - 1 &&
            Array.from({ length: MINOR_TICKS }, (_, k) => {
              // The short ticks after the current section fill in as the
              // reader moves through it; the last one passed marks where they are.
              const reading = activeId === item.id && k < filled;
              const state = reading ? (k === filled - 1 ? 'here' : 'past') : undefined;
              return (
                <span key={k} className="cs-scale__minor" aria-hidden="true">
                  <span className="cs-scale__tick" data-tick data-state={state} />
                </span>
              );
            })}
        </div>
      ))}
    </div>
  );
}

// ---- Page layout: fixed section list + centred reading column ----

export function CaseStudyLayout({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<{ id: string; label: string }[]>([]);
  const [activeId, setActiveId] = useState('');
  const [filled, setFilled] = useState(0);
  const { sound } = usePrefs();

  // A soft detent as each short tick on the ruler fills while scrolling, a
  // fuller one on reaching a new section. Nothing on the first layout, and
  // nothing with sound off.
  const heard = useRef<{ id: string; filled: number } | null>(null);
  useEffect(() => {
    const prev = heard.current;
    heard.current = { id: activeId, filled };
    if (!prev || !prev.id || !sound || !activeId) return;
    if (prev.id !== activeId) play('notch');
    else if (prev.filled !== filled) play('tick');
  }, [activeId, filled, sound]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-cs-section]'));
    setToc(nodes.map((n) => ({ id: n.id, label: n.dataset.label || '' })));

    let raf = 0;
    const update = () => {
      raf = 0;
      const marker = 160; // px from top of viewport
      let index = 0;
      nodes.forEach((n, i) => {
        if (n.getBoundingClientRect().top - marker <= 0) index = i;
      });
      let current = nodes[index]?.id || '';
      // How far the marker has travelled from this section's top to the next
      // one's, in short ticks.
      let progress = 0;
      const next = nodes[index + 1];
      if (nodes[index] && next) {
        const top = nodes[index].getBoundingClientRect().top;
        const span = next.getBoundingClientRect().top - top;
        if (span > 0) progress = Math.min(1, Math.max(0, (marker - top) / span));
      }
      // The last section is usually too short to reach the marker; once the
      // page is scrolled to the bottom, it's the one being read.
      const doc = document.documentElement;
      if (nodes.length && window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        index = nodes.length - 1;
        current = nodes[index].id;
        progress = 0;
      }
      setActiveId(current);
      setFilled(Math.min(MINOR_TICKS, Math.floor(progress * (MINOR_TICKS + 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="cs-layout">
      <nav className="cs-nav" aria-label="Sections">
        <BackToWork />
        <SectionScale toc={toc} activeId={activeId} filled={filled} onPick={goTo} />
      </nav>

      <div ref={contentRef} className="cs-column">
        {children}
      </div>

      <ImageLightbox root={contentRef} />
    </div>
  );
}

// ---- Header ----

interface CaseStudyMetaItem {
  label: string;
  value: string;
}

interface CaseStudyHeaderProps {
  title: string;
  subtitle: string;
  meta: CaseStudyMetaItem[];
  /* The project's own cover — the same screens and moving ground the
     homepage previews, here at the top of the page. */
  cover: ProjectCoverArt;
  coverAlt: string;
}

export function CaseStudyHeader({ title, subtitle, meta, cover, coverAlt }: CaseStudyHeaderProps) {
  const [discipline, year] = (() => {
    const words = cover.meta.split(' ');
    return [words.slice(0, -1).join(' '), words[words.length - 1]];
  })();

  return (
    <header className="cs-header">
      {/* On windows too narrow for the side nav, the way back sits here. */}
      <BackToWork className="cs-back--inline" />

      {/* The opening slide, the width of the reading column. */}
      <div className="cs-hero">
        <ProjectCover cover={cover} alt={coverAlt} showArt lift={false} />
      </div>

      <motion.div
        className="cs-intro"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="cs-eyebrow">
          <span className="cs-eyebrow__client">{cover.client},</span> {discipline}
          {' '}
          <span className="cs-eyebrow__year">{year}</span>
        </p>

        <h1 className="cs-title">{title}</h1>
        <p className="cs-lead">{subtitle}</p>

        <dl className="cs-meta">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="cs-tag">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </header>
  );
}

// ---- Section ----

interface CaseStudySectionProps {
  num: string;
  label: string;
  sublabel?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function CaseStudySection({ num, label, title, children, className = '' }: CaseStudySectionProps) {
  const id = slug(num, label);
  return (
    <motion.section
      id={id}
      data-cs-section
      data-label={label}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`cs-section ${className}`}
    >
      <p className="cs-tag cs-tag--section">{label}</p>
      <h2 className="cs-section__title">{title}</h2>
      {children}
    </motion.section>
  );
}

// ---- Figure (image or video) ----

interface CaseStudyFigureProps {
  src: string;
  alt?: string;
  type?: 'image' | 'video';
  className?: string;
  bordered?: boolean;
  rounded?: boolean;
  /** Opens in the image viewer on click. For images with detail worth reading. */
  zoomable?: boolean;
}

export function CaseStudyFigure({
  src,
  alt = '',
  type = 'image',
  className = '',
  bordered = true,
  rounded = true,
  zoomable = false,
}: CaseStudyFigureProps) {
  const media =
    type === 'video' ? (
      <LazyVideo src={src} className="w-full h-auto" autoPlay loop muted playsInline />
    ) : (
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
        data-zoomable={zoomable || undefined}
      />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`cs-figure ${rounded ? 'cs-figure--rounded' : ''} ${bordered ? 'cs-figure--bordered' : ''} ${className}`}
    >
      {media}
    </motion.div>
  );
}

// ---- External link button ----

interface CaseStudyLinkProps {
  href: string;
  children: ReactNode;
}

export function CaseStudyLink({ href, children }: CaseStudyLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cs-link"
    >
      <span>{children}</span>
      <ExternalLink className="cs-link__icon" aria-hidden="true" />
    </a>
  );
}

// ---- Card ----

interface CaseStudyCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function CaseStudyCard({ title, children, className = '' }: CaseStudyCardProps) {
  return (
    <div className={`cs-card ${className}`}>
      {title && <h3 className="cs-card__title">{title}</h3>}
      {children}
    </div>
  );
}

// ---- Scannable blocks: TL;DR, callout, numbered points, image pair ----
/* The pieces a case study is built from so it can be read in a skim: a TL;DR
   up front (two short paragraphs and "what I did" cards), a single large
   statement, short numbered points, and two images side by side with a line
   under each. */

interface TLDRProps {
  /* Two or three short paragraphs: the context, what I did, what happened. */
  summary: ReactNode[];
  /* Up to four "what I did" cards, each a bold line and one sentence. */
  impact: { title: string; body: string }[];
  impactLabel?: string;
}

export function CaseStudyTLDR({ summary, impact, impactLabel = 'What I did' }: TLDRProps) {
  return (
    <motion.section
      id="00-tl-dr"
      data-cs-section
      data-label="TL;DR"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="cs-section cs-tldr"
    >
      <p className="cs-tag cs-tag--section">TL;DR</p>
      <div className="cs-tldr__summary">
        {summary.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="cs-tag cs-tldr__impact-label">{impactLabel}</p>
      <div className="cs-tldr__impact">
        {impact.map((item) => (
          <div key={item.title} className="cs-tldr__card">
            <p className="cs-tldr__card-title">{item.title}</p>
            <p className="cs-tldr__card-body">{item.body}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* One large statement — the question, the insight, the number — set apart
   so it lands on a skim. */
export function CaseStudyCallout({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="cs-callout">
      <p className="cs-callout__text">{children}</p>
      {note && <p className="cs-callout__note">{note}</p>}
    </div>
  );
}

/* Short numbered points: a bold line and one or two sentences each. */
export function CaseStudyPoints({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="cs-points">
      {items.map((item, i) => (
        <li key={item.title} className="cs-points__item">
          <span className="cs-points__num">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <p className="cs-points__title">{item.title}</p>
            <p className="cs-points__body">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* Images stacked one per row, each with a short caption — before/after, or
   steps of the process. Mark an item zoomable to open it in the image viewer. */
export function CaseStudyPair({
  items,
  bare = false,
}: {
  items: { src: string; alt: string; caption: ReactNode; tag?: string; zoomable?: boolean }[];
  /** Images sit straight on the page, without the grey backing. */
  bare?: boolean;
}) {
  return (
    <div className={`cs-pair ${bare ? 'cs-pair--bare' : ''}`}>
      {items.map((item) => (
        <figure key={item.src} className="cs-pair__item">
          <div className="cs-pair__media">
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              data-zoomable={item.zoomable || undefined}
            />
          </div>
          <figcaption className="cs-pair__caption">
            {item.tag && <span className="cs-tag cs-pair__tag">{item.tag}</span>}
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* Two images that belong together, shown as one figure: a single outlined
   frame split down the middle, with one caption under the whole thing.
   Each half can open in the image viewer. Stacks on small screens. */
export function CaseStudyDuo({
  items,
  tag,
  caption,
  zoomable = false,
}: {
  items: { src: string; alt: string }[];
  tag?: string;
  caption?: ReactNode;
  zoomable?: boolean;
}) {
  return (
    <figure className="cs-duo">
      <div className="cs-duo__frame">
        {items.map((item) => (
          <div key={item.src} className="cs-duo__cell">
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              data-zoomable={zoomable || undefined}
            />
          </div>
        ))}
      </div>
      {(tag || caption) && (
        <figcaption className="cs-pair__caption">
          {tag && <span className="cs-tag cs-pair__tag">{tag}</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* Headline numbers in one outlined panel: a row of stats split by hairlines
   and, optionally, a bar comparison underneath whose bars grow in when the
   panel scrolls into view. A value written "5 → 2" shows the arrow quietly
   and the result in the accent colour. */
interface StatsProps {
  label?: string;
  stats: { value: string; label: string }[];
  compare?: {
    title: string;
    rows: { label: string; value: number; display: string; accent?: boolean }[];
  };
}

function StatValue({ value }: { value: string }) {
  const [from, to] = value.split('→').map((v) => v.trim());
  if (to === undefined) return <>{value}</>;
  return (
    <>
      {from}
      <span className="cs-stat__arrow" aria-hidden>
        →
      </span>
      <span className="cs-stat__to">{to}</span>
      <span className="sr-only"> to </span>
    </>
  );
}

export function CaseStudyStats({ label, stats, compare }: StatsProps) {
  const max = compare ? Math.max(...compare.rows.map((r) => r.value)) : 1;
  return (
    <div className="cs-stats-wrap">
      {label && <p className="cs-tag cs-stats__label">{label}</p>}
      <div className="cs-stats">
        <div className="cs-stats__grid" style={{ '--cols': stats.length } as React.CSSProperties}>
          {stats.map((stat) => (
            <div key={stat.label} className="cs-stat">
              <p className="cs-stat__value">
                <StatValue value={stat.value} />
              </p>
              <p className="cs-stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
        {compare && (
          <div className="cs-stats__compare">
            <p className="cs-stats__compare-title">{compare.title}</p>
            {compare.rows.map((row, i) => (
              <div key={row.label} className="cs-bar-row">
                <span className="cs-bar-row__label">{row.label}</span>
                <span className="cs-bar">
                  <motion.span
                    className={`cs-bar__fill ${row.accent ? 'cs-bar__fill--accent' : ''}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(row.value / max) * 100}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
                <span className={`cs-bar-row__value ${row.accent ? 'cs-bar-row__value--accent' : ''}`}>
                  {row.display}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
