import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { preloadMedia } from '../hooks/usePreload';
import './VideoCarousel.css';

export interface VideoCarouselItem {
  video: string;
  title: string;
  id: number;
}

export interface VideoCarouselProps {
  items?: VideoCarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

export default function VideoCarousel({
  items = [],
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}: VideoCarouselProps): React.JSX.Element {
  const [position, setPosition] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Preload all videos when component mounts
  useEffect(() => {
    if (items.length > 0) {
      const videoUrls = items.map(item => item.video);
      preloadMedia(videoUrls);
    }
  }, [items]);

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
      // Get the first item to calculate item width
      const firstItem = scrollRef.current.querySelector('.video-carousel-item') as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        scrollRef.current.scrollTo({
          left: position * itemWidth,
          behavior: 'smooth'
        });
      }
    }
  }, [position]);

  // Update position based on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      // Get the first item to calculate item width
      const firstItem = scrollRef.current.querySelector('.video-carousel-item') as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const scrollLeft = scrollRef.current.scrollLeft;
        const newPosition = Math.round(scrollLeft / itemWidth);
        if (newPosition !== position && newPosition >= 0 && newPosition < items.length) {
          setPosition(newPosition);
        }
      }
    }
  };

  const handleIndicatorClick = (index: number) => {
    setPosition(index);
  };

  return (
    <div className="video-carousel-container">
      <div
        ref={scrollRef}
        className="video-carousel-scroll-track"
        onScroll={handleScroll}
      >
        {items.map((item) => (
          <div key={item.id} className="video-carousel-item">
            <div className="video-carousel-video-container">
              <video
                className="video-carousel-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="video-carousel-title">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="video-carousel-indicators-container">
        <div className="video-carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`video-carousel-indicator ${position === index ? 'active' : 'inactive'}`}
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
