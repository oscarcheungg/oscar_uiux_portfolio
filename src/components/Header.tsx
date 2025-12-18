import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { GradientOrb } from './GradientOrb';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    // Scroll to work section if hash is #work after navigation
    if (location.hash === '#work') {
      setTimeout(() => {
        const workSection = document.getElementById('work');
        if (workSection) {
          const headerOffset = 100;
          const elementPosition = workSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [location]);

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname === '/') {
      // Already on home page, just scroll to work section
      const workSection = document.getElementById('work');
      if (workSection) {
        const headerOffset = 100;
        const elementPosition = workSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page with hash
      navigate('/#work');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 md:py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="transition-transform duration-700 ease-out group-hover:rotate-180">
            <GradientOrb />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl px-4 py-2 rounded-full border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <Link 
            to="/about" 
            className="px-4 py-2 rounded-full text-sm text-neutral-600 dark:text-neutral-400 hover:bg-white/40 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
          >
            about
          </Link>
          <a 
            href="#work" 
            onClick={handleWorkClick}
            className="px-4 py-2 rounded-full text-sm text-neutral-600 dark:text-neutral-400 hover:bg-white/40 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
          >
            work
          </a>
          <a 
            href="/CheungOscar_Resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-sm text-neutral-600 dark:text-neutral-400 hover:bg-white/40 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
          >
            resume
          </a>
          <div className="w-px h-6 bg-neutral-300/50 dark:bg-neutral-700/50 mx-1"></div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-all touch-manipulation"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-all touch-manipulation"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/20 dark:border-white/10 text-neutral-800 dark:text-neutral-200 touch-manipulation"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl p-4"
        >
          <div className="flex flex-col gap-2">
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-base text-neutral-600 dark:text-neutral-400 hover:bg-white/40 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all touch-manipulation"
            >
              about
            </Link>
            <a 
              href="#work" 
              onClick={(e) => {
                handleWorkClick(e);
                setMobileMenuOpen(false);
              }}
              className="px-4 py-3 rounded-lg text-base text-neutral-600 dark:text-neutral-400 hover:bg-white/40 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all touch-manipulation"
            >
              work
            </a>
            <a 
              href="/CheungOscar_Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-base text-neutral-600 dark:text-neutral-400 hover:bg-white/40 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all touch-manipulation"
            >
              resume
            </a>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

