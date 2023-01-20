let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID;

//HTML elements
let questionElement = document.getElementById("questions");
let timerElement = document.getElementById("time")
let choiceElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials");
let feedBackElement = document.getElementById("feedback");

let sfx = new Audio("assets/sfx/correct.wav");



function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    let titleElement = document.getElementById("question-title");

    titleElement.textContent = currentQuestion.title;

    choiceElement.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, index) {
        let choiceButton = document.createElement("button");

        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = `${index + 1.} ${choice}`

        choiceButton.addEventListener("click", questionClick);

        choiceElement.append(choiceButton);
    })
}

function questionClick() {
    if(this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if(time < 0) {
            time = 0;
        }

        timerElement.textContent = "wrong"
    } else {
        feedBackElement.textContent = "Correct";
    }
}

function quizEnd() {
    clearInterval(timerID);

    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");

    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

    questionElement.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function startQuiz() {
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");

    questionElement.removeAttribute("class");

    timerID = setInterval(clockTick, 1000)

    timerElement.textContent = time;

    getQuestion();
}

function saveHighScore() {

}

function checkForEnter(event) {

}

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", saveHighScore);

initialElement.addEventListener("keyup", checkForEnter);