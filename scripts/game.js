class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.inputHandler = new InputHandler();

    // Sprite group setup
    this.visibleSprites = [];
    this.obstacleSprites = [];

    // Sprite setup
    this._createMap();
  }

  _createMap() {
    this.groundImage = document.getElementById('img-ground');

    this.player = new Player(2000, 1450, [this.visibleSprites], this.obstacleSprites);

    for (let i = 0; i < FLOOR_BLOCKS.length; i++) {
      const row = FLOOR_BLOCKS[i];
      const y = i * TILE_SIZE;

      for (let j = 0; j < row.length; j++) {
        const x = j * TILE_SIZE;

        if (row[j] === '1') {
          new Tile(x, y, null, [this.obstacleSprites]);
        }
      }
    }

    // for (let i = 0; i < WORLD_MAP.length; i++) {
    //   const row = WORLD_MAP[i];
    //   const y = i * TILE_SIZE;

    //   for (let j = 0; j < row.length; j++) {
    //     const x = j * TILE_SIZE;

    //     if (row[j] === 'x') {
    //       new Tile(x, y, [this.visibleSprites, this.obstacleSprites]);
    //     }
    //     else if (row[j] === 'p') {
    //       this.player = new Player(x, y, [this.visibleSprites], this.obstacleSprites);
    //     }
    //   }
    // }
  }

  update(dt) {
    this.time += dt;

    const keys = this.inputHandler.keys;
    this.player.update(dt, keys);

    this._updateCamera();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(this.groundImage, this.offsetX, this.offsetY);

    this.visibleSprites = this.visibleSprites.sort((a, b) => a.y - b.y);

    this.visibleSprites.forEach((sprite) => {
      sprite.draw(ctx, this.offsetX, this.offsetY);
    });
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
