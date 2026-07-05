import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';

/**
 * Full-screen "locked" notice for a password-protected, in-progress case study.
 */
interface PasswordModalProps {
  onClose: () => void;
}

export function PasswordModal({ onClose }: PasswordModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 flex items-center justify-center px-6"
    >
      {/* Back to work — top-left */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 text-xs tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        work
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md text-center"
      >
        <Lock className="w-9 h-9 text-neutral-400 dark:text-neutral-500 mx-auto mb-6" />
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
          This case study is password protected and still in the works. Check back soon!
        </p>
      </motion.div>
    </motion.div>
  );
}
