import Piece from './piece.js'

export default class Queen extends Piece {
    constructor(isWhite) {
        super("Queen", "Q", isWhite? "resources/pieces/wq.svg" : "resources/pieces/bq.svg", isWhite);
    }
}