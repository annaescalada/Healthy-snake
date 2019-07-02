'use strict';

function Game(canvas) {
  this.snake = null;
  this.food = null;
  this.newFood = false;
  this.isGameOver = false;
  this.onGameOver = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.level = 1;
}

Game.prototype.startGame = function () {

  this.snake = new Snake(this.canvas);
  var canvasWithByObjectSize = this.canvas.width / this.snake.width;
  var randomX = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
  var randomY = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
  
  this.food = new Food(this.canvas,randomX,randomY);

  //create new food: random x random y this.food = Food (randomx, randomy)

  var counter = 0;
  var loop = () => {
    counter += this.level * 10;
    if (this.newFood) {
      var canvasWithByObjectSize = this.canvas.width / this.snake.width;
      var randomX = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
      var randomY = this.snake.width * (Math.floor(Math.random() * (canvasWithByObjectSize)));
      this.food = new Food(this.canvas,randomX,randomY);
    }
 
    if (counter === 60) {
      counter = 0;

      this.update();
      this.clear();
      this.draw();
//    this.checkCollisions();
    }

    if(!this.isGameOver) {
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
  // this.enemies.forEach(function (enemy) {
  //   enemy.draw();
  // })
}

// Game.prototypeScore {

// }


// Game.prototype.checkCollisions = function () {
//   this.enemies.forEach((enemy, index) => {
//     var rightLeft = this.player.x + this.player.width >= enemy.x;
//     var leftRight = this.player.x <= enemy.x + enemy.width;
//     var bottomTop = this.player.y + this.player.height >= enemy.y;
//     var topBottom = this.player.y <= enemy.y + enemy.height;

//     if (rightLeft && leftRight && bottomTop && topBottom) {
//       this.enemies.splice(index,1);
//       this.player.lives --;
//       if (this.player.lives === 0) {
//         this.isGameOver = true;
//       }
//     }
//   });
// }

Game.prototype.gameOverCallback = function (callback) {
  this.onGameOver = callback;
}