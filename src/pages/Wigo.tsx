import { motion } from 'framer-motion';
import {
  CalendarClock,
  Users,
  MessagesSquare,
  MessageSquareDashed,
  EyeOff,
  Megaphone,
  BellOff,
} from 'lucide-react';
import { StickyShowcase } from '../components/StickyShowcase';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyCard,
  CaseStudyLayout,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

const META = [
  { label: 'Role', value: 'Solo Product Designer' },
  { label: 'Context', value: 'Final project for MEJO 581:\nUX Design and Usability, UNC' },
  { label: 'Timeline', value: '2 months' },
  { label: 'Tools', value: 'Figma, Figjam, UserTesting' },
  { label: 'Responsibilities', value: 'UX Research, Wireframing, Prototyping, Usability Testing' },
];

const USER_QUOTES = [
  'What slows it down usually is booking things. People say “I’ll see” or “let me think about it.” That kind of drags it on. So when people are kind of indecisive or they don’t really know yet, the plan kind of gets held up.',
  'We tend to let the person who’s the pickiest have the most opinion, because everyone else is a little less picky. But sometimes if it’s majority wants to do something and the picky person doesn’t, we kind of just override them.',
  'Maybe just having a reminder like “hey, you should go see your friends so you don’t isolate yourself” could be nice. People get busy, life gets busy, you sometimes forget to reach out to people, especially in college.',
];

const RESEARCH_TAKEAWAYS = [
  {
    title: 'Coordination, not choice, is the real friction',
    body: 'Neither participant struggled to think of something to do. Plans stalled in the stretch between having an idea and having everyone agreed to it.',
    icon: MessagesSquare,
  },
  {
    title: 'The loudest voice wins by default',
    body: 'The pickiest or most opinionated friend tends to steer the plan, while an easygoing majority quietly goes along with it.',
    icon: Users,
  },
  {
    title: 'People want to hang out more, but forget to reach out',
    body: 'Nobody described drifting from friends as a choice. It happens because life gets busy and no one initiates.',
    icon: CalendarClock,
  },
];

/* Four failure modes, and the two I actually designed against. Keeping the
   unsolved pair visible is the point: they are scope decisions, not oversights. */
const PAIN_POINTS = [
  {
    title: 'Silent group chats',
    body: 'Plans get thrown out as ideas, then die in the chat when no one responds fast enough.',
    icon: MessageSquareDashed,
    status: 'Designed against in V1',
    solved: true,
  },
  {
    title: 'No visibility into free time',
    body: 'Users have no way to see who is actually around without DMing each person individually.',
    icon: EyeOff,
    status: 'Designed against in V1',
    solved: true,
  },
  {
    title: 'Loudest voice wins',
    body: 'The most opinionated friend ends up steering the plan while easygoing majorities go along.',
    icon: Megaphone,
    status: 'Designed against in V1',
    solved: true,
  },
  {
    title: 'Forgetting to reach out',
    body: 'People want to hang out more, but life gets busy and weeks pass without anyone initiating.',
    icon: BellOff,
    status: 'Left out of V1',
    solved: false,
  },
];

const AUDIENCE = [
  'College students',
  'Roommates and dorm groups',
  'Long-distance friends trying to stay close',
  'Anyone who values in-person time',
];

