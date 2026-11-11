import { motion } from 'framer-motion';
import {
  Check,
  X,
  TrendingUp,
  MousePointerClick,
  Target,
  SlidersHorizontal,
  ListOrdered,
} from 'lucide-react';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyCard,
  CaseStudyLayout,
  CaseStudyTLDR,
  CaseStudyCallout,
  CaseStudyPoints,
  CaseStudyDuo,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';
import VideoCarousel from '../components/VideoCarousel';

/* 84.51°, told for a skim like Wigo: a TL;DR up front, then seven sections
   that each lead with a visual. Problem, the journey, the decision, testing,
   the final card, what comes next, reflection. */

const META = [
  { label: 'Role', value: 'Product Design Intern' },
  { label: 'Team', value: 'Media Insights\nand Reporting' },
  { label: 'Timeline', value: '10 weeks' },
  { label: 'Tools', value: 'Figma, FigJam,\nFigma Make, Figma Agent,\nMural, Confluence' },
];

const IMPACT = [
  {
    title: 'Recommendations before an assistant',
    body: 'Cross-functional workshops chose individual recommendations with clear estimated impact over a flashier conversational assistant.',
  },
  {
    title: 'Tested with 6 KAP users',
    body: 'Think-aloud sessions surfaced five findings. Every participant called estimated impact the most critical element.',
  },
  {
    title: 'Recommendations at every entry point',
    body: 'One card that prioritises on the homepage, diagnoses on campaigns and acts at the ad group and UPC level.',
  },
  {
    title: 'Patterns that outlived the internship',
    body: 'The patterns live in Meridian, and the team carried the recommendation MVP into its next phase on this research.',
  },
];

