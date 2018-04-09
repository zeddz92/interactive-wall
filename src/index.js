import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route} from 'react-router-dom';
import {PersistGate} from 'redux-persist/lib/integration/react';


import './index.css';
import './modal.css';

import configureStore from './store/configureStore';
import App from './components/App';



// import * as API from './utils/api';


import registerServiceWorker from './registerServiceWorker';



let {store, persistor} = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
