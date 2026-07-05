import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';

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
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-xs tracking-widest text-neutral-500 dark:text-neutral-500 hover:text-[var(--csa)] dark:hover:text-[var(--csa-dark)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              work
            </Link>
            <ul className="mt-8 space-y-3">
              {toc.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goTo(item.id)}
                    className={`text-left text-sm leading-snug transition-colors ${
                      activeId === item.id
                        ? 'text-neutral-900 dark:text-neutral-50 font-medium'
                        : 'text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
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
  eyebrow?: string;
  title: string;
  subtitle: string;
  meta: CaseStudyMetaItem[];
  cover: string;
  coverAlt: string;
}

export function CaseStudyHeader({ eyebrow, title, subtitle, meta, cover, coverAlt }: CaseStudyHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {/* mobile back link (sidebar handles desktop) */}
      <Link
        to="/#work"
        className="md:hidden inline-flex items-center gap-2 text-xs tracking-widest text-neutral-500 dark:text-neutral-500 hover:text-[var(--csa)] dark:hover:text-[var(--csa-dark)] transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        work
      </Link>

      {eyebrow && (
        <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-4">
          {eyebrow}
        </p>
      )}

      <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.06] tracking-tight text-neutral-900 dark:text-neutral-50 mb-8">
        {title}
      </h1>

      {/* Cover */}
      <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
        <img src={cover} alt={coverAlt} className="w-full h-auto" loading="eager" decoding="async" />
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-8 md:mt-10">
        {meta.map((item) => (
          <div key={item.label}>
            <p className="text-[0.65rem] uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-2">
              {item.label}
            </p>
            <p className="text-sm text-neutral-900 dark:text-neutral-100 leading-snug whitespace-pre-line">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Lead-in description */}
      <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed mt-10 md:mt-12">
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
}

export function CaseStudySection({ num, label, title, children }: CaseStudySectionProps) {
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
      className="py-8 md:py-12 scroll-mt-28"
    >
      <p className="text-xs uppercase tracking-widest text-[var(--csa)] dark:text-[var(--csa-dark)] mb-3">
        {label}
      </p>
      <h2 className="text-xl md:text-2xl mb-5 tracking-tight font-semibold text-neutral-900 dark:text-neutral-50">
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
}

export function CaseStudyFigure({ src, alt = '', type = 'image', className = '' }: CaseStudyFigureProps) {
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
      className={`rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 ${className}`}
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
      className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border border-neutral-300 dark:border-neutral-700 rounded-full text-neutral-900 dark:text-neutral-100 hover:border-[var(--csa)] hover:text-[var(--csa)] dark:hover:border-[var(--csa-dark)] dark:hover:text-[var(--csa-dark)] transition-all duration-300 hover:-translate-y-0.5 touch-manipulation text-base"
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
      className={`p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 ${className}`}
    >
      {title && (
        <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
