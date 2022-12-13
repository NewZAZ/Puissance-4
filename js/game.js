let board = []

let currentPlayer = 1;

let currentTimer = 0

let isStarted = false

let score = [0,0]

function initBoard(xSize, ySize) {


    board = []
    let tempBoard;
    for (let x = 0; x < xSize; x++) {
        tempBoard = []
        for (let y = 0; y < ySize; y++) {
            tempBoard.push(0)
        }
        board.push(tempBoard)

    }
}


function showBoard() {
    const GAME = document.getElementById("game_table");
    let insertion = "<table class='table'>";


    for (let i = 0; i < board.length; i++) {
        insertion += "<tr>";
        for (let j = 0; j < board[i].length; j++) {
            insertion += "<td id=" + j + ">";
            switch (board[i][j]) {
                case 1 :
                    insertion += "<img id=" + j + " width='52'height='52' src='img/blue.png'>";
                    break;
                case 2 :
                    insertion += "<img id=" + j + " width='52'height='52' src='img/red.png'>";
                    break;
                default:
                    insertion += "<img id=" + j + " width='52'height='52' src='img/blank.png'>";
            }
            insertion += "</td>";


        }
        insertion += "</tr>";
    }

    insertion += "</table>";
    GAME.innerHTML = insertion;
}

function checkWin(x, y) {
    if (checkColumn() || checkRow() || checkDiagonal(x, y)) {
        score[currentPlayer-1] += 1
        stop()
    }

}

function checkColumn() {
    for (let y = 0; y < board.length; y++) {
        let countSameColor = 0

        for (let x = 0; x < board.length; x++) {

            if (currentPlayer === board[x][y]) {
                countSameColor++;
            } else if (countSameColor > 0) {
                countSameColor = 0
            }

            if (countSameColor >= 4) {
                return true;
            }
        }


    }
    return false;
}

function checkDiagonal(x, y) {

    let length = board.length


    let points = 0;
    if ((x === 0 && y === length - 1) || (x === length - 1 && y === 0)) {

        for (let i = 0; i < length; i++) {
            let amount = board[i][-(i + 1)]
            if (amount === currentPlayer) {
                points += 1
            } else if (amount !== currentPlayer) {
                points = 0;
            }

            if (points >= 4) {
                return true;
            }
        }
    }


    if ((x === 0 && y === 0) || (x === length - 1 && y === length - 1)) {
        for (let i = 0; i < length; i++) {
            let amount = board[i][i]
            if (amount === currentPlayer) {
                points += 1;
            } else if (amount !== currentPlayer) {
                points = 0;
            }

            if (points >= 4) {
                return true;
            }
        }
    } else {

        let temp_x = x
        let temp_y = y

        const total = [1, 1]

        for (let i = 1; i < 4; i++) {
            if (temp_x - i >= 0 && temp_y - i >= 0) {
                let amount = board[temp_x - i][temp_y - i]
                if (amount === currentPlayer) {
                    total[0] += 1
                } else if (amount !== currentPlayer && total[0] !== 1) {
                    total[0] = 1
                }
            } else if (temp_x + i < board.length) {
                if (temp_y + i < board[temp_x + i].length) {
                    let amount = board[temp_x + i][temp_y + i]
                    if (amount === currentPlayer) {
                        total[0] += 1
                    } else if (amount !== currentPlayer && total[0] !== 1) {
                        total[0] = 1
                    }
                }
            }
            if (total[0] >= 4) {
                return true;
            }

            if (temp_x + i < board.length && temp_y - i >= 0) {

                let amount = board[temp_x + i][temp_y - i]
                if (amount === currentPlayer) {
                    total[1] += 1
                } else if (amount !== currentPlayer && total[1] !== 1) {
                    total[1] = 1
                }
            } else if (temp_x - i >= 0 && temp_y + i < board[temp_x - i].length) {
                let amount = board[temp_x - i][temp_y + i]
                if (amount === currentPlayer) {
                    total[1] += 1
                } else if (amount !== currentPlayer && total[1] !== 1) {
                    total[1] = 1
                }
            }

            if (total[1] >= 4) {
                return true;
            }

        }

    }


}

