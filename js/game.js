(function(exports) {

    class Game {

        constructor () {
            this.suits = ['H', 'S', 'D', 'C'];
            this.ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
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

        playRound () {
            if (this.players.length === 1) {
                // console.log(`${this.players[0].name} is the winner!`);
                return;
            }
            this.pot = [];
            let highCard = 0;
            let winner = null;
            // let war = false;

            this.players.forEach(player => {
                let card = player.hand.pop();
                // console.log(`${player.name}'s initial card is ${card.rank} of ${card.suit}`);
                this.pot.push(card);
            });
            for(let i = 0; i < this.pot.length; i++) {
                if (this.pot[i].rank > highCard) {
                    highCard = this.pot[i].rank;
                    winner = this.players[i];
                    this.war = false;
                } else if (this.pot[i].rank === highCard) {
                    this.war = true;
                }
            }
            if (this.war) {
                return;
                // this.playWar(pot);
            } else {
                // console.log(`${winner.name} won this hand!`);
                winner.hand.unshift(...this.pot);
            }
            for (let i = this.players.length - 1; i >= 0; i--) {
                // console.log(`${this.players[i].name} has ${this.players[i].hand.length} cards left`);
                if (this.players[i].hand.length === 0) {
                    // console.log(`${this.players[i].name} is out!`);
                    this.players.splice(i, 1);
                }
            }
            if (this.players.length === 1) {
                // console.log(`${this.players[0].name} is the winner!`);
            }
        }

        playWar () {
            // console.log('playing WAR');
            let warCards = [];
            let highCard = 0;
            let winner = null;
            // let war = false;
            this.war = false;
            for (let i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].hand.length < 2) {
                    // console.log(`${this.players[i].name} is out!`);
                    this.pot.push(...this.players[i].hand);
                    this.players.splice(i, 1);
                }
            }
            this.players.forEach(player => {
                let potCard = player.hand.pop();
                this.pot.push(potCard);
                let warCard = player.hand.pop();
                // console.log(`${player.name}'s warCard is the ${warCard.rank} of ${warCard.suit}`);
                warCards.push(warCard);
            });
            for (let i = 0; i < warCards.length; i++) {
                if (warCards[i].rank > highCard) {
                    highCard = warCards[i].rank;
                    winner = this.players[i];
                    this.war = false;
                } else if (warCards[i].rank === highCard) {
                    this.war = true;
                }
            }
            this.pot.push(...warCards);
            if (this.war) {
                return;
                // this.playWar(this.pot);
            } else {
                // console.log(`${winner.name} won this WAR hand!`);
                winner.hand.unshift(...this.pot);
            }
            for (let i = this.players.length - 1; i >= 0; i--) {
                // console.log(`${this.players[i].name} has ${this.players[i].hand.length} cards left`);
                if (this.players[i].hand.length === 0) {
                    // console.log(`${this.players[i].name} is out!`);
                    this.players.splice(i, 1);
                }
            }
            if (this.players.length === 1) {
                // console.log(`${this.players[0].name} is the winner!`);
            }
        }

        playGame (numberOfPlayers) {
            this.createPlayers(numberOfPlayers);
            this.makeDeck();
            this.shuffleDeck(this.deck);
            this.dealCards(this.players, this.deck);
            while (this.players.length > 1) {
                this.playRound();
            }
        }
        
    }

    exports.Game = Game;

})(this);



