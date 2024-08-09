"use strick";
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

let activePlayer, currentScore, playing, scores;
scores = [0, 0]; //holds the score of player--0 and  --1  /
currentScore = 0;
activePlayer = 0;
playing = true;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden"); //...to remove dice ... /

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player--active");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // Change background-color ../
  //toggle remove the class , iff it is not there then it will add it ../
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

//------------------------Roll Dice-- Btn ---------------------------====//
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate ramdom dice roll-/
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display  Dice Roll-/
    diceEl.classList.remove("hidden"); // to display dice .. /
    diceEl.src = `img2/dice-${dice}.png`;

    // Is it a 1  then switch to next player ---/
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//--------------------------Hold Btn -----------------------------------////
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore; //
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //  SCORE is >= 100 .../
    if (scores[activePlayer] >= 100) {
      // finish the game
      diceEl.classList.add("hidden");
      playing = false;
      // current player wins ... /
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active--player");
    } else {
      switchPlayer();
    }
  }
});

// ------------------------------New Btn -----------------------==========//
btnNew.addEventListener("click", init);
