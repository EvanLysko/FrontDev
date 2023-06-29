import Piece from './piece.js'

export default class Bishop extends Piece {
    constructor(isWhite) {
        super("Bishop", "B", isWhite? "resources/pieces/wb.svg" : "resources/pieces/bb.svg", isWhite);
    }

    getValidMoves(board, square) {
        let moves = [];
        let squares = board.getBoard();

    
        for (let i = square.rank + 1, j = square.file + 1; i < 8 && j < 8; i++, j++) {
            let checkSquare = squares[i][j];
            if (checkSquare.getPiece() != null) {
                if (checkSquare.getPiece().isWhite != this.isWhite) {
                    moves.push(checkSquare);
                }
                break;
            }
            moves.push(checkSquare);
        }
        for (let i = square.rank - 1, j = square.file - 1; i >= 0 && j >= 0; i--, j--) {
            let checkSquare = squares[i][j];
            if (checkSquare.getPiece() != null) {
                if (checkSquare.getPiece().isWhite != this.isWhite) {
                    moves.push(checkSquare);
                }
                break;
            }
            moves.push(checkSquare);
        }
        for (let i = square.rank + 1, j = square.file - 1; i < 8 && j >= 0; i++, j--) {
            let checkSquare = squares[i][j];
            if (checkSquare.getPiece() != null) {
                if (checkSquare.getPiece().isWhite != this.isWhite) {
                    moves.push(checkSquare);
                }
                break;
            }
            moves.push(checkSquare);
        }
        for (let i = square.rank - 1, j = square.file + 1; i >= 0 && j < 8; i--, j++) {
            let checkSquare = squares[i][j];
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