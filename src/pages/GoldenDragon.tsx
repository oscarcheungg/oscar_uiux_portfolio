import { motion } from 'framer-motion';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLink,
  CaseStudyCard,
  CaseStudyLayout,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

const META = [
  { label: 'Role', value: 'Product Designer, Web Developer' },
  { label: 'Team', value: '2 web developers\n1 designer' },
  { label: 'Timeline', value: '1 month' },
  { label: 'Tools', value: 'Figma, Notion, HTML/CSS/JS' },
  { label: 'Responsibilities', value: 'Customer Research, IA, Visual Design, Front-end Build' },
];

/* Five phases named for what was actually being decided, rather than the
   textbook design-thinking stages. */
const PROCESS_STEPS = [
  { number: '1', title: 'Understand', desc: 'Audit\nCustomer survey' },
  { number: '2', title: 'Define', desc: 'Insights\nPriorities' },
  { number: '3', title: 'Explore', desc: 'Structure\nVisual direction' },
  { number: '4', title: 'Design', desc: 'Final experience\nKey decisions' },
  { number: '5', title: 'Measure', desc: 'Outcomes\nReflection' },
];

/* Each audit finding is written as a consequence for the customer rather than
   a critique of the visual design. */
const INITIAL_PROBLEMS = [
  {
    title: 'Key Navigation Was Hard to Distinguish',
    body:
      'Low contrast between white text and the background, plus competing button styles, made it harder to tell primary actions apart, a particular problem for the older regulars who make up a large share of our customers.',
    image: '/goldendragonAssets/gdOldHome.svg',
    alt: 'Original Golden Dragon Homepage',
  },
  {
    title: 'Scanning the Menu Took Real Effort',
    body:
      'Inconsistent imagery and weak category hierarchy forced customers to work harder to scan and compare dishes, which is the single thing most of them came to the site to do.',
    image: '/goldendragonAssets/gdOldMenu.svg',
    alt: 'Original Golden Dragon Menu Layout',
  },
  {
    title: 'Contact Introduced a 1–2 Day Delay',
    body:
      'The contact form routed time-sensitive questions, hours, catering, large orders, into an inbox with a one-to-two day response time, when a phone call would have answered them in a minute.',
    image: '/goldendragonAssets/gdOldContact.svg',
    alt: 'Original Golden Dragon Contact Page',
  },
];

/* Findings framed around what they meant for the redesign, not just the stat. */
const IDENTIFIED_PROBLEMS = [
  {
    title: 'Digital Menus Are Expected, but Often Frustrating',
    stats: '91% of respondents had used online or digital menus at restaurants.',
    insight:
      'Customers appreciated the convenience but were frustrated by outdated PDFs, confusing layouts, and slow-loading content. The menu had to be the fastest thing on the site to scan.',
  },
  {
    title: 'Ordering Happens on a Phone',
    stats: '82% prefer ordering through their phone rather than coming in to order.',
    insight:
      'Users value the speed and autonomy but are frustrated by inconsistent systems and payment flows. Ordering could not stay a secondary action buried in the navigation.',
  },
  {
    title: 'Digital Presence Shapes First Impressions',
    stats:
      "More than two-thirds of respondents said a restaurant's website influenced how likely they were to visit.",
    insight:
      'The site had to feel as established and trustworthy as the restaurant itself, which meant the redesign was as much about credibility as it was about usability.',
  },
];

/* Each final screen is described by the decision behind it, so the writing
   explains what the mockups can't show. */
const FINAL_DESIGN_SECTIONS = [
  {
    title: 'Creating a Clearer First Impression',
    description:
      "I rebuilt the homepage around the three things customers actually come for: browsing the menu, ordering, and finding the restaurant. A prominent Order Now button replaces the busy background as the page's focal point, while custom illustrations keep the personality of a family business that a stock template would have flattened.",
    image: '/goldendragonAssets/gdMain.svg',
  },
  {
    title: 'Putting the Family Story Where People Look for It',
    description:
      "Research showed the website shapes whether people trust a restaurant enough to visit. A new About section pairs our twenty-year history with photos of the people behind it, turning credibility into something a visitor can read rather than something we assert.",
    image: '/goldendragonAssets/gdAbout.svg',
  },
  {
    title: 'Making the Menu Fast to Scan',
    description:
      'Because customers valued speed and easy comparison above all else, I moved from the original text-heavy list to a visual grid with consistent imagery, clear categories, and visible pricing, so a dish can be found without reading the whole page.',
    image: '/goldendragonAssets/gdMenuOne.svg',
  },
  {
    title: "Removing an Interaction That Wasn't Serving Customers",
    description:
      "The original contact form created a one-to-two day delay for questions that were usually urgent. Rather than redesign it, I removed it entirely and surfaced the restaurant's phone number and location throughout the site. Customer reviews took its place, since first impressions mattered more than another form.",
    image: '/goldendragonAssets/gdReview.svg',
  },
];

