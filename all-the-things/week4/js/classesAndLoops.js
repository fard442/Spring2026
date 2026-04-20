var canvas = document.getElementById("myCanvas");
var pen = canvas.getContext("2d");

var interval = 1000/60;
setInterval(game, interval);

function createGameObject(){
    var gameObject = {
        x:randomNumber(15, canvas.width - 15),
        y:randomNumber(15, canvas.height - 15),
        moveX:setRandomNumber(),
        moveY:setRandomNumber(),
        color:`rgb(${randomNumber(0,255)}, ${randomNumber(0,255)}, ${randomNumber(0,255)})`,
        radius:15,
        width:15,
        height:15,
        drawBall:function()
        {
            pen.beginPath();
            pen.fillStyle = this.color;
            pen.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            pen.fill();
        },
        drawSquare:function()
        {
            pen.fillStyle = this.color;
            pen.fillRect(this.x, this.y, this.width, this.height);
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

var player = createGameObject();
player.x = canvas.width/2;
player.y = canvas.height/2;
player.width = 30;
player.height = 30;
player.color = "purple";

for(var i=0; i<10; i++){
    myBalls[i] = createGameObject();
}

function game(){
    pen.clearRect(0, 0, canvas.width, canvas.height);

    //myBall.drawBall();
    player.drawSquare();

    for(var i=0; i<myBalls.length; i++){
        myBalls[i].drawBall();

        if(myBalls[i].x > canvas.width - myBalls[i].radius){
            myBalls[i].moveX *= -1;
        }
        if(myBalls[i].y > canvas.height - myBalls[i].radius){
            myBalls[i].moveY *= -1;
        }
        if(myBalls[i].x < myBalls[i].radius){
            myBalls[i].moveX *= -1;
        }
        if(myBalls[i].y < myBalls[i].radius){
            myBalls[i].moveY *= -1;
        }

        myBalls[i].x += myBalls[i].moveX;
        myBalls[i].y += myBalls[i].moveY;

        // myBalls[i].color = `rgb(${randomNumber(0,255)}, ${randomNumber(0,255)}, ${randomNumber(0,255)})`;
        // myBalls[i].radius = setRandomNumber() * ;
    }
}