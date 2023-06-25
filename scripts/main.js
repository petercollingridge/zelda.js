window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const game = new Game(WIDTH, HEIGHT);
  let lastTime = 0;

  // Animation loop
  function animate(timeStamp) {
    const dt = timeStamp - lastTime;
    lastTime = timeStamp;

    game.update(dt);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0); 
});
