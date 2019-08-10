//Draw game board
function drawGameBoard(width, height) {
    var horzInterval = (width / 9);
    var vetrInterval = (height / 9);

    //Create game board_______________________

    //Drawing Border and border bold line----
    strokeWeight(4);
    stroke(51);
    //Horizontally
    line(0, 3 * (horzInterval), boardWidth, 3 * (horzInterval));
    line(0, 6 * (horzInterval), boardWidth, 6 * (horzInterval));
    //vertically
    line(3 * (vetrInterval), 0, 3 * (vetrInterval), height);
    line(6 * (vetrInterval), 0, 6 * (vetrInterval), height);
    //end drawing border ----

    // Drawing the white lines of the board
    strokeWeight(2);
    stroke(51);
    //horizontal small lines
    for (var i = 1; i < 9; i++) {
        line(0, i * (horzInterval), boardWidth, i * (vetrInterval));
    }

    //vertical small lines
    for (var i = 1; i < 9; i++) {
        line(i * vetrInterval, 0, i * horzInterval, boardHeight);
    }
    //End of game board_______________________
}

function fillBoxYellow(x, y) {
    fill(255, 255, 0);
    noStroke();
    rect(x - (1 * (width / 9) / 2), (y - (width / 9)) + 19, width / 9, height / 9);
}

function fillBoxGreen(x, y) {
    fill(0, 255, 0);
    noStroke();
    rect(x - (1 * (width / 9) / 2), (y - (width / 9)) + 19, width / 9, height / 9);
}

function printOutNum(quadBoxVal) {
    //we will later change the x, y to an object contaiing the x value and y value
    textSize(80);
    textAlign(CENTER);
    fill(0, 0, 0);
    text(quadBoxVal[2], quadBoxVal[0], quadBoxVal[1]);
}
