/**
 * Three.js scene for the Standard Form section
 */

function initStandardScene() {
    // Create base scene
    const { scene, camera, renderer, controls } = createBaseScene('standard');
    scenes.standard = scene;
    cameras.standard = camera;
    renderers.standard = renderer;
    controls.standard = controls;

    // Position camera for better view
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);

    // Implement the Standard Form visualization

    // Create a 3D representation of the problem transformation
    const originalProblemGeometry = new THREE.BoxGeometry(2, 2, 2);
    const originalProblemMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6, // Blue
        transparent: true,
        opacity: 0.7,
        wireframe: false
    });
    const originalProblem = new THREE.Mesh(originalProblemGeometry, originalProblemMaterial);
    originalProblem.position.set(-3, 0, 0);
    originalProblem.name = 'originalProblem';
    scene.add(originalProblem);

    // Create a representation of the standard form
    const standardFormGeometry = new THREE.BoxGeometry(2, 2, 2);
    const standardFormMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6, // Purple
        transparent: true,
        opacity: 0.7,
        wireframe: false
    });
    const standardForm = new THREE.Mesh(standardFormGeometry, standardFormMaterial);
    standardForm.position.set(3, 0, 0);
    standardForm.name = 'standardForm';
    scene.add(standardForm);

    // Create connecting arrows to show transformation
    const arrowDir = new THREE.Vector3(1, 0, 0).normalize();
    const arrowOrigin = new THREE.Vector3(-2, 0, 0);
    const arrowLength = 4;
    const arrowColor = 0x10b981; // Green

    const transformArrow = new THREE.ArrowHelper(
        arrowDir,
        arrowOrigin,
        arrowLength,
        arrowColor,
        1, // headLength
        0.5 // headWidth
    );
    transformArrow.name = 'transformArrow';
    scene.add(transformArrow);

    // Create slack variables representation
    const slackGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const slackMaterial = new THREE.MeshPhongMaterial({
        color: 0xef4444, // Red
        emissive: 0xef4444,
        emissiveIntensity: 0.3
    });

    const slack1 = new THREE.Mesh(slackGeometry, slackMaterial);
    slack1.position.set(3, 1.5, 1.5);
    slack1.name = 'slack1';
    scene.add(slack1);

    const slack2 = new THREE.Mesh(slackGeometry, slackMaterial);
    slack2.position.set(3, -1.5, 1.5);
    slack2.name = 'slack2';
    scene.add(slack2);

    // Add custom animation for this scene
    animations.standard = function() {
        const time = Date.now() * 0.001;

        // Animate the original problem cube
        originalProblem.rotation.y = time * 0.3;

        // Animate the standard form cube
        standardForm.rotation.y = time * 0.3;

        // Animate the slack variables
        slack1.position.y = 1.5 + 0.2 * Math.sin(time * 2);
        slack2.position.y = -1.5 + 0.2 * Math.sin(time * 2 + Math.PI);

        // Pulse the transformation arrow
        const arrowScale = 1 + 0.1 * Math.sin(time * 3);
        transformArrow.scale.set(1, arrowScale, arrowScale);
    };

    // Add event listeners for buttons
    document.getElementById('show-original').addEventListener('click', () => {
        document.getElementById('original-problem').classList.remove('hidden');
        document.querySelectorAll('[id$="-result"]').forEach(el => el.classList.add('hidden'));
    });

    document.getElementById('convert-inequalities').addEventListener('click', () => {
        document.getElementById('convert-inequalities-result').classList.remove('hidden');
        document.getElementById('original-problem').classList.add('hidden');
        document.getElementById('convert-unrestricted-result').classList.add('hidden');
        document.getElementById('convert-objective-result').classList.add('hidden');
        document.getElementById('final-standard-form-result').classList.add('hidden');
    });

    document.getElementById('convert-unrestricted').addEventListener('click', () => {
        document.getElementById('convert-unrestricted-result').classList.remove('hidden');
        document.getElementById('original-problem').classList.add('hidden');
        document.getElementById('convert-inequalities-result').classList.add('hidden');
        document.getElementById('convert-objective-result').classList.add('hidden');
        document.getElementById('final-standard-form-result').classList.add('hidden');
    });

    document.getElementById('convert-objective').addEventListener('click', () => {
        document.getElementById('convert-objective-result').classList.remove('hidden');
        document.getElementById('original-problem').classList.add('hidden');
        document.getElementById('convert-inequalities-result').classList.add('hidden');
        document.getElementById('convert-unrestricted-result').classList.add('hidden');
        document.getElementById('final-standard-form-result').classList.add('hidden');
    });

    document.getElementById('final-standard-form').addEventListener('click', () => {
        document.getElementById('final-standard-form-result').classList.remove('hidden');
        document.getElementById('original-problem').classList.add('hidden');
        document.getElementById('convert-inequalities-result').classList.add('hidden');
        document.getElementById('convert-unrestricted-result').classList.add('hidden');
        document.getElementById('convert-objective-result').classList.add('hidden');
    });
}