const SURFACE_JOBS = [
  { surface: 'Homepage', job: 'Tell me what deserves attention' },
  { surface: 'Campaigns', job: 'Show me where the problem is' },
  { surface: 'Recommendation', job: 'Tell me why it is worth acting on' },
  { surface: 'Apply', job: 'Let me act without giving up control' },
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

const CARD_PRINCIPLES = [
  {
    title: 'Lead with expected impact',
    body: 'Advertisers decide whether a recommendation is worth considering before they care how it works.',
  },
  {
    title: 'Show exactly what changes',
    body: 'Current value next to recommended value, against a named campaign, ad group and UPC.',
  },
  {
    title: 'Explain the reasoning',
    body: 'Enough of the why to support a judgement, without turning the card into a report.',
  },
  {
    title: 'Preserve control',
    body: 'Inspect, adjust the value, apply selectively, and recover afterwards, rather than an opaque one-click accept.',
  },
];


const ROADMAP = [
  {
    when: 'Now',
    title: 'Validate the Experience',
    body: 'Establish what information a recommendation must carry, test the future-state prototype against it, and define the data and model requirements those patterns imply.',
  },
  {
    when: 'Next',
    title: 'Prove Recommendation Value',
    body: 'Build the forecasting methodology that makes estimated impact trustworthy, then ship the first recommendation types on top of it.',
  },
  {
    when: 'Later',
    title: 'Scale Automation',
    body: 'One-click apply, a personalised Ad Assistant, and measurement through campaign performance and SUS score.',
  },
];

const REFLECTIONS = [
  {
    title: 'I designed for trust more than interfaces',
    body: 'The hardest questions were about what a recommendation owes the person reading it: an estimated impact, an honest “why,” and a way to undo it.',
  },
  {
    title: 'AI trust is earned, not added',
    body: 'Not with a disclaimer or a sparkle icon, but by giving someone enough evidence to judge the recommendation and enough control to disagree with it.',
  },
  {
    title: 'Much of design happens outside Figma',
    body: 'In workshops with engineers and data scientists, and in naive questions asked early, which usually turned out to be the ones worth asking.',
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
  yes: 'bg-green-50',
  no: 'bg-red-50',
  unknown: 'bg-neutral-50',
};

function MatrixMark({ support }: { support: MatrixSupport }) {
  if (support === 'yes') {
    return <Check className="w-4 h-4 mx-auto text-green-600" aria-label="Supported" />;
  }
  if (support === 'no') {
    return <X className="w-4 h-4 mx-auto text-red-500" aria-label="Not supported" />;
  }
  return (
    <span className="text-sm text-neutral-400" aria-label="Unclear">
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
      className="overflow-x-auto rounded-[10px] bg-neutral-900/[0.035]"
    >
      <table className="w-full min-w-[680px] text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-200">
            <th
              scope="col"
              className="text-left px-6 py-5 font-label text-[12px] font-medium font-medium text-neutral-500"
            >
              AI Feature
            </th>
            {MATRIX_PLATFORMS.map((platform, i) => (
              <th
                key={platform}
                scope="col"
                className={`px-4 py-5 text-center font-label text-[12px] font-medium font-medium ${
                  i === 0
                    ? 'text-[var(--csa)] bg-[var(--csa)]/5'
                    : 'text-neutral-500'
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
                rowIndex > 0 ? 'border-t border-neutral-100' : ''
              }
            >
              <th
                scope="row"
                className="text-left px-6 py-4 font-medium text-neutral-900 leading-snug"
              >
                {row.feature}
              </th>
              {row.support.map((support, i) => (
                <td
                  key={i}
                  className={`px-4 py-5 text-center border-l border-white ${MATRIX_CELL_BG[support]}`}
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

export function EightyFourFiftyOne() {
  return (
    <div
      className="cs-page"
      data-accent="8451"
    >
      <CaseStudyLayout>
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

        <CaseStudyTLDR
          summary={[
            'Kroger Ad Platform surfaces plenty of performance data but no direction on what to do with it. Client success managers verify every recommendation by hand, and media buyers apply each change one at a time.',
            'I benchmarked 10+ ad platforms, mapped where insight failed to become action, and tested recommendation concepts with 6 KAP users. Testing showed a recommendation has to carry its estimated impact before anyone acts on it, so I rebuilt the card around that and documented the patterns in Meridian.',
          ]}
          impact={IMPACT}
        />

        {/* 01 · Problem */}
        <CaseStudySection
          num="01"
          label="Manual by default"
          title="Users Have the Data, But Not the Direction"
        >
          <CaseStudyCallout>
            How might we turn campaign performance data into recommendations advertisers can
            understand, trust, and act on?
          </CaseStudyCallout>
          <p className="mb-4">
            Client success managers pull and verify every recommendation by hand; media buyers
            then apply each change one at a time. Insight and action sit in two places, joined
            by a person doing the work manually.
          </p>
          <CaseStudyFigure
            bordered={false}
            src="/8451Assets/Workflow.png"
            alt="Current-state workflow: every step is manual"
            className="max-w-[640px]"
          />
          <p>
            My scope: the recommendation experience end to end, from opportunity through
            usability testing to design-system documentation, with product, engineering and data
            science on feasibility.
          </p>
        </CaseStudySection>

        {/* 02 · Research + journey mapping */}
        <CaseStudySection
          num="02"
          label="Skipped screens"
          title="Finding Friction Points Within the User Journey"
        >
          <p className="mb-4">
            I benchmarked 10+ advertising platforms, from Amazon Ads and Walmart Connect to
            Koddi and TikTok Ads Manager. The matrix maps an opportunity space, not a
            requirements list.
          </p>
          <CompetitiveMatrix />
          <p className="mb-4">
            Then I mapped the journey from planning to performance evaluation with client
            success manager and media buyer feedback, flagging every moment where insight
            failed to become action. Two screens kept surfacing.
          </p>
          <CaseStudyDuo
            tag="The homepage users skip past"
            caption="It reports totals and a performance chart but offers no campaign-specific action, so users scroll straight past it."
            items={[
              { src: '/8451Assets/Homepage.png', alt: 'KAP homepage with performance overview' },
              {
                src: '/8451Assets/userQuote.png',
                alt: 'User quote: "I usually skip right over the homepage and I don&apos;t do anything from there."',
              },
            ]}
          />
          <div className="mt-16">
            <CaseStudyDuo
              tag="A campaigns page with no signals"
              caption="Every row reads the same no matter how a campaign is performing, so finding the one that needs attention means clicking in one at a time."
              items={[
                {
                  src: '/8451Assets/CampaignPage.png',
                  alt: 'KAP Onsite campaigns page with performance table',
                },
                {
                  src: '/8451Assets/userQuote2.png',
                  alt: 'User quote: "Obviously you have like a lot of clicking still... when you&apos;re managing multiple campaigns, to go through and select and find which ones you need to look at..."',
                },
              ]}
            />
          </div>
          <p className="mb-4">Mapping them gave each surface a job.</p>
          <div className="grid md:grid-cols-2 gap-2">
            {SURFACE_JOBS.map((item) => (
              <CaseStudyCard key={item.surface}>
                <h4>{item.surface}</h4>
                <p className="mt-1">{item.job}</p>
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        {/* 03 · Workshops + ideation */}
        <CaseStudySection
          num="03"
          label="No chatbot yet"
          title="Choosing Recommendations Before an Assistant"
        >
          <p className="mb-4">
            In cross-functional workshops with product, engineering and data science, we chose
            individual recommendations over a conversational assistant. The assistant was
            flashier, but recommendations with clear estimated impact were the smallest thing
            that could prove advertisers would trust AI output at all.
          </p>
          <CaseStudyFigure
            bordered={false}
            src="/8451Assets/Collaboration.png"
            alt="Workshop boards - value matrix and ranked ideas"
            className="max-w-[640px]"
          />
          <p className="mb-4">
            Before any screens, I mapped the information architecture. Trust is also what
            happens when a suggestion is wrong, so history, undo and recovery were structural
            rather than an afterthought.
          </p>
          <CaseStudyFigure
            bordered={false}
            rounded={false}
            src="/8451Assets/InformationArchitecture.png"
            alt="KAP insight automation information architecture"
            className="max-w-[720px]"
            zoomable
          />
          <p className="mb-4">
            I iterated on the homepage, campaigns page and recommendation center across many
            versions. Engineers and data scientists pressure-tested feasibility on the boards,
            and every concept was checked against Meridian.
          </p>
          <CaseStudyFigure
            bordered={false}
            src="/8451Assets/AlignmentIdeation.png"
            alt="Iteration boards for homepage, campaigns page, and recommendation center with engineering and data science feedback"
            zoomable
          />
        </CaseStudySection>

        {/* 04 · Usability testing */}
        <CaseStudySection
          num="04"
          label="Show me the impact"
          title="Testing AI Recommendation Concepts with 6 KAP Users"
        >
          <p className="mb-4">
            I carried two concepts into testing: a recommendation card and its view
            recommendation modal, shown here in the exact versions participants reacted to.
          </p>
          <VideoCarousel
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
          <p className="mb-4">
            Moderated, think-aloud sessions with 6 internal KAP users on understanding, trust
            and actionability. Each 30-minute session built up from a single card to the
            homepage and recommendation center.
          </p>
          <CaseStudyCallout>
            I went in asking where AI recommendations should appear. Testing taught me the
            harder question was what a recommendation has to carry before anyone will act on it.
          </CaseStudyCallout>
          <p className="mb-4">Five findings reshaped the design, and the first one governs the rest.</p>
          <div className="grid md:grid-cols-2 gap-2">
            {USABILITY_FINDINGS.map((finding) => (
              <CaseStudyCard key={finding.title} className="h-full">
                <div className="w-9 h-9 rounded-[10px] bg-[var(--csa)]/10 flex items-center justify-center mb-3">
                  <finding.icon className="w-5 h-5 text-[var(--csa)]" />
                </div>
                <h4>{finding.title}</h4>
                <p className="mt-1 mb-3">{finding.body}</p>
                <p className="border-l-2 border-[var(--csa)] pl-3 italic text-neutral-500">
                  "{finding.quote}"
                </p>
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        {/* 05 · Final designs + design system */}
        <CaseStudySection
          num="05"
          label="Questions answered"
          title="Recommendations at Every Entry Point"
        >
          <p className="mb-4">
            The tested concept said, in effect, "increase your bid to $3.50." Participants
            answered with questions: on which campaign, why, what happens if I do, can I undo
            it. The final card is those questions answered.
          </p>
          <VideoCarousel
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
          <div className="grid md:grid-cols-2 gap-2 mt-10">
            {CARD_PRINCIPLES.map((item) => (
              <CaseStudyCard key={item.title} className="h-full">
                <h4>{item.title}</h4>
                <p className="mt-1">{item.body}</p>
              </CaseStudyCard>
            ))}
          </div>
          <p className="mb-4">
            The same card does a different job in each place. The homepage queue turns a screen
            people skipped into where optimization starts.
          </p>
          <CaseStudyFigure
            bordered={false}
            rounded={false}
            src="/8451Assets/HomepageDemo.mp4"
            type="video"
            className="shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)]"
          />
          <p className="mb-4">
            Inside campaigns and ad groups, inline recommendations surface at the exact row they
            apply to, down to the UPC. I designed these future-state pages with the Ad Platform
            & Experiences team so the components matched where the platform is heading.
          </p>
          <CaseStudyFigure
            bordered={false}
            rounded={false}
            src="/8451Assets/CampaignAdGroupDemo.mp4"
            type="video"
            className="shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)]"
          />
          <p className="mb-4">
            I documented the patterns in Meridian, each with states for loading, undo, recover
            and failure. The useful part is the behaviour it encodes, now a starting point for
            other teams at 84.51°.
          </p>
          <CaseStudyFigure
            bordered={false}
            src="/8451Assets/Meridian.svg"
            alt="Meridian design system - AI recommendations component library"
            zoomable
          />
        </CaseStudySection>

        {/* 06 · Future planning */}
        <CaseStudySection
          num="06"
          label="After I left"
          title="Visualizing the Future State of Recommendations"
        >
          <p className="mb-4">
            I closed the internship by mapping what these patterns unlock: prove recommendations
            first, then grow into personalisation and a conversational assistant.
          </p>
          <VideoCarousel
            items={[
              {
                id: 1,
                image: '/8451Assets/CampaignPlanning.svg',
                title: 'Planning recommendations woven into campaign creation',
              },
              {
                id: 2,
                image: '/8451Assets/AdGroupPlanning.png',
                title: 'Planning recommendations at the ad group level',
              },
              {
                id: 3,
                image: '/8451Assets/AdAssistantNotification.png',
                title: 'Proactive Ad Assistant notifications',
              },
              {
                id: 4,
                image: '/8451Assets/AdAssistantChat.svg',
                title: 'Ad Assistant answering performance questions in natural language',
              },
            ]}
          />
          <p className="mb-4">
            I proposed an adoption roadmap to phase the work in after I left. The team carried
            the recommendation MVP into its next phase, using this research as its foundation.
          </p>
          <div className="grid md:grid-cols-3 gap-2">
            {ROADMAP.map((step) => (
              <CaseStudyCard key={step.when} className="h-full">
                <p className="cs-tag">{step.when}</p>
                <h4 className="mt-3">{step.title}</h4>
                <p className="mt-1">{step.body}</p>
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        {/* 07 · Reflection */}
        <CaseStudySection
          num="07"
          label="Designing for trust"
          title="What This Summer Taught Me"
        >
          <CaseStudyPoints items={REFLECTIONS} />
          <p className="mb-4">
            What I am proudest of is that the work outlives the internship: the recommendation
            MVP moved into its next phase on my research, and the patterns live in Meridian for
            other designers to push further.
          </p>
          <CaseStudyFigure
            bordered={false}
            src="/8451Assets/InternGroup.jpg"
            alt="The 84.51° intern class at the Cincinnati office"
            className="max-w-[640px]"
          />
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
