const questions = [
    {
        question: "Who is Harry Potter's best female friend?",
        answers: ["Ron Weasley", "Hermoine Granger", "Neville Longbottom", "Professor Snape"],
        correctIDX: 1
    },
    {
        question: "What kind of hat does the cat wear in the Dr. Seuss book the Cat in the Hat?",
        answers: ["red/white striped hat", "pirate hat", "chef's hat", "bandana"],
        correctIDX: 0
    },
    {
        question: "In the book Curious George, who is the monkey's companion?",
        answers: ["Bob Jones", "Mr. McGee", "the man with the cool pants", "the man in the yellow hat"],
        correctIDX: 3
    },
    {
        question: "What is the name of the Darling's daughter in Peter Pan?",
        answers: ["Lucy", "Melissa", "Wendy", "Catherine"],
        correctIDX: 2
    },
    {
        question: "What is the name of Tom Sawyer's best friend in The Adventures of Tom Sawyer?",
        answers: ["Jerry", "Huckleberry Finn", "Shadowrealm James", "Lydia"],
        correctIDX: 1
    },
    {
        question: "In the book Freaky Friday, Annabel changes bodies with whom?",
        answers: ["her sister", "her father", "her mother", "her dog"],
        correctIDX: 2
    },
    {
        question: "Which author wrote James and the Giant Peach?",
        answers: ["Ronald Dahl", "Dr. Seuss", "Stephen King", "John Green"],
        correctIDX: 0
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
                playCorrect();
                score++;
            } else {
                button.classList.add("incorrect");
                playIncorrect();
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

function playCorrect() {
    const audio = document.getElementById("correct");
    audio.currentTime = 0;
    audio.play();
}

function playIncorrect() {
    const audio = document.getElementById("incorrect");
    audio.currentTime = 0;
    audio.play();
}

function showResults() {
    questionElement.innerText = `You got ${score} out of ${questions.length} questions correct!`;
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
}

loadQuestion(questions[currentIDX]);

nextButton.addEventListener("click", loadNext);