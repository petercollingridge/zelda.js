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
      action: (player) => {
        player.dx = 1;
        player.direction = 'right';
        player.status = 'move';
      }
    },
    {
      key: 'ArrowLeft',
      action: (player) => {
        player.dx = -1;
        player.direction = 'left';
        player.status = 'move';
      }
    },
    {
      key: 'ArrowDown',
      action: (player) => {
        player.dy = 1;
        player.direction = 'down';
        player.status = 'move';
      }
    },
    {
      key: 'ArrowUp',
      action: (player) => {
        player.dy = -1;
        player.direction = 'up';
        player.status = 'move';
      }
    },
    // Attack
    {
      key: ' ',
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
      singlePress: true,
      action: (player) => {
        console.log('Magic');
        player.status = 'attack';
        setTimeout(()=> (player.status = 'idle'), player.attackTime);
      }
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
