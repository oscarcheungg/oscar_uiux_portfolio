import { motion } from 'framer-motion';
import { User, Calendar, Wrench, Play, Users, Filter, Search, TrendingUp, Lightbulb, ExternalLink } from 'lucide-react';

const SOLUTION_SECTIONS = [
  {
    title: 'Filter overlay menu with transaction status options',
    description: 'Tapping the filter icon opens a semi-transparent overlay with clear radio button options: Categorized, Uncategorized, All, and Ignored. This maintains context of the transaction list while providing a focused filtering experience. The overlay can be dismissed easily, supporting quick check-ins.',
    media: '/centibleAssets/filterOverlay.png',
    type: 'image',
  },
  {
    title: 'Category filter chips for quick selection',
    description: 'When filtering by "Categorized," category chips (Rent, Groceries, Eating Out) appear above the transaction list. Users can tap multiple chips to filter by several categories at once. Each chip is clearly labeled and can be easily removed, making it simple to adjust filters on the fly.',
    media: '/centibleAssets/categorizedTransactions.png',
    type: 'image',
  },
  {
    title: 'Clear visual feedback and easy filter management',
    description: 'The interface clearly shows which filters are active through the filter label (e.g., "Uncategorized Transactions" or "Ignored Transactions") and active category chips. This supports the quick, goal-oriented behavior we observed in user research.',
    media: '/centibleAssets/centibleDemo.mp4',
    type: 'video',
  },
];

