/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)


/*------------Declare Variables Here--------*/

//declare score

//declare health of player

//declare function to start a timer

//declare function to make traps

//declare objects to increase score 'coins' or something idk


/*--------------main()------------------------
This is the function that makes the game work
---------------------------------------------*/

function main()
{
    //erases the screen
    ctx.clearRect(0,0,c.width,c.height); 

    //Any changes to numbers

        //score goes up when colliding with a coin, also spawning 1 or 2 traps. Delete collided-with objects also.
        
        //decrease player health when hitting a trap, which will be displayed in a dramatic area of the screen to seem normal.

        //always check after player gains coin to see if not 50 or above, if so then end game in a win.
        //always check after player is hit to see if health is 0, if so end game in a massive L

        //reset timer when restarting game, save previous times as a highscore, delete highscore and replace with a LOWER time only if end was a win.


    //Any collision detection 

        //screen wraps around, player goes to the other side when hitting a boundary like Pac Man

    //draw the pictures

        //make either winning/lose screens or text overlay

        //add restart button on both of these for replayability

}

//random number generator
function rand(_low, _high)
{
    return Math.random()*(_high - _low) + _low;
}
//Converts degrees to radians
function radians(_deg)
{
    return _deg * Math.PI/180
}

//Converts radians to degrees
function degrees(_rad)
{
    return _rad * 180/Math.PI
}
/*-------Diagram--------

               /|        c = the hypoteneuse
            c / |        b = height
             /  | b      a = width
            /   |        T = arch tangent angle
           /T___|
             a

--------------------------

To get a and b (displacement) when you know two points
  
    a = destination.x - starting.x
    b = destination.y - starting.y

To get the total distance (hypotenuese) between two points
    c = Math.sqrt(_a*_a + _b*_b)

To get the arc tangent angle (labeled T in the diagram)
    radians = Math.atan2(b, a)

To find a and b if you know c and T
    a = Math.cos(T) * c
    b = Math.sin(T) * c

*/
