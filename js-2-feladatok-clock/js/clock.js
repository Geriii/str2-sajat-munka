'use strict';

const clock = document.querySelector('#clock');

const displayClock = () => {
  clock.textContent = new Date().toLocaleTimeString('hu-HU');
  timer();
};

const timer = () => {
  let a = setTimeout(() => {
    clearTimeout(a);
    displayClock()
  }, 1000);
};

const startClock = () => {
  displayClock();
}

export default startClock;