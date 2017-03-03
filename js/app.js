const startGameButton = document.getElementById("startGame");
const playRoundButton = document.getElementById("playRound");
const numberOfPlayers = document.getElementById("numberOfPlayers");
const playersInfo = document.getElementById("playersInfo");
var game;

// to play the game atomatically in its entirety
function automatedGame (players) { // eslint-disable-line no-unused-vars
    game = new Game();
    game.createPlayers(players);
    game.makeDeck();
    game.shuffleDeck(game.deck);
    game.dealCards(game.players, game.deck);
    while (game.players.length > 1) {
        play();
    }
}

var startGame = function() {
    document.getElementById("playRound").disabled = false;
    playersInfo.innerHTML = '';
    let startDiv = document.createElement("div");
    startDiv.classList.add("startDiv");
    let startMessage = document.createElement("h2");
    startMessage.innerText = "Push 'Play Round' button to begin";
    startDiv.appendChild(startMessage);
    playersInfo.appendChild(startDiv);
    game = new Game();
    game.createPlayers(numberOfPlayers.value);
    game.makeDeck();
    game.shuffleDeck(game.deck);
    game.dealCards(game.players, game.deck);
};

var play = function() {
    if (game.war) {
        playWar();
    } else {
        playRound();
    }
};

function playRound() {
    playersInfo.innerHTML = '';
    // separates each round of cards in console
    console.log('Playing Round');   
    showCards();
    game.playRound();
    whoWonRound();
    if (game.war) {
        warMessage();
    }
    if (game.players.length === 1) {
        announceWinner();
    }
}

function playWar() {
    playersInfo.innerHTML = '';
    showCards();
    game.playWar();
    whoWonRound();
    // toggle name of button
    playRoundButton.innerText = 'Play Round';
    if (game.war) {
        warMessage();
    }
    if (game.players.length === 1) {
        announceWinner();
        return;
    }
}

function warMessage () {
    playersInfo.removeChild(playersInfo.lastChild);
    let warDiv = document.createElement("div");
    let warMessage = document.createElement("h2");
    warMessage.innerText = "We Have a WAR! Press the 'Play WAR' button to continue";
    warDiv.appendChild(warMessage);
    playersInfo.appendChild(warDiv);
    // toggle name of button
    playRoundButton.innerText = 'Play WAR';
    // separates each round of cards in console
    console.log('Playing WAR!');
}

function announceWinner () {
    playersInfo.innerHTML = '';
    let winnerMessage = document.createElement("h2");
    winnerMessage.innerText = `${game.players[0].name} is the winner!`;
    playersInfo.appendChild(winnerMessage);
    console.log(`${game.players[0].name} is the winner!`);
}

function whoWonRound () {
    let winnerDiv = document.createElement("div");
    let winnerMessage = document.createElement("h2");
    winnerMessage.innerText = `${game.winner.name} won this round!`;
    winnerDiv.appendChild(winnerMessage);
    playersInfo.appendChild(winnerDiv);
    console.log(`${game.winner.name} won this round!`);
}

function showCards () {   
    function getCardInfo (player, cardSlot) {
        let card = document.createElement("img");
        let currentCard = null;
        if (game.war) {
            // account for first card of WAR being face down
            currentCard = player.hand[player.hand.length - 2];
        } else {
            currentCard = player.hand[player.hand.length - 1];
        }
        card.src = `https://deckofcardsapi.com/static/img/${currentCard.rank}${currentCard.suit}.png`;
        cardSlot.appendChild(card);
        // to track game play of each round
        console.log(`${player.name} has the ${currentCard.rank} of ${currentCard.suit} card with ${player.hand.length} cards left`);
    }
    game.players.forEach(player => {
        let cardSlot = document.createElement("div");
        cardSlot.classList.add("cardSlot");
        let playerName = document.createElement("h2");
        playerName.innerText = player.name;
        cardSlot.appendChild(playerName);
        let cardTotal = document.createElement("p");
        cardTotal.innerText = `${player.hand.length} Cards Left`;
        cardSlot.appendChild(cardTotal);
        if (game.war) {
            // make sure player has a WAR card to play
            if (player.hand.length >= 2) {
                getCardInfo(player, cardSlot); 
            } else {
                let notEnough = document.createElement("p");
                notEnough.innerText = 'Not Enough Cards to play WAR';
                cardSlot.appendChild(notEnough);
                console.log(`${player.name} does not have enough cards to play WAR`);
            }
        } else {
            getCardInfo(player, cardSlot);
        }
        playersInfo.appendChild(cardSlot);
    });
}

startGameButton.addEventListener("click", startGame);
playRoundButton.addEventListener("click", play);
