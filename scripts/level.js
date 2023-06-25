class Level {
  constructor() {
    // Sprite group setup
    this.visibleSprites = [];
    this.obstacleSprites = [];

    // Sprite setup
    this._createMap();
  }

  _createMap() {
    for (let i = 0; i < WORLD_MAP.length; i++) {
      const row = WORLD_MAP[i];
      const y = i * TILESIZE;

      for (let j = 0; j < row.length; j++) {
        const x = j * TILESIZE;

        if (row[j] === 'x') {
          new Tile(x, y, [this.visibleSprites]);
          console.log(x, y);
        }
      }
    }
  }

  update(dt) {
  }

  draw(ctx) {
    this.visibleSprites.forEach((sprite) => sprite.draw(ctx));
  }
}
