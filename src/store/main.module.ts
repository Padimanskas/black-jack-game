import { DEALER_DID_HIT, PLAYER_DID_HIT } from './actions.type';

const initialState = {
    hits: {
        dealer: [],
        player: []
    }
};

const state = { ...initialState };

const mutations = {
    [DEALER_DID_HIT](state, value) {
        state.hits.dealer.push({attr: value});
    },
    [PLAYER_DID_HIT](state, value) {
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


