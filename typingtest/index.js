// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

// Test texts
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace."
];


// Game state
let currentText = '';
let timeLeft = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;


function webload() {
    onLoad();
    displayContent();
}

function onLoad() {
    var temp = sessionStorage.getItem('previouWpm');
    if (temp != null) {
        bestWPM = parseInt(temp);
    }
    else {
        bestWPM = 0;
    }
}

function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWPMDisplay.textContent = bestWPM;
}

function endGame() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    timeLeft = 60;
    displayContent();
}
function startGame() {
    startBtn.disabled = true;
    //  "5"          "4"        "3"         "1"          "2" length = '3'
    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    console.log(currentText);
    textDisplay.textContent = currentText

    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();
    typingArea.setAttribute('placeholder', 'Now you are eligible to erite and use the input box');
    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            // clearInterval(timerInterval)
            endGame();
        }
        displayContent();
    }, 1000)


}

function updateStatus(){
    var textContent = typingArea.value;
    const word = textContent.trim().split(/\s+/).filter(w=>w.length>0)
    // console.log(word);
    const elapsedTime = (Date.now()-startTime)/60000;
    console.log(elapsedTime);
    const wpm = elapsedTime > 0 ?Math.floor(word.length / elapsedTime): 0 
    wpmDisplay.textContent= wpm;
}

function wordType() {
    if (startTime == null) {
        startTime = Date.now();
    }
    // console.log(startTime);
    updateStatus();
}

webload();

startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);