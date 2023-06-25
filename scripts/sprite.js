class Sprite {
  constructor(x, y, imageName, groups=[]) {
    this.x = x;
    this.y = y;

    this.groups = groups;
    this.image = document.getElementById(imageName);

    groups.forEach((group) => {
      group.push(this);
    });
  }

  update(dt) {
  }

  draw(ctx, offsetX, offsetY) {
    const x = this.x + offsetX;
    const y = this.y + offsetY;
    ctx.drawImage(this.image, x, y, TILE_SIZE, TILE_SIZE);
  }

  getHitbox() {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + TILE_SIZE,
      y2: this.y + TILE_SIZE,
    }
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}