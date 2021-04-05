$boardEditor = $('#boardEditor')
$fenEditorForm = $('#fenEditorForm')

$boardEditor.on("click", () => {
    if(board != null) board.destroy();
    board = Chessboard('myBoard', {
        draggable: true,
        dropOffBoard: 'trash',
        showNotation: false,
        sparePieces: true,
        onChange: onChange
    })


    removeAllChildNodes($('.boardEditorGroup')[0]);

    $('.boardEditorGroup').append(`<button id="startBtn">Start Position</button>`);
    $('.boardEditorGroup').append(`<button id="clearBtn">Clear Board</button>`);
    $startButton = $('#startBtn');
    $clearButton = $('#clearBtn');

    $startButton.on('click', board.start)
    $clearButton.on('click', board.clear) 

    show($fenEditorForm[0]);

    $status.html("");
    $fen.html("");
    $pgn.html("");
    
})

function onChange(oldPos, newPos) {
    $fen.html(ChessBoard.objToFen(newPos) + getEndOfFen());
}

function removeAllChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

$gameForm.addEventListener("submit" , () => {
    removeAllChildNodes($('.boardEditorGroup')[0]);
    hide($fenEditorForm[0]);
});

$fenEditorForm[0].addEventListener("change", () => {
    $fen.html(board.fen() + getEndOfFen());
})

function getEndOfFen() {
    let formData = new FormData($fenEditorForm[0]);
    let data = {castle: ""};
    for(let [name, value] of formData) {
      if(name == "color") {
        data[name] = value;
      } else {
        data.castle += value;
      }
      
    }
    data.castle = (data.castle == "") ? "-" : data.castle;
    return ` ${data.color} ${data.castle} - 0 1`
}

function show(ele) {
    ele.className = ele.className.replace("hidden", "");
}

function hide(ele) {
    ele.className = (ele.className + " hidden").trim();
}



