import {CARD_RANKS} from "@/const/const";
import {ICard, IInitState, EWinner, ETurn} from "@/types/types";

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

export const checkScore = (state: IInitState): EWinner => {

    const {turn, score} = state;

    if(turn === ETurn.player && score.player > 21) {
        return EWinner.dealer;
    }
    if(turn === ETurn.dealer && score.dealer > 21) {
        return EWinner.player;
    }
    if(turn === ETurn.player && score.player === 21) {
        return EWinner.player;
    }
    if(turn === ETurn.dealer && score.dealer === 21) {
        return EWinner.blackjack;
    }
    if(turn === ETurn.dealer && score.dealer > score.player) {
        return EWinner.dealer;
    }
    if(turn === ETurn.dealer && score.dealer < score.player) {
        return EWinner.player;
    }
    if(turn === ETurn.dealer && score.dealer === score.player) {
        return EWinner.draw;
    }

    return EWinner.none;
}

export function promiseGenerator(callback: () => void, time: number): Promise<string | unknown> {
    return new Promise(((resolve, reject) => {
        setTimeout(callback, time);
    }));
}
