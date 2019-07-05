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
  this.backgroundMusic = new Audio('music/bensound-funkyelement.mp3');
  this.eatSound = new Audio('music/zapsplat_multimedia_notification_chime_bell_008_26408.mp3');
  this.gameOverSound = new Audio ('music/zapsplat_sound_design_impact_slam_hit_hard_003_32201.mp3')
}

Game.prototype.startGame = function () {

  this.snake = new Snake(this.canvas);

  var randomX = this.randomize();
  var randomY = this.randomize();
  this.food = new Food(this.canvas, randomX, randomY);

  var counter = 0;
  this.backgroundMusic.play();
  var loop = () => {
    counter += this.setSpeed();
    if (this.newFood) {
      randomX = this.randomize();
      randomY = this.randomize();
      while (this.checkInSnake(randomX,randomY)) {
        randomX = this.randomize();
        randomY = this.randomize();
      }
      this.food = new Food(this.canvas, randomX, randomY);
      this.newFood = false;
    }
    if (counter > 60) {
      counter = 0;
      this.findFood();
      this.update();
      this.clear();
      this.styleCanvas(this.canvas,this.snake.size);
      this.draw();
      this.checkCollisions();
    }
    if (!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver();
      this.gameOverSound.play();
      this.backgroundMusic.pause();
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
  this.food.draw();
  this.snake.draw();
}

Game.prototype.findFood = function () {
  var findFood = false;

  var downUp = (this.snake.direction === 'N' && this.snake.positions[0].x === this.food.x && this.snake.positions[0].y === this.food.y + this.snake.size);
  var upDown = (this.snake.direction === 'S' && this.snake.positions[0].x === this.food.x && this.snake.positions[0].y === this.food.y - this.snake.size);

  var leftRight = (this.snake.direction === 'E' && this.snake.positions[0].x === this.food.x - this.snake.size && this.snake.positions[0].y === this.food.y);
  var rightLeft = (this.snake.direction === 'W' && this.snake.positions[0].x === this.food.x + this.snake.size && this.snake.positions[0].y === this.food.y);

  var downUpEnd = (this.snake.direction === 'N' && this.snake.positions[0].x === this.food.x && this.snake.positions[0].y === this.food.y + this.snake.size - this.canvas.height);
  var upDownEnd = (this.snake.direction === 'S' && this.snake.positions[0].x === this.food.x && this.snake.positions[0].y === this.food.y - this.snake.size + this.canvas.height);
  
  var leftRightEnd = (this.snake.direction === 'E' && this.snake.positions[0].x === this.food.x - this.snake.size + this.canvas.width && this.snake.positions[0].y === this.food.y);
  var rightLeftEnd = (this.snake.direction === 'W' && this.snake.positions[0].x === this.food.x + this.snake.size - this.canvas.width && this.snake.positions[0].y === this.food.y);

  if (leftRight || rightLeft || upDown || downUp || leftRightEnd || rightLeftEnd || upDownEnd || downUpEnd) { findFood = true };

  if (findFood) {
    this.eatSound.currentTime = 0;
    this.eatSound.play();
    this.totalScore = this.totalScore + 10;
    this.newFood = true;
    var newPositionSnake = { x: this.food.x, y: this.food.y };
    this.snake.positions.unshift(newPositionSnake);
    var scoreText = document.querySelector('#canvas-score');
    scoreText.innerHTML = `<img id="apple-icon" src="./styles/Apple-icon.png" height="${this.snake.size}"> Score = ${this.totalScore}`;
    this.levelUp();
  }
}

Game.prototype.levelUp = function () {
  var newLevel = false;
  switch (this.totalScore) {
    case 50:
      this.level = 2;
      newLevel = true;
      break;
    case 100:
      this.level = 3;
      newLevel = true;
      break;
    case 200:
      this.level = 4;
      newLevel = true;
      break;
    case 300:
      this.level = 5;
      newLevel = true;
      break;
    case 600:
      this.level = 6;
      newLevel = true;
      break;
  }
  if (newLevel) {
    var levelText = document.querySelector('#canvas-level');
    levelText.innerHTML = `<img id="apple-icon" src="./styles/Trophy-icon.svg" height="${this.snake.size}"> Level = ${this.level}`;
    newLevel = false;
  }
}

Game.prototype.checkCollisions = function () {
  var collision = false;
  this.snake.positions.forEach((position, index) => {
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

Game.prototype.randomize = function () {
  return (this.snake.size * (Math.floor(Math.random() * (this.canvas.width / this.snake.size))));
}

Game.prototype.checkInSnake = function (randomX,randomY) {
  var inSnake = false;
  this.snake.positions.forEach((position) => {
    if (position.x === randomX && position.y === randomY) {
      inSnake = true;
    }
  });
  return inSnake;
}

Game.prototype.styleCanvas = function styleCanvas(canvas, unitSize) {
  var ctx = canvas.getContext('2d');
  var columns = canvas.width / unitSize;
  var rows = canvas.height / unitSize;
  for (var i = 0; i < columns + 1; i++) {
    for (var ii = 0; ii < rows; ii += 2) {
      if (i % 2 === 0) {
        ctx.fillStyle = '#AAD751';
      } else {
        ctx.fillStyle = '#A2D149';
      }
      ctx.fillRect(i * unitSize,ii * unitSize,unitSize,unitSize)
      if (i % 2 !== 0) {
        ctx.fillStyle = '#AAD751';
      } else {
        ctx.fillStyle = '#A2D149';
      }
      ctx.fillRect(i * unitSize, (ii+1) * unitSize, unitSize, unitSize);
    }
  }
}

Game.prototype.setSpeed =function () {
  var speed = 0;
  switch (this.level) {
    case  1:
      speed = 4;
      break;
    case 2:
      speed = 6;
      break;
    case 3:
      speed = 8;
      break;
    case 4:
      speed = 10;
      break;
    case 5:
      speed = 12;
      break;
    case 6:
      speed = 14;
      break;
  }
  return speed;
}