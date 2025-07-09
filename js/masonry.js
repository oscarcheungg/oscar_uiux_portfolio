// Pure JS Masonry for about.html
// Usage: new Masonry(container, items)

class Masonry {
  constructor(container, items, options = {}) {
    this.container = container;
    this.items = items;
    this.options = {
      columns: 3,
      gap: 24,
      ...options
    };
    this.measuredItems = [];
    this.init();
    window.addEventListener('resize', () => this.layout());
  }

  async init() {
    this.measuredItems = await this.preloadAndMeasure(this.items);
    this.layout();
  }

  async preloadAndMeasure(items) {
    return Promise.all(
      items.map(item => new Promise(resolve => {
        if (item.img.toLowerCase().endsWith('.mp4')) {
          const video = document.createElement('video');
          video.src = item.img;
          video.addEventListener('loadedmetadata', () => {
            resolve({ ...item, naturalWidth: video.videoWidth, naturalHeight: video.videoHeight, isVideo: true });
          });
          video.addEventListener('error', () => {
            resolve({ ...item, naturalWidth: 16, naturalHeight: 9, isVideo: true });
          });
        } else {
          const img = new window.Image();
          img.src = item.img;
          img.onload = () => {
            resolve({ ...item, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, isVideo: false });
          };
          img.onerror = () => {
            resolve({ ...item, naturalWidth: 16, naturalHeight: 9, isVideo: false });
          };
        }
      }))
    );
  }

  layout() {
    const width = this.container.offsetWidth;
    let columns = this.options.columns;
    if (width < 600) columns = 1;
    else if (width < 900) columns = 2;
    const gap = columns === 3 ? 24 : columns === 2 ? 16 : 10;
    const colHeights = new Array(columns).fill(0);
    const columnWidth = (width - (columns - 1) * gap) / columns;
    this.container.innerHTML = '';
    const grid = this.measuredItems.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const aspect = child.naturalWidth && child.naturalHeight ? child.naturalHeight / child.naturalWidth : 1;
      const height = columnWidth * aspect;
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
    this.container.style.position = 'relative';
    this.container.style.height = Math.max(...grid.map(item => item.y + item.h)) + 'px';
    grid.forEach((item, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'item-wrapper';
      wrapper.style.position = 'absolute';
      wrapper.style.left = item.x + 'px';
      wrapper.style.top = item.y + 'px';
      wrapper.style.width = item.w + 'px';
      wrapper.style.height = item.h + 'px';
      wrapper.style.borderRadius = '14px';
      wrapper.style.overflow = 'hidden';
      wrapper.style.background = '#fff';
      // No clickability

      const content = document.createElement(item.isVideo ? 'video' : 'img');
      if (item.isVideo) {
        content.src = item.img;
        content.autoplay = true;
        content.muted = true;
        content.loop = true;
        content.playsInline = true;
      } else {
        content.src = item.img;
        content.alt = '';
      }
      content.style.width = '100%';
      content.style.height = '100%';
      content.style.objectFit = 'cover';
      content.style.borderRadius = '14px';
      content.style.display = 'block';
      wrapper.appendChild(content);

      // Overlay for darken effect
      const overlay = document.createElement('div');
      overlay.className = 'item-overlay';
      wrapper.appendChild(overlay);

      // Centered label
      if (item.label) {
        const label = document.createElement('div');
        label.className = 'item-label';
        label.textContent = item.label;
        wrapper.appendChild(label);
      }

      this.container.appendChild(wrapper);

      // Set initial hidden state
      wrapper.style.opacity = 0;
      wrapper.style.transform = 'translateY(100px)';

      // Use Intersection Observer to animate when in view
      if ('IntersectionObserver' in window && window.gsap) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 2.5,
                ease: "power3.out"
              });
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        observer.observe(wrapper);
      } else if (window.gsap) {
        // Fallback: animate all if IntersectionObserver is not supported
        gsap.to(wrapper, {
          opacity: 1,
          y: 0,
          duration: 2.5,
          ease: "power3.out"
        });
      }
    });
  }
} 