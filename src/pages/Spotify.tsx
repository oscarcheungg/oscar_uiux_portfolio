import { useEffect } from 'react';
import { AlertCircle, TrendingDown, Clock } from 'lucide-react';
import { preloadMedia } from '../hooks/usePreload';
import VideoCarousel from '../components/VideoCarousel';
import { StickyShowcase } from '../components/StickyShowcase';
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFigure,
  CaseStudyCard,
  CaseStudyLayout,
  CaseStudyTLDR,
  CaseStudyCallout,
  CaseStudyPoints,
  CaseStudyPair,
  CaseStudyStats,
} from '../components/CaseStudy';
import { COVERS } from '../components/ProjectCover';

/* Spotify, told for a skim: a TL;DR up front, then six short sections that
   each lead with a visual: the problem, research, the flow, iterations, the
   final design and what I took away. */

const META = [
  { label: 'Role', value: 'Solo Product Designer' },
  { label: 'Timeline', value: '3 weeks' },
  { label: 'Tools', value: 'Figma, Figjam' },
  { label: 'Responsibilities', value: 'User interviews, Interaction design, Prototyping, Usability testing' },
];

const IMPACT = [
  {
    title: '5 taps down to 2',
    body: 'Switching a playlist on takes two taps for the first save, then one tap for every song after.',
  },
  {
    title: 'About 100 taps to 21',
    body: 'Building a 20-song playlist takes roughly 100 taps today and about 21 in Playlist Mode.',
  },
  {
    title: 'The active playlist stays visible',
    body: 'A green banner names the active playlist, so nobody has to guess where music is going.',
  },
  {
    title: 'Simpler, not bigger',
    body: 'Playlist Mode absorbed Edit and Add, so the action bar lost controls while gaining capability.',
  },
];

/* Five observations collapsed into the three that actually differ: the rest
   were symptoms of the same friction. Each carries the quote behind it. */
