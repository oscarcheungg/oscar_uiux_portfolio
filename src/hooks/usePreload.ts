import { useEffect } from 'react';

/**
 * Preloads images and videos for faster loading
 */
export const preloadMedia = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          if (url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.webm')) {
            // Preload videos
            const video = document.createElement('video');
            video.src = url;
            video.preload = 'auto';
            video.oncanplaythrough = () => resolve();
            video.onerror = () => resolve(); // Resolve even on error to not block other preloads
            // Force load
            video.load();
          } else {
            // Preload images
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resolve even on error to not block other preloads
          }
        })
    )
  );
};

/**
 * Hook to preload media assets
 */
export const usePreload = (urls: string[], enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled || urls.length === 0) return;
    preloadMedia(urls);
  }, [urls, enabled]);
};
