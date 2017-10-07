import React, { Component } from 'react';
import App from './container/app.js';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
  var config = {
    apiKey: "AIzaSyAFFogcN4utlAugR3myqbsNmEuOIfVhQmk",
    authDomain: "tourist-guide-2bee8.firebaseapp.com",
    databaseURL: "https://tourist-guide-2bee8.firebaseio.com",
    projectId: "tourist-guide-2bee8",
    storageBucket: "tourist-guide-2bee8.appspot.com",
    messagingSenderId: "550257784101"
  };
  firebase.initializeApp(config);
export default class TouristGuide extends Component {
  render() {
        return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TouristGuide', () => TouristGuide);







