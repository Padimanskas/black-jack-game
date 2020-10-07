type TSuit = 'DIAMONDS' | 'HEARTS' | 'SPADES' | 'CLUBS';
type TRank = 2|3|4|5|6|7|8|9|10|'ACE'|'KING'|'QUEEN'|'JACK';

interface ICard {
    suit: TSuit;
    rank: TRank;
    shoePosition?: IPosition;
}

interface IInitState {
    hits: {
        dealer: Array<ICard>,
        player: Array<ICard>
    };
}

interface IPosition {
    top: number;
    left: number;
}

export { IInitState, ICard, TRank, TSuit, IPosition };