export function Centible() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-20 md:pt-24">
      {/* Hero Image */}
      <div className="relative w-full bg-neutral-50 dark:bg-neutral-950">
        <img 
          src="/centibleCover.png" 
          alt="Filtering Transactions for Centible"
          className="w-full h-auto"
          loading="eager"
          decoding="async"
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
              Filtering Transactions for Centible
            </h1>
            <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700 mb-6"></div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              A financial management tool designed specifically for college students navigating independent living. Developed through App Team Carolina to address the unique challenges of unpredictable, fluctuating student incomes through intuitive design and thoughtful user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { icon: User, label: 'Role', value: 'Product Designer' },
              { icon: Users, label: 'Team', value: '1 PM\n2 engineers\n2 designers' },
              { icon: Calendar, label: 'Timeline', value: '2 weeks' },
              { icon: Wrench, label: 'Tools', value: 'Figma, Figjam' },
              { icon: Play, label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' }
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 bg-purple-600/10 dark:bg-purple-500/20 rounded-2xl border border-purple-600/20 dark:border-purple-500/30"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 dark:bg-purple-500/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600/70 dark:text-purple-400/70 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-neutral-900 dark:text-neutral-50 leading-tight font-medium whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context & Problem */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">CONTEXT & PROBLEM</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">The Problem With the Existing Filter Interface</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-6">
              Students use transaction filtering for quick check-ins, not deep budgeting sessions. They need fast answers to questions like "How much did I spend on food this week?" but the existing interface required multiple taps, buried options, and didn't match their category-first thinking.
            </p>
          </motion.div>

          {/* Problem Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <img 
              src="/centibleAssets/centibleBefore.png" 
              alt="Existing filter interface showing friction points" 
              className="w-full max-w-4xl mx-auto h-auto rounded-2xl border border-neutral-300 dark:border-neutral-700"
            />
          </motion.div>
        </div>
      </section>

      {/* User Context & Insights */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">USER CONTEXT & INSIGHTS</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Understanding How Students Actually Use Financial Tools</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              Through informal interviews with 8 college students, I observed that they use financial apps for quick check-ins, not deep budgeting sessions. This insight shaped every design decision.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
              >
                <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">User context</h3>
                <ul className="space-y-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-400 dark:text-neutral-600 mt-1 font-bold">•</span>
                    <span><strong className="text-neutral-900 dark:text-neutral-100">Quick, repeated usage:</strong> Multiple check-ins per day, not dedicated budgeting sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-400 dark:text-neutral-600 mt-1 font-bold">•</span>
                    <span><strong className="text-neutral-900 dark:text-neutral-100">Low friction tolerance:</strong> Any extra step feels like too much</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-400 dark:text-neutral-600 mt-1 font-bold">•</span>
                    <span><strong className="text-neutral-900 dark:text-neutral-100">Goal-oriented:</strong> Specific question → answer → leave</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
              >
                <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">Key insights</h3>
                <ul className="space-y-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-400 dark:text-neutral-600 mt-1 font-bold">•</span>
                    <span><strong className="text-neutral-900 dark:text-neutral-100">Users scan more than read:</strong> Category labels must be instantly recognizable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-400 dark:text-neutral-600 mt-1 font-bold">•</span>
                    <span><strong className="text-neutral-900 dark:text-neutral-100">Category-first thinking:</strong> "Food" or "transportation" before date ranges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-400 dark:text-neutral-600 mt-1 font-bold">•</span>
                    <span><strong className="text-neutral-900 dark:text-neutral-100">Over-filtering causes fatigue:</strong> Too many options lead to decision paralysis</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Design Goals */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">DESIGN GOALS</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Tying Goals Directly to Insights</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              Each design goal directly addresses a user insight, ensuring our solution solves real problems rather than adding unnecessary complexity.
            </p>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  insight: "Users scan more than read",
                  goal: "Make categories visually distinct with icons and color coding for instant recognition",
                  icon: Search
                },
                {
                  insight: "Category-first thinking",
                  goal: "Prioritize category selection over date ranges, placing the most common filters first",
                  icon: Filter
                },
                {
                  insight: "Low tolerance for friction",
                  goal: "Reduce filtering to a single tap for common use cases, with advanced options available but not prominent",
                  icon: TrendingUp
                },
                {
                  insight: "Over-filtering causes fatigue",
                  goal: "Progressive disclosure: show essential filters first, reveal advanced options only when needed",
                  icon: Lightbulb
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/10 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 italic">"{item.insight}"</p>
                      <p className="text-base text-neutral-900 dark:text-neutral-100 leading-relaxed">{item.goal}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exploration & Iteration */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">EXPLORATION & ITERATION</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Exploring Different Approaches to Transaction Filtering</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              I tested different filter interface approaches, learning what worked and what didn't through rapid iteration and user feedback.
            </p>
            
            <div className="space-y-12 md:space-y-16">
              {/* Iteration 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-base md:text-lg font-medium mb-3 text-neutral-900 dark:text-neutral-100">Iteration 1: Inline filter options</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-4">
                  I tested placing filter options directly in the transaction list header, thinking it would reduce taps. However, this violated progressive disclosure, showing all options at once increased cognitive load. For quick check-ins, users need transactions first, filters second. This taught me that visibility doesn't always equal usability.
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 italic mb-4">What didn't work: Cluttered header, limited space, didn't feel like a dedicated filtering experience</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  <img 
                    src="/centibleAssets/centibleIterationOne.jpg" 
                    alt="Inline filter options iteration" 
                    className="w-full h-auto rounded-2xl border border-neutral-300 dark:border-neutral-700"
                  />
                </motion.div>
              </motion.div>

              {/* Iteration 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                <h3 className="text-base md:text-lg font-medium mb-3 text-neutral-900 dark:text-neutral-100">Iteration 2: Testing the overlay approach</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-4">
                  Moving to an overlay menu solved the space issue. I tested full-screen vs. partial overlays, choosing partial because it preserved spatial memory, users could still see their transaction list. The overlay enabled a two-stage filtering pattern matching users' mental model: first select status (Categorized/Uncategorized), then see category chips appear.
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 italic mb-4">Key learning: Overlay maintains context, provides space for clear labels, enables category chips</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  <img 
                    src="/centibleAssets/centibleIterationTwo.jpg" 
                    alt="Overlay filter menu exploration" 
                    className="w-full h-auto rounded-2xl border border-neutral-300 dark:border-neutral-700"
                  />
                </motion.div>
              </motion.div>

              {/* Iteration 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-base md:text-lg font-medium mb-3 text-neutral-900 dark:text-neutral-100">Iteration 3: Making categorized filter the default</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-4">
                  Based on user research showing category-first thinking, I made "Categorized" the default filter. This balanced reducing friction vs. maintaining control, optimizing for the common case while keeping "All" easily accessible. By defaulting to categorized, transactions immediately appear grouped by category chips, reducing the interaction from "tap filter → select categorized → see categories" to just "see categories."
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 italic mb-4">Key insight: Defaulting to categorized view matches how users think about their spending</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  <img 
                    src="/centibleAssets/centibleIterationThree.jpg" 
                    alt="Categorized filter as default" 
                    className="w-full h-auto rounded-2xl border border-neutral-300 dark:border-neutral-700"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Solution */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">FINAL SOLUTION</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">The Final Filtering Solution</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              Combining insights from each iteration, the final solution uses a filter overlay menu with clear transaction status options, followed by category chips that appear when filtering. This approach maintains context while providing quick, scannable filtering options.
            </p>
            
            {/* Final Solution Designs */}
            <div className="space-y-12 md:space-y-16 mb-12">
              {SOLUTION_SECTIONS.map((section, index) => (
                <motion.div
                  key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col gap-6"
                >
                  <div className="max-w-3xl">
                    <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">{section.title}</h3>
                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">{section.description}</p>
                  </div>
                  <div className="w-full max-w-3xl mx-auto">
                    {section.type === 'video' ? (
                      <video 
                        src={section.media} 
                        className="w-full h-auto rounded-2xl border border-neutral-300 dark:border-neutral-700"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img 
                        src={section.media} 
                        alt={section.title} 
                        className="w-full h-auto rounded-2xl border border-neutral-300 dark:border-neutral-700"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Final Solution Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
            >
              <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">How it supports user jobs</h3>
              <ul className="space-y-3 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400 dark:text-neutral-600 mt-1">•</span>
                  <span><strong className="text-neutral-900 dark:text-neutral-100">Quick check-ins:</strong> One tap to see food spending for the week</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400 dark:text-neutral-600 mt-1">•</span>
                  <span><strong className="text-neutral-900 dark:text-neutral-100">Category-first thinking:</strong> Categories are prominent and visually distinct</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400 dark:text-neutral-600 mt-1">•</span>
                  <span><strong className="text-neutral-900 dark:text-neutral-100">Reduced cognitive load:</strong> Only essential options visible, advanced features available but not in the way</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">IMPACT</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Light but Honest Outcomes</h2>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">Quantitative</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Through user interviews and usability testing, we synthesized insights into high-fidelity Figma prototypes. The redesigned filtering interface <span className="text-purple-600 dark:text-purple-400 font-medium">reduced time to locate specific transactions by approximately 15%</span>.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-base md:text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">Qualitative</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Users reported <span className="text-purple-600 dark:text-purple-400 font-medium">feeling less overwhelmed and more confident</span> in finding the information they needed. The category-first approach matched their mental model, making the feature feel intuitive rather than requiring learning.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team & Gala */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">TEAM & PRESENTATION</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Presenting at App Team Carolina Gala</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              Our team presented our semester's work at the App Team Carolina Gala, showcasing the collaborative efforts between designers and engineers. We shared our usability testing insights, newly redesigned features, and the website redesign that brought these solutions to life. Go Centible!
            </p>
            
              <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              className="w-full max-w-3xl mx-auto mb-6"
            >
              <img 
                src="/centibleAssets/centibleGala.jpg" 
                alt="Centible team at App Team Carolina Gala" 
                className="w-full h-auto rounded-2xl border border-neutral-300 dark:border-neutral-700"
              />
              </motion.div>

            <motion.a
              href="https://docs.google.com/presentation/d/1SFU9wVgxHThUgA3r1vQBUmPXL5X9i7kHvmqwdcD0fF4/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 px-6 py-3 mx-auto w-fit text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium border border-purple-600/30 dark:border-purple-500/30 hover:border-purple-600/50 dark:hover:border-purple-500/50 rounded-full transition-colors bg-purple-600/10 dark:bg-purple-500/10 hover:bg-purple-600/15 dark:hover:bg-purple-500/15"
            >
              <span>View Full Presentation</span>
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
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-6 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">REFLECTION</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-12 tracking-tight">What I Learned and What I'd Do Differently</h2>
            <div className="space-y-4">
              {[
                'The best designs match how users actually think, not how I think they should. Discovering students think in categories first, not date ranges, fundamentally shifted the solution. Good design is about matching existing mental models, not following frameworks.',
                'Showing everything doesn\'t give users control, it overwhelms them. Progressive disclosure became crucial: hiding advanced options until needed reduced cognitive load while keeping functionality accessible.',
                'I\'d start with observation, not assumptions. The first iterations were based on what I thought users wanted, not how they actually behaved. Watching users interact with financial tools before designing would have saved cycles.'
              ].map((takeaway, i) => (
              <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 items-start p-6 bg-purple-600/5 dark:bg-purple-500/10 rounded-xl border border-purple-600/20 dark:border-purple-500/30"
                >
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 text-base font-bold text-purple-600 dark:text-purple-400 bg-purple-600/10 dark:bg-purple-500/20 rounded-lg">
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 pt-1 leading-relaxed">{takeaway}</p>
              </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-6 font-medium bg-purple-600/10 dark:bg-purple-500/20 rounded-full">NEXT STEPS</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Continuing to Refine Centible</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              I'm currently working on revamping the widgets for the app, improving how users can quickly access their financial information at a glance. We're also looking to expand our marketing efforts to get more fundraising for the app and the team. Our team is continuously refining the app and its features based on user feedback and evolving needs, ensuring Centible remains a valuable tool for students managing their finances!
            </p>
            
            <motion.a
              href="https://apps.apple.com/us/app/centible/id6443507950"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium border border-purple-600/30 dark:border-purple-500/30 hover:border-purple-600/50 dark:hover:border-purple-500/50 rounded-full transition-colors bg-purple-600/10 dark:bg-purple-500/10 hover:bg-purple-600/15 dark:hover:bg-purple-500/15"
            >
              <span>Get Centible on the App Store!</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
