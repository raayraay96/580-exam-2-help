/**
 * Practice section for exam-style linear programming problems
 */

// Global variables for the practice section
const practiceState = {
    currentProblem: 0,
    userAnswers: {},
    problems: [
        {
            id: 'problem1',
            title: 'Manufacturing Problem',
            description: 'A company manufactures two products: A and B. Each product A requires 2 hours of grinding and 1 hour of polishing. Each product B requires 1 hour of grinding and 3 hours of polishing. The company has 40 hours of grinding time and 60 hours of polishing time available each week. The profit is $50 per unit for product A and $40 per unit for product B. How many units of each product should be manufactured to maximize profit?',
            variables: {
                x1: { name: 'Product A', symbol: 'x₁' },
                x2: { name: 'Product B', symbol: 'x₂' }
            },
            objective: {
                type: 'maximize',
                function: '50x₁ + 40x₂',
                coefficients: [50, 40]
            },
            constraints: [
                { expression: '2x₁ + x₂ ≤ 40', label: 'Grinding time', coefficients: [2, 1], rhs: 40 },
                { expression: 'x₁ + 3x₂ ≤ 60', label: 'Polishing time', coefficients: [1, 3], rhs: 60 }
            ],
            solution: {
                x1: 15,
                x2: 10,
                value: 1150,
                bindingConstraints: ['2x₁ + x₂ = 40', 'x₁ + 3x₂ = 60']
            },
            steps: [
                {
                    title: 'Define Variables',
                    content: 'Let x₁ = number of units of product A to manufacture\nLet x₂ = number of units of product B to manufacture'
                },
                {
                    title: 'Set Objective Function',
                    content: 'Maximize Z = 50x₁ + 40x₂\nwhere 50 is the profit per unit of product A and 40 is the profit per unit of product B'
                },
                {
                    title: 'Identify Constraints',
                    content: 'Grinding constraint: 2x₁ + x₂ ≤ 40\nPolishing constraint: x₁ + 3x₂ ≤ 60\nNon-negativity: x₁ ≥ 0, x₂ ≥ 0'
                },
                {
                    title: 'Find Corner Points',
                    content: 'Corner points of the feasible region:\n(0, 0) - Origin\n(0, 20) - Intersection of x₁ = 0 and x₁ + 3x₂ = 60\n(15, 10) - Intersection of 2x₁ + x₂ = 40 and x₁ + 3x₂ = 60\n(20, 0) - Intersection of 2x₁ + x₂ = 40 and x₂ = 0'
                },
                {
                    title: 'Evaluate Objective Function',
                    content: 'At (0, 0): Z = 50(0) + 40(0) = 0\nAt (0, 20): Z = 50(0) + 40(20) = 800\nAt (15, 10): Z = 50(15) + 40(10) = 750 + 400 = 1150\nAt (20, 0): Z = 50(20) + 40(0) = 1000'
                },
                {
                    title: 'Determine Optimal Solution',
                    content: 'The maximum value of Z is 1150 at the point (15, 10).\nTherefore, the company should manufacture 15 units of product A and 10 units of product B to maximize profit.'
                }
            ]
        },
        {
            id: 'problem2',
            title: 'Diet Problem',
            description: 'A dietitian is planning a meal that includes two foods. Food 1 contains 2 units of protein, 3 units of carbohydrates, and 1 unit of fat per serving. Food 2 contains 3 units of protein, 1 unit of carbohydrates, and 2 units of fat per serving. The meal must contain at least 12 units of protein, 9 units of carbohydrates, and 8 units of fat. Food 1 costs $2 per serving and Food 2 costs $3 per serving. How many servings of each food should be included to minimize cost?',
            variables: {
                x1: { name: 'Food 1', symbol: 'x₁' },
                x2: { name: 'Food 2', symbol: 'x₂' }
            },
            objective: {
                type: 'minimize',
                function: '2x₁ + 3x₂',
                coefficients: [2, 3]
            },
            constraints: [
                { expression: '2x₁ + 3x₂ ≥ 12', label: 'Protein', coefficients: [2, 3], rhs: 12 },
                { expression: '3x₁ + x₂ ≥ 9', label: 'Carbohydrates', coefficients: [3, 1], rhs: 9 },
                { expression: 'x₁ + 2x₂ ≥ 8', label: 'Fat', coefficients: [1, 2], rhs: 8 }
            ],
            solution: {
                x1: 2,
                x2: 3,
                value: 13,
                bindingConstraints: ['2x₁ + 3x₂ = 12', '3x₁ + x₂ = 9']
            },
            steps: [
                {
                    title: 'Define Variables',
                    content: 'Let x₁ = number of servings of Food 1\nLet x₂ = number of servings of Food 2'
                },
                {
                    title: 'Set Objective Function',
                    content: 'Minimize Z = 2x₁ + 3x₂\nwhere 2 is the cost per serving of Food 1 and 3 is the cost per serving of Food 2'
                },
                {
                    title: 'Identify Constraints',
                    content: 'Protein constraint: 2x₁ + 3x₂ ≥ 12\nCarbohydrates constraint: 3x₁ + x₂ ≥ 9\nFat constraint: x₁ + 2x₂ ≥ 8\nNon-negativity: x₁ ≥ 0, x₂ ≥ 0'
                },
                {
                    title: 'Find Corner Points',
                    content: 'Corner points of the feasible region:\n(0, 4) - Intersection of x₁ = 0 and 2x₁ + 3x₂ = 12\n(0, 9) - Intersection of x₁ = 0 and 3x₁ + x₂ = 9\n(2, 3) - Intersection of 2x₁ + 3x₂ = 12 and 3x₁ + x₂ = 9\n(3, 2) - Intersection of 3x₁ + x₂ = 9 and x₁ + 2x₂ = 8\n(8, 0) - Intersection of x₁ + 2x₂ = 8 and x₂ = 0'
                },
                {
                    title: 'Evaluate Objective Function',
                    content: 'At (0, 4): Z = 2(0) + 3(4) = 12\nAt (0, 9): Z = 2(0) + 3(9) = 27\nAt (2, 3): Z = 2(2) + 3(3) = 4 + 9 = 13\nAt (3, 2): Z = 2(3) + 3(2) = 6 + 6 = 12\nAt (8, 0): Z = 2(8) + 3(0) = 16'
                },
                {
                    title: 'Determine Optimal Solution',
                    content: 'The minimum value of Z is 12 at the point (0, 4) or (3, 2).\nBoth solutions are optimal. The dietitian could choose either:\n- 0 servings of Food 1 and 4 servings of Food 2, or\n- 3 servings of Food 1 and 2 servings of Food 2\nBoth options cost $12.'
                }
            ]
        },
        {
            id: 'problem3',
            title: 'Investment Problem',
            description: 'An investor has $10,000 to invest in two types of investments. Investment A has an expected annual return of 5% with a risk factor of 2. Investment B has an expected annual return of 8% with a risk factor of 5. The investor wants to achieve an annual return of at least $600 while keeping the average risk factor below 4. How much should be allocated to each investment to maximize return?',
            variables: {
                x1: { name: 'Investment A', symbol: 'x₁' },
                x2: { name: 'Investment B', symbol: 'x₂' }
            },
            objective: {
                type: 'maximize',
                function: '0.05x₁ + 0.08x₂',
                coefficients: [0.05, 0.08]
            },
            constraints: [
                { expression: 'x₁ + x₂ ≤ 10000', label: 'Total investment', coefficients: [1, 1], rhs: 10000 },
                { expression: '2x₁ + 5x₂ ≤ 40000', label: 'Risk constraint', coefficients: [2, 5], rhs: 40000 },
                { expression: '0.05x₁ + 0.08x₂ ≥ 600', label: 'Minimum return', coefficients: [0.05, 0.08], rhs: 600 }
            ],
            solution: {
                x1: 0,
                x2: 7500,
                value: 600,
                bindingConstraints: ['x₁ + x₂ = 10000', '0.05x₁ + 0.08x₂ = 600']
            },
            steps: [
                {
                    title: 'Define Variables',
                    content: 'Let x₁ = amount invested in Investment A\nLet x₂ = amount invested in Investment B'
                },
                {
                    title: 'Set Objective Function',
                    content: 'Maximize Z = 0.05x₁ + 0.08x₂\nwhere 0.05 is the return rate for Investment A and 0.08 is the return rate for Investment B'
                },
                {
                    title: 'Identify Constraints',
                    content: 'Budget constraint: x₁ + x₂ ≤ 10000\nRisk constraint: 2x₁ + 5x₂ ≤ 40000\nReturn constraint: 0.05x₁ + 0.08x₂ ≥ 600\nNon-negativity: x₁ ≥ 0, x₂ ≥ 0'
                },
                {
                    title: 'Find Corner Points',
                    content: 'Corner points of the feasible region:\n(0, 7500) - Intersection of x₁ = 0 and 0.05x₁ + 0.08x₂ = 600\n(0, 8000) - Intersection of x₁ = 0 and 2x₁ + 5x₂ = 40000\n(5000, 5000) - Intersection of 2x₁ + 5x₂ = 40000 and x₁ + x₂ = 10000\n(10000, 0) - Intersection of x₁ + x₂ = 10000 and x₂ = 0'
                },
                {
                    title: 'Evaluate Objective Function',
                    content: 'At (0, 7500): Z = 0.05(0) + 0.08(7500) = 600\nAt (0, 8000): Z = 0.05(0) + 0.08(8000) = 640\nAt (5000, 5000): Z = 0.05(5000) + 0.08(5000) = 250 + 400 = 650\nAt (10000, 0): Z = 0.05(10000) + 0.08(0) = 500'
                },
                {
                    title: 'Determine Optimal Solution',
                    content: 'The maximum value of Z is 650 at the point (5000, 5000).\nTherefore, the investor should allocate $5000 to Investment A and $5000 to Investment B to maximize return.'
                }
            ]
        }
    ]
};

