// Cracotte, a JavaScript game by Luca Mangiat, December 2015
// My wife owns copyright of Cracotte, the character

// ---------------------
// ***   VARIABLES   ***
// ---------------------

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = Math.random()*400;
var y = 0;
var dy = +2;
var ballRadius = 10;
var cracotteHeight = 60;
var cracotteWidth = 40;
var cracotteX = (canvas.width-cracotteWidth)/2;
var cracotteY = (canvas.height-cracotteHeight);

var interval = 10; // this is the interval in milliseconds; can be changed when level goes up

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var score = 0;
var lives = 3;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "bg_cra.png";

// Cracotte image
var craReady = false;
var craImage = new Image();
craImage.onload = function () {
	craRead = true;
}
craImage.src = "cracra.png"

// ---------------------
// ***   FUNCTIONS   ***
// ---------------------

// draw sprites
function drawSp() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#ff0000";
	ctx.fill();
	ctx.closePath();
}

// draw Cracotte
function drawCracotte() {
    ctx.beginPath();
    // ctx.rect(cracotteX, canvas.height-cracotteHeight, cracotteWidth, cracotteHeight);
	ctx.drawImage(craImage, cracotteX, canvas.height-cracotteHeight, cracotteWidth, cracotteHeight);
    ctx.fillStyle = "#b33b00";
    ctx.fill();
    ctx.closePath();
}

// event handlers
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
	else if(e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
	else if(e.keyCode == 32) {
        spacePressed = false;
    }
}

// after detecting collision 
function collision() {
	//smack.play();
	score += 1;
	if(score%10 == 0){
		lives++;
	}
	interval += interval;
	x = Math.random()*400;
	y = 0;
}

// when ball hits floor
function hitFloor() {
	x = Math.random()*400; 
	y = 0; // reset ball on top
	lives -= 1;
	if(lives == 0){
		alert('GAME OVER!');
		document.location.reload();
	}
}

// score
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 8, 20);
}

// lives
function drawLives() {
	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Lives: "+lives, canvas.width-75, 20);
}

// ---------------------
// ***   MAIN LOOP   ***
// ---------------------

function draw() {
	// draw everything:
	// ctx.clearRect(0, 0, canvas.width, canvas.height); // clean previous stuff; not necessary if there's a background img
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
	}
    drawSp();
	drawCracotte();
	drawScore();
	drawLives();
	
	// collision detection:
	if(cracotteX <= x && cracotteX+cracotteWidth >= x && y >= cracotteY) { 
		collision() // if Cracotte and ball hit, go to collision() to collect points and restart
	} else if(y + dy <= canvas.height-ballRadius) {
        y += dy; // if no hit, continue and redraw the ball a bit further down
    } else { // if the ball hits the floor, go to hitFloor(), lose points and restart
		hitFloor();
	}
	
	// deal with input from player:
	if(rightPressed && cracotteX < canvas.width-cracotteWidth) {
		cracotteX += 5;
	}
	else if(leftPressed && cracotteX > 0) {
		cracotteX -= 5;
	}
/*	Make Cracotte jump:
	else if(spacePressed) {
		cracotteHeight += 2;		
	} */
	
	requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw()
