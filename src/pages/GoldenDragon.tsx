import { motion } from 'framer-motion';
import { Calendar, User, Wrench, Search, ExternalLink, Users } from 'lucide-react';
import './GoldenDragon.css';
import ImageCarousel from '../components/ImageCarousel';

const FINAL_DESIGN_SECTIONS = [
  {
    title: "Landing Screen",
    description: "The redesigned homepage creates a cleaner experience. Replacing the busy background with minimal layout and bold typography improves readability. Playful illustrations add personality while navigation is simplified with clear links and a prominent \"Order Now\" button.",
    image: '/goldendragonAssets/gdMain.svg',
  },
  {
    title: "Our Story Unveiled",
    description: "An \"About\" section was added to share the restaurant's heritage and strengthen connection with customers. The clean layout pairs storytelling with visuals, allowing visitors to learn about the restaurant's history, values, and community roots.",
    image: '/goldendragonAssets/gdAbout.svg',
  },
  {
    title: "A Feast of Choices",
    description: "The redesigned menu presents dishes in a clean grid with vibrant images and clear pricing, making browsing easier and more engaging. A new DoorDash promotion was also added, giving customers a direct way to order delivery.",
    image: '/goldendragonAssets/gdMenuOne.svg',
  },
  {
    title: "Voices of Our Guests",
    description: "The testimonials section highlights authentic customer feedback, building trust and credibility. Reviews are displayed prominently with a clean layout. Unlike the original, the contact form was intentionally left out in favor of featuring the restaurant's phone number in the footer.",
    image: '/goldendragonAssets/gdReview.svg',
  },
];

