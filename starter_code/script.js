window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  const myCanvas = document.getElementById("my-canvas");
  const ctx = myCanvas.getContext("2d");

  const Game = function(){
    this.car = {};
    this.obstacles = [];
  }

  let currentGame;
  let currentCar;

  function startGame() {
    currentGame = new Game();
    currentCar = new Car();
    currentGame.car = currentCar;
    //drawBackground();
    //currentGame.car.draw();
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
  // currentGame.obstacles.forEach((oneObstacle) => {
  //     oneObstacle.drawObstacle();
  //     if(checkCollision(currentGame.floppy, oneObstacle)){
  //         currentGame.floppy.isCrashed = true;
  //         oneObstacle.isTouched = true;
  //         gameOver();
  //     }
  // }) 
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
      this.x -= 10;
      break;
    case 39: //Right
      this.x += 10;
      break;
  }
}


  
};



