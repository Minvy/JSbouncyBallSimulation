alert("Click the screen to add a circle!");

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

//adds XY coordinates to mouse object	
canvas.addEventListener("mousemove", function(event){
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	//	console.log(mouse); for debugging mouse coordinates;
});

canvas.addEventListener("click", function(event){
		genCircle();
		console.log("click");
});

var colours = ["green","yellow","blue","red","purple","pink"];
var circles = [];
var circleNum = 1;
var circleRad = 10;
var xMargin = window.innerWidth;
var yMargin = window.innerHeight;

//Creates an object that holds 2 values
var mouse = {
	x:undefined,
	y:undefined
}

function Circle(x,y,r,dX,dY){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dX = dX;
	this.dY = dY;
	this.colour = Math.floor(rndXY()[0]/xMargin*colours.length);
	this.timesX;
	this.timesY;
	
	this.inflate = function(){
		this.r+=5;
	}
	this.deflate = function(){
		this.r--;
	}
	
	this.draw = function(){
		//Code for drawing the shape
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		c.fillStyle = colours[this.colour];
		c.fill();
		
		//Bounce off walls effect code
		if(this.x + this.r > xMargin || this.x - this.r < 0){
			this.dX = -this.dX;
		}else if(this.y + this.r > yMargin || this.y - this.r < 0){
			this.dY = -this.dY;
		}
		
		//Code for interractiveness
		if(this.x - mouse.x < 50 && this.x - mouse.x > -50 && this.y - mouse.y < 50 && this.y - mouse.y > -50){
			//addAdditionalCircles();
			this.inflate();
		}else{
			if(this.r > 10){
				this.deflate();
			}
		}
		this.x+=this.dX;
		this.y+=this.dY;
	}
}
function addAdditionalCircles(){
	var x = rndXY()[0];
	var y = rndXY()[1];
	circles.push(new Circle(x,y,circleRad,(x/xMargin-0.5)*10,(y/yMargin-0.5)*10));
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,xMargin,yMargin);
	for(var i = 0; i < circles.length; i++){
		circles[i].draw();
	}
}

function rndXY(){
	var xy = [];
	xy.push(Math.floor(Math.random()*xMargin));
	xy.push(Math.floor(Math.random()*yMargin));
	return xy;
}

function genCircle(){
	for(var i = 0; i < circleNum; i++){
		x = rndXY()[0];
		y = rndXY()[1];
		circles.push(new Circle(x,y,circleRad,(x/xMargin-0.5)*10,(y/yMargin-0.5)*10));
	}
}
animate();