import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Centible } from './pages/Centible';
import { Spotify } from './pages/Spotify';
import { Bite } from './pages/Bite';
import { GoldenDragon } from './pages/GoldenDragon';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/centible" element={<Centible />} />
            <Route path="/spotify" element={<Spotify />} />
            <Route path="/bite" element={<Bite />} />
            <Route path="/goldendragon" element={<GoldenDragon />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

