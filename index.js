//Necessary variables to track throughout the game;
let buttonColours = ['green','red','yellow','blue'];
let gamePattern = [];
var clickedPattern = [];
let level = 0;

//Function to create the next upcoming sequence
function nextSequence(){
    let nextUp = Math.floor(Math.random()*4);
    return buttonColours[nextUp];
}

//Function to add to the sequence and do the formalities along with it
function sequenceAddition(){
    //Creates random pattern
    let nextColour = nextSequence();
    //Stores the pattern in the sequence
    gamePattern.push(nextColour);
    //Flashes that colour
    $(`#${nextColour}`).fadeOut(150).fadeIn(150);
    //Plays the sound of that button
    playSound(nextColour);
    //Updating and changing the displayed level
    level +=1;
    $("h1").text(`Level ${level}`)
}


//Checking to see if button has been pressed and doing the required formalities
$(".btn").on("click",function(){
    //storing the button pressed
    let pressedButton = $(this).attr("id"); 
    clickedPattern.push(pressedButton);
    //Playing the respective sound
    playSound(pressedButton);
    //Making the pressed animation
    $(this).addClass("pressed");
    setTimeout(function(){
    $(this).removeClass("pressed");        
    }.bind(this), 100);
    console.log(gamePattern);
    console.log(clickedPattern)
    checkAnswer(clickedPattern.length-1);   

})

//Function that helps play the corresponding sound
function playSound(color){
    let sound = new Audio(`./sounds/${color}.mp3`);
    sound.play();
}

//Listening to the whole document for the key press, Starting the game.
if (level==0){
    $(document).on("keydown",sequenceAddition);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] != clickedPattern[currentLevel]){
        //Play wrong sound
        let failureSound = new Audio("./sounds/wrong.mp3");
        failureSound.play();
        //Change h1
        $("h1").text("Game Over, Press Any Key to Restart");
        //Flash the screen red
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },700);
        //Reset the variables
        startOver();
        
    }
    else if (gamePattern[currentLevel] == clickedPattern[currentLevel]){
        console.log("Succes");
        console.log("Current Level" + currentLevel);
        if (currentLevel == gamePattern.length-1){
            setTimeout(sequenceAddition,1000);
            clickedPattern = [];    
            console.log("current level asdsadas")
        }
    }

}

function startOver(){
    gamePattern = [];
    clickedPattern = [];
    level = 0;
}