// Initialize the practice section
function initPracticeSection() {
    // Set up event listeners for the practice section
    document.getElementById('practice-problem-selector').addEventListener('change', loadSelectedProblem);
    document.getElementById('practice-show-step').addEventListener('click', showNextStep);
    document.getElementById('practice-reset').addEventListener('click', resetPractice);
    document.getElementById('practice-check-answer').addEventListener('click', checkAnswer);
    document.getElementById('practice-show-solution').addEventListener('click', showSolution);

    // Load the first problem by default
    loadProblem(0);
}

// Load a specific problem
function loadProblem(problemIndex) {
    // Reset the current state
    resetPractice();

    // Update the current problem index
    practiceState.currentProblem = problemIndex;
    const problem = practiceState.problems[problemIndex];

    // Update the problem title
    document.getElementById('practice-problem-title').textContent = problem.title;

    // Update the problem description with highlighted important information
    const descriptionElement = document.getElementById('practice-problem-description');

    // Create a highlighted version of the description
    let highlightedDescription = problem.description;

    // Highlight numbers and key phrases
    highlightedDescription = highlightedDescription
        // Highlight numbers
        .replace(/(\d+)\s+(hour|unit|\$)/g, '<span class="font-bold text-indigo-700">$1</span> $2')
        // Highlight dollar amounts
        .replace(/(\$\d+)/g, '<span class="font-bold text-green-700">$1</span>')
        // Highlight products/items
        .replace(/(product\s+[A-Z]|[Pp]roduct\s+\d+|[Ff]ood\s+\d+|[Ii]nvestment\s+[A-Z])/g, '<span class="font-bold text-blue-700">$1</span>')
        // Highlight key action words
        .replace(/([Mm]aximize|[Mm]inimize|[Mm]anufacture|[Aa]vailable|[Rr]equires)/g, '<span class="font-bold text-purple-700">$1</span>');

    descriptionElement.innerHTML = highlightedDescription;

    // Populate the Given/Find table
    const givenElement = document.getElementById('practice-given');
    const findElement = document.getElementById('practice-find');

    // Create the Given content based on problem type
    let givenContent = '<ul class="list-disc pl-5 space-y-1">';

    // Add resource constraints
    problem.constraints.forEach(constraint => {
        givenContent += `<li>${constraint.label}: ${constraint.rhs} units</li>`;
    });

    // Add profit/cost per unit
    if (problem.objective.type === 'maximize') {
        givenContent += `<li>Profit: ${problem.objective.coefficients[0]} per unit of ${problem.variables.x1.name}, ${problem.objective.coefficients[1]} per unit of ${problem.variables.x2.name}</li>`;
    } else {
        givenContent += `<li>Cost: ${problem.objective.coefficients[0]} per unit of ${problem.variables.x1.name}, ${problem.objective.coefficients[1]} per unit of ${problem.variables.x2.name}</li>`;
    }

    givenContent += '</ul>';
    givenElement.innerHTML = givenContent;

    // Create the Find content
    let findContent = '<ul class="list-disc pl-5 space-y-1">';
    findContent += `<li>How many units of ${problem.variables.x1.name} (x₁)?</li>`;
    findContent += `<li>How many units of ${problem.variables.x2.name} (x₂)?</li>`;
    findContent += `<li>${problem.objective.type === 'maximize' ? 'Maximum' : 'Minimum'} value of Z?</li>`;
    findContent += '</ul>';
    findElement.innerHTML = findContent;

    // Update the variables section
    const variablesContent = document.getElementById('practice-variables-content');
    variablesContent.innerHTML = '';
    Object.values(problem.variables).forEach(variable => {
        const variableDiv = document.createElement('div');
        variableDiv.className = 'mb-2';
        variableDiv.innerHTML = `${variable.symbol} = ${variable.name}`;
        variablesContent.appendChild(variableDiv);
    });

    // Update the objective function section
    const objectiveContent = document.getElementById('practice-objective-content');
    objectiveContent.innerHTML = `${problem.objective.type === 'maximize' ? 'Maximize' : 'Minimize'} Z = ${problem.objective.function}`;

    // Update the constraints section
    const constraintsContent = document.getElementById('practice-constraints-content');
    constraintsContent.innerHTML = '';
    problem.constraints.forEach(constraint => {
        const constraintDiv = document.createElement('div');
        constraintDiv.className = 'mb-2';
        constraintDiv.innerHTML = `${constraint.expression} (${constraint.label})`;
        constraintsContent.appendChild(constraintDiv);
    });
    constraintsContent.innerHTML += '<div class="mb-2">x₁ ≥ 0, x₂ ≥ 0 (Non-negativity)</div>';

    // Reset the solution steps
    document.getElementById('practice-steps-container').innerHTML = '';
    document.getElementById('practice-solution-container').classList.add('hidden');

    // Show the problem formulation
    document.getElementById('practice-problem-container').classList.remove('hidden');
}

