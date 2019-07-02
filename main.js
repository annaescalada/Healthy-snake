'use strict';

function main() {
  var mainElement = document.querySelector('#site-main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createSplashScreen() {
    var splashScreen = buildDom(`
      <section>
        <h1>Snake</h1>
        <button>Start</button>
      </section>
    `);
    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click',createGameScreen);
  }

  function createGameScreen() {
    var gameScreen = buildDom(`
    <section>
      <canvas width="500px" height="500px"></canvas>
    </section>
    `);
    var canvas = gameScreen.querySelector('canvas');
    var game = new Game(canvas);
    game.gameOverCallback(createGameOverScreen);
    game.startGame();
    document.addEventListener('keydown',function(event) {
      if(event.key === 'ArrowDown') {
        game.player.setDirection(1);
      } else if (event.key === 'ArrowUp') {
        game.player.setDirection(-1);
      }
    });
    document.addEventListener('keyup',function(event) {
      game.player.setDirection(0);
    });
  }

  function createGameOverScreen() {
    var gameOverScreen = buildDom (`
    <section>
      <h1>Game Over</h1>
      <button>Restart</button>
    </section>
    `);
    var restartButton = gameOverScreen.querySelector('button');
    restartButton.addEventListener('click',createGameScreen);
  }

  createSplashScreen();
}

window.addEventListener('load', main);

