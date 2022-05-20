var buttonColours = ["green", "red", "yellow", "blue"];
/*We will push the value to the gamePattern in terms of random color generated from the button colorurs from random numbers.*/
var gamePattern = [];
/*We will get "userClickedPattern" array from the user click input ids*/
var userClickedPattern = [];

/*"var started=false" is usually used to program a game, it checks when the value is "true", it can be true when a key is pressed depending upon the condition.*/
var started = false;
/*We will increase the level when user click the right sequence.*/
var level = 0;

/*In jQuery "$" replaces "document.querySelector" or "document.querySelectorAll."
We no longer need to use looping whenever we need to change something in an element being multiple time in the html document with jQuery.
For example if there are 5 button element in a html document, with javascript to change something in all the buttons we need to use index or loop.
Because in javascript "document.querySelectorAll("button")" will give us the array of buttons and the change we associated with it is only applied to the
first element of the array of buttons, so to do multiple changes we use "for loop" or the "index of the array."
In jQuery "$("button")" takes effect in all the buttons.*/

/*We will have to listen to a keypress in all of the document that is whenever we are on the website we have to listen to a keypress.*/
/*In jQuery on is equivalent to "addEventListener" in javascript.*/
$(document).on("keypress", function() {
  if (true) {
    $("h1").text("Level " + level);
    /*If the keypress is true we will call the nextSequence function.*/
    nextSequence();
    started = true;
  }
})

function nextSequence() {
  /*"userClickedPattern" array will become empty whenever nextSequence() function is called, by keyboard press after refreshing or
  after button pressed on the webpage because of the rule of the game.
  Every time userClickedPattern array must equal to gamePattern to go level up.*/
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  /*randomNumber is generated to choose a random color from the buttonColours array and push it to the gamePattern array every time nextSequence
  function is called.*/
  var randomNumber = Math.floor(4 * (Math.random()));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  /*To create animation on the gamePattern button.
  In jQuery everything will be in method or function format.
  In jquery multiple animation can be performed at once. It will occur orderly, one after another in order.*/
  $("button#" + randomChosenColour).fadeOut(100).fadeIn(100);
  $(document).on("keypress", function(event) {
    /*To play the sound related to the button.*/
    playSound(randomChosenColour);
  })
}

/*To check the buttons clicked on the webpage and add it in the userClickedPattern array.*/
$("button").on("click", function() {
  /*Here this will give us the "button" clicked by the user, from there we get the attribute "id" of the button by "attr" command and then
  we can push the value of the id that is the color of the button to userClickedPattern array.*/
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  /*To play sound related to the button press id on the website.*/
  playSound(userChosenColour);
  /*It will call the "animatePress" function to animate the button pressed on the website.*/
  animatePress(userChosenColour);
  /*It will call the function "checkAnswer(input)",here input will be the index of the last element of the "userClickedPattern" array.*/
  /*Every time we click on a button, it will push it to userClickedPattern array and
  check the recent item and match it with the gamePattern item with same index, wheather they both are equal or not.*/
  checkAnswer((userClickedPattern.length) - 1);
})

/*Function to check userClickedPattern is same as gamePattern.*/
function checkAnswer(currentLevel) {
  /*Checks if the last index value of the userClickedPattern and gamePattern is equal.*/
  /*This if statement will make sure every corresponding item of the userClickedPattern array is same as the gamePattern array.
  Because it will check for the every user clicked button and try to match every time with the gamePattern array
  because we call the checkAnswer(input) function in button press event.
  Where the input will be last index of the userClickedPattern array.
  Because every time userClickedPattern arrray will become empty whenever we get the same item in the two arrays,
  we have to match the sequence of the userClickedPattern with gamePattern everytime to satisfy this "if" statement. */
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    /*checks if the sequence of userClickedPattern array is same as gamePattern array.*/
    /*Whenever the length of userClickedPattern array and gamePattern array will become equal with same sequence,
    we will call nextSequence function and set the value of the userClickedPattern to an empty array and wait for the next user input.*/
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        /*It will call the nextSequence() function after 1000ms(=1s) and make the userClickedPattern array empty and add another item to gamePattern array
        and wait for the userChosenColour sequence.*/
        nextSequence();
      }, 1000);
    }
    /*if userClickedPattern and gamePattern are not equal than the following will be carried out.*/
  } else {
    $("h1").text("Game Over, Press Any key to Restart");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    /*To add animation to the body on "game over."*/
    $("body").addClass("game-over");
    /*To remove the game over effect after 200 ms.*/
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    /*To call the function "startOver()" to start over the game again.*/
    startOver();
  }
}

/*It will start over the game again by setting the variables (level,gamepattern and started) to initial value and wait for a keyboard press to
happen to start the game.*/
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

/*Function to play sound according to gamePattern recent colour and the user clicked button colour.*/
function playSound(name) {
  /*To create a new audio object from "Audio" constructor function.
  In javascript constructor function doesnot follow camel casing instead it is writen as the first letter in capital.*/
  var audio = new Audio("sounds/" + name + ".mp3");
  /*To play a audio object in javascript.*/
  audio.play();
}

/*Function to create animation in pressed buttton.*/
function animatePress(currentColour) {
  /*To add a css class to give animation to the pressed button.*/
  $("#" + currentColour).addClass("pressed");
  /*"setTimeout" function has two input, one is the annonymus function and second one is the time in milliseconds.
  It will carry out the annonymus function after the given amount of time.*/
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