// Load the selected problem from the dropdown
function loadSelectedProblem() {
    const selector = document.getElementById('practice-problem-selector');
    const problemIndex = parseInt(selector.value);
    loadProblem(problemIndex);
}

// Show the next solution step
function showNextStep() {
    const problem = practiceState.problems[practiceState.currentProblem];
    const stepsContainer = document.getElementById('practice-steps-container');
    const currentStepCount = stepsContainer.children.length;

    // Check if we have more steps to show
    if (currentStepCount < problem.steps.length) {
        const step = problem.steps[currentStepCount];

        // Create a new step element with a color based on the step number
        const stepElement = document.createElement('div');

        // Choose a different color for each step
        let stepColor;
        switch(currentStepCount) {
            case 0: stepColor = 'blue'; break;
            case 1: stepColor = 'green'; break;
            case 2: stepColor = 'yellow'; break;
            case 3: stepColor = 'purple'; break;
            case 4: stepColor = 'pink'; break;
            default: stepColor = 'indigo';
        }

        stepElement.className = `mb-4 p-4 bg-${stepColor}-50 rounded-lg border-l-4 border-${stepColor}-500`;

        // Add step number and title
        const stepHeader = document.createElement('h4');
        stepHeader.className = `font-bold text-lg mb-3 flex items-center text-${stepColor}-800`;
        stepHeader.innerHTML = `<span class="bg-${stepColor}-100 text-${stepColor}-800 rounded-full w-7 h-7 flex items-center justify-center mr-2 font-bold">${currentStepCount + 1}</span> ${step.title}`;
        stepElement.appendChild(stepHeader);

        // Add initial step prompt (not the full solution yet)
        const stepPrompt = document.createElement('div');
        stepPrompt.className = 'mb-4 font-medium';

        // Create different prompts based on the step
        let promptText = '';
        let choices = [];

        switch(currentStepCount) {
            case 0: // Define Variables
                promptText = 'Step 1: Define the decision variables for this problem.';
                choices = [
                    {
                        text: `Let x₁ = ${problem.variables.x1.name} and x₂ = ${problem.variables.x2.name}`,
                        correct: true,
                        explanation: 'Correct! These are the quantities we need to determine. On an exam, you would write this definition at the beginning of your solution.'
                    },
                    {
                        text: `Let x₁ = profit from ${problem.variables.x1.name} and x₂ = profit from ${problem.variables.x2.name}`,
                        correct: false,
                        explanation: 'Not quite. The decision variables should represent the quantities we can control, not the profit. This is a common mistake on exams.'
                    }
                ];
                break;

            case 1: // Set Objective Function
                promptText = 'Step 2: Formulate the objective function based on the problem description.';

                // Get coefficients for clearer explanation
                const coef1 = problem.objective.coefficients[0];
                const coef2 = problem.objective.coefficients[1];

                choices = [
                    {
                        text: `${problem.objective.type === 'maximize' ? 'Maximize' : 'Minimize'} Z = ${problem.objective.function}`,
                        correct: true,
                        explanation: `Correct! We ${problem.objective.type} Z = ${coef1}x₁ + ${coef2}x₂ because each unit of ${problem.variables.x1.name} contributes $${coef1} and each unit of ${problem.variables.x2.name} contributes $${coef2} to the ${problem.objective.type === 'maximize' ? 'profit' : 'cost'}.`
                    },
                    {
                        text: `${problem.objective.type === 'maximize' ? 'Minimize' : 'Maximize'} Z = ${problem.objective.function}`,
                        correct: false,
                        explanation: `Not quite. We need to ${problem.objective.type} (not ${problem.objective.type === 'maximize' ? 'minimize' : 'maximize'}) the objective function based on the problem description.`
                    }
                ];
                break;

            case 2: // Identify Constraints
                promptText = 'Step 3: Identify the constraints that limit our decision variables.';

                // Get constraint details for better explanation
                const constraint = problem.constraints[0];
                const parts = constraint.expression.split(' ');
                const lhs = parts[0]; // Left-hand side of constraint
                const inequality = parts[1]; // Inequality symbol
                const rhs = parts[2]; // Right-hand side value

                choices = [
                    {
                        text: `${constraint.expression} (${constraint.label})`,
                        correct: true,
                        explanation: `Correct! This constraint represents the ${constraint.label} limitation. The left side (${lhs}) represents the total ${constraint.label.toLowerCase()} used/required, which must be ${inequality === '≤' ? 'less than or equal to' : 'greater than or equal to'} ${rhs}.`
                    },
                    {
                        text: `${lhs} ${inequality === '≤' ? '≥' : '≤'} ${rhs} (${constraint.label})`,
                        correct: false,
                        explanation: `Not quite. The inequality direction is incorrect. For this ${constraint.label.toLowerCase()} constraint, we need ${lhs} ${inequality} ${rhs}.`
                    }
                ];
                break;

            case 3: // Find Corner Points
                promptText = 'Step 4: Find the corner points by solving the systems of equations.';

                // Create a more detailed explanation with the math steps
                let cornerPointsExplanation = '';
                if (problem.constraints.length >= 2) {
                    const c1 = problem.constraints[0];
                    const c2 = problem.constraints[1];

                    // Extract coefficients for clearer math
                    const c1Parts = c1.expression.split(' ');
                    const c2Parts = c2.expression.split(' ');

                    // Convert inequality to equality for corner point calculation
                    const c1Eq = c1Parts[0] + ' = ' + c1Parts[2];
                    const c2Eq = c2Parts[0] + ' = ' + c2Parts[2];

                    cornerPointsExplanation = `To find this corner point, we solve the system of equations:\n${c1Eq}\n${c2Eq}\n\nThis gives us the point (${problem.solution.x1}, ${problem.solution.x2}).`;
                }

                // Create a fake corner point with explanation
                const fakePoint = {
                    x1: problem.solution.x1 > 5 ? 0 : problem.solution.x1 + 5,
                    x2: problem.solution.x2 > 5 ? 0 : problem.solution.x2 + 5
                };

                choices = [
                    {
                        text: `Corner point at (${problem.solution.x1}, ${problem.solution.x2})`,
                        correct: true,
                        explanation: `Correct! ${cornerPointsExplanation}`
                    },
                    {
                        text: `Corner point at (${fakePoint.x1}, ${fakePoint.x2})`,
                        correct: false,
                        explanation: `Not quite. This point either doesn't satisfy all constraints or isn't at the intersection of two constraint boundaries. You need to solve the system of equations correctly.`
                    }
                ];
                break;

            case 4: // Evaluate Objective Function
                promptText = `Step 5: Evaluate the objective function at the corner point (${problem.solution.x1}, ${problem.solution.x2}).`;

                // Get coefficients for showing the calculation
                const objCoef1 = problem.objective.coefficients[0];
                const objCoef2 = problem.objective.coefficients[1];

                // Calculate the components for a clearer explanation
                const component1 = objCoef1 * problem.solution.x1;
                const component2 = objCoef2 * problem.solution.x2;

                choices = [
                    {
                        text: `Z = ${objCoef1}(${problem.solution.x1}) + ${objCoef2}(${problem.solution.x2}) = ${component1} + ${component2} = ${problem.solution.value}`,
                        correct: true,
                        explanation: `Correct! We substitute the values into the objective function:\nZ = ${objCoef1}x₁ + ${objCoef2}x₂\nZ = ${objCoef1}(${problem.solution.x1}) + ${objCoef2}(${problem.solution.x2})\nZ = ${component1} + ${component2}\nZ = ${problem.solution.value}`
                    },
                    {
                        text: `Z = ${objCoef1}(${problem.solution.x1}) + ${objCoef2}(${problem.solution.x2}) = ${component1 - 10} + ${component2 + 5} = ${problem.solution.value - 5}`,
                        correct: false,
                        explanation: `Not quite. Let's calculate this step-by-step:\nZ = ${objCoef1}x₁ + ${objCoef2}x₂\nZ = ${objCoef1}(${problem.solution.x1}) + ${objCoef2}(${problem.solution.x2})\nZ = ${component1} + ${component2}\nZ = ${problem.solution.value}`
                    }
                ];
                break;

            case 5: // Determine Optimal Solution
                promptText = 'Step 6: Identify the binding constraints and state the final answer.';

                // Create detailed explanation with binding constraints
                let bindingExplanation = '';
                if (problem.solution.bindingConstraints && problem.solution.bindingConstraints.length > 0) {
                    bindingExplanation = `The binding constraints at the optimal solution (${problem.solution.x1}, ${problem.solution.x2}) are:\n${problem.solution.bindingConstraints.join('\n')}\n\nThese constraints are binding because the solution point lies exactly on these constraint boundaries.`;

                    choices = [
                        {
                            text: `The optimal solution is at (${problem.solution.x1}, ${problem.solution.x2}) with ${problem.objective.type === 'maximize' ? 'maximum' : 'minimum'} value Z = ${problem.solution.value}. The binding constraints are ${problem.solution.bindingConstraints.join(' and ')}.`,
                            correct: true,
                            explanation: `Correct! ${bindingExplanation}\n\nOn an exam, you would write this as your final answer, clearly stating the values of the decision variables and the optimal objective value.`
                        },
                        {
                            text: `The optimal solution is at (${problem.solution.x1}, ${problem.solution.x2}) with ${problem.objective.type === 'maximize' ? 'maximum' : 'minimum'} value Z = ${problem.solution.value}. No constraints are binding.`,
                            correct: false,
                            explanation: `Not quite. At the optimal solution in a linear programming problem, at least one constraint must be binding (active).\n\n${bindingExplanation}`
                        }
                    ];
                } else {
                    choices = [
                        {
                            text: `The optimal solution is at (${problem.solution.x1}, ${problem.solution.x2}) with ${problem.objective.type === 'maximize' ? 'maximum' : 'minimum'} value Z = ${problem.solution.value}.`,
                            correct: true,
                            explanation: `Correct! This is the optimal solution. On an exam, you would clearly state the values of the decision variables and the optimal objective value.`
                        },
                        {
                            text: `The optimal solution is at (${problem.solution.x1/2}, ${problem.solution.x2*2}) with ${problem.objective.type === 'maximize' ? 'maximum' : 'minimum'} value Z = ${problem.solution.value - 50}.`,
                            correct: false,
                            explanation: `Not quite. The correct optimal solution is at (${problem.solution.x1}, ${problem.solution.x2}) with ${problem.objective.type === 'maximize' ? 'maximum' : 'minimum'} value Z = ${problem.solution.value}.`
                        }
                    ];
                }
                break;

            default:
                promptText = 'Consider the following:';
        }

        stepPrompt.textContent = promptText;
        stepElement.appendChild(stepPrompt);

        // Add choices
        if (choices.length > 0) {
            const choicesContainer = document.createElement('div');
            choicesContainer.className = 'space-y-3 mb-4';

            choices.forEach((choice, index) => {
                const choiceButton = document.createElement('button');
                choiceButton.className = 'w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors';
                choiceButton.textContent = choice.text;

                // Add click event to handle choice selection
                choiceButton.addEventListener('click', () => {
                    // Disable all choice buttons
                    choicesContainer.querySelectorAll('button').forEach(btn => {
                        btn.disabled = true;
                        btn.classList.add('opacity-50');
                    });

                    // Highlight the selected choice
                    if (choice.correct) {
                        choiceButton.classList.remove('border');
                        choiceButton.classList.add('border-2', 'border-green-500', 'bg-green-50');
                    } else {
                        choiceButton.classList.remove('border');
                        choiceButton.classList.add('border-2', 'border-red-500', 'bg-red-50');
                    }

                    // Show feedback
                    const feedbackElement = document.createElement('div');
                    feedbackElement.className = choice.correct ?
                        'mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500' :
                        'mt-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500';

                    feedbackElement.innerHTML = `<div class="flex items-start">
                        <i class="${choice.correct ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'} mr-2 mt-1"></i>
                        <div>${choice.explanation}</div>
                    </div>`;

                    choicesContainer.appendChild(feedbackElement);

                    // Show the full step content after a short delay
                    setTimeout(() => {
                        // Add step content
                        const stepContent = document.createElement('div');
                        stepContent.className = 'whitespace-pre-wrap font-mono text-base mt-4 p-3 bg-white rounded-lg border border-gray-200';
                        stepContent.textContent = step.content;

                        const contentHeader = document.createElement('h5');
                        contentHeader.className = 'font-bold mb-2';
                        contentHeader.textContent = 'Complete Solution:';

                        const contentWrapper = document.createElement('div');
                        contentWrapper.className = 'mt-4';
                        contentWrapper.appendChild(contentHeader);
                        contentWrapper.appendChild(stepContent);

                        stepElement.appendChild(contentWrapper);

                        // Add a "Try it yourself" prompt after showing the solution
                        if (currentStepCount < 4) { // Don't add for the final steps
                            const tryItSection = document.createElement('div');
                            tryItSection.className = 'mt-3 p-3 bg-indigo-50 rounded-lg';

                            let tryItPrompt = '';
                            switch(currentStepCount) {
                                case 0: // Variables
                                    tryItPrompt = 'Now try applying this to a similar problem. For example, if this were a transportation problem, what would your variables represent?';
                                    break;
                                case 1: // Objective
                                    tryItPrompt = 'Practice writing the objective function for a different scenario. What if the coefficients were different?';
                                    break;
                                case 2: // Constraints
                                    tryItPrompt = 'Try identifying constraints for a similar problem. What if there were additional resource limitations?';
                                    break;
                                case 3: // Corner points
                                    tryItPrompt = 'Practice finding corner points for other constraint combinations. What if one constraint were changed?';
                                    break;
                            }

                            tryItSection.innerHTML = `<div class="flex items-center mb-2">
                                <i class="fas fa-pencil-alt text-indigo-600 mr-2"></i>
                                <span class="font-bold text-indigo-800">Try it yourself:</span>
                            </div>
                            <p>${tryItPrompt}</p>`;

                            stepElement.appendChild(tryItSection);
                        }

                        // If this was the last step, show the final answer
                        if (currentStepCount === problem.steps.length - 1) {
                            showFinalAnswer();
                        }
                    }, 1000);
                });

                choicesContainer.appendChild(choiceButton);
            });

            stepElement.appendChild(choicesContainer);
        } else {
            // If no choices, just show the content
            const stepContent = document.createElement('div');
            stepContent.className = 'whitespace-pre-wrap font-mono text-base bg-white p-3 rounded-lg border border-gray-200';
            stepContent.textContent = step.content;
            stepElement.appendChild(stepContent);

            // If this was the last step, show the final answer
            if (currentStepCount === problem.steps.length - 1) {
                showFinalAnswer();
            }
        }

        // Add the step to the container
        stepsContainer.appendChild(stepElement);

        // Scroll to the new step
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Show the solution container if it was hidden
        document.getElementById('practice-solution-container').classList.remove('hidden');
    }
}

