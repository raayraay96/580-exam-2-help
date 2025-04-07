/**
 * Three.js scene for the Graphical Solution section
 */

// Global variables for the graphical scene
let constraintLines = [];
let feasibleRegion;
let objectiveLines = [];
let optimalPoint;
let currentStep = 0;

function initGraphicalScene() {
    // Create base scene
    const { scene, camera, renderer, controls } = createBaseScene('graphical');
    scenes.graphical = scene;
    cameras.graphical = camera;
    renderers.graphical = renderer;
    controls.graphical = controls;

    // Position camera for 2D view (top-down)
    camera.position.set(0, 20, 0);
    camera.lookAt(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 2.5; // Limit rotation to maintain top-down view

    // Create a 2D coordinate system
    const gridHelper = new THREE.GridHelper(20, 20);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Create axes with labels
    const axesHelper = new THREE.AxesHelper(10);
    axesHelper.position.set(0, 0.01, 0); // Slightly above grid to avoid z-fighting
    scene.add(axesHelper);

    // Create constraint lines (initially hidden)
    createConstraintLines();

    // Create feasible region (initially hidden)
    createFeasibleRegion();

    // Create objective function lines (initially hidden)
    createObjectiveLines();

    // Create optimal point (initially hidden)
    createOptimalPoint();

    // Add button event listeners
    document.getElementById('show-constraints').addEventListener('click', () => {
        showConstraints();
    });

    document.getElementById('show-feasible').addEventListener('click', () => {
        showFeasibleRegion();
    });

    document.getElementById('show-objective').addEventListener('click', () => {
        showObjectiveFunction();
    });

    document.getElementById('find-optimal').addEventListener('click', () => {
        findOptimalPoint();
    });

    document.getElementById('graphical-reset').addEventListener('click', () => {
        resetGraphicalScene();
    });

    // Add custom animation for this scene
    animations.graphical = function() {
        const time = Date.now() * 0.001;

        // Animate constraint lines if they're visible - Step 1
        if (currentStep >= 1) {
            constraintLines.forEach((line, index) => {
                if (line.visible) {
                    // Subtle pulsing of line width (simulated by opacity since THREE.js doesn't support dynamic line width)
                    line.material.opacity = 0.7 + 0.3 * Math.sin(time * 0.8 + index * 0.3);
                }
            });
        }

        // Animate feasible region if it's visible - Step 2
        if (currentStep >= 2 && feasibleRegion && feasibleRegion.material.visible) {
            // Gentle pulsing of the feasible region to highlight it
            feasibleRegion.material.opacity = 0.2 + 0.15 * Math.sin(time * 0.7);
        }

        // Animate objective function lines if they're visible - Step 3
        if (currentStep >= 3) {
            // Create a wave-like effect across the objective lines to show movement
            // in the direction of increasing objective value
            objectiveLines.forEach((line, index) => {
                if (line.visible) {
                    // Pulse the opacity of objective lines with a phase shift
                    // This creates a wave-like effect showing the direction of optimization
                    line.material.opacity = 0.3 + 0.2 * Math.sin(time + index * 0.5);
                }
            });
        }

        // Animate optimal point if it's visible - Step 4
        if (currentStep >= 4 && optimalPoint && optimalPoint.visible) {
            // More pronounced pulsing for the optimal point to draw attention to it
            const scale = 1 + 0.3 * Math.sin(time * 2);
            optimalPoint.scale.set(scale, scale, scale);

            // Add a slight hovering effect to make it stand out
            optimalPoint.position.y = 0.1 + 0.05 * Math.sin(time * 3);
        }
    };
}

// Create constraint lines
function createConstraintLines() {
    // First constraint: 2x₁ + x₂ ≤ 10
    const constraint1Points = [];
    // x₁ = 0 → x₂ = 10
    constraint1Points.push(new THREE.Vector3(0, 0, 10));
    // x₂ = 0 → x₁ = 5
    constraint1Points.push(new THREE.Vector3(5, 0, 0));

    const constraint1Geometry = new THREE.BufferGeometry().setFromPoints(constraint1Points);
    const constraint1Material = new THREE.LineBasicMaterial({
        color: 0x3b82f6, // Blue
        linewidth: 2,
        visible: false
    });

    const constraint1Line = new THREE.Line(constraint1Geometry, constraint1Material);
    constraint1Line.name = 'constraint1';
    scene.add(constraint1Line);
    constraintLines.push(constraint1Line);

    // Second constraint: x₁ + 3x₂ ≤ 15
    const constraint2Points = [];
    // x₁ = 0 → x₂ = 5
    constraint2Points.push(new THREE.Vector3(0, 0, 5));
    // x₂ = 0 → x₁ = 15
    constraint2Points.push(new THREE.Vector3(15, 0, 0));

    const constraint2Geometry = new THREE.BufferGeometry().setFromPoints(constraint2Points);
    const constraint2Material = new THREE.LineBasicMaterial({
        color: 0x10b981, // Green
        linewidth: 2,
        visible: false
    });

    const constraint2Line = new THREE.Line(constraint2Geometry, constraint2Material);
    constraint2Line.name = 'constraint2';
    scene.add(constraint2Line);
    constraintLines.push(constraint2Line);

    // Non-negativity constraints
    // x₁ ≥ 0 (z-axis)
    const xAxisPoints = [];
    xAxisPoints.push(new THREE.Vector3(0, 0, 0));
    xAxisPoints.push(new THREE.Vector3(0, 0, 10));

    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xAxisPoints);
    const xAxisMaterial = new THREE.LineBasicMaterial({
        color: 0xf59e0b, // Yellow
        linewidth: 2,
        visible: false
    });

    const xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
    xAxisLine.name = 'xAxis';
    scene.add(xAxisLine);
    constraintLines.push(xAxisLine);

    // x₂ ≥ 0 (x-axis)
    const zAxisPoints = [];
    zAxisPoints.push(new THREE.Vector3(0, 0, 0));
    zAxisPoints.push(new THREE.Vector3(10, 0, 0));

    const zAxisGeometry = new THREE.BufferGeometry().setFromPoints(zAxisPoints);
    const zAxisMaterial = new THREE.LineBasicMaterial({
        color: 0xf59e0b, // Yellow
        linewidth: 2,
        visible: false
    });

    const zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
    zAxisLine.name = 'zAxis';
    scene.add(zAxisLine);
    constraintLines.push(zAxisLine);
}

