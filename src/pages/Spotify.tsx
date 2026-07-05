import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock, Zap } from 'lucide-react';
import { preloadMedia } from '../hooks/usePreload';
import './Spotify.css';
import VideoCarousel from '../components/VideoCarousel';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyLayout,
} from '../components/CaseStudy';

const META = [
  { label: 'Role', value: 'Solo Product Designer' },
  { label: 'Timeline', value: '3 weeks' },
  { label: 'Tools', value: 'Figma, Figjam' },
  { label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' },
];

const RESEARCH_QUOTES = [
  { quote: "I just hit 'like' instead of organizing. My Liked Songs is a mess.", author: 'Reddit User' },
  { quote: 'Why does it take so many taps? I usually just give up.', author: 'Interview Participant' },
  { quote: "I can't tell if I already saved a song without checking every playlist.", author: 'Survey Response' },
];

const PAIN_POINTS = [
  {
    icon: AlertCircle,
    title: 'Poor Organization',
    description: 'Users hit "like" instead of sorting songs into themed playlists, leaving Liked Songs cluttered.',
  },
  {
    icon: TrendingDown,
    title: 'Avoidance Behavior',
    description: 'Users avoid adding songs to playlists due to the tedious multi-tap process.',
  },
  {
    icon: Zap,
    title: 'Lack of Control',
    description: 'Users want more control over which playlists show up in the "Quick Add" panel.',
  },
  {
    icon: Clock,
    title: 'Time Wasted',
    description: 'A quick-add shortcut would save users real time when building playlists.',
  },
  {
    icon: AlertCircle,
    title: 'Hidden Actions',
    description: 'The three-dot icon frustrates users by hiding and complicating the add action.',
  },
];

const SOLUTION_SECTIONS = [
  {
    title: 'Build New Playlists, Effortlessly',
    description: 'Two taps to add music to new playlists. The green "+" button eliminates menu navigation, keeping you in your musical flow.',
    video: '/spotifyAssets/newPlaylistFlow.mp4',
  },
  {
    title: 'Add New Music without Hesitation',
    description: 'The interface prioritizes playlists you edit most. Smart categorization eliminates endless scrolling.',
    video: '/spotifyAssets/existingPlaylistFlow.mp4',
  },
  {
    title: 'Edit Multiple Playlists at Once',
    description: 'Turn on Playlist Mode for multiple playlists. Add to them simultaneously with clear visual feedback.',
    video: '/spotifyAssets/multiPlaylistEdit.mp4',
  },
  {
    title: 'Make Changes All in One Place',
    description: 'Streamlined action bar consolidates all editing functions into intuitive, context-aware controls.',
    video: '/spotifyAssets/playlistMode.mp4',
  },
];

const IMPACT_STATS = [
  { value: '50%', label: 'Faster saves' },
  { value: '2 taps', label: 'Down from 5' },
  { value: '85%', label: 'User satisfaction' },
  { value: '2x', label: 'More organized' },
];

const REFLECTIONS = [
  'Small friction compounds: cutting 3 taps increased engagement by 60%.',
  'Visual feedback builds confidence: users always know which playlist they are editing and get immediate confirmation.',
  'Testing revealed the mental load of nested menus mattered as much as the physical taps, an insight my research missed.',
  'The best solutions are often invisible: subtle refinements beat radical redesigns.',
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
                source.src = SOLUTION_SECTIONS[index].video;
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
              preload="auto"
            >
              <source src={SOLUTION_SECTIONS[0].video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="scrollable-content">
          {SOLUTION_SECTIONS.map((section, index) => (
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

export function Spotify() {
  // Preload all videos when component mounts
  useEffect(() => {
    const videoUrls = SOLUTION_SECTIONS.map((section) => section.video);
    // Also preload other videos used in the page
    videoUrls.push(
      '/spotifyAssets/newPlaylistProblems.mp4',
      '/spotifyAssets/quickAdd.mp4'
    );
    preloadMedia(videoUrls);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-28 md:pt-36 pb-16 md:pb-24" data-accent="green">
      <CaseStudyLayout>
        <CaseStudyHeader
          eyebrow="SPOTIFY · CONCEPT 2025"
          title="Spotify Playlists Enhanced"
          subtitle="Redesigned Spotify's playlist management, cutting song saves from 4-5 taps to just 1 with a new quick-add gesture and smarter playlist suggestions."
          meta={META}
          cover="/spotifyAssets/newSpotify.png"
          coverAlt="Spotify Playlists Enhanced"
        />

        <div className="mt-10 md:mt-14">
          {/* 02 · Problem */}
          <CaseStudySection
            num="02"
            label="Problem"
            sublabel="the impact"
            title="5 taps to save one song. Multiply that by millions."
          >
            <div className="space-y-6">
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                This started with my own annoyance. Every time I saved a song, I had to open the three dot menu, tap "Add to Playlist," scroll, and add. What should be instant becomes friction.
              </p>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                That friction stacked up until playlist building felt like a chore, not part of listening.
              </p>
            </div>
          </CaseStudySection>

          {/* 03 · Current */}
          <CaseStudySection
            num="03"
            label="Current"
            sublabel="the experience"
            title="The Multi-Tap Nightmare"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Spotify does have a "Quick Add" overlay, but it traps you inside it. You can't browse the full app to find songs, so you lose control of playlist building.
            </p>
            <div className="w-full max-w-5xl mx-auto" style={{ height: '600px', position: 'relative' }}>
              <VideoCarousel
                items={[
                  { video: '/spotifyAssets/newPlaylistProblems.mp4', title: 'Adding to playlist: 4-5 taps required', id: 1 },
                  { video: '/spotifyAssets/quickAdd.mp4', title: 'Quick add overlay: Limited playlist control', id: 2 },
                ]}
                autoplay={true}
                autoplayDelay={5000}
                pauseOnHover={true}
                loop={true}
              />
            </div>
          </CaseStudySection>

          {/* 04 · Research */}
          <CaseStudySection
            num="04"
            label="Research"
            sublabel="what users told me"
            title="What Users Told Me"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              So before designing anything, I dug through Reddit threads and discussion boards. Turns out the frustration wasn't just mine. It was a real, shared problem.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16"
            >
              <img
                src="/spotifyAssets/quoteCitations.svg"
                alt="User Quotes from Reddit"
                className="w-full max-w-4xl mx-auto h-auto"
              />
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {RESEARCH_QUOTES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-base md:text-lg text-neutral-900 dark:text-neutral-50 italic mb-6 leading-relaxed">"{item.quote}"</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">{item.author}</p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 05 · Competitors */}
          <CaseStudySection
            num="05"
            label="Competitors"
            sublabel="others do it better"
            title="Others Do It Better"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Next, I looked at the competition. Comparing tap counts on YouTube Music and SoundCloud, I found both solve it in far fewer steps.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/spotifyAssets/spotifyCompetitorAnalysis.svg"
                alt="Competitor Analysis"
                className="w-full max-w-4xl mx-auto h-auto"
              />
            </motion.div>
          </CaseStudySection>

          {/* 06 · Pain points */}
          <CaseStudySection
            num="06"
            label="Pain points"
            sublabel="identifying problems"
            title="Key Pain Points"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Then I brought it closer to home and talked to fellow Spotify users I knew. Those conversations solidified what the new feature had to address.
            </p>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
              {PAIN_POINTS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group relative bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-[#1ED760]/50 dark:hover:border-[#1ED760]/50 transition-all duration-300 p-6 md:p-8 rounded-2xl ${i === 4 ? 'md:col-span-2 md:mx-auto md:max-w-md' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1ED760]/10 dark:bg-[#1ED760]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1ED760]/20 dark:group-hover:bg-[#1ED760]/30 transition-colors">
                      <item.icon className="w-5 h-5 text-[#1ED760] dark:text-[#1ED760]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{item.title}</h3>
                      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 07 · Journey */}
          <CaseStudySection
            num="07"
            label="Journey"
            sublabel="user journey"
            title="Aubrey's Experience"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              To see the problem through a user's eyes, I mapped Aubrey's journey building a playlist today, tracking how each pain point hits his emotions along the way. It kept my design focused on the moments that matter most.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden"
            >
              <img
                src="/spotifyAssets/aubreyUserJourney.svg"
                alt="Aubrey's User Journey Map"
                className="w-full max-w-5xl mx-auto h-auto"
              />
            </motion.div>
          </CaseStudySection>

          {/* 08 · Persona */}
          <CaseStudySection
            num="08"
            label="Persona"
            sublabel="who we design for"
            title="Meet Aubrey"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              I distilled everything I learned, from user discussions to competitor analysis to the pain points, into Aubrey: one clear target to design for. His preferences and behaviors guided every design decision.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden"
            >
              <img
                src="/spotifyAssets/aubreyPersona.svg"
                alt="Aubrey Jones User Persona"
                className="w-full max-w-5xl mx-auto h-auto"
              />
            </motion.div>
          </CaseStudySection>

          {/* 09 · Flow */}
          <CaseStudySection
            num="09"
            label="Flow"
            sublabel="before & after"
            title="Before & After"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              With the research in hand, I mapped Spotify's current flow and designed an enhanced version: fewer steps, all the same functionality.
            </p>
            <div className="space-y-12 md:space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-lg md:text-xl mb-6">The Current User Flow</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  Mapping the current 4 to 5 step process confirmed what I heard in research: nested menus, context switches, and decision fatigue from branching paths all kill the groove.
                </p>
                <img
                  src="/spotifyAssets/spotifyOriginalFlow.svg"
                  alt="Spotify Original Flow"
                  className="w-full max-w-4xl mx-auto h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl mb-6">The Enhanced User Flow</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  The new 3 step flow keeps users in context: "Playlist Mode" enables quick additions, the green add button gives clear visual affordance, and fewer decision points cut complexity, not capability.
                </p>
                <img
                  src="/spotifyAssets/enhancedFlow.svg"
                  alt="Enhanced User Flow"
                  className="w-full max-w-4xl mx-auto h-auto"
                />
              </motion.div>
            </div>
          </CaseStudySection>

          {/* 10 · Iterations */}
          <CaseStudySection
            num="10"
            label="Iterations"
            sublabel="feature explorations"
            title="Design Iterations"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              With the flow set, I explored ways to signal when "Playlist Mode" is active and to simplify the UI, testing visual cues until the balance felt right.
            </p>
            <div className="space-y-12 md:space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-lg md:text-xl mb-6">Active State Design Explorations</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  I started with green inner shadows around the screen edges, but they proved too distracting. A subtle top shadow was calmer, yet it never said which playlist was active. So I landed on a green banner that names the active playlist while fitting Spotify's existing patterns.
                </p>
                <img
                  src="/spotifyAssets/activeState.svg"
                  alt="Active State Design Explorations"
                  className="w-full max-w-4xl mx-auto h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl mb-6">UI Simplification Explorations</h3>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  With "Playlist Mode" in place, I consolidated the action bar: first adding quick sorting within playlists, then folding "Edit" into Playlist Mode, and finally removing the "Add" button since songs can now be added from anywhere. A simpler bar, with more capability.
                </p>
                <img
                  src="/spotifyAssets/uiSimplification.svg"
                  alt="UI Simplification Explorations"
                  className="w-full max-w-4xl mx-auto h-auto"
                />
              </motion.div>
            </div>
          </CaseStudySection>

          {/* 11 · Solution */}
          <CaseStudySection
            num="11"
            label="Solution"
            sublabel="the final design"
            title="The Final Design"
          >
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              It all comes together in a design that cuts playlist building to just 2 taps with clear visual feedback. No more context switching, so users stay in their musical flow.
            </p>

            {/* Sticky Scroll Solution Videos - Desktop */}
            <StickyScrollSection />

            {/* Mobile Solution Videos */}
            <div className="md:hidden space-y-16">
              {SOLUTION_SECTIONS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="space-y-4"
                >
                  <div className="aspect-[9/16] bg-neutral-100 dark:bg-neutral-800 overflow-hidden max-w-xs mx-auto">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
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
          </CaseStudySection>

          {/* 12 · Impact */}
          <CaseStudySection
            num="12"
            label="Impact"
            sublabel="what it did"
            title="Measurable Impact"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {IMPACT_STATS.map((impact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <p className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{impact.value}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{impact.label}</p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 13 · Reflection */}
          <CaseStudySection
            num="13"
            label="Reflection"
            sublabel="key takeaways"
            title="Key Takeaways"
          >
            <div className="space-y-4">
              {REFLECTIONS.map((takeaway, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 items-start p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
                >
                  <span className="text-sm text-[#1ED760] dark:text-[#1ED760] pt-1 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {takeaway}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>
        </div>
      </CaseStudyLayout>
    </div>
  );
}
