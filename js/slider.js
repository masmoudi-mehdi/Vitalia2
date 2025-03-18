/**
 * Vitalia - Centre d'Amincissement
 * Testimonial Slider Script
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
});

/**
 * Initialize the testimonial slider
 */
function initTestimonialSlider() {
    // Get all slider elements
    const slider = document.querySelector('.testimonial-slider');
    
    if (!slider) return; // Exit if slider doesn't exist on this page
    
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (slides.length === 0) return; // Exit if no slides
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Time between automatic slide changes (5 seconds)
    
    // Functions to control the slider
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle index bounds
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Start automatic sliding
    function startSlideInterval() {
        if (slides.length > 1) {
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }
    
    // Stop automatic sliding (when user interacts with slider)
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // Restart automatic sliding after a pause
    function restartSlideInterval() {
        stopSlideInterval();
        startSlideInterval();
    }
    
    // Add event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            restartSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            restartSlideInterval();
        });
    }
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            restartSlideInterval();
        });
    });
    
    // Add swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopSlideInterval();
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        restartSlideInterval();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            prevSlide();
        }
    }
    
    // Pause automatic sliding when user hovers over the slider
    slider.addEventListener('mouseenter', stopSlideInterval);
    slider.addEventListener('mouseleave', startSlideInterval);
    
    // Initialize slider with first slide active
    goToSlide(0);
    
    // Start automatic sliding
    startSlideInterval();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartSlideInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartSlideInterval();
        }
    });
    
    // Add accessibility attributes
    slides.forEach((slide, index) => {
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-labelledby', `slide-${index}`);
        slide.setAttribute('id', `slide-content-${index}`);
        slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
    
    dots.forEach((dot, index) => {
        dot.setAttribute('role', 'tab');
        dot.setAttribute('id', `slide-${index}`);
        dot.setAttribute('aria-controls', `slide-content-${index}`);
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.setAttribute('tabindex', '0');
        
        // Make dots keyboard accessible
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
                restartSlideInterval();
            }
        });
    });
    
    // Update ARIA attributes when changing slides
    const updateAriaAttributes = () => {
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index === currentSlide ? 'false' : 'true');
        });
        
        dots.forEach((dot, index) => {
            dot.setAttribute('aria-selected', index === currentSlide ? 'true' : 'false');
        });
    };
    
    // Override goToSlide function to update ARIA attributes
    const originalGoToSlide = goToSlide;
    goToSlide = (index) => {
        originalGoToSlide(index);
        updateAriaAttributes();
    };
}
