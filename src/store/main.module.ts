import { DEALER_DID_HIT, PLAYER_DID_HIT, CLEAR_HITS, CLEAR_SCORE, OPEN_ALL_CARDS } from './actions.type';
import { ICard, IInitState } from '@/types/types';
import { getRandomRank, getRandomSuit } from "@/handlers/helpers";
import { CARD_RANKS, CARD_SUITS } from "@/const/const";

const initialState: IInitState = {
    hits: {
        dealer: [],
        player: []
    },
    score: {
        player: 0,
        dealer: 0
    }
};

const state = { ...initialState };

const mutations = {
    [DEALER_DID_HIT](state: IInitState, card: ICard): void {
        const randomRank = getRandomRank(CARD_RANKS);
        const randomSuit = getRandomSuit(CARD_SUITS);

        state.hits.dealer.push(Object.assign(card, {rank: randomRank.name, suit: randomSuit, upsideDown: card.upsideDown}));
        state.score.dealer += randomRank.value;
    },
    [PLAYER_DID_HIT](state: IInitState, card: ICard): void {
        const randomRank = getRandomRank(CARD_RANKS);
        const randomSuit = getRandomSuit(CARD_SUITS);

        state.hits.player.push(Object.assign(card, {rank: randomRank.name, suit: randomSuit}));
        state.score.player += randomRank.value;
    },
    [CLEAR_HITS](state: IInitState): void {
        state.hits.player = [];
        state.hits.dealer = [];
    },
    [CLEAR_SCORE](state: IInitState): void {
        state.score.player = 0;
        state.score.dealer = 0;
    },
    [OPEN_ALL_CARDS](state: IInitState): void {
        console.log('open all cards');
        state.hits.dealer.map((card) => {
            if(card.upsideDown) {
                card.upsideDown = false;
            }
            return card;
        });
    }

};

const getters = {
    playerHits(state: IInitState): ICard[] {
        return state.hits.player;
    },
    dealerHits(state: IInitState): ICard[] {
        return state.hits.dealer;
    },
    playerScore(state: IInitState): number {
        return state.score.player;
    },
    dealerScore(state: IInitState): number {
        return state.score.dealer;
    }
};

export default {
    state,
    mutations,
    getters
};


