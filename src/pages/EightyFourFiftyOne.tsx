import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  TrendingUp,
  MousePointerClick,
  Target,
  Flag,
  Rocket,
  Sparkles,
  Lock,
  SlidersHorizontal,
  ListOrdered,
} from 'lucide-react';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLayout,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';
import ImageCarousel from '../components/ImageCarousel';

const META = [
  { label: 'Role', value: 'Product Design Intern' },
  { label: 'Team', value: 'Media Insights\nand Reporting' },
  { label: 'Timeline', value: '10 weeks' },
  { label: 'Tools', value: 'Figma, FigJam,\nFigma Make, Figma Agent,\nMural, Confluence' },
];

const USABILITY_FINDINGS = [
  {
    title: 'Estimated impact is the #1 trust driver',
    body: 'Every participant called forecasted impact the most critical element; without it, a recommendation is just asking clients to spend more money.',
    quote:
      "Without the expected impact... you're pretty much just telling them to increase their bid... I definitely would not use this.",
    icon: TrendingUp,
  },
  {
    title: 'Recommendations must live at the point of action',
    body: 'Participants wanted a multi-placement strategy: homepage for visibility, campaign and ad group pages near the action, and a dedicated recommendations tab.',
    quote: "The greatest benefit, I'd want to see it in multiple places.",
    icon: MousePointerClick,
  },
  {
    title: 'Specificity at the ad group / UPC level is essential',
    body: 'Averages were not actionable; participants needed current versus recommended values tied to a specific campaign, ad group, or UPC.',
    quote:
      'If there was like maybe at the top somewhere, if it specified which specific campaign or which specific ad group this is referring to, that would be helpful.',
    icon: Target,
  },
  {
    title: 'Users need flexibility and control when applying',
    body: 'No one wanted binary accept-or-reject; participants asked to adjust values, confirm before applying, and apply selectively.',
    quote: 'Maybe there could be a manual option, and a do-it-for-me option.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Prioritization and filtering make or break scale',
    body: 'Participants wanted sorting by impact and urgency, severity flags for underspending, and filters to manage recommendations at scale.',
    quote: 'Having them ordered by like most needed or most impact.',
    icon: ListOrdered,
  },
];

const ROADMAP = [
  {
    when: 'Now',
    title: 'Validate the Experience',
    body: 'Establish what information a recommendation must carry, test the future-state prototype against it, and define the data and model requirements those patterns imply.',
    icon: Flag,
  },
  {
    when: 'Next',
    title: 'Prove Recommendation Value',
    body: 'Build the forecasting methodology that makes estimated impact trustworthy, then ship the first recommendation types on top of it.',
    icon: Rocket,
  },
  {
    when: 'Later',
    title: 'Scale Automation',
    body: 'One-click apply, a personalised Ad Assistant, and measurement through campaign performance and SUS score.',
    icon: Sparkles,
  },
];

const MATRIX_PLATFORMS = ['Kroger Ad Platform', 'Amazon Ads', 'Walmart Connect', 'Instacart Ads', 'Google Ads'];

type MatrixSupport = 'yes' | 'no' | 'unknown';

