document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('clock');
    const header = document.querySelector('header');
    
    // Scroll animation variables
    let lastScrollTop = 0;
    let isScrolling = false;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Header scroll animation function
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        isScrolling = false;
    }

    // Smooth scrolling for navigation links
    function handleNavLinkClick(e) {
        const targetId = this.getAttribute('href');
        
        // Only handle internal links (starting with #)
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight; // 20px offset for better spacing
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Add click event listeners to navigation links
    const navLinks = document.querySelectorAll('.navLinks a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.navLinks');
    
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when clicking on a nav link (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    }

    // Throttle scroll events for better performance
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(handleScroll);
            isScrolling = true;
        }
    });

    if (clockElement) {
        setInterval(updateTime, 1000);
        updateTime(); // Initial call to display time immediately
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Get all animated elements (both cards and info)
        const allAnimatedElements = gsap.utils.toArray('.animated-card');
        
        allAnimatedElements.forEach((element) => {
            gsap.fromTo(
                element,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.98,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 2.0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                }
            );
        });
    }
}); 