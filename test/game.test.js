const assert = chai.assert;


describe('Game class', () => {

    it('makes a game with available suits ranks', done => {
        let game = new Game();
        let expectedSuits = ['hearts', 'spades', 'diamonds', 'clubs'];
        let expectedRanks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        assert.deepEqual(expectedSuits, game.suits);
        assert.deepEqual(expectedRanks, game.ranks);
        done();
    });

    it('creates empty arrays for players and deck', done => {
        let game = new Game();
        let expectedPlayers = [];
        let expectedDeck = [];
        assert.deepEqual(expectedPlayers, game.players);
        assert.deepEqual(expectedDeck, game.deck);
        done();
    });

});





