import * as actionTypes from './types';

export const fetchUserData = (userUid) => (dispatch, getState, api) => (
    api
        .getUserData(userUid)
        .then(userData => dispatch(receiveUserData(userUid, userData)))
);


export const registerNewUser = (user) => (dispatch, getState, api) => (
    api
        .registerNewUser(user)
        .then((id) => dispatch(receiveUserData(id, user, false)))
        .catch(error => receiveUserData(null, null, error))
);

export const loginUser = (email, password) => (dispatch, getState, api) => (
    api
        .loginUser(email, password)
        .then((response) => dispatch(receiveUserData(response.id, response.data, false)))
        .catch(error => receiveUserData(null, null, error))
);

export function receiveUserData(id, data, error) {
    return {
        type: actionTypes.RECEIVE_USER_DATA,
        payload: {
            id: id,
            data: data
        },
        error: error

    }
}