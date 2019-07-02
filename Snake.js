'use strict';

function Snake(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 25;
  this.width = 25;
  this.positions = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ];

  this.direction = 'E';

  this.color = 'blue';
}

Snake.prototype.move = function () {
 
  var nextX = this.positions[0].x;
  var nextY = this.positions[0].y;

  switch (this.direction) {
    case 'N':
      nextY -= this.height;
      break;
    case 'S':
      nextY += this.height;
      break;
    case 'E':
      nextX += this.width;
      break;
    case 'W':
      nextX -= this.width;  
    break;
  }

  if (nextX > (this.canvas.width - this.width)) {
    nextX = nextX - this.canvas.width;
  } else if (nextX < 0) {
    nextX = nextX + this.canvas.width;
  }

  if (nextY > (this.canvas.height - this.width)) {
    nextY = nextY - this.canvas.width;
  } else if (nextY < 0) {
    nextY = nextY + this.canvas.width;
  }
  
  for (var i = this.positions.length - 1; i > 0; i--) {
    this.positions[i].x = this.positions[i - 1].x;
    this.positions[i].y = this.positions[i - 1].y;
  }
  
  this.positions[0].x = nextX;
  this.positions[0].y = nextY;
}

Snake.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.positions.forEach((position) => {
    this.ctx.fillRect(position.x, position.y, this.width, this.height);
  });
}

Snake.prototype.setDirection = function (newDirection) {
  this.direction = newDirection;
}
