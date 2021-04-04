var board = null
var game = new Chess()
var AI = new FurryBot();
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

function onDragStart(source, piece, position, orientation) {
    if(game.game_over()) return false;
    if((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop (source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  
    updateStatus()
}

function applyMove(move) {
    game.move(move);
    board.position(game.fen())
    updateStatus();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen())
    AImove();
}

function AImove() {
  applyMove(AI.bestMove(game.fen()))
}

function updateStatus () {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
}

function getConfig(start = "start") {
  var config = {
    draggable: true,
    position: `${start}`,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd, onSnapEnd
  } 
  return config;
}



var config = {
    draggable: true,
    position: 'start',
    showNotation: false,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd, onSnapEnd
}

board = Chessboard('myBoard', config);

// https://chessboardjs.com/examples#5000