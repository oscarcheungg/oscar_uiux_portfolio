import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLink,
  CaseStudyCard,
  CaseStudyLayout,
  CaseStudyTLDR,
  CaseStudyCallout,
  CaseStudyPoints,
  CaseStudyPair,
  CaseStudyDuo,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

/* Golden Dragon, told for a skim: a TL;DR up front, then six short sections
   that each lead with a visual: the old site, the audit, the survey, the
   direction, the redesign, and what happened after launch. */

const META = [
  { label: 'Role', value: 'Product Designer, Web Developer' },
  { label: 'Team', value: '2 web developers\n1 designer' },
  { label: 'Timeline', value: '1 month' },
  { label: 'Tools', value: 'Figma, Notion, HTML/CSS/JS' },
  { label: 'Responsibilities', value: 'Customer Research, IA, Visual Design, Front-end Build' },
];

const IMPACT = [
  {
    title: 'Surveyed 50+ customers',
    body: 'I checked what I assumed as family against how customers actually read menus, order and pick where to eat.',
  },
  {
    title: 'Made ordering one tap away',
    body: '82% prefer ordering on their phone, so Order Now tops every page and DoorDash links sit beside the dishes.',
  },
  {
    title: 'Removed the contact form',
    body: 'Questions waited 1 to 2 days in an inbox. The phone number and location now sit throughout the site.',
  },
  {
    title: '40% more traffic, 20% more orders',
    body: 'Plus 53% more interactions per session, against the same period before the redesign.',
  },
];

/* Each audit finding is written as a consequence for the customer rather than
   a critique of the visual design. */
const INITIAL_PROBLEMS = [
  {
    src: '/goldendragonAssets/gdOldHome.svg',
    alt: 'Original Golden Dragon Homepage',
    tag: 'Key Navigation Was Hard to Distinguish',
    caption:
      'Low contrast and competing button styles made primary actions hard to tell apart, especially for the older regulars who make up a large share of our customers.',
  },
  {
    src: '/goldendragonAssets/gdOldMenu.svg',
    alt: 'Original Golden Dragon Menu Layout',
    tag: 'Scanning the Menu Took Real Effort',
    caption:
      'Inconsistent imagery and weak category hierarchy made it harder to scan and compare dishes, the one thing most customers came to the site to do.',
  },
  {
    src: '/goldendragonAssets/gdOldContact.svg',
    alt: 'Original Golden Dragon Contact Page',
    tag: 'Contact Introduced a 1 to 2 Day Delay',
    caption:
      'Time-sensitive questions about hours, catering and large orders went to an inbox with a one-to-two day reply time, when a phone call would have answered them in a minute.',
  },
];

/* Findings framed around what they meant for the redesign, not just the stat. */
const IDENTIFIED_PROBLEMS = [
  {
    title: 'Digital Menus Are Expected, but Often Frustrating',
    stats: '91% had used online or digital menus at restaurants.',
    insight:
      'Outdated PDFs and slow, confusing layouts frustrated them. The menu had to be the fastest thing on the site to scan.',
  },
  {
    title: 'Ordering Happens on a Phone',
    stats: '82% prefer ordering through their phone.',
    insight:
      'Ordering could not stay a secondary action buried in the navigation.',
  },
  {
    title: 'Digital Presence Shapes First Impressions',
    stats: 'More than two-thirds said a website influenced how likely they were to visit.',
    insight:
      'The redesign was as much about credibility as it was about usability.',
  },
];

const REFLECTIONS = [
  {
    title: 'Being close made it easy to assume',
    body: 'Growing up in the restaurant, I thought I knew what customers needed. The research challenged that.',
  },
  {
    title: 'Separate what matters to me from what customers need',
    body: 'The biggest lesson wasn’t polish. It was telling what felt important to me as family apart from what customers were trying to get done.',
  },
  {
    title: 'Sometimes the fix is removing something',
    body: 'The contact form didn’t need a redesign. Surfacing the phone number answered in a minute what the form took days to.',
  },
];

