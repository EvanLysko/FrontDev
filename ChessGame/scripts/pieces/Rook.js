import Piece from './piece.js'

export default class Rook extends Piece {
    constructor(isWhite) {
        super("Rook", "R", isWhite? "resources/pieces/wr.svg" : "resources/pieces/br.svg", isWhite);
    }
}