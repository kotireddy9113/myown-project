// quiz.js

// Correct answers for the quiz questions
const correctAnswers = {
    c: ['a', 'b', 'a', 'b', 'a'], // Answers for C quiz
    cplus: ['a', 'b', 'c', 'd', 'a'], // Answers for C++ quiz
    java: ['a', 'b', 'c', 'd', 'a'], // Answers for Java quiz
    javascript: ['a', 'b', 'c', 'a', 'd'], // Answers for JavaScript quiz
    python: ['b', 'c', 'a', 'd', 'a'], // Answers for Python quiz
};

function calculateScore(language) {
    const answers = document.querySelectorAll(`input[name^='q']`);
    let score = 0;
    let answeredCount = 0;

    // Check if all questions are answered
    answers.forEach((answer, index) => {
        if (answer.checked) {
            answeredCount++;
            if (answer.value === correctAnswers[language][index]) {
                score++;
            }
        }
    });

    // Alert if not all questions are answered
    if (answeredCount < 5) {
        alert('Please answer all questions before submitting.');
    } else {
        alert(`Your score is ${score} out of 5`);
    }
}

// Function to reset the quiz
function resetQuiz() {
    const answers = document.querySelectorAll(`input[name^='q']`);
    answers.forEach(answer => {
        answer.checked = false; // Uncheck all radio buttons
    });
}
