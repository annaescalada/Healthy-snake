'use strict';

function main() {
  var mainElement = document.querySelector('#site-main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createSplashScreen() {
    // var splashScreen = buildDom(`
    //   <section class="splash flex">
    //   <div class="header">
    //     <h1>Snake</h1>
    //     <button>Start</button>
    //   </div>
    //   <div class="footer-bg">
    //     <canvas width="550px" height="250px"></canvas>
    //   </div>
    //   </section>
    // `);
    var splashScreen = buildDom(`
      <section class="homescreen">
        <div class="flex-col-end">
          <h1>Snake</h1>
          <h2>Healthy snakes eat apples...</h2>
          <button>Start</button>
          <img class="image1" src="./Apple-icon.png">
          <img class="image2" src="./Apple-icon.png">
          <img class="image3" src="./Apple-icon.png">
          <img class="image4" src="./Apple-icon.png">
          <img class="image5" src="./Apple-icon.png">
        </div>
        <div class="flex-col-end">
          <canvas width="550px" height="200px"></canvas>
        </div>
        <div class="snake"></div>
      </section>
    `);
    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', createGameScreen);

    var canvas = splashScreen.querySelector('canvas');
    styleCanvas(canvas, 25)
  }

  function createGameScreen() {
    var gameScreen = buildDom(`
    <section>
      <div id="game-score-level">
        <p id="canvas-score"><img id="apple-icon" src="./Apple-icon.png" height="25"> Score = 0</p>
        <p id="canvas-level"> <img id="apple-icon" src="./Trophy-icon.svg" height="25"> Level = 1</p>
      </div>
      <canvas id="canvas" width="500px" height="500px"></canvas>
    </section>
    `);
    var canvas = gameScreen.querySelector('canvas');
    var game = new Game(canvas);
    game.gameOverCallback(() => { createGameOverScreen(game.totalScore, game.level) });
    game.startGame();
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' && game.snake.direction !== 'N') {
        game.snake.setDirection('S');
      } else if (event.key === 'ArrowUp' && game.snake.direction !== 'S') {
        game.snake.setDirection('N');
      } else if (event.key === 'ArrowRight' && game.snake.direction !== 'W') {
        game.snake.setDirection('E');
      } else if (event.key === 'ArrowLeft' && game.snake.direction !== 'E') {
        game.snake.setDirection('W');
      }
    });
  }

  function createGameOverScreen(score, level) {
    var gameOverScreen = buildDom(`
    <section class="homescreen">
        <div class="flex-col-end">
          <h1>Game Over</h1>
          <p id="gameover-score"><img id="apple-icon" src="./Apple-icon.png" height="25"> Score = ${score}</p>
          <p id="gameover-level"><img id="apple-icon" src="./Trophy-icon.svg" height="25"> Level = ${level}</p>
          <button>Restart</button>
          <img class="image1" src="./Apple-icon.png">
          <img class="image2" src="./Apple-icon.png">
          <img class="image3" src="./Apple-icon.png">
          <img class="image4" src="./Apple-icon.png">
          <img class="image5" src="./Apple-icon.png">
        </div>
        <div class="flex-col-end">
          <canvas width="550px" height="200px"></canvas>
        </div>
        <div class="snake"></div>
      </section>
    `);
    var restartButton = gameOverScreen.querySelector('button');
    restartButton.addEventListener('click', createGameScreen);
  }

  function styleCanvas(canvas, unitSize) {
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
        ctx.fillRect(i * unitSize, ii * unitSize, unitSize, unitSize)
        if (i % 2 !== 0) {
          ctx.fillStyle = '#AAD751';
        } else {
          ctx.fillStyle = '#A2D149';
        }
        ctx.fillRect(i * unitSize, (ii + 1) * unitSize, unitSize, unitSize);
      }
    }
  }

  createSplashScreen();
}

window.addEventListener('load', main);

