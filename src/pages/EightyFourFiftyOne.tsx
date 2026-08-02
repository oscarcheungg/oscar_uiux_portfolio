import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, TrendingUp, MousePointerClick, Target, Flag, Rocket, Sparkles, Lock } from 'lucide-react';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLayout,
} from '../components/CaseStudy';
import ImageCarousel from '../components/ImageCarousel';

const META = [
  { label: 'Role', value: 'Product Design Intern' },
  { label: 'Team', value: 'Media Insights\nand Reporting' },
  { label: 'Timeline', value: '10 weeks' },
  { label: 'Tools', value: 'Figma, FigJam,\nMural, Confluence' },
];

const USABILITY_FINDINGS = [
  {
    title: 'Estimated impact is essential for trust',
    body: 'Participants needed to know the "why" behind every action. Forecasting became a critical component of the recommendation card, not a nice-to-have.',
    icon: TrendingUp,
  },
  {
    title: 'Recommendations must live closer to the point of action',
    body: 'Users expected recommendations inside the campaigns and ad groups tabs where they were already making changes, not tucked away on a separate page.',
    icon: MousePointerClick,
  },
  {
    title: 'Specificity at the ad group / UPC level matters',
    body: 'Surface-level suggestions eroded confidence. Recommendations had to name the exact campaign and ad group they applied to.',
    icon: Target,
  },
];

