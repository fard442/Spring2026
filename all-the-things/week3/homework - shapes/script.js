var canvas = document.getElementById("canvas");
var pencil = canvas.getContext("2d");


//yellow square with black border 5px
pencil.lineWidth = 5;
pencil.fillStyle = "yellow";
pencil.strokeStyle = "black";
pencil.fillRect(85, 301, 100, 100);
pencil.strokeRect(85, 301, 100, 100);

//#ff0 circle with red border 5px
pencil.beginPath();
pencil.strokeStyle = "#ff0";
pencil.fillStyle = "red";
pencil.arc(385, 440, 65, 0, 2*Math.PI);
pencil.fill();
pencil.stroke();

//RED stroke/line 5px wide
pencil.beginPath();
pencil.strokeStyle = "#f00";
pencil.moveTo(85, 682);
pencil.lineTo(278, 550);
pencil.stroke();

//#f0f pentagon #0ff border 5px
pencil.fillStyle = "#f0f";
pencil.strokeStyle = "#0ff";
pencil.beginPath();
pencil.moveTo(558, 310);
pencil.lineTo(668, 284);
pencil.lineTo(724, 380);
pencil.lineTo(650, 464);
pencil.lineTo(548, 420);
pencil.lineTo(558, 310);
pencil.fill();
pencil.stroke();

//#ff0 star (32,32,32)RGB border 5px
pencil.fillStyle = "#ff0";
pencil.strokeStyle = "#202020";
pencil.beginPath();
pencil.moveTo(635, 495);
pencil.lineTo(668, 554);
pencil.lineTo(733, 567);
pencil.lineTo(688, 615);
pencil.lineTo(696, 681);
pencil.lineTo(635, 654);
pencil.lineTo(575, 681);
pencil.lineTo(583, 616);
pencil.lineTo(538, 567);
pencil.lineTo(603, 554);
pencil.lineTo(637, 495);
pencil.fill();
pencil.stroke();

// //orange rectangle
// pencil.fillStyle = "#fb0";
// pencil.fillRect(50, 125, 150, 50)

// //final purple boxy
// pencil.strokeStyle = "#f0f";
// pencil.strokeRect(50, 350, 150, 50);

// //cical
// pencil.beginPath();
// pencil.strokeStyle = "#0f0";
// //the next step of the operation between here
// pencil.arc(500, 200, 20, 0, 2*Math.PI);
// //and here. (makes circle)
// pencil.stroke();

// //circle 4: The Outling.
// pencil.beginPath();
// pencil.lineWidth= 5;
// pencil.strokeStyle = "#0ff";
// pencil.fillStyle = "#000";
// pencil.arc(550, 300, 20, 0, 2*Math.PI);
// pencil.fill();
// pencil.stroke();

// //3 angel
// pencil.lineWidth = 1;
// pencil.beginPath();
// pencil.moveTo(50, 450);
// pencil.lineTo(75, 500);
// pencil.lineTo(25, 500);
// pencil.lineTo(50, 450);
// pencil.stroke();

// //filled 3: the trequal
// pencil.beginPath();
// pencil.fillStyle = "#00f"
// pencil.moveTo(125, 450);
// pencil.lineTo(150, 500);
// pencil.lineTo(100, 500);
// pencil.lineTo(125, 450);
// pencil.fill();