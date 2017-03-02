var startGameButton = document.getElementById("startGame");
var playRoundButton = document.getElementById("playRound");
var numberOfPlayers = document.getElementById("numberOfPlayers");
var playersCards = document.getElementById("playersCards");
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
    playersCards.innerHTML = "Push 'Play Round' button to begin";
    game = new Game();
    game.createPlayers(numberOfPlayers.value);
    game.makeDeck();
    game.shuffleDeck(game.deck);
    game.dealCards(game.players, game.deck);
};

var playWar = function () {
    playersCards.innerHTML = '';
    game.players.forEach(player => {
        let cardSlot = document.createElement("div");
        let playerName = document.createElement("h2");
        playerName.innerText = player.name;
        cardSlot.appendChild(playerName);
        let cardTotal = document.createElement("li");
        cardTotal.innerText = `${player.hand.length} Cards Left`;
        cardSlot.appendChild(cardTotal);
        let card = document.createElement("li");
        if (player.hand.length >= 2) {
            let currentCard = player.hand[player.hand.length - 2];        
            card.innerText = `${currentCard.rank} of ${currentCard.suit}`;  
        } else {
            card.innerText = 'Not Enough Cards to play WAR';
        }
        cardSlot.appendChild(card); 
        playersCards.appendChild(cardSlot);
    });

    game.playWar();
    playRoundButton.innerText = 'Play Round';
    console.log('WAR');

};

var play = function() {
    if (game.war) {
        playWar();
    } else {
        playRound();
    }
};

var playRound = function() {
    playersCards.innerHTML = '';
    game.players.forEach(player => {
        let currentCard = player.hand[player.hand.length - 1];
        let cardSlot = document.createElement("div");
        let playerName = document.createElement("h2");
        playerName.innerText = player.name;
        cardSlot.appendChild(playerName);
        let cardTotal = document.createElement("li");
        cardTotal.innerText = `${player.hand.length} Cards Left`;
        cardSlot.appendChild(cardTotal);
        let card = document.createElement("img");
        card.src = `https://deckofcardsapi.com/static/img/${currentCard.rank}${currentCard.suit}.png`;
        // let card = document.createElement("li");
        // card.innerText = `${currentCard.rank} of ${currentCard.suit}`;
        cardSlot.appendChild(card);
        playersCards.appendChild(cardSlot);

    });
    game.playRound();
    if (game.war) {
        let warDiv = document.createElement("div");
        let warMessage = document.createElement("h2");
        warMessage.innerText = "We Have a WAR! Press the 'Play WAR' button to continue";
        warDiv.appendChild(warMessage);
        playersCards.appendChild(warDiv);
        playRoundButton.innerText = 'Play WAR';
    }
    if (game.players.length === 1) {
        playersCards.innerHTML = '';
        let winnerMessage = document.createElement("h2");
        winnerMessage.innerText = `${game.players[0].name} is the winner!`;
        playersCards.appendChild(winnerMessage);
        return;
    }
    console.log('regular');
};

startGameButton.addEventListener("click", startGame);
playRoundButton.addEventListener("click", play);
