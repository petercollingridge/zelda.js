const WIDTH = 1280;
const HEIGHT = 600;

const FPS = 60;
const SPRITE_SIZE = 64;
const TILE_SIZE = 64;

// UI
const BAR_HEIGHT = 20;
const HEALTH_BAR_WIDTH = 200;
const ENERGY_BAR_WIDTH = 140;
const ITEM_BOX_SIZE = 80;
const UI_FONT_SIZE = 20;

// UI colors
UI_BG_COLOR = '#222'
UI_BORDER_COLOR = '#111'
HEALTH_COLOR = 'red'
ENERGY_COLOR = 'blue'
UI_BORDER_COLOR_ACTIVE = 'gold'

// General colors
WATER_COLOR = '#71ddee'
TEXT_COLOR = '#EEE'


const WEAPONS = [
	{ name: 'sword', cooldown: 100, damage: 15 },
	{ name: 'lance', cooldown: 400, damage: 30 },
	{ name: 'axe', cooldown: 300, damage: 20 },
	{ name: 'rapier', cooldown: 50, damage: 8 },
	{ name: 'sai', cooldown: 80, damage: 10 }
];

WEAPONS.forEach((weapon) => {
  weapon.image = document.getElementById(`img-weapon-${weapon.name}-full`);
});

const MAGIC = [
  { name: 'flame', strength: 5, cost: 20 },
  { name: 'heal', strength: 20, cost: 10 },
];

MAGIC.forEach((magic) => {
  magic.image = document.getElementById(`img-magic-${magic.name}`);
});
