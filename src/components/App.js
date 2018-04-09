import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from './Main';
import SignUp from './SignUp';
import {firebaseApp} from '../utils/firebase';

import NoMatch from './NoMatch';

import '../App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
              <Route exact path="/" render={() => (
                  <Main/>
              )}/>

              <Route exact path="/signup" render={() => (
                  <SignUp/>
              )}/>

              <Route component={NoMatch}/>
          </Switch>

        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
      </div>
    );
  }
}

export default App;
