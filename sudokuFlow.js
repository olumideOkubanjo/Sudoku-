$(document).ready(function() {
    var saveOn = false;
    var easySave, mediumSave, hardSave = false;
    var logInOn;

    // Game on == true turns on the game
    $("#initiateGame").hide(1);
    $("#logIn").hide(1);
    $("#createAccount").hide(1);
    $(".userNameReq").hide(1);
    $(".passReq").hide(1);
    $(".confPassReq").hide(1);
    $(".saveButton").hide(1);
    $(".LogInReq").hide(1);
    $(".loadButton").hide(1);
    $(".correctOrNot").hide(1);
    // $(".easy").click(function() {
    //     easyOn = true;
    // });

    //Log in
    $(".active").click(function() {
        $("#header").hide(2000);
        $("#logIn").show(2000);
        $("#createAccount").hide(2000);
    });

    //Log in Buton click
    $(".logInButton").click(function() {
        logInOn = true;
        $(".easy").hide(2000);
        $(".hard").hide(2000);
        $(".medium").hide(2000);
        var userNameLogIn = $(".userName").val();
        var passWordLogin = $(".passWord").val();
        // println(localStorage.getItem(userNameLogIn));
        for (var x = 0; x < localStorage.length; x++) {
            //Looping to remove the ""
            var tempUSerCont = localStorage.getItem(userNameLogIn);
            // for (var x = 0; x < tempUSerCont.length; x++) {
            //     if (tempUSerCont[x] == "  ")
            // }
            var logInUser = tempUSerCont.split(" , ");
            // println(logInUser);
            if (logInUser[2] == passWordLogin) {
                gameOn = true;
                $("#logIn").hide(1200);
                break;
            } else {
                $(".LogInUserReq").show(1);
            }
        }

        $(".saveButton").show(200);
        $(".correctOrNot").show(200);


        loadData(userNameLogIn);
    });

    //Sign up tab
    $(".activeC").click(function() {
        $("#header").hide(2000);
        $("#logIn").hide(2000);
        $("#createAccount").show(2000);
        // $("#initiateGame").hide(1);
    });

    // signUp button clicked
    $(".signUpButton").click(saveInfoAndStartGame);

    //if easy is clicked
    $(".easy").click(function() {
        easyOn = true;
        $("#initiateGame").hide(2500);
        var easySave =  true;

    });
    // if medium is clkicked
    $(".medium").click(function() {
      mediumOn = true;
      $("#initiateGame").hide(2500);
      var mediumSave = true;

    });
    //if hard is clicked
    $(".hard").click(function() {
      hardOn = true;
      $("#initiateGame").hide(2500);
      var hardSave = true;
    });

    // if(correctVal == true){
    //   //change the color to yelloow
    //   $(".verifyBox").css("background-color : Blue; ");
    // }else if(correctVal == false){
    //   $(".verifybox").css("background-color : Red ;");
    // }

    $(".saveButton").click(function() {
        // if(saveOn==true){
        if (logInOn == true) {
            var userNameLogIn = $(".userName").val();
            var passWordLogin = $(".passWord").val();

            var tempUSerCont = localStorage.getItem(userNameLogIn);
            var logInUser = tempUSerCont.split(" , ");
            println("Saved");

            saveGrameGridInLocalStorage(logInUser[0]);
        } else {
            var checkValue = [];
            var tempfirstName = $(".firstName").val();
            var tempLastName = $(".lastName").val();
            var tempUsername = $(".cUserName").val();
            var tempPass = $(".cPassword").val();
            var tempEmail = $(".cEmail").val();
            var tempConfPassword = $(".cConfPassword").val();
            println("Saved");


            saveGrameGridInLocalStorage(tempfirstName);
        }


        // }
    });
    // $(".loadButton").click(loadData);

    // $(".Hhome").click(function() {
    //     $("#initiateGame").hide(1);
    //     $("#logIn").hide(1);
    //     $("#createAccount").hide(1);
    //     $(".userNameReq").hide(1);
    //     $(".passReq").hide(1);
    //     $(".confPassReq").hide(1);
    //     $(".saveButton").hide(1);
    //     $(".LogInReq").hide(1);
    //     $(".loadButton").hide(1);
    //     $(".correctOrNot").hide(1);
    //     $(".sudokuImg").show(300);
    //     $(".sudokuMessage").show(300);
    // });
});
