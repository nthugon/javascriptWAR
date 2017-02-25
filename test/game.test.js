const assert = chai.assert;


describe('Game class', () => {

    let game = new Game();

    it('makes a game with available suits and ranks', done => {
        let expectedSuits = ['hearts', 'spades', 'diamonds', 'clubs'];
        let expectedRanks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        assert.deepEqual(expectedSuits, game.suits);
        assert.deepEqual(expectedRanks, game.ranks);
        done();
    });

    it('creates empty arrays for players and deck', done => {
        let expectedPlayers = [];
        let expectedDeck = [];
        assert.deepEqual(expectedPlayers, game.players);
        assert.deepEqual(expectedDeck, game.deck);
        done();
    });

    it('creates correct number of players', done => {
        let numberOfPlayers = 3;
        game.createPlayers(numberOfPlayers);
        assert.equal(numberOfPlayers, game.players.length);
        done();
    });

    it('creates correct number of cards', done => {
        let expectedCards = 52;
        game.makeDeck();
        assert.equal(expectedCards, game.deck.length);
        done();
    });

});





