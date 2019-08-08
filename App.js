/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import Login from './Login';
import { ActivityIndicator, View, Text, Image, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

var AuthService = require('./AuthService');

export default class App extends Component {

  styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      paddingTop: 40,
      padding: 10,
      alignItems: "center"
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
        <View style={this.styles.container}>
          <Text>Logged in</Text>
          <ActivityIndicator animating={this.state.checkingAuth} size="large" />
        </View>
      )
    }
  }
}
