console.log("game on");

const dice1 = document.querySelector('#dice1N');
const dice2 = document.querySelector('#dice2N');
const name1Input = document.querySelector('#player1-input');
const name2Input = document.querySelector('#player2-input');
const startBtn = document.querySelector('#start-btn');
const getName = document.querySelector('#getname');
const gameStart = document.querySelector('#game-start');
const rollBtn = document.querySelector('#roll-btn');
const indivBtn = document.querySelector('#indiv-btn');
const sumBtn = document.querySelector('#sum-btn');
const endBtn = document.querySelector('#end-btn');
const roundText = document.querySelector('#round-text');
const turnText = document.querySelector('#turn-text');
const vsText = document.querySelector('#vs-text');
const sumText = document.querySelector('#sum-text');
const winText = document.querySelector('#win-text');
const playAgainBtn = document.querySelector('#play-again-btn');
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
////////////////////////////////////////////////////////
// changable variable
let turn = 0;
let currentRound = 1;
let currentPlayer = 1;
let dice1Number = 0;
let dice2Number = 0;
let p1Total = 0;
let p2Total = 0;
let player1Name = "";
let player2Name = "";
///////////////////////////////////////////////////////

gameStart.style.display = 'none';
playAgainBtn.style.display = 'none';
indivBtn.disabled = true;
sumBtn.disabled = true;
endBtn.disabled = true;
startBtn.addEventListener('click', function(){
if(name1Input.value.trim() && name2Input.value.trim()){

    player1Name = name1Input.value.trim();
    player2Name = name2Input.value.trim();
    document.querySelector('#p1name-score').textContent = player1Name;
    document.querySelector('#p2name-score').textContent = player2Name;
    turnText.textContent = `${player1Name}'s Turn`;
    roundText.textContent = `Round: ${currentRound}`;
    vsText.textContent = `${player1Name} VS ${player2Name} `;
    getName.style.display = 'none';
    gameStart.style.display = 'block';
    rollBtn.disabled = false;
    }else{
        alert('Please enter names for both players');
        name1Input.focus();
    }
});



//ROLL
rollBtn.addEventListener('click',function(){
    dice1Number = Math.floor(Math.random() * 6) + 1;
    dice2Number = Math.floor(Math.random() * 6) + 1;

    dice1.className = `bi bi-dice-${dice1Number}-fill`;
    dice2.className = `bi bi-dice-${dice2Number}-fill`;

    sumText.textContent = `Sum: ${dice1Number + dice2Number}`;
    // Button Logic
    indivBtn.disabled = (dice1Number === dice2Number ||
        document.querySelector(`#box${dice1Number}`).classList.contains('shut') ||
        document.querySelector(`#box${dice2Number}`).classList.contains('shut'));

    sumBtn.disabled = ((dice1Number + dice2Number > 9) ||
        document.querySelector(`#box${dice1Number + dice2Number}`).classList.contains('shut'));
    endBtn.disabled = !(indivBtn.disabled && sumBtn.disabled);
    rollBtn.disabled = true;

});


// Shut Function
function shut(boxNumber){ //give a shut class to the element

    const boxEl = document.querySelector(`#box${boxNumber}`);
    boxEl.classList.add('shut');
    boxEl.textContent = 'X';
    boxes[boxNumber] = 'X';
}

///indivBtn eventListener
indivBtn.addEventListener('click',function(){
    shut(dice1Number);
    shut(dice2Number);
    boxes[0] += dice1Number + dice2Number;
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

///sumBtn eventListener
sumBtn.addEventListener('click',function(){
    shut(dice1Number + dice2Number);
    boxes[0] += dice1Number + dice2Number;
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

// endRollBtn eventListener
endBtn.addEventListener('click',function(){
   const turnPoints = 45 - boxes[0];
    if (currentPlayer === 1) {
        p1Total += turnPoints;
        buildRow(currentRound, turnPoints, 'p1Pts');
        currentPlayer = 2;
        turnText.textContent = `${player2Name}'s Turn`;
    } else {
        p2Total += turnPoints;
        const roundRow = document.querySelector(`#round${currentRound}`);
        roundRow.querySelector('.p2Pts').textContent = turnPoints;
        currentPlayer = 1;
        turnText.textContent = `${player1Name}'s Turn`;
        currentRound++;
        roundText.textContent = `Round: ${currentRound}`;

    }

    resetBoard();
if(currentRound > 5){
    gameOver();
}

});

///buildRow function
function buildRow(round, points, playerClass) {

   const tr = document.createElement('tr');
   tr.id = `round${round}`;

   const roundTh = document.createElement('th');
   roundTh.textContent = `Round ${round}`;

   const pointsTd1 = document.createElement('td');
   pointsTd1.classList.add(playerClass);
   pointsTd1.textContent = points;

   const pointsTd2 = document.createElement('td');
   pointsTd2.classList.add('p2Pts');

   tr.appendChild(roundTh);
   tr.appendChild(pointsTd1);
   tr.appendChild(pointsTd2);
   document.querySelector('#score-body').appendChild(tr);
}

function resetBoard() {

    boxes.fill(0);
    const numberBoxes = document.querySelectorAll('.card');
    numberBoxes.forEach((box, index) => {
        box.classList.remove('shut');
        box.textContent = index + 1;
    });

    rollBtn.disabled = false;
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    endBtn.disabled = true;

    dice1.className = 'bi bi-dice-1-fill';
    dice2.className = 'bi bi-dice-2-fill';
    sumText.textContent = 'Dice Sum: 0';

}


/// gameover
function gameOver() {

    playAgainBtn.style.display = 'block';
    document.querySelector('#game-start').style.display = 'none';
    document.querySelector('#score-table').style.display = 'block';
    document.querySelector('#win-text').style.display = 'block';

    const winnerName = p1Total < p2Total ? player1Name : player2Name;
    winText.textContent = `${winnerName} wins with ${Math.min(p1Total, p2Total)} points!`;

}


//playagain
playAgainBtn.addEventListener('click', () => {
    // Reset all game variables
    currentPlayer = 1;
    currentRound = 1;
    p1Total = 0;
    p2Total = 0;



    // Reset UI
    playAgainBtn.style.display = 'none';
    document.querySelector('#getname').style.display = 'block';
    document.querySelector('#game-start').style.display = 'none';
    document.querySelector('#win-text').style.display = 'none';
    document.querySelector('#score-body').innerHTML = '';

    // Reset inputs
    name1Input.value = '';
    name2Input.value = '';
    name1Input.focus();

});
