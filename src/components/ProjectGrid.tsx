import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { PasswordModal } from './PasswordModal';
import { COVERS, ProjectCover, ProjectCoverArt, ProjectTags } from './ProjectCover';

interface BentoProject {
  /* Brief noun phrase naming the work — kept short, like Claire's. */
  title: string;
  /* Company or product — the caption's heading. */
  client: string;
  /* Discipline and year — the caption's chip, rendered as written. */
  meta: string;
  /* One line on what the work is, condensed from the case study's subtitle. */
  blurb: string;
  image?: string;
  video?: string;
  videoSpeed?: number;
  alt?: string;
  link?: string;
  locked?: boolean;
  fit?: 'cover' | 'contain';
  bg?: string;
  corner?: boolean;
  /* Prototype screens on the project's painted ground — shared with the case
     study page, so the two can't drift apart. */
  cover?: ProjectCoverArt;
  zoom?: number;
  position?: string;
}

/* Uniform card size, aligned rows — the covers supply the color on the neutral ground.
   Projects without an image/link render as "coming soon" placeholders. */
const PROJECTS: BentoProject[] = [
  {
    title: 'AI Insights & Recommendations',
    client: '84.51°',
    meta: 'Internship 2026',
    blurb: 'Actionable AI recommendations for the Kroger Ad Platform.',
    cover: COVERS['8451'],
    alt: '84.51° AI recommendations interface',
    link: '/8451',
  },
  {
    title: 'Group Planning App',
    client: 'Wigo',
    meta: 'Mobile 2026',
    blurb: 'Turning scattered group chats into plans everyone actually agrees on.',
    cover: COVERS['wigo'],
    alt: 'Wigo home screen',
    link: '/wigo',
  },
  {
    title: 'Student Budgeting App',
    client: 'Centible',
    meta: 'iOS 2025',
    blurb: 'Budgeting built for college students living on unpredictable income.',
    cover: COVERS['centible'],
    alt: 'Centible home screen',
    link: '/centible',
  },
  {
    title: 'Playlist Management Concept',
    client: 'Spotify',
    meta: 'Concept 2025',
    blurb: 'A quick-add gesture that cuts saving a song from five taps to one.',
    cover: COVERS['spotify'],
    alt: 'Spotify playlist management concept screens',
    link: '/spotify',
  },
  {
    title: 'Group Dining App',
    client: 'Bite',
    meta: 'Mobile 2025',
    blurb: 'Friends swap bite-sized dish recs to decide what to eat, not just where.',
    cover: COVERS['bite'],
    alt: 'Bite home screen',
    link: '/bite',
  },
  {
    title: 'Restaurant Website',
    client: 'Golden Dragon',
    meta: 'Website 2025',
    blurb: "A redesign for my parents' restaurant, built around family heritage.",
    cover: COVERS['goldendragon'],
    alt: 'Golden Dragon website',
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

  /* Bao's caption shape: the product name on the left of a row, the discipline
     and year as two quiet chips on its right, and a single line on the work
     beneath them both. The chips never wrap — a long name yields space. */
  const caption = (
    <div className="mt-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[17px] font-medium leading-[1.4] text-neutral-900/90 dark:text-neutral-100/90 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
          {project.client}
        </h3>
        <ProjectTags meta={project.meta} className="pt-[3px]" />
      </div>
      <p className="mt-1.5 text-[14px] leading-[1.5] text-neutral-900/50 dark:text-neutral-100/50">
        {project.blurb}
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
          <div className="relative aspect-[5/4] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
            {project.video ? (
              <video
                ref={applySpeed}
                src={project.video}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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
            <div className="relative aspect-[5/4] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
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
              className="relative aspect-[5/4] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
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
            <div className="relative aspect-[5/4] rounded-lg overflow-hidden border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-center">
              <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                Case Study Coming Soon
              </p>
            </div>
          )}
          {caption}
        </div>
      ) : (
        <Link to={project.link!} className="group block">
          <div
            className={`relative aspect-[5/4] overflow-hidden ${
              project.cover
                ? 'rounded-[10px]'
                : 'rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
            }`}
            style={project.bg ? { backgroundColor: project.bg } : undefined}
          >
            {project.cover ? (
              <ProjectCover cover={project.cover} alt={project.alt} />
            ) : project.video ? (
              <video
                src={project.video}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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
                className={`w-full h-full ${project.fit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                style={{
                  objectPosition: project.position,
                  transform: project.zoom ? `scale(${project.zoom})` : undefined,
                }}
                loading="lazy"
                decoding="async"
              />
            )}
            {/* Arrow chip — slides in on hover, above the cover artwork */}
            <span className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
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
      {/* Narrower than the rest of the page so the covers stay modest. */}
      <div className="max-w-5xl mx-auto">
        {/* Section header — a quiet centred label rather than a large heading */}
        <h2 className="mb-8 md:mb-10 text-center font-label text-[15px] font-medium tracking-[0.7px] text-neutral-900/60 dark:text-neutral-100/60">
          My Work
        </h2>

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
