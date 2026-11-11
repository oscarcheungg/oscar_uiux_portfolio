import { useRef } from 'react';
import { usePrefs } from '../lib/prefs';
import { LocalTime } from '../home/LocalTime';
import { PROFILE } from '../home/config';
import '../home/home.css';

/* Sound, lights, and the place and time: the same row of controls at the
   top right of every page. The switches are shared (see lib/prefs), so a
   choice made on one page holds on the next. */
export function TopBar({ className = '' }: { className?: string }) {
  const { sound, lights, toggleSound, toggleLights } = usePrefs();
  const bulb = useRef<HTMLButtonElement>(null);

  return (
    <div className={`home__top ${className}`}>
      <div className="home__toggles">
        <button
          type="button"
          className="home__toggle"
          aria-pressed={sound}
          aria-label={sound ? 'Turn sound off' : 'Turn sound on'}
          onClick={toggleSound}
        >
          <img src={sound ? '/home/icons/volume.svg' : '/home/icons/volume-off.svg'} alt="" width={24} height={24} />
        </button>
        <button
          type="button"
          className="home__toggle"
          aria-pressed={!lights}
          aria-label={lights ? 'Turn the lights off' : 'Turn the lights on'}
          ref={bulb}
          onClick={() => toggleLights(bulb.current)}
        >
          <img src={lights ? '/home/icons/bulb.svg' : '/home/icons/bulb-off.svg'} alt="" width={24} height={24} />
        </button>
      </div>
      <LocalTime place={PROFILE.location} timeZone={PROFILE.timeZone} coords={PROFILE.coords} />
    </div>
  );
}
