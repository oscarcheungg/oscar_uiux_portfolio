import { motion } from 'framer-motion';
import { StickyShowcase } from '../components/StickyShowcase';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLayout,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

const META = [
  { label: 'Role', value: 'Product Designer' },
  { label: 'Team', value: '3 engineers\n1 designer' },
  { label: 'Timeline', value: '1 month' },
  { label: 'Tools', value: 'Figma, Figjam, Notion' },
  { label: 'Responsibilities', value: 'Diner survey, Competitive analysis, Interaction design, Prototyping' },
];

const PROCESS_STEPS = [
  { number: '1', title: 'Observe', desc: 'Dining in China\nQR menus at home' },
  { number: '2', title: 'Research', desc: 'Competitors\nDiner survey' },
  { number: '3', title: 'Narrow', desc: 'One insight\nV1 scope' },
  { number: '4', title: 'Design', desc: 'The core loop\nKey screens' },
  { number: '5', title: 'Validate', desc: 'What I\u2019d test next' },
];

/* The four findings, ordered by how much each one moved the product rather
   than by the size of its number. */
const FINDING_WEIGHT = [
  'Expected',
  'Functional need',
  'The insight that changed direction',
  'Adoption lever',
];

/* What made V1, what waited, and what I deliberately left out. A broad idea
   is only a product once it has an edge. */
