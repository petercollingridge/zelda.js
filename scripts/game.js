class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.inputHandler = new InputHandler();
    this.ui = new UI(width, height);

    // Sprite group setup
    this.visibleSprites = [];
    this.obstacleSprites = [];

    // Sprite setup
    this._createMap();
  }

  _createMap() {
    this.groundImage = document.getElementById('img-ground');
    this.enemies = [];
    
    getTiles(this, BLOCK_TILES, getBlockTile, [this.obstacleSprites]);
    getTiles(this, CHARACTER_TILES, getCharacterTile, [this.visibleSprites]);
    getTiles(this, GRASS_TILES, getGrassTile, [this.visibleSprites, this.obstacleSprites]);
    getTiles(this, OBJECT_TILES, getObjectTile, [this.visibleSprites, this.obstacleSprites]);
  }

  update(dt) {
    this.time += dt;
    this.player.update(dt);
    this.enemies.forEach((enemy) => enemy.update(dt) );

    this._updateCamera();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(this.groundImage, this.offsetX, this.offsetY);

    this.visibleSprites = this.visibleSprites.sort((a, b) => a.y + a.height - b.y - b.height);

    this.visibleSprites.forEach((sprite) => {
      sprite.draw(ctx, this.offsetX, this.offsetY);
    });

    this.ui.draw(ctx, this.player);

    this.debug(ctx);
  }

  _updateCamera() {
    this.offsetX = this.width * 0.5 - this.player.x; 
    this.offsetY = this.height * 0.5 - this.player.y; 
  }

  debug(ctx) {
    ctx.fillStyle = '#000';
    ctx.font = "16px Georgia";
    ctx.fillText(this.player.status, this.width / 2, this.height - 20);
  }
}
