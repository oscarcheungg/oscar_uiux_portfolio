import { GraduationCap, Briefcase, Sparkles, Music, Activity, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Masonry from '../components/Masonry';

export function About() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Load Strava embed script and ensure full width
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://strava-embeds.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // After script loads, ensure embed is full width
    script.onload = () => {
      // Wait a bit for the embed to render, then apply full width
      setTimeout(() => {
        const embedElements = document.querySelectorAll('[data-embed-type="activity"]');
        embedElements.forEach((element) => {
          const htmlElement = element as HTMLElement;
          htmlElement.style.width = '100%';
          htmlElement.style.maxWidth = '100%';
          
          // Also target any iframes or divs inside
          const iframes = htmlElement.querySelectorAll('iframe');
          iframes.forEach((iframe) => {
            iframe.style.width = '100%';
            iframe.style.maxWidth = '100%';
          });
          
          const innerDivs = htmlElement.querySelectorAll('div');
          innerDivs.forEach((div) => {
            div.style.width = '100%';
            div.style.maxWidth = '100%';
          });
        });
      }, 1000);
    };

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector('script[src="https://strava-embeds.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const experiences = [
    { company: 'Quantifyd', role: 'UI/UX Design Intern', color: 'from-purple-500 to-pink-500' },
    { company: '1893 Brand Studio', role: 'UI/UX Designer', color: 'from-blue-500 to-cyan-500' },
    { company: 'App Team Carolina', role: 'UI/UX Production Team', color: 'from-green-500 to-emerald-500' },
    { company: 'CS + Social Good', role: 'UI/UX Production Team', color: 'from-orange-500 to-red-500' },
    { company: 'UNC Computer Science', role: 'Undergraduate TA', color: 'from-indigo-500 to-purple-500' },
  ];

  // Photo gallery - using all aboutAssets (no cropping, consistent columns)
  const photos = [
    {
      id: 1,
      url: '/oscarFam.jpg',
      caption: 'Got to visit my family in Hong Kong last summer. It is always nice to go back to the motherland 🇭🇰',
      isVideo: false
    },
    {
      id: 3,
      url: '/firstMarathon.JPG',
      caption: 'This was my first marathon at Indianapolis, qualified for Boston!',
      isVideo: false
    },
    {
      id: 4,
      url: '/oscarCook.jpg',
      caption: 'Grew up in the restaurant, cooking is definnitely one of my passions!',
      isVideo: false
    },
    {
      id: 5,
      url: '/seoulKorea.mp4',
      caption: 'This is Han River in Seoul, Korea. Studying here for a summer was amazing!',
      isVideo: true
    },
    {
      id: 6,
      url: '/oscarRun.jpg',
      caption: 'The Tar Heel 10 Miler, my first ever race! Placed top 15 in my age group :)',
      isVideo: false
    },
    {
      id: 18,
      url: '/oscarPose.JPG',
      caption: 'New York subway station. I will never get tired of the city life',
      isVideo: false
    },
    {
      id: 7,
      url: '/oscarCafe.mp4',
      caption: 'Cafe hopping is one of my favorite ways to explore new cities, this one in particular was in Toronto. One of my dreams is to run a cafe one day haha',
      isVideo: true
    },
    {
      id: 9,
      url: '/runwithFriends.mp4',
      caption: 'You will always will find me running with friends. Strava is oscar cheung for my fellow runners ',
      isVideo: true
    },
    {
      id: 10,
      url: '/oscarCookWithFriends.JPG',
      caption: 'Cooking with friends',
      isVideo: false
    },
    {
      id: 11,
      url: '/oscarGrill.jpg',
      caption: 'My friends and I always are experimenting with new and healthy recipes',
      isVideo: false
    },
    {
      id: 12,
      url: '/oscarJapan.jpg',
      caption: 'Kyoto, Japan, a city filled with culture and history',
      isVideo: false
    },
    {
      id: 13,
      url: '/giggle.JPG',
      caption: 'Just a funny pic lmaoo',
      isVideo: false
    },
    {
      id: 14,
      url: '/oscarHangout.jpg',
      caption: 'Our semesterly hangouts with CUSA Exec',
      isVideo: false
    },
    {
      id: 16,
      url: '/oscarCUSA.jpg',
      caption: 'Our CUSA Exec Dance at our annual CNY 😭',
      isVideo: false
    },
    {
      id: 17,
      url: '/cusaHangout.PNG',
      caption: 'The best exec board 🫶🏻',
      isVideo: false
    },
    {
      id: 2,
      url: '/osakaJapan.mp4',
      caption: 'Osaka was my favorite city in Japan. Laid back but still had the city vibes.',
      isVideo: true
    },
    {
      id: 19,
      url: '/oscarCN.jpg',
      caption: 'I love traveling, have been to 5 countries so far! This is my most recent trip to Toronto, Canada 🇨🇦, would love to live here one day.',
      isVideo: false
    },
    {
      id: 20,
      url: '/flying.JPG',
      caption: 'Recently picked up on Chinese fan dancing as a hobby, check out @uncflyingsilk on Instagram!',
      isVideo: false
    },
    {
      id: 21,
      url: '/oscarFlick.jpg',
      caption: 'Always got to flick up for the Instagram 😃',
      isVideo: false
    },
    {
      id: 22,
      url: '/oscarApe.jpg',
      caption: 'Grew up loving Japanese streetwear, especially Bathing Ape. Going to this store in Tokyo, Japan was a dream come true.',
      isVideo: false
    },
    {
      id: 23,
      url: '/happy.JPG',
      caption: 'The Flying Silk team 🫶🏻',
      isVideo: false
    },
    {
      id: 24,
      url: '/moreFriends.jpg',
      caption: 'More friends!!',
      isVideo: false
    },
  ];

  const handlePrevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
    }
  };

  const handleNextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1);
    }
  };

  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 md:mb-20 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left side - Text content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#E5D9F2]/50 to-[#D4C5E8]/50 dark:from-[#532C7F]/20 dark:to-[#7B4FB8]/20 rounded-full mb-6 border border-[#532C7F]/30 dark:border-[#532C7F]/40 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#7B4FB8] dark:text-[#8B5FCF]" />
              <span className="text-sm text-[#7B4FB8] dark:text-[#8B5FCF]">Open to new opportunities</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-50 font-normal"
            >
              Hey there{' '}
              <motion.span
                className="inline-block origin-[70%_70%]"
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.2 }}
              >
                👋🏻
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
            >
              I've been lucky enough to work on all sorts of problems at the intersection of design and technology, building intuitive digital experiences across web and mobile, all with some pretty talented people by my side. A thousand prototypes later and I'd do it all over again.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4"
            >
              Here's to the next thousand.
            </motion.p>
          </div>

          {/* Right side - Profile image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center md:justify-end"
          >
            <img 
              src="/oscarProfile.svg" 
              alt="Oscar Cheung" 
              className="w-full max-w-md h-auto"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Experience & Education Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Experience */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Briefcase className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
              <h2 className="text-xl md:text-2xl text-neutral-900 dark:text-neutral-100">Experience</h2>
            </div>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index} 
                  onHoverStart={() => setHoveredExp(index)}
                  onHoverEnd={() => setHoveredExp(null)}
                  whileHover={{ x: 5 }}
                  className="relative cursor-pointer pb-4 border-b border-neutral-200 dark:border-neutral-800 last:border-0"
                >
                  <p className="text-neutral-900 dark:text-neutral-100 mb-1">
                    {exp.company}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {exp.role}
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredExp === index ? '100%' : 0 }}
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${exp.color}`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <GraduationCap className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
              <h2 className="text-xl md:text-2xl text-neutral-900 dark:text-neutral-100">Education</h2>
            </div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              University of North Carolina at Chapel Hill
            </p>
            <div className="flex gap-2 md:gap-3 flex-wrap">
              <span className="text-base md:text-lg text-neutral-600 dark:text-neutral-400">B.A. Computer Science</span>
              <span className="text-base md:text-lg text-neutral-400 dark:text-neutral-600">•</span>
              <span className="text-base md:text-lg text-neutral-600 dark:text-neutral-400">B.S. Information Science</span>
            </div>
          </motion.div>
        </div>

        {/* Spotify & Strava */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Spotify & Strava */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Spotify Embeds */}
            <div className="space-y-0">
              {/* Currently on repeat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Music className="w-4 h-4 text-neutral-500" />
                  <h3 className="text-lg text-neutral-900 dark:text-neutral-100">Currently on repeat</h3>
                </div>
                <div className="w-full" style={{ minHeight: '500px' }}>
                  <iframe 
                    data-testid="embed-iframe" 
                    title="Spotify Player"
                    className="w-full h-[352px] md:h-[500px] rounded-xl"
                    style={{ borderRadius: '12px', width: '100%' }}
                    src="https://open.spotify.com/embed/track/4osRLDg7abL4hLdfZ1c39g?utm_source=generator" 
                    frameBorder="0" 
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Second Spotify embed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                style={{ marginTop: '-120px' }}
              >
                <div className="w-full">
                  <iframe 
                    data-testid="embed-iframe" 
                    title="Spotify Player"
                    className="w-full h-[280px] md:h-[352px] rounded-xl"
                    style={{ borderRadius: '12px', width: '100%' }}
                    src="https://open.spotify.com/embed/track/2TfsNTyC4uuamXBZJnU0ga?utm_source=generator" 
                    frameBorder="0" 
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>

            {/* Strava Activity Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#FC4C02]" />
                <h3 className="text-lg text-neutral-900 dark:text-neutral-100">My latest marathon</h3>
              </div>
              <div className="w-full overflow-hidden min-h-[400px] md:min-h-[500px]">
                <div 
                  className="strava-embed-placeholder w-full min-h-[400px] md:min-h-[500px]" 
                  data-embed-type="activity" 
                  data-embed-id="16395296607" 
                  data-style="standard" 
                  data-from-embed="false"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Life in Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 mb-0"
        >
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-4 h-4 text-neutral-500" />
            <h3 className="text-lg text-neutral-900 dark:text-neutral-100">Life in snippets</h3>
          </div>
          
          <Masonry
            items={photos}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            blurToFocus={true}
          />
        </motion.div>

        {/* Lightbox Modal */}
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 touch-manipulation"
              aria-label="Close"
            >
              <X className="w-6 h-6 md:w-5 md:h-5 text-white" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 touch-manipulation"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 md:w-5 md:h-5 text-white" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 touch-manipulation"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 md:w-5 md:h-5 text-white" />
            </button>

            {/* Image or Video */}
            <motion.div
              key={selectedPhoto}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh]"
            >
              {photos[selectedPhoto].isVideo ? (
                <video
                  src={photos[selectedPhoto].url}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="auto"
                />
              ) : (
                <img
                  src={photos[selectedPhoto].url}
                  alt={photos[selectedPhoto].caption}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  loading="eager"
                  decoding="async"
                />
              )}
              <p className="text-white text-center mt-4 text-base md:text-lg px-4">
                {photos[selectedPhoto].caption}
              </p>
            </motion.div>

            {/* Photo counter */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {selectedPhoto + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
