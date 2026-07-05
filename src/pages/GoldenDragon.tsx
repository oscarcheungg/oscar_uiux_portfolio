import { motion } from 'framer-motion';
import ImageCarousel from '../components/ImageCarousel';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyLink,
  CaseStudyCard,
  CaseStudyLayout,
} from '../components/CaseStudy';

const META = [
  { label: 'Role', value: 'Product Designer, Web Developer' },
  { label: 'Team', value: '1 manager\n2 engineers\n1 designer' },
  { label: 'Timeline', value: '1 month' },
  { label: 'Tools', value: 'Figma, Notion, HTML/CSS/JS' },
  { label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' },
];

const PROCESS_STEPS = [
  { number: '1', title: 'Research', desc: 'Initial Website\nIdentifying Problems\nUser Interviews' },
  { number: '2', title: 'Synthesis', desc: 'User Personas' },
  { number: '3', title: 'Ideation', desc: 'Low Fidelity\nStyle Guide' },
  { number: '4', title: 'Final Designs', desc: 'Final Prototype' },
  { number: '5', title: 'Reflection', desc: 'Post-design Thoughts\nNext Steps' },
];

const INITIAL_PROBLEMS = [
  {
    title: 'Accessibility & Visual Hierarchy Hinder the Customer Experience',
    body:
      'White text blends into the background, reducing readability. "Menu" button feels dominant while "Contact" fades, creating unbalanced hierarchy.',
    image: '/goldendragonAssets/gdOldHome.svg',
    alt: 'Original Golden Dragon Homepage',
  },
  {
    title: 'Visual Clutter in Menu Layout',
    body:
      'Dotted lines and inconsistent image sizes create visual clutter. Lack of hierarchy makes scanning and comparing items harder for customers.',
    image: '/goldendragonAssets/gdOldMenu.svg',
    alt: 'Original Golden Dragon Menu Layout',
  },
  {
    title: 'Outdated Contact Experience',
    body:
      'Contact form feels slow with 1-2 day response time. Fields lack affordances like real-time validation or instant confirmation.',
    image: '/goldendragonAssets/gdOldContact.svg',
    alt: 'Original Golden Dragon Contact Page',
  },
];

const IDENTIFIED_PROBLEMS = [
  {
    title: 'Digital Menus Are Common, but Often Frustrating',
    stats: '91% of respondents had used online or digital menus at restaurants.',
    insight:
      'Customers appreciated the convenience but were frustrated by outdated PDFs, confusing layouts, and slow-loading content.',
  },
  {
    title: 'Simpler Ordering Enhances the Experience',
    stats: '82% prefer ordering through their phone rather than coming in to order.',
    insight:
      'Users value the speed and autonomy but are frustrated by inconsistent systems and payment flows.',
  },
  {
    title: "A More Visually Appealing Website Reinforces the Restaurant's Brand",
    stats:
      "Over two-thirds of respondents said they'd be more likely to visit a restaurant with an eye-catching website.",
    insight:
      'A clear creative opportunity to differentiate our website from other restaurants.',
  },
];

const FINAL_DESIGN_SECTIONS = [
  {
    title: 'Landing Screen',
    description:
      'A minimal layout and bold typography replace the busy background, while playful illustrations add personality. Navigation is simplified with clear links and a prominent "Order Now" button.',
    image: '/goldendragonAssets/gdMain.svg',
  },
  {
    title: 'Our Story Unveiled',
    description:
      'A new "About" section pairs storytelling with visuals, letting visitors connect with the restaurant\'s history, values, and community roots.',
    image: '/goldendragonAssets/gdAbout.svg',
  },
  {
    title: 'A Feast of Choices',
    description:
      'The menu now presents dishes in a clean grid with vibrant images and clear pricing, plus a new DoorDash promotion for direct delivery ordering.',
    image: '/goldendragonAssets/gdMenuOne.svg',
  },
  {
    title: 'Voices of Our Guests',
    description:
      "Prominent customer reviews build trust and credibility. I intentionally dropped the slow contact form in favor of the restaurant's phone number in the footer.",
    image: '/goldendragonAssets/gdReview.svg',
  },
];

export function GoldenDragon() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-28 md:pt-36 pb-16 md:pb-24" data-accent="red">
      <CaseStudyLayout>
        <CaseStudyHeader
          eyebrow="GOLDEN DRAGON · WEB DESIGN 2025"
          title="Golden Dragon - The Heart of Our Family, Redesigned"
          subtitle="I grew up in my parents' restaurant. This redesign brings my design and development skills back home, celebrating our family heritage through a more personal dining experience."
          meta={META}
          cover="/goldendragonAssets/newgdCover.png"
          coverAlt="Golden Dragon Website"
        />

        <div className="mt-10 md:mt-14">
          {/* 01 · Background */}
          <CaseStudySection
            num="01"
            label="Background"
            sublabel="why this matters"
            title="Serving Tradition with a Modern Touch"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              I grew up watching Golden Dragon become a beloved part of my community over its 30
              years. For most of that time, our only "website" was an old Facebook page where
              customers could barely find the menu. So I set out to elevate my parents' business
              with my design and technical skills, building the original site as my final project
              for a web design class at UNC with a team of 3.
            </p>
            <CaseStudyFigure
              src="/goldendragonAssets/goldendragonFacebook.svg"
              alt="Golden Dragon Facebook Page"
            />
          </CaseStudySection>

          {/* 02 · Problem */}
          <CaseStudySection
            num="02"
            label="Problem"
            sublabel="what we're solving"
            title="What the Redesign Addresses"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              How can a family-run restaurant become more than just a place to eat? That question
              drove this redesign: a website that invites people to explore our story, browse the
              menu, and feel part of our community.
            </p>
          </CaseStudySection>

          {/* 03 · Process */}
          <CaseStudySection
            num="03"
            label="Process"
            sublabel="how we worked"
            title="The Process"
          >
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
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-600/10 dark:bg-red-500/20 border border-red-600/20 dark:border-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg md:text-xl font-semibold text-red-600 dark:text-red-400">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 04 · Research */}
          <CaseStudySection
            num="04"
            label="Audit"
            sublabel="what we found"
            title="Initial Website Problems"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              As customers used the original site, I started noticing the cracks: accessibility
              concerns, inconsistent visual hierarchy, and friction in the customer journey.
            </p>
            <div className="space-y-8 md:space-y-12">
              {INITIAL_PROBLEMS.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6">
                    {item.body}
                  </p>
                  <CaseStudyFigure src={item.image} alt={item.alt} />
                </div>
              ))}
            </div>
          </CaseStudySection>

          {/* 05 · Interviews */}
          <CaseStudySection
            num="05"
            label="Interviews"
            sublabel="talking to users"
            title="User Interviews"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              To move beyond my own hunches, I surveyed 100+ Golden Dragon customers about how they
              use restaurant technology and what they value most when dining.
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                  Questions Revolved Around:
                </p>
                <ol className="space-y-4 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
                  <li>
                    1. What has your experience been with <b>online or digital menus</b> at
                    restaurants? What worked well, and what didn't?
                  </li>
                  <li>
                    2. How do you typically place orders, and how do you feel about{' '}
                    <b>ordering through your phone versus in person</b>?
                  </li>
                  <li>
                    3. <b>What factors influence your decision</b> to return to a restaurant? How
                    much do rewards, personalized offers, or other perks matter?
                  </li>
                </ol>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex justify-center items-center"
              >
                <img
                  src="/goldendragonAssets/memojiGroup.svg"
                  alt="Golden Dragon Interview Participants"
                  className="w-full max-w-[280px] md:max-w-[340px] h-auto"
                />
              </motion.div>
            </div>
          </CaseStudySection>

          {/* 06 · Research */}
          <CaseStudySection
            num="06"
            label="Problems"
            sublabel="key takeaways"
            title="Identifying Problems"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              That's when the real problems came into focus. Three stood out:
            </p>
            <div className="space-y-6">
              {IDENTIFIED_PROBLEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <CaseStudyCard>
                    <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-red-600 dark:text-red-400 font-medium mb-2">
                      {item.stats}
                    </p>
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.insight}
                    </p>
                  </CaseStudyCard>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 07 · Personas */}
          <CaseStudySection
            num="07"
            label="Personas"
            sublabel="who we serve"
            title="User Personas"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              The interviews reminded me just how wide our customer base is, so I distilled it into
              two personas: convenience-seeking college students and an older demographic who prefer
              a more traditional dining experience.
            </p>
            <div className="w-full max-w-5xl mx-auto" style={{ height: '600px', position: 'relative' }}>
              <ImageCarousel
                items={[
                  { image: '/goldendragonAssets/shaiWilliams.svg', id: 1 },
                  { image: '/goldendragonAssets/lindaJones.svg', id: 2 },
                ]}
                autoplay={false}
                pauseOnHover={false}
                loop={false}
              />
            </div>
          </CaseStudySection>

          {/* 08 · Ideation */}
          <CaseStudySection
            num="08"
            label="Ideation"
            sublabel="early exploration"
            title="Sketching"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              With those insights in hand, I started sketching the customer journey, imagining how a
              family-run restaurant could welcome both loyal regulars and first-time visitors
              online. The priorities became clear: easy menu browsing, simple online ordering, and
              quick access to contact info and directions.
            </p>
            <CaseStudyFigure src="/goldendragonAssets/gdSketch.svg" alt="Golden Dragon Sketches" />
          </CaseStudySection>

          {/* 09 · Wireframes */}
          <CaseStudySection
            num="09"
            label="Wireframes"
            sublabel="building structure"
            title="Lo-Fi Wireframes"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              From there, lo-fi wireframes turned the sketches into the website's foundation,
              giving each page its structure.
            </p>
            <CaseStudyFigure
              src="/goldendragonAssets/gdWireframes.svg"
              alt="Golden Dragon Lo-Fi Wireframes"
            />
          </CaseStudySection>

          {/* 10 · Style */}
          <CaseStudySection
            num="10"
            label="Style"
            sublabel="visual language"
            title="Style Guide"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              For the visual language, I built on the brand identity my family had carried for
              years, adding complementary new colors to keep every page consistent.
            </p>
            <CaseStudyFigure
              src="/goldendragonAssets/gdStyleGuide.svg"
              alt="Golden Dragon Style Guide"
            />
          </CaseStudySection>

          {/* 11 · Solution */}
          <CaseStudySection
            num="11"
            label="Solution"
            sublabel="what we made"
            title="The New Golden Dragon Website!"
          >
            <div className="space-y-16 md:space-y-20 mb-12">
              {FINAL_DESIGN_SECTIONS.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base md:text-lg font-medium mb-3 text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  {item.title === 'A Feast of Choices' ? (
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                      <img
                        src="/goldendragonAssets/gdMenuOne.svg"
                        alt={`${item.title} - Part 1`}
                        className="w-full max-w-4xl md:max-w-[48%] h-auto rounded-lg shadow-lg"
                      />
                      <img
                        src="/goldendragonAssets/gdMenuTwo.svg"
                        alt={`${item.title} - Part 2`}
                        className="w-full max-w-4xl md:max-w-[48%] h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  ) : (
                    <CaseStudyFigure src={item.image} alt={item.title} />
                  )}
                </div>
              ))}
            </div>
            <CaseStudyLink href="https://goldendragonwilmington.com/">
              View Full Website
            </CaseStudyLink>
          </CaseStudySection>

          {/* 12 · Reflection */}
          <CaseStudySection
            num="12"
            label="Reflection"
            sublabel="what i learned"
            title="Conclusion"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Redesigning my family's website pushed me to become a more thoughtful designer.
              Through auto-layout, grids, and careful prototyping, I learned to ask why each element
              mattered and to put the user's experience first.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <CaseStudyCard>
                <p className="text-3xl md:text-4xl font-semibold text-red-600 dark:text-red-400 mb-2">
                  40%
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Increase in traffic</p>
              </CaseStudyCard>
              <CaseStudyCard>
                <p className="text-3xl md:text-4xl font-semibold text-red-600 dark:text-red-400 mb-2">
                  53%
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Boost in interaction rates</p>
              </CaseStudyCard>
              <CaseStudyCard>
                <p className="text-3xl md:text-4xl font-semibold text-red-600 dark:text-red-400 mb-2">
                  20%
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Increase in orders</p>
              </CaseStudyCard>
            </div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Most of all, this project left me more curious, more detail-oriented, and excited to
              keep growing with every new challenge.
            </p>
          </CaseStudySection>
        </div>
      </CaseStudyLayout>
    </div>
  );
}
