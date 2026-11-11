import { Link, useLocation } from 'react-router-dom';
import './bottom-nav.css';

type Section = 'work' | 'play' | 'about';

/* The glass pill floating at the bottom of the window: Work, Play, About.
   The current section sits on a white highlight — Work on the homepage and
   the case studies, About on /about. Work's selected state is the exact Figma
   export; About's draws the same highlight in CSS. */
export function BottomNav({ current }: { current: Section }) {
  const { pathname } = useLocation();
  const workOn = current === 'work';
  const workIcon = workOn ? (
    <img className="bottom-nav__selected" src="/nav/work-selected.svg" alt="" width={64} height={44} />
  ) : (
    <img src="/nav/briefcase.svg" alt="" width={22} height={22} />
  );

  return (
    <nav className="bottom-nav" aria-label="Primary">
      <div className="bottom-nav__items">
        {/* On the homepage Work scrolls back to the top; from a case study it
            returns to the homepage. */}
        {pathname === '/' ? (
          <a href="#top" className="bottom-nav__item" aria-label="Work" aria-current={workOn ? 'page' : undefined}>
            {workIcon}
          </a>
        ) : (
          <Link to="/" className="bottom-nav__item" aria-label="Work" aria-current={workOn ? 'page' : undefined}>
            {workIcon}
          </Link>
        )}

        <button type="button" className="bottom-nav__item" aria-label="Play (coming soon)" aria-disabled="true">
          <img src="/nav/dice.svg" alt="" width={22} height={22} />
        </button>

        <Link
          to="/about"
          className={`bottom-nav__item${current === 'about' ? ' bottom-nav__item--on' : ''}`}
          aria-label="About"
          aria-current={current === 'about' ? 'page' : undefined}
        >
          <img src={current === 'about' ? '/nav/person-selected.svg' : '/nav/person.svg'} alt="" width={22} height={22} />
        </Link>
      </div>
    </nav>
  );
}
