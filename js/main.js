/**
 * Main JavaScript file for the Linear Programming Guide
 */

// Initialize all Three.js scenes
function initThreeJS() {
    console.log("Initializing Three.js scenes...");
    // Initialize scenes for each section
    try {
        initIntroScene();
        console.log("Intro scene initialized.");
        initFormulationScene();
        console.log("Formulation scene initialized.");
        initGraphicalScene();
        console.log("Graphical scene initialized.");
        initStandardScene();
        console.log("Standard scene initialized.");
        initSimplexScene();
        console.log("Simplex scene initialized.");
        initDualityScene();
        console.log("Duality scene initialized.");
    } catch (error) {
        console.error("Error initializing scenes:", error);
    }

    // Start animation loop
    try {
        animate();
        console.log("Animation loop started.");
    } catch (error) {
        console.error("Error starting animation loop:", error);
    }

    // Update scene colors based on dark mode preference
    updateSceneColors(window.matchMedia('(prefers-color-scheme: dark)').matches);
    console.log("Three.js scenes initialized.");
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js
    initThreeJS();

    // Load and apply saved progress
    const savedProgress = loadProgress();
    if (savedProgress && savedProgress.lastSection) {
        navigateTo(savedProgress.lastSection);
    } else {
        // Default to intro section
        navigateTo('intro');
    }

    // Update progress UI based on saved progress
    updateProgressUI();

    // Apply user preferences
    applyPreferences();

    // Add event listeners for progress dots
    document.querySelectorAll('.progress-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            navigateTo(dot.dataset.section);
        });
    });

    // Create a help button
    createHelpButton();
});

// Create a floating help button
function createHelpButton() {
    const helpButton = document.createElement('button');
    helpButton.className = 'fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-300';
    helpButton.innerHTML = '<i class="fas fa-question"></i>';
    helpButton.setAttribute('aria-label', 'Open help menu');

    helpButton.addEventListener('click', showHelpModal);

    document.body.appendChild(helpButton);
}

// Show help modal
function showHelpModal() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.id = 'help-modal';

    // Create modal content
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Help & Tips</h2>
                <button id="close-help" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <h3 class="font-bold text-lg mb-2">Navigation</h3>
                    <ul class="list-disc pl-5">
                        <li>Use the navigation pills at the top to jump between sections</li>
                        <li>Use left/right arrow keys to move between sections</li>
                        <li>Click on the progress dots to jump to a specific section</li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-bold text-lg mb-2">Visualizations</h3>
                    <ul class="list-disc pl-5">
                        <li>Click and drag to rotate 3D models</li>
                        <li>Scroll to zoom in/out</li>
                        <li>Use the buttons below each visualization for special actions</li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-bold text-lg mb-2">Accessibility</h3>
                    <ul class="list-disc pl-5">
                        <li>Use Tab to navigate between interactive elements</li>
                        <li>Press Enter or Space to activate buttons</li>
                        <li>Use arrow keys to adjust sliders</li>
                    </ul>
                </div>

                <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button id="clear-progress" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        Reset Progress
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    document.getElementById('close-help').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('clear-progress').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
            clearProgress();
            navigateTo('intro');
            document.body.removeChild(modal);
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}
