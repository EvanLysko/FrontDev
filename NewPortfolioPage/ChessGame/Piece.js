//chess piece default class and the classes for each piece type

export default class Piece {
    constructor(name, symbol, image, isWhite, square) {
        this.name = name;
        this.symbol = symbol;
        this.image = image;
        this.isWhite = isWhite;
    }

    getImgSrc() {
        return this.image;
    }

    getValidMoves(params) {

    }

    toString() {
        return this.name;
    }
}

