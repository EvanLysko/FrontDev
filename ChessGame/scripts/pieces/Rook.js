import Piece from './piece.js'

export default class Rook extends Piece {
    constructor(isWhite) {
        super("Rook", "R", isWhite? "resources/pieces/wr.svg" : "resources/pieces/br.svg", isWhite);
        this.castleAble = true;
    }

    getValidMoves(board, square) {
        let moves = [];
        let squares = board.getBoard();

        
        for (let i = square.rank + 1; i < 8; i++) {
            let checkSquare = squares[i][square.file];
            if (checkSquare.getPiece() != null) {
                if (checkSquare.getPiece().isWhite != this.isWhite) {
                    moves.push(checkSquare);
                }
                break;
            }
            moves.push(checkSquare);
        }
        for (let i = square.rank - 1; i >= 0; i--) {
            let checkSquare = squares[i][square.file];
            if (checkSquare.getPiece() != null) {
                if (checkSquare.getPiece().isWhite != this.isWhite) {
                    moves.push(checkSquare);
                }
                break;
            }
            moves.push(checkSquare);
        }
        for (let i = square.file + 1; i < 8; i++) {
            let checkSquare = squares[square.rank][i];
            if (checkSquare.getPiece() != null) {
                if (checkSquare.getPiece().isWhite != this.isWhite) {
                    moves.push(checkSquare);
                }
                break;
            }
            moves.push(checkSquare);
        }
        for (let i = square.file - 1; i >= 0; i--) {
            let checkSquare = squares[square.rank][i];
            if (checkSquare.getPiece() != null) {
                if (checkSquare.getPiece().isWhite != this.isWhite) {
                    moves.push(checkSquare);
                }
                break;
            }
            moves.push(checkSquare);
        }



        return moves;
    }
}