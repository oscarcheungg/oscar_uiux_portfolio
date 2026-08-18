import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock } from 'lucide-react';
import { preloadMedia } from '../hooks/usePreload';
import './Spotify.css';
import VideoCarousel from '../components/VideoCarousel';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyLayout,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

const META = [
  { label: 'Role', value: 'Solo Product Designer' },
  { label: 'Timeline', value: '3 weeks' },
  { label: 'Tools', value: 'Figma, Figjam' },
  { label: 'Responsibilities', value: 'User interviews, Interaction design, Prototyping, Usability testing' },
];

const RESEARCH_QUOTES = [
  { quote: "I just hit 'like' instead of organizing. My Liked Songs is a mess.", author: 'Reddit User' },
  { quote: 'Why does it take so many taps? I usually just give up.', author: 'Playlist builder I spoke with' },
  { quote: "I can't tell if I already saved a song without checking every playlist.", author: 'Playlist builder I spoke with' },
];

/* Five observations collapsed into the three that actually differ: the rest
   were symptoms of the same friction. */
const PAIN_POINTS = [
  {
    icon: TrendingDown,
    title: 'Organisation Gets Deferred',
    description:
      'People fall back on the Like button because sorting music in the moment costs more effort than it is worth. Liked Songs becomes the dumping ground nobody wants to sort later.',
  },
  {
    icon: Clock,
    title: 'Managing Playlists Interrupts Listening',
    description:
      'The add action lives behind a three-dot menu, so a lightweight intention turns into nested menus and a context switch away from whatever is playing.',
  },
  {
    icon: AlertCircle,
    title: 'People Need to Know Where Music Is Going',
    description:
      'Users want to see which playlist they are adding to, and whether a song is already in it, without opening each one to check.',
  },
];

const SOLUTION_SECTIONS = [
  {
    title: 'Stay in the Listening Flow',
    description:
      'Switching a playlist on takes two taps, and from there browsing continues as normal. The green "+" replaces the trip through the three-dot menu, so organising no longer means leaving what you are listening to.',
    video: '/spotifyAssets/newPlaylistFlow.mp4',
  },
  {
    title: 'Reach the Right Playlist Faster',
    description:
      'Recently edited playlists appear first, so the one you are building is usually the one at the top rather than something to scroll for.',
    video: '/spotifyAssets/existingPlaylistFlow.mp4',
  },
  {
    title: 'One Active Destination at a Time',
    description:
      'I explored switching on several playlists at once, but kept the core interaction to a single active destination. Adding to three playlists from one tap sounds efficient until you tap it by accident.',
    video: '/spotifyAssets/multiPlaylistEdit.mp4',
  },
  {
    title: 'Simplifying Rather Than Adding',
    description:
      'Once Playlist Mode handled both adding and editing, several dedicated controls became redundant. The new mode was a chance to remove existing complexity instead of layering more on top.',
    video: '/spotifyAssets/playlistMode.mp4',
  },
];

/* Prototype outcomes, stated as what a prototype can actually show. This was
   never shipped, so nothing here claims real-world product behaviour.
   TODO: fill in the participant counts from testing before publishing. */
const IMPACT_STATS = [
  { value: '5 \u2192 2', label: 'taps for the first save' },
  { value: '1 tap', label: 'for every song after' },
  { value: '60%', label: 'fewer taps on the first save' },
  { value: '20-song playlist', label: 'roughly 100 taps today, about 21 in Playlist Mode' },
];

