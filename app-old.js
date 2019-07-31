/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() { 
    if (gamePlaying) {
        // 1. Random number
     var dice = Math.floor(Math.random() * 6) + 1;

     // 2. Display result
     var diceDOM = document.querySelector('.dice');
     diceDOM.style.display = 'block'; // Show the dice
     diceDOM.src = 'dice-' + dice + '.png';
 
     // 3. Update the round score IF the rolled number was NOT 1
     if (dice !== 1) {
         // Add score
         roundScore += dice; // roundScore = roundScore + dice / Update roundscore
         document.querySelector('#current-' + activePlayer).textContent = roundScore; // Display roundscore
     } else {
         // Change player
         nextPlayer();
     }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add player's current score to global score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
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

     document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); // Without () because we don't want to call this function immediately, we jsut pass it here.

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // Hiding the dice
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


// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent; // Reading HTML content and saving into x var.
// console.log(x);