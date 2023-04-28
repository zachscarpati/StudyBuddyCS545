const questions = [
    {
        question: "All animals require food, air, and _____ to survive.",
        answers: ["candy", "water", "soda", "grass"],
        correctIDX: 1
    },
    {
        question: "What is the Earth's only natural satellite?",
        answers: ["Moon", "Venus", "Mars", "Sun"],
        correctIDX: 0
    },
    {
        question: "What is a baby cow called?",
        answers: ["kitten", "child", "lamb", "calf"],
        correctIDX: 3
    },
    {
        question: "What part of the skeletal system protects the brain?",
        answers: ["foot", "glute", "skull", "forearm"],
        correctIDX: 2
    },
    {
        question: "What neutrient plays an essential role in muscle building?",
        answers: ["carbohydrate", "fat", "protein", "iron"],
        correctIDX: 2
    },
    {
        question: "What is the largest animal on Earth?",
        answers: ["elephant", "blue whale", "human", "seagull"],
        correctIDX: 0
    },
    {
        question: "The closest planet to the Sun is _______.",
        answers: ["Venus", "Mercury", "Mars", "Saturn"],
        correctIDX: 1
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