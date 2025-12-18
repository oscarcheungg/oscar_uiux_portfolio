import { motion } from 'framer-motion';
import { User, Calendar, Wrench, Play, Construction, Users } from 'lucide-react';

export function Centible() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-20 md:pt-24">
      {/* Hero Image */}
      <div className="relative w-full bg-neutral-50 dark:bg-neutral-950">
        <img 
          src="/centibleCover.png" 
          alt="Filtering Transactions for Centible"
          className="w-full h-auto"
        />
      </div>

      {/* Hero Title Section */}
      <section className="bg-neutral-50 dark:bg-neutral-950 pt-8 md:pt-12 pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 leading-tight tracking-tight text-neutral-900 dark:text-neutral-50">
              Filtering Transactions for Centible
            </h1>
            <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700 mb-6"></div>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              A financial management tool designed specifically for college students navigating independent living. Developed through App Team Carolina to address the unique challenges of unpredictable, fluctuating student incomes through intuitive design and thoughtful user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { icon: User, label: 'Role', value: 'Product Designer' },
              { icon: Users, label: 'Team', value: '1 PM\n2 engineers\n2 designers' },
              { icon: Calendar, label: 'Timeline', value: '2 months' },
              { icon: Wrench, label: 'Tools', value: 'Figma, Figjam' },
              { icon: Play, label: 'Responsibilities', value: 'UX Research, Design Thinking, Wireframing, Prototyping' }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-neutral-900 dark:text-neutral-50 leading-tight font-medium whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Under Construction Notice */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6">
              <Construction className="w-8 h-8 md:w-10 md:h-10 text-neutral-600 dark:text-neutral-400" />
            </div>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The rest of this case study is under construction and will be updated soon!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

