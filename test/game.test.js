const assert = chai.assert;


describe('Game class', () => {

    let game = new Game();
    let numberOfPlayers = 3;
    let startingTestHandAmount;

    function makeTestCards(players) {
        for (let i = 0; i < players.length; i++) {
            players[i].hand = [
                new Card('test', i + 2),
                new Card('test', i + 5),
                new Card('test', i + 8)
            ];
            startingTestHandAmount = 3;
        }
    }

    function makeWARtestCards(players) {
        makeTestCards(players);
        players.forEach(player => {
            player.hand.push(
                new Card('test', 11)
            );
        });
        startingTestHandAmount++;
    }

    it('makes a game with available suits and ranks', () => {
        let expectedSuits = ['H', 'S', 'D', 'C'];
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
        let startingHandAmount = Math.floor(game.deck.length / game.players.length);
        game.dealCards(game.players, game.deck);
        game.players.forEach(player => {
            assert.equal(startingHandAmount, player.hand.length);
        });
    });

    it('playRound function executes correctly when no WAR', () => {
        makeTestCards(game.players);
        game.playRound();
        let cardsToBeWon = numberOfPlayers - 1;
        let winnersHandAmount = startingTestHandAmount + cardsToBeWon;
        let expectedWinner = game.players[numberOfPlayers - 1];
        assert.equal(winnersHandAmount, expectedWinner.hand.length);
    });

    it('playWar function executes correctly when WAR', () => {
        makeWARtestCards(game.players);
        game.playRound();
        game.playWar();
        let cardsToBeWon = (numberOfPlayers * 3) - 3;
        let winnersHandAmount = startingTestHandAmount + cardsToBeWon;
        let expectedWinner = game.players[numberOfPlayers - 1];
        assert.equal(winnersHandAmount, expectedWinner.hand.length);
    });

});





