const gameCards = [
  '😁',
  '😂',
  '😃',
  '😄',
  '😅',
  '😆',
  '😇',
  '😈'
]

const maxPoints = 5;
let currentPoints = 0;
let currentRound = 0; 
let firstFlip; 

const counter = new Date(0); // Stopper
const recordTime = new Date();


const createCard = (image,row)=> {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card--front');
  const cardBack = document.createElement('div')
  cardBack.classList.add('card--back');
  cardFront.innerHTML = image;

  card.appendChild(cardBack);
  card.appendChild(cardFront);
  row.appendChild(card);
}

const fillRows = (gameCards) => {
  const row1 = document.querySelector('.first-row');
  const row2 = document.querySelector('.second-row');
  gameCards.slice(0, maxPoints).forEach(hero => {
    createCard(hero,row1)
  });
  gameCards.slice(maxPoints, maxPoints * 2).forEach(hero => {
    createCard(hero,row2)
  });
}

const shuffleCards = (stack) => {
  stack.forEach(
    (item, i) =>  {
    let j = Math.floor(Math.random() * (i + 1));

    [stack[i], stack[j]] = [stack[j], item];
  }) 
  return stack;
}

const createBoard = () => {
  shuffleCards(gameCards);
  const heroes = Array(maxPoints)
  .fill(null)
  .map((item,index) => gameCards[index]); 
  const heroArray = shuffleCards([...heroes, ...heroes]);
  fillRows(heroArray)
}

const clearBoard = () => {
  const row1 = document.querySelector('.first-row');
  const row2 = document.querySelector('.second-row');
  while (row1.childElementCount > 0) {
    row1.removeChild(row1.firstChild)
  }
  while (row2.childElementCount > 0) {
    row2.removeChild(row2.firstChild)
  }
}

const validatePair = (card) => {
  if (card.lastElementChild.textContent === firstFlip.lastElementChild.textContent){
    currentPoints += 1,
    console.log('Pairs found: ',currentPoints),
    card.removeEventListener('click',turnCardUp),
    firstFlip.removeEventListener('click',turnCardUp)
  } else {
    setTimeout(() => {

      turnCardDown(card),
      turnCardDown(firstFlip);
    },500)
  }
  if (maxPoints === currentPoints){
    console.log('All pairs found!')
    endGame()
  }
}


const turnCardUp = function(){
  if (this.style.transform === 'rotateY(180deg)') return;
  
  currentRound += 1,
  this.style.transform = 'rotateY(180deg)'
  if (currentRound === 1){
    firstFlip = this;
  }
  if (currentRound >= 2){
    validatePair(this);
    currentRound = 0;
  }
}
const turnCardDown = (card) => {
  card.style.transform = 'rotateY(0deg)';
  
}
 // Events
const addEventListenersToCards = () => {
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => card.addEventListener('click',turnCardUp)),
  cards.forEach(card => card.addEventListener('click',startGame))
}

const removeEventListenersFromCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.removeEventListener('click',turnCardUp))

}

const showTime = () => {
  if (currentPoints === maxPoints) return;

  document.querySelector('.counter__span').textContent = 
  counter.getMinutes().toString().padStart(2,0) + ':' + 
  counter.getSeconds().toString().padStart(2,0);

  counter.setSeconds(counter.getSeconds() + 1);

  setTimeout(showTime,1000)
}

const showResults = () => {
  if (counter < recordTime) {
    recordTime.setTime(counter);
    document.querySelector('.results').textContent = 'Your record: ' +
    document.querySelector('.counter__span').textContent
  }
}
const startGame = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.removeEventListener('click',startGame))
  console.log('Game started.')
  currentPoints = 0;

  showTime();
}


const endGame = () => {
  removeEventListenersFromCards();
  showResults();
  console.log('First game ended.')
  setTimeout(newGame,5000);
}

const newGame = () => {
  console.log('New game started.')
  clearBoard();
    createBoard();
    counter.setTime(0);
    document.querySelector('.counter__span').textContent = '00:00';
    addEventListenersToCards();
}


createBoard();

addEventListenersToCards();