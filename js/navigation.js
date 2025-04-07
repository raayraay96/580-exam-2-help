/**
 * Navigation functionality for the Linear Programming Guide
 */

// Global variable to track current section
let currentSection = 'intro';

// Navigate to a specific section
function navigateTo(sectionId) {
    // Don't do anything if already on this section
    if (currentSection === sectionId) return;

    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');

        // Animate the section entrance
        if (!prefersReducedMotion) {
            gsap.from(targetSection, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }

    // Update progress dots
    updateProgressDots(sectionId);

    // Update progress bar
    updateProgressBar(sectionId);

    // Save progress to localStorage
    saveProgress(sectionId);

    // Update current section
    currentSection = sectionId;

    // Announce section change to screen readers
    const sectionNames = {
        'intro': 'Introduction',
        'formulation': 'Problem Formulation',
        'graphical': 'Graphical Solution',
        'standard': 'Standard Form',
        'simplex': 'Simplex Method',
        'duality': 'Duality'
    };

    announceToScreenReader(`Navigated to ${sectionNames[sectionId] || sectionId} section`);
}

// Update progress dots
function updateProgressDots(sectionId) {
    const sections = ['intro', 'formulation', 'graphical', 'standard', 'simplex', 'duality'];
    const currentIndex = sections.indexOf(sectionId);

    if (currentIndex === -1) return;

    // Update all dots
    document.querySelectorAll('.progress-dot').forEach(dot => {
        const dotSection = dot.dataset.section;
        const dotIndex = sections.indexOf(dotSection);

        if (dotIndex <= currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Update progress bar
function updateProgressBar(sectionId) {
    const sections = ['intro', 'formulation', 'graphical', 'standard', 'simplex', 'duality', 'practice'];
    const currentIndex = sections.indexOf(sectionId);

    if (currentIndex === -1) return;

    // Calculate progress percentage
    const progressPercentage = Math.round(((currentIndex + 1) / sections.length) * 100);

    // Update progress bar width
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Update progress percentage text
    const progressPercent = document.getElementById('progress-percent');
    if (progressPercent) {
        progressPercent.textContent = `${progressPercentage}%`;
    }
}
