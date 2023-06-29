import Piece from './piece.js'
import Bishop from './Bishop.js'
import Rook from './Rook.js'

export default class Queen extends Piece {
    constructor(isWhite) {
        super("Queen", "Q", isWhite? "resources/pieces/wq.svg" : "resources/pieces/bq.svg", isWhite);
    }

    getValidMoves(board, square) {
        let moves = [];
        let squares = board.getBoard();

        moves = moves.concat(moves, new Bishop(this.isWhite).getValidMoves(board, square));
        moves = moves.concat(moves, new Rook(this.isWhite).getValidMoves(board, square));


        return moves;
    }

}