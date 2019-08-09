/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import Login from './Login';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import Feed from './Feed';

var AuthService = require('./AuthService');

export default class App extends Component {

  styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      paddingTop: 40,
      padding: 10,
      alignItems: "center"
    },
    loader: {
      marginTop: 20
    },
    loginText: {
      fontSize: 22,
      color: 'green',
      textAlign: "center"
    }
  });

  state = {
    isLoggedIn: false,
    checkingAuth: true
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != undefined
      })
    })
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <Login onLogin={this.onLogin} />
      );
    }
    else {
      return (
        <Feed />

      );
    }
  }
}
