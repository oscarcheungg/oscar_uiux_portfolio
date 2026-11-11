import { CalendarClock, Users, MessagesSquare } from 'lucide-react';
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
  CaseStudyDuo,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

/* Wigo, told for a skim: a TL;DR up front, then seven short sections that each
   lead with a visual — problem, research, approach, design, iterations,
   reflection. */

const META = [
  { label: 'Role', value: 'Solo Product Designer' },
  { label: 'Context', value: 'MEJO 581: UX Design\nand Usability, UNC' },
  { label: 'Timeline', value: '2 months' },
  { label: 'Tools', value: 'Figma, FigJam, UserTesting' },
];

const IMPACT = [
  {
    title: 'Reframed the problem',
    body: 'Interviews showed plans stall on agreeing, not on ideas, so I designed for coordination instead of discovery.',
  },
  {
    title: 'Availability before the plan',
    body: 'A one-tap “I’m free” status comes first, so friends see who overlaps before anyone sends a message.',
  },
  {
    title: 'A quiet vote counts',
    body: 'Everyone answers In or Pass on their own, so the easygoing majority weighs as much as the loudest friend.',
  },
  {
    title: 'Tested and fixed',
    body: '2 usability sessions surfaced 2 interaction problems; both were redesigned before the final prototype.',
  },
];

const RESEARCH_TAKEAWAYS = [
  {
    title: 'Coordination, not choice, is the friction',
    body: 'Nobody struggled to think of something to do. Plans stalled between the idea and everyone agreeing.',
    icon: MessagesSquare,
  },
  {
    title: 'The loudest voice wins by default',
    body: 'The pickiest friend steers the plan while an easygoing majority quietly goes along.',
    icon: Users,
  },
  {
    title: 'People forget to reach out',
    body: 'Drifting from friends isn’t a choice. Life gets busy and no one initiates.',
    icon: CalendarClock,
  },
];

/* The same journey, with each product's coverage laid over it. The gap in the
   middle is the argument for Wigo. */
const JOURNEY_BAND = ['Want to hang out', 'Who’s free?', 'Agree on when', 'Plan exists', 'Show up'];

const COMPETITORS = [
  {
    name: 'Howbout',
    logo: '/wigoAssets/HowBout.svg',
    points: [
      'Built around sharing calendars with friends',
      'Answers “what does your month look like” rather than “who is free right now”',
      'No room for the spontaneous window, which is when most college hangouts actually happen',
    ],
  },
  {
    name: 'Partiful',
    logo: '/wigoAssets/Partiful.svg',
    points: [
      'Excellent once a plan exists, but it starts at the invite',
      'You can only bring people in after you have already decided what the plan is',
      'Leaves untouched the exact step my participants were getting stuck on',
    ],
  },
];

const COVERAGE = [
  { name: 'Howbout', start: 1, span: 1, accent: false },
  { name: 'Wigo', start: 1, span: 3, accent: true },
  { name: 'Partiful', start: 3, span: 2, accent: false },
];

const SCOPE = [
  {
    tier: 'In V1',
    items: ['Share availability', 'See who overlaps', 'Start a rough plan', 'Vote on when', 'Confirm when enough say in'],
  },
  { tier: 'Later', items: ['Plan chat', 'Saved and nearby spots as a tiebreaker'] },
  {
    tier: 'Left out',
    items: ['Discovery feed (choice wasn’t the problem)', 'Reminders to reach out (need their own research)'],
  },
];

const FINAL_DESIGN_SECTIONS = [
  {
    title: 'Signal availability without starting a conversation',
    description:
      'Availability is a status, not a calendar. One tap says “I’m free,” and friends see the overlap before anyone sends the first message.',
    video: '/wigoAssets/VidOne.mp4',
  },
  {
    title: 'Start a plan before deciding everything',
    description:
      'One decision at a time, each with a default, so a rough plan can go out while the details are still open.',
    video: '/wigoAssets/VidTwo.mp4',
  },
  {
    title: 'Make quiet preferences visible',
    description:
      'Everyone marks a preference on their own, so a quiet “In” weighs as much as the longest message in the chat.',
    video: '/wigoAssets/VidThree.mp4',
  },
  {
    title: 'Suggestions as a fallback, not a feed',
    description:
      'Saved and nearby spots break a tie once a group has already agreed to meet.',
    video: '/wigoAssets/VidFour.mp4',
  },
];

