import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isPlainClick, navigateWithTransition } from '../lib/pageTransition';
import { usePrefs } from '../lib/prefs';
import { TopBar } from '../components/TopBar';
import { PROFILE, WORK } from '../home/config';
import { Signature } from '../components/Signature';
import { RoleLine } from '../home/RoleLine';
import { WorkPeek, useWorkPeek } from '../home/WorkPeek';
import { Ocean } from '../home/Ocean';
import '../home/home.css';

/* The landing page never scrolls: while it's open the document is pinned.
   Nothing on it is ever scaled down to fit — the spacing tightens on
   shorter windows instead (see home.css), and the two index sections make
   room for each other (see Home's toggleFold). */
function useLockedPage() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('home-locked');
    window.scrollTo(0, 0);
    return () => root.classList.remove('home-locked');
  }, []);
}

/* A section of the index that opens and closes from its label, closed to
   begin with. The label spans the column: the words on the left; a count of
   what's inside and a folder at the right that opens with the section. Opening
   cascades the rows in one after another. A closed list is inert, so its
   links leave the tab order too. */
function Fold({
  id,
  label,
  count,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const body = useRef<HTMLDivElement>(null);

  // React 18 doesn't know the inert attribute, so it's set directly.
  useEffect(() => {
    body.current?.toggleAttribute('inert', !open);
  }, [open]);

  return (
    <div className="fold" data-open={open} data-fold={id}>
      <h2>
        <button
          type="button"
          className="fold__toggle"
          aria-expanded={open}
          aria-controls={id}
          // The sound for what this press is about to do.
          data-sound={open ? 'close' : 'open'}
          onClick={onToggle}
        >
          <span>{label}</span>
          <span className="fold__end">
            <span className="fold__count" aria-hidden="true">
              {String(count).padStart(2, '0')}
            </span>
            <span className="fold__icon" aria-hidden="true">
              <img className="fold__glyph fold__glyph--closed" src="/home/icons/folder.svg" alt="" width={24} height={24} />
              <img className="fold__glyph fold__glyph--open" src="/home/icons/folder-open.svg" alt="" width={24} height={24} />
            </span>
          </span>
        </button>
      </h2>
      <div className="fold__body" id={id} ref={body}>
        <div className="fold__inner">
          <ul className="index__list">{children}</ul>
        </div>
      </div>
    </div>
  );
}


/* Would the left column fit in the window with these sections open? Lays
   the column out once, without transitions and at its natural height, in
   the proposed state, reads its height, and puts everything back — all
   before the browser paints, so nothing flickers. */
function fitsWith(side: HTMLElement, open: Record<string, boolean>) {
  // Phones and tablets scroll (see home.css), so everything always fits.
  if (window.matchMedia('(max-width: 1023px)').matches) return true;
  const folds = [...side.querySelectorAll<HTMLElement>('[data-fold]')];
  const before = folds.map((f) => f.dataset.open);
  side.classList.add('home__side--measuring');
  folds.forEach((f) => (f.dataset.open = String(!!open[f.dataset.fold!])));
  const needed = side.getBoundingClientRect().top + side.offsetHeight;
  folds.forEach((f, i) => (f.dataset.open = before[i]));
  // Lay out the real state once more, still without transitions, before
  // switching them back on. Otherwise the browser takes the measured (open)
  // layout as the starting point and the opening that follows has nothing
  // to animate from — it would just snap open.
  void side.offsetHeight;
  side.classList.remove('home__side--measuring');
  return needed <= window.innerHeight;
}

/* Current direction: who I am, the work, what's beyond it and how to reach me
   down the left; sound, lighting and the place and time up top. The page fits
   the window and doesn't scroll. */
export function Home() {
  const { sound, lights } = usePrefs();
  const side = useRef<HTMLElement>(null);
  const { peek, show: showPeek, hide: hidePeek } = useWorkPeek();
  const navigate = useNavigate();
  useLockedPage();

  /* Which index sections are open. Both can be, when the window is tall
     enough to show everything at its real size; when it isn't, opening one
     closes the other rather than shrinking text or letting the page scroll. */
  const [openFolds, setOpenFolds] = useState<Record<string, boolean>>({});
  const lastOpened = useRef<string | null>(null);
  const toggleFold = (id: string) => {
    const opening = !openFolds[id];
    const next = { ...openFolds, [id]: opening };
    if (opening) {
      lastOpened.current = id;
      if (side.current && !fitsWith(side.current, next)) {
        for (const other of Object.keys(next)) if (other !== id) next[other] = false;
      }
    }
    setOpenFolds(next);
  };

  // If the window is made shorter while both are open and they no longer
  // fit, keep only the one opened last.
  useEffect(() => {
    const onResize = () => {
      setOpenFolds((current) => {
        const openIds = Object.keys(current).filter((k) => current[k]);
        if (openIds.length < 2 || !side.current || fitsWith(side.current, current)) return current;
        const keep = lastOpened.current ?? openIds[openIds.length - 1];
        return Object.fromEntries(Object.keys(current).map((k) => [k, k === keep]));
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="home" id="top" data-theme={lights ? 'light' : 'dark'}>
      <Ocean night={!lights} sound={sound} />
      <TopBar />

      <aside className="home__side" ref={side}>
        <div className="portrait">
          <img className="home__photo" src="/home/profile-sofa.jpg" alt="Oscar Cheung" width={96} height={96} />
          <Signature className="signature" maskId="signature-ink" />
        </div>

        <section className="intro" aria-label="About me">
          <div className="intro__identity">
            <h1 className="intro__name">{PROFILE.name}</h1>
            <RoleLine />
          </div>
          <div className="intro__body">
            <p>I design interfaces and interactions that make everyday experiences feel simpler and more enjoyable.</p>
            <p>
              Currently, growing a design community with{' '}
              <a className="intro__link" href="https://www.figma.com" target="_blank" rel="noreferrer">
                @Figma
                <span className="intro__preview" aria-hidden="true">
                  <img src="/home/figvid.webp" alt="" width={640} height={480} />
                </span>
              </a>
              , and studying computer science and information science{' '}
              <a className="intro__link" href="https://www.unc.edu" target="_blank" rel="noreferrer">
                @UNC-Chapel Hill.
                <span className="intro__preview intro__preview--logo" aria-hidden="true">
                  <img src="/home/unc-nc.png" alt="" width={300} height={235} />
                </span>
              </a>
            </p>
          </div>
        </section>

        <nav className="index" aria-label="Site">
          <Fold
            id="selected-work"
            label="Selected works"
            count={WORK.length}
            open={!!openFolds['selected-work']}
            onToggle={() => toggleFold('selected-work')}
          >
            {WORK.map((item, i) => (
              <li key={item.slug} style={{ '--i': i } as CSSProperties}>
                <Link
                  to={item.link}
                  className="index__row"
                  onMouseEnter={(e) => showPeek(item, e.currentTarget)}
                  onMouseLeave={hidePeek}
                  onClick={(e) => {
                    if (!isPlainClick(e)) return;
                    e.preventDefault();
                    // The preview card, if it's showing, grows into the cover.
                    const card = document.querySelector<HTMLElement>('.work-peek[data-on="true"]');
                    navigateWithTransition(() => navigate(item.link), { shared: card });
                  }}
                >
                  <span className="index__name">{item.cover.client}</span>
                  <span className="index__meta">{item.blurb}</span>
                  <span className="index__year">{item.year}</span>
                </Link>
              </li>
            ))}
          </Fold>

          <Fold
            id="beyond-work"
            label="Elsewhere"
            count={2}
            open={!!openFolds['beyond-work']}
            onToggle={() => toggleFold('beyond-work')}
          >
            <li style={{ '--i': 0 } as CSSProperties}>
              <Link
                to="/about"
                className="index__row"
                onClick={(e) => {
                  if (!isPlainClick(e)) return;
                  e.preventDefault();
                  navigateWithTransition(() => navigate('/about'));
                }}
              >
                <span className="index__name">About me</span>
              </Link>
            </li>
            <li style={{ '--i': 1 } as CSSProperties}>
              <span className="index__row index__row--soon" aria-disabled="true">
                <span className="index__name">Play</span>
                <span className="index__year">coming soon</span>
              </span>
            </li>
          </Fold>
        </nav>

        <section className="contact" aria-label="Contact">
          <h2 className="contact__label">Connect with me</h2>
          <div className="contact__links">
            <a className="chip" href={`mailto:${PROFILE.email}`}>
              <img src="/home/icons/mail.svg" alt="" width={24} height={24} />
              {PROFILE.email}
            </a>
          </div>
          <div className="contact__links">
            <a className="chip chip--icon" href={PROFILE.resume} target="_blank" rel="noreferrer" aria-label="Résumé (PDF)">
              <img src="/home/icons/file.svg" alt="" width={24} height={24} />
            </a>
            <a className="chip chip--icon" href={PROFILE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/home/icons/brand-instagram.svg" alt="" width={24} height={24} />
            </a>
            <a className="chip chip--icon" href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="/home/icons/brand-linkedin.svg" alt="" width={24} height={24} />
            </a>
            {PROFILE.x && (
              <a className="chip chip--icon" href={PROFILE.x} target="_blank" rel="noreferrer" aria-label="X">
                <img src="/home/icons/brand-x.svg" alt="" width={24} height={24} />
              </a>
            )}
          </div>
        </section>
      </aside>


      <WorkPeek peek={peek} />
    </div>
  );
}
