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

function checkWin(x, y) {
    if (checkColumn()) {
        console.log("GG 1")
    }

    if (checkRow()) {
        document.getElementById("win").showModal()
    }

    if (checkDiagonal(x, y)) {
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

function checkDiagonal(x, y) {

    let length = board.length



    let points = 0;
    if ((x == 0 && y == length - 1) || (x == length - 1 && y == 0)) {

        for (let i = 0; i < length; i++) {
            let amount = board[i][-(i + 1)]
            if (amount == player) {
                points += 1
            } else if (amount == 0) {
                points = 0;
            }

            if(points >= 4){
                return true;
            }
        }
    }


    if ((x == 0 && y == 0) || (x == length - 1 && y == length - 1)) {
        for (let i = 0; i < length; i++) {
            let amount = board[i][i]
            if (amount == player) {
                points += 1;
            } else if (amount == 0) {
                points = 0;
            }

            if(points >= 4){
                return true;
            }
        }
    } else {

        let temp_x = x
        let temp_y = y

        const total = [0, 0]

        while (x > 0 && y < length - 1) {
            x -= 1
            y += 1
        }

        while (x <= length - 1 && y >= 0) {
            let amount = board[x][y]
            x += 1
            y -= 1
            if (amount === player) {
                total[0] += 1
            } else if (total[0] !== 0) {
                total[0] = 0
                break;
            }
            console.log(points)
            if(points >= 4){
                return true;
            }
        }

        x = temp_x;
        y = temp_y;

        while (x > 0 && y > 0) {
            x -= 1
            y -= 1
        }

        while (x <= length - 1 && y <= length - 1){
            let amount = board[x][y]
            x += 1
            y += 1
            if(amount === player){
                total[1] += 1
            }else if(total[1] != 0){
                total[1] = 0
            }

            console.log(points)
            if(points >= 4){
                return true;
            }
        }
    }


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

    let y = parseInt(ID);

    if (!columnIsFull(y)) {
        let x = getLastXByColumn(y) - 1
        board[x][y] = currentPlayer;
        checkWin(x, y)
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