const board = []

let currentPlayer = 1;

function initBoard(size) {


    let tempBoard;
    for (let x = 0; x < size; x++) {
        tempBoard = []
        for (let y = 0; y < size; y++) {
            tempBoard.push(0)
        }
        board.push(tempBoard)

    }

    console.log(board)
}


function showBoard() {
    const GAME = document.getElementById("game_table");
    let insertion = "<table class='table'>";


    for (let i = 0; i < board.length; i++) {
        insertion += "<tr>";
        for (let j = 0; j < board[i].length; j++) {
            insertion += "<td id="+j+">";
            switch (board[i][j]){
                case 1 :
                    insertion += "<img id="+j+" width='52'height='52' src='img/blue.png'>";
                    break;
                case 2 :
                    insertion += "<img id="+j+" width='52'height='52' src='img/red.png'>";
                    break;
                default:insertion += "<img id="+j+" width='52'height='52' src='img/blank.png'>";
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

    if(checkRow()){
        console.log("GG 2")
    }
}

function checkColumn() {
    player = currentPlayer
    for (let y = 0; y < board.length; y++) {
        countSameColor = 0

        for (let x = 0; x < board.length; x++) {
            if(countSameColor  >= 4){
                return true;
            }
            if (player == board[x][y] ) {
                countSameColor++;
            } else if (countSameColor > 0) {
                countSameColor = 0
            }
        }


    }
    return false;
}

function checkDiagonal() {

    for (let x = 0; x < board.length; x++) {
        board[x][x] = 1
    }

    let x = 0
    for (let y = board.length - 1; y >= 0; y--) {
        board[x][y] = 2
        x++;
    }

    /*for(let i = 1; i < board.length ; i++) {
        for (let x = 0; x < board.length - i; x++) {
            board[x][x + i] = 3
            board[board.length - i][x + i] = 4

        }

        for (let x = board.length; x >= i; x--) {
            board[x -i][i- 1] = 5
        }



    }*/

    showBoard();
}

showBoard()

//checkDiagonal();

function checkRow() {
    player = currentPlayer
    for (let x = 0; x < board.length; x++) {
        countSameColor = 0
        for (let y = 0; y < board.length; y++) {
            if(countSameColor  >= 4){
                return true;
            }
            if (player == board[x][y] ) {
                countSameColor++;
            } else if (countSameColor > 0) {
                countSameColor = 0
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

        if(!columnIsFull(Y)){
            board[getLastXByColumn(Y) -1][Y] = currentPlayer;
            checkWin()
            switchPlayer();
            showBoard()
        }else {
            console.log("nop")
        }
});

function columnIsFull(y){
    for(let x = 0; x < board.length; x++){
        if (board[x][y] == 0) {
            return false;
        }
    }
    return true;
}

function getLastXByColumn(y){
    for(let x = 0; x < board.length; x++){
        if(board[x][y] != 0){
            return x;
        }
    }
    return board.length
}

function switchPlayer(){
    switch (currentPlayer){
        case 1:
            currentPlayer = 2
            break;
        case 2:
            currentPlayer = 1
            break;
    }
}