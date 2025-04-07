/**
 * Three.js scene for the Graphical Solution section
 */

// Global variables for the graphical scene
const graphicalState = {
    constraintLines: [],
    feasibleRegion: null,
    objectiveLines: [],
    optimalPoint: null,
    currentStep: 0
};

// Define the initialization function
function initGraphicalScene() {
    // Create base scene
    const { scene, camera, renderer, controls } = createBaseScene('graphical');
    scenes.graphical = scene;
    cameras.graphical = camera;
    renderers.graphical = renderer;
    controls.graphical = controls;

    // Position camera for 2D view (top-down)
    camera.position.set(0, 25, 0);
    camera.lookAt(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 2.5; // Limit rotation to maintain top-down view
    
    // Make sure the renderer is properly sized
    const container = document.getElementById('graphical-canvas');
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Increase the size of the visualization elements for better visibility
    const scale = 1.5; // Scale factor to make everything bigger

    // Create a 2D coordinate system
    const gridHelper = new THREE.GridHelper(20 * scale, 20);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Create axes with labels
    const axesHelper = new THREE.AxesHelper(15 * scale);
    axesHelper.position.set(0, 0.01, 0); // Slightly above grid to avoid z-fighting
    scene.add(axesHelper);

    // Create constraint lines (initially hidden)
    createConstraintLines(scene, scale);
    
    // Create feasible region (initially hidden)
    createFeasibleRegion(scene, scale);
    
    // Create objective function lines (initially hidden)
    createObjectiveLines(scene, scale);
    
    // Create optimal point (initially hidden)
    createOptimalPoint(scene, scale);

    // Add step-by-step walkthrough functionality
    document.getElementById('graphical-step1').addEventListener('click', showConstraints);
    document.getElementById('graphical-step2').addEventListener('click', showFeasibleRegion);
    document.getElementById('graphical-step3').addEventListener('click', showObjectiveFunction);
    document.getElementById('graphical-step4').addEventListener('click', findOptimalPoint);
    document.getElementById('graphical-reset').addEventListener('click', resetGraphical);

    // Add custom animation for this scene
    animations.graphical = function() {
        const time = Date.now() * 0.001;
        
        // Scale factor for animations
        const scale = 1 + 0.1 * Math.sin(time * 2);
        
        // Animate based on current step
        if (graphicalState.currentStep >= 1) {
            // Animate constraint lines
            graphicalState.constraintLines.forEach(line => {
                if (line.material.visible) {
                    line.material.opacity = 0.7 + 0.3 * Math.sin(time + line.name.charCodeAt(0) * 0.1);
                }
            });
        }
        
        if (graphicalState.currentStep >= 2 && graphicalState.feasibleRegion) {
            // Animate feasible region
            graphicalState.feasibleRegion.material.opacity = 0.4 + 0.2 * Math.sin(time * 0.5);
        }
        
        if (graphicalState.currentStep >= 3) {
            // Animate objective function lines
            graphicalState.objectiveLines.forEach((line, index) => {
                if (line.material.visible) {
                    line.material.opacity = 0.7 + 0.3 * Math.sin(time * 0.7 + index * 0.2);
                }
            });
        }
        
        if (graphicalState.currentStep >= 4 && graphicalState.optimalPoint && graphicalState.optimalPoint.visible) {
            // Animate optimal point
            graphicalState.optimalPoint.scale.set(scale, scale, scale);
            
            // Make it float slightly
            graphicalState.optimalPoint.position.y = 0.1 + 0.05 * Math.sin(time * 3);
        }
    };
}

// Create constraint lines
function createConstraintLines(scene, scale = 1) {
    // Reset constraint lines array
    graphicalState.constraintLines = [];
    
    // First constraint: 2x₁ + x₂ ≤ 10
    const constraint1Points = [];
    // x₁ = 0 → x₂ = 10
    constraint1Points.push(new THREE.Vector3(0, 0, 10 * scale));
    // x₂ = 0 → x₁ = 5
    constraint1Points.push(new THREE.Vector3(5 * scale, 0, 0));
    
    const constraint1Geometry = new THREE.BufferGeometry().setFromPoints(constraint1Points);
    const constraint1Material = new THREE.LineBasicMaterial({
        color: 0x3b82f6, // Blue
        linewidth: 2,
        visible: false
    });
    
    const constraint1Line = new THREE.Line(constraint1Geometry, constraint1Material);
    constraint1Line.name = 'constraint1';
    scene.add(constraint1Line);
    graphicalState.constraintLines.push(constraint1Line);
    
    // Second constraint: x₁ + 3x₂ ≤ 15
    const constraint2Points = [];
    // x₁ = 0 → x₂ = 5
    constraint2Points.push(new THREE.Vector3(0, 0, 5 * scale));
    // x₂ = 0 → x₁ = 15
    constraint2Points.push(new THREE.Vector3(15 * scale, 0, 0));
    
    const constraint2Geometry = new THREE.BufferGeometry().setFromPoints(constraint2Points);
    const constraint2Material = new THREE.LineBasicMaterial({
        color: 0x10b981, // Green
        linewidth: 2,
        visible: false
    });
    
    const constraint2Line = new THREE.Line(constraint2Geometry, constraint2Material);
    constraint2Line.name = 'constraint2';
    scene.add(constraint2Line);
    graphicalState.constraintLines.push(constraint2Line);
    
    // Non-negativity constraints
    // x₁ ≥ 0 (z-axis)
    const xAxisPoints = [];
    xAxisPoints.push(new THREE.Vector3(0, 0, 0));
    xAxisPoints.push(new THREE.Vector3(0, 0, 15 * scale));

    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xAxisPoints);
    const xAxisMaterial = new THREE.LineBasicMaterial({
        color: 0xf59e0b, // Yellow
        linewidth: 3, // Thicker line for better visibility
        visible: false
    });
    
    const xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
    xAxisLine.name = 'xAxis';
    scene.add(xAxisLine);
    graphicalState.constraintLines.push(xAxisLine);
    
    // x₂ ≥ 0 (x-axis)
    const zAxisPoints = [];
    zAxisPoints.push(new THREE.Vector3(0, 0, 0));
    zAxisPoints.push(new THREE.Vector3(15 * scale, 0, 0));

    const zAxisGeometry = new THREE.BufferGeometry().setFromPoints(zAxisPoints);
    const zAxisMaterial = new THREE.LineBasicMaterial({
        color: 0xf59e0b, // Yellow
        linewidth: 3, // Thicker line for better visibility
        visible: false
    });
    
    const zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
    zAxisLine.name = 'zAxis';
    scene.add(zAxisLine);
    graphicalState.constraintLines.push(zAxisLine);
}

