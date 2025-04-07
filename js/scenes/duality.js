/**
 * Three.js scene for the Duality section
 */

// Define the initialization function
function initDualityScene() {
    // Create base scene
    const { scene, camera, renderer, controls } = createBaseScene('duality');
    scenes.duality = scene;
    cameras.duality = camera;
    renderers.duality = renderer;
    controls.duality = controls;

    // Position camera for better view
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);

    // Implement the Duality visualization

    // Create primal problem representation
    const primalGeometry = new THREE.BufferGeometry();

    // Define vertices for primal feasible region (similar to graphical solution)
    const primalVertices = new Float32Array([
        0, 0, 0, // Origin
        9, 0, 0, // x₁ axis intercept for constraint 1
        6, 3, 0, // Intersection point
        0, 5, 0  // x₂ axis intercept for constraint 2
    ]);

    primalGeometry.setAttribute('position', new THREE.BufferAttribute(primalVertices, 3));
    primalGeometry.setIndex([0, 1, 2, 0, 2, 3]);

    const primalMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6, // Blue
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });

    const primalRegion = new THREE.Mesh(primalGeometry, primalMaterial);
    primalRegion.name = 'primalRegion';
    primalRegion.position.set(-4, 0, 0); // Position on the left side
    scene.add(primalRegion);

    // Create dual problem representation
    const dualGeometry = new THREE.BufferGeometry();

    // Define vertices for dual feasible region
    const dualVertices = new Float32Array([
        0, 0, 0, // Origin
        0, 0, 6, // z axis intercept for dual constraint 1
        3, 0, 3, // Intersection point
        6, 0, 0  // x axis intercept for dual constraint 2
    ]);

    dualGeometry.setAttribute('position', new THREE.BufferAttribute(dualVertices, 3));
    dualGeometry.setIndex([0, 1, 2, 0, 2, 3]);

    const dualMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6, // Purple
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });

    const dualRegion = new THREE.Mesh(dualGeometry, dualMaterial);
    dualRegion.name = 'dualRegion';
    dualRegion.position.set(4, 0, 0); // Position on the right side
    scene.add(dualRegion);

    // Create optimal points
    const optimalGeometry = new THREE.SphereGeometry(0.3, 32, 32);

    // Primal optimal point
    const primalOptimalMaterial = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.3
    });

    const primalOptimal = new THREE.Mesh(optimalGeometry, primalOptimalMaterial);
    primalOptimal.position.set(-4 + 6, 3, 0); // Position at the optimal point of primal
    primalOptimal.name = 'primalOptimal';
    scene.add(primalOptimal);

    // Dual optimal point
    const dualOptimalMaterial = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.3
    });

    const dualOptimal = new THREE.Mesh(optimalGeometry, dualOptimalMaterial);
    dualOptimal.position.set(4 + 3, 0, 3); // Position at the optimal point of dual
    dualOptimal.name = 'dualOptimal';
    scene.add(dualOptimal);

    // Create connecting arrow between primal and dual
    const arrowDir = new THREE.Vector3(1, 0, 0).normalize();
    const arrowOrigin = new THREE.Vector3(0, 0, 0);
    const arrowLength = 8;
    const arrowColor = 0x10b981; // Green

    const dualityArrow = new THREE.ArrowHelper(
        arrowDir,
        arrowOrigin,
        arrowLength,
        arrowColor,
        1.5, // headLength
        0.7 // headWidth
    );
    dualityArrow.name = 'dualityArrow';
    scene.add(dualityArrow);

    // Create text labels for primal and dual
    const primalLabel = document.createElement('div');
    primalLabel.className = 'absolute text-blue-600 font-bold text-lg pointer-events-none';
    primalLabel.style.left = '25%';
    primalLabel.style.top = '10%';
    primalLabel.textContent = 'Primal';
    document.getElementById('duality-canvas').appendChild(primalLabel);

    const dualLabel = document.createElement('div');
    dualLabel.className = 'absolute text-purple-600 font-bold text-lg pointer-events-none';
    dualLabel.style.left = '75%';
    dualLabel.style.top = '10%';
    dualLabel.textContent = 'Dual';
    document.getElementById('duality-canvas').appendChild(dualLabel);

    // Add custom animation for this scene
    animations.duality = function() {
        const time = Date.now() * 0.001;

        // Rotate the primal and dual regions slightly for better 3D perception
        primalRegion.rotation.x = Math.sin(time * 0.3) * 0.1;
        dualRegion.rotation.x = Math.sin(time * 0.3 + Math.PI) * 0.1;

        // Pulse the optimal points
        const primalScale = 1 + 0.2 * Math.sin(time * 2);
        primalOptimal.scale.set(primalScale, primalScale, primalScale);

        const dualScale = 1 + 0.2 * Math.sin(time * 2 + Math.PI);
        dualOptimal.scale.set(dualScale, dualScale, dualScale);

        // Animate the duality arrow
        dualityArrow.rotation.y = Math.sin(time * 0.5) * 0.1;

        // Pulse the opacity of the regions
        primalRegion.material.opacity = 0.4 + 0.2 * Math.sin(time);
        dualRegion.material.opacity = 0.4 + 0.2 * Math.sin(time + Math.PI);
    };

    // Add event listeners for buttons
    document.getElementById('show-dual').addEventListener('click', () => {
        document.getElementById('dual-problem').classList.remove('hidden');
        gsap.from('#dual-problem', { opacity: 0, y: 20, duration: 0.5 });
    });

    document.getElementById('show-optimal').addEventListener('click', () => {
        document.getElementById('optimal-values').classList.remove('hidden');
        gsap.from('#optimal-values', { opacity: 0, y: 20, duration: 0.5 });
    });
}