export function GoldenDragon() {
  return (
    <div className="cs-page" data-accent="goldendragon">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Golden Dragon - The Heart of Our Family, Redesigned"
          subtitle="I grew up in my parents' restaurant. Years later, I brought my design and development skills back home to create a digital experience that better reflects our family's story and the community we've served for 20 years."
          meta={META}
          cover={COVERS['goldendragon']}
          coverAlt="Golden Dragon Website"
        />

        <CaseStudyTLDR
          summary={[
            'For most of its 20 years, Golden Dragon’s only website was an old Facebook page. The first real site I helped build worked, but customers struggled to spot key actions, scan the menu and get quick answers.',
            'I surveyed 50+ customers and learned ordering happens on a phone and the menu has to be fast to scan. I redesigned the site around three actions (browse the menu, order food, find the restaurant) while keeping our family’s personality.',
          ]}
          impact={IMPACT}
        />

        {/* 01 · Context */}
        <CaseStudySection num="01" label="The Facebook page" title="The Site I Built, One Year Later">
          <p className="mb-4">
            For most of Golden Dragon’s 20 years, our only "website" was an old Facebook page where
            customers could barely find the menu.
          </p>
          <CaseStudyFigure
            src="/goldendragonAssets/goldendragonFacebook.svg"
            alt="Golden Dragon Facebook Page"
            bordered={false}
            className="max-w-[720px]"
          />
          <p>
            I first helped build a real site with a three-person student team for a web design class
            at UNC. Having a website turned out not to be the same as having a good one, so a year
            later I independently led its redesign.
          </p>
        </CaseStudySection>

        {/* 02 · Audit */}
        <CaseStudySection num="02" label="Where v1 cracked" title="Where the Original Site Got in the Way">
          <p className="mb-2">
            As customers used the original site, I started noticing the cracks, and each one cost
            someone something.
          </p>
          <CaseStudyPair bare items={INITIAL_PROBLEMS} />
        </CaseStudySection>

        {/* 03 · Research + findings */}
        <CaseStudySection
          num="03"
          label="Asking 50+ customers"
          title="Three Findings That Shaped the Redesign"
        >
          <CaseStudyFigure
            src="/goldendragonAssets/memojiGroup.svg"
            alt="Golden Dragon survey respondents"
            bordered={false}
            className="max-w-[280px]"
          />
          <p className="mb-4">
            Being this close to the restaurant made it easy to assume I already knew what people
            needed. To check, I surveyed 50+ Golden Dragon customers on digital menus, how they
            prefer to order, and what brings them back.
          </p>
          <div className="grid md:grid-cols-3 gap-2">
            {IDENTIFIED_PROBLEMS.map((item) => (
              <CaseStudyCard key={item.title} className="h-full">
                <h4>{item.title}</h4>
                <p className="mt-2 font-medium text-[var(--csa)]">{item.stats}</p>
                <p className="mt-1">{item.insight}</p>
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        {/* 04 · Direction + exploration */}
        <CaseStudySection num="04" label="Fast, but ours" title="Utility × Personality">
          <CaseStudyCallout>
            How might we make Golden Dragon's digital experience as welcoming and easy to navigate
            as the restaurant itself?
          </CaseStudyCallout>
          <p className="mb-4">
            Customers wanted everyday tasks to be faster, but the site also had to carry a
            twenty-year-old family business. I settled on three actions to prioritise everywhere:
            browse the menu, order food, find the restaurant.
          </p>
          <CaseStudyDuo
            zoomable
            tag="Sketches & lo-fi wireframes"
            caption="Early concepts tested how ordering, menu discovery and restaurant information should compete for attention, cheap to change while the hierarchy was still open."
            items={[
              { src: '/goldendragonAssets/gdSketch.svg', alt: 'Golden Dragon Sketches' },
              { src: '/goldendragonAssets/gdWireframes.svg', alt: 'Golden Dragon Lo-Fi Wireframes' },
            ]}
          />
          <p className="mb-4">
            The visual system started from the red my family had used for years. Custom
            illustrations replace stock photography, and every text and button pairing was checked
            for contrast, since low contrast cost our older regulars the most.
          </p>
          <CaseStudyFigure
            src="/goldendragonAssets/gdStyleGuide.svg"
            alt="Golden Dragon Style Guide"
            bordered={false}
            className="max-w-[640px]"
            zoomable
          />
        </CaseStudySection>

        {/* 05 · The redesign */}
        <CaseStudySection num="05" label="One tap to order" title="The New Golden Dragon Website">
          <p className="mb-2">
            With 82% of surveyed customers preferring to order digitally, ordering became the site's primary
            action: an Order Now button at the top of every page, and DoorDash entry points beside
            the dishes.
          </p>
          <CaseStudyPair
            bare
            items={[
              {
                src: '/goldendragonAssets/gdMain.svg',
                alt: 'Creating a Clearer First Impression',
                tag: 'Creating a Clearer First Impression',
                caption:
                  'The homepage is rebuilt around browsing, ordering and finding us. Custom illustrations keep the personality a stock template would have flattened.',
              },
              {
                src: '/goldendragonAssets/gdAbout.svg',
                alt: 'Putting the Family Story Where People Look for It',
                tag: 'Putting the Family Story Where People Look for It',
                caption:
                  'A new About section pairs our twenty-year history with photos of the people behind it, so credibility is something a visitor can read.',
              },
            ]}
          />
          <div className="mt-16">
            <CaseStudyDuo
              tag="Making the Menu Fast to Scan"
              caption="A text-heavy list became a visual grid with consistent imagery, clear categories and visible pricing, so a dish can be found without reading the whole page."
              items={[
                { src: '/goldendragonAssets/gdMenuOne.svg', alt: 'Making the Menu Fast to Scan - Part 1' },
                { src: '/goldendragonAssets/gdMenuTwo.svg', alt: 'Making the Menu Fast to Scan - Part 2' },
              ]}
            />
          </div>
          <div className="mt-16">
            <CaseStudyPair
              bare
              items={[
                {
                  src: '/goldendragonAssets/gdReview.svg',
                  alt: "Removing an Interaction That Wasn't Serving Customers",
                  tag: "Removing an Interaction That Wasn't Serving Customers",
                  caption:
                    'Rather than redesign the contact form, I removed it and surfaced the phone number and location throughout the site. Customer reviews took its place.',
                },
              ]}
            />
          </div>
          <div className="mt-10">
            <CaseStudyLink href="https://goldendragonwilmingtonnc.com/">View Full Website</CaseStudyLink>
          </div>
        </CaseStudySection>

        {/* 06 · Impact + reflection */}
        <CaseStudySection num="06" label="Back home" title="What Happened After Launch">
          <p className="mb-4">
            The redesign shipped to real customers rather than staying a concept. Measured against
            the same period before the redesign:
          </p>
          {/* TODO: add the measurement window, baseline and source for each of
              these before this goes in front of a recruiter. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <CaseStudyCard>
              <p className="text-3xl md:text-4xl font-medium text-[var(--csa)] mb-2">40%</p>
              <p className="text-[14px] text-neutral-900/55">more website traffic</p>
            </CaseStudyCard>
            <CaseStudyCard>
              <p className="text-3xl md:text-4xl font-medium text-[var(--csa)] mb-2">53%</p>
              <p className="text-[14px] text-neutral-900/55">more interactions per session</p>
            </CaseStudyCard>
            <CaseStudyCard>
              <p className="text-3xl md:text-4xl font-medium text-[var(--csa)] mb-2">20%</p>
              <p className="text-[14px] text-neutral-900/55">more online orders</p>
            </CaseStudyCard>
          </div>
          <CaseStudyPoints items={REFLECTIONS} />
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
