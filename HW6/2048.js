/*
{
    author : National Chiao Tung University 0712238 Yan-Tong Lin,
    description :  JS web programming 2020 fall HW 6,
    usage : directly open the hw6.html in the current directory and look at the console,
    license: Apache 2.0,
    notice: this work is done by NCTU 0712238 Yan-Tong Lin with reference to web resources @ 2020/12/1, please explicitly refer to this when using a part of this code,
}
*/

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var statusLabel = document.getElementById('status');
var score = 0;
var size = 4;
var n_add = 1;
var width = canvas.width / size - 6;
// the board, save coordinate and value
var cells = [];
var fontSize;
// game state juding
let win_condition = 2048;
let game_status = 0; // 0: can_move, 1: win: -1:lose


status_msg = ["you lose :(", "fighting!", "you win!!!"];

init_game();

//utility functions

//return a random int in [l,r]
function rand_int(l, r)
{
  return l + Math.floor(Math.random() * (r-l+1));
}

// check if in range 
function inrange(x)
{
  return (x >= 0 && x < size); 
}
// end of utility functions


// change size if size is reasonable
changeSize.onclick = function () {
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    size = sizeInput.value;
    width = canvas.width / size - 6;
    console.log(sizeInput.value);
    canvasClean();
    init_game();
  }
}

// init a cell
function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

// reset the cell 2d array
function reset_cells() {
  var i, j;
  for(i = 0; i < size; i++) {
    cells[i] = [];
    for(j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

// draw the cells (using rect and data from cells 2d array)
function drawCell(cell) {
  context.beginPath();
  context.rect(cell.x, cell.y, width, width);
  switch (cell.value){
    case 0 : context.fillStyle = '#A9A9A9'; break;
    case 2 : context.fillStyle = '#eee4da'; break;
    case 4 : context.fillStyle = '#ede0c8'; break;
    case 8 : context.fillStyle = '#f2b179'; break;
    case 16 : context.fillStyle = '#f59563'; break;
    case 32 : context.fillStyle = '#f67c5f'; break;
    case 64 : context.fillStyle = '#f65e3b'; break;
    case 128 : context.fillStyle = '#edcf72'; break;
    case 256 : context.fillStyle = '#edcc61'; break;
    case 512 : context.fillStyle = '#edc850'; break;
    case 1024 : context.fillStyle = '#edc53f'; break;
    case 2048 : context.fillStyle = '#edc22e'; break;
    case 4096 : context.fillStyle = '#ffbf00'; break;
    default : context.fillStyle = '#ff0080';
  }
  context.fill();
  if (cell.value) {
    fontSize = width / 2;
    context.font = fontSize + 'px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
}

function canvasClean() {
  context.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!loss) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      moveUp(); 
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown(); 
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft(); 
    }
    scoreLabel.innerHTML = 'Score : ' + score;  
    //console.log((status+1));
    statusLabel.innerHTML = 'Status : ' + status_msg[(game_status+1)];
  }
}

function reset_param(){
  loss = false;
  canvas.style.opacity = '1.0';
  score = 0;
  game_status  = 0;
}

function init_game() {
  //recover initial
  reset_param();
  reset_cells();
  // init two times
  round_callback();
  round_callback();
}

function finishGame() {
  canvas.style.opacity = '0.5';
  loss = true;
}

function drawAllCells() {
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

/*check if finished, if not + n_add cells to cells and draw*/
function round_callback() {
  // check free space 
  let free_cell = 0;
  for(let x = 0; x < size; x++)
  for(let y = 0; y < size; y++)
  if(cells[x][y].value == 0) {
    free_cell += 1;
  }
  // add new cells
  to_fill = Math.min(n_add, free_cell);
  // this is quick since (15/16)^n -> 0 fast 
  while(to_fill > 0) {
    var rx = rand_int(0, size-1);
    var ry = rand_int(0, size-1);
    if(!cells[rx][ry].value) {
      cells[rx][ry].value = 2 * rand_int(1, 2);
      to_fill--;
    }
  }
  drawAllCells();
  // ckeck/judge end game, using global status
  let can_move = false;
  for(let x = 0; x < size; x++)
  for(let y = 0; y < size; y++)
  {
    if(cells[x][y].value == 0) {
      can_move = true;
      console.log("case1");
    }else if(cells[x][y].value == win_condition){
      game_status  = 1;
      console.log("win");
    }else{
      for(let dx = 0; dx <= 1; dx++)
      for(let dy = 0; dy <= 1; dy++)
      {
        let nx = x+dx;
        let ny = y+dy;
        if((!(dx==dy)) && inrange(nx) && inrange(ny)) // dx!=dy => only 0 1 or 1 0
        { 
          console.log("checking"+" "+ (nx) + " " + (ny) + " with " + x + " " + y);
          console.log(cells[x][y].value + " and " + cells[nx][ny].value)
          if(cells[x][y].value == cells[nx][ny].value)
          {
            can_move = true;
            console.log("case2");
          }
        }
      }
    }
  }
  // if cannot move and does not have 2048 => lose
  if(can_move == false && game_status  != 1) game_status  = -1;
  // end game if win or lose
  if(game_status  != 0) {
    finishGame();
    return;
  }
}

function moveRight () {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = size - 2; j >= 0; j--) {
      if(cells[i][j].value) {
        coll = j;
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  round_callback();
}

function moveLeft() {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = 1; j < size; j++) {
      if(cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  round_callback();
}

function moveUp() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = 1; i < size; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  round_callback();
}

function moveDown() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = size - 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  round_callback();
}