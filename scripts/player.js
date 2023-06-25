class Player extends Sprite {
  constructor(x, y, groups) {
    super(x, y, 'img-player', groups);

    this.speed = 0.3;
  }

  update(dt, keys) {
    this._move(dt, keys);
  }

  _move(dt, keys) {
    let dx = 0;
    let dy = 0;

    if (keys.has('ArrowRight')) {
      dx = 1;
    } else if (keys.has('ArrowLeft')) {
      dx = -1;
    }

    if (keys.has('ArrowDown')) {
      dy = 1;
    } else if (keys.has('ArrowUp')) {
      dy = 1;
    }

    let speed = this.speed * dt;
    if (dx && dy) {
      // Moving diagonally, so normalise
      speed *= Math.SQRT1_2; 
    }

    this.x += dx * speed;
    this.y += dy * speed;
  }
}
