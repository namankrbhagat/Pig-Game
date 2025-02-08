'use strict'

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');// same usage
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let players, score, active, playing;
// Starting conditions
const init = function () {
  players = [0, 0];
  score = 0;
  active = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function(){
    document.getElementById(`current--${active}`).textContent = 0;
    score = 0;
    active = active === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
  if(playing){
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if(dice !== 1){
      score += dice;
      document.getElementById(`current--${active}`).textContent = score;

    }else{
      switchPlayer();
    }
  }
  
});

btnHold.addEventListener('click', function () {
  if(playing){

    players[active] += score;
    document.getElementById(`score--${active}`).textContent = players[active];

    if(players[active] >= 100){
      diceEl.classList.add('hidden');
      playing =false;
      document.querySelector(`.player--${active}`).classList.add(`player--winner`);
      document.querySelector(`.player--${active}`).classList.remove(`player--active`);

    }
    else{
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);