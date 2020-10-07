import { DEALER_WINS, PLAYER_WINS } from './actions.type';
import { IInitState } from '@/types/types';
import { Store } from 'vuex';

function dealerHasGotMoreThan16(store: IInitState): void {
    return;
}

function dealerHasGotMoreThan21(store: Store<IInitState>): void {
    store.commit(PLAYER_WINS);
}

function dealerHasGotLessThanPlayer(store: Store<IInitState>): void {
    store.commit(PLAYER_WINS);
}

function dealerHasGotMoreThanPlayer(store: Store<IInitState>): void {
    store.commit(DEALER_WINS);
}

function dealerHasGotBJWith2Cards(store: IInitState): void {
    return;
}

function dealerHasGotBJWithMoreThan2Cards(store: IInitState): void {
    return;
}

function dealerHasGotAce(store: IInitState): void {
    return;
}

function dealerHasGot10(store: IInitState): void {
    return;
}
