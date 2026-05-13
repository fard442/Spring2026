var canvas = document.getElementById("myCanvas");
var pen = canvas.getContext("2d");

//sets fps for game and update rate for anything in game state
var interval = 1000/60;
setInterval(game, interval);

//main variables
var health = 10;
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

//trap sprite
var trap = document.getElementById("ratTrap");

//cheese sprite
var collectable = document.getElementById("cheese");

//setup stuff to be used in the game
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
        spriteCollectable:"cheese",
        spriteTrap:"ratTrap",
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
        drawSpritePlayer:function()
        {
            pen.drawImage(this.spritePlayer, this.x - 35, this.y - 50, this.width, this.height);
        },
        drawSpriteCollectable:function()
        {
            pen.drawImage(this.spriteCollectable, this.x - 17, this.y - 17, this.width + 20, this.height + 15);
        },
        drawSpriteTrap:function()
        {
            pen.drawImage(this.spriteTrap, this.x - 15, this.y - 15, this.width + 30, this.height + 30);
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

//trap object
var trap = createGameObject();
var trapIndex = [];
var numberOfTraps = 0;

//connects trap to gameObject setup code
for(var i=0; i < numberOfTraps; i++){
    trapIndex[i] = createGameObject();
    trapIndex[i].spriteTrap = ratTrap;
}

//cheese object is myBall
var myBall = createGameObject();
var myBalls = [];
var numberOfDots = 50;

//player variables
var player = createGameObject();
player.x = canvas.width/2;
player.y = canvas.height/2;
player.width = 60;
player.height = 100;
player.color1 = "purple";
player.spritePlayer = rat;



//game state machine
var states = ["game", "win", "lose", "menus"];
states = "menus";

//connects cheese/ball to gameObject setup code
for(var i=0; i < numberOfDots; i++){
    myBalls[i] = createGameObject();
    myBalls[i].spriteCollectable = cheese;
}



function game(){
    pen.clearRect(0, 0, canvas.width, canvas.height);
    switch(states){
        case "game":
            function drawHUD(){
                pen.fillStyle = "black";
                pen.font = "14px Arial";
                pen.fillText(`Cheese Get: ${score} | Cheeses Left: ${numberOfChips}`, 10, 25)
                pen.fillText(`time: ${timer/100}`, 10, 40)
                pen.fillText(`Rat Health Remaining: ${health}`, 10, 55);
            }

            numberOfChips = myBalls.length;
            numberOfTraps = trapIndex.length;
            
            //timer in game
            timer++

            //check if win
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
            if(health == 0){
                states = "lose";
            }
            
    
            //bring velocity back to zero
            player.velocityY *= friction;
            player.velocityX *= friction;

            //update player pos. when moving
            player.x += player.velocityX;
            player.y += player.velocityY;

            //draw sprite for player
            player.drawSpritePlayer();

            //draws sprites for cheese and trap
            for(var i=0; i<myBalls.length; i++){
                myBalls[i].drawSpriteCollectable();
            }
            for(var i=0; i<trapIndex.length; i++){
                trapIndex[i].drawSpriteTrap();
            }


            //collision of cheese and the changes associated
            for(var eBalls = 0; eBalls < myBalls.length; eBalls++){
                var distX = player.x - myBalls[eBalls].x;
                var distY = player.y - myBalls[eBalls].y;
                var dist = Math.sqrt((distX * distX) + (distY * distY));

                //removes from screen, adds score, and spawns trap
                if(dist <= myBalls[eBalls].radius){
                    score++;
                    numberOfTraps++;
                    for(var i=0; i < numberOfTraps; i++){
                        trapIndex[i] = createGameObject();
                        trapIndex[i].spriteTrap = ratTrap;
                    }
                    myBalls.splice(eBalls, 1);
                    break;
                }
            }

            //collision of traps and stuff
            for(var eTrap = 0; eTrap < trapIndex.length; eTrap++){
                var distX = player.x - trapIndex[eTrap].x;
                var distY = player.y - trapIndex[eTrap].y;
                var dist = Math.sqrt((distX * distX) + (distY * distY));

                //removes trap from screen and decreases health points
                if(dist <= trapIndex[eTrap].radius){
                    health--;
                    trapIndex.splice(eTrap, 1);
                    break;
                }
            }
            
            drawHUD();
            break;

        case "win":
            pen.fillStyle = "black";
            pen.font = "24px Arial";
            var text = "You Won";
            
            //checks for lowest time for a highscore
            var parTimeText = 0
            if(lowestTime > timer){
                parTimeText = timer;
                lowestTime = parTimeText;
            }

            //displays text
            pen.fillText(text, canvas.width/2 - pen.measureText(text).width/2, canvas.height/2 - 20);
            pen.fillText(`Your Time: ${timer/100}`, canvas.width/2 - pen.measureText(text).width/2 - 25, canvas.height/2 + 60);
            pen.fillText(`Par Time: ${lowestTime/100}`, canvas.width/2 - pen.measureText(text).width/2 - 20, canvas.height/2 + 30);

            //restart game
            if(spaceBar)
            {
                for(var i=0; i < numberOfDots; i++){
                    myBalls[i] = createGameObject();
                    myBalls[i].spriteCollectable = cheese;
                }
                if(trapIndex != 0){
                    trapIndex.splice(eTrap, numberOfTraps);
                }
                health = 10;
                timer = 0;
                score = 0;
                numberOfTraps = 0;
                player.x = canvas.width/2;
                player.y = canvas.height/2;
                states = "game";
            }
            break;
        case "lose":
            pen.fillStyle = "black";
            pen.font = "24px Arial";
            text = "You Lose, Rat";

            //displays text
            pen.fillText(text, canvas.width/2 - pen.measureText(text).width/2, canvas.height/2 - 20);
            pen.fillText(`Your Time: ${timer/100}`, canvas.width/2 - pen.measureText(text).width/2 - 20, canvas.height/2 + 30);

            //restart game loop
            if(spaceBar)
            {
                for(var i=0; i < numberOfDots; i++){
                    myBalls[i] = createGameObject();
                    myBalls[i].spriteCollectable = cheese;
                }
                if(trapIndex != 0){
                    trapIndex.splice(eTrap, numberOfTraps);
                }
                health = 10
                timer = 0;
                score = 0;
                numberOfTraps = 0;
                player.x = canvas.width/2;
                player.y = canvas.height/2;
                states = "game";
            }
        break;
        case "menus":
            pen.fillStyle = "black";
            pen.font = "24px Arial";
            text = "Rat Game 3";

            pen.fillText(text, canvas.width/2 - pen.measureText(text).width/2, canvas.height/2 - 40);
            pen.fillText(`Press Space to start.`, canvas.width/2 - pen.measureText(text).width/2 - 35, canvas.height/2 + 20);
            pen.fillText(`Created by Marcus L.`, canvas.width/2 - pen.measureText(text).width/2 - 35, 550);

            if(spaceBar)
            {
                states = "game";
            }
        break;
    }
}