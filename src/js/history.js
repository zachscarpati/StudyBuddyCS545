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
    const scoreElem = document.getElementById('score');
    scoreElem.textContent = `You got ${score} out of ${quiz.length} questions correct.`;
    
    const ansButtonsElem = document.getElementById('ans-buttons');
    ansButtonsElem.remove();
  
    const nextButtonElem = document.getElementById('next-button');
    nextButtonElem.remove();
  
    const resultElem = document.createElement('div');
    resultElem.classList.add('result-container');
    for (let i = 0; i < quiz.length; i++) {
      const question = quiz[i];
      const isCorrect = userAnswers[i] === question.correctIDX;
      const result = document.createElement('div');
      result.classList.add('result');
      result.innerHTML = `
        <p>${question.question}</p>
        <p>Your answer: ${question.answers[userAnswers[i]]}</p>
        <p>Correct answer: ${question.answers[question.correctIDX]}</p>
        <p>${isCorrect ? 'Correct!' : 'Incorrect'}</p>
      `;
      if (!isCorrect) {
        const correctAnsElem = result.querySelector(`p:nth-child(3)`);
        correctAnsElem.classList.add('correct-answer');
      }
      resultElem.appendChild(result);
    }
    document.getElementById('container').appendChild(resultElem);
  }
loadQuestion(questions[currentIDX]);

nextButton.addEventListener("click", loadNext);