const PAIN_POINTS = [
  {
    icon: TrendingDown,
    title: 'Organisation Gets Deferred',
    description:
      'People fall back on the Like button because sorting music in the moment costs more effort than it is worth.',
    quote: "I just hit 'like' instead of organizing. My Liked Songs is a mess.",
  },
  {
    icon: Clock,
    title: 'Managing Playlists Interrupts Listening',
    description:
      'The add action lives behind a three-dot menu, so a lightweight intention turns into nested menus and a context switch.',
    quote: 'Why does it take so many taps? I usually just give up.',
  },
  {
    icon: AlertCircle,
    title: 'People Need to Know Where Music Is Going',
    description:
      'Users want to see which playlist they are adding to, and whether a song is already in it, without opening each one.',
    quote: "I can't tell if I already saved a song without checking every playlist.",
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
  { value: '5 → 2', label: 'taps for the first save' },
  { value: '60%', label: 'fewer taps on the first save' },
  { value: '1', label: 'tap for every song after' },
];

const PLAYLIST_TAPS = {
  title: 'Taps to build a 20-song playlist',
  rows: [
    { label: 'Today', value: 100, display: '~100' },
    { label: 'Playlist Mode', value: 21, display: '~21', accent: true },
  ],
};

const REFLECTIONS = [
  {
    title: 'It was a context problem, not a tap count',
    body: 'Testing showed people cared less about doing fewer things than about staying oriented while they listened. That is the insight my research missed.',
  },
  {
    title: 'Friction compounds with frequency',
    body: 'Two taps instead of five barely registers once, but across a twenty-song playlist it is the difference between organising as you listen and giving up on it.',
  },
  {
    title: 'Visual feedback makes a persistent mode safe',
    body: 'Users need to see which playlist is active before they trust a one-tap save.',
  },
  {
    title: 'The smallest change that helps',
    body: 'Because this was an enhancement to a mature product, I worked inside Spotify’s existing interaction language rather than inventing a new one.',
  },
];

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
    <div className="cs-page" data-accent="spotify">
      <CaseStudyLayout>
        <CaseStudyHeader
          title="Spotify Playlists Enhanced"
          subtitle="Organising music in Spotify means leaving whatever you are listening to and walking through a chain of menus. I explored whether playlist building could happen inside the listening experience instead of interrupting it: two taps to start, then one tap for every song after."
          meta={META}
          cover={COVERS['spotify']}
          coverAlt="Spotify Playlists Enhanced"
        />

        <CaseStudyTLDR
          summary={[
            'Saving a song to a playlist in Spotify means opening the three dot menu, tapping "Add to Playlist," scrolling and adding. Every time. So people hit Like instead, and Liked Songs becomes the dumping ground nobody sorts.',
            'Reddit threads, competitor tap counts and conversations with playlist builders confirmed it was not just me. I designed Playlist Mode: switch a playlist on, keep browsing, and add any song with one tap.',
          ]}
          impact={IMPACT}
        />

        {/* 01 · Problem + current experience */}
        <CaseStudySection num="01" label="Five taps a song" title="A Small Annoyance That Compounds">
          <VideoCarousel
            items={[
              { video: '/spotifyAssets/newPlaylistProblems.mp4', title: 'Adding to a playlist: five taps, every time', id: 1 },
              { video: '/spotifyAssets/quickAdd.mp4', title: 'Quick add overlay: limited playlist control', id: 2 },
            ]}
          />
          <p>
            This started with my own annoyance. Every time I saved a song, I had to open the three
            dot menu, tap "Add to Playlist," scroll, and add. That friction stacked up until playlist
            building felt like a chore, not part of listening.
          </p>
          <p className="mt-4">
            Spotify's existing add flow does help with selecting several songs at once, but it
            happens inside a dedicated overlay, so users still leave their normal browsing context.
          </p>
        </CaseStudySection>

        {/* 02 · Research, competitors and pain points */}
        <CaseStudySection num="02" label="It wasn't just me" title="What Users Told Me">
          <p className="mb-4">
            Before designing anything I wanted to know whether the frustration extended past my own
            habits. Reddit threads and discussion boards bring up playlist management constantly.
          </p>
          <CaseStudyFigure
            src="/spotifyAssets/quoteCitations.svg"
            alt="User Quotes from Reddit"
            bordered={false}
            className="max-w-[720px]"
          />
          <p className="mb-4">
            Comparing tap counts on YouTube Music and SoundCloud, I found both solve it in far fewer
            steps.
          </p>
          <CaseStudyFigure
            src="/spotifyAssets/spotifyCompetitorAnalysis.svg"
            alt="Competitor Analysis"
            bordered={false}
            className="max-w-[640px]"
            zoomable
          />
          <p className="mb-4">
            Then I talked with Spotify users I know who actively build and maintain playlists. Five
            observations came out of it, but three of them were the same friction wearing different
            clothes. These are what remained.
          </p>
          <div className="grid md:grid-cols-3 gap-2">
            {PAIN_POINTS.map((item) => (
              <CaseStudyCard key={item.title} className="h-full">
                <div className="w-9 h-9 rounded-[10px] bg-[var(--csa)]/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-[var(--csa)]" />
                </div>
                <h4>{item.title}</h4>
                <p className="mt-1">{item.description}</p>
                <p className="mt-3 italic text-neutral-900">"{item.quote}"</p>
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        {/* 03 · Before and after flows */}
        <CaseStudySection num="03" label="Editing in place" title="Before & After">
          <CaseStudyCallout>
            Instead of bringing songs into a playlist editor, bring playlist editing into the rest
            of Spotify.
          </CaseStudyCallout>
          <p className="mb-2">
            With the research in hand, I mapped Spotify's current flow and designed an enhanced
            version: fewer steps, all the same functionality.
          </p>
          <CaseStudyPair
            bare
            items={[
              {
                src: '/spotifyAssets/spotifyOriginalFlow.svg',
                alt: 'Spotify Original Flow',
                tag: 'The current user flow',
                caption:
                  'Mapping the current 4 to 5 step process confirmed what I heard in research: nested menus, context switches, and decision fatigue from branching paths all kill the groove.',
              },
              {
                src: '/spotifyAssets/enhancedFlow.svg',
                alt: 'Enhanced User Flow',
                tag: 'The enhanced user flow',
                caption:
                  'Playlist Mode turns a playlist into an active destination. Any song can be added with a single "+": five taps become two for the first save, then one for every song after.',
              },
            ]}
          />
        </CaseStudySection>

        {/* 04 · Iterations */}
        <CaseStudySection num="04" label="Finding the banner" title="Design Iterations">
          <p className="mb-2">
            With the flow set, I explored ways to signal when Playlist Mode is active and to
            simplify the UI, testing visual cues until the balance felt right.
          </p>
          <CaseStudyPair
            bare
            items={[
              {
                src: '/spotifyAssets/activeState.svg',
                alt: 'Active State Design Explorations',
                tag: 'Active state explorations',
                caption:
                  "Green inner shadows proved too distracting, and a subtle top shadow never said which playlist was active. A green banner names it while fitting Spotify's existing patterns.",
                zoomable: true,
              },
              {
                src: '/spotifyAssets/uiSimplification.svg',
                alt: 'UI Simplification Explorations',
                tag: 'UI simplification explorations',
                caption:
                  'I added quick sorting within playlists, folded Edit into Playlist Mode, and removed the Add button since songs can now be added from anywhere. A simpler bar, with more capability.',
                zoomable: true,
              },
            ]}
          />
        </CaseStudySection>

        {/* 05 · Final design + validation */}
        <CaseStudySection num="05" label="Playlist Mode" title="The Final Design">
          <p className="mb-4">
            Together these keep organising inside the listening experience: two taps to switch a
            playlist on, then one tap per song, with the active playlist always visible.
          </p>
          <StickyShowcase sections={SOLUTION_SECTIONS} />
          <CaseStudyStats label="In the prototype" stats={IMPACT_STATS} compare={PLAYLIST_TAPS} />
        </CaseStudySection>

        {/* 06 · Reflection */}
        <CaseStudySection num="06" label="Taps weren't it" title="Key Takeaways">
          <CaseStudyPoints items={REFLECTIONS} />
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
