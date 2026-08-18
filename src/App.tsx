import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Header />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;

