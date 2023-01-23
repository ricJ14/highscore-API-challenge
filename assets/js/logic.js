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

let sfxCorrect = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");



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
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerElement.textContent = time;
        sfxWrong.play();
        feedBackElement.textContent = "Wrong";
    } else {
        sfxCorrect.play();
        feedBackElement.textContent = "Correct!";
    }

    feedBackElement.setAttribute("class", "feedback");
    setTimeout(function () {
        feedBackElement.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
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
    let initials = initialElement.value.trim();

    if (initials !== "") {
        let highScores =
            JSON.parse(window.localStorage.getItem("highScores")) || [];

        let newScore = {
            score: time,
            initials: initials
        };

        highScores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highScores));

        window.location.href = "highscores.html";
    }

}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", saveHighScore);

initialElement.addEventListener("keyup", checkForEnter);
