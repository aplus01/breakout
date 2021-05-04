import Game from './game.js';

let canvas = document.getElementById('sandbox-canvas');

canvas.height = 800;
canvas.width = 800;
let ctx = canvas.getContext('2d');

const GAME_HEIGHT = canvas.height;
const GAME_WIDTH = canvas.width;
const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

const gameLoop = (timestamp) => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
