import { motion } from 'framer-motion';

/* The tools behind the work — macOS app icons at 256px, so they stay crisp at
   any render size and all share one shape. Being real app tiles, they need no
   per-icon sizing: each fills its square the same way. */
const STACK = [
  { name: 'Figma', icon: '/toolIcons/figma.png' },
  { name: 'Cursor', icon: '/toolIcons/cursor.png' },
  { name: 'Claude', icon: '/toolIcons/claude.png' },
  { name: 'ChatGPT', icon: '/toolIcons/chatgpt.png' },
  { name: 'Notion', icon: '/toolIcons/notion.png' },
  { name: 'Dia', icon: '/toolIcons/dia.png' },
  { name: 'Spotify', icon: '/toolIcons/spotify.png' },
];

/* Five prints laid out in a row, each tilted a degree or two so the set reads
   as photos dropped on a table rather than a grid.

   Every frame takes the shape of the photo it holds — `aspect` matches the
   source file's own ratio, so nothing is cropped and no print carries empty
   paper — and `basis` widens the landscape shots against the portrait ones,
   the way a stack of prints is never all one size. Basis totals over 100%; the
   row shrinks them to fit while keeping those proportions. */
const POLAROIDS = [
  { url: '/firstMarathon.JPG', caption: 'Ran 2:50 on my first marathon!', tilt: -8, aspect: '2 / 3', basis: 16 },
  { url: '/flying.JPG', caption: 'Chinese fan dancing with UNC Flying Silk', tilt: 5, aspect: '3 / 2', basis: 23 },
  { url: '/oscarCUSA.jpg', caption: 'The amazing CUSA exec!', tilt: -4, aspect: '3 / 2', basis: 23 },
  { url: '/oscarFam.jpg', caption: 'My family back in Hong Kong 🇭🇰', tilt: 7, aspect: '4 / 3', basis: 20 },
  { url: '/breadDough.jpg', caption: 'Photography and food 🤝🏻', tilt: -6, aspect: '2 / 3', basis: 16 },
  { url: '/restaurantKitchen.jpg', caption: 'Restaurant kid at heart', tilt: 4.5, aspect: '3 / 2', basis: 23 },
];

/* Same label as the homepage's "my work", flush left with the rows below it.
   Instrument Sans and its tracking are tuned for a word or two. */
const SECTION_LABEL =
  'mb-4 font-label text-[15px] font-medium tracking-[0.7px] text-neutral-900/60 dark:text-neutral-100/60';

/* A label long enough to read as a sentence takes the page's own typeface
   instead — Inter at body size, with the tracking dropped. */
const SECTION_LABEL_LONG =
  'mb-4 text-[15px] font-medium text-neutral-900/60 dark:text-neutral-100/60';

/* A logo gutter, then name and date sharing the first line with the degree or
   role beneath them. Rows without a logo leave the gutter empty so every row
   in both lists keeps the same text alignment. */
const ROW = 'grid grid-cols-[48px,minmax(0,1fr),auto] gap-x-4 gap-y-0.5 py-2.5 items-start';
/* Tall enough to stand against both lines of the row, not just the name. */
const ROW_LOGO = 'row-span-2 h-12 w-12 object-contain';
const ROW_DETAIL_START = 'col-start-2';
const ROW_NAME = 'text-[16px] leading-6 text-neutral-900/85 dark:text-neutral-100/85';
const ROW_WHEN =
  'text-[16px] leading-6 tabular-nums whitespace-nowrap text-neutral-900/40 dark:text-neutral-100/40';
const ROW_DETAIL = `${ROW_DETAIL_START} col-span-2 text-[16px] leading-6 text-pretty text-neutral-900/55 dark:text-neutral-100/55`;

