import { StickyShowcase } from '../components/StickyShowcase';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyCard,
  CaseStudyLayout,
  CaseStudyTLDR,
  CaseStudyCallout,
  CaseStudyPoints,
  CaseStudyPair,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

/* Bite, told for a skim: a TL;DR up front, then six short sections that each
   lead with a visual where one exists: the observation, the research, the
   insight, the design process, the product, and what comes next. */

const META = [
  { label: 'Role', value: 'Product Designer' },
  { label: 'Team', value: '3 engineers\n1 designer' },
  { label: 'Timeline', value: '1 month' },
  { label: 'Tools', value: 'Figma, Figjam, Notion' },
  { label: 'Responsibilities', value: 'Diner survey, Competitive analysis, Interaction design, Prototyping' },
];

const IMPACT = [
  {
    title: 'Studied the field and the diners',
    body: 'I analysed Sharp, InstaLaCarte, Clover and Restolabs, then surveyed 20+ frequent diners on how they choose and order.',
  },
  {
    title: 'Trust over star ratings',
    body: 'Anonymous reviews carried little weight, so the feed leads with friends and dishes instead of restaurant scores.',
  },
  {
    title: 'Social proof on the dish card',
    body: 'Friends’ photos and picks sit on the menu itself, at the moment of choosing, not one tab away in a review feed.',
  },
  {
    title: 'Cut to a focused V1',
    body: 'Messaging, challenges and multilingual menus waited, so V1 does one thing well: help someone choose a dish.',
  },
];

/* The four findings, ordered by how much each one moved the product rather
   than by the size of its number. */
const FINDINGS = [
  {
    weight: 'Expected',
    title: 'QR Menus Are Already Normal',
    stats: 'Diners already use QR codes to view menus and place orders.',
    insight:
      'Almost everyone already scans. The complaints were about clunky PDFs and slow, non-interactive menus, not about scanning.',
  },
  {
    weight: 'Functional need',
    title: 'Ordering Without Waiting Is Preferred',
    stats: 'Diners prefer ordering from their own phone over waiting for a server.',
    insight:
      'People enjoy the speed and autonomy but get frustrated by inconsistent systems and payment flows.',
  },
  {
    weight: 'The insight that changed direction',
    title: 'People Decide by Trust, Not by Ratings',
    stats: 'Diners rely on photos and personal recommendations, from friends or staff, to decide what to order.',
    insight:
      'Anonymous reviews carry little weight. This is the finding the rest of Bite is built on.',
  },
  {
    weight: 'Adoption lever',
    title: 'Loyalty & Rewards Are Strong Motivators',
    stats: 'Loyalty rewards and perks are what get diners to download a restaurant app at all.',
    insight:
      'Rewards, discounts, and personalized recommendations came up as the biggest drivers of adoption.',
  },
];

const PAIN_POINT_QUOTES = [
  "Some QR menus are just outdated PDFs, it doesn't feel modern.",
  "If it looks good on Instagram or someone I follow likes it, I'll check it out.",
  "If I earn points across multiple places, I'd definitely use it.",
  "I always ask friends or look for real photos–reviews from strangers don't mean much.",
];

/* What made V1, what waited, and what I deliberately left out. A broad idea
   is only a product once it has an edge. */
const SCOPE = [
  {
    tier: 'Core, V1',
    items: [
      'Scan a restaurant’s QR code',
      'Browse dishes',
      'See recommendations from people you trust',
      'Order',
      'Share a dish afterwards',
    ],
  },
  {
    tier: 'Secondary',
    items: ['Points for returning', 'Nearby restaurant discovery'],
  },
  {
    tier: 'Deliberately out',
    items: [
      'Direct messaging, since iMessage and Instagram already serve it',
      'Friend challenges and richer loyalty mechanics',
      'Multilingual menus, until there is research behind it',
    ],
  },
];

const LOOP = ['Discover', 'Order', 'Experience', 'Share'];

