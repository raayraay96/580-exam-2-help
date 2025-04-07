/**
 * Three.js scene for the Problem Formulation section
 */

// Global variables for the formulation scene
let tables = 0;
let chairs = 0;
let productionDot;
let woodPlane;
let finishPlane;
let decisionVariables;
let objectiveArrow;
let optimalPoint;
let currentFormulationStep = 0;
let currentProblemType = 'furniture';

// Problem definitions
const problems = {
    furniture: {
        title: 'Furniture Manufacturing',
        description: 'A furniture company makes tables and chairs. Each table requires 3 hours of woodworking and 1 hour of finishing. Each chair requires 2 hours of woodworking and 2 hours of finishing. The company has 120 hours of woodworking time and 80 hours of finishing time available. Each table sells for $70 profit and each chair for $50 profit. How many of each should be made to maximize profit?',
        variables: {
            x1: { name: 'tables', label: 'Tables' },
            x2: { name: 'chairs', label: 'Chairs' }
        },
        objective: {
            type: 'maximize',
            function: '70x₁ + 50x₂',
            coefficients: [70, 50]
        },
        constraints: [
            { expression: '3x₁ + 2x₂ ≤ 120', label: 'Wood hours', color: 0x3b82f6 },
            { expression: '1x₁ + 2x₂ ≤ 80', label: 'Finishing hours', color: 0x10b981 }
        ],
        solution: {
            x1: 20,
            x2: 30,
            value: 2900,
            bindingConstraints: ['1x₁ + 2x₂ = 80', '3x₁ + 2x₂ = 120']
        },
        steps: {
            step1: 'Decision variables represent the quantities we can control. In this problem, x₁ = number of tables to produce and x₂ = number of chairs to produce. The green dot shows our current production levels.',
            step2: 'The objective function defines what we want to maximize or minimize. Here, we want to maximize profit: Z = 70x₁ + 50x₂. The pink arrow shows the direction of increasing profit.',
            step3: 'Constraints define the limits we must work within. We have two resource constraints: 3x₁ + 2x₂ ≤ 120 (wood hours, blue plane) and 1x₁ + 2x₂ ≤ 80 (finishing hours, green plane). We also have non-negativity constraints: x₁ ≥ 0, x₂ ≥ 0.',
            step4: 'The optimal solution is at the intersection of the two constraint planes: x₁ = 20 tables and x₂ = 30 chairs, giving a maximum profit of $2,900. This is shown by the red sphere.'
        },
        mathSteps: {
            step1: `Decision Variables:
x₁ = number of tables to produce
x₂ = number of chairs to produce

Both x₁ ≥ 0 and x₂ ≥ 0 (non-negativity constraints)`,

            step2: `Objective Function:
Maximize Z = 70x₁ + 50x₂

Where:
- 70 is the profit per table ($)
- 50 is the profit per chair ($)`,

            step3: `Constraints:
1. Wood constraint: 3x₁ + 2x₂ ≤ 120
   - Each table uses 3 hours of woodworking
   - Each chair uses 2 hours of woodworking
   - Total available: 120 hours

2. Finishing constraint: 1x₁ + 2x₂ ≤ 80
   - Each table uses 1 hour of finishing
   - Each chair uses 2 hours of finishing
   - Total available: 80 hours

3. Non-negativity: x₁ ≥ 0, x₂ ≥ 0`,

            step4: `Finding the optimal solution:

Step 1: Identify the corner points of the feasible region
- Origin: (0, 0)
- Intersection of x₁-axis and wood constraint: (40, 0)
- Intersection of x₂-axis and finishing constraint: (0, 40)
- Intersection of wood and finishing constraints:
  Solve the system of equations:
  3x₁ + 2x₂ = 120
  1x₁ + 2x₂ = 80

  Subtracting the second from the first:
  2x₁ = 40
  x₁ = 20

  Substituting back:
  1(20) + 2x₂ = 80
  20 + 2x₂ = 80
  2x₂ = 60
  x₂ = 30

  So the intersection point is (20, 30)

Step 2: Evaluate the objective function at each corner point
- At (0, 0): Z = 70(0) + 50(0) = 0
- At (40, 0): Z = 70(40) + 50(0) = 2,800
- At (0, 40): Z = 70(0) + 50(40) = 2,000
- At (20, 30): Z = 70(20) + 50(30) = 1,400 + 1,500 = 2,900

The maximum value of Z is 2,900 at the point (20, 30)`
        }
    },
    diet: {
        title: 'Diet Optimization',
        description: 'A nutritionist is designing a diet using two foods. Food 1 contains 2 units of protein, 1 unit of calcium, and 3 units of vitamin D per serving. Food 2 contains 1 unit of protein, 2 units of calcium, and 1 unit of vitamin D per serving. The diet requires at least 10 units of protein, 8 units of calcium, and 12 units of vitamin D. Food 1 costs $3 per serving and Food 2 costs $2 per serving. How many servings of each food should be included to minimize cost?',
        variables: {
            x1: { name: 'food1', label: 'Food 1' },
            x2: { name: 'food2', label: 'Food 2' }
        },
        objective: {
            type: 'minimize',
            function: '3x₁ + 2x₂',
            coefficients: [3, 2]
        },
        constraints: [
            { expression: '2x₁ + 1x₂ ≥ 10', label: 'Protein', color: 0x3b82f6 },
            { expression: '1x₁ + 2x₂ ≥ 8', label: 'Calcium', color: 0x10b981 },
            { expression: '3x₁ + 1x₂ ≥ 12', label: 'Vitamin D', color: 0xf59e0b }
        ],
        solution: {
            x1: 3,
            x2: 5,
            value: 19
        },
        steps: {
            step1: 'Decision variables represent the quantities we can control. In this problem, x₁ = servings of Food 1 and x₂ = servings of Food 2. The green dot shows our current diet plan.',
            step2: 'The objective function defines what we want to maximize or minimize. Here, we want to minimize cost: Z = 3x₁ + 2x₂. The pink arrow shows the direction of decreasing cost.',
            step3: 'Constraints define the minimum requirements we must meet. We have three nutritional constraints: 2x₁ + 1x₂ ≥ 10 (protein, blue plane), 1x₁ + 2x₂ ≥ 8 (calcium, green plane), and 3x₁ + 1x₂ ≥ 12 (vitamin D, yellow plane). We also have non-negativity constraints: x₁ ≥ 0, x₂ ≥ 0.',
            step4: 'The optimal solution is at the intersection of the protein and vitamin D constraints: x₁ = 3 servings of Food 1 and x₂ = 5 servings of Food 2, giving a minimum cost of $19. This is shown by the red sphere.'
        }
    },
    transportation: {
        title: 'Transportation Problem',
        description: 'A company has two warehouses that supply three retail stores. Warehouse 1 has 80 units of product, and Warehouse 2 has 70 units. Store 1 needs 40 units, Store 2 needs 60 units, and Store 3 needs 50 units. The shipping cost per unit from Warehouse 1 to Stores 1, 2, and 3 is $10, $8, and $6 respectively. The shipping cost per unit from Warehouse 2 to Stores 1, 2, and 3 is $7, $9, and $12 respectively. How should the company ship products to minimize total shipping cost?',
        variables: {
            x1: { name: 'w1s1', label: 'W1→S1' },
            x2: { name: 'w1s2', label: 'W1→S2' },
            x3: { name: 'w1s3', label: 'W1→S3' },
            x4: { name: 'w2s1', label: 'W2→S1' },
            x5: { name: 'w2s2', label: 'W2→S2' },
            x6: { name: 'w2s3', label: 'W2→S3' }
        },
        objective: {
            type: 'minimize',
            function: '10x₁ + 8x₂ + 6x₃ + 7x₄ + 9x₅ + 12x₆',
            coefficients: [10, 8, 6, 7, 9, 12]
        },
        constraints: [
            { expression: 'x₁ + x₂ + x₃ ≤ 80', label: 'Warehouse 1 supply', color: 0x3b82f6 },
            { expression: 'x₄ + x₅ + x₆ ≤ 70', label: 'Warehouse 2 supply', color: 0x10b981 },
            { expression: 'x₁ + x₄ = 40', label: 'Store 1 demand', color: 0xf59e0b },
            { expression: 'x₂ + x₅ = 60', label: 'Store 2 demand', color: 0xec4899 },
            { expression: 'x₃ + x₆ = 50', label: 'Store 3 demand', color: 0x8b5cf6 }
        ],
        solution: {
            x1: 0,
            x2: 30,
            x3: 50,
            x4: 40,
            x5: 30,
            x6: 0,
            value: 1130
        },
        steps: {
            step1: 'Decision variables represent the quantities we can control. In this problem, x₁ through x₆ represent the units shipped from each warehouse to each store. For example, x₁ = units shipped from Warehouse 1 to Store 1.',
            step2: 'The objective function defines what we want to maximize or minimize. Here, we want to minimize total shipping cost: Z = 10x₁ + 8x₂ + 6x₃ + 7x₄ + 9x₅ + 12x₆.',
            step3: 'Constraints define the limits we must work within. We have supply constraints for each warehouse and demand constraints for each store. For example, x₁ + x₂ + x₃ ≤ 80 means Warehouse 1 can ship at most 80 units total.',
            step4: 'The optimal solution is: Ship 0 units from W1 to S1, 30 units from W1 to S2, 50 units from W1 to S3, 40 units from W2 to S1, 30 units from W2 to S2, and 0 units from W2 to S3. This gives a minimum shipping cost of $1,130.'
        }
    },
    investment: {
        title: 'Investment Portfolio',
        description: 'An investor has $10,000 to allocate between two investments. Investment A has an expected annual return of 8% with a risk factor of 5. Investment B has an expected annual return of 12% with a risk factor of 10. The investor wants to achieve an annual return of at least $1,000 while keeping the average risk factor below 8. How much should be allocated to each investment to maximize return?',
        variables: {
            x1: { name: 'investmentA', label: 'Investment A' },
            x2: { name: 'investmentB', label: 'Investment B' }
        },
        objective: {
            type: 'maximize',
            function: '0.08x₁ + 0.12x₂',
            coefficients: [0.08, 0.12]
        },
        constraints: [
            { expression: 'x₁ + x₂ ≤ 10000', label: 'Total investment', color: 0x3b82f6 },
            { expression: '5x₁ + 10x₂ ≤ 80000', label: 'Risk constraint', color: 0x10b981 },
            { expression: '0.08x₁ + 0.12x₂ ≥ 1000', label: 'Minimum return', color: 0xf59e0b }
        ],
        solution: {
            x1: 0,
            x2: 8333.33,
            value: 1000
        },
        steps: {
            step1: 'Decision variables represent the quantities we can control. In this problem, x₁ = amount invested in Investment A and x₂ = amount invested in Investment B. The green dot shows our current investment allocation.',
            step2: 'The objective function defines what we want to maximize or minimize. Here, we want to maximize return: Z = 0.08x₁ + 0.12x₂. The pink arrow shows the direction of increasing return.',
            step3: 'Constraints define the limits we must work within. We have three constraints: x₁ + x₂ ≤ 10000 (total investment, blue plane), 5x₁ + 10x₂ ≤ 80000 (risk constraint, green plane), and 0.08x₁ + 0.12x₂ ≥ 1000 (minimum return, yellow plane). We also have non-negativity constraints: x₁ ≥ 0, x₂ ≥ 0.',
            step4: 'The optimal solution is to invest $0 in Investment A and $8,333.33 in Investment B, giving a maximum return of $1,000. This is shown by the red sphere.'
        }
    },
    production: {
        title: 'Production Planning',
        description: 'A factory produces two products: Standard and Deluxe. Each Standard product requires 4 hours of labor and 2 kg of raw material. Each Deluxe product requires 6 hours of labor and 5 kg of raw material. The factory has 120 hours of labor and 80 kg of raw material available per week. The profit is $40 for each Standard product and $60 for each Deluxe product. How many of each product should be produced to maximize profit?',
        variables: {
            x1: { name: 'standard', label: 'Standard' },
            x2: { name: 'deluxe', label: 'Deluxe' }
        },
        objective: {
            type: 'maximize',
            function: '40x₁ + 60x₂',
            coefficients: [40, 60]
        },
        constraints: [
            { expression: '4x₁ + 6x₂ ≤ 120', label: 'Labor hours', color: 0x3b82f6 },
            { expression: '2x₁ + 5x₂ ≤ 80', label: 'Raw material', color: 0x10b981 }
        ],
        solution: {
            x1: 20,
            x2: 8,
            value: 1280
        },
        steps: {
            step1: 'Decision variables represent the quantities we can control. In this problem, x₁ = number of Standard products and x₂ = number of Deluxe products. The green dot shows our current production levels.',
            step2: 'The objective function defines what we want to maximize or minimize. Here, we want to maximize profit: Z = 40x₁ + 60x₂. The pink arrow shows the direction of increasing profit.',
            step3: 'Constraints define the limits we must work within. We have two resource constraints: 4x₁ + 6x₂ ≤ 120 (labor hours, blue plane) and 2x₁ + 5x₂ ≤ 80 (raw material, green plane). We also have non-negativity constraints: x₁ ≥ 0, x₂ ≥ 0.',
            step4: 'The optimal solution is at the intersection of the two constraint planes: x₁ = 20 Standard products and x₂ = 8 Deluxe products, giving a maximum profit of $1,280. This is shown by the red sphere.'
        }
    }
};

