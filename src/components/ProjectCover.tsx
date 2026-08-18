/**
 * The cover artwork a project is known by: its prototype screens floating on
 * the project's own painted ground.
 *
 * One definition serves both places it appears — the homepage grid, where the
 * ground fades in under the cursor, and the top of the case study, where it is
 * simply the cover.
 */

export interface ProjectCoverArt {
  /* Company or product — the caption's heading on a card. */
  client: string;
  /* Discipline and year, shown as two chips wherever the project appears. */
  meta: string;
  /* A single screen, centred. */
  screen?: string;
  /* Two screens staggered diagonally, each running off an opposite edge. */
  screenPair?: { top: string; bottom: string };
  /* Landscape artwork (a website rather than a phone) — sized by width. */
  wide?: boolean;
  /* Flat tint the tile shifts to on hover, behind the painted ground. */
  tint: string;
  /* Any CSS background — gradient or image — the screens sit on. */
  art: string;
}

export const COVERS: Record<string, ProjectCoverArt> = {
  '8451': {
    client: '84.51°',
    meta: 'Internship 2026',
    screen: '/8451NewCover.svg',
    wide: true,
    tint: '#EDE7F9',
    art: "url('/8451HoverBg.jpg') center/cover",
  },
  wigo: {
    client: 'Wigo',
    meta: 'Mobile 2026',
    screen: '/wigoNewCover.svg',
    tint: '#EDF1F6',
    /* Soft pastel wash, built from layered radial gradients rather than a
       bitmap so it stays sharp at any size and weighs nothing. */
    art:
      'radial-gradient(58% 52% at 10% 32%, #DCE7F0 0%, transparent 62%),' +
      'radial-gradient(55% 48% at 90% 10%, #F8DDE0 0%, transparent 60%),' +
      'radial-gradient(60% 55% at 6% 80%, #F7D9D6 0%, transparent 62%),' +
      'radial-gradient(66% 60% at 94% 88%, #FBE8D2 0%, transparent 64%),' +
      'radial-gradient(48% 44% at 22% 6%, #E4E7DC 0%, transparent 58%),' +
      '#F7F5F6',
  },
  centible: {
    client: 'Centible',
    meta: 'iOS 2025',
    screen: '/centibleNewCover.svg',
    tint: '#E6DCF4',
    art: "url('/centibleHoverBg.jpg') center/cover",
  },
  spotify: {
    client: 'Spotify',
    meta: 'Concept 2025',
    screenPair: { top: '/spotifyBottomHalf.svg', bottom: '/spotifyTopHalf.svg' },
    tint: '#C4F5D2',
    art: "url('/spotifyHoverBg.jpg') center/cover",
  },
  bite: {
    client: 'Bite',
    meta: 'Mobile 2025',
    screen: '/biteNewCover.svg',
    tint: '#EBEFF1',
    art: "url('/biteHoverBg.jpg') center/cover",
  },
  goldendragon: {
    client: 'Golden Dragon',
    meta: 'Website 2025',
    screen: '/gdNewCover.svg',
    wide: true,
    tint: '#F1EDEC',
    art: "url('/gdHoverBg.jpg') center/cover",
  },
};

/* The discipline and year, split off the meta string on its last space so a
   two-word discipline still chips correctly. Rendered identically on the
   homepage card and at the top of the case study. */
export function ProjectTags({ meta, className = '' }: { meta: string; className?: string }) {
  const words = meta.split(' ');
  const tags = [words.slice(0, -1).join(' '), words[words.length - 1]];

  return (
    <div className={`flex shrink-0 gap-1 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="whitespace-nowrap rounded bg-neutral-900/[0.05] px-1.5 py-0.5 font-label text-[11px] text-neutral-900/45"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/* drop-shadow rather than box-shadow, so it follows the screen's own rounded
   corners instead of the image's bounding box. */
const SCREEN_SHADOW =
  'drop-shadow(0 1px 1px rgba(23,23,23,0.12)) drop-shadow(0 4px 10px rgba(23,23,23,0.07))';

interface ProjectCoverProps {
  cover: ProjectCoverArt;
  /* Alt text for the screens — omitted inside a card that already has one. */
  alt?: string;
  /* On a card the ground waits for the cursor; on a case study it is simply
     there. */
  showArt?: boolean;
  /* Whether the screens lift with the card's hover. */
  lift?: boolean;
  className?: string;
}

export function ProjectCover({
  cover,
  alt = '',
  showArt = false,
  lift = true,
  className = '',
}: ProjectCoverProps) {
  const art = cover.art && (
    <span
      aria-hidden="true"
      /* Long, gently-eased fade so the artwork drifts up rather than
         switching on. */
      className={`absolute inset-0 transition-opacity duration-[750ms] ease-[cubic-bezier(0.33,0,0.2,1)] ${
        showArt ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}
      style={{ background: cover.art }}
    />
  );

  const liftClass = lift ? 'transition-transform duration-500 ease-out group-hover:-translate-y-1.5' : '';

  if (cover.screenPair) {
    /* Upper screen hangs off the top-right, lower off the bottom-left, so each
       is cropped by an opposite edge and they overlap through the middle. */
    return (
      <div
        className={`screen-tile absolute inset-0 overflow-hidden ${className}`}
        style={{ '--screen-hover': cover.tint } as React.CSSProperties}
      >
        {art}
        <img
          src={cover.screenPair.top}
          alt={alt}
          style={{ filter: SCREEN_SHADOW }}
          className={`absolute right-[8%] bottom-[52%] w-[46%] rounded-[6%] z-10 ${liftClass}`}
          loading="lazy"
          decoding="async"
        />
        <img
          src={cover.screenPair.bottom}
          alt=""
          aria-hidden="true"
          style={{ filter: SCREEN_SHADOW }}
          className={`absolute left-[7%] top-[50%] w-[46%] rounded-[6%] z-10 ${liftClass}`}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  /* Flex centring keeps `transform` free for the hover lift. */
  return (
    <div
      className={`screen-tile absolute inset-0 flex items-center justify-center ${className}`}
      style={{ '--screen-hover': cover.tint } as React.CSSProperties}
    >
      {art}
      <img
        src={cover.screen}
        alt={alt}
        /* relative keeps the screen above the painted ground */
        className={`relative ${liftClass} ${cover.wide ? 'w-[86%] h-auto' : 'h-[84%] w-auto'}`}
        style={{ filter: SCREEN_SHADOW }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