const FINAL_DESIGN_SECTIONS = [
  {
    title: 'Discover Through People You Trust',
    description:
      'Rather than ranking restaurants by aggregate score, the home feed leads with nearby activity from friends, so discovery starts from someone you know rather than an average of strangers.',
    video: '/biteAssets/biteMain.mp4',
  },
  {
    title: 'Recommendations at the Moment of Choice',
    description:
      "Instead of separating reviews from ordering, friends' photos and picks sit directly on the dish cards, so the social proof arrives while someone is deciding rather than after they have already ordered.",
    video: '/biteAssets/biteOrdering.mp4',
  },
  {
    title: 'A Reason to Come Back',
    description:
      'Ordering through a partner restaurant earns points that carry across Bite, giving diners a reason to return beyond the convenience of ordering on a phone. How that would be funded is an open question I get into below.',
    video: '/biteAssets/biteRewards.mp4',
  },
  {
    title: 'Closing the Loop',
    description:
      'Past orders and your own posts live together, because the fastest way to contribute a recommendation is from a dish you already ordered. Contribution is a byproduct of ordering rather than a separate chore.',
    video: '/biteAssets/biteProfile.mp4',
  },
  {
    title: 'The People Behind the Picks',
    description:
      'A recommendation is only worth as much as the person making it, so friend activity is browsable in its own right. This is also where messaging would have gone, before I cut it.',
    video: '/biteAssets/biteFriends.mp4',
  },
];

const REFLECTIONS = [
  {
    title: 'A compelling idea can quietly become several products',
    body: 'QR ordering, social discovery, loyalty and messaging each seemed valuable on their own. The concept only got sharper when I centred one behaviour: choosing a dish through people you trust.',
  },
  {
    title: 'Designing for diners meant thinking about restaurants too',
    body: 'I imagined the QR layer as a lightweight way for partners to earn repeat visits and learn which dishes are popular. That is a hypothesis, not a validated model.',
  },
  {
    title: 'The screens are still a hypothesis',
    body: 'Bite has never been in front of a user. Next is five people, three tasks: pick a dish, understand why a friend vouched for it, redeem a reward.',
  },
];

