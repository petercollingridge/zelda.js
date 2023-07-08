class Player extends Character {
  constructor(game, x, y) {
    super(game, x, y, 'img-player');
    // Player stats
    this.health = 60;
    this.maxHealth = 100;
    this.energy = 60;
    this.maxEnergy = 60;
    this.attack = 5;
    this.magic = 4;
    this.speed = 5;
    this.xp = 12;

    this.cooldown = 0;
    this.weaponIndex = 0;
    this.weaponSprite = false;

    this.magicIndex = 0;
    this.magicCooldown = 300;
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

  _getAnimationName() {
    return `${this.status}-${this.direction}`;
  }

  _getAction() {
    const keysDown = this.inputHandler.keysDown;
    const keysUp = this.inputHandler.keysUp;

    this.dx = 0;
    this.dy = 0;
    let status = 'idle';

    playerActions.forEach((action) => {
      if (keysDown.has(action.key)) {
        if (!(action.singlePress && action.inProgress)) {
          // Take action
          action.inProgress = true;
          action.action(this);
          if (action.name){
            status = action.name;
          }
        }
      } else if (action.singlePress && keysUp.has(action.key)) {
        // Action only ends when key is released
        action.inProgress = false;
        keysUp.delete(action.key);
      }
    });

    if (status === 'move') {
      // Moving diagonally, so normalise
      this.dx *= Math.SQRT1_2; 
      this.dy *= Math.SQRT1_2; 
    }

    return status
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
    this.cooldown = WEAPONS[this.weaponIndex].cooldown;
    this.maxCooldown = this.cooldown;

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

  _magic() {
    console.log('Magic');
    this.status = 'attack';
    this.cooldown = this.magicCooldown;
  }
}