// Create feasible region
function createFeasibleRegion(scene, scale = 1) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // Origin
    shape.lineTo(5 * scale, 0); // Constraint 1 x-intercept
    shape.lineTo(3 * scale, 4 * scale); // Intersection point
    shape.lineTo(0, 5 * scale); // Constraint 2 y-intercept
    shape.lineTo(0, 0); // Back to origin
    
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6, // Purple
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        visible: false
    });
    
    graphicalState.feasibleRegion = new THREE.Mesh(geometry, material);
    graphicalState.feasibleRegion.rotation.x = Math.PI / 2; // Rotate to lie flat on the xz plane
    graphicalState.feasibleRegion.position.y = 0.05; // Slightly above the grid to avoid z-fighting
    graphicalState.feasibleRegion.name = 'feasibleRegion';
    scene.add(graphicalState.feasibleRegion);
}

// Create objective function lines
function createObjectiveLines(scene, scale = 1) {
    // Reset objective lines array
    graphicalState.objectiveLines = [];
    
    // Create multiple parallel lines for different Z values
    const zValues = [0, 10, 20, 30, 40];
    
    zValues.forEach((z, index) => {
        // For each z value, create a line representing the objective function
        // Z = 5x₁ + 3x₂
        // x₂ = (Z - 5x₁) / 3
        
        const points = [];
        // When x₁ = 0, x₂ = Z / 3
        points.push(new THREE.Vector3(0, 0, (z / 3) * scale));
        // When x₂ = 0, x₁ = Z / 5
        points.push(new THREE.Vector3((z / 5) * scale, 0, 0));
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: index === 0 ? 0xec4899 : 0xf472b6, // Pink (darker for Z=0)
            linewidth: index === 0 ? 3 : 2, // Thicker for Z=0
            transparent: true,
            opacity: 0.7,
            visible: false
        });
        
        const line = new THREE.Line(geometry, material);
        line.name = `objective-${z}`;
        scene.add(line);
        graphicalState.objectiveLines.push(line);
    });
}

// Create optimal point
function createOptimalPoint(scene, scale = 1) {
    const geometry = new THREE.SphereGeometry(0.4, 32, 32); // Larger sphere for better visibility
    const material = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.5, // Brighter for better visibility
        visible: false
    });

    // Create the optimal point mesh
    graphicalState.optimalPoint = new THREE.Mesh(geometry, material);
    graphicalState.optimalPoint.position.set(3 * scale, 0.1, 4 * scale); // Slightly above the plane to avoid z-fighting
    graphicalState.optimalPoint.name = 'optimalPoint';
    scene.add(graphicalState.optimalPoint);
}

