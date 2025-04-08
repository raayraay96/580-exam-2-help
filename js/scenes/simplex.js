/**
 * Three.js scene for the Simplex Method section
 */

// Define the initialization function
function initSimplexScene() {
    // Create base scene
    const { scene, camera, renderer, controls } = createBaseScene('simplex');
    scenes.simplex = scene;
    cameras.simplex = camera;
    renderers.simplex = renderer;
    controls.simplex = controls;

    // Position camera for better view
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);

    // Make sure the renderer is properly sized
    const container = document.getElementById('simplex-canvas');
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Implement the Simplex Method visualization

    // Create a representation of the feasible region (a polyhedron)
    const feasibleGeometry = new THREE.BufferGeometry();

    // Define vertices for a simple polyhedron
    const vertices = new Float32Array([
        // Base (bottom face)
        0, 0, 0,
        4, 0, 0,
        4, 0, 4,
        0, 0, 4,

        // Top vertices
        0, 3, 0,
        3, 3, 0,
        3, 2, 3,
        0, 2, 3
    ]);

    // Define faces using indices
    const indices = [
        // Bottom face
        0, 1, 2,
        0, 2, 3,

        // Side faces
        0, 4, 5,
        0, 5, 1,

        1, 5, 6,
        1, 6, 2,

        2, 6, 7,
        2, 7, 3,

        3, 7, 4,
        3, 4, 0,

        // Top face
        4, 7, 6,
        4, 6, 5
    ];

    feasibleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    feasibleGeometry.setIndex(indices);
    feasibleGeometry.computeVertexNormals();

    const feasibleMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6, // Blue
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });

    const feasibleRegion = new THREE.Mesh(feasibleGeometry, feasibleMaterial);
    feasibleRegion.name = 'feasibleRegion';
    scene.add(feasibleRegion);

    // Create corner points (basic feasible solutions)
    const cornerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const cornerMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981, // Green
        emissive: 0x10b981,
        emissiveIntensity: 0.3
    });

    // Create a sphere for each vertex
    const cornerPoints = [];
    for (let i = 0; i < vertices.length; i += 3) {
        const cornerPoint = new THREE.Mesh(cornerGeometry, cornerMaterial.clone());
        cornerPoint.position.set(vertices[i], vertices[i+1], vertices[i+2]);
        cornerPoint.name = `corner${i/3}`;
        scene.add(cornerPoint);
        cornerPoints.push(cornerPoint);
    }

    // Create current solution indicator
    const currentSolutionGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const currentSolutionMaterial = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.5
    });

    const currentSolution = new THREE.Mesh(currentSolutionGeometry, currentSolutionMaterial);
    currentSolution.position.copy(cornerPoints[0].position);
    currentSolution.name = 'currentSolution';
    scene.add(currentSolution);

    // Create path for simplex movement
    const pathMaterial = new THREE.LineBasicMaterial({
        color: 0xec4899, // Pink
        linewidth: 2
    });

    const pathGeometry = new THREE.BufferGeometry();
    const pathPoints = [cornerPoints[0].position.clone()];
    pathGeometry.setFromPoints(pathPoints);

    const simplexPath = new THREE.Line(pathGeometry, pathMaterial);
    simplexPath.name = 'simplexPath';
    scene.add(simplexPath);

    // Track current step and position in the simplex algorithm
    let currentStep = 0;
    let currentCorner = 0;
    let targetCorner = 0;
    let isAnimating = false;

    // Add custom animation for this scene
    animations.simplex = function() {
        const time = Date.now() * 0.001;

        // Animate the current solution indicator
        if (isAnimating) {
            // Interpolate between corners during animation
            const t = (Math.sin(time * 5) + 1) / 2; // 0 to 1 oscillation
            const startPos = cornerPoints[currentCorner].position;
            const endPos = cornerPoints[targetCorner].position;

            currentSolution.position.lerpVectors(startPos, endPos, t);

            // If we've completed a full oscillation, update the path
            if (t > 0.99) {
                isAnimating = false;
                currentCorner = targetCorner;

                // Update the path
                pathPoints.push(cornerPoints[currentCorner].position.clone());
                pathGeometry.setFromPoints(pathPoints);
            }
        } else {
            // Pulse the current solution when not moving
            const scale = 1 + 0.2 * Math.sin(time * 3);
            currentSolution.scale.set(scale, scale, scale);
        }

        // Subtle rotation of the feasible region for better 3D perception
        feasibleRegion.rotation.y = Math.sin(time * 0.2) * 0.1;

        // Highlight the current corner point
        cornerPoints.forEach((point, index) => {
            if (index === currentCorner) {
                point.material.emissiveIntensity = 0.5 + 0.5 * Math.sin(time * 4);
            } else {
                point.material.emissiveIntensity = 0.3;
            }
        });
    };

    // Add event listeners for buttons
    document.getElementById('find-entering').addEventListener('click', () => {
        // Implement finding entering variable
        document.getElementById('current-status-text').textContent = 'Finding entering variable';
        document.getElementById('simplex-explanation').textContent = 'Looking for the most negative coefficient in the objective row to find the entering variable.';

        // Highlight all corner points to show we're evaluating them
        cornerPoints.forEach(point => {
            gsap.to(point.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        });

        // Update the tableau to show x₁ as entering variable
        const tableauBody = document.getElementById('tableau-body');
        if (tableauBody) {
            const cells = tableauBody.querySelectorAll('tr:last-child td');
            if (cells.length > 1) {
                cells[1].style.backgroundColor = '#bfdbfe'; // Light blue highlight
            }
        }

        currentStep = 1;
    });

    document.getElementById('find-leaving').addEventListener('click', () => {
        // Implement finding leaving variable
        document.getElementById('current-status-text').textContent = 'Finding leaving variable';
        document.getElementById('simplex-explanation').textContent = 'Using the minimum ratio test to determine which variable should leave the basis.';

        // Set target corner for animation
        targetCorner = 1; // Move to the next corner

        // Update the tableau to show s₁ as leaving variable
        const tableauBody = document.getElementById('tableau-body');
        if (tableauBody) {
            const cells = tableauBody.querySelectorAll('tr:first-child td');
            if (cells.length > 0) {
                cells[0].style.backgroundColor = '#fecaca'; // Light red highlight
            }
        }

        currentStep = 2;
    });

    document.getElementById('perform-pivot').addEventListener('click', () => {
        // Implement pivot operation
        document.getElementById('current-status-text').textContent = 'Performing pivot operation';
        document.getElementById('simplex-explanation').textContent = 'Updating the tableau by performing row operations to get a new basic feasible solution.';

        // Animate movement to the next corner
        isAnimating = true;

        // Update the tableau after pivot
        const tableauBody = document.getElementById('tableau-body');
        if (tableauBody) {
            // Reset highlights
            tableauBody.querySelectorAll('td').forEach(cell => {
                cell.style.backgroundColor = '';
            });

            // Update the tableau values
            const rows = tableauBody.querySelectorAll('tr');
            if (rows.length >= 3) {
                // First row (x₁ enters basis)
                const row1Cells = rows[0].querySelectorAll('td');
                if (row1Cells.length >= 6) {
                    row1Cells[0].textContent = 'x₁';
                    row1Cells[1].textContent = '1';
                    row1Cells[2].textContent = '0.5';
                    row1Cells[3].textContent = '0.5';
                    row1Cells[4].textContent = '0';
                    row1Cells[5].textContent = '9';
                }

                // Second row
                const row2Cells = rows[1].querySelectorAll('td');
                if (row2Cells.length >= 6) {
                    row2Cells[1].textContent = '0';
                    row2Cells[2].textContent = '2.5';
                    row2Cells[3].textContent = '-0.5';
                    row2Cells[4].textContent = '1';
                    row2Cells[5].textContent = '6';
                }

                // Objective row
                const row3Cells = rows[2].querySelectorAll('td');
                if (row3Cells.length >= 6) {
                    row3Cells[1].textContent = '0';
                    row3Cells[2].textContent = '-0.5';
                    row3Cells[3].textContent = '1.5';
                    row3Cells[4].textContent = '0';
                    row3Cells[5].textContent = '27';
                }
            }
        }

        currentStep = 3;
    });

    document.getElementById('check-optimality').addEventListener('click', () => {
        // Implement optimality check
        document.getElementById('current-status-text').textContent = 'Checking optimality';
        document.getElementById('simplex-explanation').textContent = 'All coefficients in the objective row are non-negative, which indicates we have found an optimal solution!';

        // Highlight the optimal solution
        gsap.to(currentSolution.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 1,
            yoyo: true,
            repeat: 1
        });

        // Highlight the objective value in the tableau
        const tableauBody = document.getElementById('tableau-body');
        if (tableauBody) {
            const cells = tableauBody.querySelectorAll('tr:last-child td');
            if (cells.length >= 6) {
                cells[5].style.backgroundColor = '#d1fae5'; // Light green highlight
            }
        }

        currentStep = 4;
    });

    document.getElementById('simplex-reset').addEventListener('click', () => {
        // Implement reset
        document.getElementById('current-status-text').textContent = 'Initial tableau';
        document.getElementById('simplex-explanation').textContent = 'Click the buttons above to step through the simplex algorithm. Watch the 3D visualization to see how we move between corner points!';

        // Reset the visualization
        currentCorner = 0;
        targetCorner = 0;
        isAnimating = false;
        currentSolution.position.copy(cornerPoints[0].position);

        // Reset the path
        pathPoints.length = 1;
        pathPoints[0] = cornerPoints[0].position.clone();
        pathGeometry.setFromPoints(pathPoints);

        // Reset the tableau
        const tableauBody = document.getElementById('tableau-body');
        if (tableauBody) {
            // Reset highlights
            tableauBody.querySelectorAll('td').forEach(cell => {
                cell.style.backgroundColor = '';
            });

            // Reset the tableau values
            const rows = tableauBody.querySelectorAll('tr');
            if (rows.length >= 3) {
                // First row
                const row1Cells = rows[0].querySelectorAll('td');
                if (row1Cells.length >= 6) {
                    row1Cells[0].textContent = 's₁';
                    row1Cells[1].textContent = '2';
                    row1Cells[2].textContent = '1';
                    row1Cells[3].textContent = '1';
                    row1Cells[4].textContent = '0';
                    row1Cells[5].textContent = '18';
                }

                // Second row
                const row2Cells = rows[1].querySelectorAll('td');
                if (row2Cells.length >= 6) {
                    row2Cells[0].textContent = 's₂';
                    row2Cells[1].textContent = '1';
                    row2Cells[2].textContent = '3';
                    row2Cells[3].textContent = '0';
                    row2Cells[4].textContent = '1';
                    row2Cells[5].textContent = '15';
                }

                // Objective row
                const row3Cells = rows[2].querySelectorAll('td');
                if (row3Cells.length >= 6) {
                    row3Cells[1].textContent = '-3';
                    row3Cells[2].textContent = '-2';
                    row3Cells[3].textContent = '0';
                    row3Cells[4].textContent = '0';
                    row3Cells[5].textContent = '0';
                }
            }
        }

        currentStep = 0;
    });
}
