import { detectCollision } from './detect-collision.js';

export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.ballImage = document.getElementById('ball');
    this.size = 25;

    this.reset();

    this.game = game;
  }

  reset() {
    this.position = {
      x: 10,
      y: 400,
    };

    this.speed = {
      x: 4,
      y: -2,
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.ballImage,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(dt) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // collision with left/right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0)
      this.speed.x = -this.speed.x;

    // collision w/ bottom
    if (this.position.y + this.size > this.gameHeight) {
      --this.game.lifeCount;
      this.reset();
    }

    // collision w/ top
    if (this.position.y < 0) this.speed.y = -this.speed.y;

    // collision w/ paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
