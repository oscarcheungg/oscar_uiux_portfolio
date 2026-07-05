import { X, ChevronLeft, ChevronRight, MapPin, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Masonry from '../components/Masonry';
import { StravaCard } from '../components/StravaCard';

// Music — Spotify tracks shown as cards with a faded album cover behind the
// player, 2×2 grid. bg is a lightened album colour that shows through the
// semi-transparent cover. Swap the track id + cover to update.
const MUSIC = [
  { id: '2lC1QmgOjizg5GsGUGeIBQ', bg: '#f6e5d8', cover: '/spotifyAssets/covers/allwedoistalk.jpg' },
  { id: '2mJUxAVOkNMsEZ9u3mCIqq', bg: '#c7c1f7', cover: '/spotifyAssets/covers/differentsummer.jpg' },
  { id: '3JgcOpOZVPAvcJbCVQD5xD', bg: '#e2e3e4', cover: '/spotifyAssets/covers/superhero.jpg' },
  { id: '37xebnhvUyM8VyyDDeo65d', bg: '#e8c5ca', cover: '/spotifyAssets/covers/neverletgo.jpg' },
];

export function About() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const experiences = [
    { company: '84.51°', role: 'Product Design Intern', when: 'Summer 2026' },
    { company: 'Quantifyd', role: 'UI/UX Design Intern', when: 'Summer 2025' },
    { company: 'App Team Carolina', role: 'UI/UX Production Team', when: '' },
    { company: 'UNC Computer Science', role: 'Web Design & Development UTA', when: '' },
    { company: '1893 Brand Studio', role: 'UI/UX Designer', when: '' },
    { company: 'CS + Social Good', role: 'UI/UX Production Team', when: '' },
  ];

  // Photo gallery - mirrors the media in assets/aboutAssets (no cropping, consistent columns)
  const photos = [
    {
      id: 1,
      url: '/oscarFam.jpg',
      caption: 'Got to visit my family in Hong Kong last summer. It is always nice to go back to the motherland 🇭🇰',
      isVideo: false
    },
    {
      id: 2,
      url: '/firstMarathon.JPG',
      caption: 'This was my first marathon at Indianapolis, qualified for Boston!',
      isVideo: false
    },
    {
      id: 3,
      url: '/50k.jpg',
      caption: 'Went the distance and finished my first 50k ultra 🏃', // TODO: tweak caption
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
      url: '/oscarxixi.jpg',
      caption: 'oscar', // TODO: alt text (captions aren't shown, used for accessibility)
      isVideo: false
    },
    {
      id: 6,
      url: '/oscarPose.JPG',
      caption: 'New York subway station. I will never get tired of the city life',
      isVideo: false
    },
    {
      id: 7,
      url: '/oscarBread.JPG',
      caption: 'Been getting into baking bread lately, nothing beats it fresh out the oven 🍞', // TODO: tweak caption
      isVideo: false
    },
    {
      id: 8,
      url: '/oscarFS.jpg',
      caption: 'oscar', // TODO: alt text
      isVideo: false
    },
    {
      id: 9,
      url: '/oscarCNYCUSA.jpg',
      caption: 'oscar', // TODO: alt text
      isVideo: false
    },
    {
      id: 10,
      url: '/oscarHotpot.JPG',
      caption: 'Hotpot nights with friends are always a good time 🍲', // TODO: tweak caption
      isVideo: false
    },
    {
      id: 11,
      url: '/giggle.JPG',
      caption: 'Just a funny pic lmaoo',
      isVideo: false
    },
    {
      id: 12,
      url: '/oscarHangout.jpg',
      caption: 'Our semesterly hangouts with CUSA Exec',
      isVideo: false
    },
    {
      id: 13,
      url: '/oscarCUSA.jpg',
      caption: 'Our CUSA Exec Dance at our annual CNY 😭',
      isVideo: false
    },
    {
      id: 14,
      url: '/cusaHangout.PNG',
      caption: 'The best exec board 🫶🏻',
      isVideo: false
    },
    {
      id: 15,
      url: '/oscarYap.JPEG',
      caption: 'Caught mid-yap as always 😅', // TODO: tweak caption
      isVideo: false
    },
    {
      id: 16,
      url: '/oscarCN.jpg',
      caption: 'I love traveling, have been to 5 countries so far! This is my most recent trip to Toronto, Canada 🇨🇦, would love to live here one day.',
      isVideo: false
    },
    {
      id: 17,
      url: '/flying.JPG',
      caption: 'Recently picked up on Chinese fan dancing as a hobby, check out @uncflyingsilk on Instagram!',
      isVideo: false
    },
    {
      id: 18,
      url: '/oscarFlick.jpg',
      caption: 'Always got to flick up for the Instagram 😃',
      isVideo: false
    },
    {
      id: 19,
      url: '/oscarApe.jpg',
      caption: 'Grew up loving Japanese streetwear, especially Bathing Ape. Going to this store in Tokyo, Japan was a dream come true.',
      isVideo: false
    },
    {
      id: 20,
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
    <section className="min-h-screen px-4 sm:px-6 md:px-12 pt-32 sm:pt-36 md:pt-44 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 md:mb-20 grid md:grid-cols-[1fr,300px] gap-8 md:gap-16 items-start">
          {/* Left side - Text content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-7 tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50 font-normal"
            >
              hey there 👋🏻
            </motion.h1>

            {/* Location + education meta row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mb-10 text-base md:text-lg text-neutral-500 dark:text-neutral-400"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                chapel hill, nc
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                B.A. Computer Science · B.S. Information Science, UNC Chapel Hill
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed"
            >
              I've been lucky enough to work on all sorts of problems at the intersection of design and technology, building intuitive digital experiences across web and mobile, all with some pretty talented people by my side. A thousand prototypes later and I'd do it all over again.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed mt-6"
            >
              Here's to the next thousand.
            </motion.p>
          </div>

          {/* Right side - Polaroid-style profile photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="justify-self-center md:justify-self-end w-full max-w-[300px]"
          >
            <img
              src="/oscarProfile.svg"
              alt="Oscar Cheung"
              className="w-full h-auto"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Experience — section heading beside a hairline table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-[240px,1fr] gap-4 md:gap-12 mb-12 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl tracking-tight font-normal text-neutral-900 dark:text-neutral-50">
            experience
          </h2>

          <div>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`grid sm:grid-cols-[200px,1fr,auto] gap-1 sm:gap-6 items-baseline py-5 border-b border-neutral-200 dark:border-neutral-800 ${index === 0 ? 'border-t' : ''}`}
              >
                <p className="text-neutral-900 dark:text-neutral-100 font-medium">
                  {exp.company}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {exp.role}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 sm:text-right whitespace-nowrap">
                  {exp.when}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Spotify & Strava — run column beside the 2×2 music grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid lg:grid-cols-[0.85fr,1.15fr] gap-8 md:gap-10 items-start"
        >
          {/* Latest run */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 className="text-xl md:text-2xl tracking-tight font-normal text-neutral-900 dark:text-neutral-50 mb-4">my latest run</h3>
            <StravaCard />
          </motion.div>

          {/* Music — photo cards with an embedded player, 2×2 grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <h3 className="text-xl md:text-2xl tracking-tight font-normal text-neutral-900 dark:text-neutral-50 mb-4">what i've been listening to</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {MUSIC.map((m) => (
                <div
                  key={m.id}
                  className="relative h-[240px] md:h-[248px] rounded-2xl overflow-hidden"
                  style={{ backgroundColor: m.bg }}
                >
                  <img
                    src={m.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    decoding="async"
                  />
                  <div className="absolute inset-x-2 bottom-2">
                    <iframe
                      title="Spotify Player"
                      className="w-full h-[80px]"
                      style={{ borderRadius: '12px' }}
                      src={`https://open.spotify.com/embed/track/${m.id}?utm_source=generator`}
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Life in Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 mb-0"
        >
          <h3 className="text-xl md:text-2xl tracking-tight font-normal text-neutral-900 dark:text-neutral-50 mb-6">life in snippets :)</h3>

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
