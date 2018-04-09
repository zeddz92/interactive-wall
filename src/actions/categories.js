import * as actionTypes from './types';

export const fetchCategories = () => (dispatch, getState, api) => (
    api
        .getCategories()
        .then(data => dispatch(receiveCategories(data)))
);

export function receiveCategories(data) {
    return {
        type: actionTypes.RECEIVE_CATEGORIES,
        payload: {
            data,
        },
        error: false

    }
}