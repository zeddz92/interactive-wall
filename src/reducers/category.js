import * as actionTypes from '../actions/types';

export function category(state = [], action) {

    const payload = action.payload;

    switch (action.type) {

        case actionTypes.RECEIVE_CATEGORIES:
            return payload.data;

        default :
            return state
    }
}