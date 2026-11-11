import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';
import { TopBar } from './components/TopBar';
import { PrefsProvider } from './lib/prefs';
import { installVideoCleanup } from './lib/media';
import './theme-dark.css';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Centible } from './pages/Centible';
import { Spotify } from './pages/Spotify';
import { Bite } from './pages/Bite';
import { GoldenDragon } from './pages/GoldenDragon';
import { Wigo } from './pages/Wigo';
import { EightyFourFiftyOne } from './pages/EightyFourFiftyOne';

/* Every route opens at its own top. Without this the browser keeps the scroll
   position from the page you just left, so opening a case study from halfway
   down the work grid drops you into the middle of it. A hash link (the "/#work"
   back link) is left alone — the header scrolls that one itself. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

/* The homepage brings its own chrome. Every other page (case studies and
   About) gets the same sound, lights and clock row at the top (see TopBar),
   finds its way back with its own "Back" link, and gets the footer. */
function PageTop() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return <TopBar className="site-top" />;
}

function PageChrome() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return <Footer />;
}

function App() {
  // Cancel the download of any video that leaves the page (see media.tsx).
  useEffect(() => installVideoCleanup(), []);
  return (
    <PrefsProvider>
    <Router>
      <div className="app-root">
        <ScrollToTop />
        <Cursor />
        <PageTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/centible" element={<Centible />} />
          <Route path="/spotify" element={<Spotify />} />
          <Route path="/bite" element={<Bite />} />
          <Route path="/goldendragon" element={<GoldenDragon />} />
          <Route path="/wigo" element={<Wigo />} />
          <Route path="/8451" element={<EightyFourFiftyOne />} />
        </Routes>
        <PageChrome />
      </div>
    </Router>
    </PrefsProvider>
  );
}

export default App;