const COMPETITIVE_MATRIX: { feature: string; support: MatrixSupport[] }[] = [
  { feature: 'Bidding / Budget Optimization', support: ['no', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Proactive Inflight Alerts', support: ['no', 'yes', 'yes', 'unknown', 'yes'] },
  { feature: 'Recommendation Explainability', support: ['no', 'yes', 'yes', 'unknown', 'yes'] },
  { feature: 'Advertiser-facing Conversational / GenAI Assistant', support: ['yes', 'yes', 'yes', 'no', 'yes'] },
  { feature: 'One-click Recommendation Apply', support: ['no', 'yes', 'yes', 'unknown', 'yes'] },
];

const MATRIX_CELL_BG: Record<MatrixSupport, string> = {
  yes: 'bg-green-50 dark:bg-green-500/10',
  no: 'bg-red-50 dark:bg-red-500/10',
  unknown: 'bg-neutral-50 dark:bg-neutral-900',
};

function MatrixMark({ support }: { support: MatrixSupport }) {
  if (support === 'yes') {
    return <Check className="w-4 h-4 mx-auto text-green-600 dark:text-green-400" aria-label="Supported" />;
  }
  if (support === 'no') {
    return <X className="w-4 h-4 mx-auto text-red-500 dark:text-red-400" aria-label="Not supported" />;
  }
  return (
    <span className="text-sm text-neutral-400 dark:text-neutral-500" aria-label="Unclear">
      ?
    </span>
  );
}

function CompetitiveMatrix() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto rounded-[10px] bg-neutral-900/[0.035] dark:bg-neutral-100/[0.06]"
    >
      <table className="w-full min-w-[680px] text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-800">
            <th
              scope="col"
              className="text-left px-6 py-5 font-label text-[12px] font-medium tracking-[0.7px] font-medium text-neutral-500 dark:text-neutral-500"
            >
              AI Feature
            </th>
            {MATRIX_PLATFORMS.map((platform, i) => (
              <th
                key={platform}
                scope="col"
                className={`px-4 py-5 text-center font-label text-[12px] font-medium tracking-[0.7px] font-medium ${
                  i === 0
                    ? 'text-[var(--csa)] dark:text-[var(--csa-dark)] bg-[#8451EC]/5 dark:bg-[#8451EC]/10'
                    : 'text-neutral-500 dark:text-neutral-500'
                }`}
              >
                {platform}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPETITIVE_MATRIX.map((row, rowIndex) => (
            <tr
              key={row.feature}
              className={
                rowIndex > 0 ? 'border-t border-neutral-100 dark:border-neutral-900' : ''
              }
            >
              <th
                scope="row"
                className="text-left px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100 leading-snug"
              >
                {row.feature}
              </th>
              {row.support.map((support, i) => (
                <td
                  key={i}
                  className={`px-4 py-5 text-center border-l border-white dark:border-neutral-950 ${MATRIX_CELL_BG[support]}`}
                >
                  <MatrixMark support={support} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

const CASE_STUDY_PASSWORD = 'meridian8451';
const UNLOCK_KEY = 'cs-8451-unlocked';

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [attempt, setAttempt] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (attempt.trim().toLowerCase() === CASE_STUDY_PASSWORD) {
      sessionStorage.setItem(UNLOCK_KEY, '1');
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-14 md:mt-20 w-full text-center p-8 md:p-12"
    >
      <Lock className="w-5 h-5 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
      <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
        hello! this case study is password-protected. reach out if you are interested.
      </p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="password"
          value={attempt}
          onChange={(e) => {
            setAttempt(e.target.value);
            setError(false);
          }}
          placeholder="Enter password"
          aria-label="Case study password"
          className="px-4 py-2.5 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-[var(--csa)] dark:focus:border-[var(--csa-dark)] transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2.5 text-sm bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 rounded-full border border-neutral-900 dark:border-neutral-50 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 touch-manipulation"
        >
          unlock
        </button>
      </form>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-4">
          That's not it, but feel free to email me!
        </p>
      )}
    </motion.div>
  );
}

export function EightyFourFiftyOne() {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem(UNLOCK_KEY) === '1'
  );

  return (
    <div
      className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-28 md:pt-36 pb-16 md:pb-24"
      data-accent="8451"
    >
      <CaseStudyLayout key={unlocked ? 'unlocked' : 'locked'}>
        <CaseStudyHeader
          title="Designing AI Insights & Recommendations"
          subtitle="Kroger Ad Platform relied heavily on manual campaign optimization. Over 10 weeks at 84.51°, I explored how actionable AI recommendations could help advertisers get from performance data to a decision, then turned what testing taught me into reusable patterns in the Meridian design system."
          meta={META}
          cover={COVERS['8451']}
          coverAlt="84.51° AI insights and recommendations cover"
        />

        <CaseStudyFigure
          bordered={false}
          src="/8451Assets/homepageintro.svg"
          alt="KAP homepage with AI recommendations concept"
          className="mt-6 max-w-3xl mx-auto"
        />

        {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}

        {unlocked && (
        <div className="mt-8">
          {/* 01 · Problem */}
          <CaseStudySection
            num="01"
            label="The Problem"
            sublabel="why this matters"
            title="Users Have the Data, But Not the Direction"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              KAP surfaces plenty of performance data but no direction on what to do with it.
              Client success managers pull and verify every recommendation by hand; media buyers
              then apply each change one at a time. Insight and action sit in two places, joined by
              a person doing the work manually.
            </p>
            <p className="text-[17px] leading-7 text-neutral-900/85 dark:text-neutral-100/85 mb-8">
              How might we turn campaign performance data into recommendations advertisers can
              understand, trust, and act on?
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              My scope: the recommendation experience end to end, from opportunity through
              usability testing to design-system documentation, with product, engineering and data
              science on feasibility.
            </p>
            <CaseStudyFigure
              bordered={false}
              src="/8451Assets/Workflow.png"
              alt="Current-state workflow: every step is manual"
              className="max-w-2xl mx-auto"
            />
          </CaseStudySection>

          {/* 02 · Research */}
          <CaseStudySection
            num="02"
            label="Research & Synthesis"
            sublabel="what the market does"
            title="Benchmarking 10+ Advertising Platforms"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I audited how the industry handles AI insights across Amazon Ads, Walmart Connect,
              Instacart Ads, Google Ads, Koddi, TikTok Ads Manager and more, annotating every
              recommendation pattern, entry point and interaction.
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              The matrix maps an opportunity space, not a requirements list: which patterns
              advertisers are already trained on, and how differently platforms handle context,
              explanation and control. Which of those belonged in KAP was a question for our own
              research.
            </p>
            <CompetitiveMatrix />
          </CaseStudySection>

          {/* 03 · Journey mapping */}
          <CaseStudySection
            num="03"
            label="Journey Mapping"
            sublabel="where it hurts"
            title="Finding Friction Points Within the User Journey"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-10">
              Next: where would it matter most for our users? I consolidated past research with
              client success manager and media buyer feedback to map the journey from planning to
              performance evaluation, flagging every moment where insight failed to become action.
              Two screens kept surfacing, and mapping them gave each surface a job.
            </p>
            <ul className="mb-10 space-y-2 text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Homepage:
                </span>{' '}
                tell me what deserves attention
              </li>
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Campaigns:
                </span>{' '}
                show me where the problem is
              </li>
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Recommendation:
                </span>{' '}
                tell me why it is worth acting on
              </li>
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Apply:
                </span>{' '}
                let me act without giving up control
              </li>
            </ul>

            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                The homepage users skip past
              </h3>
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
                The homepage is the first screen every user lands on, and the first one most of them
                skip. It reports totals and a performance chart, but offers no campaign-specific
                action to take, so users scroll straight past it on the way to somewhere more
                useful.
              </p>
              <div className="grid md:grid-cols-[3fr,2fr] gap-6 md:gap-10 items-center">
                <CaseStudyFigure
                  bordered={false}
                  src="/8451Assets/Homepage.png"
                  alt="KAP homepage with performance overview"
                />
                <CaseStudyFigure
                  bordered={false}
                  src="/8451Assets/userQuote.png"
                  alt='User quote: "I usually skip right over the homepage and I don&apos;t do anything from there."'
                  className="w-full max-w-md mx-auto md:mx-0"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                A campaigns page with no signals
              </h3>
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
                The campaigns page is where the real work starts, and it gives no signal about where
                to look. Every row reads identically no matter how a campaign is performing, so
                spotting the one that needs attention means clicking into campaigns one at a time
                and holding the comparison in your head.
              </p>
              <div className="grid md:grid-cols-[3fr,2fr] gap-6 md:gap-10 items-center">
                <CaseStudyFigure
                  bordered={false}
                  src="/8451Assets/CampaignPage.png"
                  alt="KAP Onsite campaigns page with performance table"
                />
                <CaseStudyFigure
                  bordered={false}
                  src="/8451Assets/userQuote2.png"
                  alt='User quote: "Obviously you have like a lot of clicking still... when you&apos;re managing multiple campaigns, to go through and select and find which ones you need to look at..."'
                  className="w-full max-w-md mx-auto md:mx-0"
                />
              </div>
            </div>
          </CaseStudySection>

          {/* 04 · Workshops */}
          <CaseStudySection
            num="04"
            label="Workshops"
            sublabel="deciding together"
            title="Choosing Recommendations Before an Assistant"
            className="pb-2 md:pb-4"
          >
            <div className="grid md:grid-cols-[2fr,1fr] gap-8 md:gap-12 items-start">
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                I ran cross-functional workshops with product, engineering and data science to rank
                ideas on a value matrix. The decision mattered more than the ranking: we chose
                individual recommendations over a conversational assistant. The assistant was
                flashier, but recommendations with clear estimated impact were the smallest thing
                that could prove advertisers would trust AI output at all. Everything else depends
                on that.
              </p>
              <CaseStudyFigure
                bordered={false}
                src="/8451Assets/Collaboration.png"
                alt="Workshop boards - value matrix and ranked ideas"
                className="max-w-md w-full mx-auto md:mx-0 md:justify-self-end"
              />
            </div>
          </CaseStudySection>

          {/* 05 · Ideation */}
          <CaseStudySection
            num="05"
            label="Ideation"
            sublabel="structure before screens"
            title="From Architecture to Iterations"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Before any screens, I mapped the information architecture: where recommendations
              appear, how a hub organizes them, the anatomy of one from rationale to apply flow,
              and the activity history behind it. That last piece matters more than it looks.
              Trust is not only explaining why a model suggested something, it is what happens when
              the suggestion is wrong, so history, undo and recovery were structural rather than an
              afterthought.
            </p>
            <CaseStudyFigure
              bordered={false}
              rounded={false}
              src="/8451Assets/InformationArchitecture.png"
              alt="KAP insight automation information architecture"
              className="mb-10 max-w-4xl mx-auto"
            />
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I iterated on the homepage, campaigns page and recommendation center across many
              versions. Faster generation widened the exploration; the evaluation is what mattered.
              Engineers and data scientists pressure-tested feasibility on the boards, and every
              concept was checked against Meridian.
            </p>
            <CaseStudyFigure
              bordered={false}
              src="/8451Assets/AlignmentIdeation.png"
              alt="Iteration boards for homepage, campaigns page, and recommendation center with engineering and data science feedback"
              className="mb-10"
            />
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Out of this exploration came the two concepts I carried into usability testing: a
              recommendation card and its view recommendation modal, shown here in the exact
              versions participants reacted to.
            </p>
            <ImageCarousel
              className="!bg-white border border-neutral-200 dark:border-neutral-800 [&_.image-carousel-image]:w-auto [&_.image-carousel-image]:max-h-[400px] [&_.image-carousel-image]:mx-auto"
              items={[
                {
                  id: 1,
                  image: '/8451Assets/OldRecommendation.svg',
                  title: 'The recommendation card concept tested with users',
                },
                {
                  id: 2,
                  image: '/8451Assets/OldViewRecommendation.svg',
                  title: 'The view recommendation concept tested with users',
                },
              ]}
            />
          </CaseStudySection>

          {/* 06 · Usability testing */}
          <CaseStudySection
            num="06"
            label="Usability Testing"
            sublabel="pressure-testing the concepts"
            title="Testing AI Recommendation Concepts with 6 KAP Users"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I ran moderated, think-aloud sessions with 6 internal KAP users on understanding,
              trust and actionability. Each 30-minute session built up: a single card, then a
              grouped card, then the homepage and recommendation center to test placement and
              prioritization.
            </p>
            <p className="text-[17px] leading-7 text-neutral-900/85 dark:text-neutral-100/85 mb-8">
              I went in asking where AI recommendations should appear. Testing taught me the harder
              question was what a recommendation has to carry before anyone will act on it.
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Five findings reshaped the design, and the first one governs the rest:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {USABILITY_FINDINGS.map((finding, i) => (
                <motion.div
                  key={finding.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="p-5 rounded-[10px] bg-neutral-900/[0.035] dark:bg-neutral-100/[0.06]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-[#8451EC]/10 dark:bg-[#8451EC]/20 flex items-center justify-center flex-shrink-0">
                      <finding.icon className="w-4 h-4 text-[var(--csa)] dark:text-[var(--csa-dark)]" />
                    </div>
                    <p className="text-[16px] leading-6 font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                      {finding.title}
                    </p>
                  </div>
                  <p className="text-[14px] text-neutral-900/55 dark:text-neutral-100/55 leading-relaxed mb-3">
                    {finding.body}
                  </p>
                  <p className="border-l-2 border-[var(--csa)] dark:border-[var(--csa-dark)] pl-3 text-sm italic text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    "{finding.quote}"
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 07 · Final designs */}
          <CaseStudySection
            num="07"
            label="Final Designs"
            sublabel="insights in action"
            title="Recommendations at Every Entry Point"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6">
              The concept I took into testing said, in effect, "increase your bid to $3.50."
              Participants answered with questions: on which campaign, why, what happens if I do,
              can I change the number, can I undo it. The final card is those questions answered.
            </p>
            <ul className="mb-8 space-y-3 text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Lead with expected impact.
                </span>{' '}
                Advertisers decide whether a recommendation is worth considering before they care
                how it works.
              </li>
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Show exactly what changes.
                </span>{' '}
                Current value next to recommended value, against a named campaign, ad group and
                UPC, so the action is concrete.
              </li>
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Explain the reasoning.
                </span>{' '}
                Enough of the why to support a judgement, without turning the card into a report.
              </li>
              <li>
                <span className="font-medium text-neutral-900/85 dark:text-neutral-100/85">
                  Preserve control.
                </span>{' '}
                Inspect, adjust the value, apply selectively, and recover afterwards, rather than
                an opaque one-click accept.
              </li>
            </ul>
            <div className="mb-10">
              <ImageCarousel
                className="!bg-white border border-neutral-200 dark:border-neutral-800"
                items={[
                  {
                    id: 1,
                    image: '/8451Assets/RecommendationExample.svg',
                    title: 'The recommendation card',
                  },
                  {
                    id: 2,
                    image: '/8451Assets/ViewRecommendationExample.svg',
                    title: 'The view recommendation modal',
                  },
                ]}
              />
            </div>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              The same card appears in several places, each doing a different job: the homepage
              prioritises, the campaign page diagnoses in context, ad group and UPC carry the
              specific action, and the recommendation center manages volume at scale. The homepage
              queue turns a screen people skipped into where optimization starts.
            </p>
            <CaseStudyFigure
              bordered={false}
              rounded={false}
              src="/8451Assets/HomepageDemo.mp4"
              type="video"
              className="mb-10 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)]"
            />
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Inside campaigns and ad groups, where users told us decisions actually happen, inline
              recommendations surface at the exact row they apply to, down to the ad group and UPC
              level. I designed these future-state pages in collaboration with the Ad Platform &
              Experiences team, ensuring my recommendation components aligned with the direction
              the platform is heading.
            </p>
            <CaseStudyFigure
              bordered={false}
              rounded={false}
              src="/8451Assets/CampaignAdGroupDemo.mp4"
              type="video"
              className="shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)]"
            />
          </CaseStudySection>

          {/* 08 · Design system */}
          <CaseStudySection
            num="08"
            label="Design System"
            sublabel="making it reusable"
            title="Turning Research Insights Into Reusable AI Patterns"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I documented the patterns as a component library in Meridian: recommendation cards
              with and without metrics, view and confirmation modals, inline messages and toasts,
              each with states for loading, undo, recover and failure.
            </p>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              The useful part is not the visual kit but the behaviour it encodes: what context a
              recommendation must name, when impact appears, what happens while the model works,
              and how someone gets back out when it was wrong. Those patterns are now a starting
              point for other teams at 84.51°.
            </p>
            <CaseStudyFigure
              bordered={false}
              src="/8451Assets/Meridian.svg"
              alt="Meridian design system - AI recommendations component library"
            />
          </CaseStudySection>

          {/* 09 · Future planning */}
          <CaseStudySection
            num="09"
            label="Future Planning"
            sublabel="where this goes next"
            title="Visualizing the Future State of Recommendations"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I closed the internship by mapping the progression these patterns unlock: prove
              recommendations first, build the ecosystem around them, then mature into
              personalisation and a conversational assistant. Campaign-setup recommendations and
              proactive notifications are the bridge between the two ends.
            </p>
            <div className="mb-10">
              <ImageCarousel
                className="!bg-white border border-neutral-200 dark:border-neutral-800"
                items={[
                  {
                    id: 1,
                    image: '/8451Assets/CampaignPlanning.svg',
                    title: 'Planning recommendations woven into campaign creation',
                    imageStyle: {
                      width: 'auto',
                      height: '480px',
                      margin: '0 auto',
                      boxShadow: '0 12px 32px -16px rgba(0,0,0,0.25)',
                    },
                  },
                  {
                    id: 2,
                    image: '/8451Assets/AdGroupPlanning.png',
                    title: 'Planning recommendations at the ad group level',
                    imageStyle: {
                      width: 'auto',
                      height: '480px',
                      margin: '0 auto',
                      boxShadow: '0 12px 32px -16px rgba(0,0,0,0.25)',
                    },
                  },
                  {
                    id: 3,
                    image: '/8451Assets/AdAssistantNotification.png',
                    title: 'Proactive Ad Assistant notifications',
                    imageStyle: {
                      width: 'auto',
                      height: '480px',
                      margin: '0 auto',
                      boxShadow: '0 12px 32px -16px rgba(0,0,0,0.25)',
                    },
                  },
                  {
                    id: 4,
                    image: '/8451Assets/AdAssistantChat.svg',
                    title: 'Ad Assistant answering performance questions in natural language',
                    imageStyle: {
                      width: 'auto',
                      height: '620px',
                      margin: '0 auto',
                    },
                  },
                ]}
              />
            </div>
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              I proposed an adoption roadmap to phase the work in after I left. At the end of my
              internship the team was carrying the recommendation MVP into its next phase, using
              this research as its foundation.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {ROADMAP.map((step, i) => (
                <motion.div
                  key={step.when}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-[10px] bg-neutral-900/[0.035] dark:bg-neutral-100/[0.06]"
                >
                  <p className="flex items-center gap-2 font-label text-[12px] font-medium tracking-[0.7px] text-[var(--csa)] dark:text-[var(--csa-dark)] mb-3">
                    <step.icon className="w-4 h-4" />
                    {step.when}
                  </p>
                  <p className="text-[17px] font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-snug">
                    {step.title}
                  </p>
                  <p className="text-[14px] text-neutral-900/55 dark:text-neutral-100/55 leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 10 · Reflection */}
          <CaseStudySection
            num="10"
            label="Reflection"
            sublabel="what i learned"
            title="What This Summer Taught Me"
          >
            <div className="space-y-6">
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                I came into this summer expecting to design interfaces and spent most of it
                designing for trust. The hardest questions were never about layout, they were about
                what a recommendation owes the person reading it: an estimated impact, an honest
                "why," and a way to undo it. I also learned how much of design happens outside of
                Figma, in workshops with engineers and data scientists and in naive questions asked
                early, which usually turned out to be the ones worth asking.
              </p>
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                The bigger lesson was that AI trust is not something you add with a disclaimer or a
                sparkle icon. It is earned by giving someone enough evidence to judge the
                recommendation and enough control to disagree with it. What I am proudest of is
                that the work outlives the internship: the team carried the recommendation MVP into
                its next phase using my research as its foundation, and the patterns now live in
                Meridian for other designers to push further.
              </p>
            </div>
            <CaseStudyFigure
              bordered={false}
              src="/8451Assets/InternGroup.jpg"
              alt="The 84.51° intern class at the Cincinnati office"
              className="mt-10 max-w-3xl mx-auto"
            />
          </CaseStudySection>
        </div>
        )}
      </CaseStudyLayout>
    </div>
  );
}
