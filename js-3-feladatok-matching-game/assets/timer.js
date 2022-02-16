'use strict';

const timer = document.querySelector('#timer');

const displayTimer = () => {
  timer.textContent = new Date().toLocaleTimeString('hu-HU');
  timer();
};

const timer = () => {
  let a = setTimeout(() => {
    clearTimeout(a);
    displayTimer()
  }, 1000);
};

const startTimer = () => {
  displayTimer();
}

export default startTimer;