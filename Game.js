'use strict';

function Game(canvas) {
  this.snake = null;
  this.enemies = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
  this.level = 1;
}

Game.prototype.startGame = function () {

  this.snake = new Snake(this.canvas);
  var counter = 0;
  var loop = () => {
    counter += this.level * 10;
  //   if (Math.random() > 0.97) {
  //     var randomY = Math.random() * this.canvas.height - 10;
  //     var newEnemy = new Enemy(this.canvas, randomY);
  //     this.enemies.push(newEnemy);
  //   }
    if (counter === 60) {
      counter = 0;
      this.update();
      this.clear();
      this.draw();
    }
//    this.checkCollisions();

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
  //this.enemies.forEach(function (enemy) {
  //  enemy.move();
  //})
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function () {
  this.snake.draw();
  // this.enemies.forEach(function (enemy) {
  //   enemy.draw();
  // })
}

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