import { motion } from 'framer-motion';
import { Calendar, User, Wrench, Search, Users, MapPin, Award, Heart, MessageCircle } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import './Bite.css';

const FINAL_DESIGN_SECTIONS = [
  {
    title: "Bite's Home Screen",
    description: "Discover featured restaurants nearby and see friends' reviews in one unified feed. Like, comment, and share moments to help your circle decide where to eat next.",
    video: '/biteAssets/biteMain.mp4',
  },
  {
    title: "Menu's Tailored to the Restaurant",
    description: "Browse categories, see friends' dish reviews, and customize orders directly. Menus adapt with language support for Chinese and other languages.",
    video: '/biteAssets/biteOrdering.mp4',
  },
  {
    title: "Endless Rewards for Scanning",
    description: "Earn points with every scan and order. Unlock exclusive rewards and challenges with friends, building loyalty across partner restaurants.",
    video: '/biteAssets/biteRewards.mp4',
  },
  {
    title: "Your Posts, Favorites, and History, All Together",
    description: "Track favorite restaurants, revisit past orders, and curate your posts. Share authentic reviews and photos to inspire friends.",
    video: '/biteAssets/biteProfile.mp4',
  },
  {
    title: "See What Your Friends Are Up To",
    description: "Stay connected in one unified feed. Engage with friends' content, message about recommendations, and discover nearby spots they love.",
    video: '/biteAssets/biteFriends.mp4',
  },
];

