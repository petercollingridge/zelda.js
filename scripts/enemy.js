class Enemy extends Character {
  constructor(game, x, y, type) {
    super(game, x, y, 'img-' + type);

    Object.entries(MONSTERS[type]).forEach(([attribute, value]) => {
      this[attribute] = value;
    })
  }

  _getAction() {
    const player = this.game.player;
    const dx = this.x - player.x;
    const dy = this.y - player.y;

    if (Math.abs(dx) < this.noticeRadius || Math.abs(dy) < this.noticeRadius) {
      // Calculate distance squared
      const d2 = dx * dx + dy * dy;
  
      if (d2 < this.attackRadius * this.attackRadius) {
        return 'attack';
      } else if (d2 < this.noticeRadius * this.noticeRadius) {
        // Move towards player
        const d = Math.sqrt(d2);
        this.dx = -dx / d;
        this.dy = -dy / d;
        return 'move';
      }
    }

    return 'idle';
  }
}
