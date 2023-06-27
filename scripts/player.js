class Player extends Sprite {
  constructor(x, y, obstacleSprites) {
    super(x, y, 'img-player');
    this.obstacleSprites = obstacleSprites;

    // Graphics setup
    this.frameCount = 0;
    this.animationSpeed = 0.01;
    this.animations = this._getAssets();
    this.status = 'idle';
    this.direction = 'down';

    this.speed = 0.5;
    this.attackTime = 400;
  }

  update(dt, keys) {
    if (this.status !== 'attack' && this.status !== 'magic') {
      this. _keyboardUpdate(dt, keys)
    }

    const statusName = `${this.direction}-${this.status}`;
    if (statusName !== this.oldStatus) {
      this.oldStatus = statusName;
      this.frameCount = 0;
      this.animationImages = this.animations[statusName];
    } else {
      this.frameCount += dt * this.animationSpeed;
      if (this.frameCount >= this.animationImages.length) {
        this.frameCount = 0;
      }
    }

    const frameIndex = Math.floor(this.frameCount);
    this.image = this.animationImages[frameIndex];
  }

  _keyboardUpdate(dt, keys) {
    this.dx = 0;
    this.dy = 0;
    this.status = 'idle';

    // Movement
    if (keys.has('ArrowRight')) {
      this.dx = 1;
      this.direction = 'right';
      this.status = 'move';
    } else if (keys.has('ArrowLeft')) {
      this.dx = -1;
      this.direction = 'left';
      this.status = 'move';
    }

    if (keys.has('ArrowDown')) {
      this.dy = 1;
      this.direction = 'down';
      this.status = 'move';
    } else if (keys.has('ArrowUp')) {
      this.dy = -1;
      this.direction = 'up';
      this.status = 'move';
    }

    // Attack
    if (keys.has(' ')) {
      console.log('Attack');
      this.status = 'attack';
      setTimeout(()=> (this.status = 'idle'), this.attackTime);
    }

    // Magic
    if (keys.has('Control')) {
      console.log('Magic');
      this.status = 'attack';
      setTimeout(()=> (this.status = 'idle'), this.attackTime);
    }

    this._move(this.dx, this.dy, dt);
  }

  getHitbox() {
    return {
      x1: this.x,
      y1: this.y + 12,
      x2: this.x + TILE_SIZE,
      y2: this.y + TILE_SIZE - 12,
    };
  }

  _getAssets() {
    const dirs = ['up', 'down', 'left', 'right'];
    const types = ['', 'idle', 'attack'];
    const animations = {};

    dirs.forEach((dir) =>{
      types.forEach((type) => {
        if (!type) {
          const images = [];
          for (let i = 0; i < 4; i++) {
            const imageName = `img-player-${dir}-${i}`;
            images.push(document.getElementById(imageName));
          }
          animations[dir + '-move'] = images;
        } else {
          const name = `${dir}-${type}`;
          const imageName = `img-player-${name}`;
          animations[name] = [document.getElementById(imageName)];
        }
      })
    });

    return animations;
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
