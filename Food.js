'use strict';

function Food(canvas, randomX, randomY) {
  this.canvas =canvas;
  this.ctx = canvas.getContext('2d')
  this.size = 25;

  this.x = randomX;
  this.y = randomY;
  
  this.color = 'red';

  this.appleIcon = document.getElementById('apple-icon');
}

Food.prototype.draw = function () {
  this.ctx.drawImage(this.appleIcon, this.x, this.y, this.size, this.size);
}