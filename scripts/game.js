class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;

    this.inputHandler = new InputHandler();
    this.level = new Level(this);

    this.offsetX = 0;
    this.offsetY = 0;
  }

  update(dt) {
    this.time += dt;

    const keys = this.inputHandler.keys;
    this.player.update(dt, keys);

    this._updateCamera();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.level.draw(ctx, this.offsetX, this.offsetY);
    // this.debug(ctx);
  }

  _updateCamera() {
    this.offsetX = this.width * 0.5 - this.player.x; 
    this.offsetY = this.height * 0.5 - this.player.y; 
  }

  debug(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#f8f8f8';
    ctx.font = "12px Georgia";
    ctx.fillText(Math.round(this.time), 20, 20);
  }
}