function checkRow() {
    for (let x = 0; x < board.length; x++) {
        let countSameColor = 0
        for (let y = 0; y < board.length; y++) {

            if (currentPlayer === board[x][y]) {
                countSameColor++;
            } else if (countSameColor > 0) {
                countSameColor = 0
            }

            if (countSameColor >= 4) {
                return true;
            }
        }

        if (countSameColor >= 4) {
            return true;
        }

    }
}

addEventListener("click", ev => {
    const ID = ev.target.id;

    let y = parseInt(ID);

    if (!columnIsFull(y)) {
        let x = getLastXByColumn(y) - 1
        board[x][y] = currentPlayer;
        checkWin(x, y)
        switchPlayer();
        showBoard()
    }
});

function columnIsFull(y) {
    for (let x = 0; x < board.length; x++) {
        if (board[x][y] === 0) {
            return false;
        }
    }
    return true;
}

function getLastXByColumn(y) {
    for (let x = 0; x < board.length; x++) {
        if (board[x][y] !== 0) {
            return x;
        }
    }
    return board.length
}

function switchPlayer() {
    switch (currentPlayer) {
        case 1:
            currentPlayer = 2
            break;
        case 2:
            currentPlayer = 1
            break;
    }
}

addEventListener("click", ev => {
    const ID = ev.target.id;

    if (ID === 'preStart') {
        let col = parseInt(document.getElementById("col").value)
        let row = parseInt(document.getElementById("row").value)

        if (isNaN(col) || isNaN(row)) {
            alert("NOP")
            return;
        }


        const elementById = document.getElementById("start");

        start(col, row)

        elementById.close()
    }
})

function stop(){
    isStarted = false
    currentTimer = 0

    const elementById = document.getElementById("win");
    elementById.innerHTML = "<h1>Bravo !</h1>"
    elementById.innerHTML += "<p>Le joueur " + currentPlayer + " a gagné !</p>"
    elementById.innerHTML += "<button onclick='preStart()'>Rejouer !</button>"
    elementById.innerHTML += "<button onclick='cancel()'>Annuler</button>"
    elementById.showModal()
}

function cancel(){
    const elementById = document.getElementById("win");
    elementById.close();
    isStarted = false
    currentTimer = 0
    window.history.back()
}

function preStart() {
    isStarted = false
    currentTimer = 0
    document.getElementById("win").close()



    const elementById = document.getElementById("start");
    elementById.innerHTML = "<h1>Choisissez la taille du puissance 4</h1>"
    elementById.innerHTML += "<label> Colonnes"
    elementById.innerHTML += "<input id='col' type='text'>"
    elementById.innerHTML += "</label>"

    elementById.innerHTML += "<label> Lignes"
    elementById.innerHTML += "<input id='row' type='text'>"
    elementById.innerHTML += "</label>"

    elementById.innerHTML += "<button id='preStart'>Commencez !</button>"
    elementById.showModal()
}

function start(xSize, ySize) {
    displayScore()
    showTime()
    initBoard(xSize, ySize)

    showBoard()

    isStarted = true


}

setInterval(() => {
    if (!isStarted) return
    currentTimer++

    showTime()

}, 1000)

function showTime(){
    const elementById = document.getElementById("timer");


    let minute = Math.trunc(currentTimer / 60)
    let seconds = currentTimer % 60

    elementById.innerHTML = "Temps de jeu: "
    if (minute > 0) {
        if (minute < 10) {
            elementById.innerText += "0"
        }
        elementById.innerText += minute
        elementById.innerHTML+= ":"
    }else {
        elementById.innerText = "00:"
    }
    if (seconds < 10) {
        elementById.innerText += "0"
    }
    elementById.innerText += seconds
}

function displayScore(){
    const elementById = document.getElementById("score");

    elementById.innerText = score[0] +" VS "+score[1]
}


preStart()