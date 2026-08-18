import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Filter, TrendingUp, Lightbulb } from 'lucide-react';
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
  { label: 'Role', value: 'Product Designer' },
  { label: 'Scope', value: 'Led the transaction\nfiltering redesign' },
  { label: 'Team', value: '1 PM\n2 engineers\n2 designers' },
  { label: 'Timeline', value: '2 weeks' },
  { label: 'Responsibilities', value: 'User interviews, Interaction design, Prototyping, Usability testing' },
];

/* Three principles rather than one requirement per research quote. */
const DESIGN_GOALS = [
  {
    insight: 'Make common actions immediate',
    goal: 'The filters students reach for daily should cost close to nothing to apply',
    icon: TrendingUp,
  },
  {
    insight: 'Prioritise categories',
    goal: 'Use the recognisable labels students already use to describe their spending',
    icon: Filter,
  },
  {
    insight: 'Reveal complexity progressively',
    goal: 'Keep the less common controls reachable without letting them compete with everyday tasks',
    icon: Lightbulb,
  },
];

const ITERATIONS = [
  {
    title: 'Iteration 1: Inline filter options',
    body: "I started by placing filter options right in the transaction list header, assuming the problem was that filtering was hidden. Testing said otherwise. Making everything visible only created a new problem: students did not need easier access to filters, they needed fewer decisions between their question and the answer. This is the iteration that changed how I understood the brief.",
    aside: "What didn't work: Cluttered header, limited space, didn't feel like a dedicated filtering experience",
    media: '/centibleAssets/centibleIterationOne.jpg',
    alt: 'Inline filter options iteration',
  },
  {
    title: 'Iteration 2: Testing the overlay approach',
    body: "Testing surfaced two different filtering needs that had been sharing one menu: transaction status, which belongs to the workflow of classifying transactions, and spending category, which is how students ask everyday money questions. Splitting them into layers made both simpler. A partial overlay carries the status layer while keeping the transaction list in view, and choosing a status brings the category chips forward.",
    aside: 'Key learning: status and category are two different questions and deserve two layers',
    media: '/centibleAssets/centibleIterationTwo.jpg',
    alt: 'Overlay filter menu exploration',
  },
  {
    title: 'Iteration 3: Defaulting to categorized transactions',
    body: 'Because category questions were the dominant use case, I made categorized transactions the default state so the category chips are available immediately rather than after a setup step. "All" stays one tap away. That turns "tap filter, choose categorized, then see categories" into simply seeing categories.',
    aside: 'Key insight: defaulting to categorized exposes category filtering sooner, without claiming a status is a category',
    media: '/centibleAssets/centibleIterationThree.jpg',
    alt: 'Categorized filter as default',
  },
];

const SOLUTION_SECTIONS = [
  {
    title: 'Preserve context while filtering',
    description:
      'A partial-height overlay rather than a dedicated screen, so students never lose sight of the transaction list they are trying to understand. It dismisses with a tap, which matters when the whole visit lasts a few seconds.',
    media: '/centibleAssets/filterOverlay.png',
    type: 'image' as const,
  },
  {
    title: 'Make common categories immediately scannable',
    description:
      'Once categorized transactions are active, the high-frequency spending categories sit above the list as removable chips. Answering "how much on food" costs one tap, and combining chips does not mean returning to the menu.',
    media: '/centibleAssets/categorizedTransactions.png',
    type: 'image' as const,
  },
  {
    title: 'Keep filter state visible',
    description:
      'The active filter stays on screen after the overlay closes, so nobody has to remember why the list changed. For a tool people open mid-thought, the state of the screen has to explain itself.',
    media: '/centibleAssets/centibleDemo.mp4',
    type: 'video' as const,
  },
];

const REFLECTIONS = [
  'The best designs match how users actually think. Students remember spending by category, and separating that from the transaction-status workflow is what made both simple.',
  "Showing everything doesn't give users control, it overwhelms them. Hiding advanced options until needed reduced cognitive load while keeping functionality accessible.",
  "I'd observe behaviour before asking about it. The interviews told me what students said they wanted; watching them complete real financial tasks would have surfaced the friction in the existing filter earlier and saved me an iteration.",
];

