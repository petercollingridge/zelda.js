class Tile extends Sprite {
  constructor(x, y, name) {
    super(x, y, name);
  }

  getHitbox() {
    return {
      x1: this.x + 12,
      y1: this.y + this.height - TILE_SIZE + 10,
      x2: this.x + this.width - 12,
      y2: this.y + this.height - 10,
    };
  }
}

// Obstacle blocks have no image so have no name
const getBlockTile = (x, y) => new Tile(x, y);

const getGrassTile = (x, y, n) => new Tile(x, y, `img-grass-${n}`);

const getObjectTile = (x, y, n) => new Tile(x, y, `img-object-${n}`);

const getCharacterTile = (x, y, n, game) => {
  if (n === 1) {
    game.player = new Player(game, x, y);
    return game.player;
  } else {
    const name = [,, 'bamboo', 'spirit', 'raccoon', 'squid'][n];

    if (name) {
      const enemy = new Enemy(game, x, y, name);
      game.enemies.push(enemy);
      return enemy
    }
  }
}

function getTiles(game, tileArray, getTile, groups) {
  for (let i = 0; i < tileArray.length; i++) {
    const row = tileArray[i];
    const y = i * TILE_SIZE;

    for (let j = 0; j < row.length; j++) {
      const x = j * TILE_SIZE;

      if (row[j] > 0) {
        const tile = getTile(x, y, row[j], game);
        if (tile) {
          groups.forEach(group => group.push(tile));
        }
      }
    }
  }
}
