class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#f8f8f8';
    ctx.font = "12px Georgia";
    ctx.fillText(Math.round(this.time), 20, 20);
  }

  update(dt) {
    this.time += dt;
  }
}
