const video = document.getElementById('chinaInspirationVideo');
if (video) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(video);
}

const biteMainVideo = document.getElementById('biteMainVideo');
if (biteMainVideo) {
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                biteMainVideo.play();
            } else {
                biteMainVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    observer2.observe(biteMainVideo);
}

const biteRewardsVideo = document.getElementById('biteRewardsVideo');
if (biteRewardsVideo) {
    const observer3 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                biteRewardsVideo.play();
            } else {
                biteRewardsVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    observer3.observe(biteRewardsVideo);
}

const biteProfileVideo = document.getElementById('biteProfileVideo');
if (biteProfileVideo) {
    const observer4 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                biteProfileVideo.play();
            } else {
                biteProfileVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    observer4.observe(biteProfileVideo);
}

const biteFriendsVideo = document.getElementById('biteFriendsVideo');
if (biteFriendsVideo) {
    const observer5 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                biteFriendsVideo.play();
            } else {
                biteFriendsVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    observer5.observe(biteFriendsVideo);
}

const biteOrderingVideo = document.getElementById('biteOrderingVideo');
if (biteOrderingVideo) {
    const observer6 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                biteOrderingVideo.play();
            } else {
                biteOrderingVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    observer6.observe(biteOrderingVideo);
}

// Sticky Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const stickyContainer = document.querySelector('.sticky-scroll-container');
    const phoneVideo = document.querySelector('.phone-video');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (!stickyContainer) return;
    
    // Video sources for each section
    const videoSources = [
        'assets/biteAssets/biteMain.mp4',
        'assets/biteAssets/biteOrdering.mp4', 
        'assets/biteAssets/biteRewards.mp4',
        'assets/biteAssets/biteProfile.mp4',
        'assets/biteAssets/biteFriends.mp4'
    ];
    
    // Video posters for each section
    const videoPosters = [
        'assets/biteAssets/biteMainPoster.jpg',
        'assets/biteAssets/biteOrderingPoster.jpg',
        'assets/biteAssets/biteRewardsPoster.jpg', 
        'assets/biteAssets/biteProfilePoster.jpg',
        'assets/biteAssets/biteFriendsPoster.jpg'
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
                phoneVideo.poster = videoPosters[sectionIndex];
                
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
