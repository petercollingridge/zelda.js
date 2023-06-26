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

    this.player = new Player(2000, 1450, this.obstacleSprites);
    this.visibleSprites.push(this.player);
    
    getTiles(BLOCK_TILES, getBlockName, [this.obstacleSprites]);
    getTiles(GRASS_TILES, getGrassName, [this.visibleSprites, this.obstacleSprites]);
    getTiles(OBJECT_TILES, getObjectName, [this.visibleSprites, this.obstacleSprites]);
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

    this.visibleSprites = this.visibleSprites.sort((a, b) => a.y + a.height - b.y - b.height);

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
