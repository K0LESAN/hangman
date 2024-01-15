function loadScripts() {
  const questionGenerator = document.createElement('script');
  const game = document.createElement('script');

  questionGenerator.defer = true;
  game.defer = true;

  questionGenerator.type = 'module';
  game.type = 'module';

  questionGenerator.async = false;
  game.async = false;

  questionGenerator.src = 'js/question-generator.js';
  game.src = 'js/game.js';

  document.body.append(questionGenerator, game);
}

function renderKeyboard() {
  const keyboard = document.createElement('div');

  keyboard.classList.add('keyboard');

  for (let charCode = 97; charCode < 123; charCode++) {
    const button = document.createElement('button');

    button.classList.add('keyboard__item');
    button.textContent = String.fromCharCode(charCode);

    keyboard.append(button);
  }

  return keyboard;
}

function renderGallowsPart() {
  const resource = [
    'head',
    'body',
    'left-hand',
    'right-hand',
    'left-leg',
    'right-leg'
  ];

  const gallows = document.createElement('section');
  const wrapper = document.createElement('div');
  const title = document.createElement('h1');

  gallows.classList.add('gallows');
  wrapper.classList.add('gallows__wrapper');
  title.classList.add('gallows__title');

  title.textContent = 'Hangman game';

  const gallow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const gallowUse = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use'
  );

  gallow.classList.add('gallows__image');
  gallowUse.setAttribute('href', `public/gallows.svg#gallows`);

  wrapper.append(gallow);
  gallow.append(gallowUse);

  for (const path of resource) {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const link = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    icon.classList.add('gallows__limb', `gallows__limb_${path}`);
    link.setAttribute('href', `public/${path}.svg#${path}`);

    wrapper.append(icon);
    icon.append(link);
  }

  gallows.append(wrapper, title);

  return gallows;
}

function renderQuizPart() {
  const quiz = document.createElement('section');
  const wrapper = document.createElement('div');
  const hint = document.createElement('p');
  const question = document.createElement('span');
  const guesses = document.createElement('p');
  const counter = document.createElement('span');

  quiz.classList.add('quiz');
  wrapper.classList.add('answer', 'quiz__wrapper');
  hint.classList.add('quiz__hint');
  question.classList.add('quiz__question');
  guesses.classList.add('quiz__guesses');
  counter.classList.add('quiz__guesses_counter');

  hint.textContent = 'Hint: ';
  guesses.textContent = 'Incorrect guesses: ';
  counter.textContent = '0 / 6';

  quiz.append(wrapper, hint, guesses, renderKeyboard());
  hint.append(question);
  guesses.append(counter);

  return quiz;
}

function renderModalWindow() {
  const modal = document.createElement('div');
  const wrapper = document.createElement('div');
  const title = document.createElement('p');
  const subtitle = document.createElement('p');
  const answer = document.createElement('span');
  const button = document.createElement('button');

  modal.classList.add('modal');
  wrapper.classList.add('modal__wrapper');
  title.classList.add('modal__title');
  subtitle.classList.add('modal__subtitle');
  answer.classList.add('modal__subtitle_answer');
  button.classList.add('modal__reload');

  subtitle.textContent = 'Correct answer: ';
  button.textContent = 'Play again';

  modal.append(wrapper);
  wrapper.append(title, subtitle, button);
  subtitle.append(answer);

  return modal;
}

function renderDOM() {
  const overConatiner = document.createElement('div');
  const container = document.createElement('div');

  overConatiner.classList.add('over-container');
  container.classList.add('container');

  overConatiner.append(container);
  container.append(renderGallowsPart(), renderQuizPart());
  document.body.append(overConatiner, renderModalWindow());

  loadScripts();
}

window.addEventListener('load', renderDOM, {
  passive: true,
  once: true
});
