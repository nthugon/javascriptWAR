const assert = chai.assert;


describe('Game class', () => {

    let game = new Game();
    let startingHandAmount;

    it('makes a game with available suits and ranks', () => {
        let expectedSuits = ['hearts', 'spades', 'diamonds', 'clubs'];
        let expectedRanks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        assert.deepEqual(expectedSuits, game.suits);
        assert.deepEqual(expectedRanks, game.ranks);
    });

    it('creates empty arrays for players and deck', () => {
        let expectedPlayers = [];
        let expectedDeck = [];
        assert.deepEqual(expectedPlayers, game.players);
        assert.deepEqual(expectedDeck, game.deck);
    });

    it('creates correct number of players', () => {
        let numberOfPlayers = 3;
        game.createPlayers(numberOfPlayers);
        assert.equal(numberOfPlayers, game.players.length);
    });

    it('creates correct number of cards', () => {
        let expectedCards = 52;
        game.makeDeck();
        assert.equal(expectedCards, game.deck.length);
    });

    it('shuffles the cards', () => {
        let preShuffled = game.deck.slice();
        game.shuffleDeck(game.deck);
        assert.notDeepEqual(preShuffled, game.deck);
    });

    it('deals the cards', () => {
        startingHandAmount = Math.floor(game.deck.length / game.players.length);
        game.dealCards(game.players, game.deck);
        game.players.forEach(player => {
            assert.equal(startingHandAmount, player.hand.length);
        });
    });

    it('playRound function executes correctly when no WAR', () => {
        let numberOfPlayers = game.players.length;
        for (let i = 0; i < numberOfPlayers; i++) {
            game.players[i].hand.push({rank: i + 2, suit: 'hearts'});
        }
        game.playRound();
        let winnersHandAmount = startingHandAmount + numberOfPlayers;
        let lastPlayer = game.players[numberOfPlayers - 1];
        assert.equal(winnersHandAmount, lastPlayer.hand.length);
    });

});





