import {CARD_RANKS} from "@/const/const";
import {ICard, IInitState, TWinner} from "@/types/types";
import {DEALER_TURN} from "@/store/actions.type";

export const getRandomRank = (ranks: { [key in keyof typeof CARD_RANKS]: { name: string; value: number; } }): { name: string; value: number; } => {
    const keys = Object.keys(ranks);
    return ranks[keys[keys.length * Math.random() << 0]];
}

export const getRandomSuit = (suits: string[]): string => {
    return suits[Math.floor(Math.random() * suits.length)];
}

export const getCardValueByRank = (card: ICard): number => {
    return Object.keys(CARD_RANKS).reduce((result, key) => {
        if (card.rank === key) {
            result = CARD_RANKS[key].value;
        }
        return result;
    }, 0);
}

export const checkScore = (state: IInitState): TWinner => {

    const {turn, score} = state;

    if(turn === 'player' && score.player > 21) {
        return 'dealer';
    }
    if(turn === 'dealer' && score.dealer > 21) {
        return 'player';
    }
    if(turn === 'player' && score.player === 21) {
        return 'player';
    }
    if(turn === 'dealer' && score.dealer === 21) {
        return 'blackjack';
    }
    if(turn === 'dealer' && score.dealer > score.player) {
        console.log('dealer wins');
        return 'dealer';
    }
    if(turn === 'dealer' && score.dealer < score.player) {
        return 'player';
    }
    if(turn === 'dealer' && score.dealer === score.player) {
        return 'draw';
    }

    return '';
}

export function promiseGenerator(callback: () => void, time: number): Promise<string | unknown> {
    return new Promise(((resolve, reject) => {
        setTimeout(callback, time);
    }));
}
