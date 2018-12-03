window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  const myCanvas = document.getElementById("my-canvas");
  const ctx = myCanvas.getContext("2d");

  const Game = function(){
    this.car = {};
    this.obstacles = Math.floor(Math.random() *[].length);
  }

  let currentGame;
  let currentCar;

  function startGame() {
    currentGame = new Game();
    currentCar = new Car();
    currentGame.car = currentCar;
    
    currentGame.obstacles = [
      
      new Obstacles(170, 220, 190, 20),
      new Obstacles(70, 20, 150, 20),
      new Obstacles(280, 400, 120, 20),
    ]

    drawingLoop();
  }

  document.onkeydown = function(event){
    currentGame.car.steer(event.keyCode);
}
  

  function drawBackground (){
    ctx.fillStyle = "grey";
    ctx.fillRect(0,0,500,650);
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,50,650);
    ctx.fillRect(450,0,50,650);
    ctx.fillStyle = "white";
    ctx.fillRect(60,0,10,650);
    ctx.fillRect(430,0,10,650);
    ctx.strokeStyle = "white";
    ctx.setLineDash([20, 20]);
	  ctx.beginPath();
	  ctx.moveTo(250, 0);
	  ctx.lineTo(250, 650);
    ctx.stroke();
    
  }

  function drawingLoop (){
    ctx.clearRect(0, 0, 500, 650);
    
    drawEverything();
    
    requestAnimationFrame(function(){
        drawingLoop();
    })
    
}
function drawEverything (){
  drawBackground();
  currentGame.car.draw();
  if(currentGame.car.x < 70){
     currentGame.car.x = 70;
  }
  if(currentGame.car.x > 380){
     currentGame.car.x = 380;
  }
  currentGame.obstacles.forEach((oneObstacle) => {
      oneObstacle.drawObstacle();
      if(checkCollision(currentGame.car, oneObstacle)){
          currentGame.car.isCrashed = true;
          oneObstacle.isTouched = true;
          gameOver();
      }
  }) 
}


  const Car = function(){
    this.x = 225;
    this.y = 540;
    this.width = 50;
    this.height = 100;
    this.isCrashed = false;
    this.image = "images/car.png";
}

Car.prototype.draw = function(){
  const carImg = new Image();
  carImg.src = this.image;
    //carImg.onload = () => {
    ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    //}
}

Car.prototype.steer = function(someKeyCode){
  switch(someKeyCode){
    case 37: //Left
      this.x -= 15;
      break;
    case 39: //Right
      this.x += 15;
      break;
  }
}
function Obstacles(theX, theY, theWidth, theHeight){
  this.x = theX;
  this.y = theY;
  this.width = theWidth;
  this.height = theHeight;
  this.isTouched = false;  
}

Obstacles.prototype.drawObstacle = function(){     
  if(currentGame.car.isCrashed === false){
      this.y += 1;
      if(this.y > 650){
          this.y = 0;
  }
}
  if(this.isTouched){
      ctx.fillStyle = "red";
  } else {
      ctx.fillStyle = "blue"
  }

  ctx.fillRect(this.x, this.y, this.width, this.height);

}

function checkCollision(obj1, obj2){
  return obj1.y + obj1.height >= obj2.y
  &&     obj1.y <= obj2.y + obj2.height
  &&     obj1.x + obj1.width  >= obj2.x
  &&     obj1.x <= obj2.x + obj2.width
}

function gameOver (){
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "magenta";
  ctx.fillText("Game Over", 250, 325);
}
  
};



