'use strict';

function main() {
  var mainElement = document.querySelector('#site-main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createSplashScreen() {
    var splashScreen = buildDom(`
      <section class="homescreen">
        <div class="flex-col-end">
          <h1>snake</h1>
          <h2>healthy snakes eat apples...</h2>
          <p>Write your name and click start to play!</p>
          <input id="player-name" placeholder="your name"></input>
          <button>Start</button>
          <img class="absolute image1" src="./styles/Apple-icon.png">
          <img class="absolute image2" src="./styles/Apple-icon.png">
          <img class="absolute image3" src="./styles/Apple-icon.png">
          <img class="absolute image4" src="./styles/Apple-icon.png">
          <img class="absolute image5" src="./styles/Apple-icon.png">
          <img class="absolute image6" src="./styles/Apple-icon.png">
        </div>
        <div class="flex-col-end">
          <div></div>
        </div>
        <div class="snake"></div>
        <div class="snake2"></div>
        <div class="snake3"></div>
      </section>
    `);
    var startButton = splashScreen.querySelector('button');
    var currentPlayerName = splashScreen.querySelector('input');
    startButton.addEventListener('click', function() {
      window.localStorage.setItem('currentPlayerName', currentPlayerName.value);
      createGameScreen()
    });
  }

  function createGameScreen(playerName) {
    var gameScreen = buildDom(`
    <section class="homescreen">
      <div class="flex-col-end">
        <img class="absolute image1" src="./styles/Apple-icon.png">
        <img class="absolute image2" src="./styles/Apple-icon.png">
        <img class="absolute image3" src="./styles/Apple-icon.png">
        <img class="absolute image4" src="./styles/Apple-icon.png">
        <img class="absolute image5" src="./styles/Apple-icon.png">
        <img class="absolute image6" src="./styles/Apple-icon.png">
      </div>
      <div class="flex-col-end">
        <div></div>
      </div>
      <div class="snake"></div>
      <div class="snake2"></div>
      <div class="snake3"></div>
      <div id="game-screen">
        <div id="game-score-level">
          <p id="canvas-score"><img id="styles/apple-icon" src="./styles/Apple-icon.png" height="25"> Score = 0</p>
          <p id="canvas-level"> <img id="apple-icon" src="./styles/Trophy-icon.svg" height="25"> Level = 1</p>
        </div>
        <canvas id="canvas" width="500px" height="500px"></canvas>
      </div>
    </section>
    `);
    var canvas = gameScreen.querySelector('canvas');
    //var playerName = gameScreen.querySelector('player-name');
    var game = new Game(canvas);
    //game.playerName = playerName.value;
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
    var rankingStr = localStorage.getItem(`rankingArr`);
    var rankingArr = JSON.parse(rankingStr);
    if (rankingArr[0] === undefined) {
      var name1 = '';
      var score1 = '';
      var level1 = '';
    } else {
      var firstPlayer = rankingArr[0];
      var name1 = firstPlayer.name;
      var score1 = firstPlayer.score;
      var level1 = firstPlayer.level;
    }
    if (rankingArr[1] === undefined) {
      var name2 = '';
      var score2 = '';
      var level2 = '';
    } else {
      var secondPlayer = rankingArr[1];
      var name2 = secondPlayer.name;
      var score2 = secondPlayer.score;
      var level2 = secondPlayer.level;
    }
    if (rankingArr[2] === undefined) {
      var name3 = '';
      var score3 = '';
      var level3 = '';
    } else {
      var thirdPlayer = rankingArr[2];
      var name3 = thirdPlayer.name;
      var score3 = thirdPlayer.score;
      var level3 = thirdPlayer.level;
    }
    var gameOverScreen = buildDom(`
    <section class="homescreen game-over">
        <div class="flex-col-end">
          <h1>Game Over</h1>
          <h2>Ranking:</h2>
          <div class="ranking flex">
            <p>#1 ${name1}</p>
            <p><img  src="./styles/Apple-icon.png" height="25"> Score = ${score1}</p>
            <p><img  src="./styles/Trophy-icon.svg" height="25"> Level = ${level1}</p>
          </div>
          <div class="ranking flex">
            <p>#2 ${name2}</p>
            <p><img  src="./styles/Apple-icon.png" height="25"> Score = ${score2}</p>
            <p><img  src="./styles/Trophy-icon.svg" height="25"> Level = ${level2}</p>
          </div>
          <div class="ranking flex">
            <p>#3 ${name3}</p>
            <p><img  src="./styles/Apple-icon.png" height="25"> Score = ${score3}</p>
            <p><img  src="./styles/Trophy-icon.svg" height="25"> Level = ${level3}</p>
          </div>
          <button>Restart</button>
          <img class="absolute image1" src="./styles/Apple-icon.png">
          <img class="absolute image2" src="./styles/Apple-icon.png">
          <img class="absolute image3" src="./styles/Apple-icon.png">
          <img class="absolute image4" src="./styles/Apple-icon.png">
          <img class="absolute image5" src="./styles/Apple-icon.png">
          <img class="absolute image6" src="./styles/Apple-icon.png">
        </div>
        <div class="flex-col-end">
          <div></div>
        </div>
        <div class="snake"></div>
        <div class="snake2"></div>
      </section>
    `);
    var restartButton = gameOverScreen.querySelector('button');
    restartButton.addEventListener('click', createGameScreen);
  }

  //createGameOverScreen();
  createSplashScreen();
}

window.addEventListener('load', main);

