import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const preloadVideos = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const video = document.createElement('video');
          video.src = src;
          video.preload = 'auto';
          video.oncanplaythrough = () => resolve();
          video.onerror = () => resolve();
          video.load();
        })
    )
  );
};

interface Photo {
  id: number;
  url: string;
  caption: string;
  isVideo: boolean;
  height?: number;
}

interface GridItem extends Photo {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Photo[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  blurToFocus?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease: _ease = 'power3.out',
  duration: _duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  blurToFocus = true
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  // Load images and calculate aspect ratios
  useEffect(() => {
    const loadMedia = async () => {
      const ratioPromises = items.map((item, index) => {
        return new Promise<{ index: number; aspectRatio: number }>((resolve) => {
          if (item.isVideo) {
            const video = document.createElement('video');
            video.src = item.url;
            video.onloadedmetadata = () => {
              const aspectRatio = video.videoHeight / video.videoWidth; // height/width
              resolve({ index, aspectRatio });
            };
            video.onerror = () => {
              resolve({ index, aspectRatio: 1.33 }); // Default 3:4 aspect ratio
            };
          } else {
            const img = new Image();
            img.src = item.url;
            img.onload = () => {
              const aspectRatio = img.height / img.width; // height/width
              resolve({ index, aspectRatio });
            };
            img.onerror = () => {
              resolve({ index, aspectRatio: 1.33 }); // Default 3:4 aspect ratio
            };
          }
        });
      });

      const ratios = await Promise.all(ratioPromises);
      const ratioMap: Record<number, number> = {};
      ratios.forEach(({ index, aspectRatio }) => {
        ratioMap[index] = aspectRatio;
      });
      setAspectRatios(ratioMap);

      // Preload images and videos
      const imageUrls = items.filter(item => !item.isVideo).map(item => item.url);
      const videoUrls = items.filter(item => item.isVideo).map(item => item.url);
      
      // Preload in parallel for faster loading
      await Promise.all([
        preloadImages(imageUrls),
        preloadVideos(videoUrls)
      ]);
      
      setImagesReady(true);
    };

    loadMedia();
  }, [items]);

  const [containerHeight, setContainerHeight] = useState(0);

  const grid = useMemo<GridItem[]>(() => {
    if (!width || !imagesReady || Object.keys(aspectRatios).length === 0) return [];

    const columnWidth = width / columns;
    const itemWidth = columnWidth; // No padding, full width
    const gap = 8; // Gap between items

    // Calculate all item heights first
    const itemsWithHeights = items.map((child, index) => {
      const aspectRatio = aspectRatios[index] || 1.33;
      const height = itemWidth * aspectRatio;
      return { child, height, index };
    });

    // Sort by height descending (tallest first) for better column balance
    itemsWithHeights.sort((a, b) => b.height - a.height);

    // Distribute items across columns trying to balance heights
    const colHeights = new Array(columns).fill(0);
    const columnBuckets: Array<Array<{ itemIndex: number; height: number }>> = Array(columns)
      .fill(null)
      .map(() => []);

    itemsWithHeights.forEach(({ height, index: originalIndex }) => {
      // Find the column with the smallest height
      let bestCol = 0;
      let minHeight = colHeights[0];
      for (let i = 1; i < columns; i++) {
        if (colHeights[i] < minHeight) {
          minHeight = colHeights[i];
          bestCol = i;
        }
      }

      // Add item to the shortest column's bucket
      columnBuckets[bestCol].push({ itemIndex: originalIndex, height });
      colHeights[bestCol] += height + gap;
    });

    // Sort items within each column by their original index to preserve order
    // This ensures items maintain their relative positions within columns
    columnBuckets.forEach((bucket) => {
      bucket.sort((a, b) => a.itemIndex - b.itemIndex);
    });

    // Build assignments with y positions based on sorted order within columns
    const columnAssignments: Array<{ itemIndex: number; col: number; y: number; height: number }> = [];
    const finalColHeights = new Array(columns).fill(0);

    columnBuckets.forEach((bucket, col) => {
      let y = 0;
      bucket.forEach(({ itemIndex, height }) => {
        columnAssignments.push({ itemIndex, col, y, height });
        y += height + gap;
      });
      finalColHeights[col] = y;
    });

    // Build grid items array in original order using Map for O(1) lookup
    const assignmentMap = new Map(columnAssignments.map(a => [a.itemIndex, a]));
    const gridItems: GridItem[] = items.map((child, index) => {
      const assignment = assignmentMap.get(index)!;
      const x = columnWidth * assignment.col;
      return {
        ...child,
        x,
        y: assignment.y,
        w: itemWidth,
        h: assignment.height
      };
    });

    // Calculate the tallest column height
    const maxHeight = Math.max(...finalColHeights) - gap; // Subtract last gap
    setContainerHeight(maxHeight);

    return gridItems;
  }, [columns, items, width, imagesReady, aspectRatios]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    if (!hasMounted.current) {
      // Initial animation on first mount
      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration: 0.6,
          ease: 'power2.out',
          delay: index * stagger
        });
      });
      hasMounted.current = true;
    } else {
      // After initial mount, use GSAP set for immediate updates without animation
      // This is more performant than animating every item on every layout change
      requestAnimationFrame(() => {
        grid.forEach((item) => {
          gsap.set(`[data-key="${item.id}"]`, {
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h
          });
        });
      });
    }
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus]);

  return (
    <div 
      ref={containerRef} 
      className="masonry-list"
      style={{ height: containerHeight > 0 ? `${containerHeight}px` : undefined }}
    >
      {grid.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="masonry-item-wrapper"
          >
            {item.isVideo ? (
              <video
                src={item.url}
                className="masonry-media"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            ) : (
              <img
                src={item.url}
                alt={item.caption}
                className="masonry-media"
                loading="eager"
                decoding="async"
              />
            )}
            <div className="masonry-caption">
              <p>{item.caption}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;

