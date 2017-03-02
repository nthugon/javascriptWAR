(function(exports) {

    class Game {

        constructor () {
            this.suits = ['H', 'S', 'D', 'C'];
            this.ranks = [2,3,4,5,6,7,8,9,0,'J','Q','K','A'];
            this.deck = [];
            this.players = [];
            this.war = false;
            this.pot = [];
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

        getInt (card) {
            switch(card.rank) {
            case '0':
                return 10;
            case 'J':
                return 11;
            case 'Q':
                return 12;
            case 'K':
                return 13;
            case 'A':
                return 14;
            default:
                return card.rank;
            }
        }

        playRound () {
            if (this.players.length === 1) {
                return;
            }
            this.pot = [];
            let highCard = 0;
            let winner = null;
            this.players.forEach(player => {
                let card = player.hand.pop();
                this.pot.push(card);
            });
            for(let i = 0; i < this.pot.length; i++) {
                if (this.getInt(this.pot[i]) > highCard) {
                    highCard = this.getInt(this.pot[i]);
                    winner = this.players[i];
                    this.war = false;
                } else if (this.getInt(this.pot[i]) === highCard) {
                    this.war = true;
                }
            }
            if (this.war) {
                return;
            } else {
                winner.hand.unshift(...this.pot);
            }
            for (let i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].hand.length === 0) {
                    this.players.splice(i, 1);
                }
            }
        }

        playWar () {
            let warCards = [];
            let highCard = 0;
            let winner = null;
            this.war = false;
            for (let i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].hand.length < 2) {
                    this.pot.push(...this.players[i].hand);
                    this.players.splice(i, 1);
                }
            }
            this.players.forEach(player => {
                let potCard = player.hand.pop();
                this.pot.push(potCard);
                let warCard = player.hand.pop();
                warCards.push(warCard);
            });
            for (let i = 0; i < warCards.length; i++) {
                if (this.getInt(warCards[i]) > highCard) {
                    highCard = this.getInt(warCards[i]);
                    winner = this.players[i];
                    this.war = false;
                } else if (this.getInt(warCards[i]) === highCard) {
                    this.war = true;
                }
            }
            this.pot.push(...warCards);
            if (this.war) {
                return;
            } else {
                winner.hand.unshift(...this.pot);
            }
            for (let i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].hand.length === 0) {
                    this.players.splice(i, 1);
                }
            }
        }
        
    }

    exports.Game = Game;

})(this);



