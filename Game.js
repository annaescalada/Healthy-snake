'use strict';

function Game(canvas) {
  this.snake = null;
  this.food = null;
  this.newFood = false;
  this.isGameOver = false;
  this.onGameOver = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.totalScore = 0;
  this.level = 1;
}

Game.prototype.startGame = function () {

  this.snake = new Snake(this.canvas);

  var canvasWithByObjectSize = this.canvas.width / this.snake.width;
  var randomX = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
  var randomY = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
  this.food = new Food(this.canvas, randomX, randomY);

  var counter = 0;
  var startCheckCollisions = 0;

  var loop = () => {
    counter += this.level * 10;
    startCheckCollisions ++;

    if (this.newFood) {
      var canvasWithByObjectSize = this.canvas.width / this.snake.width;
      var randomX = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
      var randomY = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
      this.food = new Food(this.canvas, randomX, randomY);
      this.newFood = false;
    }

    if (counter === 60) {
      counter = 0;

      this.update();
      this.clear();
      this.draw();
      this.scoreGrow();
      if (startCheckCollisions > 100) {
        this.checkCollisions();
      }
    }

    if (!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver();
    }
  }
  loop();
}

Game.prototype.update = function () {
  this.snake.move();
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function () {
  this.snake.draw();
  this.food.draw();
}

Game.prototype.scoreGrow = function () {

  var score = false;

  var downUp = (this.snake.direction === 'N' && this.snake.positions[0].x === this.food.x && this.snake.positions[0].y === this.food.y - this.snake.height);
  var upDown = (this.snake.direction === 'S' && this.snake.positions[0].x === this.food.x && this.snake.positions[0].y === this.food.y + this.snake.height);
  var leftRight = (this.snake.direction === 'E' && this.snake.positions[0].x === this.food.x - this.snake.width && this.snake.positions[0].y === this.food.y);
  var rightLeft = (this.snake.direction === 'W' && this.snake.positions[0].x === this.food.x + this.snake.width && this.snake.positions[0].y === this.food.y);

  if (leftRight || rightLeft || upDown || downUp) {score = true};

  //var score = (this.snake.positions[0].x === this.food.x && this.snake.positions[0].y === this.food.y);

  if (score) {
    this.totalScore = this.totalScore + 10;
    this.newFood = true;
    var newPositionSnake = {x: this.food.x,y:this.food.y};
    this.snake.positions.push(newPositionSnake);
  }

  var scoreText = document.querySelector('#score');
  scoreText.innerHTML = `Score = ${this.totalScore}`;

}

Game.prototype.checkCollisions = function () {
  var collision = false;
  this.snake.positions.forEach((position,index) => {
    if (index > 0) {
      collision = (this.snake.positions[0].x === position.x && this.snake.positions[0].y === position.y);
      if (collision) {
        this.isGameOver = true;
      }
    }
  });
}


Game.prototype.gameOverCallback = function (callback) {
  this.onGameOver = callback;
}