import Piece from './piece.js'

export default class King extends Piece {
    constructor(isWhite) {
        super("King", "K", isWhite? "resources/pieces/wk.svg" : "resources/pieces/bk.svg", isWhite);
    }

    getValidMoves(board, square) {
        let moves = [];
        let squares = board.getBoard();

        for (let i = -1; i <= 1; i++) {
            if (square.rank + i < 0 || square.rank + i > 7) continue;
            for (let j = -1; j <= 1; j++) {
                if (square.file + j < 0 || square.file + j > 7) continue;
                let checkSquare = squares[square.rank + i][square.file + j];
                if (checkSquare.getPiece() != null) {
                    if (checkSquare.getPiece().isWhite != this.isWhite) {
                        moves.push(checkSquare);
                    }
                } else {
                    moves.push(checkSquare);
                }
            }
        }

        return moves;
    }
}