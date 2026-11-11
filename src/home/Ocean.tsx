import { useRef } from 'react';
import { AsciiOcean } from '../vendor/ascii-sharks/react';
import type { SharkSpec } from '../vendor/ascii-sharks';
import { play } from './sound';
import './ocean.css';

/* The whole homepage as a koi pond in ASCII: koi glide freely behind
   everything, among small schools of fry drifting on the current. The koi
   wander over to look at the pointer. Click the water and it's feeding time:
   rings ripple out from the spot with a soft drop sound (when sound is on),
   the fry scatter, and the koi hurry over. Clicks on links and buttons are
   left alone. It follows the lights switch: light ink koi on the white page,
   a dark night pond with the lights off. Behind the left column it fades to
   a faint layer so the text stays easy to read.

   Built on ascii-sharks by drewdi (MIT), vendored in src/vendor/ascii-sharks
   with a light theme, koi (shapes, patterns, calm behaviour), ripples and
   splash hooks added. It pauses when the tab is hidden and honours reduced
   motion. */

// Seven koi in their true colours: kohaku (white, red), sanke (white, red,
// black spots), showa (black, red, white), asagi (blue-grey scales with
// orange-red sides), a metallic gold ogon, tancho (white with a red crown)
// and a yellow kigoi. Also available: shusui, orenji.
const KOI: SharkSpec[] = [
  { kind: 'kohaku', size: 0.56 },
  { kind: 'sanke', size: 0.52 },
  { kind: 'showa', size: 0.54 },
  { kind: 'asagi', size: 0.5 },
  { kind: 'ogon', size: 0.48 },
  { kind: 'tancho', size: 0.5 },
  { kind: 'kigoi', size: 0.46 },
];

// A light scattering of fry rather than a crowd.
const FRY = 70;

// Presses on anything interactive aren't clicks in the water.
const INTERACTIVE = 'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor]';

export function Ocean({ night = false, sound = true }: { night?: boolean; sound?: boolean }) {
  const theme = night ? 'dark' : 'light';
  // The engine keeps its first options for life, so read the latest sound
  // setting through a ref.
  const soundOn = useRef(sound);
  soundOn.current = sound;

  return (
    <div className="ocean" data-theme={theme} aria-hidden="true">
      {/* A new engine per theme: the renderer's palette is fixed for its life. */}
      <AsciiOcean
        key={theme}
        className="ocean__canvas"
        sharks={KOI}
        options={{
          theme,
          transparent: true,
          cellWidth: 8,
          fishCount: FRY,
          canSplash: (e) => !(e.target as Element | null)?.closest?.(INTERACTIVE),
          onSplash: () => {
            if (soundOn.current) play('drop');
          },
        }}
      />
    </div>
  );
}
