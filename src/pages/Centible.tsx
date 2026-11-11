import { Filter, TrendingUp, Lightbulb } from 'lucide-react';
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
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

/* Centible, told for a skim: a TL;DR up front, then short sections that each
   lead with a visual. The screens stay scaled down (560px and 440px) so they
   read as phones, not banners. */

const META = [
  { label: 'Role', value: 'Product Designer' },
  { label: 'Scope', value: 'Led the transaction\nfiltering redesign' },
  { label: 'Team', value: '1 PM\n2 engineers\n2 designers' },
  { label: 'Timeline', value: '2 weeks' },
  { label: 'Responsibilities', value: 'User interviews, Interaction design, Prototyping, Usability testing' },
];

const IMPACT = [
  {
    title: 'Talked to 8 students',
    body: 'Interviews showed Centible is a check-in tool: students arrive with one question, find the answer and leave.',
  },
  {
    title: 'Split status from category',
    body: 'Two needs were sharing one menu, so a partial overlay carries status and category chips come forward.',
  },
  {
    title: 'Categories by default',
    body: 'Categorized transactions became the default, so category chips are there immediately and “All” is one tap away.',
  },
  {
    title: 'Roughly 15% faster',
    body: 'In task-based tests with 5 students, participants found transactions roughly 15% faster than with the existing filter.',
  },
];

/* What students told me, and the principle each one became. */
const DESIGN_GOALS = [
  {
    finding: 'They arrive with a specific question',
    insight: 'Make common actions immediate',
    goal: 'The filters students reach for daily should cost close to nothing to apply',
    icon: TrendingUp,
  },
  {
    finding: 'Spending is remembered by category',
    insight: 'Prioritise categories',
    goal: 'Use the recognisable labels students already use to describe their spending',
    icon: Filter,
  },
  {
    finding: 'More controls is not more control',
    insight: 'Reveal complexity progressively',
    goal: 'Keep the less common controls reachable without letting them compete with everyday tasks',
    icon: Lightbulb,
  },
];

const ITERATIONS = [
  {
    title: 'Iteration 1: Inline filter options',
    body: 'I started by placing filter options right in the transaction list header, assuming the problem was that filtering was hidden. Testing said otherwise: students did not need easier access to filters, they needed fewer decisions between their question and the answer.',
    aside: "What didn't work: Cluttered header, limited space, didn't feel like a dedicated filtering experience",
    media: '/centibleAssets/centibleIterationOne.jpg',
    alt: 'Inline filter options iteration',
  },
  {
    title: 'Iteration 2: Testing the overlay approach',
    body: 'Testing surfaced two different filtering needs sharing one menu: transaction status and spending category. A partial overlay carries the status layer while keeping the transaction list in view, and choosing a status brings the category chips forward.',
    aside: 'Key learning: status and category are two different questions and deserve two layers',
    media: '/centibleAssets/centibleIterationTwo.jpg',
    alt: 'Overlay filter menu exploration',
  },
  {
    title: 'Iteration 3: Defaulting to categorized transactions',
    body: 'Because category questions were the dominant use case, I made categorized transactions the default state so the category chips are available immediately. "All" stays one tap away.',
    aside: 'Key insight: defaulting to categorized exposes category filtering sooner, without claiming a status is a category',
    media: '/centibleAssets/centibleIterationThree.jpg',
    alt: 'Categorized filter as default',
  },
];

const SOLUTION_SECTIONS = [
  {
    title: 'Preserve context while filtering',
    description:
      'A partial-height overlay rather than a dedicated screen, so students never lose sight of the transaction list. It dismisses with a tap, which matters when the whole visit lasts a few seconds.',
    media: '/centibleAssets/filterOverlay.png',
    type: 'image' as const,
  },
  {
    title: 'Make common categories immediately scannable',
    description:
      'High-frequency spending categories sit above the list as removable chips. Answering "how much on food" costs one tap, and combining chips does not mean returning to the menu.',
    media: '/centibleAssets/categorizedTransactions.png',
    type: 'image' as const,
  },
  {
    title: 'Keep filter state visible',
    description:
      'The active filter stays on screen after the overlay closes, so nobody has to remember why the list changed.',
    media: '/centibleAssets/centibleDemo.mp4',
    type: 'video' as const,
  },
];

const REFLECTIONS = [
  {
    title: 'The best designs match how users actually think',
    body: 'Students remember spending by category, and separating that from the transaction-status workflow is what made both simple.',
  },
  {
    title: "Showing everything doesn't give users control",
    body: 'It overwhelms them. Hiding advanced options until needed reduced cognitive load while keeping functionality accessible.',
  },
  {
    title: "I'd observe behaviour before asking about it",
    body: 'Interviews told me what students said they wanted; watching them complete real financial tasks would have surfaced the friction earlier and saved me an iteration.',
  },
];

