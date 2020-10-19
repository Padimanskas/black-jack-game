import {
    CHANGE_TURN,
    CHECK_SCORE,
    CLEAR_HITS,
    CLEAR_SCORE,
    DEALER_TURN,
    NEW_DEAL,
    OPEN_ALL_CARDS,
    PLAYER_TURN,
    SET_WINNER
} from './actions.type';
import {EWinner, ICard, IInitState, ETurn} from '@/types/types';
import {checkScore, getCardValueByRank, getRandomRank, getRandomSuit, promiseGenerator} from "@/helpers/helpers";
import {CARD_RANKS, CARD_SUITS} from "@/const/const";
import {ActionContext} from 'vuex';

const initialState: IInitState = {
    hits: {
        dealer: [],
        player: []
    },
    score: {
        player: 0,
        dealer: 0
    },
    turn: ETurn.player,
    winner: EWinner.none,
};

const state = {...initialState};

const mutations = {
    [DEALER_TURN](state: IInitState, card: ICard = <ICard>{}): void {
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
    [CHANGE_TURN](state: IInitState, turn: ETurn): void {
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
    [SET_WINNER](state: IInitState, winner: EWinner): void {
        state.winner = winner;
    }
};

const actions = {
    [DEALER_TURN]({commit, dispatch}: ActionContext<IInitState, IInitState>) {
        commit(OPEN_ALL_CARDS)
        commit(CHANGE_TURN, EWinner.dealer);
        return new Promise(function dealerTurnCallback(resolve, reject) {
            if (state.score.dealer < 17) {
                setTimeout(() => {
                    commit(DEALER_TURN);
                    dealerTurnCallback(resolve, reject);
                }, 1000);
            }
            dispatch(CHECK_SCORE);
            resolve();
        });
    },
    [CHECK_SCORE]({commit, state}: ActionContext<IInitState, IInitState>) {
        commit(SET_WINNER, checkScore(state));
    },
    [PLAYER_TURN]({commit, dispatch}: ActionContext<IInitState, IInitState>) {
        commit(PLAYER_TURN, {});
        dispatch(CHECK_SCORE);
        return Promise.resolve();
    },
    [NEW_DEAL]({commit}: ActionContext<IInitState, IInitState>) {
        const animationDelay = 300;
        const promises = [
            promiseGenerator(() => commit(PLAYER_TURN, {}), 0),
            promiseGenerator(() => commit(DEALER_TURN, {}), animationDelay),
            promiseGenerator(() => commit(PLAYER_TURN, {}), 2 * animationDelay),
            promiseGenerator(() => commit(DEALER_TURN, {upsideDown: true}), 3 * animationDelay)
        ];

        commit(SET_WINNER, EWinner.none);
        commit(CLEAR_HITS);
        commit(CLEAR_SCORE);
        commit(CHANGE_TURN, EWinner.player);
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
    turn(state: IInitState): ETurn {
        return state.turn;
    },
    winner(state: IInitState): EWinner {
        return state.winner;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};