const REFLECTIONS = [
  {
    title: 'The bottleneck was the agreement, not the idea',
    body: 'Almost every screen shortens the gap between “we should hang out” and five people saying yes.',
  },
  {
    title: 'Availability had to come first',
    body: 'Competitors start after a decision exists. Putting “I’m free” ahead of the plan is the decision the rest depends on.',
  },
  {
    title: 'Prototype fidelity is part of the test',
    body: 'A third of my findings were about prototype dead ends. Next time I’d stub every branch before testing.',
  },
];

function CoverageRow({ name, start, span, accent }: (typeof COVERAGE)[number]) {
  return (
    <div className="grid grid-cols-5 items-center gap-2">
      <div
        className={`rounded-[8px] px-3 py-2 text-[14px] leading-5 text-center ${
          accent ? 'bg-[var(--csa)] text-white font-medium' : 'bg-neutral-900/[0.06] text-neutral-900/70'
        }`}
        style={{ gridColumnStart: start, gridColumnEnd: start + span }}
      >
        {name}
      </div>
    </div>
  );
}

function Flow({ label, steps, accent }: { label: string; steps: string[]; accent?: boolean }) {
  return (
    <CaseStudyCard>
      <p className={`cs-tag ${accent ? '' : 'cs-tag--muted'}`}>{label}</p>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className={`rounded-[8px] px-3 py-2 text-[14px] ${
                accent ? 'bg-[var(--csa)]/10 text-neutral-900/80' : 'bg-neutral-900/[0.06] text-neutral-900/70'
              }`}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-neutral-900/30">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </CaseStudyCard>
  );
}

