/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
window.$ = document.querySelector.bind(document);
window.$$ = document.getElementById.bind(document);


var scores,
    roundScore,
    activePlayer,
    rolledSix,
    dblSixes,
    viewDice;
    // goodRoll = true;

// scores = [0,0];
// roundScore = 0;
// activePlayer = 0;

init();


// $('.dice').style.display = 'none';

$('.btn-roll').addEventListener('click', function() {
    // 1. gen a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    // validRoll(dice, goodRoll);
    // console.log('Roll is valid: ' + goodRoll);

    if (dice === 1) {
        badRoll(dice);
        // console.log("active player is: " + activePlayer);
    } else if (dice === 6 && rolledSix === false) {
        rolledSix = true;
        goodRoll(dice);
    } else if (dice === 6 && rolledSix === true) {
        doubleSixes();
        rolledSix = false;
    } 
    else {
        console.log('did not roll a six')
        goodRoll(dice);
        rolledSix = false;
    } 
})

$('.btn-hold').addEventListener('click', function(){
    $('.dice').classList.add('gameOver');
       scores[activePlayer] += roundScore;
    $$('score-' + activePlayer).textContent = scores[activePlayer];
    $('#current-' + activePlayer).textContent = '0';
    checkWinner(); 
})


function playerChange() {
    $('.dice').classList.add('gameOver');
    $('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    rolledSix = false;
    console.log(rolledSix);
    $('.player-'+activePlayer+'-panel').classList.toggle('active');
    
}

$('.btn-new').addEventListener('click', function(){
    init();
})

function init() {
    $('.dice').classList.add('gameOver');
    $$('score-0').textContent = '0';
    $$('score-1').textContent = '0';
    $$('current-0').textContent = '0';
    $$('current-1').textContent = '0';
    $$('name-0').textContent = 'PLAYER 1';
    $$('name-1').textContent = 'PLAYER 2';
    $('.player-0-panel').classList.remove('active');
    $('.player-1-panel').classList.remove('active');
    $('.player-0-panel').classList.remove('winner');
    $('.player-1-panel').classList.remove('winner');
    $('.player-0-panel').classList.add('active');
    $('.btn-roll').classList.remove('gameOver');
    $('.btn-hold').classList.remove('gameOver');
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    rolledSix = false;
    dblSixes = false;
}

function checkWinner() {
    if (scores[activePlayer] >= 100) {
        $$('name-' + activePlayer).textContent = 'WINNER';
        $('.player-' + activePlayer + '-panel').classList.toggle('winner');
        $('.player-' + activePlayer + '-panel').classList.toggle('active');
        $('.btn-roll').classList.add('gameOver');
        $('.btn-hold').classList.add('gameOver');
    } else {
        playerChange();
    }
}

function doubleSixes () {
    $('.dice').classList.add('gameOver');
    $$('score-' + activePlayer).textContent = '0';
    $$('current-' + activePlayer).textContent = '0';
    roundScore = 0;
    scores[activePlayer] = 0;
    alert('rolled Double sixes');
    playerChange();
}

function goodRoll(dice) {
    console.log('GOOD ROLL');
    console.log('dice = ' + dice)
    console.log('Active Player: ' + activePlayer);
    $('.dice').classList.remove('gameOver');
    $('.dice').src = 'assets/pic/dice-' + dice + ".png";
    //3. update the round score IF the roll is not a 1.
    roundScore = Number($('#current-' + activePlayer).textContent) + dice;
    $('#current-' + activePlayer).textContent = roundScore;
}

function badRoll(dice) {
    console.log('BAD ROLL');
    console.log('dice = ' + dice)
    console.log('Active Player: ' + activePlayer);
    $('.dice').src = 'assets/pic/dice-' + dice + ".png";
    $('#current-' + activePlayer).textContent ='0';
    playerChange();
}

$('.clr').addEventListener('click', function(){
    $('.rules').classList.add('gameOver');
    // alert('btn clicked');
})