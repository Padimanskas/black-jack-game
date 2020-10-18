import {
    DEALER_TURN,
    PLAYER_TURN,
    CLEAR_HITS,
    CLEAR_SCORE,
    OPEN_ALL_CARDS,
    CHECK_SCORE,
    NEW_DEAL,
    CHANGE_TURN,
    SET_WINNER
} from './actions.type';
import {ICard, IInitState, TTurn, TWinner} from '@/types/types';
import {checkScore, getCardValueByRank, getRandomRank, getRandomSuit, promiseGenerator} from "@/helpers/helpers";
import {CARD_RANKS, CARD_SUITS} from "@/const/const";

const initialState: IInitState = {
    hits: {
        dealer: [],
        player: []
    },
    score: {
        player: 0,
        dealer: 0
    },
    turn: 'player',
    winner: '',
};

const state = {...initialState};

const mutations = {
    [DEALER_TURN](state: IInitState, card: ICard): void {
        const randomRank = getRandomRank(CARD_RANKS);
        const randomSuit = getRandomSuit(CARD_SUITS);

        state.hits.dealer.push(Object.assign(card, {
            rank: randomRank.name,
            suit: randomSuit,
            upsideDown: card.upsideDown
        }));
        if (!card.upsideDown) {
            state.score.dealer += randomRank.value;
        }
    },
    [PLAYER_TURN](state: IInitState, card: ICard): void {
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
    [CHANGE_TURN](state: IInitState, turn: TTurn): void {
        state.turn = turn;
    },
    [OPEN_ALL_CARDS](state: IInitState): void {
        state.hits.dealer.map((card) => {
            if (card.upsideDown) {
                card.upsideDown = false;
                state.score.dealer += getCardValueByRank(card);
            }
            return card;
        });
    },
    [SET_WINNER](state: IInitState, winner: TWinner): void {
        state.winner = winner;
    }
};

const actions = {
    [DEALER_TURN]({commit, dispatch}) {
        commit(OPEN_ALL_CARDS, {})
        commit(CHANGE_TURN, 'dealer');
        return new Promise(function dealerTurnCallback(resolve, reject) {
            if (state.score.dealer < 17) {
                setTimeout(() => {
                    commit(DEALER_TURN, {});
                    dealerTurnCallback(resolve, reject);
                }, 1000);
            }
            dispatch(CHECK_SCORE);
            resolve();
        });
    },
    [CHECK_SCORE]({commit, state}) {
        commit(SET_WINNER, checkScore(state));
    },
    [PLAYER_TURN]({commit, dispatch}) {
        commit(PLAYER_TURN, {});
        dispatch(CHECK_SCORE);
    },
    [NEW_DEAL]({commit}) {
        const promises = [
            promiseGenerator(() => commit(PLAYER_TURN, {}), 0),
            promiseGenerator(() => commit(DEALER_TURN, {}), 300),
            promiseGenerator(() => commit(PLAYER_TURN, {}), 600),
            promiseGenerator(() => commit(DEALER_TURN, {upsideDown: true}), 900)
        ];

        commit(SET_WINNER, '');
        commit(CLEAR_HITS);
        commit(CLEAR_SCORE);
        commit(CHANGE_TURN, 'player');
        return Promise.all(promises);
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
    },
    turn(state: IInitState): TTurn {
        return state.turn;
    },
    winner(state: IInitState): TWinner {
        return state.winner;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};