export function GoldenDragon() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-20 md:pt-24">
      {/* Hero Image */}
      <div className="relative w-full bg-neutral-50 dark:bg-neutral-950">
        <img 
          src="/goldendragonAssets/newgdCover.png" 
          alt="Golden Dragon Website"
          className="w-full h-auto"
        />
      </div>

      {/* Hero Title Section */}
      <section className="bg-neutral-50 dark:bg-neutral-950 pt-8 md:pt-12 pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 leading-tight tracking-tight text-neutral-900 dark:text-neutral-50">
              Golden Dragon - The Heart of Our Family, Redesigned
            </h1>
            <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700 mb-6"></div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              A restaurant website redesign that celebrates family heritage through modern web design. Combining design and development skills to elevate my parents' business and create a more personal, engaging dining experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { icon: User, label: 'Role', value: 'Product Designer, Web Developer' },
              { icon: Users, label: 'Team', value: '1 manager\n2 engineers\n1 designer' },
              { icon: Calendar, label: 'Timeline', value: '1 month' },
              { icon: Wrench, label: 'Tools', value: 'Figma, Notion, HTML/CSS/JS' },
              { icon: Search, label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-[#DC2626]/10 dark:bg-[#DC2626]/5 rounded-2xl border border-[#DC2626]/20 dark:border-[#DC2626]/10">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DC2626]/20 dark:bg-[#DC2626]/15 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-neutral-900 dark:text-neutral-50 leading-tight font-medium whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background/Problem */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Background</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Serving Tradition with a Modern Touch</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Golden Dragon has been a beloved part of my community for over 30 years, a place where tradition meets innovation in every dish. My motivation was to elevate my parents' business by combining my technical and design skills. Our first "website" was actually our old Facebook page, which limited access and made it hard for customers to view our menu. The original website was built as my final project for a web design class at UNC with a team of 3.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <img
              src="/goldendragonAssets/goldendragonFacebook.svg"
              alt="Golden Dragon Facebook Page"
              className="w-full max-w-4xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Problem</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">What problems will this redesigned website address</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              How can a local family-ran restaurant become more than just a place to eat, something more personal, engaging, and rooted in community? Fueled by my passion for both design and food, this website makes it easier than ever to explore our story, browse the menu, and feel part of our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">The Process</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {[
                { number: '1', title: 'Research', desc: 'Initial Website\nIdentifying Problems\nUser Interviews' },
                { number: '2', title: 'Synthesis', desc: 'User Personas' },
                { number: '3', title: 'Ideation', desc: 'Low Fidelity\nStyle Guide' },
                { number: '4', title: 'Final Designs', desc: 'Final Prototype' },
                { number: '5', title: 'Reflection', desc: 'Post-design Thoughts\nNext Steps' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#DC2626]/10 dark:bg-[#DC2626]/5 border border-[#DC2626]/20 dark:border-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg md:text-xl font-semibold text-[#DC2626]">{step.number}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Initial Website Problems */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Research</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Initial Website Problems</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              As the original site was tested and used over time, I noticed key UI and UX issues: accessibility concerns, inconsistent visual hierarchy, and friction in the customer journey.
            </p>

            <div className="space-y-8 md:space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">Accessibility & Visual Hierarchy Hinder the Customer Experience</h3>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6">
                  White text blends into the background, reducing readability. "Menu" button feels dominant while "Contact" fades, creating unbalanced hierarchy.
                </p>
                <img
                  src="/goldendragonAssets/gdOldHome.svg"
                  alt="Original Golden Dragon Homepage"
                  className="w-full max-w-3xl mx-auto h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">Visual Clutter in Menu Layout</h3>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6">
                  Dotted lines and inconsistent image sizes create visual clutter. Lack of hierarchy makes scanning and comparing items harder for customers.
                </p>
                <img
                  src="/goldendragonAssets/gdOldMenu.svg"
                  alt="Original Golden Dragon Menu Layout"
                  className="w-full max-w-3xl mx-auto h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">Outdated Contact Experience</h3>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6">
                  Contact form feels slow with 1-2 day response time. Fields lack affordances like real-time validation or instant confirmation.
                </p>
                <img
                  src="/goldendragonAssets/gdOldContact.svg"
                  alt="Original Golden Dragon Contact Page"
                  className="w-full max-w-3xl mx-auto h-auto"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Interviews */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Research</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">User Interviews</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              I surveyed over 100 Golden Dragon customers to better understand how people interact with restaurant technology and what they value most in their dining experience.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">Questions Revolved Around:</p>
                <ol className="space-y-4 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
                  <li>1. Can you describe your experience using <b>online or digital menus</b> at restaurants? What worked well, and what challenges did you encounter?</li>
                  <li>2. How do you typically place your orders at restaurants, and what do you like or dislike about <b>ordering through your phone versus ordering in person</b>?</li>
                  <li>3. <b>What factors influence your decision</b> to return to a restaurant? How important are rewards, personalized offers, or other perks in your dining choices?</li>
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
          </motion.div>
        </div>
      </section>

      {/* Identifying Problems from Interviews */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Research</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Identifying Problems</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              From my discussions with customers, I identified three target points that this website had to address:
            </p>

            <div className="space-y-6 md:space-y-8 max-w-4xl">
              {[
                {
                  title: "Digital Menus Are Common–but Often Frustrating",
                  stats: "91% of respondents had used online or digital menus at restaurants.",
                  insight: "While customers appreciated convenience, many shared frustration with outdated PDFs, confusing layouts, or slow-loading content."
                },
                {
                  title: "Simpler Ordering Enhances the Experience",
                  stats: "82% prefer being able to conveniently order through their phone rather than coming in to order.",
                  insight: "Users appreciate the speed and autonomy but emphasize frustration with inconsistent systems and payment flows."
                },
                {
                  title: "A More Visually Appealing Website Reinforces the Restaurant's Brand",
                  stats: "Over two-thirds of respondents said they'd be more likely to visit a restaurant if the website was more eye-catching.",
                  insight: "This revealed a huge creative opportunity to bring creativity and aesthetics to our website, differentiating it from other restaurants."
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg"
                >
                  <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-[#DC2626] font-medium mb-2">{item.stats}</p>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Personas */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Synthesis</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">User Personas</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              Based on insights from user interviews, our restaurant attracts a wide range of customers. I developed two user personas: the first represents socially driven, convenience-seeking college students, while the second captures the older demographic who prioritize a more traditional dining experience.
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
          </motion.div>
        </div>
      </section>

      {/* Sketching */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Ideation</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Sketching</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              I began by visualizing the customer journey, how a family-run restaurant could welcome both loyal regulars and first-time visitors online. These early sketches helped clarify what mattered most: making the menu easy to browse, simplifying online orders, and ensuring guests could quickly find contact information or directions.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/goldendragonAssets/gdSketch.svg"
                alt="Golden Dragon Sketches"
                className="w-full max-w-3xl mx-auto h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wireframes */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Ideation</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Lo-Fi Wireframes</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              I then implemented these designs in creating lo-fi wireframes to build the foundation for the website, ensuring that key elements are structured properly.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/goldendragonAssets/gdWireframes.svg"
                alt="Golden Dragon Lo-Fi Wireframes"
                className="w-full max-w-3xl mx-auto h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Style Guide */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Ideation</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Style Guide</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              The style guide was carefully crafted to align with the existing brand identity of the restaurant and introducing new colors that complemented well with the brand. By establishing clear design standards, the guide helps maintain consistency across all pages.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden"
          >
            <img
              src="/goldendragonAssets/gdStyleGuide.svg"
              alt="Golden Dragon Style Guide"
              className="w-full max-w-3xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Final Designs */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-4 font-medium bg-[#DC2626]/10 rounded-full">Final Designs</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">The New Golden Dragon Website!</h2>
          </motion.div>

          {/* Final Design Sections */}
          <div className="space-y-16 md:space-y-20">
            {FINAL_DESIGN_SECTIONS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                {item.title === "A Feast of Choices" ? (
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
                  <div className="flex justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full max-w-4xl h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* View Website Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <motion.a
              href="https://goldendragonwilmington.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 min-h-[44px] bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl shadow-neutral-900/10 dark:shadow-neutral-100/10 text-base touch-manipulation"
            >
              View Full Website
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Reflection */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs text-[#DC2626] uppercase tracking-wider mb-6 font-medium bg-[#DC2626]/10 rounded-full">Reflection</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Conclusion</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              This project pushed me to become a more thoughtful designer, combining technical skills with design thinking. Using auto-layout, grids, and careful prototyping, I focused on consistency and intentional user flows. I learned to ask why each element mattered and always consider the user's experience first.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <p className="text-3xl md:text-4xl font-semibold text-[#DC2626] mb-2">40%</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Increase in traffic</p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <p className="text-3xl md:text-4xl font-semibold text-[#DC2626] mb-2">53%</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Boost in interaction rates</p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <p className="text-3xl md:text-4xl font-semibold text-[#DC2626] mb-2">20%</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Increase in orders</p>
              </div>
            </div>
            
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              These results reflect stronger user engagement and conversion. This process has made me more curious, detail-oriented, and excited to keep growing with every new challenge.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

