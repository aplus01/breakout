import { detectCollision } from './detect-collision.js';

export default class Brick {
  constructor(game, position) {
    this.game = game;

    this.brickImage = document.getElementById('brick');
    this.width = 80;
    this.height = 80;
    this.position = position;
    this.markDeleted = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.brickImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markDeleted = true;
    }
  }
}
