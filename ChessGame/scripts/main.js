import Board from "./board.js";

let board = new Board();

document.getElementById("reset").addEventListener("click", ()=>{
    board.clearBoardHTML();
    startGame()});


function startGame() {
    board = new Board(null, true);
    board.setupFreshBoard();
    board.displayBoard(document.getElementById("board"));
}

startGame();