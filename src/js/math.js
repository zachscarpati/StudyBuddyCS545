const questions = [
    {
        question: "7 * 9 =",
        answers: ["72", "63", "69", "48"],
        correctIDX: 1
    },
    {
        question: "6 * 12 =",
        answers: ["36", "74", "18", "72"],
        correctIDX: 3
    },
    {
        question: "81 / 9 =",
        answers: ["5", "9", "8", "12"],
        correctIDX: 1
    },
    {
        question: "Solve for x: 2x + 3 = 9",
        answers: ["x = 5", "x = 1", "x = 3", "x = 4"],
        correctIDX: 2
    },
    {
        question: "Solve for x: 5x - 27 = 3",
        answers: ["x = 6", "x = 12", "x = 7", "x = 3"],
        correctIDX: 0
    },
    {
        question: "If I have 12 apples, I give 3 to John, 5 apples to Mary, but Gilbert gives me 10 apples. How many apples do I have?",
        answers: ["14 apples", "12 apples", "8 apples", "18 apples"],
        correctIDX: 0
    },
    {
        question: "I have $80 to spend at the mall, I bought two shirts for $12 each, a new pair of shoes for $40, and a soft pretzel for $5. How much money do I have left?",
        answers: ["$17", "$5", "$11", "$9"],
        correctIDX: 2
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-button");


let currentIDX = 0;
let score = 0;

function loadQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("button");
        button.addEventListener("click", () => {
            if (index === question.correctIDX) {
                button.classList.add("correct");
                score++;
            } else {
                button.classList.add("incorrect");
            }
            disableButtons();
        });
        answerButtons.appendChild(button);
    });
}

function disableButtons() {
    const buttons = answerButtons.querySelectorAll("button");
    buttons.forEach((button) => {
        button.disabled = true;
        if (!button.classList.contains("correct") && !button.classList.contains("incorrect")) {
            button.classList.add("disabled");
        }
    });
}

function enableButtons() {
    const buttons = answerButtons.querySelectorAll("button");
    buttons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("correct");
        button.classList.remove("incorrect");
        button.classList.remove("disabled");
    });
}

function loadNext() {
    currentIDX++;
    if (currentIDX < questions.length) {
        loadQuestion(questions[currentIDX]);
        enableButtons();
    } else {
        showResults();
    }
}


function showResults() {
    questionElement.innerText = `You got ${score} out of ${questions.length} questions correct!`;
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
}

loadQuestion(questions[currentIDX]);

nextButton.addEventListener("click", loadNext);