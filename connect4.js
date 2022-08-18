/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(WIDTH,HEIGHT) {
    board = new Array(WIDTH);
    for(let i = 0;i < WIDTH;i++){
        board[i] = new Array(HEIGHT);
    }
    return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */
// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board')


  // TODO: add comment for this code
  // creating new tr element where use will click on to add pieces
  const top = document.createElement("tr"); 
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    headCell.setAttribute('class','topRow')
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creating individual cells by looping over the width and height
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);

      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// TODO: write the real version of this, rather than always returning 0
function findSpotForCol(x) {
  for(let i = HEIGHT-1;i>=0;i--){
    if(board[i][x]==undefined){return i}
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

// TODO: make a div and insert into correct table cell
function placeInTable(y, x) {
  let pieceDiv = document.createElement('div')
  pieceDiv.classList.add('piece')
  if(currPlayer == 1) {pieceDiv.classList.add('p1')}
  else if(currPlayer == 2) {pieceDiv.classList.add('p2')}
  let cell = document.getElementById(`${y}-${x}`)
  cell.append(pieceDiv)
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
  let topColumn = document.getElementById('column-top')
  topColumn.style.pointerEvents = 'none'
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }


  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  if(y==0){
    document.getElementById(x).style.pointerEvents = 'none'
  }
  
  
  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  function tie(board){
    if(board[0].includes(undefined) === false){
      return endGame('its a tie')
    }
  }
  tie(board)
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer ++ 
  if (currPlayer > 2){currPlayer = 1}
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(WIDTH,HEIGHT);
makeHtmlBoard();
