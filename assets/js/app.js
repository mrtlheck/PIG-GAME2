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
    activePlayer;

// scores = [0,0];
// roundScore = 0;
// activePlayer = 0;

init();


// $('.dice').style.display = 'none';

$('.btn-roll').addEventListener('click', function() {
    // 1. gen a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    if (dice === 1) {
        $('.dice').src = 'assets/pic/dice-' + dice + ".png";
        $('#current-' + activePlayer).textContent ='0';
        playerChange();
        // console.log("active player is: " + activePlayer);
    } else {
    // 2. display result
    $('.dice').classList.remove('gameOver');
    $('.dice').src = 'assets/pic/dice-' + dice + ".png";

    //3. update the round score IF the roll is not a 1.
    roundScore = Number($('#current-' + activePlayer).textContent) + dice;
    $('#current-' + activePlayer).textContent = roundScore;
    };
} )

$('.btn-hold').addEventListener('click', function(){
    $('.dice').classList.add('gameOver');
       scores[activePlayer] += roundScore;
    $$('score-' + activePlayer).textContent = scores[activePlayer];
    $('#current-' + activePlayer).textContent = '0';
    checkWinner(); 
})


function playerChange() {
    $('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
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

