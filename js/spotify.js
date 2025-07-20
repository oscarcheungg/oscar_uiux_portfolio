// Sticky Scroll Effect for Spotify
document.addEventListener('DOMContentLoaded', function() {
    const stickyContainer = document.querySelector('.sticky-scroll-container');
    const phoneVideo = document.querySelector('.phone-video');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (!stickyContainer) return;
    
    // Video sources for each section
    const videoSources = [
        'assets/spotifyAssets/newPlaylistFlow.mp4',
        'assets/spotifyAssets/existingPlaylistFlow.mp4', 
        'assets/spotifyAssets/multiPlaylistEdit.mp4',
        'assets/spotifyAssets/playlistMode.mp4'
    ];
    
    let currentSection = 0;
    let isTransitioning = false;
    
    // Function to smoothly update video source
    function updateVideo(sectionIndex) {
        if (sectionIndex >= 0 && sectionIndex < videoSources.length && !isTransitioning) {
            isTransitioning = true;
            
            // Quick fade out
            phoneVideo.style.transition = 'opacity 0.25s ease';
            phoneVideo.style.opacity = '0';
            
            setTimeout(() => {
                // Change video source
                phoneVideo.src = videoSources[sectionIndex];
                
                // Quick fade in
                phoneVideo.style.opacity = '1';
                
                // Play video after a short delay
                setTimeout(() => {
                    phoneVideo.play().catch(e => console.log('Video autoplay prevented'));
                    isTransitioning = false;
                }, 50);
                
            }, 250);
        }
    }
    
    // Function to update active section
    function updateActiveSection(sectionIndex) {
        contentSections.forEach((section, index) => {
            if (index === sectionIndex) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    // Intersection Observer for content sections with debouncing
    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0.6
    };
    
    let observerTimeout;
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = parseInt(entry.target.dataset.section);
                
                // Debounce the section change
                clearTimeout(observerTimeout);
                observerTimeout = setTimeout(() => {
                    if (sectionIndex !== currentSection) {
                        currentSection = sectionIndex;
                        updateVideo(sectionIndex);
                        updateActiveSection(sectionIndex);
                    }
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    contentSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Initialize first section as active
    updateActiveSection(0);
    
    // Handle video loading and autoplay
    phoneVideo.addEventListener('loadeddata', function() {
        // Try to autoplay the video
        phoneVideo.play().catch(e => {
            console.log('Video autoplay prevented by browser');
        });
    });
    
    // Pause video when not in viewport (optional performance optimization)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTransitioning) {
                phoneVideo.play().catch(e => console.log('Video play prevented'));
            } else {
                phoneVideo.pause();
            }
        });
    }, { threshold: 0.1 });
    
    videoObserver.observe(phoneVideo);
}); 