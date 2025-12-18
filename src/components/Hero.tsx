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
    <section className="min-h-screen px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main content */}
          <div className="lg:col-span-1">
            {/* Main content */}
            <div className="mb-12 mt-20">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-base md:text-lg text-neutral-500 dark:text-neutral-500 mb-4 md:mb-6"
              >
                product designer • chapel hill, nc
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-50"
              >
                hey, i'm oscar 🍵
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 md:mb-12 leading-relaxed max-w-3xl"
              >
                i design elegant, data-driven experiences that help people accomplish their goals with clarity and delight.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-wrap"
              >
                <a
                  href="#work"
                  onClick={handleViewProjectsClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation text-base"
                >
                  view projects
                </a>
                
                <a
                  href="mailto:hello@oscarcheung.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] border-2 border-neutral-300 dark:border-neutral-700 rounded-full text-neutral-900 dark:text-neutral-100 hover:border-neutral-900 dark:hover:border-neutral-400 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation text-base"
                >
                  <Mail className="w-4 h-4" />
                  say hello
                </a>
              </motion.div>
            </div>

            {/* Currently card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#E5D9F2]/50 to-[#D4C5E8]/50 dark:from-[#532C7F]/20 dark:to-[#7B4FB8]/20 rounded-2xl px-6 py-4 border border-[#532C7F]/30 dark:border-[#532C7F]/40 w-full sm:w-64 transition-all duration-300 mt-6 md:mt-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-[#8B5FCF] rounded-full animate-pulse"></div>
                <p className="text-xs uppercase tracking-wider text-[#7B4FB8] dark:text-[#8B5FCF]">currently</p>
              </div>
              <p className="text-lg text-[#7B4FB8] dark:text-[#A17FDF]">designing cool things ✏️</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