const SCOPE = [
  {
    tier: 'Core, V1',
    items: [
      'Scan a restaurant\u2019s QR code',
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

const IDENTIFYING_PROBLEMS = [
  {
    title: 'QR Menus Are Already Normal',
    stats: 'Diners already use QR codes to view menus and place orders.',
    insight:
      'I had assumed QR ordering itself could be the differentiator. It cannot: almost everyone already scans. The complaints were about clunky PDFs and slow, non-interactive menus, not about scanning.',
  },
  {
    title: 'Ordering Without Waiting Is Preferred',
    stats: 'Diners prefer ordering from their own phone over waiting for a server.',
    insight:
      'People enjoy the speed and autonomy but get frustrated by inconsistent systems and payment flows.',
  },
  {
    title: 'People Decide by Trust, Not by Ratings',
    stats: 'Diners rely on photos and personal recommendations, from friends or staff, to decide what to order.',
    insight:
      'Anonymous reviews carry little weight. The hard part was never opening the menu. It was deciding what on it was worth ordering, and people solve that by asking someone they trust. This is the finding the rest of Bite is built on.',
  },
  {
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

const IDEATION_STEPS = [
  {
    label: 'User Flow',
    sublabel: 'shaping the journey',
    heading: 'User Flow',
    description:
      'Mapping the journey was really about deciding where a recommendation should interrupt someone. I traced the path from scanning a code to leaving a review, looking for the point where social proof would change a decision rather than just decorate a screen.',
    media: '/biteAssets/biteuserFlow.svg',
    alt: 'Bite User Flow',
  },
  {
    label: 'Sketching',
    sublabel: 'lo-fi exploration',
    heading: 'Sketching',
    description:
      'Early concepts explored whether recommendations should live in a separate feed or inside the menu itself. Keeping them separate was cleaner to build, but it put social proof one tab away from the decision, so I pulled friend activity onto the dish cards instead.',
    media: '/biteAssets/biteSketch.svg',
    alt: 'Bite Sketching Wireframes',
  },
  {
    label: 'Wireframes',
    sublabel: 'structure & flows',
    heading: 'Lo-Fi Wireframes',
    description:
      'Wireframes let me test how much social context a dish card could carry before the menu stopped being scannable. Too little and the recommendation is invisible, too much and ordering slows down.',
    media: '/biteAssets/biteWireframes.svg',
    alt: 'Bite Lo-Fi Wireframes',
  },
  {
    label: 'Style Guide',
    sublabel: 'visual language',
    heading: 'Style Guide',
    description:
      'Bite sits between an ordering utility and a social product, so the interface changes register depending on the task. Discovery carries the bold colour and playful iconography, while menus, customisation and payment stay visually restrained, where clarity matters more than personality.',
    media: '/biteAssets/biteStyleGuide.svg',
    alt: 'Bite Style Guide',
  },
];

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

/* The riskiest assumptions first. Engineering comes after these are answered. */
const NEXT_STEPS = [
  'Test it with diners. Bite has never been in front of a user, so the screens are still a hypothesis. Five people, three tasks: pick a dish, understand why a friend vouched for it, redeem a reward.',
  'Find out whether a friend\u2019s pick actually beats a five-star average when someone is hungry and deciding in a minute. That is the whole bet.',
  'Work out the restaurant side. Bite is two-sided and I have designed one half: what a partner sees, who funds the rewards, how an order reaches the kitchen.',
  'Cut to an MVP from whatever survives. The build stack is the last question, not the first.',
];

export function Bite() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-28 md:pt-36 pb-16 md:pb-24" data-accent="teal">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Bite - Dining Made Social and Simple"
          subtitle="Inspired by China's scan-to-order dining culture, I explored what a digital menu could become if it were designed around how people actually decide what to eat. Bite brings recommendations from people you trust into the moment you are choosing a dish, helping diners decide what to eat, not just where."
          meta={META}
          cover={COVERS['bite']}
          coverAlt="Bite - Dining Made Social and Simple"
        />

        <div className="mt-10 md:mt-14">
          {/* 01 · Background */}
          <CaseStudySection
            num="01"
            label="Background"
            sublabel="why this exists"
            title="An Observation from Dining in China"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              While dining in China I got used to scanning a QR code, browsing the menu, and
              ordering without waiting for a server. Back in the U.S., QR menus were becoming common
              too, but the experience usually stopped at a PDF or a basic ordering screen. That made
              me curious: what could a digital menu become if it were designed around how people
              actually decide what to eat?
            </p>
            <div className="flex justify-center">
              <CaseStudyFigure
                src="/biteAssets/chinaInspiration.mp4"
                type="video"
                className="max-w-[350px] w-full"
              />
            </div>
          </CaseStudySection>

          {/* 02 · Problem */}
          <CaseStudySection
            num="02"
            label="Problem"
            sublabel="what we're solving"
            title="The Question I Started With"
          >
            <p className="text-[17px] leading-7 text-neutral-900/85 mb-6">
              How might digital menus help diners confidently decide what to order?
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              I deliberately kept the question about the decision rather than about discovery.
              Plenty of products already help people pick a restaurant. Far fewer help with the
              harder moment that follows, when the menu is open and nothing on it means anything
              yet.
            </p>

            <h3 className="text-[17px] font-medium mb-6 text-neutral-900">
              The Process
            </h3>
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
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#284B63]/10 border border-[#284B63]/20 flex items-center justify-center mx-auto mb-4">
                    <span className="font-label text-[15px] font-medium text-[#284B63]">
                      {step.number}
                    </span>
                  </div>
                  <h4 className="text-[16px] leading-6 font-medium text-neutral-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[14px] text-neutral-900/55 whitespace-pre-line">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 03 · Research */}
          <CaseStudySection
            num="03"
            label="Competitors"
            sublabel="mapping the field"
            title="Competitor Analysis"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              I started by studying the field. Analyzing Sharp, InstaLaCarte, Clover, and Restolabs
              revealed gaps in visual design, social features, POS integration, and accessibility,
              which pointed me toward a lightweight, socially-driven solution.
            </p>
            <CaseStudyFigure
              src="/biteAssets/bitecompetitorAnalysis.svg"
              alt="Competitor Analysis Table"
            />
          </CaseStudySection>

          {/* 04 · Research */}
          <CaseStudySection
            num="04"
            label="Findings"
            sublabel="what diners told me"
            title="Key Findings"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Then I went to the diners themselves, surveying 20+ frequent diners about how they
              choose where to eat, how they read menus, and where ordering breaks down. Four themes
              came back, but they did not carry equal weight.
            </p>

            <div className="space-y-6 md:space-y-8">
              {IDENTIFYING_PROBLEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-[10px] bg-neutral-900/[0.035]"
                >
                  <p className="font-label text-[12px] font-medium tracking-[0.7px] text-neutral-900/45 mb-2">
                    {FINDING_WEIGHT[i]}
                  </p>
                  <h3 className="text-[17px] font-medium text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[16px] leading-6 text-[#284B63] font-medium mb-2">
                    {item.stats}
                  </p>
                  <p className="text-[16px] leading-6 text-neutral-900/55">
                    {item.insight}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 md:mt-12"
            >
              <p className="text-[17px] font-medium text-neutral-900 mb-4">
                Pain Points (Quotes derived from participants):
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {PAIN_POINT_QUOTES.map((quote, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="p-4 pl-5 rounded-[10px] bg-neutral-900/[0.035] border-l-2 border-[var(--csa)]"
                  >
                    <p className="text-[16px] leading-6 text-neutral-700 italic">
                      "{quote}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CaseStudySection>

          {/* 05 · The insight that set the direction */}
          <CaseStudySection
            num="05"
            label="Direction"
            sublabel="the turn"
            title="One Insight Changed What Bite Was"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-6">
              I came in assuming QR ordering was the product. The survey said otherwise: scanning is
              already ordinary, and nobody needs help with it. The friction sits one step later, at
              the point where a diner has the menu open and has to guess which of forty dishes is
              worth ordering. People already solve that by asking someone they trust.
            </p>
            <p className="text-[17px] leading-7 text-neutral-900/85 mb-6">
              Existing platforms aggregate opinions from strangers. Bite prioritises recommendations
              from people already in your circle, at the moment of choosing.
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55">
              That reframing is what separates Bite from Yelp or Google Maps, and it decided the
              rest of the product: the feed is built from friends and dishes rather than restaurant
              star ratings, and social proof lives inside the menu rather than in a review tab.
            </p>
          </CaseStudySection>

          {/* 06 · The loop */}
          <CaseStudySection
            num="06"
            label="The Loop"
            sublabel="how it compounds"
            title="Designing a Loop, Not a Checkout Flow"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Bite only works if the people giving recommendations are the same people taking them.
              A diner sees a dish a friend vouched for, orders it, and can post their own photo
              afterwards, which becomes the recommendation for the next person. Discovery and
              contribution are the same loop rather than two separate features.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {['Discover', 'Order', 'Experience', 'Share'].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-[10px] bg-neutral-900/[0.035] px-3 py-2 text-[16px] text-neutral-900/70">
                    {step}
                  </span>
                  <span aria-hidden="true" className="text-neutral-900/30">
                    {i === arr.length - 1 ? '\u21BA' : '\u2192'}
                  </span>
                </div>
              ))}
            </div>
          </CaseStudySection>

          {/* 07 · Scope */}
          <CaseStudySection
            num="07"
            label="Scope"
            sublabel="what made v1"
            title="Deciding What Belonged in V1"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              The research surfaced far more ideas than one product should carry: ordering, a feed,
              reviews, discovery, rewards, messaging, favourites, order history, challenges. Most of
              them were reasonable. Shipping all of them would have meant Bite did nothing
              particularly well, so I cut to the smallest experience that still delivered the core
              value.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {SCOPE.map((group) => (
                <div
                  key={group.tier}
                  className="p-5 rounded-[10px] bg-neutral-900/[0.035]"
                >
                  <p className="font-label text-[12px] font-medium tracking-[0.7px] text-[#284B63] mb-3">
                    {group.tier}
                  </p>
                  <ul className="space-y-2 text-[16px] leading-6 text-neutral-900/55">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-[16px] leading-6 text-neutral-900/55 mt-8">
              Messaging was the hardest to let go of, and the easiest to justify: iMessage and
              Instagram already do it well, and rebuilding them inside a dining app would have added
              surface area without adding value.
            </p>
          </CaseStudySection>

          {/* 06-09 · Ideation */}
          {IDEATION_STEPS.map((step, i) => (
            <CaseStudySection
              key={step.heading}
              num={String(i + 8).padStart(2, '0')}
              label={step.label}
              sublabel={step.sublabel}
              title={step.heading}
            >
              <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
                {step.description}
              </p>
              <CaseStudyFigure src={step.media} alt={step.alt} />
            </CaseStudySection>
          ))}

          {/* 10 · Solution */}
          <CaseStudySection
            num="12"
            label="The Product"
            sublabel="what we made"
            title="Introducing Bite"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Every screen below answers to the same insight: put a recommendation from someone you
              trust in front of a diner at the moment they are choosing.
            </p>
            <StickyShowcase sections={FINAL_DESIGN_SECTIONS} />
          </CaseStudySection>

          {/* 11 · Reflection */}
          <CaseStudySection
            num="13"
            label="What's Next"
            sublabel="what i learned"
            title="What I Took Away"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-6">
              Bite taught me that a compelling idea can quietly become several products at once. QR
              ordering, social discovery, loyalty and messaging each seemed valuable on their own,
              and together they would have made a vague app. The concept only got sharper when I
              centred one behaviour: helping someone confidently choose a dish through people they
              trust.
            </p>
            <h3 className="text-[17px] font-medium text-neutral-900 mb-3">
              Designing for Diners Meant Thinking About Restaurants Too
            </h3>
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-10">
              Bite only works if restaurants see value in it as well. I imagined the QR layer as a
              lightweight way for partners to earn repeat visits and learn which dishes are actually
              popular, sitting alongside whatever ordering setup they already run rather than
              replacing it. That is a hypothesis, not a validated model, and it is the part of the
              concept I would want to pressure test first.
            </p>

            <h3 className="text-[17px] font-medium mb-6 text-neutral-900">
              Next Steps
            </h3>
            <ol className="space-y-4">
              {NEXT_STEPS.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <span className="w-6 h-6 flex items-center justify-center shrink-0 font-label text-[13px] font-medium text-[#284B63] bg-[#284B63]/10 rounded-full mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[16px] leading-6 text-neutral-900/70">
                    {step}
                  </p>
                </motion.li>
              ))}
            </ol>
          </CaseStudySection>
        </div>
      </CaseStudyLayout>
    </div>
  );
}
