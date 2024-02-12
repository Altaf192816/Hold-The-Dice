'use strict';
//declaring variable and store element id in it
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting condition
let winingScore = prompt(`Enter the limit of Winning Score`);
score0EL.textContent = 0;//show 0 score on browser for player--0
score1EL.textContent = 0;//show 1 score on browser for player--1
const score = [0, 0];
let currentScore = 0;
let activeplayer = 0;
let playing = true;
diceEL.classList.add('hidden');

//switch to next player
const switchPlayer = function () {
    document.querySelector(`.player--${activeplayer}`).classList.remove('player--active'); //to remove class for backgound color
    currentScore = 0; //To reset currentScore to 0 for current player
    document.getElementById(`current--${activeplayer}`).textContent = currentScore;//here currentScore is 0 set to browser
    activeplayer = activeplayer === 0 ? 1 : 0; //To change active player if 0 then 1 and if 1 then 0
    document.querySelector(`.player--${activeplayer}`).classList.add('player--active'); //to add class in changed active player
}

//Rolling dice logic
btnRoll.addEventListener('click', function () {
    if (playing) {//if playing get false no code under it get excute and if palying is true code get excute
        //1. Genrating random number
        let random = Math.trunc(Math.random() * 6 + 1);
        //2.making dice reappear and display dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${random}.png`; //   document.querySelector('img').setAttribute('src', `dice-${random}.png`);
        //3. Check for rolled 1: if true, switch to next player
        if (random !== 1) {
            //Add random number to currentScore
            currentScore += random;
            document.getElementById(`current--${activeplayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

//holding button and holding value Logic
btnHold.addEventListener('click', function () {
    if (playing) {
        //1.add current score to active player's score
        score[activeplayer] += currentScore; // score[1]=score[1]+currentScore or score[0]=score[0]+currentScore
        document.getElementById(`score--${activeplayer}`).textContent = score[activeplayer];
        //2.Finishing the game
        if (score[activeplayer] >= winingScore) {
            playing = false;//as playing get false here and button is pressed (either hold or roll) nothing work
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');//adding black color on winner player
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');//removing white color on winner player
            diceEL.classList.add('hidden');//dice again get hide
        } else {
            //3.switching player
            switchPlayer();
        }
    }
});

//Reseting the game
btnNew.addEventListener("click",function(){
    //Reseting on browser
    document.querySelector(`.player--${activeplayer}`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.getElementById(`current--${activeplayer}`).textContent=0;
    //reseting the actual value
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    score[0]=0;
    score[1]=0;
    currentScore = 0;
    activeplayer = 0;
    playing = true;
    diceEL.classList.add('hidden');
});