export function Bite() {
  return (
    <div className="cs-page" data-accent="bite">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Bite - Dining Made Social and Simple"
          subtitle="Inspired by China's scan-to-order dining culture, I explored what a digital menu could become if it were designed around how people actually decide what to eat. Bite brings recommendations from people you trust into the moment you are choosing a dish, helping diners decide what to eat, not just where."
          meta={META}
          cover={COVERS['bite']}
          coverAlt="Bite - Dining Made Social and Simple"
        />

        <CaseStudyTLDR
          summary={[
            'QR menus are common in the U.S. now, but most stop at a PDF or a basic ordering screen. The hard moment comes after scanning, when the menu is open and nothing on it means anything yet.',
            'I assumed QR ordering was the product. My survey showed diners decide by asking people they trust, so I designed Bite to put those recommendations on the menu at the moment of choosing.',
          ]}
          impact={IMPACT}
        />

        {/* 01 · Background + problem */}
        <CaseStudySection num="01" label="Scanning in China" title="An Observation from Dining in China">
          <CaseStudyFigure
            src="/biteAssets/chinaInspiration.mp4"
            type="video"
            className="max-w-[350px] w-full"
          />
          <p className="mb-6">
            In China I got used to scanning a QR code and ordering without waiting for a server. Back
            in the U.S., QR menus usually stopped at a PDF. What could a digital menu become if it
            were designed around how people actually decide what to eat?
          </p>
          <CaseStudyCallout>
            How might digital menus help diners confidently decide what to order?
          </CaseStudyCallout>
          <p>
            I kept the question about the decision rather than about discovery. Plenty of products
            help people pick a restaurant. Far fewer help with the harder moment that follows.
          </p>
        </CaseStudySection>

        {/* 02 · Competitors + findings */}
        <CaseStudySection num="02" label="Asking 20+ diners" title="Key Findings">
          <CaseStudyFigure
            src="/biteAssets/bitecompetitorAnalysis.svg"
            alt="Competitor analysis table comparing Sharp, InstaLaCarte, Clover and Restolabs"
            bordered={false}
            zoomable
          />
          <p className="mb-4">
            Sharp, InstaLaCarte, Clover and Restolabs showed gaps in visual design, social features,
            POS integration and accessibility. Then I surveyed 20+ frequent diners. Four themes came
            back, but they did not carry equal weight.
          </p>
          <div className="grid md:grid-cols-2 gap-2 mb-4">
            {FINDINGS.map((item) => (
              <CaseStudyCard key={item.title} className="h-full">
                <p className={`cs-tag ${item.weight.startsWith('The insight') ? '' : 'cs-tag--muted'}`}>
                  {item.weight}
                </p>
                <h4 className="mt-3">{item.title}</h4>
                <p className="mt-1 text-[var(--csa)]">{item.stats}</p>
                <p className="mt-1">{item.insight}</p>
              </CaseStudyCard>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {PAIN_POINT_QUOTES.map((quote) => (
              <CaseStudyCard key={quote} className="h-full border-l-2 border-[var(--csa)]">
                <p className="italic">“{quote}”</p>
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        {/* 03 · Direction + scope */}
        <CaseStudySection num="03" label="Trust over stars" title="One Insight Changed What Bite Was">
          <p className="mb-4">
            Scanning is already ordinary. The friction sits one step later, when a diner has to
            guess which of forty dishes is worth ordering. Existing platforms aggregate opinions
            from strangers. Bite prioritises recommendations from people already in your circle,
            at the moment of choosing.
          </p>
          <CaseStudyFigure
            src="/biteAssets/biteuserFlow.svg"
            alt="Bite user flow from scanning a QR code to sharing a dish"
            bordered={false}
            className="max-w-[720px]"
            zoomable
          />
          <p className="mb-4">
            I traced the path from scanning a code to leaving a review, looking for the point where
            social proof would change a decision rather than just decorate a screen. Then I cut to
            the smallest V1 that still delivered it.
          </p>
          <div className="grid md:grid-cols-3 gap-2">
            {SCOPE.map((group) => (
              <CaseStudyCard key={group.tier}>
                <p className="cs-tag">{group.tier}</p>
                <ul className="mt-3 space-y-1">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CaseStudyCard>
            ))}
          </div>
          <p>
            Messaging was the hardest to let go of, and the easiest to justify: iMessage and
            Instagram already do it well.
          </p>
        </CaseStudySection>

        {/* 04 · The loop + ideation */}
        <CaseStudySection num="04" label="Friends on the menu" title="Designing a Loop, Not a Checkout Flow">
          <p className="mb-4">
            Bite only works if the people giving recommendations are the same people taking them. A
            friend’s pick becomes your order, and your photo becomes the next person’s pick.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {LOOP.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-[8px] px-3 py-2 bg-[var(--csa)]/10 text-neutral-900/80">
                  {step}
                </span>
                <span aria-hidden="true" className="text-neutral-900/30">
                  {i === LOOP.length - 1 ? '↺' : '→'}
                </span>
              </div>
            ))}
          </div>
          <CaseStudyPair
            bare
            items={[
              {
                src: '/biteAssets/biteSketch.svg',
                zoomable: true,
                alt: 'Bite sketches',
                tag: 'Sketching',
                caption:
                  'A separate recommendations feed was cleaner to build, but it put social proof one tab away from the decision, so I pulled friend activity onto the dish cards.',
              },
              {
                src: '/biteAssets/biteWireframes.svg',
                zoomable: true,
                alt: 'Bite lo-fi wireframes',
                tag: 'Lo-Fi Wireframes',
                caption:
                  'How much social context can a dish card carry? Too little and the recommendation is invisible, too much and ordering slows down.',
              },
              {
                src: '/biteAssets/biteStyleGuide.svg',
                zoomable: true,
                alt: 'Bite style guide',
                tag: 'Style Guide',
                caption:
                  'Discovery carries the bold colour and playful iconography. Menus, customisation and payment stay restrained, where clarity matters more than personality.',
              },
            ]}
          />
        </CaseStudySection>

        {/* 05 · The product */}
        <CaseStudySection num="05" label="Building Bite" title="Introducing Bite">
          <p className="mb-4">
            Every screen answers to the same insight: put a recommendation from someone you trust in
            front of a diner at the moment they are choosing.
          </p>
          <StickyShowcase sections={FINAL_DESIGN_SECTIONS} />
        </CaseStudySection>

        {/* 06 · Reflection + next steps */}
        <CaseStudySection num="06" label="Still a hypothesis" title="What I Took Away">
          <CaseStudyPoints items={REFLECTIONS} />
          <p className="mt-6 text-neutral-900/55">
            <span className="text-neutral-900">Next:</span> find out whether a friend’s pick beats a
            five-star average, work out the restaurant side, then cut to an MVP from whatever
            survives. The build stack is the last question, not the first.
          </p>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
