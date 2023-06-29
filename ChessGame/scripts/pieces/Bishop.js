import Piece from './piece.js'

export default class Bishop extends Piece {
    constructor(isWhite) {
        super("Bishop", "B", isWhite? "resources/pieces/wb.svg" : "resources/pieces/bb.svg", isWhite);
    }
}