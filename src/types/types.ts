type TSuit = 'DIAMOND' | 'HEART' | 'SPADE' | 'CLUB';
type TRank = 2|3|4|5|6|7|8|9|10|'ACE'|'KING'|'QUEEN'|'JACK';
enum ETurn {
    player = 'player',
    dealer = 'dealer'
}
enum EWinner {
    player = 'player',
    dealer = 'dealer',
    blackjack = 'blackjack',
    draw = 'draw',
    none = ''
}

interface ICard {
    suit: TSuit;
    rank: TRank;
    shoePosition?: IPosition;
    upsideDown?: boolean;
}

interface IInitState {
    hits: {
        dealer: Array<ICard>,
        player: Array<ICard>
    };
    score: {
        player: number;
        dealer: number;
    },
    turn: ETurn;
    winner: EWinner;
}

interface IPosition {
    top?: number;
    left?: number;
}

export { IInitState, ICard, TRank, TSuit, IPosition, ETurn, EWinner };
