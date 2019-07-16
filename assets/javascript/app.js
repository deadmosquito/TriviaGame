$(document).ready(function() {
    var options = [
        {
            question: "Steve Rogers, aka Captain America, hails from what part of New York?",
            choice: ["Queens", "Brooklyn", "Upper East Side", "Manhattan"],
            answer: 1,
            photo: "assets/images/captain.jpg"
        },

        {
            question: "What is Black Panther's suit and Captain America's shield made out of?",
            choice: ["Steel", "Titanium", "Unobtanium", "Vibranium"],
            answer: 3,
            photo: "assets/images/panther.jpg"
        },

        {
            question: "What is the name of Thor's Hammer?",
            choice: ["Mjolnir", "Stormbreaker", "Leviathan", "Hammer McHammerson"],
            answer: 0,
            photo: "assets/images/thor.gif"
        },

        {
            question: "Who owes Moon Knight money?",
            choice: ["Thor", "Iron Man", "Dracula", "Hulk"],
            answer: 2,
            photo: "assets/images/moon.jpg"
        },

        {
            question: "Who is the Marvel Character that has been resurrected the most?",
            choice: ["Jean Grey", "Daredevil", "Namor", "Star Lord"],
            answer: 0,
            photo: "assets/images/jean.jpg"
        },

        {
            question: "Who is the one character who has never been resurrected?",
            choice: ["Wolverine", "Iron Man", "Captain America", "Uncle Ben"],
            answer: 3,
            photo: "assets/images/ben.jpg"
        },

        {
            question: "Who attacked Red Skull after finding out he was a Nazi?",
            choice: ["Wolverine", "Captain America", "Magneto", "Joker"],
            answer: 3,
            photo: "assets/images/joker.png"
        },

        {
            question: "Who cameo'd as Loki in Thor: Ragnarock?",
            choice: ["Ben Affleck", "Matt Damon", "Jimmy Fallon", "Jimmy Kimmel"],
            answer: 1,
            photo:"assets/images/matt.png"
        },

        {
            question: "How long was Loki falling in Dr.Strange's portal?",
            choice: ["10 Mins", "20 Mins", "30 Mins", "4 Years"],
            answer: 2,
            photo:"assets/images/lokiFalling.gif"
        },
        {
            question: "Who is the true Strongest Avenger?",
            choice: ["Hulk", "Thor", "Captain America", "Iron Man"],
            answer: 1,
            photo: "assets/images/point.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();
    //Click the start button to start, obviously!
    $("#start").on("click", function (){
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++){
        holder.push(options[i]);
    }
            })

    //Timer start
    function runTimer(){
        if (!running){
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //Timer Countdown
    function decrement(){
        $("#timeleft").html("<h3>Time Remaining: " + timer + "</h3>");
        timer --;

        //Stop Timer if it reaches 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>*snaps* Your Time Is Up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //Timer Stop
    function stop(){
        running = false;
        clearInterval(intervalId);
    }

    //Randomly pick a question in array if not already shown
    //Display a question and loop through and display possible answers
    function displayQuestion(){
        //Generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];

     //if (pick.shown) {
        //recursive to continue to generate new index until one is chosen that has not shown in this game yet
        //displayQuestion();
    //} else {
        //console.log(pick.question);
        //iterate through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choice.length; i++){
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so you can check the answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }
    //}
    }

    $(".answerchoice").on("click", function(){
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));

        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();

        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    

function hidepicture(){
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index,1);

    var hidpic = setTimeout(function() {
        $("#answerblock").empty();
        timer = 30;

    //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over! Here's how you did: </h3>");
        $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
        $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
        $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;

    } else {
        runTimer();
        displayQuestion();

    }
    }, 3000);
}

$("#reset").on("click", function(){
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i ++) {
        options.push(holder[i])
    }
    runTimer();
    displayQuestion();
})


})