import {post} from './post';
import {category} from './category';
import {user} from './user';

import {combineReducers} from 'redux';

export default combineReducers({
    post,
    category,
    user
});