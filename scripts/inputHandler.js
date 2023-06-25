  class InputHandler {
    constructor() {
      this.keys = new Set();

      window.addEventListener('keydown', (evt) => {
        this.keys.add(evt.key);
      });

      window.addEventListener('keyup', (evt) => {
        this.keys.delete(evt.key);
      });
    }
  }