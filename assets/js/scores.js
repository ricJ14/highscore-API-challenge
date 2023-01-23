function printHighScores(){

    let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

    highScores.sort(function(a,b){
        return b.score - a.score;
    })

    highScores.forEach(function(score){
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`;
        let ol = document.getElementById("highscores");
        ol.appendChild(li);
    })
}

function clearHighScores(){
    localStorage.removeItem("highScores");
    window.location.reload();
}

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighScores);


printHighScores();