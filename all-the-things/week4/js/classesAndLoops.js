var canvas = document.getElementById("myCanvas");
var pen = canvas.getContext("2d");

var interval = 1000/60;
setInterval(game, interval);

var acceleration = 0.6; 
var friction = 0.88;
var maxSpeed = 1;

function createGameObject(){
    var gameObject = {
        x:randomNumber(115, canvas.width - 115),
        y:randomNumber(15, canvas.height - 15),
        moveX:setRandomNumber(),
        moveY:setRandomNumber(),
        velocityX: 0,
        velocityY: 0,
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
var numberOfDots = 10;

var player = createGameObject();
player.x = canvas.width/2;
player.y = canvas.height/2;
player.width = 30;
player.height = 30;
player.color = "purple";

var bullets = [];
var canShoot = true;

function shoot(){
    var bullet = createGameObject();
    bullet.x = player.x + player.width / 2 - 4 ;
    bullet.y = player.y;
    bullet.width = 8;
    bullet.height = 10;
    bullet.color = "green";
    bullet.velocityY = -10;
    
    bullets.push(bullet);
    canShoot = false;
    //shot cooldown
    setTimeout(function(){canShoot = true}, 500);
}

for(var i=0; i < numberOfDots; i++){
    myBalls[i] = createGameObject();
    // myBalls[i].moveY = -myBalls[i].moveY;
}

function game(){
    pen.clearRect(0, 0, canvas.width, canvas.height);


    if(w || up) //very shortened (w == true || up == true) code
    {
        // player.y -= 2;
        player.velocityY -= acceleration;
    }
    if(s || down)
    {
        // player.y += 2;
        player.velocityY += acceleration;
    }
    if(a || left)
    {
        // player.x -= 2;
        player.velocityX -= acceleration;
    }
    if(d || right)
    {
        // player.x += 2;
        player.velocityX += acceleration;
    }
    if(spaceBar && canShoot)
    {
        shoot();
    }
    
    //bring velocity back to zero
    player.velocityY *= friction;
    player.velocityX *= friction;

    //update player pos.
    player.x += player.velocityX;
    player.y += player.velocityY;

    //myBall.drawBall();
    player.drawSquare();

    for(var i=0; i<myBalls.length; i++){
        myBalls[i].drawBall();

        //right
        if(myBalls[i].x > canvas.width - myBalls[i].radius - 100){
            myBalls[i].moveX *= -1;
            myBalls[i].y += myBalls[i].radius*3;
        }

        //bottom
        if(myBalls[i].y > canvas.height + myBalls[i].radius){
            // myBalls[i].moveY *= -1;
            myBalls[i].y = -randomNumber(0, 50);
        }

        //left
        if(myBalls[i].x < myBalls[i].radius + 100){
            myBalls[i].moveX *= -1;
            myBalls[i].y += myBalls[i].radius*3;
        }

        //top
        // if(myBalls[i].y < myBalls[i].radius){
        //     myBalls[i].moveY *= -1;
        // }
        
        myBalls[i].x += myBalls[i].moveX;
        // myBalls[i].y += myBalls[i].moveY;

        // myBalls[i].color = `rgb(${randomNumber(0,255)}, ${randomNumber(0,255)}, ${randomNumber(0,255)})`;
        // myBalls[i].radius = setRandomNumber() * ;
    }

    for(var b = bullets.length - 1; b >= 0; b--){
            bullets[b].x += bullets[b].velocityX;
            bullets[b].y += bullets[b].velocityY;

            if(bullets[b] + bullets[b].height < 0){
                bullets.splice(b,1);
            }
            
            for(var eBalls = 0; eBalls < myBalls.length; eBalls++){
                //distance formula unknown
                var distX = bullets[b].x - myBalls[eBalls].x;
                var distY = bullets[b].y - myBalls[eBalls].y;
                var dist = Math.sqrt((distX * distX) + (distY * distY));
                if(dist < myBalls[eBalls].radius){
                    myBalls.splice(myBalls[eBalls], 1);
                }
            }

            //draw bullet
            bullets[b].drawSquare();
    }
}