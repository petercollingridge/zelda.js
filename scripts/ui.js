class UI {
  constructor(width, height) {
    this.x = 10;
    this.y = 10;
    this.width = width;
    this.height = height;
  }

  draw(ctx, player) {
    ctx.fillRect(this.x, this.y, HEALTH_BAR_WIDTH, BAR_HEIGHT);
    let y = this.y;
    this._displayBar(ctx, player.health, player.maxHealth, y, HEALTH_BAR_WIDTH, HEALTH_COLOR);

    y += BAR_HEIGHT + 8;
    this._displayBar(ctx, player.energy, player.maxEnergy, y, ENERGY_BAR_WIDTH, ENERGY_COLOR);

    this._displayXP(ctx, player.xp);
    this._displayWeapon(ctx, player.weaponIndex);
  }

  _displayBar(ctx, value, maxValue, y, width, colour) {
    ctx.fillStyle = UI_BG_COLOR;
    ctx.fillRect(this.x, y, width, BAR_HEIGHT);
    
    const innerWidth = value / maxValue * width;
    ctx.fillStyle = colour;
    ctx.fillRect(this.x, y, innerWidth, BAR_HEIGHT);
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = UI_BORDER_COLOR;
    ctx.strokeRect(this.x, y, width, BAR_HEIGHT);
  }

  _displayWeapon(ctx, weaponIndex) {
    const x = this.x;
    const y = this.height - this.y - ITEM_BOX_SIZE;

    ctx.fillStyle = UI_BG_COLOR;
    ctx.fillRect(this.x, y, ITEM_BOX_SIZE, ITEM_BOX_SIZE);
    ctx.lineWidth = 3;
    ctx.strokeStyle = UI_BORDER_COLOR;
    ctx.strokeRect(this.x, y, ITEM_BOX_SIZE, ITEM_BOX_SIZE);

    const weapon = WEAPONS[weaponIndex];
    const image = weapon.image;

    // Centre image
    const imageX = x + (ITEM_BOX_SIZE - image.width) / 2;
    const imageY = y + (ITEM_BOX_SIZE - image.height) / 2;
    ctx.drawImage(image, imageX, imageY);

    // Weapon strength
    ctx.font = "14px Georgia";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(weapon.damage, x + 5, y + ITEM_BOX_SIZE - 5);
  }

  _displayXP(ctx, xp) {
    ctx.font = UI_FONT_SIZE + "px Georgia";
    ctx.textBaseline = "top";

    const txt = `${xp}`;
    const border = 5;
    const width = ctx.measureText(txt).width + border * 2;
    const height = UI_FONT_SIZE;

    const x = this.width - this.x - width;
    ctx.fillStyle = UI_BG_COLOR;
    ctx.beginPath();
    ctx.roundRect(x, this.y, width, height, border);
    ctx.fill();

    ctx.fillStyle = UI_BORDER_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(x, this.y, width, height, border);
    ctx.stroke();

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(xp, x + border, this.y);
  }
}