function StickyScrollSection() {
  const [activeSection, setActiveSection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentVideoIndexRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -25% 0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt((entry.target as HTMLElement).dataset.section || '0');
          setActiveSection(index);
          
          if (currentVideoIndexRef.current !== index) {
            currentVideoIndexRef.current = index;
            const source = video.querySelector('source');
            if (source) {
              video.style.transition = 'opacity 0.25s ease';
              video.style.opacity = '0';
              setTimeout(() => {
                source.src = FINAL_DESIGN_SECTIONS[index].video;
                video.load();
                video.play().catch(() => {});
                video.style.opacity = '1';
              }, 250);
            }
          }
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="hidden md:block mb-20">
      <div className="sticky-scroll-container">
        {/* Sticky Phone Display */}
        <div className="sticky-phone-display">
          <div className="phone-frame">
            <video
              ref={videoRef}
              className="phone-video"
              loop
              muted
              playsInline
            >
              <source src={FINAL_DESIGN_SECTIONS[0].video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="scrollable-content">
          {FINAL_DESIGN_SECTIONS.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              data-section={index}
              className={`content-section ${activeSection === index ? 'active' : ''}`}
            >
              <h3 className="content-title">{section.title}</h3>
              <p className="content-description">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Bite() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-20 md:pt-24">
      {/* Hero Image */}
      <div className="relative w-full bg-neutral-50 dark:bg-neutral-950">
        <img 
          src="/biteAssets/newbiteHead.webp" 
          alt="Bite - Dining Made Social and Simple"
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
              Bite - Dining Made Social and Simple
            </h1>
            <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700 mb-6"></div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Inspired by QR code dining culture in China, Bite blends social discovery with seamless ordering. Users share bite-sized dish recs and photos with friends, helping each other decide what to eat, not just where.
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
              { icon: Users, label: 'Team', value: '3 engineers\n1 designer' },
              { icon: Calendar, label: 'Timeline', value: '1 month' },
              { icon: Wrench, label: 'Tools', value: 'Figma, Figjam, Notion' },
              { icon: Search, label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-[#284B63]/10 dark:bg-[#284B63]/5 rounded-2xl border border-[#284B63]/20 dark:border-[#284B63]/10">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#284B63]/20 dark:bg-[#284B63]/15 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#284B63]" />
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

      {/* Background/Inspiration */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Background</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">The Inspiration behind Bite</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Scan a QR code at partner restaurants to access menus, place orders, and earn rewards without disrupting existing POS systems. Bite highlights trending dishes using real-time social data, making dining out more fun and personal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <video
              className="max-w-[350px] w-full rounded-2xl shadow-lg"
              loop
              muted
              playsInline
              autoPlay
            >
              <source src="/biteAssets/chinaInspiration.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Problem</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Understanding the problem that Bite addresses</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              How can we create a social dining platform that makes restaurant discovery more personal and community-driven? Bite reimagines dining by turning meals into social moments. Users discover dishes through friends' photos, order via QR code, and unlock rewards.
            </p>
          </motion.div>

          {/* Process */}
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
                { number: '1', title: 'Research', desc: 'Identifying Problems\nCompetitor Analysis\nUser Interviews' },
                { number: '2', title: 'Synthesis', desc: 'User Personas' },
                { number: '3', title: 'Ideation', desc: 'User Flow\nLow Fidelity\nStyle Guide' },
                { number: '4', title: 'Final Designs', desc: 'Final Prototype' },
                { number: '5', title: 'Reflection', desc: 'Conclusion\nNext Steps' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#284B63]/10 dark:bg-[#284B63]/5 border border-[#284B63]/20 dark:border-[#284B63]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg md:text-xl font-semibold text-[#284B63]">{step.number}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitor Analysis */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Research</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Competitor Analysis</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Analyzed Sharp, InstaLaCarte, Clover, and Restolabs to identify gaps in visual design, social features, POS integration, and accessibility. This revealed the need for a lightweight, socially-driven solution.
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
              src="/biteAssets/bitecompetitorAnalysis.svg"
              alt="Competitor Analysis Table"
              className="w-full max-w-4xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Identifying Problems */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Research</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Identifying Problems</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              Conducted user interviews with over 50 frequent diners to uncover behaviors and pain points.
            </p>

            <div className="space-y-6 md:space-y-8 max-w-4xl">
              {[
                {
                  title: "QR Menus Are Widely Used–but Inconsistently Designed",
                  stats: "93% of participants have used QR codes to view menus or place orders.",
                  insight: "Users praised convenience but often reported poor experiences with clunky PDFs, slow load times, or non-interactive menus."
                },
                {
                  title: "Ordering Without Staff is Preferred, When Done Right",
                  stats: "82% prefer ordering through their phone over waiting for a server.",
                  insight: "Users appreciate the speed and autonomy but emphasize frustration with inconsistent systems and payment flows."
                },
                {
                  title: "Photos & Peer Recommendations Drive Decisions",
                  stats: "76% rely on photos and personal recommendations (from friends or staff) to decide what to order.",
                  insight: "Trust in anonymous reviews is low, users want suggestions from people they know or trust."
                },
                {
                  title: "Loyalty & Rewards Are Strong Motivators",
                  stats: "68% would download a restaurant-related app if it offered loyalty rewards or perks.",
                  insight: "Users mentioned rewards, discounts, and personalized recommendations as key drivers for retention and app adoption."
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
                  <p className="text-sm md:text-base text-[#284B63] font-medium mb-2">{item.stats}</p>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.insight}</p>
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
              <p className="text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">Pain Points (Quotes derived from participants):</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Some QR menus are just outdated PDFs, it doesn't feel modern.",
                  "If it looks good on Instagram or someone I follow likes it, I'll check it out.",
                  "If I earn points across multiple places, I'd definitely use it.",
                  "I always ask friends or look for real photos–reviews from strangers don't mean much.",
                ].map((quote, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="p-4 bg-neutral-50 dark:bg-neutral-950 border-l-4 border-[#284B63] rounded"
                  >
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 italic">"{quote}"</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Synthesis</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">User Personas</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Developed a user persona representing socially driven, convenience-seeking college students who dine out frequently. Their goals shaped key features: unified QR code system, visible dish reviews, and cross-restaurant loyalty rewards.
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
              src="/biteAssets/bitePersona.svg"
              alt="User Persona Tiffany Tran"
              className="w-full max-w-5xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* User Flow */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Ideation</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">User Flow</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Mapped out key user journeys from onboarding and scanning QR codes to discovering restaurants, reading reviews, and redeeming rewards.
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
              src="/biteAssets/biteuserFlow.svg"
              alt="Bite User Flow"
              className="w-full max-w-5xl mx-auto h-auto"
            />
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
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Ideation</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Sketching</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Sketched lo-fi wireframes to map core user flows and test layout ideas quickly, focusing on the Discover feed, Rewards page, and QR ordering interface.
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
              src="/biteAssets/biteSketch.svg"
              alt="Bite Sketching Wireframes"
              className="w-full max-w-5xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Lo-Fi Wireframes */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Ideation</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Lo-Fi Wireframes</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Translated sketches into lo-fi wireframes in Figma, defining the app's structure and user flows for onboarding, login, home, rewards, and cart.
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
              src="/biteAssets/biteWireframes.svg"
              alt="Bite Lo-Fi Wireframes"
              className="w-full max-w-5xl mx-auto h-auto"
            />
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
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Ideation</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Style Guide</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Defined a bold color palette, playful iconography, and clean typography to create a vibrant, modern, and social atmosphere that reflects community-driven dining.
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
              src="/biteAssets/biteStyleGuide.svg"
              alt="Bite Style Guide"
              className="w-full max-w-5xl mx-auto h-auto"
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
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-4 font-medium bg-[#284B63]/10 rounded-full">Final Designs</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Introducing Bite!</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              The final design brings together social discovery, seamless ordering, and rewards into one cohesive platform.
            </p>
          </motion.div>

          {/* Sticky Scroll Solution Videos - Desktop */}
          <StickyScrollSection />

          {/* Mobile Solution Videos */}
          <div className="md:hidden space-y-16">
            {FINAL_DESIGN_SECTIONS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="space-y-4"
              >
                <div className="aspect-[9/16] bg-neutral-100 dark:bg-neutral-800 overflow-hidden max-w-xs mx-auto rounded-[4rem]">
                  <video
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={item.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-2">{item.title}</h3>
                  <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
            <span className="inline-block px-3 py-1 text-xs text-[#284B63] uppercase tracking-wider mb-6 font-medium bg-[#284B63]/10 rounded-full">Reflection</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">Conclusion</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-8">
              Designing Bite let me blend my passion for food with solving real problems. Navigating the end-to-end design process strengthened my commitment to meaningful, user-centered product design and fostering genuine connections between people and the products they use.
            </p>

            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight mt-12">Next Steps</h2>
            <ol className="space-y-4 max-w-3xl">
              {[
                "Develop a full-featured mobile app using React.js and SwiftUI, with loyalty programs and social features, while maintaining a seamless web experience for QR code ordering.",
                "Enhance backend reliability and scalability with Django and PostgreSQL, ensuring smooth order processing and secure payments.",
                "Continue user testing and feedback cycles to validate new features and ensure Bite delivers value to both diners and restaurant partners."
              ].map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <span className="w-6 h-6 flex items-center justify-center shrink-0 text-sm font-semibold text-[#284B63] bg-[#284B63]/10 rounded-full mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">{step}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

