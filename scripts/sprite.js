class Sprite {
  constructor(x, y, imageName, offset) {
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

    // Offset position since grid deterrmines base of object
    if (offset) {
      this.y -= this.height - TILE_SIZE;
    }
  }

  draw(ctx, offsetX, offsetY) {
    if (this.image) {
      const x = this.x + offsetX;
      const y = this.y + offsetY;
      ctx.drawImage(this.image, x, y, this.width, this.height);
    }
  }

  setImage(image) {
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
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
