class Sprite {
  constructor(x, y, imageName, groups=[]) {
    this.x = x;
    this.y = y;
    this.x2 = x + TILE_SIZE;
    this.y2 = y + TILE_SIZE;

    this.groups = groups;
    this.image = document.getElementById(imageName);

    groups.forEach((group) => {
      group.push(this);
    });
  }

  update(dt) {
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, TILE_SIZE, TILE_SIZE);
  }

  move(dx, dy) {
    this.moveX(dx);
    this.moveX(dy);
  }

  moveX(dx) {
    this.x += dx;
    this.x2 += dx;
  }

  moveY(dy) {
    this.y += dy;
    this.y2 += dy;
  }
}