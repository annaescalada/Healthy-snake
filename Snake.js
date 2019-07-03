'use strict';

function Snake(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 25;
  this.positions = [
    { x: 0, y: 0 },
    { x: 0, y: -1 * this.size},
    { x: 0, y: -2 * this.size},
    { x: 0, y: -3 * this.size}
  ];

  this.direction = 'E';
  this.isClicked = false;

  this.color = '#4673E9';
}

Snake.prototype.move = function () {
 
  var nextX = this.positions[0].x;
  var nextY = this.positions[0].y;

  switch (this.direction) {
    case 'N':
      nextY -= this.size;
      break;
    case 'S':
      nextY += this.size;
      break;
    case 'E':
      nextX += this.size;
      break;
    case 'W':
      nextX -= this.size;  
      break;
  }

  if (nextX > (this.canvas.width - this.size)) {
    nextX = nextX - this.canvas.width;
  } else if (nextX < 0) {
    nextX = nextX + this.canvas.width;
  }

  if (nextY > (this.canvas.height - this.size)) {
    nextY = nextY - this.canvas.height;
  } else if (nextY < 0) {
    nextY = nextY + this.canvas.height;
  }
  
  for (var i = this.positions.length - 1; i > 0; i--) {
    this.positions[i].x = this.positions[i - 1].x;
    this.positions[i].y = this.positions[i - 1].y;
  }
  
  this.positions[0].x = nextX;
  this.positions[0].y = nextY;
}

Snake.prototype.draw = function() {
  this.ctx.fillStyle ='#16419A';
  this.positions.forEach((position,index) => {
    // if (index === 0) {
         
    // }
     this.ctx.fillRect(position.x, position.y, this.size, this.size);
  });
  this.ctx.fillStyle = this.color;
  this.positions.forEach((position,index) => {
   // if (index === 0) {
        
   // }
    this.ctx.fillRect(position.x + 1, position.y + 1, this.size - 2, this.size - 2);
  });
}

Snake.prototype.setDirection = function (newDirection) {
  console.log(this)

  if(!this.isClicked) {
    this.setCliked();
    this.isClicked = true;
    this.direction = newDirection;
  }
}

Snake.prototype.setCliked = function() {
  setTimeout(() => {
    this.isClicked = false;
  }, 200)
}
