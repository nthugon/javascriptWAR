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
        
    }

    exports.Game = Game;

})(this);