export function Wigo() {
  return (
    <div className="cs-page" data-accent="wigo">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Making friend group planning easier"
          subtitle="Wigo helps friend groups turn “we should hang out” into an actual plan, with lightweight availability and shared decisions outside the group chat."
          meta={META}
          cover={COVERS['wigo']}
          coverAlt="Wigo friend group planning app cover"
        />

        <CaseStudyTLDR
          summary={[
            'Planning a hangout starts with one message and ends in dozens. Who’s free? When? Is everyone in? Most plans never get cancelled; they just never get confirmed.',
            'I expected a discovery problem. Interviews showed a coordination one, so I designed Wigo around availability and one-tap agreement, then tested and fixed the core loop.',
          ]}
          impact={IMPACT}
        />

        {/* 01 · Problem */}
        <CaseStudySection num="01" label="The group chat" title="Plans die between the idea and the yes">
          <CaseStudyCallout>
            How might we help friend groups move from “who’s free?” to a confirmed plan with less
            back-and-forth?
          </CaseStudyCallout>
          <p className="mb-4">
            The closest tools each start too late, before or after the step where plans actually
            stall.
          </p>
          <div className="grid md:grid-cols-2 gap-2 mb-4">
            {COMPETITORS.map((c) => (
              <CaseStudyCard key={c.name} className="h-full">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={c.logo}
                    alt={`${c.name} app icon`}
                    className="w-9 h-9 rounded-[10px]"
                    loading="lazy"
                    decoding="async"
                  />
                  <h4>{c.name}</h4>
                </div>
                <ul className="space-y-1">
                  {c.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="text-[var(--csa)]" aria-hidden>
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CaseStudyCard>
            ))}
          </div>
          <div className="rounded-[12px] bg-neutral-900/[0.035] p-5 overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-5 gap-2 mb-4">
                {JOURNEY_BAND.map((stage) => (
                  <p key={stage} className="text-[12px] text-neutral-900/45 text-center">
                    {stage}
                  </p>
                ))}
              </div>
              <div className="space-y-2">
                {COVERAGE.map((c) => (
                  <CoverageRow key={c.name} {...c} />
                ))}
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 02 · Research */}
        <CaseStudySection num="02" label="Where I was wrong" title="I expected a discovery problem and found a coordination one">
          <p className="mb-4">
            I walked 2 college students through their last group hangout, message by message, to
            surface friction they’d stopped noticing.
          </p>
          <div className="grid gap-4 mb-6">
            <CaseStudyFigure src="/wigoAssets/InterviewVidOne.svg" alt="Remote user interview, participant 1" bordered={false} className="max-w-[640px]" />
            <CaseStudyFigure src="/wigoAssets/InterviewVidTwo.svg" alt="Remote user interview, participant 2" bordered={false} className="max-w-[640px]" />
          </div>
          <div className="grid md:grid-cols-3 gap-2 mb-8">
            {RESEARCH_TAKEAWAYS.map((item) => (
              <CaseStudyCard key={item.title} className="h-full">
                <div className="w-9 h-9 rounded-[10px] bg-[var(--csa)]/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-[var(--csa)]" />
                </div>
                <h4>{item.title}</h4>
                <p className="mt-1">{item.body}</p>
              </CaseStudyCard>
            ))}
          </div>
          <p className="mb-4">
            I folded both participants into Sofia: the easygoing friend, not the organiser. Every
            decision below answers to whether it helps her.
          </p>
          <CaseStudyFigure
            src="/wigoAssets/SophiaPersona.svg"
            alt="Sofia’s user persona: goals, frustrations, motivations and app usage"
            bordered={false}
            className="max-w-[720px]"
            zoomable
          />
          <p className="mt-8 mb-4">
            Her planning today, step by step: each one costs a little more, until the plan happens
            smaller than she hoped.
          </p>
          <CaseStudyFigure
            src="/wigoAssets/SophiaJourneyBefore.svg"
            alt="Journey map of Sofia’s current planning experience"
            bordered={false}
          />
        </CaseStudySection>

        {/* 03 · Approach */}
        <CaseStudySection num="03" label="Flipping the order" title="Availability comes before the plan">
          <p className="mb-4">
            Event tools start at the plan and chase availability afterwards, which pushes
            coordination back into the chat. Wigo flips the order.
          </p>
          <div className="grid md:grid-cols-2 gap-2 mb-8">
            <Flow label="Traditional event tools" steps={['Plan', 'Invite', 'Chase replies']} />
            <Flow label="Wigo" steps={['Availability', 'Plan together', 'Confirm']} accent />
          </div>
          <p className="mb-4">The same weekend with Wigo: she sees who’s free before sending a single text.</p>
          <CaseStudyFigure
            src="/wigoAssets/SophiaJourneyAfter.svg"
            alt="Journey map of Sofia’s planning experience with Wigo"
            bordered={false}
            className="mb-8"
          />
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
        </CaseStudySection>

        {/* 04 · Design */}
        <CaseStudySection num="04" label="Building Wigo" title="Introducing Wigo">
          <CaseStudyDuo
            zoomable
            tag="Sketches & style guide"
            caption="Sketches put the free-friends strip at the top of the home screen. The style guide keeps it social, not administrative: colour only where state matters."
            items={[
              { src: '/wigoAssets/Sketch.svg', alt: 'Early Wigo sketches' },
              { src: '/wigoAssets/StyleGuide.svg', alt: 'Wigo style guide' },
            ]}
          />
          <div className="mt-10">
            <StickyShowcase sections={FINAL_DESIGN_SECTIONS} />
          </div>
        </CaseStudySection>

        {/* 05 · Iterations */}
        <CaseStudySection num="05" label="What broke" title="Clarity mattered more than fewer taps">
          <p className="mb-2">
            I tested the core loop with 2 participants: share availability, start a plan, vote on a
            time. Two problems came back, and both changed.
          </p>
          <CaseStudyPair
            bare
            items={[
              {
                src: '/wigoAssets/ChangesMadeFirst.svg',
                alt: 'Before and after of the Wigo home screen with a clearer plan creation entry point',
                tag: 'Plan creation was hidden',
                caption: 'A floating button became two labelled cards, New plan and Set status, above the fold.',
              },
              {
                src: '/wigoAssets/ChangesMadeSecond.svg',
                alt: 'Before and after of the Wigo plan voting screen with an explicit submit button',
                tag: 'Votes gave no confirmation',
                caption: 'Auto-save became an explicit submit, so every vote lands on a clear confirmation.',
              },
            ]}
          />
        </CaseStudySection>

        {/* 06 · Reflection */}
        <CaseStudySection num="06" label="Looking back" title="What I took away">
          <CaseStudyPoints items={REFLECTIONS} />
          <p className="mt-6 text-neutral-900/55">
            <span className="text-neutral-900">Next:</span> re-run the interviews with a wider group,
            design the privacy rules for availability, and research reminders to reach out.
          </p>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
