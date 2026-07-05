import { motion } from 'framer-motion';
import { StickyShowcase } from '../components/StickyShowcase';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLayout,
} from '../components/CaseStudy';

const META = [
  { label: 'Role', value: 'Product Designer' },
  { label: 'Team', value: '3 engineers\n1 designer' },
  { label: 'Timeline', value: '1 month' },
  { label: 'Tools', value: 'Figma, Figjam, Notion' },
  { label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' },
];

const PROCESS_STEPS = [
  { number: '1', title: 'Research', desc: 'Identifying Problems\nCompetitor Analysis\nUser Interviews' },
  { number: '2', title: 'Synthesis', desc: 'User Personas' },
  { number: '3', title: 'Ideation', desc: 'User Flow\nLow Fidelity\nStyle Guide' },
  { number: '4', title: 'Final Designs', desc: 'Final Prototype' },
  { number: '5', title: 'Reflection', desc: 'Conclusion\nNext Steps' },
];

const IDENTIFYING_PROBLEMS = [
  {
    title: 'QR Menus Are Widely Used–but Inconsistently Designed',
    stats: '93% of participants have used QR codes to view menus or place orders.',
    insight:
      'Users love the convenience but complain about clunky PDFs, slow load times, and non-interactive menus.',
  },
  {
    title: 'Ordering Without Staff is Preferred, When Done Right',
    stats: '82% prefer ordering through their phone over waiting for a server.',
    insight:
      'People enjoy the speed and autonomy but get frustrated by inconsistent systems and payment flows.',
  },
  {
    title: 'Photos & Peer Recommendations Drive Decisions',
    stats: '76% rely on photos and personal recommendations (from friends or staff) to decide what to order.',
    insight:
      'Anonymous reviews carry little weight. People want picks from someone they trust.',
  },
  {
    title: 'Loyalty & Rewards Are Strong Motivators',
    stats: '68% would download a restaurant-related app if it offered loyalty rewards or perks.',
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
      'With the research in hand, I started by mapping the key journeys, from onboarding and QR scanning to discovering restaurants, reading reviews, and redeeming rewards.',
    media: '/biteAssets/biteuserFlow.svg',
    alt: 'Bite User Flow',
  },
  {
    label: 'Sketching',
    sublabel: 'lo-fi exploration',
    heading: 'Sketching',
    description:
      'Then I sketched quick layouts to test ideas for the Discover feed, Rewards page, and QR ordering interface.',
    media: '/biteAssets/biteSketch.svg',
    alt: 'Bite Sketching Wireframes',
  },
  {
    label: 'Wireframes',
    sublabel: 'structure & flows',
    heading: 'Lo-Fi Wireframes',
    description:
      "The strongest sketches moved into Figma, where I defined the app's structure and flows for onboarding, login, home, rewards, and cart.",
    media: '/biteAssets/biteWireframes.svg',
    alt: 'Bite Lo-Fi Wireframes',
  },
  {
    label: 'Style Guide',
    sublabel: 'visual language',
    heading: 'Style Guide',
    description:
      'For the visual language, I chose bold colors, playful iconography, and clean typography to give Bite a vibrant, social feel that matches community-driven dining.',
    media: '/biteAssets/biteStyleGuide.svg',
    alt: 'Bite Style Guide',
  },
];

const FINAL_DESIGN_SECTIONS = [
  {
    title: "Bite's Home Screen",
    description:
      "One feed for nearby restaurants and friends' reviews. Like, comment, and share to help your circle decide where to eat next.",
    video: '/biteAssets/biteMain.mp4',
  },
  {
    title: "Menu's Tailored to the Restaurant",
    description:
      "Browse categories, see friends' dish reviews, and customize orders, with language support including Chinese.",
    video: '/biteAssets/biteOrdering.mp4',
  },
  {
    title: 'Endless Rewards for Scanning',
    description:
      'Every scan and order earns points toward rewards and friend challenges across partner restaurants.',
    video: '/biteAssets/biteRewards.mp4',
  },
  {
    title: 'Your Posts, Favorites, and History, All Together',
    description:
      'Favorites, past orders, and your posts live in one place. Share reviews and photos to inspire friends.',
    video: '/biteAssets/biteProfile.mp4',
  },
  {
    title: 'See What Your Friends Are Up To',
    description:
      "Engage with friends' posts, message about recommendations, and discover the nearby spots they love.",
    video: '/biteAssets/biteFriends.mp4',
  },
];

const NEXT_STEPS = [
  'Build the full mobile app in React.js and SwiftUI, with loyalty and social features, while keeping QR ordering seamless on the web.',
  'Strengthen the Django and PostgreSQL backend for smooth order processing and secure payments.',
  'Keep testing with users to make sure new features deliver value for both diners and restaurant partners.',
];

export function Bite() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-28 md:pt-36 pb-16 md:pb-24" data-accent="teal">
      <CaseStudyLayout>
        <CaseStudyHeader
          eyebrow="BITE · PRODUCT DESIGN 2025"
          title="Bite - Dining Made Social and Simple"
          subtitle="Inspired by China's QR code dining culture, Bite blends social discovery with seamless ordering. Friends share bite-sized dish recs and photos to help each other decide what to eat, not just where."
          meta={META}
          cover="/biteAssets/newbiteHead.webp"
          coverAlt="Bite - Dining Made Social and Simple"
        />

        <div className="mt-10 md:mt-14">
          {/* 01 · Background */}
          <CaseStudySection
            num="01"
            label="Background"
            sublabel="why this exists"
            title="The Inspiration behind Bite"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Bite began with China's scan-to-order dining culture, and I wanted to bring that ease
              home. Scan a QR code at a partner restaurant to browse the menu, order, and earn
              rewards, with no changes to existing POS systems. Real-time social data surfaces
              trending dishes, making dining out more fun and personal.
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
            title="Understanding the problem that Bite addresses"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              One question guided the whole project: how might restaurant discovery feel more
              personal and community-driven? My answer was to turn meals into social moments, where
              you discover dishes through friends' photos, order via QR code, and unlock rewards.
            </p>

            <h3 className="text-base md:text-lg font-medium mb-6 text-neutral-900 dark:text-neutral-100">
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
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#284B63]/10 dark:bg-[#6B8CAE]/20 border border-[#284B63]/20 dark:border-[#6B8CAE]/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg md:text-xl font-semibold text-[#284B63] dark:text-[#6B8CAE]">
                      {step.number}
                    </span>
                  </div>
                  <h4 className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
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
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
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
            label="Problems"
            sublabel="what users told us"
            title="Identifying Problems"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Then I went to the diners themselves, interviewing 50+ frequent diners about their
              behaviors and pain points. Four themes emerged.
            </p>

            <div className="space-y-6 md:space-y-8">
              {IDENTIFYING_PROBLEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
                >
                  <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#284B63] dark:text-[#6B8CAE] font-medium mb-2">
                    {item.stats}
                  </p>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
              <p className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
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
                    className="p-4 bg-neutral-100 dark:bg-neutral-900 border-l-4 border-[#284B63] dark:border-[#6B8CAE] rounded"
                  >
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 italic">
                      "{quote}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CaseStudySection>

          {/* 05 · Synthesis */}
          <CaseStudySection
            num="05"
            label="Synthesis"
            sublabel="who we're designing for"
            title="User Personas"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Those interviews came together in one persona: a socially driven, convenience-seeking
              college student who dines out often. Her goals shaped the key features, from unified
              QR ordering to visible dish reviews and cross-restaurant loyalty rewards.
            </p>
            <CaseStudyFigure src="/biteAssets/bitePersona.svg" alt="User Persona Tiffany Tran" />
          </CaseStudySection>

          {/* 06-09 · Ideation */}
          {IDEATION_STEPS.map((step, i) => (
            <CaseStudySection
              key={step.heading}
              num={String(i + 6).padStart(2, '0')}
              label={step.label}
              sublabel={step.sublabel}
              title={step.heading}
            >
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                {step.description}
              </p>
              <CaseStudyFigure src={step.media} alt={step.alt} />
            </CaseStudySection>
          ))}

          {/* 10 · Solution */}
          <CaseStudySection
            num="10"
            label="Solution"
            sublabel="what we made"
            title="Introducing Bite!"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Everything I learned comes together here: social discovery, seamless ordering, and
              rewards in one platform.
            </p>
            <StickyShowcase sections={FINAL_DESIGN_SECTIONS} />
          </CaseStudySection>

          {/* 11 · Reflection */}
          <CaseStudySection
            num="11"
            label="Reflection"
            sublabel="what i learned"
            title="Conclusion"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
              Designing Bite let me blend my love of food with solving real problems. Owning the
              process end to end deepened my commitment to user-centered design that builds genuine
              connection between people and products.
            </p>

            <h3 className="text-base md:text-lg font-medium mb-6 text-neutral-900 dark:text-neutral-100">
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
                  <span className="w-6 h-6 flex items-center justify-center shrink-0 text-sm font-semibold text-[#284B63] dark:text-[#6B8CAE] bg-[#284B63]/10 dark:bg-[#6B8CAE]/20 rounded-full mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
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
