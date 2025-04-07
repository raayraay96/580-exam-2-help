/**
 * Accessibility enhancements for the Linear Programming Guide
 */

// Enable keyboard navigation for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Make progress dots keyboard accessible
    document.querySelectorAll('.progress-dot').forEach(dot => {
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateTo(dot.dataset.section);
            }
        });
    });

    // Make interactive buttons keyboard accessible
    document.querySelectorAll('.interactive-btn').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Make nav pills keyboard accessible
    document.querySelectorAll('.nav-pill').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Update ARIA attributes for sliders
    const updateSliderAria = (slider) => {
        slider.setAttribute('aria-valuenow', slider.value);
    };

    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.addEventListener('input', () => updateSliderAria(slider));
        updateSliderAria(slider);
    });
});

// Add screen reader announcements for important state changes
function announceToScreenReader(message) {
    const announcer = document.getElementById('sr-announcer');
    
    if (!announcer) {
        const newAnnouncer = document.createElement('div');
        newAnnouncer.id = 'sr-announcer';
        newAnnouncer.setAttribute('aria-live', 'polite');
        newAnnouncer.setAttribute('aria-atomic', 'true');
        newAnnouncer.classList.add('sr-only');
        document.body.appendChild(newAnnouncer);
        
        setTimeout(() => {
            newAnnouncer.textContent = message;
        }, 100);
    } else {
        announcer.textContent = '';
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    }
}

// Add a class for screen-reader-only content
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    </style>
`);

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Function to safely animate with GSAP respecting reduced motion preferences
function safeAnimate(element, properties, options = {}) {
    if (prefersReducedMotion) {
        // Apply end state immediately without animation
        gsap.set(element, properties);
    } else {
        // Use regular animation
        gsap.to(element, { ...properties, ...options });
    }
}
