import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

export function Hero() {
  const handleViewProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen min-h-[100svh] flex flex-col justify-end px-4 sm:px-6 md:px-12 pt-24 pb-16 md:pb-20">
      {/* Bottom-left anchored content */}
      <div className="max-w-7xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15] font-normal text-neutral-900 dark:text-neutral-50 mb-5 md:mb-6"
        >
          hey, i'm oscar cheung
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-3xl mb-8 md:mb-10"
        >
          i design elegant, data-driven experiences that help people accomplish their goals with
          clarity and delight.{' '}
          <span className="gradient-text-purple">currently designing @ 84.51°.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <a
            href="#work"
            onClick={handleViewProjectsClick}
            className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 rounded-full border border-neutral-900 dark:border-neutral-50 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 touch-manipulation text-base"
          >
            view work
          </a>

          <a
            href="mailto:hello@oscarcheung.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] border border-neutral-300 dark:border-neutral-700 rounded-full text-neutral-900 dark:text-neutral-100 hover:border-neutral-900 dark:hover:border-neutral-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 touch-manipulation text-base"
          >
            <Mail className="w-4 h-4" />
            say hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