// Show constraints (Step 1)
function showConstraints() {
    graphicalState.currentStep = 1;

    // Show constraint lines with animation
    graphicalState.constraintLines.forEach((line, index) => {
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
    document.getElementById('graphical-explanation').classList.remove('hidden');
    document.getElementById('graphical-step-title').textContent = 'Step 1: Identify Constraints';
    document.getElementById('graphical-step-description').textContent = 'The constraints define the boundaries of our feasible region. We have two main constraints: 2x₁ + x₂ ≤ 10 (blue line) and x₁ + 3x₂ ≤ 15 (green line). We also have non-negativity constraints: x₁ ≥ 0 and x₂ ≥ 0 (yellow lines).';

    // Update math steps
    const mathStepsContent = document.getElementById('graphical-math-steps');
    if (mathStepsContent) {
        mathStepsContent.textContent = `Constraint 1: 2x₁ + x₂ ≤ 10 (blue line)
- When x₁ = 0: x₂ = 10
- When x₂ = 0: x₁ = 5

Constraint 2: x₁ + 3x₂ ≤ 15 (green line)
- When x₁ = 0: x₂ = 5
- When x₂ = 0: x₁ = 15

Non-negativity constraints:
- x₁ ≥ 0 (x-axis)
- x₂ ≥ 0 (z-axis)`;
    }

    // Announce to screen readers
    announceToScreenReader("Step 1: Showing constraint lines that define the feasible region");
}

// Show feasible region (Step 2)
function showFeasibleRegion() {
    // Make sure constraints are visible first
    if (graphicalState.currentStep < 1) {
        showConstraints();
    }

    graphicalState.currentStep = 2;

    // Show feasible region with animation
    gsap.to(graphicalState.feasibleRegion.material, {
        opacity: 0.4,
        duration: 0.8,
        onStart: () => {
            graphicalState.feasibleRegion.material.visible = true;
            graphicalState.feasibleRegion.material.transparent = true;
            graphicalState.feasibleRegion.material.opacity = 0;
        }
    });

    // Update explanation
    document.getElementById('graphical-explanation').classList.remove('hidden');
    document.getElementById('graphical-step-title').textContent = 'Step 2: Identify Feasible Region';
    document.getElementById('graphical-step-description').textContent = 'The feasible region (purple area) is the set of all points that satisfy all constraints. Any point inside this region is a valid solution to our problem. The corners of this region are particularly important as they are potential optimal solutions.';

    // Update math steps
    const mathStepsContent = document.getElementById('graphical-math-steps');
    if (mathStepsContent) {
        mathStepsContent.textContent = `The feasible region is bounded by:
- The x₁-axis (x₂ = 0)
- The x₂-axis (x₁ = 0)
- The line 2x₁ + x₂ = 10
- The line x₁ + 3x₂ = 15

The corner points are:
1. (0, 0) - Origin
2. (5, 0) - Intersection of 2x₁ + x₂ = 10 with x₂ = 0
3. (3, 4) - Intersection of 2x₁ + x₂ = 10 with x₁ + 3x₂ = 15
4. (0, 5) - Intersection of x₁ + 3x₂ = 15 with x₁ = 0

To find the intersection point (3, 4):
Solve the system of equations:
2x₁ + x₂ = 10
x₁ + 3x₂ = 15

From the first equation: x₂ = 10 - 2x₁
Substitute into the second equation:
x₁ + 3(10 - 2x₁) = 15
x₁ + 30 - 6x₁ = 15
-5x₁ = -15
x₁ = 3

Substitute back:
x₂ = 10 - 2(3) = 10 - 6 = 4

So the intersection point is (3, 4)`;
    }

    // Announce to screen readers
    announceToScreenReader("Step 2: Showing the feasible region where all constraints are satisfied");
}

// Show objective function (Step 3)
function showObjectiveFunction() {
    // Make sure feasible region is visible first
    if (graphicalState.currentStep < 2) {
        showFeasibleRegion();
    }

    graphicalState.currentStep = 3;

    // Show objective function lines with animation
    graphicalState.objectiveLines.forEach((line, index) => {
        gsap.to(line.material, {
            opacity: 0.7,
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
    document.getElementById('graphical-explanation').classList.remove('hidden');
    document.getElementById('graphical-step-title').textContent = 'Step 3: Plot Objective Function';
    document.getElementById('graphical-step-description').textContent = 'The objective function Z = 5x₁ + 3x₂ represents the profit we want to maximize. Each pink line represents a different value of Z (0, 10, 20, 30, 40). As we move these lines outward, we find the highest value of Z that still touches the feasible region.';

    // Update math steps
    const mathStepsContent = document.getElementById('graphical-math-steps');
    if (mathStepsContent) {
        mathStepsContent.textContent = `Objective Function: Z = 5x₁ + 3x₂

We can rewrite this as: x₂ = (Z - 5x₁) / 3

For different values of Z:
- Z = 0: x₂ = -5x₁/3
- Z = 10: x₂ = (10 - 5x₁)/3
- Z = 20: x₂ = (20 - 5x₁)/3
- Z = 30: x₂ = (30 - 5x₁)/3
- Z = 40: x₂ = (40 - 5x₁)/3

These are parallel lines with slope -5/3.
As Z increases, the lines move outward (away from the origin).
The optimal solution occurs at the furthest point where the objective function line still touches the feasible region.`;
    }

    // Announce to screen readers
    announceToScreenReader("Step 3: Showing objective function lines for different values of Z");
}

// Find optimal point (Step 4)
function findOptimalPoint() {
    // Make sure objective function is visible first
    if (graphicalState.currentStep < 3) {
        showObjectiveFunction();
    }

    graphicalState.currentStep = 4;

    // Show optimal point with animation
    gsap.to(graphicalState.optimalPoint.material, {
        opacity: 1,
        duration: 0.8,
        onStart: () => {
            graphicalState.optimalPoint.material.visible = true;
            graphicalState.optimalPoint.material.transparent = true;
            graphicalState.optimalPoint.material.opacity = 0;
        }
    });

    // Scale up the optimal point
    gsap.to(graphicalState.optimalPoint.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 0.5,
        yoyo: true,
        repeat: 2
    });

    // Update explanation
    document.getElementById('graphical-explanation').classList.remove('hidden');
    document.getElementById('graphical-step-title').textContent = 'Step 4: Find Optimal Solution';
    document.getElementById('graphical-step-description').textContent = 'The optimal solution is at the point (3, 4), where the objective function reaches its maximum value while still touching the feasible region. This gives us Z = 5(3) + 3(4) = 15 + 12 = 27.';

    // Update math steps
    const mathStepsContent = document.getElementById('graphical-math-steps');
    if (mathStepsContent) {
        mathStepsContent.textContent = `To find the optimal solution, we evaluate the objective function at each corner point:

1. At (0, 0): Z = 5(0) + 3(0) = 0
2. At (5, 0): Z = 5(5) + 3(0) = 25
3. At (3, 4): Z = 5(3) + 3(4) = 15 + 12 = 27
4. At (0, 5): Z = 5(0) + 3(5) = 15

The maximum value of Z is 27, which occurs at the point (3, 4).

Therefore, the optimal solution is:
x₁ = 3
x₂ = 4
Z = 27

This means we should produce 3 units of product 1 and 4 units of product 2 to maximize our profit at $27.`;
    }

    // Show solution summary
    const solutionSummary = document.getElementById('graphical-solution-summary');
    if (solutionSummary) {
        solutionSummary.classList.remove('hidden');
        
        // Update solution details
        document.getElementById('graphical-solution-x1').textContent = '3';
        document.getElementById('graphical-solution-x2').textContent = '4';
        document.getElementById('graphical-solution-z').textContent = '27';
        
        // Update binding constraints
        document.getElementById('graphical-binding-constraints').innerHTML = 
            '<div>2x₁ + x₂ = 10</div>' +
            '<div>x₁ + 3x₂ = 15</div>';
    }

    // Announce to screen readers
    announceToScreenReader("Step 4: Found the optimal solution at the point (3, 4) with maximum profit of $27");
}

// Reset the graphical visualization
function resetGraphical() {
    graphicalState.currentStep = 0;

    // Hide all elements
    graphicalState.constraintLines.forEach(line => {
        line.material.visible = false;
    });

    if (graphicalState.feasibleRegion) {
        graphicalState.feasibleRegion.material.visible = false;
    }

    graphicalState.objectiveLines.forEach(line => {
        line.material.visible = false;
    });

    if (graphicalState.optimalPoint) {
        graphicalState.optimalPoint.material.visible = false;
    }

    // Hide explanation and solution boxes
    document.getElementById('graphical-explanation').classList.add('hidden');
    document.getElementById('graphical-solution-summary').classList.add('hidden');

    // Announce to screen readers
    announceToScreenReader("Reset the graphical visualization");
}