function Bullet({ strong, children }: { strong: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
      <span>
        <strong className="text-neutral-900 dark:text-neutral-100 font-medium">{strong}</strong>{' '}
        {children}
      </span>
    </li>
  );
}

export function Centible() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-28 md:pt-36 pb-16 md:pb-24" data-accent="purple">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Filtering Transactions for Centible"
          subtitle="A financial tool built with App Team Carolina for college students navigating independent living on unpredictable, fluctuating incomes."
          meta={META}
          cover={COVERS['centible']}
          coverAlt="Filtering Transactions for Centible"
        />

        <div className="mt-10 md:mt-14">
          {/* 01 · Challenge */}
          <CaseStudySection
            num="01"
            label="Challenge"
            sublabel="why this matters"
            title="The Problem With the Existing Filter"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              It started with a simple question students kept asking: "How much did I spend on food
              this week?" Answering it meant working through filtering options that felt
              disproportionately complicated for something that simple. Why it felt that way was
              what the research had to tell me.
            </p>
            <CaseStudyFigure
              src="/centibleAssets/centibleBefore.png"
              alt="Existing filter interface showing friction points"
            />
          </CaseStudySection>

          {/* 02 · Research */}
          <CaseStudySection
            num="02"
            label="Research"
            sublabel="what we found"
            title="How Students Actually Use Financial Tools"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I sat down with 8 college students for informal interviews. The biggest takeaway was
              not what they filtered by, but how they approached financial tools at all. They opened
              one with a question in mind, looked for the answer, and left. Centible is a check-in
              tool, not a destination, which means every extra interaction competes with a very
              short session.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <CaseStudyCard title="User context">
                <ul className="space-y-3 text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                  <Bullet strong="Short, repeated check-ins:">
                    Students opened financial apps for quick answers rather than long budgeting
                    sessions
                  </Bullet>
                  <Bullet strong="Low friction tolerance:">Any extra step feels like too much</Bullet>
                  <Bullet strong="Goal-oriented:">Specific question → answer → leave</Bullet>
                </ul>
              </CaseStudyCard>
              <CaseStudyCard title="Key insights">
                <ul className="space-y-3 text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                  <Bullet strong="They arrive with a specific question:">
                    Nobody was exploring the interface, they wanted an answer
                  </Bullet>
                  <Bullet strong="Spending is remembered by category:">
                    "Food" or "transportation" came to mind before any other way of slicing it
                  </Bullet>
                  <Bullet strong="More controls is not more control:">
                    When every option appeared at once, students hesitated instead of acting faster
                  </Bullet>
                </ul>
              </CaseStudyCard>
            </div>
          </CaseStudySection>

          {/* 03 · Goals */}
          <CaseStudySection
            num="03"
            label="Goals"
            sublabel="insight → intent"
            title="Turning Insights Into Design Principles"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              With those insights in hand, I tied each design goal to something users actually told
              us, so the solution would solve real problems instead of adding complexity.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {DESIGN_GOALS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <CaseStudyCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-[10px] bg-purple-600/10 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 italic">
                          "{item.insight}"
                        </p>
                        <p className="text-base text-neutral-900 dark:text-neutral-100 leading-relaxed">
                          {item.goal}
                        </p>
                      </div>
                    </div>
                  </CaseStudyCard>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 04 · Iterations */}
          <CaseStudySection
            num="04"
            label="Iterations"
            sublabel="explore & test"
            title="Exploring Different Approaches to Transaction Filtering"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              From there, I tested several filter approaches, learning what worked and what didn't
              through rapid iteration and user feedback.
            </p>
            <div className="space-y-12 md:space-y-16">
              {ITERATIONS.map((it) => (
                <div key={it.title}>
                  <h3 className="text-[17px] font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                    {it.title}
                  </h3>
                  <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-3">
                    {it.body}
                  </p>
                  <p className="text-[14px] text-neutral-900/45 dark:text-neutral-100/45 italic mb-5">{it.aside}</p>
                  <CaseStudyFigure src={it.media} alt={it.alt} />
                </div>
              ))}
            </div>
          </CaseStudySection>

          {/* 05 · Solution */}
          <CaseStudySection
            num="05"
            label="Solution"
            sublabel="what we made"
            title="The Final Filtering Solution"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Everything the iterations taught me came together in the final design: a filter
              overlay menu of transaction status options, plus category chips that appear when
              filtering. Context stays intact, and filters stay quick and scannable.
            </p>
            <div className="space-y-12 md:space-y-16 mb-12">
              {SOLUTION_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-[17px] font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                    {section.title}
                  </h3>
                  <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-5">
                    {section.description}
                  </p>
                  <CaseStudyFigure src={section.media} alt={section.title} type={section.type} />
                </div>
              ))}
            </div>
            <CaseStudyCard title="How it supports user jobs">
              <ul className="space-y-3 text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                <Bullet strong="Quick check-ins:">One tap to see food spending for the week</Bullet>
                <Bullet strong="Category-first thinking:">
                  Categories are prominent and visually distinct
                </Bullet>
                <Bullet strong="Reduced cognitive load:">
                  Only essential options visible, advanced features available but not in the way
                </Bullet>
              </ul>
            </CaseStudyCard>
          </CaseStudySection>

          {/* 06 · Outcome */}
          <CaseStudySection
            num="06"
            label="Testing"
            sublabel="what it did"
            title="Testing the Redesign"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h3 className="text-[17px] font-medium mb-4 text-neutral-900 dark:text-neutral-100">
                  Quantitative
                </h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                  I ran task-based usability tests with 5 students on a high-fidelity prototype,
                  asking them to find specific transactions in both the existing filter and the
                  redesign. Participants completed those tasks{' '}
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    roughly 15% faster with the new filter
                  </span>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-[17px] font-medium mb-4 text-neutral-900 dark:text-neutral-100">
                  Qualitative
                </h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                  Participants described the flow as{' '}
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    easier to scan and more predictable
                  </span>
                  , and pointed specifically at the selected categories staying visible after
                  filtering as the reason they always knew what they were looking at.
                </p>
              </div>
            </div>
          </CaseStudySection>

          {/* 08 · Reflection */}
          <CaseStudySection
            num="07"
            label="Reflection"
            sublabel="what i learned"
            title="What I Learned and What I'd Do Differently"
          >
            <div className="space-y-4">
              {REFLECTIONS.map((takeaway, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 items-start p-5 rounded-[10px] bg-neutral-900/[0.035] dark:bg-neutral-100/[0.06]"
                >
                  <span className="text-sm text-purple-600 dark:text-purple-400 pt-1 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-[16px] leading-6 text-neutral-900/70 dark:text-neutral-100/70">
                    {takeaway}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 09 · Next steps */}
          <CaseStudySection
            num="08"
            label="Next steps"
            sublabel="where it's going"
            title="Continuing to Refine Centible"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I'm revamping the app's widgets so users can see their finances at a glance, and we're
              expanding marketing to grow fundraising for the app and the team. We keep refining
              Centible based on user feedback so it stays valuable for students!
            </p>
            <CaseStudyLink href="https://apps.apple.com/us/app/centible/id6443507950">
              Get Centible on the App Store!
            </CaseStudyLink>
          </CaseStudySection>

          {/* 07 · Team */}
          <CaseStudySection
            num="09"
            label="Delivery"
            sublabel="beyond the screens"
            title="Presenting at App Team Carolina Gala"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Our team presented the semester's work at the App Team Carolina Gala, sharing our
              usability testing insights, redesigned features, and the website redesign that brought
              them to life. Go Centible!
            </p>
            <CaseStudyFigure
              src="/centibleAssets/centibleGala.jpg"
              alt="Centible team at App Team Carolina Gala"
              className="mb-8"
            />
            <CaseStudyLink href="https://docs.google.com/presentation/d/1SFU9wVgxHThUgA3r1vQBUmPXL5X9i7kHvmqwdcD0fF4/edit?usp=sharing">
              View Full Presentation
            </CaseStudyLink>
          </CaseStudySection>

        </div>
      </CaseStudyLayout>
    </div>
  );
}
