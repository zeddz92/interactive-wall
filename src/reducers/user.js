import * as actionTypes from '../actions/types';

export function user(state = {id: null, data: {}}, action) {

    const payload = action.payload;

    switch (action.type) {

        case actionTypes.RECEIVE_USER_DATA:
            return payload;

        default :
            return state
    }
}