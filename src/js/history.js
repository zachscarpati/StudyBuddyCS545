const questions = [
    {
        question: "Who invented the telephone?",
        answers: [
            {text: "Alexander Graham Bell", correct:true},
            {text: "Larry Telephone", correct:false},
            {text: "Senator Satellite", correct:false},
            {text: "Jerry", correct:false},
        ]
    },
    {
        question: "Who was America's first president?",
        answers: [
            {text: "Thomas Jefferson", correct:false},
            {text: "George Washington", correct:true},
            {text: "Ben Franklin", correct:false},
            {text: "Alexander Hamilton", correct:false},
        ]
    },
    {
        question: "Who gifted America the Statue of Liberty?",
        answers: [
            {text: "Spain", correct:false},
            {text: "Germany", correct:false},
            {text: "England", correct:false},
            {text: "France", correct:true},
        ]
    },
    {
        question: "What year did women recieve the right to vote in America?",
        answers: [
            {text: "1938", correct:false},
            {text: "1920", correct:true},
            {text: "1923", correct:false},
            {text: "1964", correct:false},
        ]
    },
    {
        question: "Who invented the light bulb?",
        answers: [
            {text: "Thomas Edison", correct:true},
            {text: "Ben Franklin", correct:false},
            {text: "Albert Einstein", correct:false},
            {text: "Larry Lightbulb", correct:false},
        ]
    },
    {
        question: "Who paitned the roof of the Sistine Chapel?",
        answers: [
            {text: "Sandro Boticelli", correct:false},
            {text: "Leonardo da Vinci", correct:false},
            {text: "Michelangelo", correct:true},
            {text: "Raphael", correct:false},
        ]
    },
    {
        question: "Who wrote the famous diary while hiding from Nazis in Amsterdam?",
        answers: [
            {text: "Anne Frank", correct:true},
            {text: "Helen Keller", correct:false},
            {text: "Jackie Kennedy", correct:false},
            {text: "Amelia Earhart", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-button");


let currQuestionIDX = 0;
let score = 0;

function startQuiz() {
    currQuestionIDX = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer() {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currQuestionIDX]
    let questionNum = currQuestionIDX+1;
    questionElement.innerHTML = questionNum+ ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}

function handleNextButton() {
    currQuestionIDX++;
    if (currQuestionIDX < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if(currQuestionIDX < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();