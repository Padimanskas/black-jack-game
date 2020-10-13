type TSuit = 'DIAMOND' | 'HEART' | 'SPADE' | 'CLUB';
type TRank = 2|3|4|5|6|7|8|9|10|'ACE'|'KING'|'QUEEN'|'JACK';
type TTurn = 'player' | 'dealer';
type TWinner = 'player' | 'dealer' | 'blackjack' | '';

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
    turn: TTurn;
    winner: 'dealer' | 'player' | 'blackjack' | '';
}

interface IPosition {
    top: number;
    left: number;
}

export { IInitState, ICard, TRank, TSuit, IPosition, TTurn, TWinner };
