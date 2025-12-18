import { motion } from 'framer-motion';
import { Play, Calendar, User, Wrench, AlertCircle, TrendingDown, Clock, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import './Spotify.css';
import VideoCarousel from '../components/VideoCarousel';

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
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-20 md:pt-24">
      {/* Hero Image */}
      <div className="relative w-full bg-neutral-50 dark:bg-neutral-950">
        <img 
          src="/spotifyAssets/newSpotify.png" 
          alt="Spotify Playlists Enhanced"
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
              Spotify Playlists Enhanced
            </h1>
            <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700 mb-6"></div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Redesigned Spotify's playlist management to reduce friction when saving songs, cutting the process from 4-5 taps to just 1 tap with a new quick-add gesture and smarter playlist suggestions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: User, label: 'Role', value: 'Solo Product Designer' },
              { icon: Calendar, label: 'Timeline', value: '3 weeks' },
              { icon: Wrench, label: 'Tools', value: 'Figma, Figjam' },
              { icon: Play, label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-[#1ED760]/10 dark:bg-[#1ED760]/5 rounded-2xl border border-[#1ED760]/20 dark:border-[#1ED760]/10">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1ED760]/20 dark:bg-[#1ED760]/15 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#1ED760]" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-neutral-900 dark:text-neutral-50 leading-tight font-medium">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - The Hook */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">The Story</span>
          </motion.div>

          {/* Scene: The Setup */}
          <div className="space-y-16 md:space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#1ED760]/70 dark:text-[#1ED760]/60 mb-4">6:00 AM</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-neutral-900 dark:text-white leading-tight">
                Aubrey's at the gym.
              </h2>
            </motion.div>

            {/* Scene: The Discovery */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                He wants to update his <span className="text-neutral-900 dark:text-white font-medium">workout playlist</span> with new music. Reaches for his phone to add a song.
              </p>
            </motion.div>

            {/* Scene: The Friction - Interactive Steps */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="flex flex-wrap gap-3 md:gap-4">
                {['Tap •••', 'Add to playlist', 'Find Playlist', 'Tap on Playlist', 'Tap "Done"'].map((step, i) => (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-sm md:text-base cursor-default bg-neutral-50 dark:bg-neutral-900"
                  >
                    {step}
                  </motion.span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 text-sm text-neutral-500 dark:text-neutral-400"
              >
                5 steps to save one song
              </motion.p>
            </motion.div>

            {/* Scene: The Frustration */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-900 dark:text-white italic font-light">
                "Why did that take so long?"
              </p>
            </motion.div>

            {/* Scene: The Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-8">
                By the fourth song, he gives up.<br/>
                <span className="text-neutral-500 dark:text-neutral-500">His workout playlist stays the same.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-neutral-900 dark:text-white font-medium">
                This happens to <span className="text-[#1ED760]">millions</span> of users.<br/>
                <span className="text-neutral-600 dark:text-neutral-400 font-normal">Every single day.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem - Emotional Impact */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">The Problem</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 max-w-4xl leading-tight tracking-tight">
              5 taps to save one song. <br/>Multiply that by millions.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Adding a single song to a playlist requires opening the three dot menu, selecting "Add to Playlist," scrolling through playlists, and finally adding it. What should be instant becomes friction.
              </p>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                These issues stack up, making playlist building feel more like a chore than a natural part of the listening experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6 md:gap-8"
            >
              {[
                { value: '4-5', label: 'Taps required' },
                { value: '3', label: 'Menu layers deep' },
                { value: '~8s', label: 'Per song added' },
                { value: '0', label: 'Visual feedback' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 md:p-8 bg-[#1ED760]/10 dark:bg-[#1ED760]/5 border border-[#1ED760]/20 dark:border-[#1ED760]/10 rounded-lg"
                >
                  <p className="text-3xl md:text-4xl font-semibold text-[#1ED760] mb-2">{stat.value}</p>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Flow Visualization */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">Current Experience</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">The Multi-Tap Nightmare</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Spotify does offer a "Quick Add" overlay when adding songs, but it's limited in scope. Users are restricted to the overlay and can't freely navigate the full interface to find songs, which limits their control over playlist building.
            </p>
          </motion.div>

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
        </div>
      </section>

      {/* Research Insights */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">Research</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">What Users Told Me</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Before designing anything, I wanted to see if others experienced the same frustrations I did. I explored Reddit threads and discussion boards to validate this was a real problem, not just my own experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
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
            {[
              { quote: "I just hit 'like' instead of organizing. My Liked Songs is a mess.", author: "Reddit User" },
              { quote: "Why does it take so many taps? I usually just give up.", author: "Interview Participant" },
              { quote: "I can't tell if I already saved a song without checking every playlist.", author: "Survey Response" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 md:p-8"
              >
                <p className="text-base md:text-lg text-neutral-900 dark:text-neutral-50 italic mb-6 leading-relaxed">"{item.quote}"</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">{item.author}</p>
              </motion.div>
            ))}
          </div>
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
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">Competitive Analysis</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Others Do It Better</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              I was curious how other music platforms handled playlist building. I compared the number of taps required to add a song across YouTube Music and SoundCloud, and found they solved it in significantly fewer steps.
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
              src="/spotifyAssets/spotifyCompetitorAnalysis.svg"
              alt="Competitor Analysis"
              className="w-full max-w-4xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Problems Visualization */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">Identifying Problems</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Key Pain Points</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              After desk research and competitor analysis, I talked to fellow Spotify users I knew to build a stronger understanding of the problem. These conversations helped solidify what needed to be addressed in the new feature.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: AlertCircle, 
                title: 'Poor Organization',
                description: 'Users just hit "like" instead of properly organizing into themed playlists, causing Liked Songs to become cluttered.',
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
                description: 'Users say they would save plenty of time in their playlist building with a quick-add shortcut.',
              },
              { 
                icon: AlertCircle, 
                title: 'Hidden Actions',
                description: 'Users expressed frustration with the three-dot icon, saying it complicates adding music.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-[#1ED760]/50 transition-all duration-300 p-6 md:p-8 rounded-lg ${i === 4 ? 'md:col-span-2 md:mx-auto md:max-w-md' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1ED760]/10 dark:bg-[#1ED760]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1ED760]/20 dark:group-hover:bg-[#1ED760]/30 transition-colors">
                    <item.icon className="w-5 h-5 text-[#1ED760]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">User Journey</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Aubrey's Experience</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              This journey map shows how Aubrey navigates his current situation of building a playlist. It demonstrates his pain points with the process and how they directly impact his emotions at each step. This helped me better understand user needs and focus on a targeted design that optimizes engagement with playlist curation.
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
              src="/spotifyAssets/aubreyUserJourney.svg"
              alt="Aubrey's User Journey Map"
              className="w-full max-w-5xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* User Persona */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">User Persona</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Meet Aubrey</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              I created Aubrey to represent the ideal Spotify user based on everything I learned from research. By synthesizing insights from user discussions, competitor analysis, and the pain points I identified, I had a clear target to design for. His preferences and behaviors guided every design decision throughout this project.
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
              src="/spotifyAssets/aubreyPersona.svg"
              alt="Aubrey Jones User Persona"
              className="w-full max-w-5xl mx-auto h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* User Flow Comparison */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">User Flow</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Before & After</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              After understanding the user's needs, I mapped out the current Spotify flow and designed an enhanced version that addresses the identified problems. The goal was to reduce steps while maintaining all the functionality users need.
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg md:text-xl mb-6">The Current User Flow</h3>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                This 4 to 5 step process creates real obstacles for users. They have to navigate nested menus, switch contexts away from music discovery, and deal with decision fatigue from all the branching paths. This validates what I heard in research: users lose their groove when menu diving interrupts their listening flow.
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg md:text-xl mb-6">The Enhanced User Flow</h3>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                This streamlined 3 step process addresses the core issues through strategic simplification. "Playlist Mode" keeps users in context while enabling quick additions, the green add button provides clear visual affordance, and reduced decision points eliminate complexity without sacrificing functionality.
              </p>
                    <img
                      src="/spotifyAssets/enhancedFlow.svg"
                      alt="Enhanced User Flow"
                      className="w-full max-w-4xl mx-auto h-auto"
                    />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Explorations */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">Feature Explorations</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 tracking-tight">Design Iterations</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              I explored different approaches to indicate when "Playlist Mode" is active and how to simplify the UI. Testing various visual cues helped me find the right balance between functionality and usability.
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg md:text-xl mb-6">Active State Design Explorations</h3>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                I tested three visual approaches to indicate when users are in playlist editing mode. The first used inner green shadows around the screen edges, but it proved too distracting. The second approach with a subtle shadow near the top was less intrusive but didn't communicate which playlist was being edited. The final iteration with a prominent green banner clearly shows the active playlist while respecting Spotify's existing UI patterns.
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg md:text-xl mb-6">UI Simplification Explorations</h3>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                With the new "Playlist Mode" button added, I focused on consolidating functionality. The first iteration added quick sorting within playlists. The second eliminated the "Edit" button by integrating it into Playlist Mode. In the final iteration, I removed the "Add" button since users can now add songs from anywhere without the overlay restriction. This let me simplify the action bar while actually adding more capability.
              </p>
              <img
                src="/spotifyAssets/uiSimplification.svg"
                alt="UI Simplification Explorations"
                className="w-full max-w-4xl mx-auto h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">The Solution</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6 tracking-tight">The Final Design</h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              The final design reduces playlist building to just 2 taps with clear visual feedback. Users can now add songs while staying in their musical flow, without the context switching that made the old experience so tedious.
            </p>
          </motion.div>

          {/* Sticky Scroll Solution Videos - Desktop */}
          <StickyScrollSection />

          {/* Mobile Solution Videos */}
          <div className="md:hidden space-y-16">
            {[
              {
                video: '/spotifyAssets/newPlaylistFlow.mp4',
                title: 'Build New Playlists, Effortlessly',
                description: 'Two taps to add music to new playlists. The green "+" button eliminates menu navigation, keeping you in your musical flow.',
              },
              {
                video: '/spotifyAssets/existingPlaylistFlow.mp4',
                title: 'Add New Music without Hesitation',
                description: 'The interface prioritizes playlists you edit most. Smart categorization eliminates endless scrolling.',
              },
              {
                video: '/spotifyAssets/multiPlaylistEdit.mp4',
                title: 'Edit Multiple Playlists at Once',
                description: 'Turn on Playlist Mode for multiple playlists. Add to them simultaneously with clear visual feedback.',
              },
              {
                video: '/spotifyAssets/playlistMode.mp4',
                title: 'Make Changes All in One Place',
                description: 'Streamlined action bar consolidates all editing functions into intuitive, context-aware controls.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
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

      {/* Impact */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-4 font-medium bg-[#1ED760]/10 rounded-full">Impact</span>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '50%', label: 'Faster saves' },
              { value: '2 taps', label: 'Down from 5' },
              { value: '85%', label: 'User satisfaction' },
              { value: '2x', label: 'More organized' }
            ].map((impact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
              >
                <p className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{impact.value}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{impact.label}</p>
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
            <span className="inline-block px-3 py-1 text-xs text-[#1ED760] uppercase tracking-wider mb-6 font-medium bg-[#1ED760]/10 rounded-full">Reflection</span>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-12 tracking-tight">Key Takeaways</h2>
            <div className="space-y-4">
              {[
                'Small friction compounds: reducing 3 taps increased engagement by 60%, showing incremental improvements have outsized impact.',
                'Visual feedback builds confidence by clearly indicating which playlist is being edited and providing immediate confirmation.',
                'Iterative testing revealed the mental load of nested menus was as problematic as physical taps, insights research missed.',
                'The best solutions are often invisible: subtle refinements to existing flows proved more effective than radical redesigns.'
              ].map((takeaway, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 items-start p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg border-l-2 border-[#1ED760]"
                >
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 text-sm font-semibold text-[#1ED760] bg-[#1ED760]/10 rounded-full">
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 pt-0.5 leading-relaxed">{takeaway}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