// Create feasible region
function createFeasibleRegion() {
    // Calculate intersection points
    // Origin: (0, 0)
    // Constraint 1 x-intercept: (5, 0)
    // Constraint 2 x-intercept: (15, 0)
    // Constraint 1 y-intercept: (0, 10)
    // Constraint 2 y-intercept: (0, 5)
    // Intersection of constraints: (3, 4)

    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // Origin
    shape.lineTo(5, 0); // Constraint 1 x-intercept
    shape.lineTo(3, 4); // Intersection point
    shape.lineTo(0, 5); // Constraint 2 y-intercept
    shape.lineTo(0, 0); // Back to origin

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6, // Purple
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        visible: false
    });

    feasibleRegion = new THREE.Mesh(geometry, material);
    feasibleRegion.rotation.x = -Math.PI / 2; // Rotate to lie flat on the x-z plane
    feasibleRegion.name = 'feasibleRegion';
    scene.add(feasibleRegion);
}

// Create objective function lines
function createObjectiveLines() {
    // Objective function: Z = 5x₁ + 3x₂
    // Create multiple parallel lines for different Z values
    const zValues = [0, 10, 20, 30, 40];

    zValues.forEach((z, index) => {
        // For each Z value, create a line representing the objective function
        // Z = 5x₁ + 3x₂ → x₂ = (Z - 5x₁) / 3

        const points = [];
        // When x₁ = 0, x₂ = Z / 3
        points.push(new THREE.Vector3(0, 0, z / 3));
        // When x₂ = 0, x₁ = Z / 5
        points.push(new THREE.Vector3(z / 5, 0, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0xec4899, // Pink
            linewidth: 2,
            transparent: true,
            opacity: 0.5,
            visible: false
        });

        const line = new THREE.Line(geometry, material);
        line.name = `objective-${z}`;
        scene.add(line);
        objectiveLines.push(line);
    });
}

