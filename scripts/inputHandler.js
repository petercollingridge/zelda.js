  class InputHandler {
    constructor(game) {
      this.keys = new Set();

      window.addEventListener('keydown', (evt) => {
        switch (evt.key) {
          case 'ArrowLeft':
            this.game.level.player.dx = -1;
            break;
          case 'ArrowRight':
            this.game.level.player.dx = 1;
            break;
          case 'ArrowUp':
            this.game.level.player.dy = -1;
            break;
          case 'ArrowDown':
            this.game.level.player.dy = 1;
            break;
        }
      });

      window.addEventListener('keyup', (evt) => {
        this.game.level.player.dx = 0;
        this.game.level.player.dy = 0;
      });
    }
  }