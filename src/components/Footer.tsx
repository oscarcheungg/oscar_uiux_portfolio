import { Linkedin, Github, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 md:py-20 px-4 sm:px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-3 md:space-y-4">
          <p className="text-base md:text-lg text-neutral-900 dark:text-neutral-100">
            oscar cheung • 2025
          </p>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            i'm always up for a chat ☕
          </p>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 break-words">
            get in touch below or directly at{' '}
            <a 
              href="mailto:ocheung@unc.edu"
              className="text-blue-600 dark:text-blue-400 hover:underline touch-manipulation"
            >
              ocheung@unc.edu
            </a>
          </p>
          <div className="flex items-center gap-4 md:gap-4 pt-2">
            <a
              href="https://linkedin.com/in/oscarcheungg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors touch-manipulation w-10 h-10 flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/oscarcheungg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors touch-manipulation w-10 h-10 flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/oscar.cheungg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors touch-manipulation w-10 h-10 flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