const COMPETITORS = [
  {
    name: 'Howbout',
    logo: '/wigoAssets/HowBout.svg',
    points: [
      'Built around sharing calendars with friends',
      'Answers "what does your month look like" rather than "who is free right now"',
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

/* The positioning band: the same journey, with each product's coverage marked
   against it. The gap in the middle is the entire argument for Wigo. */
const JOURNEY_BAND = [
  'Want to hang out',
  'Who’s free?',
  'Agree on when',
  'Plan exists',
  'Show up',
];

const COVERAGE = [
  { name: 'Howbout', start: 1, span: 1, tone: 'muted' as const },
  { name: 'Wigo', start: 1, span: 3, tone: 'accent' as const },
  { name: 'Partiful', start: 3, span: 2, tone: 'muted' as const },
];

const SCOPE = [
  {
    tier: 'Core, V1',
    items: [
      'Share lightweight availability',
      'See which friends overlap',
      'Start a plan before every detail is decided',
      'Vote on when, one tap per person',
      'Confirm once enough people commit',
    ],
  },
  {
    tier: 'Secondary',
    items: [
      'Plan chat, once a plan already exists',
      'Saved and nearby spots as a fallback when a group is stuck',
    ],
  },
  {
    tier: 'Deliberately out',
    items: [
      'Discovery as a primary surface, because research said choice was not the problem',
      'Proactive re-engagement reminders, which need their own research before they ship',
      'Memories and photos, which solve documenting a hangout rather than reaching one',
    ],
  },
];

const FINAL_DESIGN_SECTIONS = [
  {
    title: 'Signal availability without starting a conversation',
    description:
      'Availability is a status, not a calendar. One tap says "I’m free," and friends see the overlap before anyone sends the first message.',
    video: '/wigoAssets/VidOne.mp4',
  },
  {
    title: 'Start a plan before deciding everything',
    description:
      'One decision at a time, each with a default. A rough plan can go out while the details are still open, so nobody needs a finished proposal to bring the group in.',
    video: '/wigoAssets/VidTwo.mp4',
  },
  {
    title: 'Make quiet preferences visible',
    description:
      'Everyone marks a preference on their own, so a quiet "In" weighs as much as the longest message in the chat. The plan carries its status on one screen.',
    video: '/wigoAssets/VidThree.mp4',
  },
  {
    title: 'Suggestions as a fallback, not a feed',
    description:
      'The part I would scope down. Saved and nearby spots break a tie once a group has already agreed to meet; the ranked feed and live map answer a question my participants never asked.',
    video: '/wigoAssets/VidFour.mp4',
  },
];

const TESTING_FINDINGS = [
  {
    finding: 'Plan creation was not discoverable',
    response:
      'The entry point was a floating button competing with a busy home screen. Both participants scanned past it and looked for something labelled.',
  },
  {
    finding: 'Voting gave no confirmation',
    response:
      'Selecting a time slot changed its state, but nothing confirmed that the choice had been submitted, so people re-tapped or backed out of the screen.',
  },
  {
    finding: 'The prototype itself created confusion',
    response:
      'This one was on me rather than on the design. The prototype had unfinished branches, and dead ends read as user error instead of missing screens.',
  },
];

const REFLECTIONS = [
  {
    heading: 'The bottleneck was never the idea, it was the agreement',
    body: 'I started out assuming groups needed better suggestions, and the interviews made it clear that people usually know what they want to do. What they cannot do is get five people to say yes in a reasonable amount of time, so almost every screen in Wigo is about shortening that gap rather than expanding the menu of options.',
  },
  {
    heading: 'Availability had to come before the plan',
    body: 'Both competitors start after a decision exists, which is why they leave the hardest part untouched. Putting a shared, low-commitment "I’m free" state ahead of plan creation is the one structural decision the rest of the product depends on.',
  },
  {
    heading: 'Designing for the easygoing majority is different from designing for the organiser',
    body: 'The person Wigo is built for is not the loudest in the chat. A one-tap In or Pass gives her the same weight as the friend with the strongest opinion, without asking her to argue for it.',
  },
  {
    heading: 'Prototype fidelity is part of the test',
    body: 'A third of my usability findings were really findings about my prototype. Next time I would map every branch a task can take and stub the dead ends before recruiting anyone, so the feedback is about the design instead of the gaps around it.',
  },
];

const LIMITATIONS = [
  'Two interviews and two usability sessions is a small base for a product thesis. It was enough to change my mind about what Wigo was, and not enough to call any of it validated. The next honest step is re-running the same reconstruction interview with a wider group to see whether coordination stays the bottleneck.',
  'I never designed the privacy model around availability, and it is the most obvious question the product raises: who sees that I am free, does it expire on its own, and can I share it with one group rather than all of them. Because availability is the foundation, that is a gap in the design rather than a detail.',
  'Re-engagement is the pain point I identified and did not solve. A participant asked for a nudge to see friends, and the distance between a useful prompt and a guilt trip is narrow enough that I would rather leave it out of V1 than guess at it.',
];

function CoverageRow({ name, start, span, tone }: (typeof COVERAGE)[number]) {
  return (
    <div className="grid grid-cols-5 items-center gap-2">
      <div
        className={`rounded-[8px] px-3 py-2 text-[14px] leading-5 text-center ${
          tone === 'accent'
            ? 'bg-[var(--csa)] text-white font-medium'
            : 'bg-neutral-900/[0.06] text-neutral-900/70'
        }`}
        style={{ gridColumnStart: start, gridColumnEnd: start + span }}
      >
        {name}
      </div>
    </div>
  );
}

export function Wigo() {
  return (
    <div
      className="min-h-screen bg-white text-neutral-900 pt-28 md:pt-36 pb-16 md:pb-24"
      data-accent="blue"
    >
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Making friend group planning easier"
          subtitle="Wigo helps friend groups turn “we should hang out” into an actual plan, combining lightweight availability with shared decision-making outside the chaos of a group chat."
          meta={META}
          cover={COVERS['wigo']}
          coverAlt="Wigo friend group planning app cover"
        />

        <div className="mt-10 md:mt-14">
          {/* 01 · Context */}
          <CaseStudySection
            num="01"
            label="Context"
            sublabel="the starting assumption"
            title="“We Should Hang Out Sometime”"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-6">
              Planning a casual hangout usually begins with one message and ends in dozens.
              Who&rsquo;s free? When? Where? Is everyone actually in? Somewhere in that thread the
              plan either survives or quietly stops being mentioned, and most of the time nobody
              decides to cancel it. It just never gets confirmed.
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55">
              I came into this assuming that was a discovery problem: friend groups default to the
              same three places, so give them better options and more will happen. That assumption
              shaped the concept I started with, and it is the thing the research took apart.
            </p>
          </CaseStudySection>

          {/* 02 · Research */}
          <CaseStudySection
            num="02"
            label="Research"
            sublabel="what changed my mind"
            title="I Expected a Discovery Problem and Found a Coordination One"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              I ran remote interviews with 2 college students, walking through their most recent
              group hangout message by message rather than asking what they would want in an app.
              Reconstructing a real plan surfaced friction people had stopped noticing, because
              coordinating over text is normal enough that nobody complains about it unprompted.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <CaseStudyFigure
                src="/wigoAssets/InterviewVidOne.svg"
                alt="Remote user interview session"
                bordered={false}
              />
              <CaseStudyFigure
                src="/wigoAssets/InterviewVidTwo.svg"
                alt="Remote user interview session"
                bordered={false}
              />
            </div>

            <p className="text-[17px] leading-7 text-neutral-900/85 mb-8">
              Neither participant had run out of ideas. Plans broke down because nobody knew who was
              actually available, people delayed committing, and one outspoken friend usually ended
              up deciding for everyone.
            </p>

            <h3 className="text-[17px] font-medium mb-5 text-neutral-900">In their words</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {USER_QUOTES.map((quote, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-4 pl-5 rounded-[10px] bg-neutral-900/[0.035] border-l-2 border-[var(--csa)]"
                >
                  <p className="text-[16px] leading-6 text-neutral-700 italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                </motion.div>
              ))}

              {/* Three quotes in a two-column grid leave one cell empty. The friend
                  group everyone is describing sits in it, decorative and sized to
                  read as breathing room rather than a fourth quote. */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden md:flex items-end justify-center pointer-events-none select-none"
              >
                <img
                  src="/wigoAssets/Characters.svg"
                  alt=""
                  className="w-full max-w-[230px] h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </div>

            <h3 className="text-[17px] font-medium mb-5 text-neutral-900">What came back</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {RESEARCH_TAKEAWAYS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <CaseStudyCard className="h-full">
                    <div className="w-9 h-9 rounded-[10px] bg-[var(--csa)]/10 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-[var(--csa)]" />
                    </div>
                    <h4 className="text-[16px] leading-6 font-medium text-neutral-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-[16px] leading-6 text-neutral-900/55">{item.body}</p>
                  </CaseStudyCard>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 03 · Pain points */}
          <CaseStudySection
            num="03"
            label="Pain Points"
            sublabel="and what i chose to solve"
            title="Four Ways a Hangout Dies, Two Worth Designing For"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Grouping the interviews left four failure modes. Three of them happen during active
              planning, which is where a product can intervene with a screen. The fourth happens
              before anyone opens anything, and I deliberately left it alone rather than guess at a
              solution.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {PAIN_POINTS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-5 rounded-[10px] bg-neutral-900/[0.035]"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-9 h-9 rounded-[10px] bg-[var(--csa)]/10 flex items-center justify-center flex-shrink-0">
                      <p.icon className="w-5 h-5 text-[var(--csa)]" />
                    </div>
                    <span
                      className={`font-label text-[11px] font-medium tracking-[0.5px] rounded-full px-2.5 py-1 ${
                        p.solved
                          ? 'bg-[var(--csa)]/10 text-[var(--csa)]'
                          : 'bg-neutral-900/[0.06] text-neutral-900/45'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-medium text-neutral-900 mb-2">{p.title}</h3>
                  <p className="text-[16px] leading-6 text-neutral-900/55">{p.body}</p>
                </motion.div>
              ))}
            </div>
            <CaseStudyCard title="Who Wigo is for">
              <p className="text-[16px] leading-6 text-neutral-900/55 mb-4">
                Friend groups who want to hang out more but cannot seem to get past the group chat.
              </p>
              <div className="flex flex-wrap gap-2">
                {AUDIENCE.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-neutral-900/[0.05] px-3 py-1.5 text-[15px] text-neutral-900/70"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </CaseStudyCard>
          </CaseStudySection>

          {/* 04 · Persona */}
          <CaseStudySection
            num="04"
            label="Persona"
            sublabel="the behaviour in one person"
            title="Putting the Pattern Into One Journey"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              I synthesised what I heard into Sophia. She is not a participant: she is the composite
              of the two people I spoke to, built so the rest of the project had one consistent
              person to design against. The useful thing about her is not her biography, it is that
              she is the easygoing majority rather than the organiser, and every design decision
              below is answerable to whether it helps her.
            </p>
            <CaseStudyFigure
              src="/wigoAssets/SophiaPersona.svg"
              alt="Sophia’s user persona: goals, frustrations, motivations and app usage"
              bordered={false}
              className="mb-10"
            />

            <h3 className="text-[17px] font-medium mb-3 text-neutral-900">
              Sophia&rsquo;s current experience
            </h3>
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-6">
              Mapping her journey showed an arc rather than a single broken step. She begins
              willing, spends most of the plan doing manual coordination one message at a time, and
              finishes with a smaller hangout than she wanted and the quiet sense that organising it
              was nobody&rsquo;s job but hers.
            </p>
            <CaseStudyFigure
              src="/wigoAssets/SophiaJourneyBefore.svg"
              alt="Journey map of Sophia’s current planning experience"
              bordered={false}
            />
          </CaseStudySection>

          {/* 05 · Competitors */}
          <CaseStudySection
            num="05"
            label="Competitors"
            sublabel="mapping the field"
            title="Existing Tools Begin Too Late"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Group planning is not an unserved market, so I looked at the two products my
              participants actually named. Both are good at what they do, and both start at a point
              in the journey Sophia never reaches.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {COMPETITORS.map((c) => (
                <CaseStudyCard key={c.name} className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={c.logo}
                      alt={`${c.name} app icon`}
                      className="w-12 h-12 rounded-[12px]"
                      loading="lazy"
                      decoding="async"
                    />
                    <h3 className="text-[17px] font-medium text-neutral-900">{c.name}</h3>
                  </div>
                  <ul className="space-y-2 text-[16px] leading-6 text-neutral-900/55">
                    {c.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="text-[var(--csa)] mt-0.5" aria-hidden>
                          •
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CaseStudyCard>
              ))}
            </div>

            {/* The same journey with each product's coverage laid over it. */}
            <div className="rounded-[10px] bg-neutral-900/[0.035] p-5 overflow-x-auto">
              <div className="min-w-[520px]">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {JOURNEY_BAND.map((stage) => (
                    <p
                      key={stage}
                      className="font-label text-[12px] font-medium tracking-[0.5px] text-neutral-900/45 text-center"
                    >
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
            <p className="text-[16px] leading-6 text-neutral-900/55 mt-8">
              The gap between them is the whole opportunity: nothing covers the stretch between
              &ldquo;I&rsquo;m free later&rdquo; and &ldquo;we have a plan.&rdquo; That stretch is
              where group chats go quiet.
            </p>
          </CaseStudySection>

          {/* 06 · Problem */}
          <CaseStudySection
            num="06"
            label="Problem"
            sublabel="the real design challenge"
            title="The Question I Designed Against"
          >
            <p className="text-[17px] leading-7 text-neutral-900/85 mb-6">
              How might we help friend groups move from &ldquo;who&rsquo;s free?&rdquo; to a
              confirmed plan with less back-and-forth?
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55">
              My first version of this question was only about the decision, which turned out to be
              too narrow: it covered voting but not the two steps on either side of it, knowing who
              is around and knowing that a plan is actually on. Widening the question to the whole
              stretch is what made availability part of the product rather than a feature bolted on
              beside it.
            </p>
          </CaseStudySection>

          {/* 07 · Architecture */}
          <CaseStudySection
            num="07"
            label="Architecture"
            sublabel="the structural decision"
            title="Availability Had to Come Before the Plan"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Most event tools begin at the plan and treat availability as something you resolve
              afterwards, by asking. That ordering is what pushes coordination back into the group
              chat. Inverting it is the one structural decision the rest of Wigo depends on.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <CaseStudyCard>
                <p className="font-label text-[12px] font-medium tracking-[0.7px] text-neutral-900/45 mb-3">
                  Traditional event tools
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {['Plan', 'Invite', 'Chase replies'].map((step, i, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-[8px] bg-neutral-900/[0.06] px-3 py-2 text-[15px] text-neutral-900/70">
                        {step}
                      </span>
                      {i < arr.length - 1 && (
                        <span aria-hidden className="text-neutral-900/30">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CaseStudyCard>
              <CaseStudyCard>
                <p className="font-label text-[12px] font-medium tracking-[0.7px] text-[var(--csa)] mb-3">
                  Wigo
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {['Availability', 'Plan together', 'Confirm'].map((step, i, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-[8px] bg-[var(--csa)]/10 px-3 py-2 text-[15px] text-neutral-900/80">
                        {step}
                      </span>
                      {i < arr.length - 1 && (
                        <span aria-hidden className="text-neutral-900/30">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CaseStudyCard>
            </div>

            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Mapping the full architecture was mostly a way of checking that ordering held. A plan
              that starts without knowing who is free inherits the exact problem I was trying to
              remove, so availability sits upstream of plan creation, the plan itself, and
              everything else.
            </p>
            <CaseStudyFigure
              src="/wigoAssets/InformationArch.svg"
              alt="Wigo information architecture and user flow"
              bordered={false}
              rounded={false}
              className="mb-10"
            />

            <h3 className="text-[17px] font-medium mb-3 text-neutral-900">
              What the journey becomes
            </h3>
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-6">
              Rewriting Sophia&rsquo;s journey against that ordering kept the product honest: if a
              stage did not remove work she is doing manually today, it had no reason to exist.
            </p>
            <CaseStudyFigure
              src="/wigoAssets/SophiaJourneyAfter.svg"
              alt="Journey map of Sophia’s redesigned planning experience"
              bordered={false}
            />
          </CaseStudySection>

          {/* 08 · Scope */}
          <CaseStudySection
            num="08"
            label="Scope"
            sublabel="keeping it focused"
            title="What Made V1, and What My Own Research Ruled Out"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              The concept generated more surfaces than the problem needed: availability, plan
              creation, voting, chat, discovery, a map, memories. Research had already told me that
              choice was not the bottleneck, which gave me permission not to build a discovery
              product. Using that permission was the harder decision, and the more useful one.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {SCOPE.map((group) => (
                <div key={group.tier} className="p-5 rounded-[10px] bg-neutral-900/[0.035]">
                  <p className="font-label text-[12px] font-medium tracking-[0.7px] text-[var(--csa)] mb-3">
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
          </CaseStudySection>

          {/* 09 · Sketches */}
          <CaseStudySection
            num="09"
            label="Sketches"
            sublabel="lo-fi exploration"
            title="Sketching the Core Screens"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Sketching was mostly an argument about the home screen. Availability, upcoming plans
              and discovery all wanted the top of it, and early versions that led with discovery
              made Wigo feel like another recommendations app. Putting the free-friends strip
              directly under the greeting settled it, because that is the one thing nothing else on
              a phone can tell you. In hindsight the same logic should have gone one step further
              and questioned whether discovery needed to be a primary destination at all.
            </p>
            <CaseStudyFigure src="/wigoAssets/Sketch.svg" alt="Early Wigo sketches" />
          </CaseStudySection>

          {/* 10 · Style guide */}
          <CaseStudySection
            num="10"
            label="Style Guide"
            sublabel="visual language"
            title="Social, Not Administrative"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              These are hangouts, not meetings. I kept the scheduling surfaces visually lightweight
              and informal so that coordinating with friends reads as social rather than clerical,
              and let colour do real work in the places where state matters: who is free, what a
              plan&rsquo;s status is, whether you are in.
            </p>
            {/* Tall portrait board — held to a readable width rather than run to
                the full column, where it would tower over everything around it. */}
            <CaseStudyFigure
              src="/wigoAssets/StyleGuide.svg"
              alt="Wigo style guide"
              className="max-w-[420px] mx-auto"
            />
          </CaseStudySection>

          {/* 11 · Final designs */}
          <CaseStudySection
            num="11"
            label="Final Designs"
            sublabel="what i made"
            title="Introducing Wigo"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              Every screen answers to the same idea: shorten the distance between wanting to hang
              out and having a plan everyone agreed to, and let the quietest person in the group
              carry as much weight as the loudest.
            </p>
            <StickyShowcase sections={FINAL_DESIGN_SECTIONS} />
          </CaseStudySection>

          {/* 12 · Usability testing */}
          <CaseStudySection
            num="12"
            label="Testing"
            sublabel="what broke"
            title="Testing the Core Loop With 2 Participants"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 mb-8">
              I ran task-based sessions on the prototype: share your availability, start a plan,
              vote on a time. Testing validated the overall flow and exposed two interaction-level
              problems, plus one that belonged to my prototype rather than my design.
            </p>
            <div className="space-y-4">
              {TESTING_FINDINGS.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-5 rounded-[10px] bg-neutral-900/[0.035]"
                >
                  <h3 className="text-[17px] font-medium text-neutral-900 mb-2">{f.finding}</h3>
                  <p className="text-[16px] leading-6 text-neutral-900/55">{f.response}</p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 13 · Changes */}
          <CaseStudySection
            num="13"
            label="Iterations"
            sublabel="what changed"
            title="Clarity Mattered More Than Fewer Taps"
          >
            <div className="space-y-12 md:space-y-16">
              <div>
                <h3 className="text-[17px] font-medium mb-3 text-neutral-900">
                  A labelled way in, at the top of the home screen
                </h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 mb-5">
                  The floating button was replaced with two explicit cards, New plan and Set status,
                  sitting above the fold. It costs vertical space that the availability strip used
                  to own, which is a fair trade: participants had been scanning for a label, and a
                  home screen that hides its primary action is not a home screen doing its job.
                </p>
                <CaseStudyFigure
                  src="/wigoAssets/ChangesMadeFirst.svg"
                  alt="Before and after of the Wigo home screen with a clearer plan creation entry point"
                  bordered={false}
                  className="max-w-[600px] mx-auto"
                />
              </div>
              <div>
                <h3 className="text-[17px] font-medium mb-3 text-neutral-900">
                  An explicit submit for votes
                </h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 mb-5">
                  Voting had been auto-saving, which is technically fewer taps and practically
                  worse: people could not tell that anything had happened, so they re-tapped or left
                  the screen unsure. Adding a submit action gives the tap a confirmation to land on,
                  and it is the clearest reminder from this project that silent success is not
                  success.
                </p>
                <CaseStudyFigure
                  src="/wigoAssets/ChangesMadeSecond.svg"
                  alt="Before and after of the Wigo plan voting screen with an explicit submit button"
                  bordered={false}
                  className="max-w-[600px] mx-auto"
                />
              </div>
            </div>
          </CaseStudySection>

          {/* 14 · Reflection */}
          <CaseStudySection
            num="14"
            label="Reflection"
            sublabel="what i learned"
            title="What I Took Away"
          >
            <div className="space-y-4 mb-12">
              {REFLECTIONS.map((takeaway, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 items-start p-5 rounded-[10px] bg-neutral-900/[0.035]"
                >
                  <span className="text-sm text-[var(--csa)] pt-1 flex-shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="text-[17px] font-medium text-neutral-900 mb-2">
                      {takeaway.heading}
                    </h3>
                    <p className="text-[16px] leading-6 text-neutral-900/70">{takeaway.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="text-[17px] font-medium mb-4 text-neutral-900">
              Where this project is thin
            </h3>
            <div className="space-y-4">
              {LIMITATIONS.map((item, i) => (
                <p key={i} className="text-[16px] leading-6 text-neutral-900/55">
                  {item}
                </p>
              ))}
            </div>
          </CaseStudySection>
        </div>
      </CaseStudyLayout>
    </div>
  );
}
