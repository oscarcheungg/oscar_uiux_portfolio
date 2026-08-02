import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="px-4 sm:px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16">
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
          className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-3xl"
        >
          i design elegant, data-driven experiences that help people accomplish their goals with
          clarity and delight.
        </motion.p>
      </div>
    </section>
  );
}
