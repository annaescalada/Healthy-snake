'use strict';

function Food(canvas, randomX, randomY) {
  this.canvas =canvas;
  this.ctx = canvas.getContext('2d')
  this.width = 25;
  this.height = 25;

  this.x = randomX;
  this.y = randomY;
  
  this.color = 'red';
}

Food.prototype.draw = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x,this.y,this.width,this.height);
}