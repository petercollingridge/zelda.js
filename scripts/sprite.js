class Sprite {
  constructor(x, y, imageName) {
    this.x = x;
    this.y = y;

    if (imageName) {
      this.image = document.getElementById(imageName);
      this.width = this.image.width;
      this.height = this.image.height;
    } else {
      this.width = TILE_SIZE;
      this.height = TILE_SIZE;
    }
  }

  draw(ctx, offsetX, offsetY) {
    if (this.image) {
      const x = this.x + offsetX;
      const y = this.y + offsetY;
      ctx.drawImage(this.image, x, y, this.width, this.height);
    }
  }

  getHitbox() {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + this.width,
      y2: this.y + this.height,
    };
  }
}