export function Centible() {
  return (
    <div className="cs-page" data-accent="centible">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Filtering Transactions for Centible"
          subtitle="A financial tool built with App Team Carolina for college students navigating independent living on unpredictable, fluctuating incomes."
          meta={META}
          cover={COVERS['centible']}
          coverAlt="Filtering Transactions for Centible"
        />

        <CaseStudyTLDR
          summary={[
            'Students kept asking a simple question: “How much did I spend on food this week?” Answering it in Centible meant working through filtering options that felt disproportionately complicated.',
            'Interviews showed students open the app with one question and remember spending by category. I split status from category, made categories the default, and tested the redesign against the existing filter.',
          ]}
          impact={IMPACT}
        />

        {/* 01 · Problem */}
        <CaseStudySection num="01" label="The food question" title="The Problem With the Existing Filter">
          <CaseStudyCallout>“How much did I spend on food this week?”</CaseStudyCallout>
          <p className="mb-4">
            Students kept asking it, and answering it meant working through filtering options that
            felt disproportionately complicated for something that simple.
          </p>
          <CaseStudyFigure
            src="/centibleAssets/centibleBefore.png"
            alt="Existing filter interface showing friction points"
            className="max-w-[560px]"
          />
        </CaseStudySection>

        {/* 02 · Research + goals */}
        <CaseStudySection num="02" label="Quick check-ins" title="How Students Actually Use Financial Tools">
          <p className="mb-4">
            I sat down with 8 college students for informal interviews. They opened a financial
            tool with a question in mind, looked for the answer, and left. Centible is a check-in
            tool, not a destination, so every extra interaction competes with a very short session.
          </p>
          <div className="grid md:grid-cols-3 gap-2">
            {DESIGN_GOALS.map((item) => (
              <CaseStudyCard key={item.insight} className="h-full">
                <div className="w-9 h-9 rounded-[10px] bg-[var(--csa)]/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-[var(--csa)]" />
                </div>
                <p className="text-neutral-900/45">{item.finding}</p>
                <h4 className="mt-1">{item.insight}</h4>
                <p className="mt-1">{item.goal}</p>
              </CaseStudyCard>
            ))}
          </div>
          <p>
            Each card ties a design principle to something students actually told us, so the
            solution would solve real problems instead of adding complexity.
          </p>
        </CaseStudySection>

        {/* 03 · Iterations */}
        <CaseStudySection
          num="03"
          label="Splitting the menu"
          title="Exploring Different Approaches to Transaction Filtering"
        >
          <p className="mb-4">
            I tested several filter approaches, learning what worked and what didn't through rapid
            iteration and user feedback.
          </p>
          <div className="cs-pair cs-pair--bare">
            {ITERATIONS.map((it) => (
              <figure key={it.title} className="cs-pair__item">
                <CaseStudyFigure src={it.media} alt={it.alt} className="max-w-[560px]" />
                <figcaption className="cs-pair__caption">
                  <span className="cs-tag cs-pair__tag">{it.title}</span>
                  {it.body}
                  <span className="block mt-2 text-neutral-900/45">{it.aside}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </CaseStudySection>

        {/* 04 · Solution */}
        <CaseStudySection num="04" label="Chips up front" title="The Final Filtering Solution">
          <p className="mb-4">
            A filter overlay menu of transaction status options, plus category chips that appear
            when filtering. Context stays intact, and filters stay quick and scannable.
          </p>
          <div className="cs-pair cs-pair--bare">
            {SOLUTION_SECTIONS.map((section) => (
              <figure key={section.title} className="cs-pair__item">
                <CaseStudyFigure
                  src={section.media}
                  alt={section.title}
                  type={section.type}
                  className="max-w-[440px]"
                />
                <figcaption className="cs-pair__caption">
                  <span className="cs-tag cs-pair__tag">{section.title}</span>
                  {section.description}
                </figcaption>
              </figure>
            ))}
          </div>
        </CaseStudySection>

        {/* 05 · Testing */}
        <CaseStudySection num="05" label="15% faster" title="Testing the Redesign">
          <p className="mb-4">
            I ran task-based usability tests with 5 students on a high-fidelity prototype, asking
            them to find specific transactions in both the existing filter and the redesign.
          </p>
          <div className="grid md:grid-cols-2 gap-2">
            <CaseStudyCard title="Quantitative" className="h-full">
              <p>
                Participants completed those tasks{' '}
                <span className="text-[var(--csa)] font-medium">
                  roughly 15% faster with the new filter
                </span>
                .
              </p>
            </CaseStudyCard>
            <CaseStudyCard title="Qualitative" className="h-full">
              <p>
                Participants described the flow as{' '}
                <span className="text-[var(--csa)] font-medium">
                  easier to scan and more predictable
                </span>
                , and pointed at the selected categories staying visible after filtering as the
                reason they always knew what they were looking at.
              </p>
            </CaseStudyCard>
          </div>
        </CaseStudySection>

        {/* 06 · Delivery */}
        <CaseStudySection num="06" label="Gala night" title="Presenting at App Team Carolina Gala">
          <CaseStudyFigure
            src="/centibleAssets/centibleGala.jpg"
            alt="Centible team at App Team Carolina Gala"
            className="max-w-[640px]"
          />
          <p className="mb-4">
            Our team presented the semester's work at the App Team Carolina Gala, sharing our
            usability testing insights, redesigned features, and the website redesign that brought
            them to life. Go Centible!
          </p>
          <CaseStudyLink href="https://docs.google.com/presentation/d/1SFU9wVgxHThUgA3r1vQBUmPXL5X9i7kHvmqwdcD0fF4/edit?usp=sharing">
            View Full Presentation
          </CaseStudyLink>
        </CaseStudySection>

        {/* 07 · Reflection + next steps */}
        <CaseStudySection num="07" label="Watch, then ask" title="What I Learned and What I'd Do Differently">
          <CaseStudyPoints items={REFLECTIONS} />
          <p className="mt-6 mb-4 text-neutral-900/55">
            <span className="text-neutral-900">Next:</span> I'm revamping the app's widgets so users
            can see their finances at a glance, and we're expanding marketing to grow fundraising for
            the app and the team.
          </p>
          <CaseStudyLink href="https://apps.apple.com/us/app/centible/id6443507950">
            Get Centible on the App Store!
          </CaseStudyLink>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