export function About() {
  /* Education and experience share one row shape: name and date on the first
     line, the degree or role on the second. */
  const education = [
    {
      name: 'UNC Chapel Hill',
      detail: 'B.A. Computer Science · B.S. Information Science',
      when: 'May 2027',
      logo: '/uncLogo.png',
    },
  ];

  const experiences = [
    { company: '84.51°', role: 'Product Design Intern', when: 'Summer 2026', logo: '/8451Logo.png' },
    {
      company: 'Quantifyd',
      role: 'Product Design Intern',
      when: 'Summer 2025',
      logo: '/quantifydLogo.png',
    },
    {
      company: 'Centible',
      role: 'Product Designer',
      when: 'Fall 2025',
      logo: '/centibleLogo.png',
    },
    {
      company: 'UNC Computer Science',
      role: 'Web Design & Development UTA',
      when: 'Fall 2025',
      logo: '/uncCompSciLogo.png',
    },
    { company: '1893 Brand Studio', role: 'Product Designer', when: 'Spring 2025', logo: '/1893Logo.png' },
    { company: 'CS + Social Good', role: 'UI/UX Production Team', when: 'Fall 2024', logo: '/cssgLogo.png' },
  ];

  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-12 pt-32 sm:pt-36 md:pt-44 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero — held to the same measure as the education and experience
            lists below, so the whole page shares one column. */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-20 grid md:grid-cols-[1fr,300px] gap-8 md:gap-16 items-start">
          {/* Left side - Text content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl mb-10 md:mb-12 tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50 font-normal"
            >
              Hey there, I'm Oscar 👋🏻
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55"
            >
              I didn’t know I wanted to be a designer. I came into college expecting to pursue
              software engineering or data science, but a web design class introduced me to the
              space where technical thinking meets creativity. Design became the way I could
              understand how technology works while shaping how people experience and enjoy it.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mt-4"
            >
              I've been lucky enough to work on all sorts of problems at the intersection of design
              and technology, building intuitive experiences across web and mobile alongside some
              incredibly talented people. A hundred prototypes later, and I'd do it all over again.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mt-4"
            >
              Here's to the next hundred.
            </motion.p>
          </div>

          {/* Right side - Polaroid-style profile photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="justify-self-center md:justify-self-end w-full max-w-[300px]"
          >
            <img
              src="/oscarProfile.svg"
              alt="Oscar Cheung"
              className="w-full h-auto"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Education then experience — a quiet label over a list of two-line
            rows: name and date on the first, degree or role on the second.
            The label repeats the homepage's "my work" treatment so the two
            pages read as one site. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <h2 className={SECTION_LABEL}>Education</h2>
          <ul className="mb-10 md:mb-12">
            {education.map((ed) => (
              <li key={ed.name} className={ROW}>
                {ed.logo ? (
                  <img src={ed.logo} alt="" aria-hidden="true" className={ROW_LOGO} />
                ) : (
                  <span aria-hidden="true" />
                )}
                <span className={ROW_NAME}>{ed.name}</span>
                <span className={ROW_WHEN}>{ed.when}</span>
                <span className={ROW_DETAIL}>{ed.detail}</span>
              </li>
            ))}
          </ul>

          <h2 className={SECTION_LABEL}>Experience</h2>
          <ul className="mb-10 md:mb-12">
            {experiences.map((exp) => (
              <li key={exp.company} className={ROW}>
                {exp.logo ? (
                  /* Company marks are square artwork, so they take the tile's
                     corner radius; the education crest is a free shape. */
                  <img
                    src={exp.logo}
                    alt=""
                    aria-hidden="true"
                    className={`${ROW_LOGO} rounded-[10px]`}
                  />
                ) : (
                  <span aria-hidden="true" />
                )}
                <span className={ROW_NAME}>{exp.company}</span>
                <span className={ROW_WHEN}>{exp.when}</span>
                <span className={ROW_DETAIL}>{exp.role}</span>
              </li>
            ))}
          </ul>

          {/* Stack — a single row of app icons, no captions. The name rides on
              the alt and the tooltip rather than taking up space. */}
          <h2 className={SECTION_LABEL_LONG}>The Tools I Use to Bring Ideas to Life</h2>
          {/* Evenly spaced across the container: the first icon starts on the
              same edge as the rows above, the last ends on the right edge, and
              each cell shrinks below the cap on narrow screens. */}
          <ul className="flex items-center justify-between gap-4">
            {STACK.map((tool) => (
              <li key={tool.name} className="flex min-w-0 flex-1 max-w-[64px] justify-center">
                {/* Cyrus's hover: the icon grows ~15% in place, no lift. The
                    name settles into the gap beneath it at the same time. */}
                <div className="group relative flex w-full justify-center">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-md bg-neutral-900/[0.05] dark:bg-neutral-100/[0.09] px-2 py-1 font-label text-[12px] text-neutral-900/70 dark:text-neutral-100/70 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {tool.name}
                  </span>
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.15]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Lead-in to the photographs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h2 className={SECTION_LABEL}>Life Outside the Frame</h2>
          <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
            A lot of who I am comes from the people, places, and experiences outside of work. When
            I’m not designing, you’ll probably find me running (all the time), experimenting with
            new recipes in the kitchen, or capturing the little moments in life :)
          </p>
        </motion.div>

        {/* Polaroids — a row of prints laid down at slight angles, each
            straightening and lifting under the cursor. On narrow screens the
            row becomes a snap carousel rather than shrinking to nothing. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          /* Centred on one line rather than sitting on a shared baseline, and
             pulled together with a negative gap so the prints overlap the way
             a handful dropped on a table would. */
          /* A touch wider than the text column, so the prints read larger
             without the captions running into their neighbours. */
          className="mt-8 max-w-5xl mx-auto flex items-center gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:snap-none sm:pb-0 sm:px-5 sm:gap-0 sm:-space-x-2"
        >
          {POLAROIDS.map((photo, i) => (
            <figure
              key={photo.url}
              /* Lifting a print on hover also raises it above its neighbours. */
              className="group relative w-[62vw] max-w-[240px] shrink-0 snap-center transition-transform duration-500 ease-out [transform:rotate(var(--tilt))] hover:z-20 hover:[transform:rotate(0deg)_translateY(-6px)] sm:w-auto sm:max-w-none sm:shrink sm:basis-[var(--basis)] sm:snap-align-none"
              style={
                {
                  '--tilt': `${photo.tilt}deg`,
                  '--basis': `${photo.basis}%`,
                  /* Descending, so each print overlaps the one to its right
                     rather than covering its neighbour's caption. */
                  zIndex: POLAROIDS.length - i,
                } as React.CSSProperties
              }
            >
              <div className="rounded-[2px] bg-white p-[6px] pb-0 shadow-[0_1px_2px_rgba(23,23,23,0.06),0_4px_14px_rgba(23,23,23,0.09)]">
                {/* The window takes the photo's own shape, so a cover fill
                    crops nothing worth keeping. */}
                <div
                  className="relative overflow-hidden bg-neutral-100"
                  style={{ aspectRatio: photo.aspect }}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    /* A touch of grey at rest, clearing on hover. */
                    className="absolute inset-0 h-full w-full object-cover grayscale-[0.1] transition-[filter] duration-700 ease-out group-hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Caveat runs small for its point size, so it sits larger
                    than the label faces elsewhere to read at the same scale. */}
                {/* Held in from the edges so a neighbouring print overlapping
                    this one can never reach the writing. */}
                <figcaption className="px-5 pt-1.5 pb-2 text-center font-hand text-[15px] font-medium leading-tight text-neutral-900/70">
                  {photo.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
