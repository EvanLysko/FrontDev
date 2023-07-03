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

    constructor(board, orienation){
        this.darkSquareColor = "#769656";
        this.lightSquareColor = "#eeeed2";
        this.orienation = orienation;//TODO implement orientation
        this.viewingMode = false;
        this.running = false;

        if (board == null) { 
            this.initializeBoard(null);
            this.movingSquare = null;
            this.moveIndicators = [];
            this.attackIndicators = [];
            this.sequence = [];
            this.boardSequence = [];
            this.recentNotation = "";
            this.isWhiteTurn = true;
            this.enPassant = null;
            this.blackKing = null;
            this.whiteKing = null;
        } else {
            this.initializeBoard(board.squares);
            this.movingSquare = board.movingSquare;
            this.moveIndicators = board.moveIndicators;
            this.attackIndicators = board.attackIndicators;
            this.sequence = board.sequence;
            this.boardSequence = board.boardSequence;
            this.recentNotation = board.recentNotation;
            this.isWhiteTurn = board.isWhiteTurn;
            this.enPassant = board.enPassant;
            this.blackKing = board.blackKing;
            this.whiteKing = board.whiteKing;
        }
    }

    initializeUniqueItems() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this), false);

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
        this.whiteKing = this.squares[4][0];
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
        this.blackKing = this.squares[4][7];
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
                let newSquareDiv = squareDiv.cloneNode(true);
                squareDiv.parentNode.replaceChild(newSquareDiv, squareDiv);

                newSquareDiv.addEventListener("click", this.tryStartMove.bind(this));
                if (square.getPiece() == null) continue;
                let img = document.createElement("img");
                img.src = square.getPiece().getImgSrc();
                img.className = "piece";
                
                newSquareDiv.innerHTML = "";
                newSquareDiv.appendChild(img);
            }
        }

        //reset indicators
        this.removeIndicators();

        //clear sequence
        let sequenceDiv = document.getElementById("sequence");
        sequenceDiv.innerHTML = "";

        //reset turn 
        let turnDiv = document.getElementById("turnIndicator");
        turnDiv.innerHTML = "White Turn";
    
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

        if (this.running) return;

        this.running = true;

        if (this.viewingMode) {
            this.removeIndicators();
            this.running = false;
            return;
        }

        let squareDiv = e.target;
            while (!squareDiv.classList.contains("square")) {
                squareDiv = squareDiv.parentElement;
            }

        if (this.movingSquare != null && this.movingSquare.getPiece() != null && this.movingSquare.getPiece().isWhite == this.isWhiteTurn && (squareDiv.getElementsByClassName("moveIndicator").length > 0 || squareDiv.style.backgroundColor == Board.red)) {
            let fromSquare = this.movingSquare;
            let toSquare = this.getSquareFromNotation(squareDiv.classList[0]);
            this.removeIndicators();
            let newToSquare = this.movePiece(fromSquare, toSquare);
            if (newToSquare == null) {
                this.running = false;
                return;
            }
            this.sequence.push(JSON.parse(JSON.stringify(newToSquare)));
            this.boardSequence.push(JSON.stringify(this.squares));
            this.addSequenceItemHTML(newToSquare);
            this.handleCheck(this.isKingInCheck(this.isWhiteTurn? this.whiteKing : this.blackKing));
            this.handleMate(this.isKingInCheckmate(this.isWhiteTurn? this.blackKing : this.whiteKing));
            this.movingSquare = null;
            this.isWhiteTurn = !this.isWhiteTurn;

        } else {
            this.removeIndicators();
            let square = this.getSquareFromNotation(squareDiv.classList[0]);
            this.movingSquare = square;
            if (this.movingSquare.getPiece() != null) {
                this.showValidMoves(this.movingSquare.getPiece().getValidMoves(this, square), this.movingSquare.getPiece());
            }
        }

        this.running = false;
    }

    showValidMoves(validMoves, piece) {
        for (let square of validMoves){
            if (square.getPiece()!= null) {
                if (square.getPiece().isWhite != this.movingSquare.getPiece().isWhite) {
                    //show piece capture indicator
                    let squareDiv = document.getElementsByClassName(square.toNotation())[0];
                    if (squareDiv.style.backgroundColor.includes(Board.red)) continue;
                    this.attackIndicators.push(squareDiv);
                    squareDiv.style.backgroundColor = Board.red;
                } else {
                    //show castle indicator
                }
            } else {
                //check if en passant
                if (this.enPassant != null && piece.name == "Pawn" && this.enPassant.rank == square.rank && this.enPassant.file - this.enPassant.piece.fileMod == square.file) {
                    //show en passant indicator
                    //show piece capture indicator
                    let squareDiv = document.getElementsByClassName(square.toNotation())[0];
                    if (squareDiv.style.backgroundColor.includes(Board.red)) continue;
                    this.attackIndicators.push(squareDiv);
                    squareDiv.style.backgroundColor = Board.red;
                } else {
                    //show move indicator
                    let squareDiv = document.getElementsByClassName(square.toNotation())[0];
                    if (squareDiv.getElementsByClassName("moveIndicator").length > 0) continue;
                    let moveIndicator = document.createElement("div");
                    moveIndicator.className = "moveIndicator";
                    squareDiv.appendChild(moveIndicator);
                    this.moveIndicators.push(moveIndicator);
                }
            }
        }
    }

    movePiece(fromSquare, toSquare) {

        let moveNotation = fromSquare.piece.symbol;
        if (toSquare.getPiece() != null) {
            if (fromSquare.piece.name == "Pawn") {
                moveNotation += Board.boardX[fromSquare.rank];
            }
            moveNotation += "x";
        }
        moveNotation += toSquare.toNotation();

        //check if put in check
        if (this.isKingInCheckAfter(this.isWhiteTurn? this.whiteKing : this.blackKing, fromSquare, toSquare)) {
            //todo make indicator that king is in check
            let kingSquareDiv = document.getElementsByClassName((this.isWhiteTurn? this.whiteKing : this.blackKing).toNotation())[0];
            kingSquareDiv.style.backgroundColor = Board.red;
            this.attackIndicators.push(kingSquareDiv);
            this.handlePutinCheck(true);
            return null;
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

        //check if castling
        if (toSquare.getPiece().name == "King" && Math.abs(fromSquare.rank - toSquare.rank) == 2) {
            if (toSquare.getPiece().isWhite) {
                if (toSquare.rank == 6) {
                    this.squares[5][0].setPiece(this.squares[7][0].getPiece());
                    this.squares[7][0].setPiece(null);
                    this.updateBoard([this.squares[5][0], this.squares[7][0]]);
                    moveNotation = "O-O";
                } else {
                    this.squares[3][0].setPiece(this.squares[0][0].getPiece());
                    this.squares[0][0].setPiece(null);
                    this.updateBoard([this.squares[3][0], this.squares[0][0]]);
                    moveNotation = "O-O-O";
                }
            } else {
                if (toSquare.rank == 6) {
                    this.squares[5][7].setPiece(this.squares[7][7].getPiece());
                    this.squares[7][7].setPiece(null);
                    this.updateBoard([this.squares[5][7], this.squares[7][7]]);
                    moveNotation = "O-O";
                } else {
                    this.squares[3][7].setPiece(this.squares[0][7].getPiece());
                    this.squares[0][7].setPiece(null);
                    this.updateBoard([this.squares[3][7], this.squares[0][7]]);
                    moveNotation = "O-O-O";
                }
            }
        }

        this.updateBoard(enpassantCapture? [fromSquare, toSquare, this.enPassant] : [fromSquare, toSquare]);

        //en passant flag check=
        this.enPassant = null;
        if (toSquare.getPiece().name == "Pawn" && Math.abs(fromSquare.file - toSquare.file) == 2) {
            this.enPassant = toSquare;
        }

        //track kings
        if (toSquare.getPiece().name == "King") {
            toSquare.getPiece().isWhite? this.whiteKing = toSquare : this.blackKing = toSquare;
        }

        //track castling of rooks
        if (toSquare.getPiece().name == "Rook") {
            toSquare.getPiece().castleAble = false;
        }

        //check if put in check
        if (this.isKingInCheck(this.isWhiteTurn? this.blackKing : this.whiteKing)) {
            this.handleCheck(true);
            moveNotation += "+"; 
        }

        //updateNotation
        this.recentNotation = moveNotation;

        return toSquare;
    }

    handleCheck(isCheck) {
        if (!isCheck) return;

        let king = this.isWhiteTurn? this.blackKing : this.whiteKing;
        let kingSquareDiv = document.getElementsByClassName(king.toNotation())[0];
        kingSquareDiv.style.backgroundColor = Board.red;
        this.attackIndicators.push(kingSquareDiv);
    }

    // handlePutInCheck(isPutInCheck) {
    //     if (!isPutInCheck) return;

    //     let king = this.isWhiteTurn? this.whiteKing : this.blackKing;
    //     let kingSquareDiv = document.getElementsByClassName(king.toNotation())[0];
    //     kingSquareDiv.style.backgroundColor = Board.red;
    // }

    handleMate(isMate) {
        if (!isMate) return;
        this.viewingMode = true;

        let king = this.isWhiteTurn? this.blackKing : this.whiteKing;
        let kingSquareDiv = document.getElementsByClassName(king.toNotation())[0];
        kingSquareDiv.style.backgroundColor = Board.red;
        this.attackIndicators.push(kingSquareDiv);

        let moves = Array.from(document.querySelectorAll(".move"));
        moves[moves.length - 2].innerHTML = moves[moves.length - 2].innerHTML.replace("+", "#");
    }

    isKingInCheck(kingSquare) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j< 8; j++) {
                let square = this.squares[i][j];
                if (square.getPiece() == null) continue;

                if (square.getPiece().isWhite == kingSquare.getPiece().isWhite) continue;
                if (square.getPiece().getValidMoves(this, square).includes(kingSquare)) return true;
            }
        }
        return false;
    }

    isKingInCheckAfter(kingSquare, fromSquare, toSquare) {
        //todo handle if king is the one moving
        let toPiece = toSquare.getPiece();
        let fromPiece = fromSquare.getPiece();

        toSquare.setPiece(fromSquare.getPiece());
        fromSquare.setPiece(null);
        let ret = false;
        if (toSquare.getPiece().name == "King") {
            ret = this.isKingInCheck(toSquare);
        } else {
            ret = this.isKingInCheck(kingSquare);
        }
        toSquare.setPiece(toPiece);
        fromSquare.setPiece(fromPiece);

        return ret;
    }

    isKingInCheckmate(kingSquare) {
        if (!this.isKingInCheck(kingSquare)) return false;



        for (let i = 0; i < 8; i++) {
            for (let j = 0; j< 8; j++) {
                let square = this.squares[i][j];
                if (square.getPiece() == null) continue;
                if (square.getPiece().isWhite != kingSquare.getPiece().isWhite) continue;
                if (square == kingSquare) continue;
                for (let move of square.getPiece().getValidMoves(this, square)) {
                    if (!this.isKingInCheckAfter(kingSquare, square, move)) return false;
                }
            }
        }

        // check if king moves can save it
        for (let move of kingSquare.getPiece().getValidMoves(this, kingSquare)) {
            if (!this.isKingInCheckAfter(move, kingSquare, move)) return false;
        }

        return true;
    }


    getCastleAbleSpaces(isWhite) {
        let kingPiece = isWhite? this.whiteKing.getPiece() : this.blackKing.getPiece();
        //check if king has moved
        for (let move of this.sequence) {
            if (move.piece == kingPiece) {
                    return [];
            }
        }
        let moves = [];
        if (isWhite) {
            if (this.squares[0][0].getPiece() != null && this.squares[0][0].getPiece().name == "Rook" && this.squares[0][0].getPiece().castleAble) {
                if (this.squares[1][0].getPiece() == null && this.squares[2][0].getPiece() == null && this.squares[3][0].getPiece() == null && 
                !this.isKingInCheckAfter(this.squares[2][0], this.whiteKing, this.squares[2][0]) &&
                !this.isKingInCheckAfter(this.squares[3][0], this.whiteKing, this.squares[3][0])) {
                    moves.push(this.squares[2][0]);
                }
            }
            if (this.squares[7][0].getPiece() != null && this.squares[7][0].getPiece().name == "Rook" && this.squares[7][0].getPiece().castleAble) {
                if (this.squares[5][0].getPiece() == null && this.squares[6][0].getPiece() == null &&
                !this.isKingInCheckAfter(this.squares[5][0], this.whiteKing, this.squares[5][0]) &&
                !this.isKingInCheckAfter(this.squares[6][0], this.whiteKing, this.squares[6][0])) {
                    moves.push(this.squares[6][0]);
                }
            }

        } else {
            if (this.squares[0][7].getPiece() != null && this.squares[0][7].getPiece().name == "Rook" && this.squares[0][7].getPiece().castleAble) {
                if (this.squares[1][7].getPiece() == null && this.squares[2][7].getPiece() == null && this.squares[3][7].getPiece() == null &&
                !this.isKingInCheckAfter(this.squares[2][7], this.blackKing, this.squares[2][7]) &&
                !this.isKingInCheckAfter(this.squares[3][7], this.blackKing, this.squares[3][7])) {
                    moves.push(this.squares[2][7]);
                }
            }
            if (this.squares[7][7].getPiece() != null && this.squares[7][7].getPiece().name == "Rook" && this.squares[7][7].getPiece().castleAble) {
                if (this.squares[5][7].getPiece() == null && this.squares[6][7].getPiece() == null &&
                !this.isKingInCheckAfter(this.squares[5][7], this.blackKing, this.squares[5][7]) &&
                !this.isKingInCheckAfter(this.squares[6][7], this.blackKing, this.squares[6][7])) {
                    moves.push(this.squares[6][7]);
                }
            }
        }

        return moves;
    }


    addSequenceItemHTML(move) {
        for (let m of Array.from(document.getElementsByClassName("move"))) {
            m.className = "move"; 
        }
        if (move.piece.isWhite) {
            let sequenceWrapper = document.getElementById("sequence");
            let sequenceItemWrapper = document.createElement("div");
            sequenceItemWrapper.className = "sequenceItemWrapper";
            let sequenceItem = document.createElement("div");
            sequenceItem.className = "sequenceItem";
            
            let moveNumber = document.createElement("h3");
            moveNumber.className = "moveNumber";
            moveNumber.innerHTML = (Math.floor(this.sequence.length / 2) + 1) + ".";

            let whiteMove = document.createElement("p");
            whiteMove.className= "move curMove";
            whiteMove.innerHTML = this.recentNotation;
            whiteMove.addEventListener("click", this.changeBoardState.bind(this));

            let blackMove = document.createElement("p");
            blackMove.className= "move";
            blackMove.innerHTML = "";
            blackMove.addEventListener("click", this.changeBoardState.bind(this));
            
            sequenceItem.appendChild(whiteMove);
            sequenceItem.appendChild(blackMove);
            sequenceItemWrapper.appendChild(moveNumber);
            sequenceItemWrapper.appendChild(sequenceItem);
            sequenceWrapper.appendChild(sequenceItemWrapper);

        } else {
            let sequenceWrapper = document.getElementById("sequence");
            let moves = sequenceWrapper.getElementsByClassName("move");
            let blackMove = moves[moves.length - 1];
            
            blackMove.innerHTML = this.recentNotation;
            blackMove.className = "move curMove";

        }
        let turnDisplay = document.getElementById("turnIndicator");
        turnDisplay.innerHTML = !this.isWhiteTurn? "White Turn" : "Black Turn";        
    }

    changeBoardState(e) {

        if (this.running) return;

        this.running = true;

        let curMove = e.target;
        let moves = Array.from(document.querySelectorAll(".move"));
        for (let move of moves) {
            move.className = "move";
        }
        curMove.className = "move curMove";
        let moveIndex = moves.indexOf(curMove);
        let boardState = this.boardSequence[moveIndex];
        for (let square of JSON.parse(boardState)) {
            this.updateBoard(square);
        }

        if (this.viewingMode) {
            this.running = false;
            return;
        }

        this.viewingMode = true;

        let backToGameButton = document.createElement("button");
        backToGameButton.innerHTML = "Back to Game";
        backToGameButton.id = "backToGameButton";
        backToGameButton.addEventListener("click", this.backToGame.bind(this));

        document.getElementById("main").appendChild(backToGameButton);

        this.running = false;
        
    }

    backToGame() {

        if (this.running) return;
        this.running = true;

        let moves = Array.from(document.querySelectorAll(".move"));
        for (let move of moves) {
            move.className = "move";
        }

        let moveIndex = moves.length - 1;
        let boardState = this.boardSequence[moveIndex];
        try {
            for (let square of JSON.parse(boardState)) {
                this.updateBoard(square);
            }
        } catch (e) {
            console.log(e);
        }

        moves[moveIndex].className = "move curMove";

        this.viewingMode = false;

        document.getElementById("backToGameButton").remove();

        this.running = false;
    }

    handleKeyDown(e) {
        if (this.running) return;

        this.running = true;

        if (e.key == "ArrowLeft") {
            this.showPrevMove();
        } else if (e.key == "ArrowRight") {
            this.showNextMove();
        }
        this.running = false;
    }

    showPrevMove() {
        let moves = Array.from(document.querySelectorAll(".move"));
        let moveIndex = moves.indexOf(document.querySelector(".curMove"));
        if (moveIndex == 0) return;

        let boardState = this.boardSequence[Math.max(moveIndex - 1, 0)];
        for (let square of JSON.parse(boardState)) {
            this.updateBoard(square);
        }

        moves[moveIndex].className = "move";
        moves[Math.max(moveIndex - 1, 0)].className = "move curMove";

        if (this.viewingMode) return;

        this.viewingMode = true;

        let backToGameButton = document.createElement("button");
        backToGameButton.innerHTML = "Back to Game";
        backToGameButton.id = "backToGameButton";
        backToGameButton.addEventListener("click", this.backToGame.bind(this));

        document.getElementById("main").appendChild(backToGameButton);
        
    }

    showNextMove() {
        let moves = Array.from(document.querySelectorAll(".move"));
        let moveIndex = moves.indexOf(document.querySelector(".curMove"));
        if (moveIndex == moves.length - 1 || moves[moveIndex + 1].innerHTML == "") return;
        
        let boardState = this.boardSequence[Math.min(moveIndex + 1, moves.length - 1)];
        for (let square of JSON.parse(boardState)) {
            this.updateBoard(square);
        }

        moves[moveIndex].className = "move";
        moves[Math.min(moveIndex + 1, moves.length - 1)].className = "move curMove";

        if (this.viewingMode) return;

        this.viewingMode = true;

        let backToGameButton = document.createElement("button");
        backToGameButton.innerHTML = "Back to Game";
        backToGameButton.id = "backToGameButton";
        backToGameButton.addEventListener("click", this.backToGame.bind(this));

        document.getElementById("main").appendChild(backToGameButton);

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
            let squareDiv = document.getElementsByClassName(Square.staticToNotation(square.rank, square.file))[0];
            squareDiv.innerHTML = "";
            if (square.piece == null) continue;
            if (square.piece.name == "Pawn" && (square.file == 0 || square.file == 7)) {
                square.piece = new Queen(square.piece.isWhite);
            }
            let img = document.createElement("img");
            img.src = square.piece.image;
            img.className = "piece";
            squareDiv.appendChild(img);
        }
    }

    clearBoardHTML() {
        let squares = document.querySelectorAll(".square");
        for (let square of squares) {
            square.innerHTML = "";
        }
        let backToGameButton = document.getElementById("backToGameButton");
        if (backToGameButton != null) backToGameButton.remove();
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

    static staticToNotation(rank, file) {
        return "" + Board.boardX[rank] + Board.boardY[file];
    }

    toNotation() {
        return "" + Board.boardX[this.rank] + Board.boardY[this.file];
    }

    toString() {
        return "[" + this.rank + ", " + this.file + "]";
    }
}