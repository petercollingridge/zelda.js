class Level {
  constructor(game) {
    this.game = game;

    // Sprite group setup
    this.visibleSprites = [];
    this.obstacleSprites = [];

    // Sprite setup
    this._createMap();
  }

  _createMap() {
    for (let i = 0; i < WORLD_MAP.length; i++) {
      const row = WORLD_MAP[i];
      const y = i * TILE_SIZE;

      for (let j = 0; j < row.length; j++) {
        const x = j * TILE_SIZE;

        if (row[j] === 'x') {
          new Tile(x, y, [this.visibleSprites, this.obstacleSprites]);
        }
        else if (row[j] === 'p') {
          this.game.player = new Player(x, y, [this.visibleSprites], this.obstacleSprites);
        }
      }
    }
  }

  update(dt) {}

  draw(ctx, offsetX, offsetY) {
    this.visibleSprites.forEach((sprite) => {
      sprite.draw(ctx, offsetX, offsetY)
    });
  }
}
