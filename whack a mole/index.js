const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const lastScoreDisplay = document.querySelector('#lastScore');
const fastestHitDisplay = document.querySelector('#fastestHit');
const hitDisplay = document.querySelector('#hits');

const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const resumeBtn = document.querySelector('#resumeBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

var score = 0;
var hits = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var paused = false;
var gameId = null;

var moleStartTime = null; // For fastest hit (ms tracking)

// -----------------------------------------------------
// LOADING
// -----------------------------------------------------
function webload() {
  onLoad();
  displayContent();
}

function onLoad() {
  // High score
  var temp = localStorage.getItem('highScoreMole');
  bestScore = temp != null ? temp : 0;

  // Last game score (session only)
  var last = sessionStorage.getItem('lastScore');
  lastScoreDisplay.textContent = last ? last : "0";

  // Fastest hit
  var fast = sessionStorage.getItem('fastestHit');
  fastestHitDisplay.textContent = fast ? fast + "ms" : "None";
}

// -----------------------------------------------------
// DISPLAY UPDATE
// -----------------------------------------------------
function displayContent() {
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = time;
  maxScoreDisplay.textContent = bestScore;
  hitDisplay.textContent = hits;

  // ⭐ GOLD SCORE after 50
  if (score > 50) {
    scoreDisplay.style.color = "gold";
  } else {
    scoreDisplay.style.color = "white";
  }
}

// -----------------------------------------------------
// END GAME
// -----------------------------------------------------
function endGame() {
  clearInterval(gameId);
  playGame = false;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resumeBtn.disabled = true;

  // Save last game score (session)
  sessionStorage.setItem("lastScore", score);
  lastScoreDisplay.textContent = score;

  // Save high score
  if (score > bestScore) {
    localStorage.setItem('highScoreMole', score);
    bestScore = score;

    // ⭐ Glow effect
    maxScoreDisplay.style.textShadow = "0 0 20px yellow";
    setTimeout(() => maxScoreDisplay.style.textShadow = "none", 1200);

    alert(`🎉 New High Score: ${score}`);
  } else {
    alert(`Your Score: ${score}`);
  }

  // Reset
  score = 0;
  hits = 0;
  displayContent();

  // Start button text
  startBtn.innerText = "Play Again";
}

// -----------------------------------------------------
// RANDOM
// -----------------------------------------------------
function randomTime() {
  // ⭐ Speed increase when time < 10 sec
  if (time < 10) return Math.floor(Math.random() * (600 - 400) + 400);
  return Math.floor(Math.random() * (900 - 900) + 900);
}

function randomHole() {
  var index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

// -----------------------------------------------------
// MOLE POPPING
// -----------------------------------------------------
function popGame() {
  var timer = randomTime();
  var hole = randomHole();
  var mole = hole.querySelector('.mole');

  if (playGame && !paused) {
    mole.classList.add('up');

    moleStartTime = Date.now(); // Start time for fastest hit

    setTimeout(() => {
      mole.classList.remove('up');
      if (playGame && !paused) {
        popGame();
      }
    }, timer);
  }
}

// -----------------------------------------------------
// START GAME
// -----------------------------------------------------
function startGame() {
  time = 30;
  score = 0;
  hits = 0;
  playGame = true;
  paused = false;

  // Reset button text
  startBtn.innerText = "Start Game";

  // Clear last score on start
  sessionStorage.removeItem("lastScore");
  lastScoreDisplay.textContent = "0";

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;

  displayContent();
  popGame();

  gameId = setInterval(() => {
    if (!paused) {
      time--;
      if (time <= 0) {
        endGame();
      }
      displayContent();
    }
  }, 1000);
}

// -----------------------------------------------------
// PAUSE / RESUME
// -----------------------------------------------------
function pauseGame() {
  paused = true;
  pauseBtn.disabled = true;
  resumeBtn.disabled = false;
}

function resumeGame() {
  paused = false;
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;
  popGame();
}

// -----------------------------------------------------
// HIT MOLE
// -----------------------------------------------------
function bonk(event) {
  if (!event.isTrusted || !playGame || paused) return;
  if (event.target.classList.contains('up')) {

    hits++;
    score++;
    displayContent();

    // Hide mole
    event.target.classList.remove('up');
    event.target.classList.add('bonked');

    // ---------------------------------------
    // ⭐ WHACK MESSAGE
    // ---------------------------------------
    const msg = document.querySelector('#whackMsg');
    msg.style.opacity = 1;
    msg.style.transform = "scale(1.4)";
    setTimeout(() => {
      msg.style.opacity = 0;
      msg.style.transform = "scale(1)";
    }, 300);

    // ---------------------------------------
    // ⭐ FASTEST HIT TRACKER
    // ---------------------------------------
    if (moleStartTime) {
      let reaction = Date.now() - moleStartTime;
      let fastest = sessionStorage.getItem('fastestHit');

      if (!fastest || reaction < fastest) {
        sessionStorage.setItem('fastestHit', reaction);
        fastestHitDisplay.textContent = reaction + "ms";
      }
    }

    setTimeout(() => event.target.classList.remove('bonked'), 300);
  }
}

// -----------------------------------------------------
webload();
moles.forEach(box => box.addEventListener('click', bonk));
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);