// Export the initialization function
window.initFormulationScene = function() {
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

        // Add a resize observer to handle window resizing
        const resizeObserver = new ResizeObserver(() => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        });

        resizeObserver.observe(container);
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

    objectiveArrow = new THREE.ArrowHelper(
        arrowDir,
        arrowOrigin,
        arrowLength,
        arrowColor,
        2, // headLength
        1 // headWidth
    );
    objectiveArrow.name = 'objectiveArrow';
    objectiveArrow.visible = false;
    scene.add(objectiveArrow);

    // Add optimal point
    const optimalGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const optimalMaterial = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.3
    });
    optimalPoint = new THREE.Mesh(optimalGeometry, optimalMaterial);
    optimalPoint.position.set(20, 30, 0);
    optimalPoint.name = 'optimalPoint';
    optimalPoint.visible = false;
    scene.add(optimalPoint);

    // Add text labels using HTML overlays for better accessibility
    // Note: We already have a container reference from earlier

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

    // Add step-by-step walkthrough functionality
    document.getElementById('formulation-step1').addEventListener('click', showDecisionVariables);
    document.getElementById('formulation-step2').addEventListener('click', showObjectiveFunction);
    document.getElementById('formulation-step3').addEventListener('click', showConstraints);
    document.getElementById('formulation-step4').addEventListener('click', showOptimalSolution);
    document.getElementById('formulation-reset').addEventListener('click', resetFormulation);

    // Add problem selector functionality
    document.getElementById('load-problem').addEventListener('click', loadSelectedProblem);

    // Initialize with the default problem
    updateProblemDescription(currentProblemType);

    // Add custom animation for this scene
    animations.formulation = function() {
        const time = Date.now() * 0.001;
        const woodHours = 3 * tables + 2 * chairs;
        const finishHours = tables + 2 * chairs;

        // Animate based on current step
        if (currentFormulationStep >= 1) {
            // Animate decision variables (production dot)
            productionDot.scale.x = 1 + 0.1 * Math.sin(time * 2);
            productionDot.scale.y = 1 + 0.1 * Math.sin(time * 2);
            productionDot.scale.z = 1 + 0.1 * Math.sin(time * 2);
        }

        if (currentFormulationStep >= 2) {
            // Animate objective function arrow
            objectiveArrow.setLength(
                10 + Math.sin(time) * 1, // Length
                2, // Head length
                1  // Head width
            );
        }

        if (currentFormulationStep >= 3) {
            // Animate constraint planes
            woodPlane.material.opacity = 0.3 + 0.2 * Math.sin(time * 0.7);
            finishPlane.material.opacity = 0.3 + 0.2 * Math.sin(time * 0.7 + Math.PI);
        }

        if (currentFormulationStep >= 4) {
            // Animate optimal point
            optimalPoint.scale.set(
                1 + 0.2 * Math.sin(time * 2.5),
                1 + 0.2 * Math.sin(time * 2.5),
                1 + 0.2 * Math.sin(time * 2.5)
            );
        }

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

// Step 1: Show Decision Variables
function showDecisionVariables() {
    currentFormulationStep = 1;

    // Show the production dot (representing decision variables)
    productionDot.visible = true;

    // Hide other elements
    objectiveArrow.visible = false;
    optimalPoint.visible = false;

    // Update explanation
    const explanationBox = document.getElementById('formulation-explanation');
    const stepTitle = document.getElementById('formulation-step-title');
    const stepDescription = document.getElementById('formulation-step-description');
    const mathStepsContent = document.getElementById('math-steps-content');

    explanationBox.classList.remove('hidden');
    stepTitle.textContent = 'Step 1: Define Decision Variables';
    stepDescription.textContent = problems[currentProblemType].steps.step1;

    // Update math steps
    if (problems[currentProblemType].mathSteps && problems[currentProblemType].mathSteps.step1) {
        mathStepsContent.textContent = problems[currentProblemType].mathSteps.step1;
    }

    // Hide solution summary
    document.getElementById('solution-summary').classList.add('hidden');

    // Announce to screen readers
    announceToScreenReader('Step 1: Defining decision variables for the linear programming problem.');
}

// Step 2: Show Objective Function
function showObjectiveFunction() {
    // Make sure step 1 is completed first
    if (currentFormulationStep < 1) {
        showDecisionVariables();
    }

    currentFormulationStep = 2;

    // Show the objective function arrow
    objectiveArrow.visible = true;

    // Update explanation
    const explanationBox = document.getElementById('formulation-explanation');
    const stepTitle = document.getElementById('formulation-step-title');
    const stepDescription = document.getElementById('formulation-step-description');
    const mathStepsContent = document.getElementById('math-steps-content');

    explanationBox.classList.remove('hidden');
    stepTitle.textContent = 'Step 2: Set Objective Function';
    stepDescription.textContent = problems[currentProblemType].steps.step2;

    // Update math steps
    if (problems[currentProblemType].mathSteps && problems[currentProblemType].mathSteps.step2) {
        mathStepsContent.textContent = problems[currentProblemType].mathSteps.step2;
    }

    // Hide solution summary
    document.getElementById('solution-summary').classList.add('hidden');

    // Announce to screen readers
    const objectiveType = problems[currentProblemType].objective.type;
    announceToScreenReader(`Step 2: Setting the objective function to ${objectiveType} ${objectiveType === 'maximize' ? 'profit' : 'cost'}.`);
}

// Step 3: Show Constraints
function showConstraints() {
    // Make sure previous steps are completed first
    if (currentFormulationStep < 2) {
        showObjectiveFunction();
    }

    currentFormulationStep = 3;

    // Make constraint planes more visible
    woodPlane.material.opacity = 0.6;
    finishPlane.material.opacity = 0.6;

    // Update explanation
    const explanationBox = document.getElementById('formulation-explanation');
    const stepTitle = document.getElementById('formulation-step-title');
    const stepDescription = document.getElementById('formulation-step-description');
    const mathStepsContent = document.getElementById('math-steps-content');

    explanationBox.classList.remove('hidden');
    stepTitle.textContent = 'Step 3: Add Constraints';
    stepDescription.textContent = problems[currentProblemType].steps.step3;

    // Update math steps
    if (problems[currentProblemType].mathSteps && problems[currentProblemType].mathSteps.step3) {
        mathStepsContent.textContent = problems[currentProblemType].mathSteps.step3;
    }

    // Hide solution summary
    document.getElementById('solution-summary').classList.add('hidden');

    // Announce to screen readers
    announceToScreenReader('Step 3: Adding constraints to define the feasible region.');
}

// Step 4: Show Optimal Solution
function showOptimalSolution() {
    // Make sure previous steps are completed first
    if (currentFormulationStep < 3) {
        showConstraints();
    }

    currentFormulationStep = 4;

    // Show the optimal point
    optimalPoint.visible = true;

    // Get the current problem
    const problem = problems[currentProblemType];

    // Set sliders to optimal values
    const tablesSlider = document.getElementById('tables-slider');
    const chairsSlider = document.getElementById('chairs-slider');

    tablesSlider.value = problem.solution.x1;
    chairsSlider.value = problem.solution.x2;

    // Update production with optimal values
    tables = problem.solution.x1;
    chairs = problem.solution.x2;
    document.getElementById('tables-value').textContent = tables;
    document.getElementById('chairs-value').textContent = chairs;
    updateProduction();

    // Update explanation
    const explanationBox = document.getElementById('formulation-explanation');
    const stepTitle = document.getElementById('formulation-step-title');
    const stepDescription = document.getElementById('formulation-step-description');
    const mathStepsContent = document.getElementById('math-steps-content');

    explanationBox.classList.remove('hidden');
    stepTitle.textContent = 'Step 4: Find Optimal Solution';
    stepDescription.textContent = problems[currentProblemType].steps.step4;

    // Update math steps
    if (problems[currentProblemType].mathSteps && problems[currentProblemType].mathSteps.step4) {
        mathStepsContent.textContent = problems[currentProblemType].mathSteps.step4;
    }

    // Show solution summary
    const solutionSummary = document.getElementById('solution-summary');
    const solutionVariables = document.getElementById('solution-variables');
    const solutionObjective = document.getElementById('solution-objective');
    const solutionConstraints = document.getElementById('solution-constraints');

    // Update solution summary
    solutionSummary.classList.remove('hidden');

    // Format variable values
    let variablesHTML = '';
    const variableLabels = problem.variables;
    variablesHTML += `<div>${variableLabels.x1.label}: <span class="font-bold">${problem.solution.x1}</span></div>`;
    variablesHTML += `<div>${variableLabels.x2.label}: <span class="font-bold">${problem.solution.x2}</span></div>`;
    solutionVariables.innerHTML = variablesHTML;

    // Format objective value
    const objectiveType = problem.objective.type;
    const valueLabel = objectiveType === 'maximize' ? 'Maximum' : 'Minimum';
    solutionObjective.innerHTML = `${valueLabel}: <span class="font-bold">$${problem.solution.value}</span>`;

    // Format binding constraints
    if (problem.solution.bindingConstraints) {
        let constraintsHTML = '';
        problem.solution.bindingConstraints.forEach(constraint => {
            constraintsHTML += `<div>${constraint}</div>`;
        });
        solutionConstraints.innerHTML = constraintsHTML;
    } else {
        solutionConstraints.innerHTML = '<div>Not specified</div>';
    }

    // Announce to screen readers
    const valueType = objectiveType === 'maximize' ? 'profit' : 'cost';
    announceToScreenReader(`Step 4: Found the optimal solution with ${valueLabel.toLowerCase()} ${valueType} of $${problem.solution.value}.`);
}

// Reset the formulation visualization
function resetFormulation() {
    currentFormulationStep = 0;

    // Reset production to zero
    const tablesSlider = document.getElementById('tables-slider');
    const chairsSlider = document.getElementById('chairs-slider');

    tablesSlider.value = 0;
    chairsSlider.value = 0;

    tables = 0;
    chairs = 0;
    document.getElementById('tables-value').textContent = '0';
    document.getElementById('chairs-value').textContent = '0';
    updateProduction();

    // Hide visualization elements
    optimalPoint.visible = false;
    objectiveArrow.visible = false;

    // Reset constraint planes
    woodPlane.material.opacity = 0.5;
    finishPlane.material.opacity = 0.5;

    // Hide explanation and solution boxes
    document.getElementById('formulation-explanation').classList.add('hidden');
    document.getElementById('solution-summary').classList.add('hidden');

    // Announce to screen readers
    announceToScreenReader('Reset the formulation visualization.');
}

// Load the selected problem
function loadSelectedProblem() {
    // Get the selected problem type
    const selector = document.getElementById('problem-selector');
    const problemType = selector.value;

    // Update the current problem type
    currentProblemType = problemType;

    // Reset the visualization
    resetFormulation();

    // Update the problem description
    updateProblemDescription(problemType);

    // Announce to screen readers
    announceToScreenReader(`Loaded ${problems[problemType].title} problem. Use the step buttons to walk through the solution.`);
}

// Update the problem description
function updateProblemDescription(problemType) {
    const problem = problems[problemType];
    const descriptionBox = document.getElementById('problem-description');

    // Update the title and description
    descriptionBox.querySelector('h4').textContent = problem.title;
    descriptionBox.querySelector('p').textContent = problem.description;

    // Update the variable labels based on the problem type
    const x1Label = document.querySelector('label[for="tables-slider"]');
    const x2Label = document.querySelector('label[for="chairs-slider"]');

    if (x1Label && x2Label) {
        x1Label.textContent = problem.variables.x1.label + ':';
        x2Label.textContent = problem.variables.x2.label + ':';
    }

    // Update the slider max values based on the problem type
    const tablesSlider = document.getElementById('tables-slider');
    const chairsSlider = document.getElementById('chairs-slider');

    // Set appropriate max values based on the problem
    switch(problemType) {
        case 'furniture':
            tablesSlider.max = 40;
            chairsSlider.max = 40;
            break;
        case 'diet':
            tablesSlider.max = 10;
            chairsSlider.max = 10;
            break;
        case 'investment':
            tablesSlider.max = 10000;
            chairsSlider.max = 10000;
            break;
        case 'production':
            tablesSlider.max = 30;
            chairsSlider.max = 20;
            break;
        default:
            tablesSlider.max = 40;
            chairsSlider.max = 40;
    }

    // Update the max value displays
    document.querySelectorAll('.max-value').forEach(el => {
        if (el.dataset.for === 'tables') {
            el.textContent = 'Max: ' + tablesSlider.max;
        } else if (el.dataset.for === 'chairs') {
            el.textContent = 'Max: ' + chairsSlider.max;
        }
    });
}
