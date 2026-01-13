document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const heroVideoContainer = document.querySelector('.hero-video-container');
    const heroVideo = document.getElementById('hero-video');
    const heroContent = document.querySelector('.hero-content');
    const videoFrame = document.querySelector('.video-frame');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Constants
    const VIDEO_DURATION = 30000; // 30 seconds

    // ==========================================
    // 1. Video Completion Logic
    // ==========================================

    const onVideoEnd = () => {
        // Hide Entire Hero Section
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.display = 'none';
        }

        // Show Global Logo
        const logoContainer = document.getElementById('logo-container');
        if (logoContainer) {
            logoContainer.style.display = 'flex'; // Restore display
            // Optional: fade in
            logoContainer.style.opacity = '0';
            logoContainer.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                logoContainer.style.opacity = '1';
            }, 50);
        }
    };

    if (heroVideo) {
        const playBtn = document.getElementById('hero-play-btn');

        // Listen for end
        heroVideo.addEventListener('ended', onVideoEnd);

        // Just in case it loops or whatever, if manually set to not loop
        heroVideo.loop = false;

        // Manual Play
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                heroVideo.muted = false;
                heroVideo.play().then(() => {
                    playBtn.style.display = 'none';
                }).catch(e => console.error("Play failed", e));
            });
        }

        // Attempt Autoplay (Unmuted first)
        // If it plays unmuted, great, hide button.
        // If blocked, just show button (default state) and do nothing (let user click).
        heroVideo.play().then(() => {
            // Autoplay successful
            if (playBtn) playBtn.style.display = 'none';
        }).catch(e => {
            // Autoplay blocked (expected in most browsers if unmuted)
            // Leave button visible. 
            // Do NOT fallback to muted autoplay, as user wants "start with sound" via button or auto.
            console.log("Autoplay blocked, showing play button", e);
        });
    }

    // ==========================================
    // 2. Dystopian/Rugged Frame Interaction (Animated Clip-Path)
    // ==========================================

    const videoWrapper = document.querySelector('.video-wrapper');

    // Base polygon points (approximate from CSS)
    const BASE_POINTS = [
        { x: 5, y: 5 }, { x: 15, y: 4 }, { x: 30, y: 6 }, { x: 45, y: 3 }, { x: 60, y: 5 }, { x: 75, y: 4 }, { x: 90, y: 6 }, { x: 95, y: 5 },
        { x: 96, y: 20 }, { x: 94, y: 40 }, { x: 97, y: 60 }, { x: 95, y: 80 }, { x: 96, y: 95 },
        { x: 90, y: 94 }, { x: 75, y: 96 }, { x: 60, y: 94 }, { x: 45, y: 97 }, { x: 30, y: 95 }, { x: 15, y: 96 }, { x: 5, y: 95 },
        { x: 4, y: 80 }, { x: 6, y: 60 }, { x: 3, y: 40 }, { x: 5, y: 20 }
    ];

    let time = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let lastMoveTime = 0;

    const animateFrame = () => {
        if (!videoWrapper) return;

        // Check if moving (within last 200ms)
        const isMoving = (Date.now() - lastMoveTime) < 200;

        // Only advance time if moving
        if (isMoving) {
            time += 0.2; // Fast animation when moving
        }

        // Generate new points
        const newPoints = BASE_POINTS.map((pt, i) => {
            // Amplitude scales with position (static influence)
            const ampX = 0.5 + (mouseX * 4); // 0.5 to 4.5
            const ampY = 0.5 + (mouseY * 4);

            // If NOT moving, keep noise static? Yes, time is frozen.
            // But we still re-calculate to allow "amplitude" changes if mouse stops at a new spot.

            // Noise
            const noiseX = Math.sin(time + i * 1.5) * ampX;
            const noiseY = Math.cos(time + i * 2.2) * ampY;

            // Glitch only if moving? Or static glitch? 
            // "No animation" implies static image. 
            // So if !isMoving, we want a stable frame.
            // Jitter is random(), so it flutters. We should remove jitter if !isMoving.

            let jitter = 0;
            if (isMoving) {
                const glitchChance = 0.9 - (mouseX * 0.1);
                const jitterIntensity = mouseX * 2;
                jitter = Math.random() > glitchChance ? (Math.random() - 0.5) * jitterIntensity : 0;
            }

            return `${pt.x + noiseX + jitter}% ${pt.y + noiseY + jitter}%`;
        });

        videoWrapper.style.clipPath = `polygon(${newPoints.join(', ')})`;

        requestAnimationFrame(animateFrame);
    };

    if (videoWrapper) animateFrame();

    // Mouse Interaction
    document.addEventListener('mousemove', (e) => {
        lastMoveTime = Date.now();

        // Normalize mouse pos 0 to 1
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;

        // Custom cursor
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower) {
            cursorFollower.style.display = 'block';
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }
    });

    // Remove old logic function if present
    // function updateOrganicShape... (removed)

    // ==========================================
    // 3. Init
    // ==========================================

    document.body.classList.remove('loading');

    console.log('And The Next: System Initialized');
});
