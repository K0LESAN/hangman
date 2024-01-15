import { generateRandomAnswer } from './question-generator.js';
export default class {
  answerLength = document.querySelector('.answer').children.length;
  correctLetters = 0;

  constructor(keyboard) {
    this.keyboard = keyboard;
  }

  handleEvent(event) {
    switch (event.type) {
      case 'click':
        this.clickOnButton(event);
        break;
      case 'keyup':
        this.clickOnKeyboard(event);
        break;
    }
  }

  addAllListeners() {
    this.keyboard.addEventListener('click', this, {
      passive: true
    });
    document.addEventListener('keyup', this, {
      passive: true
    });
  }

  newGame(modal) {
    modal.classList.remove('modal_open');
    document.body.style.overflow = 'auto';

    for (const button of this.keyboard.children) {
      button.disabled = false;
    }

    const limbs = document.querySelectorAll('.gallows__limb');

    document.querySelector('.quiz__guesses_counter').textContent = '0 / 6';

    for (const element of limbs) {
      element.style.opacity = 0;
    }

    generateRandomAnswer();

    this.correctLetters = 0;
    this.answerLength = document.querySelector('.answer').children.length;
    this.addAllListeners();
  }

  showModal(status) {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    const correctAnswer = document.querySelector('.modal__subtitle_answer');
    const result = status ? 'Win' : 'Lose';

    modal.classList.add('modal_open');
    document.body.style.overflow = 'hidden';

    modalTitle.textContent = `You ${result}`;
    correctAnswer.textContent = sessionStorage.getItem('answer');

    modalTitle.className = `modal__title modal__title_${result.toLowerCase()}`;

    modal
      .querySelector('.modal__reload')
      .addEventListener('click', this.newGame.bind(this, modal), {
        once: true,
        passive: true
      });
  }

  finishGame(status) {
    this.keyboard.removeEventListener('click', this);
    document.removeEventListener('keyup', this);

    setTimeout(this.showModal.bind(this), 500, status);
  }

  plusCountAndShowLimb(answerHasLetter) {
    if (this.correctLetters === this.answerLength) {
      this.finishGame(true);
      return;
    }

    if (answerHasLetter) {
      return;
    }

    const countGuesses = document.querySelector('.quiz__guesses_counter');
    const countIncorrectGuesses = +countGuesses.textContent[0];

    countGuesses.textContent = `${countIncorrectGuesses + 1} / 6`;

    document.querySelectorAll('.gallows__limb')[
      countIncorrectGuesses
    ].style.opacity = 1;

    if (countIncorrectGuesses === 5) {
      this.finishGame(false);
    }
  }

  showLetterInAnswer(key) {
    const answer = document.querySelector('.answer');
    let answerHasLetter = false;

    for (const element of answer.children) {
      const letter = element.getAttribute('data-letter');

      if (letter.toLowerCase() === key) {
        element.classList.add('answer__item_visible');
        element.textContent = letter;
        answerHasLetter = true;
        this.correctLetters++;
      }
    }

    this.plusCountAndShowLimb(answerHasLetter);
  }

  clickOnButton(event) {
    const button = event.target.closest('.keyboard__item');

    if (!button || button.disabled) {
      return;
    }

    button.disabled = true;
    this.showLetterInAnswer(button.textContent.toLowerCase());
  }

  findButton(key) {
    if (!/^[a-z]{1}$/.test(key)) {
      return null;
    }

    for (const element of this.keyboard.children) {
      if (element.textContent === key) {
        return element;
      }
    }

    return null;
  }

  clickOnKeyboard(event) {
    const key = event.key.toLowerCase();
    const button = this.findButton(key);

    if (!button || button.disabled) {
      return;
    }

    this.showLetterInAnswer(key);
    button.disabled = true;
  }
}
