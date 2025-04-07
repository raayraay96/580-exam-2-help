/**
 * Local storage utilities for saving and loading user progress
 */

const STORAGE_KEY = 'linear-programming-guide-progress';

// Save user progress to localStorage
function saveProgress(sectionId) {
    try {
        const sections = ['intro', 'formulation', 'graphical', 'standard', 'simplex', 'duality'];
        const currentIndex = sections.indexOf(sectionId);
        
        if (currentIndex === -1) return;
        
        const completedSections = sections.slice(0, currentIndex + 1);
        const progress = {
            lastSection: sectionId,
            completedSections: completedSections,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

// Load user progress from localStorage
function loadProgress() {
    try {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        
        if (!savedProgress) return null;
        
        return JSON.parse(savedProgress);
    } catch (error) {
        console.error('Error loading progress:', error);
        return null;
    }
}

// Clear saved progress
function clearProgress() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing progress:', error);
    }
}

// Update progress UI based on saved progress
function updateProgressUI() {
    const progress = loadProgress();
    
    if (!progress) return;
    
    const sections = ['intro', 'formulation', 'graphical', 'standard', 'simplex', 'duality'];
    const currentIndex = sections.indexOf(progress.lastSection);
    
    if (currentIndex === -1) return;
    
    // Update progress bar
    const progressPercentage = Math.round(((currentIndex + 1) / sections.length) * 100);
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-percent').textContent = `${progressPercentage}%`;
    
    // Update progress dots
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

// Save user preferences
function savePreferences(preferences) {
    try {
        localStorage.setItem('linear-programming-guide-preferences', JSON.stringify(preferences));
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
}

// Load user preferences
function loadPreferences() {
    try {
        const savedPreferences = localStorage.getItem('linear-programming-guide-preferences');
        
        if (!savedPreferences) return {};
        
        return JSON.parse(savedPreferences);
    } catch (error) {
        console.error('Error loading preferences:', error);
        return {};
    }
}

// Apply user preferences to the UI
function applyPreferences() {
    const preferences = loadPreferences();
    
    // Apply any saved preferences here
    // For example, if the user has a preferred animation speed:
    if (preferences.animationSpeed) {
        document.documentElement.style.setProperty('--animation-speed', preferences.animationSpeed);
    }
}
