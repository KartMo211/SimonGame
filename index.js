var randomGamePattern=[];
var userClickedPattern=[];
var level=-1;
var buttonColors=["red","blue","green","yellow"];

function startOver(){
    level =-1;
    randomGamePatter = [];
    userClickedPattern=[];
    first=0;

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColour){

    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed")
    },100);
    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==randomGamePattern[currentLevel]){
        console.log("success");
        console.log(currentLevel);
        if(currentLevel >= (level)){
            userClickedPattern =[];
            console.log(userClickedPattern);
            setTimeout(nextSequence(),1000);
        }
    }
    else{
        console.log("error");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("H1").html("Game Over, Press Any Key to Restart");

        startOver();

    }
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);//this generates from 0-3
    var randomChosenColour = buttonColors[randomNumber]; 
    randomGamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeOut();
    setTimeout(function(){$("." + randomChosenColour).fadeIn()},100);
    playSound(randomChosenColour);  

    level++;
    $("h1").html("Level "+level);

}

$(".btn").on("click",function(){
    if(first==0){
        return;
    }
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    var n = (userClickedPattern.length-1);
    checkAnswer(n);
})

var first=0;
$(document).on("keydown",function(){
    if(first!=1){
        first++;
        nextSequence();
    }
})

