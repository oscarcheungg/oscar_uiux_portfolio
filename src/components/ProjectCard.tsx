import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  index: number;
  link?: string;
}

export function ProjectCard({ title, category, year, description, image, index, link }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  // Preload image when component mounts
  useEffect(() => {
    const img = new Image();
    img.src = image;
  }, [image]);

  const content = (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className={`grid md:grid-cols-12 gap-6 md:gap-8 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}>
        {/* Image */}
        <div className={`${isEven ? 'md:col-span-7' : 'md:col-span-7 md:col-start-6'} relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-2xl aspect-[16/10] border border-neutral-200 dark:border-neutral-800`}>
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Year badge */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-full text-xs tracking-wider text-neutral-800 dark:text-neutral-200 transition-transform duration-300 group-hover:scale-110">
            {year}
          </div>
        </div>
        
        {/* Content */}
        <div className={`${isEven ? 'md:col-span-5' : 'md:col-span-5 md:col-start-1 md:row-start-1'} ${isEven ? 'md:pl-4' : 'md:pr-4'}`}>
          <p className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-600 mb-2 md:mb-3 transition-colors duration-300 group-hover:text-neutral-600 dark:group-hover:text-neutral-500">
            {category.toLowerCase()}
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors duration-300 leading-tight">
            {title.toLowerCase()}
          </h3>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-4 md:mb-6 leading-relaxed">
            {description.toLowerCase()}
          </p>
          <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 group-hover:gap-3 transition-all duration-300 text-base md:text-lg min-h-[44px] touch-manipulation">
            <span>view case study</span>
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} className="block">
        {content}
      </a>
    );
  }

  return content;
}

