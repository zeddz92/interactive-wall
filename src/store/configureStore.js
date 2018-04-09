import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import reducer from '../reducers/index';
import * as API from '../utils/api';


const logger = store => next => action => {
    // console.group(action.type)
    // console.info('dispatching', action)
    let result = next(action)
    // console.log('next state', store.getState())
    // console.groupEnd(action.type)
    return result
};

const persistConfig = {
    key: 'root',
    storage: storage,
};

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        console.log(state)
        state.user = undefined
    }

    return reducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export default () => {
    let store = createStore(persistedReducer, composeEnhancers(
        applyMiddleware(logger),
        applyMiddleware(thunk.withExtraArgument(API)),
    ));


    let persistor = persistStore(store);
    return {store, persistor}
}