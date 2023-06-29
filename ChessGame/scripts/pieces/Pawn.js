import Piece from './piece.js'

export default class Pawn extends Piece {
    constructor(isWhite) {
        super("Pawn", "", isWhite? "resources/pieces/wp.svg" : "resources/pieces/bp.svg", isWhite);
        this.fileMod = isWhite? 1 : -1;
    }

    getValidMoves(board, square) {
        let squares = board.getBoard();
        let moves = {};
        moves["moves"] = [];
        if (square.file + this.fileMod >= 0 || square.file + this.fileMod > 7) {
            let moveSquare1 = squares[square.rank][square.file + this.fileMod];
            let moveSquare2 = squares[square.rank][square.file + this.fileMod * 2];

            if (moveSquare1.piece == null) {
                moves["moves"].push(moveSquare1);
            }
            if ((this.isWhite && square.file == 1) || (!this.isWhite && square.file == 6) && moveSquare1.piece == null && moveSquare2.piece == null) {
                moves["moves"].push(moveSquare2);
            }

        }
        moves["attacks"] = [];
        if (square.file + this.fileMod >= 0 || square.file + this.fileMod > 7) {
            if (square.rank + 1 < 8) {
                let attackSquare1 =  squares[square.rank + 1][square.file + this.fileMod];
                if (attackSquare1.piece != null && attackSquare1.piece.isWhite != this.isWhite) {
                    moves["attacks"].push(attackSquare1);
                }
            }
            if (square.rank - 1 >= 0) {
                let attackSquare2 = squares[square.rank - 1][square.file + this.fileMod];
                if (attackSquare2.piece != null && attackSquare2.piece.isWhite != this.isWhite) {
                    moves["attacks"].push(attackSquare2);
                }
            }
        }

        //handle en passant
        if (board.enPassant != null) {
            if (board.enPassant.file == square.file && (board.enPassant.rank == square.rank + 1 || board.enPassant.rank == square.rank - 1)) {
                moves["attacks"].push(squares[board.enPassant.rank][board.enPassant.file + this.fileMod]);
            }
        }


        return moves;
    }
}