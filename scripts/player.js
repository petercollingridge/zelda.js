class Player extends Sprite {
  constructor(x, y, groups) {
    super(x, y, 'img-player', groups);

    this.speed = 0.3;
  }

  update(dt, keys) {
    const speed = this.speed * dt;

    if (keys.has('ArrowRight')) {
      this.x += speed;
    } else if (keys.has('ArrowLeft')) {
      this.x -= speed;
    }

    if (keys.has('ArrowDown')) {
      this.y += speed;
    } else if (keys.has('ArrowUp')) {
      this.y -= speed;
    }

  }
}
