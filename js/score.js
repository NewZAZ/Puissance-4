function displayScore(){
    if(lastScore.length === 0) return
    for(let i = 0; i < lastScore.length; i++){
        const lastScoreElement = lastScore[i];
        const elementById = document.getElementById(lastScoreElement.toString());

        elementById.innerText = lastScoreElement[0] +" VS "+ lastScoreElement[1]
    }
}

displayScore()