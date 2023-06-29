import  Rook from "./pieces/Rook.js"
import  Knight from "./pieces/Knight.js"
import  Bishop from "./pieces/Bishop.js"
import  Queen from "./pieces/Queen.js"
import  King from "./pieces/King.js"
import  Pawn from "./pieces/Pawn.js"


export default class Board {
    static boardX = ["a", "b", "c", "d", "e", "f", "g", "h"];
    static boardY = [1, 2, 3, 4, 5, 6, 7, 8];
    static red = 'rgb(255, 100, 100)';

    constructor(squares, orienation){
        this.darkSquareColor = "#769656";
        this.lightSquareColor = "#eeeed2";
        this.orienation = orienation;//TODO implement orientation
        this.initializeBoard(squares);
        this.movingSquare = null;
        this.moveIndicators = [];
        this.attackIndicators = [];
        this.sequence = [];
        this.isWhiteTurn = true;
        this.enPassant = null;
        }

    initializeBoard(squares) {
        if (squares == null) {
            this.squares = [];
            for (let i = 0; i < 8; i++) {
                this.squares[i] = [];
                for (let j = 0; j < 8; j++) {
                    this.squares[i][j] = new Square(i, j, null);
                }
            }
        } else {//initialize from non-blank board
            this.squares = squares;
        }
    }

    setupFreshBoard() {
        //setup white pieces
        this.squares[0][0].piece = new Rook(true);
        this.squares[1][0].piece = new Knight(true);
        this.squares[2][0].piece = new Bishop(true);
        this.squares[3][0].piece = new Queen(true);
        this.squares[4][0].piece = new King(true);
        this.squares[5][0].piece = new Bishop(true);
        this.squares[6][0].piece = new Knight(true);
        this.squares[7][0].piece = new Rook(true);
        for (let i = 0; i < 8; i++) {
            this.squares[i][1].piece = new Pawn(true);
        }

        //setup black pieces
        this.squares[0][7].piece = new Rook(false);
        this.squares[1][7].piece = new Knight(false);
        this.squares[2][7].piece = new Bishop(false);
        this.squares[3][7].piece = new Queen(false);
        this.squares[4][7].piece = new King(false);
        this.squares[5][7].piece = new Bishop(false);
        this.squares[6][7].piece = new Knight(false);
        this.squares[7][7].piece = new Rook(false);
        for (let i = 0; i < 8; i++) {
            this.squares[i][6].piece = new Pawn(false);
        }
    }

    getBoard() {
        return this.squares;
    }

