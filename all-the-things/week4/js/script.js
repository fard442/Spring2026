const canvas = document.getElementById("myCanvas");
const pen = canvas.getContext("2d");
var x = canvas.width/2-50;
var y = canvas.height/2-50;

var moveX = setRandomNumber();
var moveY = setRandomNumber();
var color = setRandomColor();

var fps = 1000/60;
var timer = setInterval(game, fps);


function game(){
    pen.clearRect(0, 0, canvas.width, canvas.height);
    pen.fillStyle = color;
    pen.fillRect(x, y, 50, 50);

    x+=moveX;
    y+=moveY;
    
    if(x > canvas.width - 50){
        moveX=-2;
        setRandomColor();
    }
    if (x < 0){
        moveX=2;
        setRandomColor();
    }


    if(y > canvas.height - 50) {
        moveY=-2;
        setRandomColor();
    }
    if (y < 0){
        moveY=2;
        setRandomColor();
    }
}

function setRandomColor(){
    color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    return color;
}

function setRandomNumber(){
    var number = Math.random();
    if(number > 0.5){
        return 2;
    } else{
        return -2;
    }
}