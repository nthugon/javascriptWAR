const assert = chai.assert;

describe('Card class', () => {

    it('makes card with given suit and rank', () => {
        let suit = "hearts";
        let rank = 13;
        let card = new Card(suit, rank);
        assert.equal(suit, card.suit);
        assert.equal(rank, card.rank);
    });

});




