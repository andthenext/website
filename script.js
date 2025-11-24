// ===================================
// THEME TOGGLE
// ===================================

const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements that should fade in
const animateElements = document.querySelectorAll('.about-content, .founder-card, .contact-content');
animateElements.forEach(el => observer.observe(el));

// ===================================
// SMOOTH SCROLL FOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// VIDEO LOGO OPTIMIZATION
// ===================================

const logoVideo = document.querySelector('.logo-video');

// Ensure video plays on load
if (logoVideo) {
    logoVideo.play().catch(err => {
        console.log('Video autoplay prevented:', err);
    });

    // Pause video when not in viewport (performance optimization)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logoVideo.play().catch(err => console.log('Play prevented:', err));
            } else {
                logoVideo.pause();
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(logoVideo);
}

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (window.pageYOffset < window.innerHeight) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
        }
    }
});

// ===================================
// CURSOR ENHANCEMENT (Optional)
// ===================================

const links = document.querySelectorAll('a, button');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });

    link.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

// ===================================
// LOADING STATE
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// PREVENT FOUC (Flash of Unstyled Content)
// ===================================

document.documentElement.style.visibility = 'visible';

// ===================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ===================================

document.addEventListener('keydown', (e) => {
    // Toggle theme with 'T' key
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
});

// ===================================
// REDUCED MOTION SUPPORT
// ===================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log('%c👋 And The Next', 'font-size: 24px; font-weight: bold; color: #FF4500;');
console.log('%cWhere ideas evolve into ventures.', 'font-size: 14px; color: #666;');
console.log('%cInterested in working together? Reach out!', 'font-size: 12px; color: #999;');
