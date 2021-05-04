import Game, { GAMESTATE } from './game.js';

export default class InputHandler {
  constructor(game) {
    document.addEventListener('keydown', (KeyboardEvent) => {
      switch (KeyboardEvent.code) {
        case 'ArrowLeft':
          game.paddle.moveLeft();
          break;
        case 'ArrowRight':
          game.paddle.moveRight();
          break;
        case 'Escape':
          if ([GAMESTATE.RUNNING, GAMESTATE.PAUSED].includes(game.gameState))
            game.togglePause();
          break;
        case 'Space':
          if ([GAMESTATE.MENU, GAMESTATE.GAMEOVER].includes(game.gameState))
            game.start();
          break;
      }
    });
    document.addEventListener('keyup', (KeyboardEvent) => {
      switch (KeyboardEvent.code) {
        case 'ArrowLeft':
          if (game.paddle.speed < 0) game.paddle.stopPaddle();
          break;
        case 'ArrowRight':
          if (game.paddle.speed > 0) game.paddle.stopPaddle();
          break;
      }
    });
  }
}
