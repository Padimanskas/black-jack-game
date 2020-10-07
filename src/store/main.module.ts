import { DEALER_DID_HIT, PLAYER_DID_HIT } from './actions.type';
import { ICard, IInitState } from '@/types/types';

const initialState: IInitState = {
    hits: {
        dealer: [],
        player: []
    }
};

const state = { ...initialState };

const mutations = {
    [DEALER_DID_HIT](state: IInitState, card: ICard): void {
        state.hits.dealer.push(card);
    },
    [PLAYER_DID_HIT](state: IInitState, value: string): void {
        state.hits.player.push({rank: 'ACE', suit: 'SPADE'});
    }
};

const getters = {
    playerHits(state: IInitState): ICard[] {
        return state.hits.player;
    },
    dealerHits(state: IInitState): ICard[] {
        return state.hits.dealer;
    }
};

export default {
    state,
    mutations,
    getters
};


