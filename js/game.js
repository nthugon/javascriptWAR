(function(exports) {

    class Game {

        constructor () {
            this.suits = ['hearts', 'spades', 'diamonds', 'clubs'];
            this.ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
            this.deck = [];
            this.players = [];
        }

        createPlayers(numberOfPlayers) {
            let playerCount = numberOfPlayers;
            while(playerCount) {
                let newPlayer = {};
                newPlayer.name = `Player ${playerCount}`;
                newPlayer.hand = [];
                this.players.unshift(newPlayer);
                playerCount--;
            }

            return this.players;
        }

        makeDeck() {
            this.suits.forEach(suit => {
                this.ranks.forEach(rank => {
                    this.deck.push(new Card(suit, rank));
                });
            });

            return this.deck;
        }

        shuffleDeck(deck) {
            let cardsStillUnshuffled = deck.length;
            let randomFromUnshuffled;
            let lastOfUnshuffled;
            while(cardsStillUnshuffled) {
                randomFromUnshuffled = Math.floor(Math.random() * cardsStillUnshuffled--);
                lastOfUnshuffled = deck[cardsStillUnshuffled];
                deck[cardsStillUnshuffled] = deck[randomFromUnshuffled];
                deck[randomFromUnshuffled] = lastOfUnshuffled;
            }
            return deck;
        }

        dealCards(players, deck) {
            let cardsLeft = deck;
            while(cardsLeft.length >= players.length) {
                players.forEach(player => {
                    let dealtCard = cardsLeft.pop();
                    player.hand.push(dealtCard);         
                });
            }
        }
        
    }

    exports.Game = Game;

})(this);


