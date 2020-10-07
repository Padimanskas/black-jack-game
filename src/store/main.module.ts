import Vuex, { StoreOptions } from 'vuex';
import { DEALER_DID_HIT, PLAYER_DID_HIT } from './actions.type';
import { IInitState } from '@/types/types';

const initialState: IInitState = {
    hits: {
        dealer: [],
        player: []
    }
};

const state = { ...initialState };

const mutations = {
    [DEALER_DID_HIT](state: IInitState, value: string) {
        state.hits.dealer.push({rank: 2, suit: 'HEARTS'});
    },
    [PLAYER_DID_HIT](state: any, value: any) {
        state.hits.player.push({attr: value});
    }
};

const getters = {
    playerHits(state) {
        return state.hits.player;
    },
    dealerHits(state) {
        return state.hits.dealer;
    }
};

export default {
    state,
    mutations,
    getters
};


