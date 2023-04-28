const questions = [
    {
        question: "Who invented the telephone?",
        answers: ["Alexander Graham Bell", "Larry Telephone", "Senator Satellite", "Jerry"],
        correctIDX: 0
    },
    {
        question: "Who was America's first president?",
        answers: ["Thomas Jefferson", "George Washington", "Ben Franklin", "Alexander Hamilton"],
        correctIDX: 1
    },
    {
        question: "Who gifted America the Statue of Liberty?",
        answers: ["Spain", "Germany", "England", "France"],
        correctIDX: 3
    },
    {
        question: "What year did women recieve the right to vote in America?",
        answers: ["1938", "1920", "1923", "1964"],
        correctIDX: 1
    },
    {
        question: "Who invented the light bulb?",
        answers: ["Thomas Edison", "Ben Franklin", "Albert Einstein", "Larry Lightbulb"],
        correctIDX: 0
    },
    {
        question: "Who paitned the roof of the Sistine Chapel?",
        answers: ["Sandro Boticelli", "Leonardo da Vinci", "Michelangelo", "Raphael"],
        correctIDX: 1
    },
    {
        question: "Who wrote the famous diary while hiding from Nazis in Amsterdam?",
        answers: ["Anne Frank", "Helen Keller", "Jackie Kennedy", "Amelia Earhart"],
        correctIDX: 0
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-button");


let currentIDX = 0;
let score = 0;

function loadQuestion() {
    questionElement.innerText = questions[currentIDX].question;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    questions[currentIDX].answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("button");
        button.addEventListener("click", () => {
            selectAnswer(index);
        });
        answerButtons.appendChild(button);
    });
    nextButton.disabled = true;
}

function selectAnswer(index) {
    if (index === questions[currentIDX].correctIDX) {
        score++;
    }
    answerButtons.childNodes.forEach((button) => {
        button.disabled = true;
    });
    nextButton.disabled = false;
}

function nextQuestion() {
    currentIDX++;
    if (currentIDX < questions.length) {
        loadQuestion();
    } else {
        questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
        answerButtons.style.display = "none";
        nextButton.style.display = "none";
    }
}

window.onload = loadQuestion;

nextButton.addEventListener("click", nextQuestion);