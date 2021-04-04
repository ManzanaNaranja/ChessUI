class FurryBot {

    bestMove(fen) {
        let game = new Chess(fen);
        if (game.game_over()) return
        var possibleMoves = game.moves()
        var randomIdx = Math.floor(Math.random() * possibleMoves.length)
        return possibleMoves[randomIdx];
    }
}