    displayBoard(div) {
        this.drawSquareColors(div);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = this.squares[i][j];
                let squareDiv = div.getElementsByClassName(square.toNotation())[0];
                squareDiv.addEventListener("click", ()=>{this.tryStartMove(event)});
                if (square.getPiece() == null) continue;
                let img = document.createElement("img");
                img.src = square.getPiece().getImgSrc();
                img.className = "piece";
                
                squareDiv.innherHTML = "";
                squareDiv.appendChild(img);
            }
        }
    
    }

    drawSquareColors(div) {
        let sq = !this.orienation;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                div.getElementsByClassName(this.squares[i][j].toNotation())[0].style.backgroundColor = sq? this.lightSquareColor : this.darkSquareColor;
                sq = !sq;           
            }
            sq = !sq;
        }

    }

    tryStartMove(e) {
        let squareDiv = e.target;
            while (!squareDiv.classList.contains("square")) {
                squareDiv = squareDiv.parentElement;
            }

        if (this.movingSquare != null && this.movingSquare.getPiece() != null && this.movingSquare.getPiece().isWhite == this.isWhiteTurn && (squareDiv.getElementsByClassName("moveIndicator").length > 0 || squareDiv.style.backgroundColor == Board.red)) {
            let fromSquare = this.movingSquare;
            let toSquare = this.getSquareFromNotation(squareDiv.classList[0]);
            this.movePiece(fromSquare, toSquare);

        } else {
            this.removeIndicators();
            let square = this.getSquareFromNotation(squareDiv.classList[0]);
            this.movingSquare = square;
            if (this.movingSquare.getPiece() != null) {
                this.showValidMoves(this.movingSquare.getPiece().getValidMoves(this, square))
            }
        }
    }

    showValidMoves(validMoves) {
        for (let square of validMoves["moves"]){
            let squareDiv = document.getElementsByClassName(square.toNotation())[0];
            if (squareDiv.getElementsByClassName("moveIndicator").length > 0) continue;
            let moveIndicator = document.createElement("div");
            moveIndicator.className = "moveIndicator";
            squareDiv.appendChild(moveIndicator);
            this.moveIndicators.push(moveIndicator);
        }
        for (let square of validMoves["attacks"]){
            let squareDiv = document.getElementsByClassName(square.toNotation())[0];
            if (squareDiv.style.backgroundColor.includes(Board.red)) continue;
            this.attackIndicators.push(squareDiv);
            squareDiv.style.backgroundColor = Board.red;
        }
    }

    movePiece(fromSquare, toSquare) {
        if (fromSquare.getPiece() == null) return false;
        if (toSquare.getPiece() != null) {
            //todo handle capturing a piece

        }

        toSquare.setPiece(fromSquare.getPiece());
        fromSquare.setPiece(null);

        //en passant capture
        let enpassantCapture = false;
        if (this.enPassant != null) {
            enpassantCapture = toSquare.getPiece().name == "Pawn" &&
            this.enPassant.rank == toSquare.rank &&
            this.enPassant.file - this.enPassant.piece.fileMod == toSquare.file;
            if(enpassantCapture) {
                this.enPassant.setPiece(null);
            }
        }

        this.removeIndicators();
        this.updateBoard(enpassantCapture? [fromSquare, toSquare, this.enPassant] : [fromSquare, toSquare]);
        this.sequence.push(JSON.parse(JSON.stringify(toSquare)));
        console.log(this.sequence);

        //en passant flag check=
        this.enPassant = null;
        if (toSquare.getPiece().name == "Pawn" && Math.abs(fromSquare.file - toSquare.file) == 2) {
            this.enPassant = toSquare;
        }


        this.movingSquare = null;
        this.isWhiteTurn = !this.isWhiteTurn;
        return true;
    }

    getSquareFromNotation(notation) {
        let x = Board.boardX.indexOf(notation.charAt(0));
        let y = Board.boardY.indexOf(parseInt(notation.charAt(1)));
        return this.squares[x][y];
    }

    removeIndicators() {
        for (let indicator of this.moveIndicators) {
            indicator.remove();
        }
        for (let indicator of this.attackIndicators) {
            indicator.style.backgroundColor = this.getSquareColor(this.getSquareFromNotation(indicator.classList[0]));
        }
        this.moveIndicators = [];
        this.attackIndicators = [];
    }

    getSquareColor(square) {
        if (square.rank%2==0 && square.file%2!=0) return this.lightSquareColor;
        else if (square.rank%2!=0 && square.file%2==0) return this.lightSquareColor;
        else return this.darkSquareColor;
    }

    updateBoard(updateSquares) {
        for (let square of updateSquares) {
            let squareDiv = document.getElementsByClassName(square.toNotation())[0];
            squareDiv.innerHTML = "";
            if (square.getPiece() == null) continue;
            if (square.getPiece().name == "Pawn" && (square.file == 0 || square.file == 7)) {
                square.setPiece(new Queen(square.getPiece().isWhite));
            }
            let img = document.createElement("img");
            img.src = square.getPiece().getImgSrc();
            img.className = "piece";
            squareDiv.appendChild(img);
        }
    }

    clearBoardHTML() {
        let squares = document.querySelectorAll(".square");
        for (let square of squares) {
            square.innerHTML = "";
        }
    }

    toString() {
        let str = "";
        for (let i = 7; i >=0; i--) {
            str += "[";
            for (let j = 0; j < 8; j++) {
                str += this.squares[j][i].getPiece() == null? "[ ], " : this.squares[j][i].getPiece().toString() + ", ";
            }
            str += "]\n";
        }
      
      return str;
    }

    getOrientation() {
        return this.orientation;
    }

}

class Square {
    constructor(rank, file, piece) {
        this.rank = rank;
        this.file = file;
        this.piece = piece;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    getPiece() {
        return this.piece;
    }

    toNotation() {
        return "" + Board.boardX[this.rank] + Board.boardY[this.file];
    }

    toString() {
        return "[" + this.rank + ", " + this.file + "]";
    }
}