import Piece from './piece.js'

export default class Knight extends Piece {
    constructor(isWhite) {
        super("Knight", "N", isWhite? "resources/pieces/wn.svg" : "resources/pieces/bn.svg", isWhite);
    }

    getValidMoves(board, square) {
        let moves = [];
        let squares = board.getBoard();


        for (let i = -2; i <= 2; i++) {
            if (i == 0) continue;
            if (square.rank + i < 0 || square.rank + i > 7) continue;
            for (let j = -2; j <= 2; j++) {
                if (j == 0 || Math.abs(i) == Math.abs(j)) continue;
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