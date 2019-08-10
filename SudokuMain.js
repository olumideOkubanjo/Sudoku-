boardHeight = 800;
boardWidth = 800;

var gameOn = false;

var canvas;
var gameGrid;

var selectedCel = {
  xPos: 0,
  yPos: 0,
  celCol: (255, 255, 255),
  mouseCol: 0,
  mouseRow: 0,
  quadBox: [],
};

var mouseSelect = false;
var keyOpen = false;

var easyOn, mediumOn, hardOn = false;

//Open show image file corresponding to the difficulty and only show the bolded values
//[quad,box,number]
var easyValsRow1 = [
  [1, 4, 6],
  [1, 5, 8],
  [1, 7, 1],
  [1, 8, 9],
  [2, 1, 2],
  [2, 2, 6],
  [2, 5, 7],
  [2, 9, 4],
  [3, 1, 7],
  [3, 3, 1],
  [3, 5, 9],
  [3, 7, 5]
];
var easyValsRow2 = [
  [4, 1, 8],
  [4, 2, 2],
  [4, 6, 4],
  [4, 8, 5],
  [5, 1, 1],
  [5, 4, 6],
  [5, 6, 2],
  [5, 9, 3],
  [6, 2, 4],
  [6, 4, 9],
  [6, 8, 2],
  [6, 9, 8]
];
var easyValsRow3 = [
  [7, 3, 9],
  [7, 5, 4],
  [7, 7, 7],
  [7, 9, 3],
  [8, 1, 3],
  [8, 5, 5],
  [8, 8, 1],
  [8, 9, 8],
  [9, 2, 7],
  [9, 3, 4],
  [9, 5, 3],
  [9, 6, 6]
];

//Leave these for later
var mediumValsRow1 = [
  [1, 2, 2],
  [1, 4, 5],
  [1, 5, 8],
  [2, 1, 6],
  [2, 3, 8],
  [2, 6, 9],
  [2, 8, 4],
  [3, 4, 7],
];
var mediumValsRow2 = [
  [4, 1, 3],
  [4, 2, 7],
  [4, 4, 6],
  [4, 9, 8],
  [6, 1, 5],
  [6, 6, 4],
  [6, 8, 1],
  [6, 9, 3],
];
var mediumValsRow3 = [
  [7, 6, 9],
  [8, 2, 2],
  [8, 4, 8],
  [8, 7, 3],
  [8, 9, 6],
  [9, 5, 3],
  [9, 6, 6],
  [9, 8, 9],

];

//Leave these for later
var hardValsRow1;
var hardValsRow2;
var hardValsRow3;

function setup() {
  createCanvas(boardHeight, boardWidth);
  gameGrid = setUpgamegrid();
  println(gameGrid);
}


function draw() {
  if (gameOn == true) {
    strokeWeight(4);
    stroke(51);
    background(255);
    updateMouseYellow();
    drawGameBoard(boardHeight, boardWidth);
    //Game board overs the entire canva
    printGrid();

    //Print Intial Vals depending on easy meduim or hard
    printDifficultyValues();


  }
}

function printDifficultyValues() {
  if (easyOn == true) {
    for (var x = 0; x < easyValsRow1.length; x++) {
      change(easyValsRow1[x][0], easyValsRow1[x][1], easyValsRow1[x][2]);
      printOutNum(getValIn(easyValsRow1[x][0], easyValsRow1[x][1]));

      change(easyValsRow2[x][0], easyValsRow2[x][1], easyValsRow2[x][2]);
      printOutNum(getValIn(easyValsRow2[x][0], easyValsRow2[x][1]));

      change(easyValsRow3[x][0], easyValsRow3[x][1], easyValsRow3[x][2]);
      printOutNum(getValIn(easyValsRow3[x][0], easyValsRow3[x][1]));
    }
  } else if (mediumOn == true) {
    for (var x = 0; x < mediumValsRow1.length; x++) {
      change(mediumValsRow1[x][0], mediumValsRow1[x][1], mediumValsRow1[x][2]);
      printOutNum(getValIn(mediumValsRow1[x][0], mediumValsRow1[x][1]));

      change(mediumValsRow2[x][0], mediumValsRow2[x][1], mediumValsRow2[x][2]);
      printOutNum(getValIn(mediumValsRow2[x][0], mediumValsRow2[x][1]));

      change(mediumValsRow3[x][0], mediumValsRow3[x][1], mediumValsRow3[x][2]);
      printOutNum(getValIn(mediumValsRow3[x][0], mediumValsRow3[x][1]));
    }
  }
  
  
}

function updateMouseYellow() {
  if (mouseSelect != true) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      var mCol = floor(mouseX / (width / 9));
      var mRow = floor(mouseY / (height / 9));
      var mfX = gameGrid[mRow][mCol].x;
      var mfy = gameGrid[mRow][mCol].y;
      fillBoxYellow(mfX, mfy);
    } else(
      fillBoxYellow(-50, gameGrid[0][0].y)
    )
  }
  if (mouseSelect == true) {
    fillBoxYellow(selectedCel.xPos, selectedCel.yPos);
    keyOpen = true;
  }
}


function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    mouseSelect = true;
    // keyOpen = true;
    selectedCel.mouseCol = floor(mouseX / (width / 9));
    selectedCel.mouseRow = floor(mouseY / (height / 9));
    selectedCel.quadBox = rowAndColToQuadrantAndBox(selectedCel.mouseRow, selectedCel.mouseCol);
    selectedCel.xPos = gameGrid[selectedCel.mouseRow][selectedCel.mouseCol].x;
    selectedCel.yPos = gameGrid[selectedCel.mouseRow][selectedCel.mouseCol].y;
  }
}
//
function keyTyped() {
  if (keyOpen == true) {
    if (keyCode == 49 || keyCode == 97) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 1);
    } else if (keyCode == 50 || keyCode == 98) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 2);
    } else if (keyCode == 51 || keyCode == 99) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 3);
    } else if (keyCode == 52 || keyCode == 100) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 4);
    } else if (keyCode == 53 || keyCode == 101) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 5);
    } else if (keyCode == 54 || keyCode == 102) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 6);
    } else if (keyCode == 55 || keyCode == 103) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 7);
    } else if (keyCode == 56 || keyCode == 104) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 8);
    } else if (keyCode == 57 || keyCode == 105) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 9);
    } else if (keyCode == 96 || keyCode == 48) {
      change(selectedCel.quadBox[0], selectedCel.quadBox[1], 0);
    }
    mouseSelect = false;
  }
  // println(gameGrid[0].join(";"));
  // localStorage.setItem(userNameProg, gameGrid.join(";"));

}

function keyPressed() {
  if (keyCode == 32) {
    if (gameGrid[selectedCel.mouseRow][selectedCel.mouseCol].number == easySolvedGrid[selectedCel.mouseRow][selectedCel.mouseCol]) {
      $(".correctOrNot").css("background-color", "yellow");
      println("correct");

    } else {
      $(".correctOrNot").css("background-color", "Red");
    }
  }
  /* if(meduimSave == true){
	  println("Medium");
  } */
}

function printGrid() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var bQl = rowAndColToQuadrantAndBox(i, j);
      if (getValIn(bQl[0], bQl[1])[2] != 0) {
        printOutNum(getValIn(bQl[0], bQl[1]));
      }
    }
  }

  // if(easyOn == true){
  //     for(var x = 0; x< 18;x++){
  //         change(int(random(1,10)),int(random(1,10)),int(random(1,10)));
  //     }
  //     easyOn = false;
  // }
}

function giveValue() {
  println("Correct Value");
}
