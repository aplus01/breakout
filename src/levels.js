import Brick from './brick.js';

export const buildLevel = (game, level) => {
  const bricks = [];
  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick !== 1) return;

      const position = {
        x: brickIndex * 80,
        y: 80 + 80 * rowIndex,
      };
      bricks.push(new Brick(game, position));
    });
  });
  return bricks;
};

// levels are 10 blocks across
// 0 is empty space, 1 is a block

export const level1 = [
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 1, 0, 1, 0],
];

export const level2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];
