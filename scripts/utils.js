// Detect collisions between two rectangular objects,
// with x, y, x2, y2 attributes
function collision(rect1, rect2) {
  return rect1.x < rect2.x2 &&
         rect2.x < rect1.x2 &&
         rect1.y < rect2.y2 &&
         rect2.y < rect1.y2;
}
