export const detectCollision = (ball, gameObject) => {
  let ballBottom = ball.position.y + ball.size;
  let ballTop = ball.position.y;

  let objectTop = gameObject.position.y;
  let objectLeft = gameObject.position.x;
  let objectRight = gameObject.position.x + gameObject.width;
  let objectBottom = gameObject.position.y + gameObject.height;
  if (
    ballBottom >= objectTop &&
    ballTop <= objectBottom &&
    ball.position.x >= objectLeft &&
    ball.position.x + ball.size <= objectRight
  ) {
    return true;
  } else return false;
};
