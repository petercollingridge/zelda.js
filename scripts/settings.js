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

MONSTERS = {
  squid: {
    health: 100,
    xp: 100,
    damage: 20,
    speed: 3,
    resistance: 3,
    attackType: 'slash',
    attackSound: '../audio/attack/slash.wav',
    attackRadius: 80,
    noticeRadius: 360,
  },
  raccoon: {
    health: 300,
    xp: 250,
    damage: 40,
    speed: 2,
    resistance: 3,
    attackType: 'claw',
    attackSound: '../audio/attack/claw.wav',
    attackRadius: 120,
    noticeRadius: 400,
  },
  spirit: {
    health: 100,
    xp: 110,
    damage: 8,
    speed: 4,
    resistance: 3,
    attackType: 'thunder',
    attackSound: '../audio/attack/fireball.wav',
    attackRadius: 60,
    noticeRadius: 350,
  },
  bamboo: {
    health: 70,
    xp: 120,
    damage: 6,
    speed: 3,
    resistance: 3,
    attackType: 'leaf_attack',
    attackSound: '../audio/attack/slash.wav',
    attackRadius: 50,
    noticeRadius: 300,
  },
};
