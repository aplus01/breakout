export default class lives {
  constructor(game) {
    this.game = game;
    this.ballImage = document.getElementById('ball');
  }

  draw(ctx) {
    if (!this.game.lives) return;

    for (let i = 1; i <= this.game.lifeCount; i++) {
      ctx.drawImage(this.ballImage, 15 * i, this.game.gameHeight - 20, 10, 10);
    }
  }

  update(deltaTime) {}
}