// Show the final answer
function showFinalAnswer() {
    const problem = practiceState.problems[practiceState.currentProblem];

    // Create the final answer element
    const finalAnswerElement = document.createElement('div');
    finalAnswerElement.className = 'mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500';

    // Add the title
    const finalAnswerTitle = document.createElement('h4');
    finalAnswerTitle.className = 'font-bold text-lg mb-2 flex items-center';
    finalAnswerTitle.innerHTML = '<i class="fas fa-check-circle text-green-500 mr-2"></i> Final Answer';
    finalAnswerElement.appendChild(finalAnswerTitle);

    // Add the answer content
    const finalAnswerContent = document.createElement('div');
    finalAnswerContent.className = 'grid grid-cols-2 gap-2 mb-3';

    // Add variable values
    const variablesDiv = document.createElement('div');
    variablesDiv.className = 'bg-white p-2 rounded border border-green-200';
    variablesDiv.innerHTML = `<span class="font-medium">Variables:</span>
        <div class="mt-1">
            ${problem.variables.x1.symbol} = ${problem.solution.x1}
            <br>
            ${problem.variables.x2.symbol} = ${problem.solution.x2}
        </div>`;
    finalAnswerContent.appendChild(variablesDiv);

    // Add objective value
    const objectiveDiv = document.createElement('div');
    objectiveDiv.className = 'bg-white p-2 rounded border border-green-200';
    objectiveDiv.innerHTML = `<span class="font-medium">Objective Value:</span>
        <div class="mt-1 font-bold text-green-700">
            Z = ${problem.solution.value}
        </div>`;
    finalAnswerContent.appendChild(objectiveDiv);

    // Add binding constraints
    if (problem.solution.bindingConstraints) {
        const constraintsDiv = document.createElement('div');
        constraintsDiv.className = 'bg-white p-2 rounded border border-green-200 col-span-2';
        constraintsDiv.innerHTML = `<span class="font-medium">Binding Constraints:</span>
            <div class="mt-1">
                ${problem.solution.bindingConstraints.join('<br>')}
            </div>`;
        finalAnswerContent.appendChild(constraintsDiv);
    }

    finalAnswerElement.appendChild(finalAnswerContent);

    // Add the final answer to the steps container
    document.getElementById('practice-steps-container').appendChild(finalAnswerElement);

    // Disable the "Show Next Step" button
    document.getElementById('practice-show-step').disabled = true;
}

