// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const timer15= document.querySelector('#timer15')
const timer35= document.querySelector('#timer35')

// Test texts
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace."
];


// Game state
let currentText = '';
let selectedTime=60;
let timeLeft = selectedTime;
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
    typingArea.disabled=true;
}
function setTime(seconds){
    // selectedTime=seconds;
    timeLeft=seconds;
    displayContent()
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
    // initialize startTime so WPM calculation has a baseli/e
    startTime = Date.now();
    // reset displays
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;
    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            // clearInterval(timerInterval)
            endGame();
        }
        displayContent();
    }, 1000)


}

function updateStatus() {
    var textContent = typingArea.value || '';

    const minute = (Date.now() - startTime) / 1000 / 60;
    const words = textContent.trim().split(/\s+/).filter(w => w.length > 0);
    const wpm = (minute > 0) ? Math.round(words.length / minute) : 0;
    wpmDisplay.textContent = wpm;

    // compute character-accurate score only over typed characters
    let currentScore = 0;
    const len = Math.min(currentText.length, textContent.length);
    for (let i = 0; i < len; i++) {
        if (currentText[i] === textContent[i]) {
            currentScore++;
        }
    }

    // accuracy = correct typed chars / total typed chars
    const accuracy = (textContent.length > 0) ? Math.floor((currentScore / textContent.length) * 100) : 0;
    accuracyDisplay.textContent = accuracy;
}

function Highlights(){
    var typed = typingArea.value;
    var highlighText = '';


    for(let i = 0; i< currentText.length; i++){
        if(i <= typed.length){
            if(currentText[i] === typed[i]){
                highlighText += `<span class = "correct">${currentText[i]}</span>`;
            }
            else{
                highlighText += `<span class = "incorrect">${currentText[i]}</span>`;
            }
        }
        else{
            highlighText += currentText[i];
        }
    }
    textDisplay.innerHTML = highlighText;
}

function wordType() {
    if (startTime == null) {
        startTime = Date.now();
    }
    // console.log(startTime);
    updateStatus();
    Highlights();
}

webload();

startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);

