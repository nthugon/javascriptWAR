const startGameButton = document.getElementById("startGame");
const playRoundButton = document.getElementById("playRound");
const numberOfPlayers = document.getElementById("numberOfPlayers");
const playersInfo = document.getElementById("playersInfo");
var game;

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
    playersInfo.innerHTML = "Push 'Play Round' button to begin";
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
    showCards();
    console.log('Playing Round');
    game.playRound();
    if (game.war) {
        warMessage();
    }
    if (game.players.length === 1) {
        announceWinner();
        return;
    }
}

function playWar() {
    playersInfo.innerHTML = '';
    showCards();
    game.playWar();
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
    let warDiv = document.createElement("div");
    let warMessage = document.createElement("h2");
    warMessage.innerText = "We Have a WAR! Press the 'Play WAR' button to continue";
    warDiv.appendChild(warMessage);
    playersInfo.appendChild(warDiv);
    playRoundButton.innerText = 'Play WAR';
    console.log('Playing WAR!');
}

function announceWinner () {
    playersInfo.innerHTML = '';
    let winnerMessage = document.createElement("h2");
    winnerMessage.innerText = `${game.players[0].name} is the winner!`;
    playersInfo.appendChild(winnerMessage);
    console.log(`${game.players[0].name} is the winner!`);
}

function showCards () {   
    function getCardInfo (player, cardSlot) {
        let card = document.createElement("img");
        let currentCard = null;
        if (game.war) {
            currentCard = player.hand[player.hand.length - 2];
        } else {
            currentCard = player.hand[player.hand.length - 1];
        }
        card.src = `https://deckofcardsapi.com/static/img/${currentCard.rank}${currentCard.suit}.png`;
        cardSlot.appendChild(card);
        console.log(`${player.name} has the ${currentCard.rank} of ${currentCard.suit} card with ${player.hand.length} cards left`);
    }
    game.players.forEach(player => {
        let cardSlot = document.createElement("div");
        let playerName = document.createElement("h2");
        playerName.innerText = player.name;
        cardSlot.appendChild(playerName);
        let cardTotal = document.createElement("li");
        cardTotal.innerText = `${player.hand.length} Cards Left`;
        cardSlot.appendChild(cardTotal);
        if (game.war) {
            if (player.hand.length >= 2) {
                getCardInfo(player, cardSlot); 
            } else {
                let notEnough = document.createElement("li");
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
