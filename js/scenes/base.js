/**
 * Base Three.js scene setup for all visualizations
 */

// Global objects to store scenes, cameras, renderers, and controls
const scenes = {};
const cameras = {};
const renderers = {};
const controls = {};
const animations = {};

// Create a base Three.js scene with common setup
function createBaseScene(containerId) {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
        75, // Field of view
        1, // Aspect ratio (will be updated)
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    const container = document.getElementById(`${containerId}-canvas`);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
    const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0xcccccc);
    scene.add(gridHelper);
    
    // Add axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    
    // Handle resize
    function updateSize() {
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        if (width === 0 || height === 0) return;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }
    
    // Initial size update
    updateSize();
    
    // Add resize listener
    window.addEventListener('resize', () => {
        updateSize();
    });
    
    // Add resize observer for container size changes
    const resizeObserver = new ResizeObserver(() => {
        updateSize();
    });
    
    if (container) {
        resizeObserver.observe(container);
    }
    
    // Return created objects
    return {
        scene,
        camera,
        renderer,
        controls: orbitControls
    };
}

// Handle dark mode changes
function updateSceneColors(isDarkMode) {
    Object.keys(scenes).forEach(key => {
        const scene = scenes[key];
        if (scene) {
            scene.background = new THREE.Color(isDarkMode ? 0x1a202c : 0xf8fafc);
            
            // Update grid helper
            scene.children.forEach(child => {
                if (child instanceof THREE.GridHelper) {
                    scene.remove(child);
                    const newGridHelper = new THREE.GridHelper(
                        10, 10, 
                        isDarkMode ? 0x4a5568 : 0x888888, 
                        isDarkMode ? 0x2d3748 : 0xcccccc
                    );
                    scene.add(newGridHelper);
                }
            });
        }
    });
}

// Listen for dark mode changes
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', (e) => {
    updateSceneColors(e.matches);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Only render the active scene for performance
    if (currentSection && renderers[currentSection] && scenes[currentSection] && cameras[currentSection]) {
        // Update controls if they exist
        if (controls[currentSection]) {
            controls[currentSection].update();
        }
        
        // Run any custom animations for this scene
        if (animations[currentSection]) {
            animations[currentSection]();
        }
        
        // Render the scene
        renderers[currentSection].render(scenes[currentSection], cameras[currentSection]);
    }
}

// Clean up Three.js resources when switching scenes
function cleanupScene(sceneId) {
    const scene = scenes[sceneId];
    if (!scene) return;
    
    // Dispose of geometries and materials
    scene.traverse(object => {
        if (object.geometry) {
            object.geometry.dispose();
        }
        
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
        }
    });
    
    // Remove all objects
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    
    // Dispose of renderer
    if (renderers[sceneId]) {
        renderers[sceneId].dispose();
    }
    
    // Remove from global objects
    delete scenes[sceneId];
    delete cameras[sceneId];
    delete renderers[sceneId];
    delete controls[sceneId];
    delete animations[sceneId];
}
