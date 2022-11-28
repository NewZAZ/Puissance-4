const board = []

let currentPlayer = 1;

function initBoard(size) {
    document.getElementById("win").close()

    let tempBoard;
    for (let x = 0; x < size; x++) {
        tempBoard = []
        for (let y = 0; y < size; y++) {
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

initBoard(10)

function checkWin() {
    if (checkColumn()) {
        console.log("GG 1")
    }

    if (checkRow()) {
        document.getElementById("win").showModal()
    }

    if (checkDiagonal()) {
        console.log("GG 3")
    }

}

function checkColumn() {
    player = currentPlayer
    for (let y = 0; y < board.length; y++) {
        countSameColor = 0

        for (let x = 0; x < board.length; x++) {

            if (player == board[x][y]) {
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

function checkDiagonal() {
    //TODO
}

showBoard()


function checkRow() {
    player = currentPlayer
    for (let x = 0; x < board.length; x++) {
        countSameColor = 0
        for (let y = 0; y < board.length; y++) {

            if (player == board[x][y]) {
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

    const Y = parseInt(ID);

    if (!columnIsFull(Y)) {
        board[getLastXByColumn(Y) - 1][Y] = currentPlayer;
        checkWin(getLastXByColumn(Y) - 1, Y)
        switchPlayer();
        showBoard()
    } else {
        console.log("nop")
    }
});

function columnIsFull(y) {
    for (let x = 0; x < board.length; x++) {
        if (board[x][y] == 0) {
            return false;
        }
    }
    return true;
}

function getLastXByColumn(y) {
    for (let x = 0; x < board.length; x++) {
        if (board[x][y] != 0) {
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