var words = [
	"axolotl",
	"rottweiler",
	"jellygraph",
	"cowpuncher",
	"jackhammer",
	"witchcraft",
	"cryptogram",
	"bankruptcy",
	"motorcycle",
	"technician",
	"radiation",
	"photorealism",
	"pigment",
	"exhibit",
  "albatross",
  "anemone",
  "secretary",
  "apartment"
]

window.onload = function(e){ 
  document.getElementById("starter").style.display = 'block';
  document.getElementById("game").style.display = 'none';  
}

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function useCustomWord(){
  let custom  = document.getElementById('customWord').value;
  if(custom.length < 5){
    alert("Word must be longer than four characters");
    return;
  }
  document.getElementById("starter").style.display = 'none';
  document.getElementById("game").style.display = 'block';  
  answer = custom;
  document.getElementById('maxWrong').innerHTML = maxWrong;
  generateButtons();
  guessedWord();
}

function useRandomWord(){
  document.getElementById("starter").style.display = 'none';
  document.getElementById("game").style.display = 'block';  
  startGame();
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

function startGame(){
  document.getElementById('maxWrong').innerHTML = maxWrong;

  randomWord();
  generateButtons();
  guessedWord();
  
}

