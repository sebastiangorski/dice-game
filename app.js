/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- ALSO, if the player rolls two 6 for any dice in a row, his GLOBAL score gets lost.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.
- Players can define the winning value, be default it's 100.

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice1; // So that the var of last dice value is not lost after function returns
var lastDice2;

document.querySelector('.btn-roll').addEventListener('click', function() { 
    if (gamePlaying) {
        // 1. Random number
     var dice1 = Math.floor(Math.random() * 6) + 1;
     var dice2 = Math.floor(Math.random() * 6) + 1;
     console.log(dice1, dice2);

     // 2. Display result
     document.getElementById('dice-1').style.display = 'block';
     document.getElementById('dice-2').style.display = 'block';
     document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
     document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
 
    if (dice1 === 6 && lastDice1 === 6 || dice2 === 6 && lastDice2 === 6) {
        // Player loses global score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
     } else if (dice1 !== 1 && dice2 !== 1) {
        // Add score
        roundScore += dice1 + dice2; // roundScore = roundScore + dice / Update roundscore
        document.querySelector('#current-' + activePlayer).textContent = roundScore; // Display roundscore
     } else {
         // Change player
         nextPlayer();
     }

    lastDice1 = dice1;
    lastDice2 = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add player's current score to global score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Players own input value
        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is coerced to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Change player
            nextPlayer();
        }
    }
});

function nextPlayer() {
     // Change player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // Ternary operator
     roundScore = 0;

     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
     //document.querySelector('.player-0-panel').classList.remove('active');
     //document.querySelector('.player-1-panel').classList.add('active');

     document.getElementById('dice-1').style.display = 'none';
     document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); // Without () because we don't want to call this function immediately, we jsut pass it here.

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'; // Hiding the dice

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); // Back to the Player 1
}