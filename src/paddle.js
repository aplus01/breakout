export default class Paddle {
  constructor(game) {
    this.width = 150;
    this.height = 20;
    this.gameWidth = game.gameWidth;

    this.MAX_SPEED = 7;
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 30,
    };
  }

  draw(ctx) {
    this.setFill(ctx);

    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  setFill(ctx) {
    const grd = ctx.createLinearGradient(
      this.position.x,
      this.position.y,
      this.position.x + this.width,
      this.position.y + this.height
    );

    if (this.speed > 1) {
      // moving right color
      grd.addColorStop(1, 'yellow');
      grd.addColorStop(0, 'red');
    } else {
      // moving left color
      grd.addColorStop(1, 'red');
      grd.addColorStop(0, 'yellow');
    }

    // stopped
    if (this.speed === 0) ctx.fillStyle = '#FFFFFFBF';
    else ctx.fillStyle = grd;
  }

  moveLeft() {
    this.speed = -this.MAX_SPEED;
  }

  moveRight() {
    this.speed = this.MAX_SPEED;
  }

  stopPaddle() {
    this.speed = 0;
  }

  update(deltaTime) {
    this.position.x += this.speed;

    // left side collision detection
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    // right side collision detection
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