const REFLECTIONS = [
  'I started treating this as a tap-count problem. Testing showed it was a context problem: people cared less about doing fewer things than about staying oriented while they listened. That is the insight my research missed.',
  'Friction compounds with frequency. Two taps instead of five barely registers once, but across a twenty-song playlist it is the difference between organising as you listen and giving up on it.',
  'Visual feedback is what makes a persistent mode safe. Users need to see which playlist is active before they trust a one-tap save.',
  'Because this was an enhancement to a mature product, I worked inside Spotify\u2019s existing interaction language rather than inventing a new one. The problem became finding the smallest change that improved a high-frequency behaviour.',
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
          title="Spotify Playlists Enhanced"
          subtitle="Organising music in Spotify means leaving whatever you are listening to and walking through a chain of menus. I explored whether playlist building could happen inside the listening experience instead of interrupting it: two taps to start, then one tap for every song after."
          meta={META}
          cover={COVERS['spotify']}
          coverAlt="Spotify Playlists Enhanced"
        />

        <div className="mt-10 md:mt-14">
          {/* 02 · Problem */}
          <CaseStudySection
            num="02"
            label="Problem"
            sublabel="the impact"
            title="A Small Annoyance That Compounds"
          >
            <div className="space-y-6">
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
                This started with my own annoyance. Every time I saved a song, I had to open the three dot menu, tap "Add to Playlist," scroll, and add. What should be instant becomes friction.
              </p>
              <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">
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
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Spotify's existing add flow does help with selecting several songs at once, but discovery happens inside a dedicated overlay: users still have to leave their normal browsing context to build the playlist. That suggested reversing the model. Instead of bringing songs into a playlist editor, bring playlist editing into the rest of Spotify.
            </p>
            <div className="w-full max-w-5xl mx-auto" style={{ height: '600px', position: 'relative' }}>
              <VideoCarousel
                items={[
                  { video: '/spotifyAssets/newPlaylistProblems.mp4', title: 'Adding to a playlist: five taps, every time', id: 1 },
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
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Before designing anything I wanted to know whether the frustration extended past my own habits. I started with what people were already saying: Reddit threads and discussion boards where playlist management comes up constantly. It was not just mine.
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
                  <p className="text-[16px] leading-6 text-neutral-900 dark:text-neutral-50 italic mb-6 leading-relaxed">"{item.quote}"</p>
                  <p className="text-[14px] text-neutral-900/45 dark:text-neutral-100/45">{item.author}</p>
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
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
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
            label="Insights"
            sublabel="identifying problems"
            title="Key Pain Points"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Then I moved from secondary research to primary, talking with Spotify users I know who actively build and maintain playlists. Five observations came out of it, but three of them were the same friction wearing different clothes. These are what remained.
            </p>
            {/* Three across, sized as supporting notes rather than headlines. */}
            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {PAIN_POINTS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-4 transition-colors duration-300 rounded-[10px] bg-neutral-900/[0.035] dark:bg-neutral-100/[0.06] hover:bg-neutral-900/[0.06] dark:hover:bg-neutral-100/[0.09]"
                >
                  <div className="w-8 h-8 rounded-[10px] bg-[#1ED760]/10 dark:bg-[#1ED760]/20 flex items-center justify-center mb-3 group-hover:bg-[#1ED760]/20 dark:group-hover:bg-[#1ED760]/30 transition-colors">
                    <item.icon className="w-4 h-4 text-[#1ED760] dark:text-[#1ED760]" />
                  </div>
                  <h3 className="text-[16px] font-medium leading-snug text-neutral-900 dark:text-neutral-50 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-5 text-neutral-900/55 dark:text-neutral-100/55">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

                    {/* 09 · Flow */}
          <CaseStudySection
            num="07"
            label="Flow"
            sublabel="before & after"
            title="Before & After"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              With the research in hand, I mapped Spotify's current flow and designed an enhanced version: fewer steps, all the same functionality.
            </p>
            <div className="space-y-12 md:space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl md:text-2xl font-medium mb-6">The Current User Flow</h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6 leading-relaxed">
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
                <h3 className="text-xl md:text-2xl font-medium mb-6">The Enhanced User Flow</h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6 leading-relaxed">
                  Playlist Mode turns a playlist into an active destination. Once a playlist is switched on, Spotify stays in that editing state while you carry on browsing normally, and any song can be added with a single "+". Five taps become two for the first save, then one for every song after.
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
            num="08"
            label="Iterations"
            sublabel="feature explorations"
            title="Design Iterations"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              With the flow set, I explored ways to signal when "Playlist Mode" is active and to simplify the UI, testing visual cues until the balance felt right.
            </p>
            <div className="space-y-12 md:space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl md:text-2xl font-medium mb-6">Active State Design Explorations</h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6 leading-relaxed">
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
                <h3 className="text-xl md:text-2xl font-medium mb-6">UI Simplification Explorations</h3>
                <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-6 leading-relaxed">
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
            num="09"
            label="Solution"
            sublabel="the final design"
            title="The Final Design"
          >
            <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55 mb-8">
              Together these keep organising inside the listening experience: two taps to switch a playlist on, then one tap per song, with the active playlist always visible so nobody has to guess where music is going.
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
                    <h3 className="text-xl md:text-2xl font-medium mb-2">{item.title}</h3>
                    <p className="text-[16px] leading-6 text-neutral-900/55 dark:text-neutral-100/55">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 12 · Impact */}
          <CaseStudySection
            num="10"
            label="Validation"
            sublabel="what it did"
            title="Validating the Concept"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {IMPACT_STATS.map((impact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-[10px] bg-neutral-900/[0.035] dark:bg-neutral-100/[0.06]"
                >
                  <p className="text-3xl md:text-4xl font-medium text-neutral-900 dark:text-neutral-50 mb-2">{impact.value}</p>
                  <p className="text-[14px] text-neutral-900/55 dark:text-neutral-100/55">{impact.label}</p>
                </motion.div>
              ))}
            </div>
          </CaseStudySection>

          {/* 13 · Reflection */}
          <CaseStudySection
            num="11"
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
                  className="flex gap-4 items-start p-5 rounded-[10px] bg-neutral-900/[0.035] dark:bg-neutral-100/[0.06]"
                >
                  <span className="font-label text-[12px] font-medium tracking-[0.7px] text-[var(--csa)] dark:text-[var(--csa-dark)] pt-1 flex-shrink-0 tabular-nums">
                    0{i + 1}
                  </span>
                  <p className="text-[16px] leading-6 text-neutral-900/70 dark:text-neutral-100/70">
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
