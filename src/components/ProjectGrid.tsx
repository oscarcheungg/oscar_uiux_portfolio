import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'Filtering Transactions for Centible',
    category: 'Product Design',
    year: '2025',
    description: 'A financial management tool designed specifically for college students navigating independent living. Developed through App Team Carolina to address the unique challenges of unpredictable, fluctuating student incomes through intuitive design and thoughtful user experience.',
    image: '/centibleCover.png',
    link: '/centible',
  },
  {
    id: 2,
    title: 'Spotify Playlists Enhanced',
    category: 'Product Design',
    year: '2025',
    description: 'A playlist management enhancement that simplifies music discovery and organization through intuitive editing tools. Designed to reduce cognitive load while maintaining Spotify\'s signature aesthetic and user experience.',
    image: '/spotifyLogo.jpg',
    link: '/spotify',
  },
  {
    id: 3,
    title: 'Bite Mobile App',
    category: 'Product Design',
    year: '2025',
    description: 'A social dining experience that connects friends through food discovery and restaurant recommendations. Designed to make dining decisions collaborative and engaging while maintaining intuitive navigation.',
    image: '/biteAssets/newBiteCover.png',
    link: '/bite',
  },
  {
    id: 4,
    title: 'Golden Dragon Website',
    category: 'Product Design',
    year: '2025',
    description: 'A restaurant website redesign that celebrates family heritage through modern web design. Created to showcase authentic Chinese cuisine while providing an intuitive ordering and reservation experience.',
    image: '/gdLogo.png',
    link: '/goldendragon',
  },
];

export function ProjectGrid() {
  return (
    <section id="work" className="py-12 md:py-20 px-4 sm:px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-neutral-700 dark:text-neutral-300 max-w-3xl">
            my work
          </h2>
        </div>

        {/* Projects grid */}
        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

