import { COVERS, ProjectCoverArt } from '../components/ProjectCover';

/* Everything the homepage says about me lives here, so the copy can be edited
   without touching a component. */

export const PROFILE = {
  name: 'Oscar Cheung',
  role: 'Product Designer & Engineer',
  email: 'oscarcheung2023@gmail.com',
  linkedin: 'https://linkedin.com/in/oscarcheungg',
  github: 'https://github.com/oscarcheungg',
  instagram: 'https://instagram.com/oscar.cheungg',
  x: 'https://x.com/oscarcheungg',
  resume: '/Oscar_Cheung_Resume.pdf',
  location: 'Chapel Hill, NC',
  timeZone: 'America/New_York',
  /* For the live weather beside the location. */
  coords: { lat: 35.9132, lon: -79.0558 },
};

export interface WorkItem {
  slug: string;
  link: string;
  title: string;
  /* A few words for the one-line "Selected work" list. */
  blurb: string;
  kind: string;
  year: string;
  cover: ProjectCoverArt;
}

export const WORK: WorkItem[] = [
  { slug: '8451', link: '/8451', title: 'AI recommendations for the Kroger ad platform', blurb: 'AI ad recommendations', kind: 'Internship', year: '2026', cover: COVERS['8451'] },
  { slug: 'wigo', link: '/wigo', title: 'Turning group chats into plans everyone agrees on', blurb: 'Group plans, made easy', kind: 'Mobile', year: '2026', cover: COVERS['wigo'] },
  { slug: 'centible', link: '/centible', title: 'Budgeting for students on unpredictable income', blurb: 'Student budgeting', kind: 'iOS', year: '2025', cover: COVERS['centible'] },
  { slug: 'spotify', link: '/spotify', title: 'Saving a song to a playlist in one tap', blurb: 'One-tap playlist saving', kind: 'Concept', year: '2025', cover: COVERS['spotify'] },
  { slug: 'bite', link: '/bite', title: 'Deciding what to eat, not just where', blurb: 'Deciding what to eat', kind: 'Mobile', year: '2025', cover: COVERS['bite'] },
  { slug: 'goldendragon', link: '/goldendragon', title: "A new website for my parents' restaurant", blurb: 'Family restaurant website', kind: 'Website', year: '2025', cover: COVERS['goldendragon'] },
];
