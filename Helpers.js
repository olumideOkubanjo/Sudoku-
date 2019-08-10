//Only show the player the numbers that are bolded
var easySolvedGrid, mediumSolvedGrid, hardSolvedGrid;
var easySave, mediumSave, hardSave = false;

easySolvedGrid = [
    [4, 3, 5, 2, 6, 9, 7, 8, 1],
    [6, 8, 2, 5, 7, 1, 4, 9, 3],
    [1, 9, 7, 8, 3, 4, 5, 6, 2],
    [8, 2, 6, 1, 9, 5, 3, 4, 7],
    [3, 7, 4, 6, 8, 2, 9, 1, 5],
    [9, 5, 1, 7, 4, 3, 6, 2, 8],
    [5, 1, 9, 3, 2, 6, 8, 7, 4],
    [2, 4, 8, 9, 5, 7, 1, 3, 6],
    [7, 6, 3, 4, 1, 8, 2, 5, 9],
];

mediumSolvedGrid =[
    [1,2,3,6,7,8,9,4,5],
    [5,8,4,2,3,9,7,6,1],
    [9,6,7,1,4,5,3,2,8],
    [3,7,2,4,6,1,5,8,9],
    [6,9,1,5,8,3,2,7,4],
    [4,5,8,7,9,2,6,1,3],
    [8,3,6,9,2,4,1,5,7],
    [2,1,9,8,5,7,4,3,6],
    [7,4,5,3,1,6,8,9,2],
];

hardSolvedGrid = [
    [2,7,6,3,1,4,9,5,8],
    [8,5,4,9,6,2,7,1,3],
    [9,1,3,8,7,5,2,6,4],
    [4,6,8,1,2,7,3,9,5],
    [5,9,7,4,3,8,6,2,1],
    [1,3,2,5,9,6,4,8,7],
    [3,2,5,7,8,9,1,4,6],
    [6,4,1,2,5,3,8,7,9],
    [7,8,9,6,4,1,5,3,2],
];
//Loop though coloms
//then Loop though rows
//then add an x, y and a value(number displayed on the screen) attribiute to each object;
// //Looping though the grid
function setUpgamegrid(grid) {
    var initialX = (boardWidth / 9) / 2;
    var initialY = (boardHeight / 9) - 20;
    var tempGrid = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    // Loop that sets up the values
    for (var i = 1; i < 10; i++) {
        tempGrid[i - 1] = [];
        for (var t = 1; t < 10; t++) {
            tempGrid[i - 1][t - 1] = new Values(t - 1, initialY, initialX);
        }
        initialY += height / 8.93; //DOnt mind the value, I testing the number to fit the box
    }
    grid = tempGrid.slice();
    return grid;
}

