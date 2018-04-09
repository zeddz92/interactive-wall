import * as actionTypes from './types';

export const fetchPosts = () => (dispatch, getState, api) => (
    api
        .getPosts()
        .then(posts => dispatch(receivePosts(posts)))
);

export function receivePosts(posts) {
    return {
        type: actionTypes.RECEIVE_POSTS,
        payload: {
            posts,
        },
        error: false

    }
}

export const createPost = (userId, post) =>  (dispatch, getState, api) => (
    api
        .createNewPost(userId, post)
        .then(postId => dispatch(addPost(post, false)))
        .catch(error => dispatch(addPost(null, error)))
);

export function addPost(post, error) {
    return {
        type: actionTypes.CREATE_POST,
        payload: post,
        error: error
    }
}

export function filterPostsBy(categoryId) {
    return {
        type: actionTypes.FILTER_POSTS_BY_CATEGORY,
        payload: {
            categoryId,
        },
        error: false
    }
}