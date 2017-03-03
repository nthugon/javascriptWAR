(function(exports) {

    class Game {

        constructor () {
            this.suits = ['H', 'S', 'D', 'C'];
            // 0, J, Q, K, A used to match deckofcardapi
            // getInt method translates them later
            this.ranks = [2,3,4,5,6,7,8,9,0,'J','Q','K','A'];
            this.deck = [];
            this.players = [];
            this.war = false;
            this.pot = [];
            this.highCard = 0;
            this.winner = null;
            this.warCards = [];
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

        // fisher-yates shuffle written semantically
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
            // want to make sure each player gets the same amount
            while(cardsLeft.length >= players.length) {
                players.forEach(player => {
                    let dealtCard = cardsLeft.pop();
                    player.hand.push(dealtCard);         
                });
            }
        }

        playRound () {
            // to stop the function if there is already a winner
            if (this.players.length === 1) {
                return;
            }
            this.pot = [];
            this.resetTrackers();
            this.putCardsIn(this.pot);
            this.findWinner(this.pot);
            if (this.war) {
                return;
            } else {
                this.winner.hand.unshift(...this.pot);
            }
            this.removeLosers();
        }

        playWar () {
            this.resetTrackers();
            // make sure players have enough cards to play WAR
            for (let i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].hand.length < 2) {
                    this.pot.push(...this.players[i].hand);
                    this.players.splice(i, 1);
                }
            }
            this.putCardsIn(this.pot);
            this.putCardsIn(this.warCards);
            this.findWinner(this.warCards);
            this.pot.push(...this.warCards);
            if (this.war) {
                return;
            } else {
                this.winner.hand.unshift(...this.pot);
            }
            this.removeLosers();
        }

        getInt (card) {
            switch(card.rank) {
            case 0:
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

        findWinner (cardsToCompare) {
            // for loop used in order to associate player with card
            for(let i = 0; i < cardsToCompare.length; i++) {
                if (this.getInt(cardsToCompare[i]) > this.highCard) {
                    this.highCard = this.getInt(cardsToCompare[i]);
                    this.winner = this.players[i];
                    this.war = false;    
                } else if (this.getInt(cardsToCompare[i]) === this.highCard) {
                    // since WAR round involves all players, no need to
                    // track which player drew the same card
                    this.war = true;
                }
            }
        }

        resetTrackers () {
            this.highCard = 0;
            this.winner = null;
            this.war = false;
            this.warCards = [];
        }

        putCardsIn (destination) {
            this.players.forEach(player => {
                let card = player.hand.pop();
                destination.push(card);
            });
        }

        removeLosers () {
            // reverse for loop so players can be removed as loop executes
            for (let i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].hand.length === 0) {
                    this.players.splice(i, 1);
                }
            }
        }
       
    }

    exports.Game = Game;

})(this);



