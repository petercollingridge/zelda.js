class Player extends Sprite {
  constructor(x, y, groups) {
    super(x, y, 'img-player', groups);

    this.speed = 0.2;
    this.dx = 0;
    this.dy = 0;
  }

  update(dt) {
    this.x += this.dx * dt * this.speed;
    this.y += this.dy * dt * this.speed;
  }
}
