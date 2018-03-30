import React, { Component } from 'react';
import { Text  , StyleSheet , View } from 'react-native';
import { Provider } from 'react-redux'
import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

import Navigator from './Navigator';

import reducers from './reducers';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={createStore(reducers , {}, applyMiddleware(thunk))} >
        <Navigator/>
      </Provider>
    );
  }
}