// Reset the practice section
function resetPractice() {
    // Clear the steps container
    document.getElementById('practice-steps-container').innerHTML = '';

    // Hide the solution container
    document.getElementById('practice-solution-container').classList.add('hidden');

    // Enable the "Show Next Step" button
    document.getElementById('practice-show-step').disabled = false;

    // Clear user answers
    document.getElementById('practice-x1-answer').value = '';
    document.getElementById('practice-x2-answer').value = '';
    document.getElementById('practice-z-answer').value = '';

    // Hide the answer feedback
    document.getElementById('practice-answer-feedback').classList.add('hidden');
}

// Check the user's answer
function checkAnswer() {
    const problem = practiceState.problems[practiceState.currentProblem];
    const x1Answer = parseFloat(document.getElementById('practice-x1-answer').value);
    const x2Answer = parseFloat(document.getElementById('practice-x2-answer').value);
    const zAnswer = parseFloat(document.getElementById('practice-z-answer').value);

    // Check if the answers are valid numbers
    if (isNaN(x1Answer) || isNaN(x2Answer) || isNaN(zAnswer)) {
        showAnswerFeedback(false, 'Please enter valid numbers for all fields.');
        return;
    }

    // Check if the answers are correct
    const x1Correct = Math.abs(x1Answer - problem.solution.x1) < 0.01;
    const x2Correct = Math.abs(x2Answer - problem.solution.x2) < 0.01;
    const zCorrect = Math.abs(zAnswer - problem.solution.value) < 0.01;

    if (x1Correct && x2Correct && zCorrect) {
        showAnswerFeedback(true, 'Correct! Your answer matches the optimal solution.');
    } else {
        // Create detailed feedback with explanation
        let feedback = '<div class="mb-3">Your answer is not correct.</div>';

        // Add a table showing the comparison between user's answer and correct answer
        feedback += '<div class="overflow-x-auto mb-4"><table class="w-full border-collapse">';
        feedback += '<thead class="bg-red-100"><tr><th class="p-2 border border-red-300 text-left">Variable</th><th class="p-2 border border-red-300 text-left">Your Answer</th><th class="p-2 border border-red-300 text-left">Correct Answer</th></tr></thead>';
        feedback += '<tbody>';

        // Add row for x1
        feedback += `<tr class="${x1Correct ? 'bg-green-50' : 'bg-red-50'}"><td class="p-2 border border-red-300 font-medium">${problem.variables.x1.symbol} (${problem.variables.x1.name})</td><td class="p-2 border border-red-300">${x1Answer}</td><td class="p-2 border border-red-300 font-bold">${problem.solution.x1}</td></tr>`;

        // Add row for x2
        feedback += `<tr class="${x2Correct ? 'bg-green-50' : 'bg-red-50'}"><td class="p-2 border border-red-300 font-medium">${problem.variables.x2.symbol} (${problem.variables.x2.name})</td><td class="p-2 border border-red-300">${x2Answer}</td><td class="p-2 border border-red-300 font-bold">${problem.solution.x2}</td></tr>`;

        // Add row for Z
        feedback += `<tr class="${zCorrect ? 'bg-green-50' : 'bg-red-50'}"><td class="p-2 border border-red-300 font-medium">Z (Objective Value)</td><td class="p-2 border border-red-300">${zAnswer}</td><td class="p-2 border border-red-300 font-bold">${problem.solution.value}</td></tr>`;

        feedback += '</tbody></table></div>';

        // Add explanation section
        feedback += '<div class="mt-4">';
        feedback += '<h4 class="font-bold mb-2">Where to focus:</h4>';
        feedback += '<ul class="list-disc pl-5 space-y-2">';

        // Add specific guidance based on which parts are incorrect
        if (!x1Correct || !x2Correct) {
            feedback += '<li>Check your <strong>corner points</strong>. Make sure you\'ve correctly identified all feasible points where constraints intersect.</li>';
            feedback += '<li>Verify your <strong>constraint equations</strong>. Double-check that you\'ve set up the equations correctly and solved the system accurately.</li>';
        }

        if (!zCorrect) {
            feedback += '<li>Review your <strong>objective function calculation</strong>. Make sure you\'ve substituted the correct values into the objective function.</li>';
            feedback += '<li>Ensure you\'ve evaluated the objective function at <strong>all corner points</strong> to find the true maximum/minimum.</li>';
        }

        feedback += '</ul>';
        feedback += '</div>';

        // Add a hint for the specific problem type
        feedback += '<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">';
        feedback += '<h4 class="font-bold mb-2">Hint:</h4>';

        switch(practiceState.currentProblem) {
            case 0: // Manufacturing Problem
                feedback += '<p>For manufacturing problems, remember to check where the resource constraints intersect. The optimal solution is often at the intersection of two binding constraints.</p>';
                break;
            case 1: // Diet Problem
                feedback += '<p>For diet problems, pay special attention to the nutritional requirement constraints. The optimal solution is typically at the intersection of two or more of these constraints.</p>';
                break;
            case 2: // Investment Problem
                feedback += '<p>For investment problems, carefully analyze the risk and return constraints. The optimal solution often lies at the boundary of the feasible region where the return is maximized.</p>';
                break;
        }

        feedback += '</div>';

        // Add a suggestion to use the step-by-step solution
        feedback += '<div class="mt-4">';
        feedback += '<p class="font-medium">Need more help? Click the "Show Next Step" button below to see a detailed step-by-step solution.</p>';
        feedback += '</div>';

        showAnswerFeedback(false, feedback);

        // Always show the solution container to help the student
        document.getElementById('practice-solution-container').classList.remove('hidden');
    }
}