//simplifying the values; changing them from row, colum to quad, box
function getValIn(quadNum, boxNum) {
    var tempX;
    var tempY;
    var tempNum;
    var tempRow;
    var tempCol;
    //This function should return a list contaning three values, x,y and number
    var quad1List = [gameGrid[0].slice(0, 3), gameGrid[1].slice(0, 3), gameGrid[2].slice(0, 3)];
    var quad2List = [gameGrid[0].slice(3, 6), gameGrid[1].slice(3, 6), gameGrid[2].slice(3, 6)];
    var quad3List = [gameGrid[0].slice(6, 9), gameGrid[1].slice(6, 9), gameGrid[2].slice(6, 9)];
    var quad4List = [gameGrid[3].slice(0, 3), gameGrid[4].slice(0, 3), gameGrid[5].slice(0, 3)];
    var quad5List = [gameGrid[3].slice(3, 6), gameGrid[4].slice(3, 6), gameGrid[5].slice(3, 6)];
    var quad6List = [gameGrid[3].slice(6, 9), gameGrid[4].slice(6, 9), gameGrid[5].slice(6, 9)];
    var quad7List = [gameGrid[6].slice(0, 3), gameGrid[7].slice(0, 3), gameGrid[8].slice(0, 3)];
    var quad8List = [gameGrid[6].slice(3, 6), gameGrid[7].slice(3, 6), gameGrid[8].slice(3, 6)];
    var quad9List = [gameGrid[6].slice(6, 9), gameGrid[7].slice(6, 9), gameGrid[8].slice(6, 9)];

    var quadSelected;
    if (quadNum == 1) {
        quadSelected = quad1List;
    } else if (quadNum == 2) {
        quadSelected = quad2List;
    } else if (quadNum == 3) {
        quadSelected = quad3List;
    } else if (quadNum == 4) {
        quadSelected = quad4List;
    } else if (quadNum == 5) {
        quadSelected = quad5List;
    } else if (quadNum == 6) {
        quadSelected = quad6List;
    } else if (quadNum == 7) {
        quadSelected = quad7List;
    } else if (quadNum == 8) {
        quadSelected = quad8List;
    } else if (quadNum == 9) {
        quadSelected = quad9List;
    }

    //checking the box
    if (boxNum == 1 || boxNum == 2 || boxNum == 3) {
        tempY = quadSelected[0][0].y;
        tempRow = 0;
    } else if (boxNum == 4 || boxNum == 5 || boxNum == 6) {
        tempY = quadSelected[1][0].y;
        tempRow = 1;
    } else if (boxNum == 7 || boxNum == 8 || boxNum == 9) {
        tempY = quadSelected[2][0].y;
        tempRow = 2;
    }

    if (boxNum == 1 || boxNum == 4 || boxNum == 7) {
        tempX = quadSelected[0][0].x;
        tempCol = 0;
    } else if (boxNum == 2 || boxNum == 5 || boxNum == 8) {
        tempX = quadSelected[0][1].x;
        tempCol = 1;
    } else if (boxNum == 3 || boxNum == 6 || boxNum == 9) {
        tempX = quadSelected[0][2].x;
        tempCol = 2;
    }
    tempNum = quadSelected[tempRow][tempCol].number;
    var final = [tempX, tempY, tempNum];
    return final;
}

function change(quad, box, newNum) {
    var tempCol = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var newTempCol;
    var finalTempCol;
    var tempRow = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var newTempRow;
    var finalTempRow;

    //Row Calc
    if (quad == 1 || quad == 2 || quad == 3) {
        // newTempRow = tempRow.splice(2,5);
        newTempRow = [tempRow[0], tempRow[1], tempRow[2]];
    } else if (quad == 4 || quad == 5 || quad == 6) {
        newTempRow = [tempRow[3], tempRow[4], tempRow[5]];
    } else if (quad == 7 || quad == 8 || quad == 9) {
        newTempRow = [tempRow[6], tempRow[7], tempRow[8]];
    }

    if (box == 1 || box == 2 || box == 3) {
        finalTempRow = newTempRow[0];
    } else if (box == 4 || box == 5 || box == 6) {
        finalTempRow = newTempRow[1];
    } else if (box == 7 || box == 8 || box == 9) {
        finalTempRow = newTempRow[2];
    }
    //Col Calc
    if (quad == 1 || quad == 4 || quad == 7) {
        newTempCol = [tempCol[0], tempCol[1], tempCol[2]];
    } else if (quad == 2 || quad == 5 || quad == 8) {
        newTempCol = [tempCol[3], tempCol[4], tempCol[5]];
    } else if (quad == 3 || quad == 6 || quad == 9) {
        newTempCol = [tempCol[6], tempCol[7], tempCol[8]];
    }

    if (box == 1 || box == 4 || box == 7) {
        finalTempCol = newTempCol[0];
    } else if (box == 2 || box == 5 || box == 8) {
        finalTempCol = newTempCol[1];
    } else if (box == 3 || box == 6 || box == 9) {
        finalTempCol = newTempCol[2];
    }
    gameGrid[finalTempRow][finalTempCol].number = newNum;
}

