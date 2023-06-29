class Player extends Sprite {
  constructor(x, y, game) {
    super(x, y, 'img-player');
    this.game = game;
    this.inputHandler = game.inputHandler;
    this.obstacleSprites = game.obstacleSprites;

    // Graphics setup
    this.frameCount = 0;
    this.animationSpeed = 0.01;
    this.animations = this._getAssets();
    this.status = 'idle';
    this.direction = 'down';

    // Player stats
    this.health = 60;
    this.maxHealth = 100;
    this.energy = 60;
    this.maxEnergy = 60;
    this.attack = 5;
    this.magic = 4;
    this.speed = 5;
    this.xp = 12;

    this.weaponIndex = 0;
    this.weaponSprite = false;

    this.magicIndex = 0;
  }

  update(dt) {
    if (this.status !== 'attack' && this.status !== 'magic') {
      this. _keyboardUpdate(dt)
    }

    // Update animation
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

  draw(ctx, offsetX, offsetY) {
    super.draw(ctx, offsetX, offsetY);
    if (this.status === 'attack') {
      this.weaponSprite.draw(ctx, offsetX, offsetY);

      // Draw self again over the top of the weapon
      if (this.direction === 'up') {
        super.draw(ctx, offsetX, offsetY);
      }
    }
  }

  // TODO: generalise how keyboard input works
  _keyboardUpdate(dt) {
    const keysDown = this.inputHandler.keysDown;
    const keysUp = this.inputHandler.keysUp;

    this.dx = 0;
    this.dy = 0;
    this.status = 'idle';

    playerActions.forEach((action) => {
      if (action.singlePress) {
        if (keysDown.has(action.key) && !action.inProgress) {
          action.inProgress = true;
          action.action(this);
        } else if (keysUp.has(action.key)) {
          // Action only ends when key is released
          action.inProgress = false;
          keysUp.delete(action.key);
        }
      } else if (keysDown.has(action.key)) {
        action.action(this);
      }
    });

    if (this.status === 'move') {
      this._move(this.dx, this.dy, dt);
    }
  }

  getHitbox() {
    return {
      x1: this.x,
      y1: this.y + 12,
      x2: this.x + TILE_SIZE,
      y2: this.y + TILE_SIZE - 12,
    };
  }

  _attack() {
    this.status = 'attack';
    const attackTime = WEAPONS[this.weaponIndex].cooldown;

    setTimeout(()=> (this.status = 'idle'), attackTime);

    // Get weapon image
    const weapon = WEAPONS[this.weaponIndex];
    const spriteName = `img-weapon-${weapon.name}-${this.direction}`;
    this.weaponSprite = new Sprite(this.x, this.y, spriteName);

    // Position weapon
    if (this.direction === 'left') {
      this.weaponSprite.x -= this.weaponSprite.width;
      this.weaponSprite.y += (this.height + 32 - this.weaponSprite.height) / 2;
    } else if (this.direction === 'right') {
      this.weaponSprite.x += this.width;
      this.weaponSprite.y += (this.height + 32 - this.weaponSprite.height) / 2;
    } else if (this.direction === 'up') {
      this.weaponSprite.x += (this.width - this.weaponSprite.width) / 2 + 12;
      this.weaponSprite.y += 16 - this.weaponSprite.height;
    } else if (this.direction === 'down') {
      this.weaponSprite.x += 24 - this.weaponSprite.width / 2;
      this.weaponSprite.y += this.height;
    }
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
    let speed = dt * this.speed * 0.1;
    if (dx && dy) {
      // Moving diagonally, so normalise
      speed *= Math.SQRT1_2; 
    }

    if (dx) {
      this.x += dx * speed;
      this._collide('horizontal');
    } else if (dy) {
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
