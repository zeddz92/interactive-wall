import * as actionTypes from '../actions/types';

export function post(state = {all: [], filtered: []}, action) {

    const payload = action.payload;

    switch (action.type) {

        case actionTypes.RECEIVE_POSTS:
            return {
                all: payload.posts,
                filtered: payload.posts
            };

        case actionTypes.FILTER_POSTS_BY_CATEGORY:
            return {
                ...state,
                filtered: payload.categoryId === 0 ?
                    [...state.all]
                    : [...state.all.filter((p) => (
                        p.category_id === payload.categoryId
                    ))]

            };

        case actionTypes.CREATE_POST:
            return {
                ...state,
                all: [...state.all, payload],
                filtered: [...state.filtered, payload]
            };

        default :
            return state
    }
}