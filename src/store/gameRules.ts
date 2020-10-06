import { DEALER_WINS, PLAYER_WINS } from './actions.type';

function dealerHasGotMoreThan16(store) {

}

function dealerHasGotMoreThan21(store) {
    store.commit(PLAYER_WINS);
}

function dealerHasGotLessThanPlayer(store) {
    store.commit(PLAYER_WINS);
}

function dealerHasGotMoreThanPlayer(store) {
    store.commit(DEALER_WINS);
}

function dealerHasGotBJWith2Cards(store) {

}

function dealerHasGotBJWithMoreThan2Cards(store) {

}

function dealerHasGotAce(store) {

}

function dealerHasGot10(store) {

}
