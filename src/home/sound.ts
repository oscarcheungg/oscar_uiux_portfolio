/* Interface sounds, synthesized rather than sampled: nothing to download, and
   each cue can be nudged a little every time it plays so a row of hovers never
   sounds like a machine gun.

   The browser keeps audio suspended until the first click or key press, so
   hover cues are silent until the visitor has interacted once. That is fine —
   the page reads the same either way. */

export type Cue = 'hover' | 'press' | 'copy' | 'open' | 'close' | 'drop' | 'tick' | 'notch' | 'rustle';

export interface SoundOptions {
  /* Tick when the mouse arrives on something. Off: only presses click. */
  hover?: boolean;
}

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function audio() {
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function noiseBuffer(ac: AudioContext) {
  if (!noise) {
    noise = ac.createBuffer(1, Math.floor(ac.sampleRate * 0.25), ac.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noise;
}

const jitter = (amount: number) => 1 + (Math.random() * 2 - 1) * amount;

/* A short burst of filtered noise — the body of the hover tick. */
function burst(ac: AudioContext, at: number, opts: { freq: number; q: number; gain: number; length: number; type?: BiquadFilterType }) {
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac);
  const filter = ac.createBiquadFilter();
  filter.type = opts.type ?? 'bandpass';
  filter.frequency.value = opts.freq;
  filter.Q.value = opts.q;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(opts.gain, at + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + opts.length);
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start(at, Math.random() * 0.2);
  src.stop(at + opts.length + 0.02);
}

/* A soft, swelling breath of filtered noise — leaves moving. The noise
   loops so it can run longer than the buffer. */
function swish(ac: AudioContext, at: number, opts: { freq: number; gain: number; rise: number; length: number }) {
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac);
  src.loop = true;
  const band = ac.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = opts.freq;
  band.Q.value = 0.7;
  const soft = ac.createBiquadFilter();
  soft.type = 'lowpass';
  soft.frequency.value = 5000;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(opts.gain, at + opts.rise);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + opts.length);
  src.connect(band).connect(soft).connect(gain).connect(ac.destination);
  src.start(at, Math.random() * 0.2);
  src.stop(at + opts.length + 0.02);
}

/* A pitched blip that falls (or rises) as it fades — the press and the chimes. */
function blip(ac: AudioContext, at: number, opts: { from: number; to: number; gain: number; length: number; type?: OscillatorType }) {
  const osc = ac.createOscillator();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(opts.from, at);
  osc.frequency.exponentialRampToValueAtTime(opts.to, at + opts.length);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(opts.gain, at + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + opts.length);
  osc.connect(gain).connect(ac.destination);
  osc.start(at);
  osc.stop(at + opts.length + 0.02);
}

let lastHover = 0;
let lastTick = 0;

