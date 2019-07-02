'use strict';

function Snake(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.positions = [];
  this.height = 10;
  this.width = 10;
  this.x = 20;
  this.y = (this.canvas.height / 2) - this.height / 2;
  this.lives = 3;
  this.velocity = 3;
  this.direction = 0;
  this.color = 'blue';
}

Player.prototype.move = function() {
  var nextY = this.y + this.direction * this.velocity;
  if (nextY > 0 && nextY < (this.canvas.height) - this.height) {
    this.y = nextY;
  }
}

Player.prototype.draw =function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x,this.y,this.width,this.height);
}

Player.prototype.setDirection = function(newDirection) {
  this.direction = newDirection;
}