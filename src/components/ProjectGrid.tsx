import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { PasswordModal } from './PasswordModal';

interface BentoProject {
  title: string;
  meta: string;
  image?: string;
  video?: string;
  videoSpeed?: number;
  alt?: string;
  link?: string;
  locked?: boolean;
  fit?: 'cover' | 'contain';
  bg?: string;
  corner?: boolean;
  zoom?: number;
  position?: string;
}

/* Uniform card size, aligned rows — the covers supply the color on the neutral ground.
   Projects without an image/link render as "coming soon" placeholders. */
const PROJECTS: BentoProject[] = [
  {
    title: 'Designing AI insights and recommendations',
    meta: '84.51° · Internship 2026',
    image: '/8451Cover.gif',
    alt: '84.51° internship cover',
    locked: true,
  },
  {
    title: 'Building Brightwill from zero to one',
    meta: 'Brightwill · Startup 2026',
    image: '/brightwillcover.png',
    alt: 'Brightwill startup cover',
    locked: true,
  },
  {
    title: 'Making friend group planning easier',
    meta: 'Wigo · Product 2026',
    image: '/wigoCover.png',
    alt: 'Wigo friend group planning app cover',
    link: '/wigo',
  },
  {
    title: 'Playlist management, enhanced',
    meta: 'Spotify · Concept 2025',
    image: '/spotifyAssets/spotifyLoop.gif',
    alt: 'Spotify playlists concept cover',
    link: '/spotify',
  },
  {
    title: 'Budgeting that fits student life',
    meta: 'Centible · iOS 2025',
    image: '/centibleCover.png',
    alt: 'Centible budgeting app cover',
    link: '/centible',
  },
  {
    title: 'Deciding where to eat, together',
    meta: 'Bite · Product 2025',
    image: '/biteAssets/newBiteCover.png',
    alt: 'Bite mobile app cover',
    link: '/bite',
  },
  {
    title: 'A new home for the family restaurant',
    meta: 'Golden Dragon · Web 2025',
    image: '/gdLogo.png',
    alt: 'Golden Dragon website cover',
    link: '/goldendragon',
  },
];

function BentoCard({
  project,
  index,
  onLockClick,
}: {
  project: BentoProject;
  index: number;
  onLockClick: (p: BentoProject) => void;
}) {
  const isPlaceholder = !project.link;

  // Slow down (or speed up) a cover video once its metadata is available.
  const applySpeed = (el: HTMLVideoElement | null) => {
    if (el && project.videoSpeed) el.playbackRate = project.videoSpeed;
  };

  const caption = (
    <div className="flex items-baseline justify-between gap-4 mt-4">
      <p className="text-lg text-neutral-900 dark:text-neutral-100 leading-snug">
        {project.title}
      </p>
      <p className="text-[0.65rem] uppercase tracking-widest text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
        {project.meta}
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      {project.locked ? (
        <button
          type="button"
          onClick={() => onLockClick(project)}
          className="group block w-full text-left cursor-pointer"
        >
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] dark:group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
            {project.video ? (
              <video
                ref={applySpeed}
                src={project.video}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={project.alt}
                onLoadedMetadata={(e) => applySpeed(e.currentTarget)}
              />
            ) : (
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />
            )}
            {/* Lock chip — slides in on hover */}
            <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 translate-y-2 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
              <Lock className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
            </span>
          </div>
          {caption}
        </button>
      ) : isPlaceholder ? (
        <div className="block cursor-default">
          {project.video ? (
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
              <video
                ref={applySpeed}
                src={project.video}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={project.alt}
                onLoadedMetadata={(e) => applySpeed(e.currentTarget)}
              />
            </div>
          ) : project.image ? (
            <div
              className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
              style={project.bg ? { backgroundColor: project.bg } : undefined}
            >
              {project.corner ? (
                <img
                  src={project.image}
                  alt={project.alt}
                  className="absolute bottom-0 right-0 w-[82%] h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.alt}
                  className={`w-full h-full ${project.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  style={{
                    objectPosition: project.position,
                    transform: project.zoom ? `scale(${project.zoom})` : undefined,
                  }}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ) : (
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-center">
              <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                case study coming soon
              </p>
            </div>
          )}
          {caption}
        </div>
      ) : (
        <Link to={project.link!} className="group block">
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] dark:group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
            {project.video ? (
              <video
                src={project.video}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={project.alt}
              />
            ) : (
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />
            )}
            {/* Arrow chip — slides in on hover */}
            <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
              <ArrowUpRight className="w-5 h-5 text-neutral-900 dark:text-neutral-100 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
          {caption}
        </Link>
      )}
    </motion.div>
  );
}

export function ProjectGrid() {
  const [locked, setLocked] = useState<BentoProject | null>(null);

  return (
    <section id="work" className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-xl md:text-2xl tracking-tight font-normal text-neutral-900 dark:text-neutral-50">
            my work
          </h2>
        </div>

        {/* Uniform grid — cards line up in rows */}
        <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-10 md:gap-y-14">
          {PROJECTS.map((p, i) => (
            <BentoCard key={p.meta} project={p} index={i} onLockClick={setLocked} />
          ))}
        </div>
      </div>

      {locked && <PasswordModal onClose={() => setLocked(null)} />}
    </section>
  );
}
