import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { PROFILE, WORK } from './config';
import { play } from './sound';

/* The sidebar's index: three headings — Work, More, Contact — that open in
   place to show where you can go. One highlight serves every row; it glides
   from row to row, even across groups, following the pointer. */

interface RowProps {
  id: string;
  label: ReactNode;
  meta?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  index?: string;
}

function Row({ id, label, meta, to, href, onClick, hovered, setHovered, index }: RowProps) {
  const inner = (
    <>
      {hovered === id && (
        <motion.span
          layoutId="side-pill"
          className="side-row__pill"
          transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.7 }}
        />
      )}
      {index && <span className="side-row__index">{index}</span>}
      <span className="side-row__label">{label}</span>
      {meta && <span className="side-row__meta">{meta}</span>}
    </>
  );
  const props = {
    className: 'side-row',
    onPointerEnter: () => setHovered(id),
    onFocus: () => setHovered(id),
  };

  if (to) return <Link to={to} {...props}>{inner}</Link>;
  if (href) {
    const external = /^https?:/.test(href) || href.endsWith('.pdf');
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} data-sound="silent-press" {...props}>
      {inner}
    </button>
  );
}

/* A heading that opens and closes its rows, the rows easing open beneath. */
function Group({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  const id = `side-group-${title.toLowerCase()}`;
  return (
    <section className="side-group" data-open={open}>
      <button type="button" className="side-group__title" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        {title}
        <span className="side-group__mark" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="side-group__rows"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="side-group__inner">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* Work is shared with the folder in the play area: opening one opens the
   other. More and Contact open on their own. */
export function SideIndex({ workOpen, onWorkOpenChange }: { workOpen: boolean; onWorkOpenChange: (open: boolean) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = (g: string) => setOpen((o) => ({ ...o, [g]: !o[g] }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
      return;
    }
    play('copy');
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <LayoutGroup>
      <nav className="side-index" aria-label="Index" onPointerLeave={() => setHovered(null)} onBlur={() => setHovered(null)}>
        <Group title="Work" open={workOpen} onToggle={() => onWorkOpenChange(!workOpen)}>
          {WORK.map((w, i) => (
            <Row
              key={w.slug}
              id={`work:${w.slug}`}
              index={String(i + 1).padStart(2, '0')}
              label={w.cover.client}
              meta={w.year}
              to={w.link}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </Group>

        <Group title="More" open={!!open.more} onToggle={() => toggle('more')}>
          <Row id="about" label="About me" meta="Page" to="/about" hovered={hovered} setHovered={setHovered} />
          <Row id="resume" label="Résumé" meta="PDF" href={PROFILE.resume} hovered={hovered} setHovered={setHovered} />
        </Group>

        <Group title="Contact" open={!!open.contact} onToggle={() => toggle('contact')}>
          <Row
            id="email"
            label={copied ? 'Copied to clipboard' : 'Email'}
            meta={copied ? 'Done' : 'Copy'}
            onClick={copyEmail}
            hovered={hovered}
            setHovered={setHovered}
          />
          <Row id="linkedin" label="LinkedIn" meta="↗" href={PROFILE.linkedin} hovered={hovered} setHovered={setHovered} />
          <Row id="github" label="GitHub" meta="↗" href={PROFILE.github} hovered={hovered} setHovered={setHovered} />
        </Group>
      </nav>
    </LayoutGroup>
  );
}
