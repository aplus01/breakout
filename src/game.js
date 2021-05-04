import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import { level1, level2, buildLevel } from './levels.js';
import lives from './lives.js';

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.bricks = [];
    // available levels
    this.levels = [level1, level2];
    // track loaded level
    this.currentLevel = 0;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this);
    this.lives = new lives(this);

    // begin game at menu
    this.gameState = GAMESTATE.MENU;
  }

  start() {
    this.lifeCount = 3;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.lives, this.paddle, this.ball];
    this.gameState = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lifeCount === 0) this.gameState = GAMESTATE.GAMEOVER;

    // only update if running
    if (this.gameState !== GAMESTATE.RUNNING) return;

    // update bricks & other game objects
    [...this.gameObjects, ...this.bricks].forEach((o) => o.update(deltaTime));

    // remove deleted bricks
    this.bricks = this.bricks.filter((o) => !o.markDeleted);

    // all bricks cleared
    // reset ball & load new level
    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.bricks = buildLevel(this, this.levels[this.currentLevel]);
      this.ball.reset();
    }
  }

  draw(ctx) {
    // clear screen
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

    // draw non-deleted bricks & all game objects
    [...this.gameObjects, ...this.bricks].forEach((o) => {
      o.draw(ctx);
    });

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.fillStyle = '#FFFFFF80';
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = '40px Verdana';
      ctx.strokeStyle = '#32CD32';
      ctx.textAlign = 'center';
      ctx.strokeText('Pause', this.gameWidth * 0.5, this.gameHeight * 0.5);
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = '40px Verdana';
      ctx.strokeStyle = '#32CD32';
      ctx.textAlign = 'center';
      ctx.strokeText(
        'Press SPACEBAR to start',
        this.gameWidth * 0.5,
        this.gameHeight * 0.5
      );
    }
    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.fillStyle = '#FF00004D';
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = '40px Verdana';
      ctx.strokeStyle = 'white';
      ctx.textAlign = 'center';
      ctx.strokeText('GAME OVER ', this.gameWidth * 0.5, this.gameHeight * 0.4);
      ctx.strokeText(
        'Press SPACEBAR to restart',
        this.gameWidth * 0.5,
        this.gameHeight * 0.6
      );
      ctx.fillStyle = 'black';
      ctx.font = '50px Verdana';
      ctx.fillText('😭', this.gameWidth * 0.5, this.gameHeight * 0.5);
    }
  }

  togglePause() {
    // if running then pause, if paused then run
    this.gameState =
      this.gameState === GAMESTATE.RUNNING
        ? GAMESTATE.PAUSED
        : GAMESTATE.RUNNING;
  }
}
