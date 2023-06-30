class Character extends Sprite {
  constructor(game, x, y, imageName) {
    super(x, y);
    this.game = game;
    this.inputHandler = game.inputHandler;
    this.obstacleSprites = game.obstacleSprites;
    game.visibleSprites.push(this);

    // Graphics setup
    this.status = 'idle';
    this.direction = 'down';
    this.frameCount = 0;
    this.animationSpeed = 0.01;
    this.animations = this._getAssets(imageName);

    this._updateAnimation(0);
  }

  update(dt) {
    if (this.status === 'attack' || this.status === 'magic') {
      this.cooldown -= dt;
      if (this.cooldown <= 0) {
        this.cooldown = 0;
        this.status = 'idle';
      }
    } else {
      this._getMove(dt);
      if (this.status === 'move') {
        this._move(this.dx, this.dy, dt);
      }
    }

    this._updateAnimation(dt);
  }

  _updateAnimation(dt) {
    const animationName = this._getAnimationName();

    if (animationName !== this.currentAnimation) {
      this.currentAnimation = animationName;
      this.frameCount = 0;
      this.animationImages = this.animations[animationName];
    } else {
      this.frameCount += dt * this.animationSpeed;
      if (this.frameCount >= this.animationImages.length) {
        this.frameCount = 0;
      }
    }

    const frameIndex = Math.floor(this.frameCount);
    this.setImage(this.animationImages[frameIndex]);
  }

  _getAssets(baseName) {
    const animations = {};

    const images = document.getElementById(baseName).children;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imagePath = image.id.split('-').slice(2);

      // Remove any numbers at the end of a path name
      if (!isNaN(imagePath.slice(-1))) {
        imagePath.splice(imagePath.length - 1, 1);
      }

      const animationName = imagePath.join('-');

      if (animations[animationName]) {
        animations[animationName].push(image);
      } else {
        animations[animationName] = [image];
      }
    }

    return animations;
  }

  _getAnimationName() {
    return this.status;
  }

  _getMove(dt) {
    // TODO
  }

  _move(dx, dy, dt) {
    let speed = dt * this.speed * 0.1;
    if (dx && dy) {
      // Moving diagonally, so normalise
      speed *= Math.SQRT1_2; 
    }

    if (dx) {
      this.x += dx * speed;
      this._collide('horizontal');
    }
    if (dy) {
      this.y += dy * speed;
      this._collide('vertical');
    }
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
