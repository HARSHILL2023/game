// step-1 ->> html:

const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
console.log(colorBoxes);

const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn= document.querySelector('#resetStreakBtn');
const btnTrack =document.querySelector('.color-box-container');
var newround=document.querySelector('#newRoundBtn');
const button1 =document.querySelector('#button1')
const button2 =document.querySelector('#button2')
const button3 =document.querySelector('#button3')


// variables...

var currentStreak = 0;
var bestStreak = 0;
var pickCorrectColor = 0;
let num = 6;
var colors = []; 


function webLoad(){
    onLoad();
    setGame();
    displayContent();
    
}
// whenever the website will load then first it will load the entire data...
function onLoad(){
    var temp = localStorage.getItem('highBestStreak');
    if(temp != null){
        bestStreak = parseInt(temp); // --> here the localstorage contains the data so it will return the data not null.
    }
    else{
        bestStreak = 0; // --> if there is no data in localstorage so it will return null instead of number.
    }
}

// here we will define the display content message in a function format...

function displayContent(){
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}


// random color generator
function colorGenerate(){
    var a = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var c = Math.floor(Math.random()*256);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num){ // stores the six colors too show in the boxes
    const arr = [];
    for(var i=0; i<num; i++){
        arr.push(colorGenerate());
    }

    return arr;
}
function pickGenerator(){ // it gives  the correct color to choose
    const math = Math.floor(Math.random()*colors.length);
    return colors[math];
}

function setGame(){
    colors = generateColor(num); 
    console.log(colors);
    
    pickCorrectColor = pickGenerator();
    console.log(pickCorrectColor);
    
    colorDisplay.textContent = pickCorrectColor;
    for(var i=0; i<colors.length; i++){
        colorBoxes[i].style.backgroundColor = colors[i];
    }
}


webLoad();
//parent addeventlistner\
//while tracking the parent element to give order to child element then syntak will be without ()
function trackBtn(event){
    var element = event.target;//return value on you click
    console.log(element)
    var rgb = element.style.backgroundColor;
    console.log(rgb);
    if(pickCorrectColor=== rgb){
       messageDisplay.textContent="you win, to play again click on new round"
       currentStreak++;
       currentStreakDisplay.textContent = currentStreak;
      if(currentStreak>bestStreak){
        bestStreak=currentStreak;
        bestStreakDisplay.textContent=bestStreak;
        localStorage.setItem('highBestStreak',bestStreak)
      }
        webLoad()
       
    }
    else{
        messageDisplay.textContent="you can even choose a right color "
        currentStreak=0;
        currentStreakDisplay.textContent=currentStreak
    }
    
}
btnTrack.addEventListener('click',trackBtn);

function reset(){
    messageDisplay.textContent="pick the right color";
    setGame();
    currentStreak=0;
    currentStreakDisplay.textContent=currentStreak;

}
newRoundBtn.addEventListener('click',reset)

function gamerest(){
    localStorage.removeItem('highBestStreak')
    bestStreakDisplay.textContent=0;
}
resetStreakBtn.addEventListener('click',gamerest)

function easy(){
    webLoad()
    num=3;
    button1.style.display='none';
    button2.style.display='none';
    button3.style.display='none';
  
    

}

easyBtn.addEventListener('click',easy)

function hard(){
    webLoad()
    num=6;
    button1.style.display='block';
    button2.style.display='block';
    button3.style.display='block';
    

}
hardBtn.addEventListener('click',hard)