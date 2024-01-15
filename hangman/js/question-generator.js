import data from './questions-and-answers.js';

function generateAnswerBlock(answer) {
  const answerBlock = document.querySelector('.answer');
  const answerLength = answer.length;

  for (let index = 0; index < answerLength; index++) {
    const letter = document.createElement('div');
    letter.classList.add('answer__item');
    letter.setAttribute('data-letter', answer[index].toLowerCase());

    answerBlock.append(letter);
  }
}

function generateRandomAnswer() {
  const length = data.length;
  const previousAnswer = sessionStorage.getItem('previousAnswer');
  const randomIndex = () => Math.floor(Math.random() * length);
  let questionAndAnswer = data[randomIndex()];

  while (questionAndAnswer.answer === previousAnswer) {
    questionAndAnswer = data[randomIndex()];
  }

  const { question, answer } = questionAndAnswer;

  generateAnswerBlock(answer);

  sessionStorage.setItem('previousAnswer', answer);
  document.querySelector('.quiz__question').textContent = question;
}

document.addEventListener('DOMContentLoaded', generateRandomAnswer);
