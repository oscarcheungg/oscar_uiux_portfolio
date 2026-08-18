import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/oscarcheungg', Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/oscarcheungg', Icon: Github },
  { label: 'Instagram', href: 'https://instagram.com/oscar.cheungg', Icon: Instagram },
  { label: 'Email', href: 'mailto:ocheung@unc.edu', Icon: Mail },
];

/* Inter at regular weight, links held back to ~55% opacity and resolving to
   full ink on hover. */
const NAV_LINK =
  'text-[16px] text-neutral-900/55 hover:text-neutral-900 transition-colors';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /* On the home page the first screen is the graphic alone, so the whole bar
     stays out of the way until the page moves. Elsewhere it is always there. */
  const revealOnScroll = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shown = scrolled || !revealOnScroll;

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
            behavior: 'smooth',
          });
        }
      }, 300);
    }
  }, [location]);

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      const workSection = document.getElementById('work');
      if (workSection) {
        const headerOffset = 100;
        const elementPosition = workSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      navigate('/#work');
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const socialLinks = (size: string) =>
    SOCIAL.map(({ label, href, Icon }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
        aria-label={label}
        /* Padding pulled back by an equal margin: a 40px hit area, unchanged layout. */
        className="-m-2.5 p-2.5 text-neutral-900/55 hover:text-neutral-900 transition-colors touch-manipulation"
      >
        <Icon className={size} />
      </a>
    ));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[opacity,transform] duration-300 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      {/* Glass layer — its own element so the whole pane (tint + blur) can fade
          as one, rather than the blur snapping on while the tint animates. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-white/80 backdrop-blur-sm transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative py-4">
      {/* Three tracks so the nav sits dead centre regardless of the side widths. */}
      {/* Padding inside the max-width box, exactly as the case study column
          does it, so the two line up at every viewport rather than drifting
          apart once the page is wider than the box. */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link
          to="/"
          /* Same ink as the nav links — held back to 55%, resolving on hover. */
          className="justify-self-start -my-2 py-2 text-[17px] text-neutral-900/55 hover:text-neutral-900 transition-colors"
          onClick={handleLogoClick}
        >
          Oscar Cheung
        </Link>

        {/* Centre — navigation */}
        <nav className="hidden md:flex items-center gap-6 justify-self-center">
          <a href="#work" onClick={handleWorkClick} className={NAV_LINK}>
            Work
          </a>
          <Link to="/about" className={NAV_LINK}>
            About
          </Link>
          <a
            href="/Oscar_Cheung_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={NAV_LINK}
          >
            Resume
          </a>
        </nav>

        {/* Right — social */}
        <div className="hidden md:flex items-center gap-4 justify-self-end">
          {socialLinks('w-[18px] h-[18px]')}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden col-start-3 justify-self-end">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white/20 text-neutral-800 touch-manipulation"
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
          className="md:hidden mx-6 md:mx-8 mt-4 bg-white/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-xl p-4"
        >
          <div className="flex flex-col gap-2">
            <a
              href="#work"
              onClick={(e) => {
                handleWorkClick(e);
                setMobileMenuOpen(false);
              }}
              className="px-4 py-3 rounded-lg text-[17px] text-neutral-600 hover:bg-white/40 hover:text-neutral-900 transition-all touch-manipulation"
            >
              Work
            </a>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-[17px] text-neutral-600 hover:bg-white/40 hover:text-neutral-900 transition-all touch-manipulation"
            >
              About
            </Link>
            <a
              href="/Oscar_Cheung_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-[17px] text-neutral-600 hover:bg-white/40 hover:text-neutral-900 transition-all touch-manipulation"
            >
              Resume
            </a>

            <div className="flex items-center gap-6 px-4 pt-3 mt-1 border-t border-neutral-200">
              {socialLinks('w-5 h-5')}
            </div>
          </div>
        </motion.nav>
      )}
      </div>
    </header>
  );
}