// Show feedback for the user's answer
function showAnswerFeedback(isCorrect, message) {
    const feedbackElement = document.getElementById('practice-answer-feedback');
    feedbackElement.classList.remove('hidden', 'bg-green-50', 'border-green-500', 'bg-red-50', 'border-red-500');

    if (isCorrect) {
        feedbackElement.classList.add('bg-green-50', 'border-green-500');
        feedbackElement.innerHTML = `<div class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i><div>${message}</div></div>`;
    } else {
        feedbackElement.classList.add('bg-red-50', 'border-red-500');
        // Make the feedback box larger for detailed feedback
        feedbackElement.classList.add('p-4');
        feedbackElement.innerHTML = `<div class="flex items-start"><i class="fas fa-times-circle text-red-500 mr-2 mt-1"></i><div>${message}</div></div>`;
    }

    // Scroll to the feedback element
    feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show the solution directly
function showSolution() {
    // Show the solution container
    document.getElementById('practice-solution-container').classList.remove('hidden');

    // Scroll to the solution container
    document.getElementById('practice-solution-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // If there are no steps shown yet, show the first step
    const stepsContainer = document.getElementById('practice-steps-container');
    if (stepsContainer.children.length === 0) {
        showNextStep();
    }
}

// Export the initialization function
window.initPracticeSection = initPracticeSection;
