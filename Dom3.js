"use strick";

//   ------ Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // they  scoped in init()
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.remove("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
// init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); //toggle remove the class , iff it is not there then it will add it ../
  player1El.classList.toggle("player--active");
};

// Rolling  Dice Functionality   ------------ -----------------------------------//
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generating ramdom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img2/dice-${dice}.png`;

    // 3. Check for rolled
    if (dice !== 1) {
      // Add the dice to the current score ... /
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      //  1: if true , move to the next player ....... /
      switchPlayer();
    }
  }
});

// ------------------------hold btn functionality ------------/
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active player's score --
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100 --
    if (scores[activePlayer] >= 100) {
      // Finish the Game  ---
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next Player ---
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init); //    IMPlementing First class function ../
