/**
 * Three.js scene for the Problem Formulation section
 */

// Global variables for the formulation scene
let tables = 0;
let chairs = 0;
let productionDot;
let woodPlane;
let finishPlane;

function initFormulationScene() {
    // Create base scene
    const { scene, camera, renderer, controls } = createBaseScene('formulation');
    scenes.formulation = scene;
    cameras.formulation = camera;
    renderers.formulation = renderer;
    controls.formulation = controls;

    // Position camera for better view
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);

    // Make sure the renderer is properly sized
    const container = document.getElementById('formulation-canvas');
    if (container) {
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    // Create axes with labels
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Create constraint planes

    // Wood constraint: 3x₁ + 2x₂ ≤ 120
    // Simplified to: x₁ + (2/3)x₂ ≤ 40
    const woodGeometry = new THREE.PlaneGeometry(50, 50);
    const woodMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6, // Blue
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    woodPlane = new THREE.Mesh(woodGeometry, woodMaterial);

    // Calculate normal vector for the plane
    const woodNormal = new THREE.Vector3(3, 2, 0).normalize();
    woodPlane.lookAt(woodNormal);

    // Position the plane to intersect at x₁ + (2/3)x₂ = 40
    woodPlane.position.set(20, 0, 0);
    woodPlane.name = 'woodConstraint';
    scene.add(woodPlane);

    // Finishing constraint: 1x₁ + 2x₂ ≤ 80
    // Simplified to: x₁ + 2x₂ ≤ 80
    const finishGeometry = new THREE.PlaneGeometry(50, 50);
    const finishMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981, // Green
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    finishPlane = new THREE.Mesh(finishGeometry, finishMaterial);

    // Calculate normal vector for the plane
    const finishNormal = new THREE.Vector3(1, 2, 0).normalize();
    finishPlane.lookAt(finishNormal);

    // Position the plane to intersect at x₁ + 2x₂ = 80
    finishPlane.position.set(40, 0, 0);
    finishPlane.name = 'finishConstraint';
    scene.add(finishPlane);

    // Non-negativity constraints (x₁ ≥ 0, x₂ ≥ 0)
    // x₁ ≥ 0 plane (YZ plane)
    const x1Geometry = new THREE.PlaneGeometry(50, 50);
    const x1Material = new THREE.MeshPhongMaterial({
        color: 0xf59e0b, // Yellow
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const x1Plane = new THREE.Mesh(x1Geometry, x1Material);
    x1Plane.rotation.y = Math.PI / 2;
    x1Plane.position.set(0, 25, 0);
    x1Plane.name = 'x1Constraint';
    scene.add(x1Plane);

    // x₂ ≥ 0 plane (XZ plane)
    const x2Geometry = new THREE.PlaneGeometry(50, 50);
    const x2Material = new THREE.MeshPhongMaterial({
        color: 0xf59e0b, // Yellow
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const x2Plane = new THREE.Mesh(x2Geometry, x2Material);
    x2Plane.rotation.x = Math.PI / 2;
    x2Plane.position.set(25, 0, 0);
    x2Plane.name = 'x2Constraint';
    scene.add(x2Plane);

    // Create feasible region
    const feasibleGeometry = new THREE.BufferGeometry();

    // Calculate the vertices of the feasible region
    // Intersection points:
    // (0, 0, 0) - origin
    // (40, 0, 0) - x₁ axis intercept for wood constraint
    // (0, 60, 0) - x₂ axis intercept for wood constraint
    // (80, 0, 0) - x₁ axis intercept for finishing constraint
    // (0, 40, 0) - x₂ axis intercept for finishing constraint
    // Intersection of the two constraints: (20, 30, 0)

    const vertices = new Float32Array([
        0, 0, 0, // Origin
        40, 0, 0, // Wood constraint x₁ intercept
        20, 30, 0, // Intersection point
        0, 40, 0, // Finishing constraint x₂ intercept
    ]);

    feasibleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    feasibleGeometry.setIndex([0, 1, 2, 0, 2, 3]);

    const feasibleMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6, // Purple
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });

    const feasibleRegion = new THREE.Mesh(feasibleGeometry, feasibleMaterial);
    feasibleRegion.name = 'feasibleRegion';
    scene.add(feasibleRegion);

    // Create production dot (representing current production levels)
    const dotGeometry = new THREE.SphereGeometry(1, 32, 32);
    const dotMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981, // Green
        emissive: 0x10b981,
        emissiveIntensity: 0.3
    });
    productionDot = new THREE.Mesh(dotGeometry, dotMaterial);
    productionDot.position.set(0, 0, 0);
    productionDot.name = 'productionDot';
    scene.add(productionDot);

    // Create objective function vector
    const arrowDir = new THREE.Vector3(70, 50, 0).normalize();
    const arrowOrigin = new THREE.Vector3(0, 0, 0);
    const arrowLength = 10;
    const arrowColor = 0xec4899; // Pink

    const objectiveArrow = new THREE.ArrowHelper(
        arrowDir,
        arrowOrigin,
        arrowLength,
        arrowColor,
        2, // headLength
        1 // headWidth
    );
    objectiveArrow.name = 'objectiveArrow';
    scene.add(objectiveArrow);

    // Add optimal point
    const optimalGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const optimalMaterial = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.3
    });
    const optimalPoint = new THREE.Mesh(optimalGeometry, optimalMaterial);
    optimalPoint.position.set(20, 30, 0);
    optimalPoint.name = 'optimalPoint';
    scene.add(optimalPoint);

    // Add text labels using HTML overlays for better accessibility
    const container = document.getElementById('formulation-canvas');

    // Set up sliders
    const tablesSlider = document.getElementById('tables-slider');
    const chairsSlider = document.getElementById('chairs-slider');
    const tablesValue = document.getElementById('tables-value');
    const chairsValue = document.getElementById('chairs-value');

    tablesSlider.addEventListener('input', () => {
        tables = parseInt(tablesSlider.value);
        tablesValue.textContent = tables;
        updateProduction();
    });

    chairsSlider.addEventListener('input', () => {
        chairs = parseInt(chairsSlider.value);
        chairsValue.textContent = chairs;
        updateProduction();
    });

    // Add custom animation for this scene
    animations.formulation = function() {
        const time = Date.now() * 0.001;

        // Gentle pulsing for optimal point to highlight the optimal solution
        optimalPoint.scale.set(
            1 + 0.1 * Math.sin(time * 2),
            1 + 0.1 * Math.sin(time * 2),
            1 + 0.1 * Math.sin(time * 2)
        );

        // Animate objective function arrow to show direction of optimization
        objectiveArrow.setLength(
            10 + Math.sin(time) * 1, // Length
            2, // Head length
            1  // Head width
        );

        // Subtle animation of constraint planes to emphasize their role
        if (woodHours <= 120) { // Only animate if not violated
            woodPlane.material.opacity = 0.4 + 0.1 * Math.sin(time * 1.5);
        }

        if (finishHours <= 80) { // Only animate if not violated
            finishPlane.material.opacity = 0.4 + 0.1 * Math.sin(time * 1.3);
        }

        // Add subtle movement to production dot when within constraints
        if (woodHours <= 120 && finishHours <= 80 && (tables > 0 || chairs > 0)) {
            productionDot.position.z = Math.sin(time * 3) * 0.2;
        } else {
            productionDot.position.z = 0;
        }
    };
}

