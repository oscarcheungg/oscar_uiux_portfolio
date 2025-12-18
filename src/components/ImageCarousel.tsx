import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ImageCarousel.css';

export interface ImageCarouselItem {
  image: string;
  title?: string;
  id: number;
}

export interface ImageCarouselProps {
  items?: ImageCarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

export default function ImageCarousel({
  items = [],
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}: ImageCarouselProps): React.JSX.Element {
  const [position, setPosition] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pauseOnHover && scrollRef.current) {
      const container = scrollRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || items.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => {
        const next = loop ? (prev + 1) % items.length : (prev < items.length - 1 ? prev + 1 : 0);
        return next;
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, items.length, loop]);

  // Scroll to position when position changes (from autoplay or indicator click)
  useEffect(() => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: position * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [position]);

  // Update position based on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newPosition = Math.round(scrollLeft / itemWidth);
      if (newPosition !== position && newPosition >= 0 && newPosition < items.length) {
        setPosition(newPosition);
      }
    }
  };

  const handleIndicatorClick = (index: number) => {
    setPosition(index);
  };

  return (
    <div className="image-carousel-container">
      <div
        ref={scrollRef}
        className="image-carousel-scroll-track"
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <div key={item.id} className="image-carousel-item">
            <div className="image-carousel-image-container">
              <img
                src={item.image}
                alt={item.title || `Carousel item ${index + 1}`}
                className="image-carousel-image"
              />
            </div>
            {item.title && <p className="image-carousel-title">{item.title}</p>}
          </div>
        ))}
      </div>
      <div className="image-carousel-indicators-container">
        <div className="image-carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`image-carousel-indicator ${position === index ? 'active' : 'inactive'}`}
              animate={{
                scale: position === index ? 1.2 : 1
              }}
              onClick={() => handleIndicatorClick(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