export function GoldenDragon() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-28 md:pt-36 pb-16 md:pb-24" data-accent="red">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Golden Dragon - The Heart of Our Family, Redesigned"
          subtitle="I grew up in my parents' restaurant. Years later, I brought my design and development skills back home to create a digital experience that better reflects our family's story and the community we've served for 20 years."
          meta={META}
          cover={COVERS['goldendragon']}
          coverAlt="Golden Dragon Website"
        />

        <div className="mt-10 md:mt-14">
          {/* 01 · Context — ownership and why there was a second pass */}
          <CaseStudySection
            num="01"
            label="Context"
            sublabel="where this started"
            title="The Site I Built, One Year Later"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
              I grew up watching Golden Dragon become a beloved part of my community over its 20
              years. For most of that time, our only "website" was an old Facebook page where
              customers could barely find the menu.
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I first helped build the restaurant a real website with a three-person student team,
              as our final project for a web design class at UNC. Then real customers started using
              it, and having a website turned out not to be the same as having a good one. A year
              later, with more experience behind me, I independently led its redesign.
            </p>
            <CaseStudyFigure
              src="/goldendragonAssets/goldendragonFacebook.svg"
              alt="Golden Dragon Facebook Page"
            />
          </CaseStudySection>

          {/* 02 · Process */}
          <CaseStudySection
            num="02"
            label="Process"
            sublabel="how i worked"
            title="How I Approached It"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600/10 dark:bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="font-label text-[15px] font-medium text-red-600 dark:text-red-400">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-medium text-neutral-900 dark:text-neutral-50 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-neutral-900/55 dark:text-neutral-100/55 whitespace-pre-line">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 03 · Audit — design issue → user consequence */}
          <CaseStudySection
            num="03"
            label="Audit"
            sublabel="what was breaking down"
            title="Where the Original Site Got in the Way"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              As customers used the original site, I started noticing the cracks, and each one cost
              someone something: a dish they couldn't find, an action they couldn't spot, an answer
              they waited two days for.
            </p>
            <div className="space-y-8 md:space-y-12">
              {INITIAL_PROBLEMS.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[17px] font-medium text-neutral-900 dark:text-neutral-50 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
                    {item.body}
                  </p>
                  <CaseStudyFigure src={item.image} alt={item.alt} />
                </div>
              ))}
            </div>
          </CaseStudySection>

          {/* 04 · Research — survey, stated plainly */}
          <CaseStudySection
            num="04"
            label="Research"
            sublabel="asking customers"
            title="What I Wanted to Understand"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Being this close to the restaurant made it easy to assume I already knew what people
              needed. To check that, I surveyed 50+ Golden Dragon customers to understand how they
              decide where to eat, how they read restaurant menus, and where ordering online creates
              friction today.
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[17px] font-medium text-neutral-900 dark:text-neutral-50 mb-4">
                  What the survey covered
                </p>
                <ul className="space-y-3 text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                  <li>Experience with online and digital menus, and where they fall short</li>
                  <li>How people prefer to order, on a phone versus in person</li>
                  <li>What brings customers back to a restaurant</li>
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex justify-center items-center"
              >
                <img
                  src="/goldendragonAssets/memojiGroup.svg"
                  alt="Golden Dragon survey respondents"
                  className="w-full max-w-[280px] md:max-w-[340px] h-auto"
                />
              </motion.div>
            </div>
          </CaseStudySection>

          {/* 05 · Findings */}
          <CaseStudySection
            num="05"
            label="Findings"
            sublabel="what came back"
            title="Three Findings That Shaped the Redesign"
          >
            <div className="space-y-6">
              {IDENTIFIED_PROBLEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <CaseStudyCard>
                    <h3 className="text-[17px] font-medium text-neutral-900 dark:text-neutral-50 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[16px] leading-6 text-red-600 dark:text-red-400 font-medium mb-2">
                      {item.stats}
                    </p>
                    <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                      {item.insight}
                    </p>
                  </CaseStudyCard>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 06 · Direction — the reframed problem statement */}
          <CaseStudySection
            num="06"
            label="Direction"
            sublabel="what mattered"
            title="Utility × Personality"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
              The survey pointed at two things at once. Customers wanted the everyday tasks to be
              faster, find a dish, place an order, get the address. But the site also had to carry
              the weight of a twenty-year-old family business, because that was part of why people
              chose us over the chain down the road.
            </p>
            <p className="text-[17px] leading-7 text-neutral-900/85 dark:text-neutral-100/85 mb-6">
              How might we make Golden Dragon's digital experience as welcoming and easy to navigate
              as the restaurant itself?
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
              That framing kept both halves in play: the redesign had to make ordinary tasks quicker
              without turning Golden Dragon into another generic restaurant website.
            </p>
          </CaseStudySection>

          {/* 07 · Exploration — decisions, not artefacts */}
          <CaseStudySection
            num="07"
            label="Exploring"
            sublabel="working it out"
            title="Deciding What Competes for Attention"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Early concepts explored how ordering, menu discovery, and restaurant information
              should compete for attention on a single page. I settled on three actions the site
              would prioritise everywhere: browse the menu, order food, find the restaurant.
            </p>
            <CaseStudyFigure src="/goldendragonAssets/gdSketch.svg" alt="Golden Dragon Sketches" />

            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mt-10 mb-8">
              I used lo-fi wireframes to test menu structures and button placements against those
              three priorities before committing to any visual direction, cheap to change while the
              hierarchy was still an open question.
            </p>
            <CaseStudyFigure
              src="/goldendragonAssets/gdWireframes.svg"
              alt="Golden Dragon Lo-Fi Wireframes"
            />

            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mt-10 mb-8">
              The visual system started from the red my family had already used for years, extended
              with the neutrals and type scale the old site never had. Custom illustrations do the
              work that stock photography would have flattened, and every text and button pairing
              was checked for contrast, the audit had shown that low contrast was costing our older
              regulars the most.
            </p>
            <CaseStudyFigure
              src="/goldendragonAssets/gdStyleGuide.svg"
              alt="Golden Dragon Style Guide"
            />
          </CaseStudySection>

          {/* 08 · Solution */}
          <CaseStudySection
            num="08"
            label="The Redesign"
            sublabel="what i made"
            title="The New Golden Dragon Website"
          >
            {/* The strongest quantitative finding gets the most weight. */}
            <div className="mb-12 md:mb-16">
              <h3 className="text-[17px] font-medium text-neutral-900 dark:text-neutral-50 mb-3">
                Making Ordering One Tap Away
              </h3>
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                With 82% of surveyed customers preferring to order digitally, ordering became the
                site's primary action rather than a link in the navigation. An Order Now button sits
                at the top of every page, the menu carries direct DoorDash entry points beside the
                dishes themselves, and the mobile layout keeps that action within reach without
                scrolling back up.
              </p>
            </div>

            <div className="space-y-16 md:space-y-20 mb-12">
              {FINAL_DESIGN_SECTIONS.map((item, index) => (
                <div key={index}>
                  <h3 className="text-[17px] font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
                    {item.description}
                  </p>
                  {item.title === 'Making the Menu Fast to Scan' ? (
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                      <img
                        src="/goldendragonAssets/gdMenuOne.svg"
                        alt={`${item.title} - Part 1`}
                        className="w-full max-w-4xl md:max-w-[48%] h-auto rounded-lg shadow-lg"
                      />
                      <img
                        src="/goldendragonAssets/gdMenuTwo.svg"
                        alt={`${item.title} - Part 2`}
                        className="w-full max-w-4xl md:max-w-[48%] h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  ) : (
                    <CaseStudyFigure src={item.image} alt={item.title} />
                  )}
                </div>
              ))}
            </div>
            <CaseStudyLink href="https://goldendragonwilmingtonnc.com/">
              View Full Website
            </CaseStudyLink>
          </CaseStudySection>

          {/* 09 · Impact + reflection */}
          <CaseStudySection
            num="09"
            label="Impact"
            sublabel="after launch"
            title="What Happened After Launch"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              The redesign shipped to real customers rather than staying a concept. Following
              launch:
            </p>
            {/* TODO: add the measurement window, baseline and source for each of
                these before this goes in front of a recruiter. */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <CaseStudyCard>
                <p className="text-3xl md:text-4xl font-medium text-red-600 dark:text-red-400 mb-2">
                  40%
                </p>
                <p className="text-[14px] text-neutral-900/55 dark:text-neutral-100/55">
                  more website traffic
                </p>
              </CaseStudyCard>
              <CaseStudyCard>
                <p className="text-3xl md:text-4xl font-medium text-red-600 dark:text-red-400 mb-2">
                  53%
                </p>
                <p className="text-[14px] text-neutral-900/55 dark:text-neutral-100/55">
                  more interactions per session
                </p>
              </CaseStudyCard>
              <CaseStudyCard>
                <p className="text-3xl md:text-4xl font-medium text-red-600 dark:text-red-400 mb-2">
                  20%
                </p>
                <p className="text-[14px] text-neutral-900/55 dark:text-neutral-100/55">
                  more online orders
                </p>
              </CaseStudyCard>
            </div>
            <p className="text-[14px] leading-6 text-neutral-900/45 dark:text-neutral-100/45 mb-10">
              Measured against the same period before the redesign.
            </p>

            <h3 className="text-[17px] font-medium text-neutral-900 dark:text-neutral-50 mb-3">
              What I Took Away
            </h3>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
              Being so close to Golden Dragon made it easy to assume I understood what customers
              needed. The research challenged that. The biggest lesson wasn't how to make the site
              more polished, it was learning to separate what felt important to me as part of the
              family from what customers were actually trying to get done, and then finding the
              design that served both.
            </p>
          </CaseStudySection>
        </div>
      </CaseStudyLayout>
    </div>
  );
}
