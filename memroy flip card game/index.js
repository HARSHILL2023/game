const board = document.getElementById('board'); // to show all boxes 
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timeEl = document.getElementById('timeLeft');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const resetBtn = document.getElementById('resetBtn');
const bestScoreEl = document.getElementById('bestScore');
const overlay = document.getElementById('countdownOverlay');

// Game configuration
const rows = 3; // grid layout chosen via CSS; use 6x3 = 18 cards (9 pairs)
const cols = 6;
const totalPairs = 9;
const initialTime = 60; // seconds

// State
let firstCard = null;
let secondCard = null;
let busy = false;
let moves = 0;
let matchedPairs = 0;
let timeLeft = initialTime;     // storing the intial timing in the timeLeft varible 
let timerId = null;
let pendingTimeouts = [];
let bestScore = null;

function onLoad() {     // jab website load hoo tab 
    var temp = localStorage.getItem('bestPair');
    if (temp != null) {
        bestScore = parseInt(temp);
    }
    else {
        bestScore = 0;
    }
};

function displayContent(){
    timeEl.textContent = timeLeft; 
    bestScoreEl.textContent = bestScore;
}

onLoad();
displayContent();

var num1 = [1,2,3,4,5,6,7,8,9];

function shuffle(num2){     // 
    console.log(num2);
    for(let i = num2.length-1;i>0;i--){      // this is for loop is use for random number in the card in any index and store in the num2 array 
        var j = Math.floor(Math.random()*(i+1)); // 
        console.log(j);
        [num2[i] , num2[i]] = [num2[j] , num2[j]];   // this store value of i into j
    }
    return num2;
}

function createCard(value){     // card kaa pura structure banaya haii via function 
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = '';

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = value;

    inner.appendChild(front);
    inner.appendChild(back);

    card.appendChild(inner);

    return card;
}

function endGame(){
    clearInterval(timerId);
    busy = false;
    firstCard = null;
    secondCard = null ;
}

function displayValue(card){
    if(busy=false) return;
    if(card ===firstCard || card.classList.contains('matched')) return ;
    card.classList.add('flipped');  // card ko flip karo

    if(firstCard == null){  // when user select the first card it should always store in first card variable
        firstCard = card;
        return ;
    }

    secondCard = card;  // second card will always be store in second card variable;
    moves++;
    movesEl.textContent = moves;

    var a = firstCard.querySelector('.back');
    console.log("a value is:"+a.textContent);

    var b =secondCard.querySelector('.back');
    console.log("b value is :"+b.textContent);
    
    if(a.textContent === b.textContent){
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        pairsEl.textContent = matchedPairs;

        if(matchedPairs ==9){
            endGame();
        }
        firstCard = null;
        secondCard = null;
    }
    else{
        setTimeout(function () {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            firstCard = null;
            secondCard = null;
        }, 700);
    }
}

function createBoxGame(){   // for creating 18 boxes and cnotrol in one function
    const reshuffleNumber = shuffle([...num1,...num1]);     // storing the number 1-9 and 1-9 two times using destructure method 
    console.log(reshuffleNumber);       
    reshuffleNumber.forEach(value => {      // for 18 boxes to control each and every by loop
        const card = createCard(value);     // function koo call kiyaa haii
        console.log(card);
        board.appendChild(card);
        card.addEventListener('click',()=>{

            displayValue(card);
        });
    });
}

createBoxGame();

function startGame (){
    busy = true;
    timeLeft = 60;

    timerId = setInterval(function (){
        timeLeft--;
        if(timeLeft<=0){
            endGame();
        }
        displayContent();
    },1000)
}
startBtn.addEventListener('click',startGame);