var board;
var score = 0;
var rows = 4;
var columns = 4;
var best = 0;

window.onload = function() {
    setgame();
    document.getElementById("try-again").addEventListener("click", function() {
        resetGame();
    });
    document.getElementById("new-game").addEventListener("click", function() {
        resetGame();
    });
}

function setgame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    settwo();
    settwo();
}

function hasemptytile() {
    for (let r=0; r<rows; r++) {
        for (let c=0; c<columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function settwo() {
    if (!hasemptytile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("t2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("t"+num.toString());
        }
        else {
            tile.classList.add("t8192");
        }
    }
}

document.addEventListener("keyup",(e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
    }
    if (isGameOver()) {
        document.getElementById("game-over").style.visibility = "visible";
    }
    settwo();
    document.getElementById("score").innerText = score;
    if (score > best) {
        best = score;
    }
    document.getElementById("best-score").innerText = best;
} )

function filterZero(row) {
    return row.filter(num => num!=0)
}

function slide(row) {
    row = filterZero(row);
    for (let i=0; i<row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r=0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c=0; c<columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r=0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c=0; c<columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c=0; c<columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r=0; r<columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }   
    }
}

function slideDown() {
    for (let c=0; c<columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r=0; r<columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }   
    }
}

function isGameOver() {
    if (hasemptytile()) return false;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] == board[r][c + 1]) return false;
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] == board[r + 1][c]) return false;
        }
    }

    return true;
}

function resetGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("board").innerHTML = "";
    setgame();
    document.getElementById("game-over").style.visibility = "hidden";
}