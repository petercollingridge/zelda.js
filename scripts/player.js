class Player extends Sprite {
  constructor(x, y, groups, obstacleSprites) {
    super(x, y, 'img-player', groups);
    this.obstacleSprites = obstacleSprites;

    this.speed = 0.4;
  }

  update(dt, keys) {
    this.dx = 0;
    this.dy = 0;

    if (keys.has('ArrowRight')) {
      this.dx = 1;
    } else if (keys.has('ArrowLeft')) {
      this.dx = -1;
    }

    if (keys.has('ArrowDown')) {
      this.dy = 1;
    } else if (keys.has('ArrowUp')) {
      this.dy = -1;
    }

    this._move(this.dx, this.dy, dt);
  }

  _move(dx, dy, dt) {
    let speed = this.speed * dt;
    if (dx && dy) {
      // Moving diagonally, so normalise
      speed *= Math.SQRT1_2; 
    }

    this.moveX(dx * speed);
    this._collide('horizontal');
    this.moveY(dy * speed);
    this._collide('vertical');
  }

  _collide(direction) {
    if (direction === 'horizontal') {
      this.obstacleSprites.forEach((sprite) => {
        if (collision(this, sprite)) {
          if (this.dx > 0) {  // Moving right
            const dx = sprite.x - this.x2;
            this.moveX(dx);
          } else if (this.dx < 0) {  // Moving left
            const dx = sprite.x2 - this.x;
            this.moveX(dx);
          }
        }
      });
    } else if (direction === 'vertical') {
      this.obstacleSprites.forEach((sprite) => {
        if (collision(this, sprite)) {
          if (this.dy > 0) {  // Moving down
            const dy = sprite.y - this.y2;
            this.moveY(dy);
          } else if (this.dy < 0) {  // Moving up
            const dy = sprite.y2 - this.y;
            this.moveY(dy);
          }
        }
      });
    }
  }
}
