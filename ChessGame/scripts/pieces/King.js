import Piece from './piece.js'

export default class King extends Piece {
    constructor(isWhite) {
        super("King", "K", isWhite? "resources/pieces/wk.svg" : "resources/pieces/bk.svg", isWhite);
    }

    move(square) {
        //TODO
    }

    captured(params) {
        //TODO
    }

    getValidMoves(params) {
        //TODO
    }

    isValidMove(params) {
        //TODO
    }
}