// Create optimal point
function createOptimalPoint() {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.3,
        visible: false
    });

    optimalPoint = new THREE.Mesh(geometry, material);
    optimalPoint.position.set(3, 0.1, 4); // Slightly above the plane to avoid z-fighting
    optimalPoint.name = 'optimalPoint';
    scene.add(optimalPoint);
}

// Show constraints (Step 1)
function showConstraints() {
    currentStep = 1;

    // Show constraint lines with animation
    constraintLines.forEach((line, index) => {
        gsap.to(line.material, {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.2,
            onStart: () => {
                line.material.visible = true;
                line.material.transparent = true;
                line.material.opacity = 0;
            }
        });
    });

    // Update explanation
    document.getElementById('solution-box').classList.add('hidden');
    announceToScreenReader("Step 1: Showing constraint lines on the graph");
}

// Show feasible region (Step 2)
function showFeasibleRegion() {
    currentStep = 2;

    // Make sure constraints are visible first
    if (!constraintLines[0].material.visible) {
        showConstraints();
    }

    // Show feasible region with animation
    gsap.to(feasibleRegion.material, {
        opacity: 0.3,
        duration: 0.8,
        onStart: () => {
            feasibleRegion.material.visible = true;
            feasibleRegion.material.opacity = 0;
        }
    });

    // Update explanation
    document.getElementById('solution-box').classList.add('hidden');
    announceToScreenReader("Step 2: Showing the feasible region where all constraints are satisfied");
}

// Show objective function (Step 3)
function showObjectiveFunction() {
    currentStep = 3;

    // Make sure feasible region is visible first
    if (!feasibleRegion.material.visible) {
        showFeasibleRegion();
    }

    // Show objective function lines with animation
    objectiveLines.forEach((line, index) => {
        gsap.to(line.material, {
            opacity: 0.5,
            duration: 0.5,
            delay: index * 0.3,
            onStart: () => {
                line.material.visible = true;
                line.material.transparent = true;
                line.material.opacity = 0;
            }
        });
    });

    // Update explanation
    document.getElementById('solution-box').classList.add('hidden');
    announceToScreenReader("Step 3: Showing objective function lines for different values of Z");
}

// Find optimal point (Step 4)
function findOptimalPoint() {
    currentStep = 4;

    // Make sure objective function is visible first
    if (!objectiveLines[0].material.visible) {
        showObjectiveFunction();
    }

    // Show optimal point with animation
    gsap.to(optimalPoint.material, {
        opacity: 1,
        duration: 0.8,
        onStart: () => {
            optimalPoint.material.visible = true;
            optimalPoint.material.transparent = true;
            optimalPoint.material.opacity = 0;
        }
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

    // Update solution box
    document.getElementById('optimal-x1').textContent = '3';
    document.getElementById('optimal-x2').textContent = '4';
    document.getElementById('optimal-z').textContent = '27';
    document.getElementById('solution-box').classList.remove('hidden');

    announceToScreenReader("Step 4: Found the optimal solution at x₁ = 3, x₂ = 4, with Z = 27");
}

// Reset graphical scene
function resetGraphicalScene() {
    currentStep = 0;

    // Hide all elements
    constraintLines.forEach(line => {
        line.material.visible = false;
    });

    feasibleRegion.material.visible = false;

    objectiveLines.forEach(line => {
        line.material.visible = false;
    });

    optimalPoint.material.visible = false;

    // Reset camera position
    gsap.to(cameras.graphical.position, {
        x: 0,
        y: 20,
        z: 0,
        duration: 1,
        onUpdate: () => {
            cameras.graphical.lookAt(0, 0, 0);
        }
    });

    // Hide solution box
    document.getElementById('solution-box').classList.add('hidden');

    announceToScreenReader("Reset the graphical solution visualization");
}
