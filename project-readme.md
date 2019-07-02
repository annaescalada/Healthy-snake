# Snake

## Description
The player controls a snake and has to eat food that appears randomnly on a bordered canvas. Tha player loses when the snake runs into itself.obstacle, or itself.

## MVP (DOM - CANVAS)

Snake that moves through the canvas and eats food to increase score.

Game is over if snake collapses on itself.


## Backlog

- When score reaches certain number, level increases and snake moves faster.

- When snake eats food, grows.

## Data structure

Game

Classes:
this.snake
this.food
this.usGameOver
this.onGameOver
this.canvas
this.ctx
this.level (backlog)

Methods:
this.prototype.startGame()
this.prototype.update()
this.prototype.draw()

Snake

Classes:
this.canvas
this.ctx
this.height
this.width
this.positions
this.direction
this.color

Methods:
this.prototype.mode()
this.prototype.draw()
this.prototype.setDirection()

Food

Classes:
this.canvas
this.ctx
this.with
this.height
this.x
this.y
this.color

Methods:
this.prototype.startGame()
this.prototype.update()
this.prototype.draw()


## States y States Transitions
Definition of the different states and their transition:

- splashScreen: has a button to start the game.
- gameScreen: consists on the canvas and the gameplay.
- gameoverScreen: shows score and has a button to restart the game.


## Task

Create folder and files locally.

Setup git and remote repository.

Create main.js and transition screens.

Create game.js and game loop.

Create Snake.js.

Create Food.js.

Work on the game over condition with a new methos checkCollision in game.

Edit CSS to make the game more user friendly.

## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)