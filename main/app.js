var $gamePopup = $('#gamePopup')[0];
var $gameForm = $('#gameForm')[0];

$gameForm.addEventListener("submit", function(event) {   
  event.preventDefault();
  const formData = new FormData(this);
  let data = {};
  for(let [name, value] of formData) {
    data[name] = value;
   //  alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
  }
  validateData(data);
  console.log(data);
  newGame(data);
  $gamePopup.style.display = "none";
});

function validateData(data) {
    if(game.validate_fen(data.startFen).valid == false) {
        data.startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    }
}


function newGame(data = {color: "white", startFen: ""}) {
    console.log(data.startFen);
    board = Chessboard('myBoard', getConfig(data.startFen));
    game = new Chess(data.startFen);
   
    if(board.orientation() != data.color) {
      board.flip();
    }
    let player = board.orientation();
    $status.html(player + " to move")
    $fen.html(game.fen())
    $pgn.html(game.pgn())
    // hide($startButton[0]);
    // hide($clearButton[0]);
    // show($boardEditor[0]);
    if(AiToMove()) {
      AImove();
    }
    
}

function AiToMove() {
    return game.turn() !== board.orientation().charAt(0);
}

$("#newGame").on("click", () => {
  $gamePopup.style.display = "block";
})

$(".close").on("click", () => {
  $gamePopup.style.display = "none";
}) 

// the $gamePopup takes up entire window except the inner popup with text,
// so when anywhere but the inner text window is clicked, the popup closes
window.onclick = (e) => {
    if(e.target == $gamePopup) {
      $gamePopup.style.display = "none";
    }
  }
  