// Update production visualization based on slider values
function updateProduction() {
    // Update production dot position
    productionDot.position.set(tables, chairs, 0);

    // Calculate resource usage
    const woodHours = 3 * tables + 2 * chairs;
    const finishHours = tables + 2 * chairs;

    // Update progress bars
    const woodPercentage = Math.min(100, (woodHours / 120) * 100);
    const finishPercentage = Math.min(100, (finishHours / 80) * 100);

    document.getElementById('wood-hours').textContent = woodHours;
    document.getElementById('finish-hours').textContent = finishHours;
    document.getElementById('wood-progress').style.width = woodPercentage + '%';
    document.getElementById('finish-progress').style.width = finishPercentage + '%';

    // Calculate profit
    const profit = 70 * tables + 50 * chairs;
    document.getElementById('total-profit').textContent = profit;

    // Add constraint validation
    const alertBox = document.getElementById('constraint-alert');
    if (woodHours > 120 || finishHours > 80) {
        alertBox.classList.remove('hidden');
        productionDot.material.color.set(0xdc2626); // Red color

        // Highlight which constraint is violated
        if (woodHours > 120) {
            woodPlane.material.opacity = 0.8;
            woodPlane.material.color.set(0xef4444); // Red
        } else {
            woodPlane.material.opacity = 0.5;
            woodPlane.material.color.set(0x3b82f6); // Blue
        }

        if (finishHours > 80) {
            finishPlane.material.opacity = 0.8;
            finishPlane.material.color.set(0xef4444); // Red
        } else {
            finishPlane.material.opacity = 0.5;
            finishPlane.material.color.set(0x10b981); // Green
        }
    } else {
        alertBox.classList.add('hidden');
        productionDot.material.color.set(0x10b981); // Green color

        // Reset constraint colors
        woodPlane.material.opacity = 0.5;
        woodPlane.material.color.set(0x3b82f6); // Blue

        finishPlane.material.opacity = 0.5;
        finishPlane.material.color.set(0x10b981); // Green
    }

    // Announce to screen readers
    if (woodHours > 120 || finishHours > 80) {
        announceToScreenReader(`Warning: Exceeding available resources. Current profit: $${profit}`);
    } else {
        announceToScreenReader(`Production updated. Tables: ${tables}, Chairs: ${chairs}. Profit: $${profit}`);
    }
}
