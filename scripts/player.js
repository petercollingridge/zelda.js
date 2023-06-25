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

    this.x += dx * speed;
    this._collide('horizontal');
    this.y += dy * speed;
    this._collide('vertical');
  }

  _collide(direction) {
    let hitbox = this.getHitbox();

    if (direction === 'horizontal') {
      this.obstacleSprites.forEach((sprite) => {
        const hitbox2 = sprite.getHitbox();
        if (collision(hitbox, hitbox2)) {
          if (this.dx > 0) {  // Moving right
            this.x += hitbox2.x1 - hitbox.x2;
          } else if (this.dx < 0) {  // Moving left
            this.x += hitbox2.x2 - hitbox.x1;
          }
          hitbox = this.getHitbox();
        }
      });
    } else if (direction === 'vertical') {
      this.obstacleSprites.forEach((sprite) => {
        const hitbox2 = sprite.getHitbox();
        if (collision(hitbox, hitbox2)) {
          if (this.dy > 0) {  // Moving down
            this.y += hitbox2.y1 - hitbox.y2;
          } else if (this.dy < 0) {  // Moving up
            this.y += hitbox2.y2 - hitbox.y1;
          }
          hitbox = this.getHitbox();
        }
      });
    }
  }
}
