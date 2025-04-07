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
    
    // Update the problem description
    document.getElementById('practice-problem-title').textContent = problem.title;
    document.getElementById('practice-problem-description').textContent = problem.description;
    
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
        
        // Create a new step element
        const stepElement = document.createElement('div');
        stepElement.className = 'mb-4 p-4 bg-white rounded-lg border border-gray-200';
        
        // Add step number and title
        const stepHeader = document.createElement('h4');
        stepHeader.className = 'font-bold text-lg mb-2 flex items-center';
        stepHeader.innerHTML = `<span class="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">${currentStepCount + 1}</span> ${step.title}`;
        stepElement.appendChild(stepHeader);
        
        // Add step content
        const stepContent = document.createElement('div');
        stepContent.className = 'whitespace-pre-wrap font-mono text-sm';
        stepContent.textContent = step.content;
        stepElement.appendChild(stepContent);
        
        // Add the step to the container
        stepsContainer.appendChild(stepElement);
        
        // Show the solution container if it was hidden
        document.getElementById('practice-solution-container').classList.remove('hidden');
        
        // If this was the last step, show the final answer
        if (currentStepCount === problem.steps.length - 1) {
            showFinalAnswer();
        }
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
        let feedback = 'Your answer is not correct. ';
        
        if (!x1Correct) {
            feedback += `The correct value for ${problem.variables.x1.symbol} is ${problem.solution.x1}. `;
        }
        
        if (!x2Correct) {
            feedback += `The correct value for ${problem.variables.x2.symbol} is ${problem.solution.x2}. `;
        }
        
        if (!zCorrect) {
            feedback += `The correct objective value is ${problem.solution.value}.`;
        }
        
        showAnswerFeedback(false, feedback);
    }
}

// Show feedback for the user's answer
function showAnswerFeedback(isCorrect, message) {
    const feedbackElement = document.getElementById('practice-answer-feedback');
    feedbackElement.classList.remove('hidden', 'bg-green-50', 'border-green-500', 'bg-red-50', 'border-red-500');
    
    if (isCorrect) {
        feedbackElement.classList.add('bg-green-50', 'border-green-500');
        feedbackElement.innerHTML = `<i class="fas fa-check-circle text-green-500 mr-2"></i> ${message}`;
    } else {
        feedbackElement.classList.add('bg-red-50', 'border-red-500');
        feedbackElement.innerHTML = `<i class="fas fa-times-circle text-red-500 mr-2"></i> ${message}`;
    }
}

// Export the initialization function
window.initPracticeSection = initPracticeSection;
