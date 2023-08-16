var buttonColors = ["red", "blue", "green", "yellow"];
var gameSequence=[];
var userClickedPattern=[];
var level=0;
var started=false;


function nextSequence(){
    userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
   var randomChosenColor=buttonColors[randomNumber];
    gameSequence.push(randomChosenColor);
    $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("Level "+level);
   playSound(randomChosenColor);
  
};

$(".btn").click(function (e) { 
    
   var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {  
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();

}

function animatePress(btnName){
$("#"+btnName).addClass("pressed");
var delayInMilliseconds = 100;

setTimeout(function() {
    $("#"+btnName).removeClass("pressed");
}, delayInMilliseconds);
};


$(document).keydown(function (e) { 
    
    if(started === false){
        setTimeout(function (){
            nextSequence();}, 200);
        started=true;
    }else{
    }
});

function checkAnswer(index){
if(userClickedPattern[index]===gameSequence[index]){
    console.log("success");

     if(userClickedPattern.length===gameSequence.length){
        setTimeout(function() {
            nextSequence();
        }, 1000);
     }
}
else{
    console.log("wrong");
    playSound("wrong");

    
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startover();
}
};

function startover() {
     level=0;
     started=false;
     gameSequence=[];
     userClickedPattern=[];
  }