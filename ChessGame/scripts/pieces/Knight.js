import Piece from './piece.js'

export default class Knight extends Piece {
    constructor(isWhite) {
        super("Knight", "N", isWhite? "resources/pieces/wn.svg" : "resources/pieces/bn.svg", isWhite);
    }
}