class Enemy extends Character {
  constructor(game, x, y, type) {
    super(game, x, y, 'img-' + type);

    Object.entries(MONSTERS[type]).forEach(([attribute, value]) => {
      this[attribute] = value;
    })
  }

  update(dt) {
    const player = this.game.player;
    const dx = this.x - player.x;
    const dy = this.y - player.y;

    if (dx > this.noticeRadius || dy > this.noticeRadius) {
      this.status = 'idle';
    } else {
      // Calculate distance squared
      const d2 = dx * dx + dy * dy;
  
      if (d2 < this.attackRadius * this.attackRadius) {
        this.status = 'attack';
      } else if (d2 < this.noticeRadius * this.noticeRadius) {
        this.status = 'move';
        this._getMove(dt, dx, dy, d2);
      } else {
        this.status = 'idle';
      }
    }

    this._updateAnimation(dt);
  }

  _getMove(dt, dx, dy, d2) {
    const d = Math.sqrt(d2);
    const speed = this.speed * dt * 0.1 / d;
    this.x -= dx * speed;
    this.y -= dy * speed;
  }
}
