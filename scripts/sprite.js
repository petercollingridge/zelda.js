class Sprite {
  constructor(x, y, imageName) {
    this.x = x;
    this.y = y;

    if (imageName) {
      this.image = document.getElementById(imageName);
    }
  }

  draw(ctx, offsetX, offsetY) {
    if (this.image) {
      const x = this.x + offsetX;
      const y = this.y + offsetY;
      ctx.drawImage(this.image, x, y, TILE_SIZE, TILE_SIZE);
    }
  }

  getHitbox() {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + TILE_SIZE,
      y2: this.y + TILE_SIZE,
    };
  }
}
