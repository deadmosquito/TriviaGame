$(document).ready(function() {
    // creating an array of options all at once and putting the answer with it.
    // i cannot get my images to load
    var options = [
        {
            question: "How big is a womp rat?",
            choice: ["Tiny", "Not much bigger than 2 meters", "1 foot across", "30 feet"],
            answer: 1,
            photo: "assets/images/womprat.jpg"
        },

        {
            question: "Where does Obi-wan tell Luke to find Yoda?",
            choice: ["Alderaan", "Tatooine", "Hoth", "Dagobah"],
            answer: 3,
            photo: "assets/images/dagobah.jpeg"
        },

        {
            question: "Who trained Qui-gon Jinn?",
            choice: ["Count Dooku", "Christopher Lee", "Yoda", "Obi-wan"],
            answer: 0,
            photo: "assets/images/thor.gif"
        },

        {
            question: "The Kessel run is measured by which unit?",
            choice: ["Lightyears", "Miles", "Parsecs", "Seconds"],
            answer: 2,
            photo: "assets/images/moon.jpg"
        },

        {
            question: "How long did it take to build the first death star?",
            choice: ["20 years", "10 years", "We don't know how long it has existed", "The force made it in 1 year"],
            answer: 0,
            photo: "assets/images/jean.jpg"
        },

        {
            question: "What command by Emperor Palpatine brought down the Jedi Order?",
            choice: ["Order 13", "Order 77", "Order 99", "Order 66"],
            answer: 3,
            photo: "assets/images/ben.jpg"
        },

        {
            question: "Which of these species is not furry?",
            choice: ["Wookies", "Ewoks", "Wampas", "Hutts"],
            answer: 3,
            photo: "assets/images/joker.png"
        },

        {
            question: "Complete the quote: 'never tell me the...'",
            choice: ["Scores", "Odds", "Truth", "Reason"],
            answer: 1,
            photo:"assets/images/matt.png"
        },

        {
            question: "How does Jabba sentence Han and Luke to be killed?",
            choice: ["Firing Squad", "By the Rancor", "By the Sarlacc", "Walk the plank"],
            answer: 2,
            photo:"assets/images/lokiFalling.gif"
        },
        {
            question: "Complete the quote: “Fear leads to anger. Anger leads to hate. Hate leads to...”",
            choice: ["Violence", "Suffering", "Evil", "Darkness"],
            answer: 1,
            photo: "assets/images/point.jpg"
        }];
    // more variables for the timer and counter at the end
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    //var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();
    // begin the test
    $("#start").on("click", function (){
        // once you start the button will hide
        $("#start").hide();
        displayQuestion();
        runTimer();
        // this is a loop for each question
        for(var i = 0; i < options.length; i++){
            // puts your choice on the screen
        holder.push(options[i]);
    }
})

            
    // timer start
    function runTimer(){
        // if its not running then it will run
        if (!running){
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    // timer Countdown inserted into the html to decrease
    function decrement(){
        $("#timeleft").html("<h3>Time Remaining: " + timer + "</h3>");
        timer --;

        // stop timer if it reaches 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Your Time Is Up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    // timer stop
    function stop(){
        running = false;
        clearInterval(intervalId);
    }

    // randomly pick a question in array if not already shown so you dont start with the same questions
    // display a question and loop through and display possible answers
    function displayQuestion(){
        // has the random function within the options
        index = Math.floor(Math.random()*options.length);
        // can only be from the options
        pick = options[index];

    
        // in the html the question is displayed
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choice.length; i++){
            // this makes the choice its own div
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so you can check the answer only within the parameters of i
            userChoice.attr("data-guessvalue", i);
            // appends my new variable within the answer block
            $("#answerblock").append(userChoice);
            
    //    
    
}

    $(".answerchoice").on("click", function(){
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
        // if correct, the timer stops and you get rewarded
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
            // if wrong, the timer stops and you get marked
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
        
    })
}
    

function hidepicture(){
    $("#answerblock").append("<img src=" + pick.photo + ">");
    // shows the photo with the answer
    newArray.push(pick);
    options.splice(index,1);
// gives 10 seconds for each answer
    var hidpic = setTimeout(function() {
        $("#answerblock").empty();
        timer = 10;

    //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === options.length) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over! Here's your score: </h3>");
        $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
        $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
        $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
        // shows the choice to play again
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;

    } else {
        runTimer();
        displayQuestion();

    }
    }, 7000);
}
// hides the reset button once engaged and clears the score from the previous player
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