const ROADMAP = [
  {
    when: 'Now',
    title: 'Proving the Value of Recommendations',
    body: 'Define the minimum data needed to power recommendations, and conduct additional usability testing with the future state prototype.',
    icon: Flag,
  },
  {
    when: 'Next',
    title: 'Building the Ecosystem',
    body: 'Ship an MVP that surfaces insights, and establish the forecasting methodology needed for trustworthy estimated impact.',
    icon: Rocket,
  },
  {
    when: 'Later',
    title: 'Full Maturity and Personalization',
    body: 'Enable one-click recommendations, personalize Ad Assistant, and measure impact through campaign performance and SUS score.',
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
      className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800"
    >
      <table className="w-full min-w-[680px] text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-800">
            <th
              scope="col"
              className="text-left px-6 py-5 text-[0.65rem] uppercase tracking-widest font-medium text-neutral-500 dark:text-neutral-500"
            >
              AI Feature
            </th>
            {MATRIX_PLATFORMS.map((platform, i) => (
              <th
                key={platform}
                scope="col"
                className={`px-4 py-5 text-center text-[0.65rem] uppercase tracking-widest font-medium ${
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
      <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
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
          eyebrow="84.51° · INTERNSHIP 2026"
          title="Designing AI Insights & Recommendations"
          subtitle="The Kroger Ad Platform (KAP) is the only major ad platform where advertisers still have to manually optimize their campaigns. Over 10 weeks at 84.51°, I researched, designed, and tested what actionable AI recommendations should look like in KAP, and turned the findings into a reusable component library in the Meridian design system."
          meta={META}
          cover="/8451Assets/OscarCoverWide.png"
          coverAlt="84.51° AI insights and recommendations cover"
        />

        <CaseStudyFigure
          bordered={false}
          src="/8451Assets/homepageintro.png"
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Optimizing campaigns in KAP is manual and time-consuming. The platform surfaces plenty
              of performance data but no direction on what to do with it, and the workflow behind it
              is just as manual. Client success managers, who analyze performance and provide
              strategic recommendations to their clients, pull and verify every recommendation by
              hand. Media buyers, who set up and optimize campaigns inside KAP, then chase down each
              change one at a time.
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              To understand what "good" looks like, I audited how the rest of the industry handles AI
              insights across Amazon Ads, Walmart Connect, Instacart Ads, Google Ads, Koddi, TikTok Ads
              Manager, and more, annotating every recommendation pattern, entry point, and
              interaction I could find.
            </p>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Synthesizing the audit into a feature matrix made the story impossible to ignore: KAP
              trailed the market on nearly every AI capability, from bidding optimization and
              proactive inflight alerts to recommendation explainability and one-click apply.
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
              The market told me what was possible; next I needed to know where it would matter most
              for our users. I combed through past user research documents to consolidate key themes
              and quotes, then paired them with client success manager and media buyer feedback to
              map the end-to-end journey, from media planning through campaign execution to
              performance evaluation, flagging every moment where insights failed to become action.
              Two screens kept surfacing as the places where momentum died.
            </p>

            <div className="mb-12">
              <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                The homepage users skip past
              </h3>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
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
              <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                A campaigns page with no signals
              </h3>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
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
            title="What Should We Build First?"
            className="pb-2 md:pb-4"
          >
            <div className="grid md:grid-cols-[2fr,1fr] gap-8 md:gap-12 items-start">
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                With the friction points mapped, I ran cross-functional workshops with product,
                engineering, and data science to rank ideas on a value matrix. Recommendations with
                clear estimated impact rose to the top; bigger swings like a full ad assistant were
                parked for later.
              </p>
              <CaseStudyFigure
                bordered={false}
                src="/8451Assets/Collaboration.png"
                alt="Workshop boards - value matrix and ranked ideas"
                className="max-w-md w-full mx-auto md:mx-0 md:justify-self-end"
              />
            </div>
          </CaseStudySection>

          {/* 05 · Usability testing */}
          <CaseStudySection
            num="05"
            label="Usability Testing"
            sublabel="pressure-testing the concepts"
            title="Testing AI Recommendation Concepts with 6 KAP Users"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              With recommendations chosen as the focus, I prototyped concepts across KAP's key
              entry points and put them in front of 6 internal KAP users, digging into gaps in
              clarity, trust, and actionability. Three findings reshaped the design:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {USABILITY_FINDINGS.map((finding, i) => (
                <motion.div
                  key={finding.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#8451EC]/10 dark:bg-[#8451EC]/20 flex items-center justify-center mb-4">
                    <finding.icon className="w-5 h-5 text-[var(--csa)] dark:text-[var(--csa-dark)]" />
                  </div>
                  <p className="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-3 leading-snug">
                    {finding.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {finding.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 06 · Final designs */}
          <CaseStudySection
            num="06"
            label="Final Designs"
            sublabel="insights in action"
            title="Recommendations at Every Entry Point"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Those findings shaped everything that follows. At the core of the experience is the
              recommendation card, where every element is there to earn trust: a plain-language
              headline, the rationale behind it, the metrics at stake, and an estimated impact,
              with apply one click away. Opening a card reveals the full view: the exact campaign,
              ad group, and UPC it applies to, current versus suggested values, expected impact
              with its trade-offs, and how the AI arrived at the recommendation.
            </p>
            <div className="mb-10">
              <ImageCarousel
                className="!bg-white border border-neutral-200 dark:border-neutral-800"
                items={[
                  {
                    id: 1,
                    image: '/8451Assets/RecommendationExample.png',
                    title: 'The recommendation card',
                  },
                  {
                    id: 2,
                    image: '/8451Assets/ViewRecommendationExample.png',
                    title: 'The view recommendation modal',
                  },
                ]}
              />
            </div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              These cards flow into every key entry point. The homepage greets users with a
              prioritized queue of recommendations, turning a screen people skipped into the place
              where optimization starts.
            </p>
            <CaseStudyFigure
              bordered={false}
              rounded={false}
              src="/8451Assets/HomepageDemo.mp4"
              type="video"
              className="mb-10 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)]"
            />
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
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

          {/* 07 · Design system */}
          <CaseStudySection
            num="07"
            label="Design System"
            sublabel="making it reusable"
            title="An AI Recommendation Library for Meridian"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              To make the work scale beyond one surface, I documented the patterns as a component
              library aligned with 84.51°'s Meridian design system: recommendation cards with and
              without metrics, view and confirmation modals, inline messages, and toasts, each with
              defined states for loading, undo, recover, and failure. The library gives other
              84.51° products a reusable foundation for surfacing recommendations, so teams
              adopting AI insights start from proven patterns instead of a blank canvas.
            </p>
            <CaseStudyFigure
              bordered={false}
              src="/8451Assets/Meridian.png"
              alt="Meridian design system - AI recommendations component library"
            />
          </CaseStudySection>

          {/* 08 · Future planning */}
          <CaseStudySection
            num="08"
            label="Future Planning"
            sublabel="where this goes next"
            title="Visualizing the Future State of Recommendations"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              I closed the internship by mapping where AI adoption in KAP could go once the model
              matures: planning recommendations for campaign setup, proactive ad assistant
              notifications, and a full conversational assistant that answers performance questions
              in natural language.
            </p>
            <CaseStudyFigure
              bordered={false}
              src="/8451Assets/AdditionalConcepts.png"
              alt="Future concepts - planning recommendations and ad assistant"
              className="mb-10"
            />
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              To help the team phase the work in after I left, I proposed an adoption roadmap:
              prove the value of recommendations first, build the ecosystem around them, then scale
              toward full maturity and personalization.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {ROADMAP.map((step, i) => (
                <motion.div
                  key={step.when}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
                >
                  <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-[var(--csa)] dark:text-[var(--csa-dark)] mb-3">
                    <step.icon className="w-4 h-4" />
                    {step.when}
                  </p>
                  <p className="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-snug">
                    {step.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 09 · Reflection */}
          <CaseStudySection
            num="09"
            label="Reflection"
            sublabel="what i learned"
            title="What This Summer Taught Me"
          >
            <div className="space-y-6">
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                I came into this summer expecting to design interfaces and spent most of it
                designing for trust. The hardest questions were never about layout, they were about
                what a recommendation owes the person reading it: an estimated impact, an honest
                "why," and a way to undo it. I also learned how much of design happens outside of
                Figma, in workshops with engineers and data scientists and in naive questions asked
                early, which usually turned out to be the ones worth asking.
              </p>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                What I'm proudest of is that the work outlives the internship: I was able to create
                a foundation for AI recommendations to be implemented within KAP and across other
                platform experiences at 84.51°, with the patterns now living in Meridian for other
                designers to push further. I'm grateful to the Media Insights and Reporting team for
                treating me like a designer rather than an intern, and I left this experience
                knowing that the AI space is where I want to keep designing and growing in.
              </p>
            </div>
            <CaseStudyFigure
              bordered={false}
              src="/8451Assets/InternGroup.jpg"
              alt="The 84.51° intern class at the Cincinnati office"
              className="mt-10 max-w-3xl mx-auto"
            />
            <p className="text-center text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mt-6">
              Thank you 84.51° for an amazing summer experience! ☀️
            </p>
          </CaseStudySection>
        </div>
        )}
      </CaseStudyLayout>
    </div>
  );
}
