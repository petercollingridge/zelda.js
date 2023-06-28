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