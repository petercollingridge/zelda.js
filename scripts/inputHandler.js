  class InputHandler {
    constructor() {
      this.keysDown = new Set();
      this.keysUp = new Set();

      window.addEventListener('keydown', (evt) => {
        this.keysDown.add(evt.key);
      });

      window.addEventListener('keyup', (evt) => {
        this.keysUp.add(evt.key);
        this.keysDown.delete(evt.key);
      });
    }
  }

  const playerActions = [
    {
      key: 'ArrowRight',
      name: 'move',
      action: (player) => {
        player.dx = 1;
        player.direction = 'right';
      }
    },
    {
      key: 'ArrowLeft',
      name: 'move',
      action: (player) => {
        player.dx = -1;
        player.direction = 'left';
      }
    },
    {
      key: 'ArrowDown',
      name: 'move',
      action: (player) => {
        player.dy = 1;
        player.direction = 'down';
      }
    },
    {
      key: 'ArrowUp',
      name: 'move',
      action: (player) => {
        player.dy = -1;
        player.direction = 'up';
      }
    },
    // Attack
    {
      key: ' ',
      name: 'attack',
      singlePress: true,
      action: (player) => player._attack(),
    },
    // Switch weapon
    {
      key: 'q',
      singlePress: true,
      action: (player) => {
        player.weaponIndex = (player.weaponIndex + 1) % WEAPONS.length;
      },
    },
    // Magic
    {
      key: 'Control',
      name: 'magic',
      singlePress: true,
      action: (player) => player._magic(),
    },
    // Switch magic
    {
      key: 'e',
      singlePress: true,
      action: (player) => {
        player.magicIndex = (player.magicIndex + 1) % MAGIC.length;
      },
    },
  ];
