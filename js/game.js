import listenerInterface from './listenerKeyboard.js';

function startGame() {
  const keyboard = document.querySelector('.keyboard');
  const game = new listenerInterface(keyboard);

  keyboard.addEventListener('click', game, {
    passive: true
  });
  document.addEventListener('keyup', game, {
    passive: true
  });
}

startGame();
