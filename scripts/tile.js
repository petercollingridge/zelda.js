class Tile extends Sprite {
  constructor(x, y, groups) {
    super(x, y, 'img-rock', groups);
  }

  getHitbox() {
    return {
      x1: this.x,
      y1: this.y + 5,
      x2: this.x + TILE_SIZE,
      y2: this.y + TILE_SIZE - 5,
    };
  }
}
