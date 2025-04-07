/**
 * Three.js scene for the Introduction section
 */

function initIntroScene() {
    // Create base scene
    const { scene, camera, renderer, controls } = createBaseScene('intro');
    scenes.intro = scene;
    cameras.intro = camera;
    renderers.intro = renderer;
    controls.intro = controls;

    // Position camera for better view
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);

    // Create constraint planes
    const planeSize = 10;

    // First constraint plane (wood hours)
    const plane1Geometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const plane1Material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6, // Blue
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    const plane1 = new THREE.Mesh(plane1Geometry, plane1Material);
    plane1.rotation.x = Math.PI / 2;
    plane1.position.set(0, 4, 0);
    plane1.name = 'woodConstraint';
    scene.add(plane1);

    // Second constraint plane (finishing hours)
    const plane2Geometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const plane2Material = new THREE.MeshPhongMaterial({
        color: 0x10b981, // Green
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
    plane2.rotation.z = Math.PI / 2;
    plane2.position.set(4, 0, 0);
    plane2.name = 'finishConstraint';
    scene.add(plane2);

    // Third constraint plane (non-negativity)
    const plane3Geometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const plane3Material = new THREE.MeshPhongMaterial({
        color: 0xf59e0b, // Yellow
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    const plane3 = new THREE.Mesh(plane3Geometry, plane3Material);
    plane3.rotation.y = Math.PI / 2;
    plane3.position.set(0, 0, 4);
    plane3.name = 'nonNegativityConstraint';
    scene.add(plane3);

    // Create feasible region
    const feasibleGeometry = new THREE.BoxGeometry(4, 4, 4);
    const feasibleMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6, // Purple
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    const feasibleRegion = new THREE.Mesh(feasibleGeometry, feasibleMaterial);
    feasibleRegion.position.set(2, 2, 2);
    feasibleRegion.name = 'feasibleRegion';
    scene.add(feasibleRegion);

    // Create optimal point
    const optimalGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const optimalMaterial = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.3
    });
    const optimalPoint = new THREE.Mesh(optimalGeometry, optimalMaterial);
    optimalPoint.position.set(3, 2, 1);
    optimalPoint.name = 'optimalPoint';
    scene.add(optimalPoint);

    // Add objective function arrow
    const arrowDir = new THREE.Vector3(1, 1, 0).normalize();
    const arrowOrigin = new THREE.Vector3(0, 0, 0);
    const arrowLength = 5;
    const arrowColor = 0xec4899; // Pink

    const arrowHelper = new THREE.ArrowHelper(
        arrowDir,
        arrowOrigin,
        arrowLength,
        arrowColor,
        1, // headLength
        0.5 // headWidth
    );
    arrowHelper.name = 'objectiveArrow';
    scene.add(arrowHelper);

    // Add labels (using HTML overlay for better accessibility)
    const container = document.getElementById('intro-canvas');

    // Create label container
    const labelContainer = document.createElement('div');
    labelContainer.className = 'absolute top-0 left-0 w-full h-full pointer-events-none';
    labelContainer.style.zIndex = '10';
    container.appendChild(labelContainer);

    // Hide loading indicator
    document.getElementById('intro-loading').style.display = 'none';

    // Add button event listeners
    document.getElementById('intro-rotate').addEventListener('click', () => {
        // Animate rotation of the scene
        gsap.to(feasibleRegion.rotation, {
            y: feasibleRegion.rotation.y + Math.PI * 2,
            duration: 2,
            ease: 'power1.inOut'
        });

        gsap.to(optimalPoint.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
    });

    document.getElementById('intro-explode').addEventListener('click', () => {
        // Explode the constraints outward
        gsap.to(plane1.position, {
            y: plane1.position.y + 2,
            duration: 1,
            yoyo: true,
            repeat: 1
        });

        gsap.to(plane2.position, {
            x: plane2.position.x + 2,
            duration: 1,
            yoyo: true,
            repeat: 1
        });

        gsap.to(plane3.position, {
            z: plane3.position.z + 2,
            duration: 1,
            yoyo: true,
            repeat: 1
        });

        // Pulse the optimal point
        gsap.to(optimalPoint.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 1,
            yoyo: true,
            repeat: 1
        });
    });

    document.getElementById('intro-reset').addEventListener('click', () => {
        // Reset camera position
        gsap.to(camera.position, {
            x: 7,
            y: 7,
            z: 7,
            duration: 1,
            onUpdate: () => {
                camera.lookAt(0, 0, 0);
            }
        });

        // Reset object positions and rotations
        gsap.to(feasibleRegion.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1
        });

        gsap.to(plane1.position, {
            y: 4,
            duration: 1
        });

        gsap.to(plane2.position, {
            x: 4,
            duration: 1
        });

        gsap.to(plane3.position, {
            z: 4,
            duration: 1
        });

        gsap.to(optimalPoint.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1
        });
    });

    // Add custom animation for this scene
    animations.intro = function() {
        // Gentle floating animation for optimal point
        const time = Date.now() * 0.001;
        optimalPoint.position.y = 2 + Math.sin(time) * 0.2;

        // Pulse effect for the optimal point
        const scale = 1 + 0.1 * Math.sin(time * 2);
        optimalPoint.scale.set(scale, scale, scale);

        // Slowly rotate the arrow to show direction of optimization
        arrowHelper.rotation.y = time * 0.2;

        // Subtle movement of constraint planes to emphasize 3D space
        plane1.position.y = 4 + Math.sin(time * 0.5) * 0.1;
        plane2.position.x = 4 + Math.sin(time * 0.7) * 0.1;
        plane3.position.z = 4 + Math.sin(time * 0.6) * 0.1;

        // Subtle color pulsing for feasible region to highlight it
        const opacity = 0.3 + 0.1 * Math.sin(time);
        feasibleRegion.material.opacity = opacity;
    };
}
