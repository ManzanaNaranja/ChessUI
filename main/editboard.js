$boardEditor = $('#boardEditor')

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

    $status.html("");
    $fen.html("");
    $pgn.html("");
    
})

function onChange(oldPos, newPos) {
    $fen.html(ChessBoard.objToFen(newPos));
}

function removeAllChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

$gameForm.addEventListener("submit" , () => {
    removeAllChildNodes($('.boardEditorGroup')[0]);
});

