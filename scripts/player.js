class Player {
  constructor(x, y, groups=[]) {
    this.x = x;
    this.y = y;
    this.groups = groups;
    this.image = document.getElementById(`img-player`);

    groups.forEach((group) => {
      group.push(this);
    });
  }

  update(dt) {
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, TILE_SIZE, TILE_SIZE);
  }
}
