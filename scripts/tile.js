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
const getBlockName = () => null;
const getGrassName = (n) => `img-grass-${n}`;
const getObjectName = (n) => `img-object-${n}`;

function getTiles(tileArray, getName, groups) {
  for (let i = 0; i < tileArray.length; i++) {
    const row = tileArray[i];
    const y = i * TILE_SIZE;

    for (let j = 0; j < row.length; j++) {
      const x = j * TILE_SIZE;

      if (row[j] > 0) {
        const tileName = getName(row[j]);
        const tile = new Tile(x, y, tileName);

        groups.forEach(group => group.push(tile));
      }
    }
  }
}
