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
UI_BG_COLOR = '#22262f';
UI_BORDER_COLOR = '#0a0a0a';
HEALTH_COLOR = 'red';
ENERGY_COLOR = 'blue';
UI_BORDER_COLOR_ACTIVE = 'gold';

// General colors
WATER_COLOR = '#71ddee'
TEXT_COLOR = '#EEE'


const WEAPONS = [
	{ name: 'sword', cooldown: 100, strength: 15 },
	{ name: 'lance', cooldown: 400, strength: 30 },
	{ name: 'axe', cooldown: 300, strength: 20 },
	{ name: 'rapier', cooldown: 50, strength: 8 },
	{ name: 'sai', cooldown: 80, strength: 10 }
];

WEAPONS.forEach((weapon) => {
  weapon.image = document.getElementById(`img-weapon-${weapon.name}-full`);
});

const MAGIC = [
  { name: 'flame', cost: 20, strength: 5 },
  { name: 'heal', cost: 10, strength: 20 },
];

MAGIC.forEach((magic) => {
  magic.image = document.getElementById(`img-magic-${magic.name}`);
});