function rowAndColToQuadrantAndBox(row, col) {
    var initTempBox = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var newTempBox;
    var finalTempBox;
    var initTempQuad = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var newTempQuad;
    var finalTempQuad;

    //Final quad
    if (row == 0 || row == 1 || row == 2) {
        newTempQuad = [initTempQuad[0], initTempQuad[1], initTempQuad[2]];
    } else if (row == 3 || row == 4 || row == 5) {
        newTempQuad = [initTempQuad[3], initTempQuad[4], initTempQuad[5]];
    } else if (row == 6 || row == 7 || row == 8) {
        newTempQuad = [initTempQuad[6], initTempQuad[7], initTempQuad[8]];
    }

    if (col == 0 || col == 1 || col == 2) {
        finalTempQuad = newTempQuad[0];
    } else if (col == 3 || col == 4 || col == 5) {
        finalTempQuad = newTempQuad[1];
    } else if (col == 6 || col == 7 || col == 8) {
        finalTempQuad = newTempQuad[2];
    }

    //Final Box
    if (row == 0 || row == 3 || row == 6) {
        newTempBox = [initTempBox[0], initTempBox[1], initTempBox[2]];
    } else if (row == 1 || row == 4 || row == 7) {
        newTempBox = [initTempBox[3], initTempBox[4], initTempBox[5]];
    } else if (row == 2 || row == 5 || row == 8) {
        newTempBox = [initTempBox[6], initTempBox[7], initTempBox[8]];
    }

    if (col == 0 || col == 3 || col == 6) {
        finalTempBox = newTempBox[0];
    } else if (col == 1 || col == 4 || col == 7) {
        finalTempBox = newTempBox[1];
    } else if (col == 2 || col == 5 || col == 8) {
        finalTempBox = newTempBox[2];
    }
    var tempFinalList = [finalTempQuad, finalTempBox];
    return tempFinalList;
}


function saveGrameGridInLocalStorage(saveName) {
    var rowString;
    var totalList = [];

	if(mediumSave == true){
		println("Medium");
	}

    for (var i = 0; i < gameGrid[0].length; i++) {
        for (var x = 0; x < gameGrid[0].length; x++) {
            totalList += gameGrid[i][x].number;
        }
        totalList += ";";
    }
    var difficultyLevel;
    if(easySave == true){
      difficultyLevel = "Easy";
    }else if(mediumSave == true){
      difficultyLevel = "Medium";
    }else if(hardSave == true){
      difficultyLevel = "Hard";
    }
    localStorage.setItem(saveName, totalList + " , " + difficultyLevel);

}

//For for the creation
function saveInfoAndStartGame() {
    saveOn = true;
    var checkValue = [];
    var tempfirstName = $(".firstName").val();
    var tempLastName = $(".lastName").val();
    var tempUsername = $(".cUserName").val();
    var tempPass = $(".cPassword").val();
    var tempEmail = $(".cEmail").val();
    var tempConfPassword = $(".cConfPassword").val();

    if (tempUsername.length < 5) {
        $(".userNameReq").show(1);
    } else {
        checkValue.push(1);
    }

    if (tempPass.length < 5) {
        $(".passReq").show(1);
    } else {
        checkValue.push(1);
    }

    if (tempPass == tempConfPassword) {
        checkValue.push(1);
    } else {
        $(".confPassReq").show(1);
    }

    if (checkValue.length == 3) {
        //Save user info
        // its saved by their last name
        localStorage.setItem(tempUsername, tempfirstName + " , " + tempLastName + " , " + tempPass + " , " + tempEmail + " , " + "DataTrue");
        //show user welcome and start game
        $(".welcome").html("Welcome " + tempfirstName);
        $("#createAccount").hide(1000);
        gameOn = true;
        $(".saveButton").show(200);
        $(".loadButton").show(200);
    }

    $("#initiateGame").show(1);
    $(".correctOrNot").show(200);
}

function loadData(usi, pass) {
    // var userNameLogIn = $(".userName").val();
    // var passWordLogin = $(".passWord").val();
    var tempUSerCont = localStorage.getItem(usi);
    var logInUser = tempUSerCont.split(" , ");
    println(logInUser);
    var gameDataRaw = localStorage.getItem(logInUser[0]);
    var gameData = [];
    //removing all ";"
    for (var x = 0; x < gameDataRaw.length; x++) {
        if (gameDataRaw[x] != ";") {
            gameData.push(localStorage.getItem(logInUser[0])[x]);
        }
    }
    println(gameData);
    var c = 0;
    for (var i = 0; i < gameGrid[0].length; i++) {
        for (var x = 0; x < gameGrid[0].length; x++) {
            var tempRowQuadList = rowAndColToQuadrantAndBox(i, x);
            change(tempRowQuadList[0], tempRowQuadList[1], gameData[c]);
            c++;
        }
    }
}
