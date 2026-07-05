import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Lightbulb } from 'lucide-react';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLink,
  CaseStudyCard,
  CaseStudyLayout,
} from '../components/CaseStudy';

const META = [
  { label: 'Role', value: 'Product Designer' },
  { label: 'Team', value: '1 PM\n2 engineers\n2 designers' },
  { label: 'Timeline', value: '2 weeks' },
  { label: 'Tools', value: 'Figma, Figjam' },
  { label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' },
];

const DESIGN_GOALS = [
  {
    insight: 'Users scan more than read',
    goal: 'Make categories instantly recognizable with icons and color coding',
    icon: Search,
  },
  {
    insight: 'Category-first thinking',
    goal: 'Put category selection before date ranges, with the most common filters first',
    icon: Filter,
  },
  {
    insight: 'Low tolerance for friction',
    goal: 'Make common filters a single tap, keeping advanced options available but not prominent',
    icon: TrendingUp,
  },
  {
    insight: 'Over-filtering causes fatigue',
    goal: 'Show essential filters first, revealing advanced options only when needed',
    icon: Lightbulb,
  },
];

const ITERATIONS = [
  {
    title: 'Iteration 1: Inline filter options',
    body: "I started by placing filter options right in the transaction list header, hoping to save taps. Instead, showing everything at once just added cognitive load. Users wanted transactions first, filters second, and I learned that visibility doesn't always equal usability.",
    aside: "What didn't work: Cluttered header, limited space, didn't feel like a dedicated filtering experience",
    media: '/centibleAssets/centibleIterationOne.jpg',
    alt: 'Inline filter options iteration',
  },
  {
    title: 'Iteration 2: Testing the overlay approach',
    body: "So I tried an overlay menu, which solved the space issue. A partial overlay won out over full-screen because users could still see their transaction list, and it opened up a two-stage pattern that matched their mental model: pick a status (Categorized/Uncategorized), then watch category chips appear.",
    aside: 'Key learning: Overlay maintains context, provides space for clear labels, enables category chips',
    media: '/centibleAssets/centibleIterationTwo.jpg',
    alt: 'Overlay filter menu exploration',
  },
  {
    title: 'Iteration 3: Making categorized filter the default',
    body: 'Then the research clicked: if students think in categories first, why not make "Categorized" the default? I did, keeping "All" easily accessible. Transactions now open already grouped by category chips, cutting "tap filter → select categorized → see categories" down to just "see categories."',
    aside: 'Key insight: Defaulting to categorized view matches how users think about their spending',
    media: '/centibleAssets/centibleIterationThree.jpg',
    alt: 'Categorized filter as default',
  },
];

const SOLUTION_SECTIONS = [
  {
    title: 'Filter overlay menu with transaction status options',
    description:
      'Tap the filter icon and a semi-transparent overlay opens with radio options: Categorized, Uncategorized, All, and Ignored. The transaction list stays in view, and the overlay dismisses easily for quick check-ins.',
    media: '/centibleAssets/filterOverlay.png',
    type: 'image' as const,
  },
  {
    title: 'Category filter chips for quick selection',
    description:
      'When filtering by "Categorized," category chips (Rent, Groceries, Eating Out) appear above the transaction list. Users can tap multiple chips at once, and each is clearly labeled and easy to remove, so adjusting filters on the fly is simple.',
    media: '/centibleAssets/categorizedTransactions.png',
    type: 'image' as const,
  },
  {
    title: 'Clear visual feedback and easy filter management',
    description:
      'Active filters are always visible through the filter label (e.g., "Uncategorized Transactions") and category chips, supporting the quick, goal-oriented behavior we saw in research.',
    media: '/centibleAssets/centibleDemo.mp4',
    type: 'video' as const,
  },
];

const REFLECTIONS = [
  'The best designs match how users actually think, not how I think they should. Learning that students think in categories first, not date ranges, fundamentally shifted the solution.',
  "Showing everything doesn't give users control, it overwhelms them. Hiding advanced options until needed reduced cognitive load while keeping functionality accessible.",
  "I'd start with observation, not assumptions. My first iterations reflected what I thought users wanted; watching them use financial tools first would have saved cycles.",
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
          eyebrow="CENTIBLE · IOS MOBILE DESIGN 2025"
          title="Filtering Transactions for Centible"
          subtitle="A financial tool built with App Team Carolina for college students navigating independent living on unpredictable, fluctuating incomes."
          meta={META}
          cover="/centibleCover.png"
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              It started with a simple question students kept asking: "How much did I spend on food
              this week?" Getting that answer meant multiple taps through buried options that didn't
              match their category-first thinking.
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              So I sat down with 8 college students for informal interviews. They all used financial
              apps the same way: quick check-ins, not deep budgeting sessions. That insight shaped
              every design decision that followed.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <CaseStudyCard title="User context">
                <ul className="space-y-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <Bullet strong="Quick, repeated usage:">
                    Multiple check-ins per day, not dedicated budgeting sessions
                  </Bullet>
                  <Bullet strong="Low friction tolerance:">Any extra step feels like too much</Bullet>
                  <Bullet strong="Goal-oriented:">Specific question → answer → leave</Bullet>
                </ul>
              </CaseStudyCard>
              <CaseStudyCard title="Key insights">
                <ul className="space-y-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <Bullet strong="Users scan more than read:">
                    Category labels must be instantly recognizable
                  </Bullet>
                  <Bullet strong="Category-first thinking:">
                    "Food" or "transportation" before date ranges
                  </Bullet>
                  <Bullet strong="Over-filtering causes fatigue:">
                    Too many options lead to decision paralysis
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
            title="Tying Goals Directly to Insights"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
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
                      <div className="w-11 h-11 rounded-xl bg-purple-600/10 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              From there, I tested several filter approaches, learning what worked and what didn't
              through rapid iteration and user feedback.
            </p>
            <div className="space-y-12 md:space-y-16">
              {ITERATIONS.map((it) => (
                <div key={it.title}>
                  <h3 className="text-base md:text-lg font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                    {it.title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                    {it.body}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 italic mb-5">{it.aside}</p>
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Everything the iterations taught me came together in the final design: a filter
              overlay menu of transaction status options, plus category chips that appear when
              filtering. Context stays intact, and filters stay quick and scannable.
            </p>
            <div className="space-y-12 md:space-y-16 mb-12">
              {SOLUTION_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-base md:text-lg font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                    {section.title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
                    {section.description}
                  </p>
                  <CaseStudyFigure src={section.media} alt={section.title} type={section.type} />
                </div>
              ))}
            </div>
            <CaseStudyCard title="How it supports user jobs">
              <ul className="space-y-3 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
            label="Outcome"
            sublabel="what it did"
            title="Light but Honest Outcomes"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">
                  Quantitative
                </h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We turned everything we learned into high-fidelity Figma prototypes and put them
                  back in front of users. The redesigned filtering interface{' '}
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    reduced time to locate specific transactions by approximately 15%
                  </span>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">
                  Qualitative
                </h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Users reported{' '}
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    feeling less overwhelmed and more confident
                  </span>{' '}
                  finding what they needed. The category-first approach matched their mental model,
                  so the feature felt intuitive rather than learned.
                </p>
              </div>
            </div>
          </CaseStudySection>

          {/* 07 · Team */}
          <CaseStudySection
            num="07"
            label="Team"
            sublabel="beyond the screens"
            title="Presenting at App Team Carolina Gala"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
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

          {/* 08 · Reflection */}
          <CaseStudySection
            num="08"
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
                  className="flex gap-4 items-start p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
                >
                  <span className="text-sm text-purple-600 dark:text-purple-400 pt-1 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {takeaway}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 09 · Next steps */}
          <CaseStudySection
            num="09"
            label="Next steps"
            sublabel="where it's going"
            title="Continuing to Refine Centible"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              I'm revamping the app's widgets so users can see their finances at a glance, and we're
              expanding marketing to grow fundraising for the app and the team. We keep refining
              Centible based on user feedback so it stays valuable for students!
            </p>
            <CaseStudyLink href="https://apps.apple.com/us/app/centible/id6443507950">
              Get Centible on the App Store!
            </CaseStudyLink>
          </CaseStudySection>
        </div>
      </CaseStudyLayout>
    </div>
  );
}
