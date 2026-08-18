import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { ProjectCover, ProjectCoverArt, ProjectTags } from './ProjectCover';

/* Typography borrowed wholesale from the homepage and about page: Instrument
   Sans for the small labels, Inter at 16px for anything read as prose, and one
   heading scale rather than three. */
const LABEL =
  'font-label text-[13px] font-medium tracking-[0.7px] text-neutral-900/60';
const BODY = 'text-[16px] leading-6 text-neutral-900/55';

/**
 * Case-study template (inspired by rachelchen.tech):
 * a sticky left table-of-contents sidebar beside a content column with a
 * serif title, full-width cover, a Role/Timeline/Team/Skills meta row, and
 * numbered sections. The sidebar is built by scanning rendered sections and
 * highlights the one in view.
 */

function slug(num: string, label: string) {
  return `${num}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

/* The way back, written once so the sidebar and the mobile header can't drift.
   Held back to 55% ink and resolving on hover, exactly like the nav links, and
   the arrow slides a hair towards the work it returns to. */
export function BackToWork({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/#work"
      className={`group inline-flex items-center gap-2 -my-2 py-2 font-label text-[13px] font-medium tracking-[0.5px] text-neutral-900/55 hover:text-neutral-900 transition-colors ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
      Work
    </Link>
  );
}

// ---- Page layout: sticky TOC + content ----

export function CaseStudyLayout({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<{ id: string; label: string }[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-cs-section]'));
    setToc(nodes.map((n) => ({ id: n.id, label: n.dataset.label || '' })));

    let raf = 0;
    const update = () => {
      raf = 0;
      const marker = 160; // px from top of viewport
      let current = nodes[0]?.id || '';
      for (const n of nodes) {
        if (n.getBoundingClientRect().top - marker <= 0) current = n.id;
        else break;
      }
      setActiveId(current);
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
      const y = el.getBoundingClientRect().top + window.scrollY - 112;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="md:grid md:grid-cols-[9rem,1fr] lg:grid-cols-[11rem,1fr] md:gap-12 lg:gap-16">
        {/* Sticky TOC */}
        <nav className="hidden md:block" aria-label="Sections">
          <div className="sticky top-28">
            <BackToWork />
            <ul className="mt-8 space-y-3">
              {toc.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goTo(item.id)}
                    className={`text-left text-[14px] leading-snug transition-colors ${
                      activeId === item.id
                        ? 'text-neutral-900 font-medium'
                        : 'text-neutral-900/45 hover:text-neutral-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <div ref={contentRef} className="min-w-0">{children}</div>
      </div>
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
  /* The project's own cover — the same screens and painted ground the
     homepage card reveals on hover, here simply the cover. */
  cover: ProjectCoverArt;
  coverAlt: string;
}

export function CaseStudyHeader({
  title,
  subtitle,
  meta,
  cover,
  coverAlt,
}: CaseStudyHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {/* mobile back link (sidebar handles desktop) */}
      <BackToWork className="md:hidden mb-6" />

      {/* Client and tags, exactly as the work section labels this project. */}
      <div className="mb-4 flex items-center gap-2">
        <p className={LABEL}>{cover.client}</p>
        <ProjectTags meta={cover.meta} />
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-neutral-900 mb-8">
        {title}
      </h1>

      {/* Cover — a wider crop of the homepage tile, with the artwork already
          showing rather than waiting for a cursor. */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
        <ProjectCover cover={cover} alt={coverAlt} showArt lift={false} />
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-8 md:mt-10">
        {meta.map((item) => (
          <div key={item.label}>
            <p className={`${LABEL} mb-2`}>{item.label}</p>
            <p className="text-[16px] leading-6 text-neutral-900/85 whitespace-pre-line">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Lead-in description */}
      <p className={`${BODY} mt-10 md:mt-12`}>
        {subtitle}
      </p>
    </motion.div>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`py-8 md:py-12 scroll-mt-28 ${className}`}
    >
      <p className="font-label text-[13px] font-medium tracking-[0.7px] text-[var(--csa)] mb-3">
        {label}
      </p>
      <h2 className="text-xl md:text-2xl mb-5 tracking-tight font-medium text-neutral-900">
        {title}
      </h2>
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
}

export function CaseStudyFigure({
  src,
  alt = '',
  type = 'image',
  className = '',
  bordered = true,
  rounded = true,
}: CaseStudyFigureProps) {
  const media =
    type === 'video' ? (
      <video src={src} className="w-full h-auto" autoPlay loop muted playsInline preload="auto">
        Your browser does not support the video tag.
      </video>
    ) : (
      <img src={src} alt={alt} className="w-full h-auto" loading="lazy" decoding="async" />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${rounded ? 'rounded-2xl' : ''} overflow-hidden ${
        bordered ? 'border border-neutral-200' : ''
      } ${className}`}
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
      className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border border-neutral-300 rounded-full text-neutral-900 hover:border-[var(--csa)] hover:text-[var(--csa)] transition-all duration-300 hover:-translate-y-0.5 touch-manipulation text-[16px]"
    >
      <span>{children}</span>
      <ExternalLink className="w-4 h-4" />
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
    <div
      className={`p-5 rounded-[10px] bg-neutral-900/[0.035] ${className}`}
    >
      {title && (
        <h3 className="text-[17px] font-medium mb-4 text-neutral-900">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