export function play(cue: Cue) {
  const ac = audio();
  if (!ac) return;
  // A cue played from a click can wait for the context to wake up; a hover
  // tick before the first click just stays silent.
  if (ac.state !== 'running') {
    if (cue !== 'hover') ac.resume().then(() => ac.state === 'running' && play(cue), () => {});
    return;
  }
  const t = ac.currentTime;

  switch (cue) {
    case 'hover': {
      // Rate-limited so sweeping across a row of links stays a patter.
      if (t - lastHover < 0.045) return;
      lastHover = t;
      burst(ac, t, { freq: 3400 * jitter(0.18), q: 1.4, gain: 0.05, length: 0.028 });
      break;
    }
    case 'press': {
      // Bubble pop, kept quiet: a small round sine that lifts a little in
      // pitch as it fades — felt more than heard.
      blip(ac, t, { from: 440 * jitter(0.04), to: 700, gain: 0.045, length: 0.035 });
      break;
    }
    case 'open': {
      // Two pops, the second a step higher — something unfolding.
      blip(ac, t, { from: 420, to: 640, gain: 0.035, length: 0.035 });
      blip(ac, t + 0.045, { from: 540, to: 820, gain: 0.03, length: 0.04 });
      break;
    }
    case 'close': {
      // The same pops in reverse, settling lower.
      blip(ac, t, { from: 540, to: 820, gain: 0.03, length: 0.035 });
      blip(ac, t + 0.045, { from: 420, to: 560, gain: 0.03, length: 0.035 });
      break;
    }
    case 'drop': {
      // "Koi kiss": two soft little bloops, like a koi surfacing to eat. Each
      // rises as it rings (the air bubble), the second a touch higher, over a
      // barely-there hush of water.
      const lift = jitter(0.08);
      blip(ac, t, { from: 380 * lift, to: 760 * lift, gain: 0.04, length: 0.07 });
      blip(ac, t + 0.085, { from: 460 * lift, to: 980 * lift, gain: 0.032, length: 0.065 });
      burst(ac, t, { freq: 1600, q: 0.5, gain: 0.004, length: 0.16, type: 'lowpass' });
      break;
    }
    case 'rustle': {
      // A branch shaken once: a few soft, overlapping swells of leaf noise
      // that rise gently and die away together, no clicks or crackle.
      for (let i = 0; i < 4; i++) {
        swish(ac, t + i * 0.09 * jitter(0.3), {
          freq: 2600 * jitter(0.2),
          gain: 0.018 * (1 - i * 0.18),
          rise: 0.06,
          length: 0.32 * jitter(0.2),
        });
      }
      break;
    }
    case 'tick': {
      // Scrolling past a short tick on the case study ruler: the faintest
      // click, like a fine detent on a dial.
      if (t - lastTick < 0.035) return;
      lastTick = t;
      burst(ac, t, { freq: 4200 * jitter(0.08), q: 2.2, gain: 0.018, length: 0.016 });
      break;
    }
    case 'notch': {
      // Reaching a new section: a slightly fuller detent with a hint of tone.
      if (t - lastTick < 0.035) return;
      lastTick = t;
      burst(ac, t, { freq: 3000 * jitter(0.06), q: 1.6, gain: 0.03, length: 0.022 });
      blip(ac, t, { from: 1400, to: 1250, gain: 0.012, length: 0.04 });
      break;
    }
    case 'copy': {
      blip(ac, t, { from: 880, to: 870, gain: 0.07, length: 0.09, type: 'triangle' });
      blip(ac, t + 0.075, { from: 1320, to: 1300, gain: 0.07, length: 0.16, type: 'triangle' });
      break;
    }
  }
}

/* One listener for the whole page: anything a visitor can activate pops
   when pressed (and, if hover sounds are on, ticks when the mouse arrives
   on it). An element opts out with
   data-sound="off", or picks its own press cue with data-sound="copy" etc. */
const INTERACTIVE = 'a[href], button, [role="button"], [data-sound]';

/* An element can name its own press cue (data-sound="open", "close",
   "copy"); everything else gets the bubble pop. */
function pressCue(cue: string | null): Cue {
  return cue === 'open' || cue === 'close' || cue === 'copy' ? cue : 'press';
}

export function installInteractionSounds({ hover = true }: SoundOptions = {}) {
  let current: Element | null = null;

  const over = (e: PointerEvent) => {
    if (!hover || e.pointerType !== 'mouse') return;
    const el = (e.target as Element).closest(INTERACTIVE);
    if (el === current) return;
    current = el;
    if (el && el.getAttribute('data-sound') !== 'off') play('hover');
  };

  const down = (e: PointerEvent) => {
    if (e.button !== 0) return;
    const el = (e.target as Element).closest(INTERACTIVE);
    if (!el) return;
    const cue = el.getAttribute('data-sound');
    if (cue === 'off' || cue === 'silent-press') return;
    // Unlocks audio on the very first press, then plays.
    audio();
    requestAnimationFrame(() => play(pressCue(cue)));
  };

  // Enter or Space on a focused control clicks too, so keyboard visitors
  // hear the same thing.
  const key = (e: KeyboardEvent) => {
    if (e.repeat || (e.key !== 'Enter' && e.key !== ' ')) return;
    const el = (e.target as Element).closest(INTERACTIVE);
    if (!el) return;
    const cue = el.getAttribute('data-sound');
    if (cue === 'off' || cue === 'silent-press') return;
    play(pressCue(cue));
  };

  document.addEventListener('pointerover', over);
  document.addEventListener('pointerdown', down);
  document.addEventListener('keydown', key);
  return () => {
    document.removeEventListener('pointerover', over);
    document.removeEventListener('pointerdown', down);
    document.removeEventListener('keydown', key);
  };
}
