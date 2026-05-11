var canvas = document.getElementById("myCanvas");
var pen = canvas.getContext("2d");

var interval = 1000/60;
setInterval(game, interval);

var acceleration = 0.6; 
var friction = 0.88;
var maxSpeed = 1;
var numberOfChips;
var numberOfTraps;
var score = 0;
var lowestTime = 1000000; //checks against timer at win for if it should replace or not
var timer = 0; //for the clock in game

//rat sprite
var rat = document.getElementById("rat");
//var trap = document.getElementById
//var collectable = document.getElementById

function createGameObject(){
    var gameObject = {
        x:randomNumber(115, canvas.width - 115),
        y:randomNumber(15, canvas.height - 15),
        moveX:setRandomNumber(),
        moveY:setRandomNumber(),
        velocityX: 0,
        velocityY: 0,
        color1: "red",
        color2: "green",
        // color:`rgb(${randomNumber(0,255)}, ${randomNumber(0,255)}, ${randomNumber(0,255)})`,
        radius:15,
        width:15,
        height:15,
        spritePlayer:"rat",
        drawBall:function()
        {
            pen.beginPath();
            pen.fillStyle = this.color1;
            pen.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            pen.fill();
        },
        drawTrap:function()
        {
            pen.fillStyle = this.color2;
            pen.fillRect(this.x, this.y, this.width, this.height);
        },
        drawspritePlayer:function()
        {
            pen.drawImage(this.spritePlayer, this.x - 35, this.y - 50, this.width, this.height);
        }
    }
    return gameObject;
}

function randomNumber(low,high){
    return Math.random() * (high - low) + low;
}

function setRandomNumber(){
    var number = Math.random();
    if(number > 0.5){
        return 2;
    } else{
        return -2;
    }
}


var myBall = createGameObject();
var myBalls = [];
var numberOfDots = 2;

var player = createGameObject();
player.x = canvas.width/2;
player.y = canvas.height/2;
player.width = 60;
player.height = 100;
player.color1 = "purple";
player.spritePlayer = rat;

//game state machine
var states = ["game", "win"];
states = "game";

for(var i=0; i < numberOfDots; i++){
    myBalls[i] = createGameObject();
}





function game(){
    pen.clearRect(0, 0, canvas.width, canvas.height);
    switch(states){
        case "game":
            function drawHUD(){
                pen.fillStyle = "black";
                pen.font = "14px Arial";
                pen.fillText(`Ships Defeated: ${score} | Ships Left: ${numberOfChips}`, 10, 25)
                pen.fillText(`time: ${timer/100}`, 10, 40)
            }

            numberOfChips = myBalls.length;
            
            timer++

            if(numberOfChips <= 0){
                states = "win";
            }
            if(w || up) //very shortened (w == true || up == true) code
                {
                player.velocityY -= acceleration;
                }
            if(s || down)
            {
                player.velocityY += acceleration;
            }
            if(a || left)
            {
                player.velocityX -= acceleration;
            }
            if(d || right)
            {
                player.velocityX += acceleration;
            }
            
    
            //bring velocity back to zero
            player.velocityY *= friction;
            player.velocityX *= friction;

            //update player pos. when moving
            player.x += player.velocityX;
            player.y += player.velocityY;

            //draw sprite for player
            // player.drawBall();
            player.drawspritePlayer();

            for(var i=0; i<myBalls.length; i++){
                myBalls[i].drawBall();
            }


            //collision of bullets and balls
            for(var eBalls = 0; eBalls < myBalls.length; eBalls++){
                //distance formula unknown
                var distX = player.x - myBalls[eBalls].x;
                var distY = player.y - myBalls[eBalls].y;
                var dist = Math.sqrt((distX * distX) + (distY * distY));

                if(dist < myBalls[eBalls].radius){
                    //remove ball from screen if shot
                    score++;
                    myBalls.splice(eBalls, 1);
                    break;
                }
            }
            
            drawHUD();
            break;

        case "win":
            //add spacebar restarting game and highscore display
            pen.fillStyle = "black";
            pen.font = "24px Arial";
            var text = "You Won";
            
            //checks for lowest time for a highscore
            var parTimeText = 0
            if(lowestTime > timer){
                parTimeText = timer;
                lowestTime = parTimeText;
            }

            pen.fillText(text, canvas.width/2 - pen.measureText(text).width/2, canvas.height/2 - 20);
            pen.fillText(`Your Time: ${timer/100}`, canvas.width/2 - pen.measureText(text).width/2 - 25, canvas.height/2 + 60);
            pen.fillText(`Par Time: ${lowestTime/100}`, canvas.width/2 - pen.measureText(text).width/2 - 20, canvas.height/2 + 30);

        //restart game
            if(spaceBar)
            {
                for(var i=0; i < numberOfDots; i++){
                    myBalls[i] = createGameObject();
                }
                timer = 0;
                score = 0;
                player.x = canvas.width/2;
                player.y = canvas.height/2;
                states = "game";
            }
        break;
    }
}